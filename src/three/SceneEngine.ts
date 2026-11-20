import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshBVH } from 'three-mesh-bvh';
import type {
  AltitudeLayer,
  Building,
  BuildingDisplayMode,
  Observer,
  SampleResult
} from '../types';
import { buildBvhFromBuildings } from '../lib/geometry';
import { occlusionColor, OUT_OF_FOV_COLOR, LAYER_COLORS } from '../lib/export';

export interface ObserverDragPayload {
  observerId: string;
  x: number;
  z: number;
}

interface ObserverVisual {
  group: THREE.Group;
  marker: THREE.Mesh;
  pick: THREE.Mesh;
  frustum: THREE.LineSegments;
  data: Observer;
}

const FRUSTUM_RANGE = 250; // 视锥可视化半径（米）

export class SceneEngine {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private resizeObserver: ResizeObserver;
  private rafId = 0;

  private hemi: THREE.HemisphereLight;
  private dirLight: THREE.DirectionalLight;
  private ground: THREE.Mesh;
  private grid: THREE.GridHelper;
  private regionLine: THREE.LineLoop;
  private northArrow: THREE.Group;

  private buildingMesh: THREE.Mesh | null = null;
  private buildingMaterial: THREE.MeshStandardMaterial | null = null;
  private bvh: MeshBVH | null = null;
  private displayMode: BuildingDisplayMode = 'solid';

  private sampleLayer = new Map<number, THREE.Points>();
  private observerVisuals = new Map<string, ObserverVisual>();
  private selectedObserverId: string | null = null;

  private draggingId: string | null = null;
  private sceneBounds = { minX: -400, maxX: 400, minZ: -400, maxZ: 400 };

  /** 观察点被拖拽时持续回调 */
  onObserverDrag: ((payload: ObserverDragPayload) => void) | null = null;
  /** 点击选中观察点 */
  onObserverSelect: ((id: string | null) => void) | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 600;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = false;
    container.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(0x0e1420);
    this.scene.fog = new THREE.Fog(0x0e1420, 1500, 4000);

    this.camera = new THREE.PerspectiveCamera(55, w / h, 0.5, 10000);
    this.camera.position.set(500, 450, 650);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.target.set(0, 60, 0);

    this.hemi = new THREE.HemisphereLight(0xbfd4ff, 0x303028, 1.1);
    this.scene.add(this.hemi);
    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    this.dirLight.position.set(400, 800, 300);
    this.scene.add(this.dirLight);

    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(6000, 6000),
      new THREE.MeshStandardMaterial({ color: 0x1c2635, roughness: 1, metalness: 0 })
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.scene.add(this.ground);

    this.grid = new THREE.GridHelper(2000, 40, 0x33475f, 0x22303f);
    (this.grid.material as THREE.Material).transparent = true;
    (this.grid.material as THREE.Material).opacity = 0.5;
    this.scene.add(this.grid);

