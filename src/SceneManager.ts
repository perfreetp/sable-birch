import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';
import {
  Pose,
  ClearanceResult,
  ContainerInfo,
  HelperViewMode,
  AXIS_LIMITS,
} from './types';
import { ContainerCell, CONTAINER, YARD } from './yard';

THREE.Mesh.prototype.raycast = acceleratedRaycast;

export interface SceneEvents {
  onClearance: (r: ClearanceResult) => void;
  onPoseChange: (p: Pose, source: 'drag' | 'replay') => void;
  onContainerClick: (info: ContainerInfo | null) => void;
  onHelperModeChange: (m: HelperViewMode) => void;
}

const SPREADER_H = 0.9;
const TIER_COLORS = [0x8fa8c8, 0x7fbf7f, 0xd8a75f, 0xc87f8f];
const RAIL_COLOR = 0x666e78;
const CURB_COLOR = 0x9a9a4a;

export class SceneManager {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private raycaster = new THREE.Raycaster();
  private clock = new THREE.Clock();
  private disposed = false;

  private pose: Pose;
  private threshold: number;

  // 静态场景 (箱体 + 轨道梁 + 车道缘石) 合并网格与 BVH
  private staticMesh!: THREE.Mesh;
  private staticBVH!: MeshBVH;
  private triToContainer: Int32Array = new Int32Array(0);
  private baseColors!: Float32Array;
  private selectedContainer = -1;

  // 场桥
  private crane = new THREE.Group();
  private trolley!: THREE.Mesh;
  private spreaderGroup = new THREE.Group();
  private spreaderMesh!: THREE.Mesh;
  private envelopeMesh!: THREE.Mesh;
  private envelopeEdges!: THREE.LineSegments;
  private ropes: THREE.Line[] = [];
  private spreaderBaseGeom!: THREE.BufferGeometry; // 吊具盒体(局部)
  private collGeom!: THREE.BufferGeometry;         // 世界坐标碰撞几何

  // 辅助线
  private helperMode: HelperViewMode = 'none';
  private helperGroup = new THREE.Group();

  // 最近点可视化
  private closestLine: THREE.Line;
  private distSprite: THREE.Sprite;
  private distCanvas: HTMLCanvasElement;
  private distCtx: CanvasRenderingContext2D;
  private distTexture: THREE.CanvasTexture;

  // 回放动画
  private animFrom: Pose | null = null;
  private animTo: Pose | null = null;
  private animT = 0;

  // 拖拽状态
  private dragPart: 'gantry' | 'trolley' | 'hoist' | 'rotate' | null = null;
  private dragStart = new THREE.Vector2();
  private dragStartPose: Pose | null = null;
  private pointerDownAt = new THREE.Vector2();
  private pointerDownOnSpreader = false;

