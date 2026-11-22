// 场景管理：渲染器、相机、光照、后期、船体/泊位/海面/缆绳/浪花组装与回放
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'postprocessing';
import { BloomEffect, FXAAEffect, RenderPass, EffectPass } from 'postprocessing';
import type {
  BerthConfig,
  FenderContact,
  LineState,
  ShipType,
  SimSample
} from '../types';
import { buildHull } from './hullBuilder';
import { buildBerth } from './berthBuilder';
import { buildSea } from './sea';
import { LineView } from './lineView';
import { SpraySystem } from './spray';
import { transformPoint } from '../sim/engine';

export interface SceneFrame {
  sample: SimSample;
  time: number;
}

export class SceneManager {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly composer: EffectComposer;
  private shipGroup: THREE.Group | null = null;
  private berthGroup: THREE.Group | null = null;
  private sea: ReturnType<typeof buildSea> | null = null;
  private spray: SpraySystem;
  private lineViews = new Map<string, LineView>();
  private contactMarkers: THREE.Mesh[] = [];
  private fenderHighlight: THREE.MeshStandardMaterial[] = [];
  private clock = new THREE.Clock();
  private raf = 0;
  private container: HTMLElement;
  private frame: SceneFrame | null = null;
  private threshold = 120;
  private lastContactPower = 0;
  private disposed = false;
  private followShip = true;
  private readonly camBase = new THREE.Vector3(150, 75, -70);

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x9fc4dc);
    this.scene.fog = new THREE.Fog(0x9fc4dc, 260, 720);

    this.camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.5,
      2000
    );
    this.camera.position.copy(this.camBase);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 25;
    this.controls.maxDistance = 600;
    this.controls.target.set(0, 4, 0);

    // 光照
    const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x33505e, 1.05);
    this.scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff2d8, 2.1);
    sun.position.set(120, 160, 90);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -260;
    sun.shadow.camera.right = 260;
    sun.shadow.camera.top = 260;
    sun.shadow.camera.bottom = -260;
    sun.shadow.camera.far = 600;
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0xbfd9ff, 0.5);
    fill.position.set(-90, 60, -80);
    this.scene.add(fill);

    // 后期：Bloom(浪花/报警发光) + FXAA
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloom = new BloomEffect({
      intensity: 0.62,
      luminanceThreshold: 0.62,
      luminanceSmoothing: 0.25,
      mipmapBlur: true
    });
    const fxaa = new FXAAEffect();
    this.composer.addPass(new EffectPass(this.camera, bloom, fxaa));

    this.spray = new SpraySystem();
    this.scene.add(this.spray.points);

    window.addEventListener('resize', this.onResize);
    this.loop();
  }

  setFollow(v: boolean): void {
    this.followShip = v;
  }

  resetView(): void {
    this.camera.position.copy(this.camBase);
    this.controls.target.set(0, 4, 0);
  }

  loadScene(ship: ShipType, berth: BerthConfig, threshold: number): void {
    this.clearScene();
    this.threshold = threshold;

    const berthModel = buildBerth(berth);
    this.berthGroup = berthModel.group;
    this.scene.add(this.berthGroup);
    this.fenderHighlight = berthModel.fenders.map((f) => f.material as THREE.MeshStandardMaterial);
    this.contactMarkers = berthModel.fenders.map((f) => f);

    const hull = buildHull(ship);
    this.shipGroup = hull.group;
    this.scene.add(this.shipGroup);

    this.sea = buildSea(700, 700);
    this.scene.add(this.sea.group);

    this.spray.reset();
    this.lineViews.clear();
    this.lastContactPower = 0;
  }

  /** 创建/复用缆绳视图（与配置 id 对齐） */
  syncLineIds(ids: string[]): void {
    for (const id of ids) {
      if (!this.lineViews.has(id)) {
        const v = new LineView(id);
        this.lineViews.set(id, v);
        this.scene.add(v.mesh);
      }
    }
    for (const [id, v] of this.lineViews) {
      if (!ids.includes(id)) {
        this.scene.remove(v.mesh);
        v.dispose();
        this.lineViews.delete(id);
      }
    }
  }

  setFrame(frame: SceneFrame): void {
    this.frame = frame;
  }

  private applySample(sample: SimSample, dt: number): void {
    if (!this.shipGroup) return;
    const s = {
      x: sample.x,
      z: sample.z,
      yaw: sample.yaw,
      roll: sample.roll,
      pitch: sample.pitch,
      heave: sample.heave
    };
    this.shipGroup.position.set(sample.x, sample.heave, sample.z);
    // three 旋转约定：y 轴 yaw、z 轴 roll(右倾+)、x 轴 pitch
    this.shipGroup.rotation.set(sample.pitch, sample.yaw, -sample.roll);

    // 缆绳
    this.syncLineIds(sample.lines.map((l) => l.id));
    for (const ls of sample.lines) {
      const view = this.lineViews.get(ls.id);
      if (view) view.update(ls, dt, this.threshold);
    }

    // 护舷高亮
    const contactSet = new Set(sample.contacts.map((c: FenderContact) => c.index));
    let power = 0;
    this.fenderHighlight.forEach((mat, i) => {
      if (contactSet.has(i)) {
        const c = sample.contacts.find((x) => x.index === i)!;
        power = Math.max(power, Math.min(1.4, c.normalForce / 120));
        const hot = new THREE.Color(0xff5533).lerp(new THREE.Color(0x1a1a1a), 0.25);
        mat.color.lerp(hot, 0.25);
        mat.emissive = new THREE.Color(0xff3300);
        mat.emissiveIntensity = 0.5 + power * 0.5;
      } else {
        mat.color.lerp(new THREE.Color(0x1a1a1a), 0.12);
        mat.emissiveIntensity *= 0.85;
      }
    });

    // 接触浪花（力增大时迸发）
    if (power > 0.25 && power - this.lastContactPower > 0.08) {
      for (const c of sample.contacts) {
        const origin = new THREE.Vector3(c.point.x, 0.15, c.point.z);
        this.spray.burst(origin, power);
      }
    }
    this.lastContactPower = power;

    if (this.sea) {
      this.sea.update(this.clock.elapsedTime, new THREE.Vector3(sample.x, 0, sample.z), power > 0.05);
    }
    this.spray.update(dt);

    if (this.followShip) {
      const target = this.controls.target;
      target.x += (sample.x - target.x) * 0.06;
      target.z += (sample.z - 6 - target.z) * 0.06;
      target.y += (3 - target.y) * 0.06;
    }
  }

  /** 显示静态姿态（参数设定模块预览初始船位） */
  showPreview(ship: ShipType, berth: BerthConfig, yawRad: number, pos: { x: number; z: number }): void {
    if (!this.shipGroup) this.loadScene(ship, berth, this.threshold);
    if (this.shipGroup) {
      this.shipGroup.position.set(pos.x, 0, pos.z);
      this.shipGroup.rotation.set(0, yawRad, 0);
    }
    if (this.sea) this.sea.update(this.clock.elapsedTime, new THREE.Vector3(pos.x, 0, pos.z), false);
  }

  private loop = (): void => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(0.05, this.clock.getDelta());
    if (this.frame) this.applySample(this.frame.sample, dt);
    this.controls.update();
    this.composer.render();
  };

  private onResize = (): void => {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
  };

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    this.controls.dispose();
    this.clearScene();
    this.composer.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private clearScene(): void {
    if (this.shipGroup) {
      this.scene.remove(this.shipGroup);
      this.shipGroup.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const m = o.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
      this.shipGroup = null;
    }
    if (this.berthGroup) {
      this.scene.remove(this.berthGroup);
      this.berthGroup.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const m = o.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
      this.berthGroup = null;
    }
    if (this.sea) {
      this.scene.remove(this.sea.group);
      this.sea = null;
    }
    for (const v of this.lineViews.values()) {
      this.scene.remove(v.mesh);
      v.dispose();
    }
    this.lineViews.clear();
  }
}

// 供外部复用点变换
export { transformPoint };
export type { LineState };
