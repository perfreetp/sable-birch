import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {
  computeBoundsTree,
  disposeBoundsTree,
  acceleratedRaycast
} from 'three-mesh-bvh';
import { get } from 'svelte/store';
import {
  material as materialStore,
  envIndex,
  displayMode,
  brushSize,
  activeZone,
  activeModule,
  paintColor,
  eraseMode,
  meshList,
  modelName,
  setStatus,
  METALNESS_STEPS,
  ROUGHNESS_STEPS,
  BRUSH_RADII
} from './store.js';
import { buildDefaultModel } from './defaultModel.js';
import { createStudioEnv, createSunsetEnv } from './environments.js';

// three-mesh-bvh:加速射线拾取
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const ZONE_RULES = [
  [/fuselage|body|hull|cabin|机身/i, 'fuselage'],
  [/wing|aileron|flap|机翼/i, 'wing'],
  [/door|hatch|舱门/i, 'door']
];
const NON_PAINT_RE = /glass|window|canopy|rotor|prop|gear|wheel|skid|strut|light|antenna/i;

function guessZone(name) {
  for (const [re, zone] of ZONE_RULES) if (re.test(name)) return zone;
  return 'fuselage';
}

function hexToRgb01(hex) {
  const c = new THREE.Color(hex);
  return [c.r, c.g, c.b];
}

class Viewer {
  constructor() {
    this.paintables = []; // { mesh, name, zone, mask:Uint8Array, paintCol:Uint8Array }
    this.otherMeshes = [];
    this.model = null;
    this.modelRadius = 4.5;
    this.painting = false;
    this.envTextures = [null, null];
    this._tmpV = new THREE.Vector3();
  }

  init(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.05, 500);
    this.camera.position.set(6.5, 3.5, 7.5);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxDistance = 80;

    // 补光(主要照明来自环境贴图)
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(5, 9, 4);
    this.scene.add(dir, new THREE.AmbientLight(0xffffff, 0.15));