    this.regionLine = new THREE.LineLoop(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0x35e0e8, transparent: true, opacity: 0.9 })
    );
    this.regionLine.visible = false;
    this.scene.add(this.regionLine);

    this.northArrow = this.buildNorthArrow();
    this.scene.add(this.northArrow);

    this.bindPointerEvents();
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);
    this.animate();
  }

  private buildNorthArrow(): THREE.Group {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0xff5252 });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(6, 22, 12), mat);
    cone.position.y = 14;
    g.add(cone);
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 26, 8),
      new THREE.MeshBasicMaterial({ color: 0xff8a80 })
    );
    stem.position.y = 4;
    g.add(stem);
    return g;
  }

  // ---------- 建筑 ----------

  /** 加载建筑并重建 BVH，返回 BVH 供外部计算使用 */
  setBuildings(buildings: Building[]): MeshBVH | null {
    this.clearBuildings();
    if (!buildings.length) {
      this.bvh = null;
      return null;
    }
    let built: ReturnType<typeof buildBvhFromBuildings>;
    try {
      built = buildBvhFromBuildings(buildings);
    } catch (err) {
      console.error('[SceneEngine] 建筑几何/BVH 构建失败:', err);
      this.bvh = null;
      return null;
    }
    if (!built) return null;
    this.bvh = built.bvh;

    this.buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9b48f,
      roughness: 0.85,
      metalness: 0.05,
      transparent: this.displayMode === 'transparent',
      opacity: this.displayMode === 'transparent' ? 0.22 : 1,
      depthWrite: this.displayMode !== 'transparent'
    });
    this.buildingMesh = new THREE.Mesh(built.geometry, this.buildingMaterial);
    this.buildingMesh.name = 'buildings';
    this.scene.add(this.buildingMesh);

    built.geometry.computeBoundingBox();
    const box = built.geometry.boundingBox!;
    this.sceneBounds = {
      minX: box.min.x,
      maxX: box.max.x,
      minZ: box.min.z,
      maxZ: box.max.z
    };
    this.frameView(box);
    return this.bvh;
  }

  getBvh(): MeshBVH | null {
    return this.bvh;
  }

  setDisplayMode(mode: BuildingDisplayMode) {
    this.displayMode = mode;
    if (!this.buildingMaterial) return;
    const transparent = mode === 'transparent';
    this.buildingMaterial.transparent = transparent;
    this.buildingMaterial.opacity = transparent ? 0.22 : 1;
    this.buildingMaterial.depthWrite = !transparent;
    this.buildingMaterial.needsUpdate = true;
  }

  private clearBuildings() {
    if (this.buildingMesh) {
      this.scene.remove(this.buildingMesh);
      this.buildingMesh.geometry.dispose();
      this.buildingMaterial?.dispose();
      this.buildingMesh = null;
      this.buildingMaterial = null;
    }
    this.bvh = null;
  }

  // ---------- 空域边界 ----------

  setRegion(region: { minX: number; maxX: number; minZ: number; maxZ: number }) {
    const pts = [
      new THREE.Vector3(region.minX, 0.6, region.minZ),
      new THREE.Vector3(region.maxX, 0.6, region.minZ),
      new THREE.Vector3(region.maxX, 0.6, region.maxZ),
      new THREE.Vector3(region.minX, 0.6, region.maxZ)
    ];
    this.regionLine.geometry.dispose();
    this.regionLine.geometry = new THREE.BufferGeometry().setFromPoints(pts);
    this.regionLine.visible = true;

    this.northArrow.position.set(region.minX - 25, 0, region.minZ);
  }

  // ---------- 采样点 ----------

  /** 全量重建采样点（按层分组 Points） */
  setSamples(samples: SampleResult[], layers: AltitudeLayer[]) {
    this.clearSamples();
    const byLayer = new Map<number, SampleResult[]>();
    for (const s of samples) {
      const arr = byLayer.get(s.layerId) ?? [];
      arr.push(s);
      byLayer.set(s.layerId, arr);
    }

    const color = new THREE.Color();
    for (const layer of layers) {
      const arr = byLayer.get(layer.id) ?? [];
      if (!arr.length) continue;
      const positions = new Float32Array(arr.length * 3);
      const colors = new Float32Array(arr.length * 3);
      arr.forEach((s, i) => {
        positions[i * 3] = s.x;
        positions[i * 3 + 1] = s.y;
        positions[i * 3 + 2] = s.z;
        this.sampleColor(s, color);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      });
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const mat = new THREE.PointsMaterial({
        size: 7,
        sizeAttenuation: false,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        depthTest: true
      });
      const points = new THREE.Points(geo, mat);
      points.visible = layer.visible;
      points.name = `samples-${layer.id}`;
      this.sampleLayer.set(layer.id, points);
      this.scene.add(points);
    }
  }

  /** 原地刷新采样点颜色（计算完成后调用） */
  refreshColors(samples: SampleResult[], layers: AltitudeLayer[]) {
    // 若分层结构变化则整体重建
    const sameStructure =
      this.sampleLayer.size === layers.filter((l) => this.sampleLayer.has(l.id)).length &&
      this.sampleLayer.size > 0;
    if (!sameStructure) {
      this.setSamples(samples, layers);
      return;
    }
    const color = new THREE.Color();
    const byLayer = new Map<number, SampleResult[]>();
    for (const s of samples) {
      const arr = byLayer.get(s.layerId) ?? [];
      arr.push(s);
      byLayer.set(s.layerId, arr);
    }
    for (const [layerId, arr] of byLayer) {
      const points = this.sampleLayer.get(layerId);
      if (!points) continue;
      const attr = points.geometry.getAttribute('color') as THREE.BufferAttribute;
      if (attr.count !== arr.length) {
        this.setSamples(samples, layers);
        return;
      }
      arr.forEach((s, i) => {
        this.sampleColor(s, color);
        attr.setXYZ(i, color.r, color.g, color.b);
      });
      attr.needsUpdate = true;
    }
  }

  private sampleColor(s: SampleResult, out: THREE.Color): THREE.Color {
    if (!s.inFov) return out.copy(OUT_OF_FOV_COLOR);
    return occlusionColor(s.occlusion, out);
  }

  setLayerVisibility(layers: AltitudeLayer[]) {
    for (const layer of layers) {
      const points = this.sampleLayer.get(layer.id);
      if (points) points.visible = layer.visible;
    }
  }

  private clearSamples() {
    for (const points of this.sampleLayer.values()) {
      this.scene.remove(points);
      points.geometry.dispose();
      (points.material as THREE.Material).dispose();
    }
    this.sampleLayer.clear();
  }

  // ---------- 观察点 ----------

  setObservers(observers: Observer[]) {
    this.clearObservers();
    for (const o of observers) {
      const visual = this.buildObserverVisual(o);
      this.observerVisuals.set(o.id, visual);
      this.scene.add(visual.group);
    }
  }

  /** 单个观察点更新（拖拽 / 面板编辑后） */
  updateObserver(o: Observer) {
    const visual = this.observerVisuals.get(o.id);
    if (!visual) return;
    visual.data = o;
    visual.group.position.set(o.x, 0, o.z);
    visual.marker.position.y = o.eyeHeight;
    visual.pick.position.y = o.eyeHeight;
    this.rebuildFrustum(visual);

    const markerMat = visual.marker.material as THREE.MeshStandardMaterial;
    if (!o.enabled) {
      markerMat.color.set(0x707882);
      visual.frustum.visible = false;
    } else {
      markerMat.color.set(this.selectedObserverId === o.id ? 0xffd54f : 0xff9f43);
      visual.frustum.visible = true;
    }
  }

  setSelectedObserver(id: string | null) {
    this.selectedObserverId = id;
    for (const visual of this.observerVisuals.values()) {
      const mat = visual.marker.material as THREE.MeshStandardMaterial;
      if (!visual.data.enabled) mat.color.set(0x707882);
      else mat.color.set(visual.data.id === id ? 0xffd54f : 0xff9f43);
    }
  }

  private buildObserverVisual(o: Observer): ObserverVisual {
    const group = new THREE.Group();
    group.position.set(o.x, 0, o.z);

    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(5, 20, 16),
      new THREE.MeshStandardMaterial({
        color: o.enabled ? 0xff9f43 : 0x707882,
        emissive: 0x442200,
        roughness: 0.5
      })
    );
    marker.position.y = o.eyeHeight;
    group.add(marker);

    // 地面支撑杆
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.8, 1, 8),
      new THREE.MeshBasicMaterial({ color: 0xffb066 })
    );
    stem.name = 'stem';
    group.add(stem);

    // 朝向箭头（锥体），yaw=0 指向 -Z
    const arrow = new THREE.Mesh(
      new THREE.ConeGeometry(2.6, 9, 12),
      new THREE.MeshBasicMaterial({ color: 0xffe082 })
    );
    arrow.name = 'arrow';
    group.add(arrow);

    // 加大拾取球，便于拖拽
    const pick = new THREE.Mesh(
      new THREE.SphereGeometry(12, 10, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    pick.position.y = o.eyeHeight;
    pick.userData.observerId = o.id;
    group.add(pick);

    const frustum = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0xffd54f, transparent: true, opacity: 0.65 })
    );
    group.add(frustum);

    const visual: ObserverVisual = { group, marker, pick, frustum, data: { ...o } };
    this.layoutObserverParts(visual);
    this.rebuildFrustum(visual);
    if (!o.enabled) frustum.visible = false;
    return visual;
  }

  /** 支撑杆与箭头布局（眼高 / 朝向变化后调用） */
  private layoutObserverParts(v: ObserverVisual) {
    const o = v.data;
    const stem = v.group.getObjectByName('stem') as THREE.Mesh;
    stem.scale.y = Math.max(0.1, o.eyeHeight);
    stem.position.y = o.eyeHeight / 2;

    const arrow = v.group.getObjectByName('arrow') as THREE.Mesh;
    arrow.position.y = o.eyeHeight;
    // 锥体默认朝 +Y，旋转到水平方向：yaw=0 时指向 -Z
    const dir = new THREE.Vector3(Math.sin((o.yaw * Math.PI) / 180), 0, -Math.cos((o.yaw * Math.PI) / 180));
    arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    arrow.position.addScaledVector(dir, 10);
  }

  /** 重建视锥线框：顶点在眼位，远端矩形由水平/垂直张角确定 */
  private rebuildFrustum(v: ObserverVisual) {
    this.layoutObserverParts(v);
    const o = v.data;
    const R = FRUSTUM_RANGE;
    const yawRad = (o.yaw * Math.PI) / 180;
    const halfFov = (o.fov / 2) * (Math.PI / 180);
    const corners: THREE.Vector3[] = [];
    for (const az of [yawRad - halfFov, yawRad + halfFov]) {
      for (const elDeg of [o.pitchDown, o.pitchUp]) {
        const el = (elDeg * Math.PI) / 180;
        const dir = new THREE.Vector3(
          Math.sin(az) * Math.cos(el),
          Math.sin(el),
          -Math.cos(az) * Math.cos(el)
        );
        corners.push(
          new THREE.Vector3(
            o.x + dir.x * R,
            o.eyeHeight + dir.y * R,
            o.z + dir.z * R
          )
        );
      }
    }
    const apex = new THREE.Vector3(o.x, o.eyeHeight, o.z);
    const seg: THREE.Vector3[] = [];
    // 顶点到四角
    for (const c of corners) seg.push(apex, c);
    // 远端矩形（顺序：左下、左上、右下、右上 —— 按 az/el 组合索引 0..3）
    seg.push(corners[0], corners[1], corners[0], corners[2], corners[1], corners[3], corners[2], corners[3]);

    v.frustum.geometry.dispose();
    v.frustum.geometry = new THREE.BufferGeometry().setFromPoints(seg);
  }

  private clearObservers() {
    for (const visual of this.observerVisuals.values()) {
      this.scene.remove(visual.group);
      visual.group.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
        }
      });
    }
    this.observerVisuals.clear();
  }

  // ---------- 交互 ----------

  private toNDC(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private bindPointerEvents() {
    const dom = this.renderer.domElement;
    dom.addEventListener('pointerdown', this.handlePointerDown);
    dom.addEventListener('pointermove', this.handlePointerMove);
    dom.addEventListener('pointerup', this.handlePointerUp);
    dom.addEventListener('pointerleave', this.handlePointerUp);
  }

  private pickObserver(e: PointerEvent): ObserverVisual | null {
    this.toNDC(e);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const picks = [...this.observerVisuals.values()].map((v) => v.pick);
    const hits = this.raycaster.intersectObjects(picks, false);
    if (!hits.length) return null;
    const id = (hits[0].object.userData.observerId as string) ?? null;
    return id ? this.observerVisuals.get(id) ?? null : null;
  }

  private handlePointerDown = (e: PointerEvent) => {
    const visual = this.pickObserver(e);
    if (!visual) {
      this.onObserverSelect?.(null);
      return;
    }
    this.draggingId = visual.data.id;
    this.controls.enabled = false;
    this.onObserverSelect?.(visual.data.id);
    this.renderer.domElement.setPointerCapture(e.pointerId);
  };

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.draggingId) {
      const visual = this.pickObserver(e);
      this.renderer.domElement.style.cursor = visual ? 'pointer' : '';
      return;
    }
    this.toNDC(e);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = new THREE.Vector3();
    if (this.raycaster.ray.intersectPlane(this.groundPlane, hit)) {
      const margin = 50;
      const x = THREE.MathUtils.clamp(
        hit.x,
        this.sceneBounds.minX - margin,
        this.sceneBounds.maxX + margin
      );
      const z = THREE.MathUtils.clamp(
        hit.z,
        this.sceneBounds.minZ - margin,
        this.sceneBounds.maxZ + margin
      );
      this.onObserverDrag?.({ observerId: this.draggingId, x, z });
    }
  };

  private handlePointerUp = (e: PointerEvent) => {
    if (!this.draggingId) return;
    this.draggingId = null;
    this.controls.enabled = true;
    try {
      this.renderer.domElement.releasePointerCapture(e.pointerId);
    } catch {
      /* 指针已释放 */
    }
  };

  // ---------- 视图与生命周期 ----------

  frameView(box?: THREE.Box3) {
    const b =
      box ??
      new THREE.Box3(
        new THREE.Vector3(this.sceneBounds.minX, 0, this.sceneBounds.minZ),
        new THREE.Vector3(this.sceneBounds.maxX, 200, this.sceneBounds.maxZ)
      );
    const center = b.getCenter(new THREE.Vector3());
    const size = b.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.z, 1);
    this.controls.target.copy(center);
    this.camera.position.set(
      center.x + maxDim * 0.9,
      center.y + maxDim * 0.7,
      center.z + maxDim * 1.1
    );
    this.camera.near = 0.5;
    this.camera.far = Math.max(5000, maxDim * 12);
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  private handleResize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private animate = () => {
    this.rafId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    cancelAnimationFrame(this.rafId);
    this.resizeObserver.disconnect();
    const dom = this.renderer.domElement;
    dom.removeEventListener('pointerdown', this.handlePointerDown);
    dom.removeEventListener('pointermove', this.handlePointerMove);
    dom.removeEventListener('pointerup', this.handlePointerUp);
    dom.removeEventListener('pointerleave', this.handlePointerUp);
    this.clearBuildings();
    this.clearSamples();
    this.clearObservers();
    this.controls.dispose();
    this.renderer.dispose();
    dom.parentElement?.removeChild(dom);
  }
}

/** 供图例使用的层配色 */
export function layerColorHex(layerId: number): number {
  return LAYER_COLORS[layerId % LAYER_COLORS.length];
}