  constructor(
    private containerEl: HTMLElement,
    private cells: ContainerCell[],
    initialPose: Pose,
    threshold: number,
    private events: SceneEvents,
  ) {
    this.pose = { ...initialPose };
    this.threshold = threshold;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
    containerEl.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      50,
      containerEl.clientWidth / containerEl.clientHeight,
      0.1,
      2000,
    );
    this.camera.position.set(-32, 30, 52);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(60, 4, 14);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };

    this.scene.background = new THREE.Color(0x1a2028);
    this.scene.fog = new THREE.Fog(0x1a2028, 180, 600);

    const hemi = new THREE.HemisphereLight(0xbfd4ff, 0x30342c, 0.9);
    const dir = new THREE.DirectionalLight(0xffffff, 1.4);
    dir.position.set(80, 120, 60);
    this.scene.add(hemi, dir);

    this.buildGround();
    this.buildStaticGeometry();
    this.buildCrane();

    // 最近点连线
    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    this.closestLine = new THREE.Line(
      lineGeom,
      new THREE.LineBasicMaterial({ color: 0xffe14d, linewidth: 2 }),
    );
    this.closestLine.visible = false;
    this.closestLine.frustumCulled = false;
    this.scene.add(this.closestLine);

    // 距离数值标签
    this.distCanvas = document.createElement('canvas');
    this.distCanvas.width = 256;
    this.distCanvas.height = 80;
    this.distCtx = this.distCanvas.getContext('2d')!;
    this.distTexture = new THREE.CanvasTexture(this.distCanvas);
    const spriteMat = new THREE.SpriteMaterial({
      map: this.distTexture,
      depthTest: false,
      transparent: true,
    });
    this.distSprite = new THREE.Sprite(spriteMat);
    this.distSprite.scale.set(6, 1.9, 1);
    this.distSprite.visible = false;
    this.scene.add(this.distSprite);

    this.scene.add(this.helperGroup);

    this.applyPose();
    this.bindPointerEvents();
    window.addEventListener('resize', this.onResize);
    this.renderer.setAnimationLoop(this.renderLoop);
  }

  // ---------------------------------------------------------------- 场景构建

  private buildGround() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(600, 200),
      new THREE.MeshLambertMaterial({ color: 0x2c3138 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(120, -0.01, 20);
    this.scene.add(ground);

    const grid = new THREE.GridHelper(600, 120, 0x3a4552, 0x2f3844);
    grid.position.set(120, 0.01, 20);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.5;
    this.scene.add(grid);

    // 集卡车道 (沥青色条带 + 车道虚线)
    const lane = new THREE.Mesh(
      new THREE.PlaneGeometry(280, 5.2),
      new THREE.MeshLambertMaterial({ color: 0x23262c }),
    );
    lane.rotation.x = -Math.PI / 2;
    lane.position.set(120, 0.02, YARD.truckLaneZ);
    this.scene.add(lane);

    const dashGeom: THREE.BufferGeometry[] = [];
    for (let x = -10; x < 250; x += 6) {
      const g = new THREE.PlaneGeometry(3, 0.18);
      g.rotateX(-Math.PI / 2);
      g.translate(x, 0.03, YARD.truckLaneZ);
      dashGeom.push(g);
    }
    const dashes = new THREE.Mesh(
      mergeGeometries(dashGeom),
      new THREE.MeshBasicMaterial({ color: 0xcccc66 }),
    );
    this.scene.add(dashes);
  }

  private buildStaticGeometry() {
    const geoms: THREE.BufferGeometry[] = [];
    const triMap: number[] = [];
    const color = new THREE.Color();

    // 箱体
    this.cells.forEach((cell, idx) => {
      const len = cell.size === 40 ? CONTAINER.L40 : CONTAINER.L20;
      const g = new THREE.BoxGeometry(len, CONTAINER.H, CONTAINER.W).toNonIndexed();
      g.translate(cell.x, cell.y, cell.z);
      color.setHex(TIER_COLORS[(cell.tier - 1) % TIER_COLORS.length]);
      const n = g.attributes.position.count;
      const cols = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) color.toArray(cols, i * 3);
      g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      geoms.push(g);
      for (let t = 0; t < 12; t++) triMap.push(idx);
    });

    // 轨道梁 (两条, 沿 X)
    const railLen = 280;
    for (const z of [0, YARD.craneSpan]) {
      const g = new THREE.BoxGeometry(railLen, YARD.railTop, 0.9).toNonIndexed();
      g.translate(120, YARD.railTop / 2, z);
      const n = g.attributes.position.count;
      const cols = new Float32Array(n * 3);
      color.setHex(RAIL_COLOR);
      for (let i = 0; i < n; i++) color.toArray(cols, i * 3);
      g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      geoms.push(g);
      for (let t = 0; t < 12; t++) triMap.push(-1);
    }

    // 集卡车道缘石 (车道两侧)
    for (const z of [YARD.truckLaneZ - 2.8, YARD.truckLaneZ + 2.8]) {
      const g = new THREE.BoxGeometry(280, 0.3, 0.3).toNonIndexed();
      g.translate(120, 0.15, z);
      const n = g.attributes.position.count;
      const cols = new Float32Array(n * 3);
      color.setHex(CURB_COLOR);
      for (let i = 0; i < n; i++) color.toArray(cols, i * 3);
      g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      geoms.push(g);
      for (let t = 0; t < 12; t++) triMap.push(-1);
    }

    const merged = mergeGeometries(geoms)!;
    this.staticBVH = new MeshBVH(merged);
    merged.boundsTree = this.staticBVH;
    this.triToContainer = Int32Array.from(triMap);
    this.baseColors = (merged.attributes.color.array as Float32Array).slice();

    this.staticMesh = new THREE.Mesh(
      merged,
      new THREE.MeshLambertMaterial({ vertexColors: true }),
    );
    this.staticMesh.userData.part = 'static';
    this.scene.add(this.staticMesh);
  }

  private buildCrane() {
    const steel = new THREE.MeshLambertMaterial({ color: 0xd8b13a });
    const steelDark = new THREE.MeshLambertMaterial({ color: 0x8a7a30 });

    const legH = 17.5;
    const legGeom = new THREE.BoxGeometry(0.9, legH, 0.9);
    for (const x of [-4.5, 4.5]) {
      for (const z of [0, YARD.craneSpan]) {
        const leg = new THREE.Mesh(legGeom, steel);
        leg.position.set(x, legH / 2 + YARD.railTop, z);
        leg.userData.part = 'gantry';
        this.crane.add(leg);
        // 台车
        const bogie = new THREE.Mesh(
          new THREE.BoxGeometry(2.2, 0.8, 1.6),
          steelDark,
        );
        bogie.position.set(x, YARD.railTop + 0.4, z);
        bogie.userData.part = 'gantry';
        this.crane.add(bogie);
      }
    }

    // 主梁 (沿 Z 跨箱区) + 端梁 (沿 X)
    const girderGeom = new THREE.BoxGeometry(1.1, 1.4, YARD.craneSpan + 4);
    for (const x of [-4.5, 4.5]) {
      const girder = new THREE.Mesh(girderGeom, steel);
      girder.position.set(x, legH + YARD.railTop + 0.7, YARD.craneSpan / 2);
      girder.userData.part = 'gantry';
      this.crane.add(girder);
    }
    const endBeamGeom = new THREE.BoxGeometry(10, 1.2, 1.0);
    for (const z of [0, YARD.craneSpan]) {
      const beam = new THREE.Mesh(endBeamGeom, steel);
      beam.position.set(0, legH + YARD.railTop + 0.6, z);
      beam.userData.part = 'gantry';
      this.crane.add(beam);
    }

    // 小车
    this.trolley = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 1.1, 4.2),
      new THREE.MeshLambertMaterial({ color: 0x4a6a8a }),
    );
    this.trolley.userData.part = 'trolley';
    this.crane.add(this.trolley);

    // 吊具 (含回转) —— spreaderGroup 位于小车正下方, 随起升/回转运动
    this.spreaderGroup.userData.part = 'spreader';
    this.crane.add(this.spreaderGroup);
    this.buildSpreader();

    // 钢丝绳 (4 根)
    const ropeMat = new THREE.LineBasicMaterial({ color: 0xbbbbbb });
    for (let i = 0; i < 4; i++) {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      const rope = new THREE.Line(g, ropeMat);
      rope.frustumCulled = false;
      this.crane.add(rope);
      this.ropes.push(rope);
    }

    this.scene.add(this.crane);
  }

  private buildSpreader() {
    // 清除旧吊具
    while (this.spreaderGroup.children.length) {
      const c = this.spreaderGroup.children.pop()!;
      this.spreaderGroup.remove(c);
    }
    const len = this.pose.spreader === 40 ? CONTAINER.L40 : CONTAINER.L20;

    this.spreaderMesh = new THREE.Mesh(
      new THREE.BoxGeometry(len, SPREADER_H, CONTAINER.W),
      new THREE.MeshLambertMaterial({ color: 0xd06030 }),
    );
    this.spreaderMesh.userData.part = 'spreader';
    this.spreaderGroup.add(this.spreaderMesh);

    // 转锁角件
    const lockGeom = new THREE.BoxGeometry(0.3, 0.25, 0.3);
    const lockMat = new THREE.MeshLambertMaterial({ color: 0x333333 });
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const lock = new THREE.Mesh(lockGeom, lockMat);
        lock.position.set(
          (sx * (len - 0.3)) / 2,
          -SPREADER_H / 2 - 0.12,
          (sz * (CONTAINER.W - 0.3)) / 2,
        );
        this.spreaderGroup.add(lock);
      }
    }

    // 包络体 (半透明, 尺寸 = 吊具 + 2×净空阈值)
    const envGeom = new THREE.BoxGeometry(1, 1, 1);
    this.envelopeMesh = new THREE.Mesh(
      envGeom,
      new THREE.MeshBasicMaterial({
        color: 0x22cc88,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    this.envelopeMesh.userData.part = 'spreader';
    this.spreaderGroup.add(this.envelopeMesh);

    this.envelopeEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(envGeom),
      new THREE.LineBasicMaterial({ color: 0x22cc88, transparent: true, opacity: 0.8 }),
    );
    this.envelopeEdges.raycast = () => {}; // 线框不参与拾取
    this.spreaderGroup.add(this.envelopeEdges);

    // 碰撞几何: 局部盒体 + 自身 BVH (closestPointToGeometry 需要)
    this.spreaderBaseGeom = new THREE.BoxGeometry(len, SPREADER_H, CONTAINER.W);
    this.collGeom = this.spreaderBaseGeom.clone();
    this.collGeom.boundsTree = new MeshBVH(this.collGeom);

    this.updateEnvelopeSize();
  }

  private updateEnvelopeSize() {
    const len = this.pose.spreader === 40 ? CONTAINER.L40 : CONTAINER.L20;
    const t = this.threshold;
    this.envelopeMesh.scale.set(len + 2 * t, SPREADER_H + 2 * t, CONTAINER.W + 2 * t);
    this.envelopeEdges.scale.copy(this.envelopeMesh.scale);
  }

  // ---------------------------------------------------------------- 姿态应用

  setPose(pose: Pose) {
    const spreaderChanged = pose.spreader !== this.pose.spreader;
    this.pose = { ...pose };
    this.animFrom = null; // 外部修改时取消回放动画
    if (spreaderChanged) this.buildSpreader();
    this.applyPose();
  }

  setThreshold(t: number) {
    this.threshold = t;
    this.updateEnvelopeSize();
    this.applyPose();
  }

  getPose(): Pose {
    return { ...this.pose };
  }

  /** 回放: 平滑过渡到目标姿态 */
  animateTo(pose: Pose) {
    if (pose.spreader !== this.pose.spreader) {
      this.pose.spreader = pose.spreader;
      this.buildSpreader();
    }
    this.animFrom = { ...this.pose };
    this.animTo = { ...pose };
    this.animT = 0;
  }

  private applyPose() {
    const p = this.pose;
    this.crane.position.x = p.gantry;
    this.trolley.position.set(0, 18.6, p.trolley);
    this.spreaderGroup.position.set(0, p.hoist + SPREADER_H / 2, p.trolley);
    this.spreaderGroup.rotation.y = THREE.MathUtils.degToRad(p.rotation);

    // 钢丝绳: 小车底角 -> 吊具顶角 (吊具局部坐标随回转)
    const topY = 18.05;
    const corners = [
      new THREE.Vector3(-1.4, topY, p.trolley - 1.8),
      new THREE.Vector3(1.4, topY, p.trolley - 1.8),
      new THREE.Vector3(-1.4, topY, p.trolley + 1.8),
      new THREE.Vector3(1.4, topY, p.trolley + 1.8),
    ];
    const len = p.spreader === 40 ? CONTAINER.L40 : CONTAINER.L20;
    const rot = THREE.MathUtils.degToRad(p.rotation);
    const cos = Math.cos(rot);
    const sin = Math.sin(rot);
    const spreaderTop = p.hoist + SPREADER_H;
    const local = [
      [-len / 2 + 0.5, -CONTAINER.W / 2 + 0.3],
      [len / 2 - 0.5, -CONTAINER.W / 2 + 0.3],
      [-len / 2 + 0.5, CONTAINER.W / 2 - 0.3],
      [len / 2 - 0.5, CONTAINER.W / 2 - 0.3],
    ];
    this.ropes.forEach((rope, i) => {
      const [lx, lz] = local[i];
      const wx = lx * cos + lz * sin;
      const wz = -lx * sin + lz * cos;
      const pos = rope.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, corners[i].x, corners[i].y, corners[i].z);
      pos.setXYZ(1, wx, spreaderTop, p.trolley + wz);
      pos.needsUpdate = true;
    });

    this.updateHelpers();
    this.computeClearance();
  }

  // ---------------------------------------------------------------- BVH 净空检测

  private computeClearance() {
    // 确保矩阵最新 (applyPose 可能在渲染循环外被调用)
    this.crane.updateMatrixWorld(true);
    const spreaderMatrix = this.spreaderGroup.matrixWorld;

    // 最小间距: 吊具(局部几何 + 变换矩阵) vs 静态场景 BVH
    const target1 = { point: new THREE.Vector3(), distance: 0, faceIndex: 0 };
    const target2 = { point: new THREE.Vector3(), distance: 0, faceIndex: 0 };
    const hit = this.staticBVH.closestPointToGeometry(
      this.collGeom,
      spreaderMatrix,
      target1,
      target2,
    );
    const minDist = hit ? hit.distance : Infinity;
    // target2 在吊具局部坐标系, 转到世界坐标
    const pointOnSpreader = target2.point.clone().applyMatrix4(spreaderMatrix);
    const pointOnStatic = target1.point.clone();

    // 包络体 (吊具外扩阈值) 穿透检测: 收集侵入的三角面
    const t = this.threshold;
    const len = this.pose.spreader === 40 ? CONTAINER.L40 : CONTAINER.L20;
    const localBox = new THREE.Box3(
      new THREE.Vector3(-len / 2 - t, -SPREADER_H / 2 - t, -CONTAINER.W / 2 - t),
      new THREE.Vector3(len / 2 + t, SPREADER_H / 2 + t, CONTAINER.W / 2 + t),
    );
    const inv = spreaderMatrix.clone().invert();
    const worldBox = localBox.clone().applyMatrix4(spreaderMatrix);

    const hitTris: number[] = [];
    const tmpTri = new THREE.Triangle();
    this.staticBVH.shapecast({
      intersectsBounds: (box) => box.intersectsBox(worldBox),
      intersectsTriangle: (tri, triIndex) => {
        tmpTri.a.copy(tri.a).applyMatrix4(inv);
        tmpTri.b.copy(tri.b).applyMatrix4(inv);
        tmpTri.c.copy(tri.c).applyMatrix4(inv);
        if (tmpTri.intersectsBox(localBox)) {
          hitTris.push(triIndex);
        }
        return false;
      },
    });

    this.paintHits(hitTris);

    const ok = hitTris.length === 0 && minDist >= this.threshold;
    const hasPoints = hit != null;
    const result: ClearanceResult = {
      minDistance: Number.isFinite(minDist) ? Math.max(0, minDist) : 99,
      ok,
      hitTriangles: hitTris.length,
      threshold: this.threshold,
      closestA: hasPoints
        ? [pointOnStatic.x, pointOnStatic.y, pointOnStatic.z]
        : null,
      closestB: hasPoints
        ? [pointOnSpreader.x, pointOnSpreader.y, pointOnSpreader.z]
        : null,
    };
    this.updateClosestVisual(result);
    this.events.onClearance(result);
  }

  /** 相交面染红, 选中箱染黄, 其余恢复原色 */
  private paintHits(hitTris: number[]) {
    const attr = this.staticMesh.geometry.attributes
      .color as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    arr.set(this.baseColors);

    const paintTri = (triIdx: number, r: number, g: number, b: number) => {
      for (let v = 0; v < 3; v++) {
        const o = (triIdx * 3 + v) * 3;
        arr[o] = r;
        arr[o + 1] = g;
        arr[o + 2] = b;
      }
    };

    if (this.selectedContainer >= 0) {
      const start = this.selectedContainer * 12;
      for (let i = 0; i < 12; i++) paintTri(start + i, 0.95, 0.85, 0.3);
    }
    for (const ti of hitTris) paintTri(ti, 1.0, 0.12, 0.1);

    attr.needsUpdate = true;

    // 包络体配色
    const violated = hitTris.length > 0;
    const c = violated ? 0xff4444 : 0x22cc88;
    (this.envelopeMesh.material as THREE.MeshBasicMaterial).color.setHex(c);
    (this.envelopeEdges.material as THREE.LineBasicMaterial).color.setHex(c);
  }

  private updateClosestVisual(r: ClearanceResult) {
    const show = r.minDistance < 3.0 && r.closestA && r.closestB;
    this.closestLine.visible = !!show;
    this.distSprite.visible = !!show;
    if (!show) return;

    const a = new THREE.Vector3(...r.closestA!);
    const b = new THREE.Vector3(...r.closestB!);
    const pos = this.closestLine.geometry.attributes
      .position as THREE.BufferAttribute;
    pos.setXYZ(0, a.x, a.y, a.z);
    pos.setXYZ(1, b.x, b.y, b.z);
    pos.needsUpdate = true;
    (this.closestLine.material as THREE.LineBasicMaterial).color.setHex(
      r.ok ? 0xffe14d : 0xff5040,
    );

    const mid = a.clone().add(b).multiplyScalar(0.5);
    this.distSprite.position.copy(mid).add(new THREE.Vector3(0, 1.2, 0));

    const ctx = this.distCtx;
    ctx.clearRect(0, 0, 256, 80);
    ctx.fillStyle = r.ok ? 'rgba(20,40,30,0.85)' : 'rgba(70,15,15,0.9)';
    ctx.fillRect(0, 0, 256, 80);
    ctx.strokeStyle = r.ok ? '#ffe14d' : '#ff5040';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 252, 76);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${r.minDistance.toFixed(2)} m`, 128, 42);
    this.distTexture.needsUpdate = true;
  }

  // ---------------------------------------------------------------- 辅助线 (俯视/侧视)

  private updateHelpers() {
    while (this.helperGroup.children.length) {
      const c = this.helperGroup.children.pop()!;
      this.helperGroup.remove(c);
      (c as THREE.Line).geometry?.dispose();
    }
    if (this.helperMode === 'none') return;

    const p = this.pose;
    const len = p.spreader === 40 ? CONTAINER.L40 : CONTAINER.L20;
    const rot = THREE.MathUtils.degToRad(p.rotation);
    const cos = Math.cos(rot);
    const sin = Math.sin(rot);
    const cx = p.gantry;
    const cz = p.trolley;
    const cy = p.hoist + SPREADER_H / 2;

    // 吊具四角 (世界)
    const corners: THREE.Vector3[] = [];
    for (const [lx, lz] of [
      [-len / 2, -CONTAINER.W / 2],
      [len / 2, -CONTAINER.W / 2],
      [len / 2, CONTAINER.W / 2],
      [-len / 2, CONTAINER.W / 2],
    ]) {
      corners.push(
        new THREE.Vector3(cx + lx * cos + lz * sin, cy, cz - lx * sin + lz * cos),
      );
    }

    const mat = new THREE.LineDashedMaterial({
      color: 0x4dd2ff,
      dashSize: 0.5,
      gapSize: 0.3,
      transparent: true,
      opacity: 0.9,
    });
    const solidMat = new THREE.LineBasicMaterial({ color: 0x4dd2ff });

    if (this.helperMode === 'top') {
      // 俯视: 四角向地面投影 + 地面足迹轮廓
      for (const c of corners) {
        const g = new THREE.BufferGeometry().setFromPoints([
          c,
          new THREE.Vector3(c.x, 0.02, c.z),
        ]);
        const line = new THREE.Line(g, mat);
        line.computeLineDistances();
        this.helperGroup.add(line);
      }
      const fp = corners.map((c) => new THREE.Vector3(c.x, 0.02, c.z));
      fp.push(fp[0].clone());
      const outline = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(fp),
        solidMat,
      );
      this.helperGroup.add(outline);
    } else {
      // 侧视: 四角向海侧立面 (z = -2.5) 投影 + 立面轮廓
      const planeZ = -2.5;
      for (const c of corners) {
        const g = new THREE.BufferGeometry().setFromPoints([
          c,
          new THREE.Vector3(c.x, c.y, planeZ),
        ]);
        const line = new THREE.Line(g, mat);
        line.computeLineDistances();
        this.helperGroup.add(line);
      }
      const proj = corners.map((c) => new THREE.Vector3(c.x, c.y, planeZ));
      proj.push(proj[0].clone());
      const outline = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(proj),
        solidMat,
      );
      this.helperGroup.add(outline);
      // 投影参考面
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 20),
        new THREE.MeshBasicMaterial({
          color: 0x4dd2ff,
          transparent: true,
          opacity: 0.05,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      plane.position.set(cx, 10, planeZ);
      this.helperGroup.add(plane);
    }
  }

  // ---------------------------------------------------------------- 交互

  private bindPointerEvents() {
    // pointerdown 用捕获阶段挂在容器上: 命中场桥部件时拦截,
    // 阻止 OrbitControls 同时收到事件而旋转相机
    this.containerEl.addEventListener('pointerdown', this.onPointerDown, true);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    this.renderer.domElement.addEventListener('contextmenu', (e) =>
      e.preventDefault(),
    );
  }

  private pick(ev: PointerEvent): THREE.Intersection | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((ev.clientX - rect.left) / rect.width) * 2 - 1,
      -((ev.clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    this.raycaster.firstHitOnly = true;
    const hits = this.raycaster.intersectObjects(
      [this.crane, this.staticMesh],
      true,
    );
    return hits.length ? hits[0] : null;
  }

  private onPointerDown = (ev: PointerEvent) => {
    if (ev.button !== 0) return;
    const hit = this.pick(ev);
    this.pointerDownAt.set(ev.clientX, ev.clientY);
    this.pointerDownOnSpreader = false;
    if (!hit) return;

    const part = this.findPart(hit.object);
    if (part !== 'spreader' && part !== 'trolley' && part !== 'gantry') return;

    // 命中可拖拽部件: 拦截事件, 相机不跟随
    ev.stopPropagation();
    ev.preventDefault();
    this.dragStart.set(ev.clientX, ev.clientY);
    this.dragStartPose = { ...this.pose };

    if (part === 'spreader') {
      this.pointerDownOnSpreader = true;
      this.dragPart = ev.shiftKey ? 'rotate' : 'hoist';
    } else if (part === 'trolley') {
      this.dragPart = 'trolley';
    } else {
      this.dragPart = 'gantry';
    }
    this.controls.enabled = false;
  };

  private findPart(obj: THREE.Object3D): string | null {
    let o: THREE.Object3D | null = obj;
    while (o) {
      if (o.userData.part) return o.userData.part as string;
      o = o.parent;
    }
    return null;
  }

  private onPointerMove = (ev: PointerEvent) => {
    if (!this.dragPart || !this.dragStartPose) return;
    const p = { ...this.dragStartPose };
    const rect = this.renderer.domElement.getBoundingClientRect();

    if (this.dragPart === 'hoist' || this.dragPart === 'rotate') {
      const dy = ev.clientY - this.dragStart.y;
      const dx = ev.clientX - this.dragStart.x;
      if (this.dragPart === 'hoist') {
        // 屏幕上移 -> 起升增加
        p.hoist = this.dragStartPose.hoist - dy * 0.05;
      } else {
        p.rotation = this.dragStartPose.rotation + dx * 0.4;
      }
    } else {
      // 小车/大车: 射线与水平面求交
      const ndc = new THREE.Vector2(
        ((ev.clientX - rect.left) / rect.width) * 2 - 1,
        -((ev.clientY - rect.top) / rect.height) * 2 + 1,
      );
      this.raycaster.setFromCamera(ndc, this.camera);
      const planeY = this.dragPart === 'trolley' ? 18.6 : 0;
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -planeY);
      const pt = new THREE.Vector3();
      if (this.raycaster.ray.intersectPlane(plane, pt)) {
        if (this.dragPart === 'trolley') {
          p.trolley = pt.z;
        } else {
          p.gantry = pt.x;
        }
      }
    }

    p.gantry = THREE.MathUtils.clamp(p.gantry, ...AXIS_LIMITS.gantry);
    p.trolley = THREE.MathUtils.clamp(p.trolley, ...AXIS_LIMITS.trolley);
    p.hoist = THREE.MathUtils.clamp(p.hoist, ...AXIS_LIMITS.hoist);
    p.rotation = THREE.MathUtils.clamp(p.rotation, ...AXIS_LIMITS.rotation);

    this.pose = p;
    this.applyPose();
    this.events.onPoseChange({ ...p }, 'drag');
  };

  private onPointerUp = (ev: PointerEvent) => {
    const wasDragging = this.dragPart !== null;
    const moved = Math.hypot(
      ev.clientX - this.pointerDownAt.x,
      ev.clientY - this.pointerDownAt.y,
    );
    this.dragPart = null;
    this.dragStartPose = null;
    this.controls.enabled = true;

    // 单击 (位移 < 5px): 吊具 -> 切换辅助线; 箱体 -> 显示箱信息
    if (moved < 5) {
      if (this.pointerDownOnSpreader && wasDragging) {
        this.cycleHelperMode();
        this.pointerDownOnSpreader = false;
        return;
      }
      const hit = this.pick(ev);
      if (hit && hit.object === this.staticMesh && hit.faceIndex != null) {
        const idx = this.triToContainer[hit.faceIndex];
        if (idx >= 0) {
          this.selectedContainer = idx;
          const c = this.cells[idx];
          const info: ContainerInfo = {
            boxId: c.boxId,
            block: c.block,
            bay: c.bay,
            row: c.row,
            tier: c.tier,
            size: c.size,
          };
          this.events.onContainerClick(info);
        } else {
          this.selectedContainer = -1;
          this.events.onContainerClick(null);
        }
        this.computeClearance(); // 重绘选中高亮
      } else if (hit == null) {
        this.selectedContainer = -1;
        this.events.onContainerClick(null);
        this.computeClearance();
      }
    }
    this.pointerDownOnSpreader = false;
  };

  private cycleHelperMode() {
    this.helperMode =
      this.helperMode === 'none'
        ? 'top'
        : this.helperMode === 'top'
          ? 'side'
          : 'none';
    this.updateHelpers();
    this.events.onHelperModeChange(this.helperMode);
  }

  // ---------------------------------------------------------------- 渲染循环

  private renderLoop = () => {
    if (this.disposed) return;
    const dt = Math.min(this.clock.getDelta(), 0.1);

    if (this.animFrom && this.animTo) {
      this.animT += dt / 1.2; // 1.2s 过渡
      const k = Math.min(this.animT, 1);
      const s = k * k * (3 - 2 * k); // smoothstep
      const lerp = (a: number, b: number) => a + (b - a) * s;
      let rot = this.animFrom.rotation;
      // 角度走最短路径
      let dr = this.animTo.rotation - rot;
      if (dr > 180) dr -= 360;
      if (dr < -180) dr += 360;
      this.pose = {
        gantry: lerp(this.animFrom.gantry, this.animTo.gantry),
        trolley: lerp(this.animFrom.trolley, this.animTo.trolley),
        hoist: lerp(this.animFrom.hoist, this.animTo.hoist),
        rotation: rot + dr * s,
        spreader: this.animTo.spreader,
      };
      this.applyPose();
      this.events.onPoseChange({ ...this.pose }, 'replay');
      if (k >= 1) {
        this.animFrom = null;
        this.animTo = null;
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private onResize = () => {
    const w = this.containerEl.clientWidth;
    const h = this.containerEl.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  dispose() {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    this.containerEl.removeEventListener('pointerdown', this.onPointerDown, true);
    this.renderer.domElement.remove();
    this.renderer.dispose();
    this.controls.dispose();
  }
}
