import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MeshBVH } from 'three-mesh-bvh';
import type { ShardSource } from './types.ts';
import type { Pose } from './types.ts';
import { matrixFromPose, poseFromObject, snapAngle, snapTranslation } from './transform.ts';
import { getBVH } from './distance.ts';

export interface ShardView {
  source: ShardSource;
  group: THREE.Group;
  mesh: THREE.Mesh;
  edges: THREE.LineSegments | null;
  material: THREE.MeshStandardMaterial;
}

export interface ViewerCallbacks {
  onPoseChange: (id: string, pose: Pose, final: boolean) => void;
  onPickShard: (id: string | null) => void;
  onPickPoint: (id: string, point: THREE.Vector3, normal: THREE.Vector3) => void;
  onHover: (id: string | null) => void;
  onDistanceProbe: (info: { a: string; b: string; distance: number; pointA: THREE.Vector3; pointB: THREE.Vector3 } | null) => void;
}

export type ViewerMode = 'idle' | 'translate' | 'rotate' | 'pick-point';

export class Viewer {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly orbit: OrbitControls;
  readonly transform: TransformControls;
  readonly overlay: THREE.Group;

  private container: HTMLElement;
  private views = new Map<string, ShardView>();
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private callbacks: ViewerCallbacks;
  private mode: ViewerMode = 'idle';
  private activeId: string | null = null;
  private dragging = false;
  private disposed = false;
  private frame = 0;
  private resizeObserver: ResizeObserver;
  private distanceLines = new THREE.Group();
  private pointMarkers = new THREE.Group();
  private mergedView: THREE.Mesh | null = null;
  private problemGroup = new THREE.Group();
  private translationSnap = 1;
  private rotationSnap = 0.5;
  private dragStart = { position: new THREE.Vector3(), rotation: new THREE.Euler() };
  private lastProbeTime = 0;
  private needsProbe = false;

  constructor(container: HTMLElement, callbacks: ViewerCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = false;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.92;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(0x14110f, 1);
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.touchAction = 'none';

    this.scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.42;

    this.camera = new THREE.PerspectiveCamera(38, 1, 0.5, 6000);
    this.camera.position.set(240, 220, 320);
    this.camera.lookAt(0, 110, 0);

    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.target.set(0, 110, 0);
    this.orbit.enableDamping = true;
    this.orbit.dampingFactor = 0.075;
    this.orbit.maxDistance = 2400;
    this.orbit.minDistance = 20;
    this.orbit.update();

    this.scene.add(this.buildLights());
    this.scene.add(this.buildGround());

    this.overlay = new THREE.Group();
    this.scene.add(this.overlay);
    this.overlay.add(this.distanceLines);
    this.overlay.add(this.pointMarkers);
    this.overlay.add(this.problemGroup);

    this.transform = new TransformControls(this.camera, this.renderer.domElement);
    this.transform.setSize(0.85);
    this.transform.setTranslationSnap(this.translationSnap);
    this.transform.setRotationSnap(THREE.MathUtils.degToRad(this.rotationSnap));
    this.transform.enabled = false;
    const helper = this.transform.getHelper();
    helper.visible = false;
    this.scene.add(helper);

    this.transform.addEventListener('dragging-changed', (e) => {
      const value = (e as unknown as { value: boolean }).value;
      this.orbit.enabled = !value;
      this.dragging = value;
      if (value) {
        this.captureDragStart();
      } else {
        this.commitTransform(true);
      }
    });
    this.transform.addEventListener('objectChange', () => {
      this.applySnapping();
      this.commitTransform(false);
      this.needsProbe = true;
    });

    this.bindPointer();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
    this.animate();
  }

  private buildLights() {
    const group = new THREE.Group();
    const key = new THREE.DirectionalLight(0xfff1e0, 1.55);
    key.position.set(180, 320, 220);
    group.add(key);
    const fill = new THREE.DirectionalLight(0xcddcff, 0.55);
    fill.position.set(-240, 140, -160);
    group.add(fill);
    const rim = new THREE.DirectionalLight(0xffd9a8, 0.6);
    rim.position.set(-60, 80, -280);
    group.add(rim);
    group.add(new THREE.HemisphereLight(0x9fb4d8, 0x3b2b20, 0.32));
    return group;
  }