    // 共享漆面材质:底漆(顶点色底色)+ 金属漆(顶点色)+ 清漆层
    this.paintMaterial = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      metalness: 0.75,
      roughness: 0.3,
      clearcoat: 0.8,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1.1
    });
    this.normalMaterial = new THREE.MeshNormalMaterial();

    // 笔刷光标
    this.brushCursor = new THREE.Mesh(
      new THREE.RingGeometry(0.85, 1.0, 48),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        depthTest: false
      })
    );
    this.brushCursor.renderOrder = 999;
    this.brushCursor.visible = false;
    this.scene.add(this.brushCursor);

    this.raycaster = new THREE.Raycaster();
    this.raycaster.firstHitOnly = true; // BVH 单次命中模式

    this._bindEvents();
    this._subscribeStores();
    this._applyMaterial();
    this._applyEnvironment();
    this._applyDisplayMode();

    this.loadDefaultModel();

    const resize = () => {
      const w = canvas.clientWidth || canvas.parentElement.clientWidth;
      const h = canvas.clientHeight || canvas.parentElement.clientHeight;
      if (!w || !h) return;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(canvas.parentElement);
    resize();

    const loop = () => {
      requestAnimationFrame(loop);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  // ---------- 模型装载 ----------
  loadDefaultModel() {
    this._setModel(buildDefaultModel(), '内置 eVTOL 演示模型');
  }

  async loadGLTF(file) {
    const loader = new GLTFLoader();
    try {
      const buf = await file.arrayBuffer();
      const gltf = await new Promise((res, rej) => loader.parse(buf, '', res, rej));
      const root = gltf.scene || gltf.scenes[0];
      if (!root) throw new Error('空场景');
      this._setModel(root, file.name);
      setStatus(`已导入模型:${file.name}`);
    } catch (e) {
      console.error(e);
      setStatus('模型导入失败:' + (e.message || e), 5000);
    }
  }

  _setModel(group, name) {
    if (this.model) {
      this.scene.remove(this.model);
      this.model.traverse((o) => {
        if (o.isMesh) {
          o.geometry.disposeBoundsTree?.();
          o.geometry.dispose();
        }
      });
    }
    this.paintables = [];
    this.otherMeshes = [];
    this.model = group;

    // 归一化模型尺寸,保证笔刷/环境参数一致
    const box = new THREE.Box3().setFromObject(group);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const scale = sphere.radius > 0 ? 4.5 / sphere.radius : 1;
    group.scale.setScalar(scale);
    group.position.sub(sphere.center.clone().multiplyScalar(scale));
    group.updateMatrixWorld(true);
    this.modelRadius = 4.5;

    group.traverse((o) => {
      if (!o.isMesh) return;
      o.geometry.computeBoundsTree();
      if (NON_PAINT_RE.test(o.name)) {
        this.otherMeshes.push(o);
        return;
      }
      // 克隆几何体,避免共享几何导致遮罩串色
      o.geometry = o.geometry.clone();
      o.geometry.computeBoundsTree();
      o.material = this.paintMaterial;
      const n = o.geometry.attributes.position.count;
      const paint = {
        mesh: o,
        name: o.name || `mesh_${this.paintables.length}`,
        zone: guessZone(o.name || ''),
        mask: new Uint8Array(n),
        paintCol: new Uint8Array(n * 3)
      };
      o.userData.paint = paint;
      o.geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(new Float32Array(n * 3), 3)
      );
      this.paintables.push(paint);
    });

    this._recomputeAllColors();
    this._syncMeshList();
    this._applyDisplayMode();
    this._frameCamera();
    modelName.set(name);
  }

  _frameCamera() {
    const r = this.modelRadius;
    this.camera.position.set(r * 1.5, r * 0.8, r * 1.7);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  _syncMeshList() {
    meshList.set([
      ...this.paintables.map((p) => ({
        name: p.name,
        zone: p.zone,
        paintable: true,
        verts: p.mask.length
      })),
      ...this.otherMeshes.map((m) => ({
        name: m.name || '(未命名)',
        zone: null,
        paintable: false,
        verts: m.geometry.attributes.position.count
      }))
    ]);
  }

  setZone(name, zone) {
    const p = this.paintables.find((x) => x.name === name);
    if (p) {
      p.zone = zone;
      this._syncMeshList();
    }
  }

  // ---------- 顶点色 / 遮罩 ----------
  _recomputeAllColors() {
    const primer = hexToRgb01(get(materialStore).primer);
    for (const p of this.paintables) this._recomputeMeshColors(p, primer);
  }

  _recomputeMeshColors(p, primer = hexToRgb01(get(materialStore).primer)) {
    const attr = p.mesh.geometry.attributes.color;
    const arr = attr.array;
    const { mask, paintCol } = p;
    for (let i = 0; i < mask.length; i++) {
      const o = i * 3;
      if (mask[i]) {
        arr[o] = paintCol[o] / 255;
        arr[o + 1] = paintCol[o + 1] / 255;
        arr[o + 2] = paintCol[o + 2] / 255;
      } else {
        arr[o] = primer[0];
        arr[o + 1] = primer[1];
        arr[o + 2] = primer[2];
      }
    }
    attr.needsUpdate = true;
  }

  clearZone(zone) {
    for (const p of this.paintables) {
      if (p.zone !== zone) continue;
      p.mask.fill(0);
      this._recomputeMeshColors(p);
    }
    setStatus('已清除该分区的漆面遮罩');
  }

  // ---------- 笔刷绘制(BVH 射线拾取 + shapecast 精确落点) ----------
  _paintAt(hit) {
    const p = hit.object.userData.paint;
    if (!p) return;
    const mesh = hit.object;
    const geo = mesh.geometry;
    const pos = geo.attributes.position;
    const colorAttr = geo.attributes.color;

    const worldScale = mesh.getWorldScale(this._tmpV).x || 1;
    const radius =
      (BRUSH_RADII[get(brushSize)] * this.modelRadius) / 4.5 / worldScale;
    const center = mesh.worldToLocal(hit.point.clone());
    const r2 = radius * radius;

    const erase = get(eraseMode);
    const [cr, cg, cb] = hexToRgb01(get(paintColor)).map((v) =>
      Math.round(v * 255)
    );
    const primer = hexToRgb01(get(materialStore).primer);
    const carr = colorAttr.array;

    const applyVertex = (i) => {
      const o = i * 3;
      if (erase) {
        p.mask[i] = 0;
        carr[o] = primer[0];
        carr[o + 1] = primer[1];
        carr[o + 2] = primer[2];
      } else {
        p.mask[i] = 1;
        p.paintCol[o] = cr;
        p.paintCol[o + 1] = cg;
        p.paintCol[o + 2] = cb;
        carr[o] = cr / 255;
        carr[o + 1] = cg / 255;
        carr[o + 2] = cb / 255;
      }
    };

    const v = this._tmpV;
    const tryVertex = (i) => {
      v.fromBufferAttribute(pos, i);
      if (v.distanceToSquared(center) <= r2) applyVertex(i);
    };

    if (geo.boundsTree && geo.index) {
      const sphere = new THREE.Sphere(center.clone(), radius);
      geo.boundsTree.shapecast({
        intersectsBounds: (box) => box.intersectsSphere(sphere),
        intersectsTriangle: (tri, triIndex) => {
          const base = triIndex * 3;
          tryVertex(geo.index.getX(base));
          tryVertex(geo.index.getX(base + 1));
          tryVertex(geo.index.getX(base + 2));
          return false;
        }
      });
    } else {
      for (let i = 0; i < pos.count; i++) tryVertex(i);
    }
    colorAttr.needsUpdate = true;
  }

  _activeZoneTargets() {
    const zone = get(activeZone);
    return this.paintables.filter((p) => p.zone === zone).map((p) => p.mesh);
  }

  _pick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this._activeZoneTargets(), false);
    return hits[0] || null;
  }

  _bindEvents() {
    const el = this.canvas;
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || get(activeModule) !== 'paint') return;
      const hit = this._pick(e);
      if (hit) {
        this.painting = true;
        this.controls.enabled = false;
        el.setPointerCapture(e.pointerId);
        this._paintAt(hit);
      }
    });
    el.addEventListener('pointermove', (e) => {
      if (get(activeModule) !== 'paint') {
        this.brushCursor.visible = false;
        return;
      }
      const hit = this._pick(e);
      if (hit) {
        this._updateCursor(hit);
        if (this.painting) this._paintAt(hit);
      } else {
        this.brushCursor.visible = false;
      }
    });
    const endStroke = () => {
      this.painting = false;
      this.controls.enabled = true;
    };
    el.addEventListener('pointerup', endStroke);
    el.addEventListener('pointercancel', endStroke);
    el.addEventListener('pointerleave', () => {
      this.brushCursor.visible = false;
    });
  }

  _updateCursor(hit) {
    const r = (BRUSH_RADII[get(brushSize)] * this.modelRadius) / 4.5;
    const normal = hit.face.normal
      .clone()
      .transformDirection(hit.object.matrixWorld);
    this.brushCursor.position
      .copy(hit.point)
      .addScaledVector(normal, 0.01 * this.modelRadius);
    this.brushCursor.lookAt(this._tmpV.copy(hit.point).add(normal));
    this.brushCursor.scale.setScalar(r);
    this.brushCursor.material.color.set(
      get(eraseMode) ? '#ffffff' : get(paintColor)
    );
    this.brushCursor.visible = true;
  }

  // ---------- 材质 / 环境 / 显示模式 ----------
  _subscribeStores() {
    materialStore.subscribe(() => this._applyMaterial());
    envIndex.subscribe(() => this._applyEnvironment());
    displayMode.subscribe(() => this._applyDisplayMode());
    activeModule.subscribe((m) => {
      if (m !== 'paint') this.brushCursor.visible = false;
    });
  }

  _applyMaterial() {
    if (!this.paintMaterial) return;
    const m = get(materialStore);
    this.paintMaterial.metalness = METALNESS_STEPS[m.metalness];
    this.paintMaterial.roughness = ROUGHNESS_STEPS[m.roughness];
    this.paintMaterial.clearcoat = m.clearcoat; // 清漆厚度
    this.paintMaterial.clearcoatRoughness = 1 - m.clearcoatGloss; // 清漆光泽
    this.paintMaterial.needsUpdate = true;
    this._recomputeAllColors(); // 底漆颜色变化时重算底色
  }

  _applyEnvironment() {
    if (!this.renderer) return;
    const idx = get(envIndex);
    if (!this.envTextures[idx]) {
      this.envTextures[idx] =
        idx === 0
          ? createStudioEnv(this.renderer)
          : createSunsetEnv(this.renderer);
    }
    const tex = this.envTextures[idx];
    this.scene.environment = tex;
    this.scene.background = tex;
    this.scene.backgroundBlurriness = 0.45;
    this.scene.backgroundIntensity = idx === 0 ? 0.5 : 0.8;
  }

  _applyDisplayMode() {
    if (!this.scene) return;
    const mode = get(displayMode);
    const setWire = (mat, on) => {
      if (mat && 'wireframe' in mat) mat.wireframe = on;
    };
    const all = [...this.paintables.map((p) => p.mesh), ...this.otherMeshes];
    for (const mesh of all) {
      if (!mesh.userData.origMat) mesh.userData.origMat = mesh.material;
      if (mode === 'normal') {
        mesh.material = this.normalMaterial;
      } else {
        mesh.material = mesh.userData.origMat;
        setWire(mesh.material, mode === 'wireframe');
      }
    }
  }

  // ---------- 涂装文件数据 ----------
  getLiveryData() {
    return {
      paintables: this.paintables,
      modelRadius: this.modelRadius
    };
  }

  applyLivery(data) {
    let restored = 0;
    let skipped = 0;
    for (const p of this.paintables) {
      const rec = data.paint[p.name];
      if (!rec || rec.verts !== p.mask.length) {
        if (rec) skipped++;
        continue;
      }
      p.mask.set(rec.mask);
      p.paintCol.set(rec.paintCol);
      this._recomputeMeshColors(p);
      restored++;
    }
    if (data.zones) {
      for (const p of this.paintables) {
        if (data.zones[p.name]) p.zone = data.zones[p.name];
      }
      this._syncMeshList();
    }
    return { restored, skipped };
  }
}

export const viewer = new Viewer();