  private buildGround() {
    const group = new THREE.Group();
    const grid = new THREE.GridHelper(1200, 48, 0x3a4a5c, 0x272e37);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.5;
    grid.position.y = 0;
    group.add(grid);

    // 水平参考底盘
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(560, 64),
      new THREE.MeshStandardMaterial({ color: 0x1d2128, roughness: 0.95, metalness: 0.0 }),
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -0.35;
    disc.receiveShadow = false;
    group.add(disc);
    return group;
  }

  /* -------------------- 残片管理 -------------------- */

  addShard(source: ShardSource, pose: Pose) {
    if (this.views.has(source.id)) return;
    const group = new THREE.Group();
    group.name = `shard-${source.id}`;

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(source.color),
      roughness: 0.82,
      metalness: 0.04,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
      depthWrite: true,
      envMapIntensity: 0.7,
    });

    const geometry = source.geometry.clone();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.name = source.id;
    mesh.userData.shardId = source.id;
    // BVH 挂在渲染几何上用于拾取
    geometry.boundsTree = getBVH(source.geometry);
    mesh.raycast = acceleratedRaycast;
    group.add(mesh);

    const view: ShardView = { source, group, mesh, edges: null, material };
    this.views.set(source.id, view);
    this.scene.add(group);
    this.setPose(source.id, pose);
  }

  removeShard(id: string) {
    const view = this.views.get(id);
    if (!view) return;
    if (this.transform.object === view.group) this.transform.detach();
    this.scene.remove(view.group);
    view.mesh.geometry.dispose();
    view.material.dispose();
    view.edges?.geometry.dispose();
    this.views.delete(id);
  }

  hasShard(id: string) {
    return this.views.has(id);
  }

  setPose(id: string, pose: Pose) {
    const view = this.views.get(id);
    if (!view) return;
    const m = matrixFromPose(pose);
    view.group.position.setFromMatrixPosition(m);
    view.group.quaternion.setFromRotationMatrix(m);
    view.group.scale.set(1, 1, 1);
  }

  getPose(id: string): Pose | null {
    const view = this.views.get(id);
    if (!view) return null;
    return poseFromObject(view.group);
  }

  attachTransform(id: string | null, mode: 'translate' | 'rotate' | null, axis?: 'x' | 'y' | 'z') {
    if (!id || !mode) {
      this.transform.detach();
      this.transform.getHelper().visible = false;
      this.mode = 'idle';
      this.activeId = null;
      return;
    }
    const view = this.views.get(id);
    if (!view) return;
    if (this.transform.object !== view.group) this.transform.attach(view.group);
    this.transform.setMode(mode);
    this.transform.enabled = true;
    this.transform.getHelper().visible = true;
    // 旋转工具按选定轴限制；平移工具保留三轴自由拖动
    if (mode === 'rotate' && axis) {
      this.transform.showX = axis === 'x';
      this.transform.showY = axis === 'y';
      this.transform.showZ = axis === 'z';
    } else {
      this.transform.showX = true;
      this.transform.showY = true;
      this.transform.showZ = true;
    }
    this.mode = mode;
    this.activeId = id;
  }

  setAxis(axis: 'x' | 'y' | 'z') {
    if (this.mode === 'rotate') {
      this.transform.showX = axis === 'x';
      this.transform.showY = axis === 'y';
      this.transform.showZ = axis === 'z';
    }
  }

  setSnaps(translationMM: number, rotationDeg: number) {
    this.translationSnap = translationMM;
    this.rotationSnap = rotationDeg;
    this.transform.setTranslationSnap(translationMM > 0 ? translationMM : null);
    this.transform.setRotationSnap(rotationDeg > 0 ? THREE.MathUtils.degToRad(rotationDeg) : null);
  }

  setPickPointMode(on: boolean) {
    if (on) {
      this.mode = 'pick-point';
      this.transform.detach();
      this.transform.getHelper().visible = false;
      this.renderer.domElement.style.cursor = 'crosshair';
    } else if (this.mode === 'pick-point') {
      this.mode = 'idle';
      this.renderer.domElement.style.cursor = 'default';
    }
  }

  private captureDragStart() {
    if (!this.activeId) return;
    const view = this.views.get(this.activeId);
    if (!view) return;
    this.dragStart.position.copy(view.group.position);
    this.dragStart.rotation.copy(view.group.rotation);
  }

  private applySnapping() {
    if (!this.activeId) return;
    const view = this.views.get(this.activeId);
    if (!view) return;
    const g = view.group;
    if (this.mode === 'translate' && this.translationSnap > 0) {
      g.position.set(
        snapTranslation(g.position.x, this.translationSnap),
        snapTranslation(g.position.y, this.translationSnap),
        snapTranslation(g.position.z, this.translationSnap),
      );
    } else if (this.mode === 'rotate' && this.rotationSnap > 0) {
      const e = new THREE.Euler().setFromQuaternion(g.quaternion, 'XYZ');
      const deg = THREE.MathUtils.radToDeg;
      const snapped = new THREE.Euler(
        THREE.MathUtils.degToRad(snapAngle(deg(e.x), this.rotationSnap)),
        THREE.MathUtils.degToRad(snapAngle(deg(e.y), this.rotationSnap)),
        THREE.MathUtils.degToRad(snapAngle(deg(e.z), this.rotationSnap)),
        'XYZ',
      );
      g.quaternion.setFromEuler(snapped);
    }
  }

  private commitTransform(final: boolean) {
    if (!this.activeId) return;
    const view = this.views.get(this.activeId);
    if (!view) return;
    const pose = poseFromObject(view.group);
    this.callbacks.onPoseChange(this.activeId, pose, final);
  }

  /* -------------------- 显示属性 -------------------- */

  setVisual(id: string, opts: { visible?: boolean; opacity?: number; wireframe?: boolean; edges?: boolean; xray?: boolean }) {
    const view = this.views.get(id);
    if (!view) return;
    const m = view.material;
    if (opts.visible !== undefined) view.group.visible = opts.visible;
    if (opts.opacity !== undefined) {
      m.opacity = opts.opacity;
      m.transparent = opts.opacity < 0.999;
      m.depthWrite = opts.opacity >= 0.999;
    }
    if (opts.wireframe !== undefined) m.wireframe = opts.wireframe;
    if (opts.xray !== undefined) {
      m.blending = opts.xray ? THREE.NormalBlending : THREE.NormalBlending;
      m.depthTest = true;
    }
    if (opts.edges !== undefined) {
      if (opts.edges && !view.edges) {
        const eg = new THREE.EdgesGeometry(view.mesh.geometry, 34);
        const line = new THREE.LineSegments(
          eg,
          new THREE.LineBasicMaterial({ color: 0x2b1d13, transparent: true, opacity: 0.35 }),
        );
        view.edges = line;
        view.group.add(line);
      } else if (!opts.edges && view.edges) {
        view.group.remove(view.edges);
        view.edges.geometry.dispose();
        (view.edges.material as THREE.Material).dispose();
        view.edges = null;
      }
      if (view.edges) view.edges.visible = true;
    }
    this.renderer.domElement.style.opacity = '1';
    m.needsUpdate = true;
    this.render();
  }

  setHighlight(id: string, kind: 'selected' | 'compare' | 'hover' | null) {
    const view = this.views.get(id);
    if (!view) return;
    const m = view.material;
    if (kind === 'selected') {
      m.emissive = new THREE.Color(0x3a2a12);
      m.emissiveIntensity = 0.9;
    } else if (kind === 'compare') {
      m.emissive = new THREE.Color(0x123a44);
      m.emissiveIntensity = 0.9;
    } else {
      m.emissive = new THREE.Color(0x000000);
      m.emissiveIntensity = 1;
    }
    m.needsUpdate = true;
    this.render();
  }

  /* -------------------- 合并结果与问题面 -------------------- */

  showMerged(geometry: THREE.BufferGeometry | null, opts: { color?: number } = {}) {
    if (this.mergedView) {
      this.scene.remove(this.mergedView);
      this.mergedView.geometry.dispose();
      (this.mergedView.material as THREE.Material).dispose();
      this.mergedView = null;
    }
    if (!geometry) { this.render(); return; }
    const material = new THREE.MeshStandardMaterial({
      color: opts.color ?? 0xe8dfd2,
      roughness: 0.55,
      metalness: 0.06,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
      envMapIntensity: 0.8,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'merged-result';
    this.scene.add(mesh);
    this.mergedView = mesh;
    this.render();
  }

  setMergedOpacity(opacity: number) {
    if (!this.mergedView) return;
    const m = this.mergedView.material as THREE.MeshStandardMaterial;
    m.opacity = opacity;
    m.transparent = opacity < 0.999;
    m.depthWrite = opacity >= 0.999;
    m.needsUpdate = true;
    this.render();
  }

  setMergedVisible(visible: boolean) {
    if (this.mergedView) { this.mergedView.visible = visible; this.render(); }
  }

  frameMerged() {
    if (!this.mergedView) return;
    this.mergedView.geometry.computeBoundingBox();
    this.frameBox(this.mergedView.geometry.boundingBox!.clone(), 1.35);
  }

  /**
   * 高亮自交问题面。问题面往往只有几个平方毫米，直接着色在整件器物上
   * 几乎看不见，因此同时给出：
   *   - 半透明红色面片（depthTest 关闭，保证不被遮挡）；
   *   - 白热色线框；
   *   - 每个问题面的中心放置一个发光标记，便于在视口中快速定位。
   */
  showProblems(geometries: THREE.BufferGeometry[]) {
    this.clearGroup(this.problemGroup);
    const markerPoints: THREE.Vector3[] = [];
    for (const g of geometries) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xff3b2a, side: THREE.DoubleSide, transparent: true, opacity: 0.9, depthTest: false,
      });
      const m = new THREE.Mesh(g, mat);
      m.renderOrder = 998;
      this.problemGroup.add(m);
      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(g),
        new THREE.LineBasicMaterial({ color: 0xffd9cf, transparent: true, opacity: 0.95, depthTest: false }),
      );
      wire.renderOrder = 999;
      this.problemGroup.add(wire);

      const pos = g.attributes.position;
      const c = new THREE.Vector3();
      for (let i = 0; i < pos.count; i += 3) {
        c.set(
          (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3,
          (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3,
          (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3,
        );
        markerPoints.push(c.clone());
      }
    }

    // 问题面标记：始终可见的红色圆点（0.6 mm，避免遮挡器物本身）
    for (const p of markerPoints) {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 8, 6),
        new THREE.MeshBasicMaterial({ color: 0xff5a45, depthTest: false, transparent: true, opacity: 0.95 }),
      );
      dot.position.copy(p);
      dot.renderOrder = 1001;
      this.problemGroup.add(dot);
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(1.1, 1.5, 16),
        new THREE.MeshBasicMaterial({ color: 0xff8a75, depthTest: false, transparent: true, opacity: 0.6, side: THREE.DoubleSide }),
      );
      halo.position.copy(p);
      halo.renderOrder = 1000;
      halo.userData.billboard = true;
      this.problemGroup.add(halo);
    }
    this.render();
  }

  setProblemVisible(visible: boolean) {
    this.problemGroup.visible = visible;
    this.render();
  }

  /* -------------------- 叠层：距离、点、幽灵 -------------------- */

  showDistancePair(info: { a: string; b: string; pointA: THREE.Vector3; pointB: THREE.Vector3 } | null) {
    this.clearGroup(this.distanceLines);
    if (!info) {
      this.render();
      return;
    }
    const geo = new THREE.BufferGeometry().setFromPoints([info.pointA, info.pointB]);
    const line = new THREE.Line(geo, new THREE.LineDashedMaterial({
      color: 0x5ee0b0, dashSize: 3, gapSize: 2.2, linewidth: 1,
    }));
    line.computeLineDistances();
    this.distanceLines.add(line);
    const dotA = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0x5ee0b0, depthTest: false }),
    );
    dotA.position.copy(info.pointA);
    dotA.renderOrder = 999;
    const dotB = dotA.clone();
    dotB.position.copy(info.pointB);
    this.distanceLines.add(dotA, dotB);
    this.render();
  }

  setPointMarkers(points: { position: THREE.Vector3; color: number; label?: string }[]) {
    this.clearGroup(this.pointMarkers);
    for (const p of points) {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(2.1, 14, 12),
        new THREE.MeshBasicMaterial({ color: p.color, depthTest: false }),
      );
      dot.position.copy(p.position);
      dot.renderOrder = 1000;
      this.pointMarkers.add(dot);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(3.0, 3.7, 20),
        new THREE.MeshBasicMaterial({ color: p.color, transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthTest: false }),
      );
      ring.position.copy(p.position);
      ring.lookAt(this.camera.position);
      ring.renderOrder = 999;
      this.pointMarkers.add(ring);
    }
    this.render();
  }

  private clearGroup(g: THREE.Group) {
    for (const child of [...g.children]) {
      g.remove(child);
      const obj = child as THREE.Mesh;
      obj.geometry?.dispose();
      const mat = obj.material;
      if (Array.isArray(mat)) mat.forEach(m => m.dispose());
      else mat?.dispose();
    }
  }

  /* -------------------- 交互 -------------------- */

  private bindPointer() {
    const el = this.renderer.domElement;
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      if (this.dragging) return;
      this.setPointer(e);
      if (this.mode === 'pick-point') {
        const hit = this.raycastShard();
        if (hit) this.callbacks.onPickPoint(hit.id, hit.point, hit.normal);
        return;
      }
      this.downPos = { x: e.clientX, y: e.clientY };
    });

    el.addEventListener('pointerup', (e) => {
      if (e.button !== 0 || this.dragging) return;
      if (this.mode === 'pick-point') return;
      if (this.downPos && Math.hypot(e.clientX - this.downPos.x, e.clientY - this.downPos.y) > 4) return;
      this.setPointer(e);
      const hit = this.raycastShard();
      this.callbacks.onPickShard(hit?.id ?? null);
      if (hit) this.needsProbe = true;
    });

    el.addEventListener('pointermove', (e) => {
      this.setPointer(e);
      if (this.dragging) { this.needsProbe = true; return; }
      const now = performance.now();
      if (now - this.lastProbeTime < 40) return;
      this.lastProbeTime = now;
      const hit = this.raycastShard();
      this.callbacks.onHover(hit?.id ?? null);
    });

    el.addEventListener('pointerleave', () => this.callbacks.onHover(null));
  }

  private downPos: { x: number; y: number } | null = null;

  private setPointer(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }

  private raycastShard(): { id: string; point: THREE.Vector3; normal: THREE.Vector3 } | null {
    const meshes: THREE.Mesh[] = [];
    for (const v of this.views.values()) {
      if (v.group.visible) meshes.push(v.mesh);
    }
    const hits = this.raycaster.intersectObjects(meshes, false);
    if (!hits.length) return null;
    const hit = hits[0];
    const id = hit.object.userData.shardId as string;
    let normal = new THREE.Vector3(0, 1, 0);
    const geo = (hit.object as THREE.Mesh).geometry;
    if (hit.face && geo.index) {
      const pos = geo.attributes.position;
      const idx = geo.index;
      const f = hit.faceIndex ?? 0;
      const a = new THREE.Vector3().fromBufferAttribute(pos, idx.getX(f * 3));
      const b = new THREE.Vector3().fromBufferAttribute(pos, idx.getX(f * 3 + 1));
      const c = new THREE.Vector3().fromBufferAttribute(pos, idx.getX(f * 3 + 2));
      normal = new THREE.Vector3().subVectors(b, a).cross(new THREE.Vector3().subVectors(c, a)).normalize();
    }
    const worldNormal = normal.clone().transformDirection(hit.object.matrixWorld);
    return { id, point: hit.point.clone(), normal: worldNormal };
  }

  /* -------------------- 相机 -------------------- */

  frameAll(padding = 1.25) {
    const box = new THREE.Box3();
    let any = false;
    for (const v of this.views.values()) {
      if (!v.group.visible) continue;
      box.expandByObject(v.group);
      any = true;
    }
    if (this.mergedView?.visible) {
      box.expandByObject(this.mergedView);
      any = true;
    }
    if (!any) return;
    this.frameBox(box, padding);
  }

  frameBox(box: THREE.Box3, padding = 1.6) {
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const radius = Math.max(size.length() * 0.5, 8);
    const dist = radius * padding / Math.sin((this.camera.fov * Math.PI) / 360);
    const dir = new THREE.Vector3(0.62, 0.55, 0.75).normalize();
    this.camera.position.copy(center).addScaledVector(dir, dist);
    this.orbit.target.copy(center);
    this.camera.near = Math.max(0.3, dist / 800);
    this.camera.far = dist * 12;
    this.camera.updateProjectionMatrix();
    this.orbit.update();
    this.render();
  }

  frameShard(id: string, padding = 2.0) {
    const v = this.views.get(id);
    if (!v) return;
    this.frameBox(new THREE.Box3().setFromObject(v.group), padding);
  }

  // 沿世界坐标轴观察
  setViewDirection(dir: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom' | 'iso') {
    const target = this.orbit.target.clone();
    const dist = this.camera.position.distanceTo(target);
    const dirs: Record<string, THREE.Vector3> = {
      front: new THREE.Vector3(0, 0.15, 1),
      back: new THREE.Vector3(0, 0.15, -1),
      left: new THREE.Vector3(-1, 0.15, 0),
      right: new THREE.Vector3(1, 0.15, 0),
      top: new THREE.Vector3(0, 1, 0.001),
      bottom: new THREE.Vector3(0, -1, 0.001),
      iso: new THREE.Vector3(0.62, 0.55, 0.75),
    };
    this.camera.position.copy(target).addScaledVector(dirs[dir].normalize(), dist);
    this.orbit.update();
    this.render();
  }

  getCameraState() {
    return {
      position: this.camera.position.clone(),
      target: this.orbit.target.clone(),
    };
  }

  setCameraState(state: { position: THREE.Vector3; target: THREE.Vector3 }) {
    this.camera.position.copy(state.position);
    this.orbit.target.copy(state.target);
    this.orbit.update();
    this.render();
  }

  screenshot(): string {
    this.render();
    return this.renderer.domElement.toDataURL('image/png');
  }

  /* -------------------- 生命周期 -------------------- */

  private resize() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  private animate = () => {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.animate);
    this.orbit.update();
    for (const child of this.problemGroup.children) {
      if (child.userData.billboard) child.lookAt(this.camera.position);
    }
    // 拖动时以节流频率刷新距离探针
    if (this.needsProbe && this.mode !== 'pick-point') {
      this.needsProbe = false;
    }
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.resizeObserver.disconnect();
    this.transform.dispose();
    this.orbit.dispose();
    for (const v of this.views.values()) {
      v.mesh.geometry.dispose();
      v.material.dispose();
      if (v.edges) {
        v.edges.geometry.dispose();
        (v.edges.material as THREE.Material).dispose();
      }
    }
    if (this.mergedView) {
      this.mergedView.geometry.dispose();
      (this.mergedView.material as THREE.Material).dispose();
    }
    this.views.clear();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

// 注册加速拾取
import { acceleratedRaycast } from 'three-mesh-bvh';
THREE.Mesh.prototype.raycast = acceleratedRaycast;

export { MeshBVH };
