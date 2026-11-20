import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { get, type Unsubscriber } from 'svelte/store';
import {
  params,
  simTime,
  playing,
  playSpeed,
  leakPosition,
  placingLeak,
  bloomOn,
  dofOn,
  autoRotate,
  diveTrigger,
  stats,
  type CameraState,
} from '../stores';
import {
  radiusAt,
  windOffsetAt,
  concentrationAt,
  contourRadiusAt,
  INTENSITY,
} from '../simulation';
import { buildCity, type CityData } from './cityBuilder';
import { createFogMaterial, createHeatMaterial } from './fogMaterial';

const HOME_POS = new THREE.Vector3(70, 60, 70);
const HOME_TARGET = new THREE.Vector3(0, 0, 0);

export class SceneManager {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private composer: EffectComposer;
  private bloomPass: UnrealBloomPass;
  private bokehPass: BokehPass;
  private clock = new THREE.Clock();
  private city: CityData;
  private raycaster = new THREE.Raycaster();
  private resizeObs: ResizeObserver;
  private unsubs: Unsubscriber[] = [];

  private fog: THREE.Mesh;
  private fogMat: THREE.ShaderMaterial;
  private heat: THREE.Mesh;
  private heatMat: THREE.ShaderMaterial;
  private contour: THREE.LineLoop;
  private leakMarker: THREE.Group;
  private windArrow: THREE.ArrowHelper;

  private flying = false;
  private flyT = 0;
  private flyDur = 2.2;
  private flyFromPos = new THREE.Vector3();
  private flyToPos = new THREE.Vector3();
  private flyFromTgt = new THREE.Vector3();
  private flyToTgt = new THREE.Vector3();

  constructor(private container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(0x101623);
    this.scene.fog = new THREE.Fog(0x101623, 180, 420);

    this.camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.copy(HOME_POS);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.copy(HOME_TARGET);
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 8;
    this.controls.maxDistance = 320;
    this.controls.autoRotateSpeed = 1.2;

    // 灯光
    this.scene.add(new THREE.HemisphereLight(0x8fb4ff, 0x30241c, 0.55));
    const dir = new THREE.DirectionalLight(0xffe0b3, 1.15);
    dir.position.set(60, 90, 40);
    this.scene.add(dir);

    // 街区与管廊
    this.city = buildCity();
    this.scene.add(this.city.group);
    const grid = new THREE.GridHelper(260, 26, 0x2e3a4d, 0x222b3a);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.35;
    grid.position.y = 0.03;
    this.scene.add(grid);

    // 体积雾
    this.fogMat = createFogMaterial();
    this.fog = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), this.fogMat);
    this.fog.renderOrder = 10;
    this.fog.frustumCulled = false;
    this.scene.add(this.fog);

    // 地面热区
    this.heatMat = createHeatMaterial();
    this.heat = new THREE.Mesh(new THREE.CircleGeometry(1, 64), this.heatMat);
    this.heat.rotation.x = -Math.PI / 2;
    this.heat.position.y = 0.06;
    this.heat.renderOrder = 2;
    this.scene.add(this.heat);

    // 影响范围轮廓线
    const contourPts: THREE.Vector3[] = [];
    for (let i = 0; i < 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      contourPts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a)));
    }
    this.contour = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(contourPts),
      new THREE.LineBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.9 })
    );
    this.contour.position.y = 0.12;
    this.contour.renderOrder = 3;
    this.scene.add(this.contour);

    // 泄漏点标记: 发光球 + 光柱 + 点光源
    this.leakMarker = new THREE.Group();
    const markerBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 16, 12),
      new THREE.MeshStandardMaterial({
        color: 0xff2200,
        emissive: 0xff3300,
        emissiveIntensity: 2.5,
      })
    );
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 26, 8, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0xff5533,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    beam.position.y = 13;
    const light = new THREE.PointLight(0xff6644, 30, 40);
    light.position.y = 2;
    this.leakMarker.add(markerBall, beam, light);
    this.scene.add(this.leakMarker);

    // 风向指示箭头
    this.windArrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(),
      14,
      0x66ccff,
      3,
      1.6
    );
    this.scene.add(this.windArrow);

    // 后处理: 辉光 + 景深
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bokehPass = new BokehPass(this.scene, this.camera, {
      focus: 90,
      aperture: 0.00035,
      maxblur: 0.008,
    });
    this.composer.addPass(this.bokehPass);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      0.9,
      0.6,
      0.72
    );
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(new OutputPass());

    // store 订阅
    this.unsubs.push(
      autoRotate.subscribe((v) => (this.controls.autoRotate = v)),
      bloomOn.subscribe((v) => (this.bloomPass.enabled = v)),
      dofOn.subscribe((v) => (this.bokehPass.enabled = v)),
      diveTrigger.subscribe((v) => {
        if (v > 0) this.diveToLeak();
      })
    );

    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown);

    this.resizeObs = new ResizeObserver(() => this.onResize());
    this.resizeObs.observe(container);

    this.renderer.setAnimationLoop(() => this.tick());
  }

  private onPointerDown = (e: PointerEvent): void => {
    if (!get(placingLeak)) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.city.pickTargets, false);
    if (hits.length > 0) {
      const p = hits[0].point;
      leakPosition.set({ x: p.x, y: Math.max(p.y, 0.4), z: p.z });
      placingLeak.set(false);
    }
  };

  private onResize(): void {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w === 0 || h === 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
  }

  /** 相机飞行 (环绕/俯冲/复位共用) */
  private flyTo(pos: THREE.Vector3, tgt: THREE.Vector3, dur = 2.2): void {
    this.flyFromPos.copy(this.camera.position);
    this.flyFromTgt.copy(this.controls.target);
    this.flyToPos.copy(pos);
    this.flyToTgt.copy(tgt);
    this.flyT = 0;
    this.flyDur = dur;
    this.flying = true;
    this.controls.enabled = false;
  }

  /** 俯冲: 从当前视角俯冲至泄漏点上空低位 */
  diveToLeak(): void {
    const l = get(leakPosition);
    const tgt = new THREE.Vector3(l.x, l.y, l.z);
    this.flyTo(tgt.clone().add(new THREE.Vector3(16, 7, 16)), tgt, 2.4);
  }

  resetView(): void {
    this.flyTo(HOME_POS.clone(), HOME_TARGET.clone(), 1.8);
  }

  getCameraState(): CameraState {
    return {
      position: [this.camera.position.x, this.camera.position.y, this.camera.position.z],
      target: [this.controls.target.x, this.controls.target.y, this.controls.target.z],
    };
  }

  setCameraState(s: CameraState): void {
    this.camera.position.set(...s.position);
    this.controls.target.set(...s.target);
    this.controls.update();
  }

  private tick(): void {
    const dt = Math.min(this.clock.getDelta(), 0.1);
    const p = get(params);

    // 时间推进
    if (get(playing)) {
      let nt = get(simTime) + dt * get(playSpeed);
      if (nt >= p.duration) {
        nt = p.duration;
        playing.set(false);
      }
      simTime.set(nt);
    }
    const t = Math.min(get(simTime), p.duration);
    const leak = get(leakPosition);

    // 相机飞行动画
    if (this.flying) {
      this.flyT += dt / this.flyDur;
      const k = Math.min(this.flyT, 1);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      this.camera.position.lerpVectors(this.flyFromPos, this.flyToPos, e);
      this.controls.target.lerpVectors(this.flyFromTgt, this.flyToTgt, e);
      if (k >= 1) {
        this.flying = false;
        this.controls.enabled = true;
      }
    }

    // 推演状态
    const r = radiusAt(t, p);
    const off = windOffsetAt(t, p);
    const plumeX = leak.x + off.x;
    const plumeZ = leak.z + off.z;
    const q = INTENSITY[p.intensity].q;
    const contourR = contourRadiusAt(t, p);

    // 泄漏标记与风向箭头
    this.leakMarker.position.set(leak.x, leak.y, leak.z);
    const windRad = (p.windAngle * Math.PI) / 180;
    this.windArrow.position.set(leak.x, leak.y + 6, leak.z);
    this.windArrow.setDirection(new THREE.Vector3(Math.cos(windRad), 0, Math.sin(windRad)));
    this.windArrow.setLength(8 + p.windSpeed * 2.5, 3, 1.6);

    // 体积雾: 半径分段膨胀, 随风偏移, 压扁成烟羽
    this.fog.position.set(plumeX, leak.y + r * 0.22, plumeZ);
    this.fog.scale.set(r, r * 0.55, r);
    this.fogMat.uniforms.uTime.value = t;
    this.fogMat.uniforms.uMix.value = q * 0.7;
    this.fogMat.uniforms.uOpacity.value = 0.55 + q * 0.35;

    // 地面热区: 重心随风偏移 (略滞后于雾体中心)
    const heatR = Math.max(contourR, r * 0.7, 2);
    this.heat.position.set(leak.x + off.x * 0.85, 0.06, leak.z + off.z * 0.85);
    this.heat.scale.set(heatR, heatR, 1);
    this.heatMat.uniforms.uTime.value = t;
    this.heatMat.uniforms.uIntensity.value = q;

    // 影响范围轮廓线
    this.contour.position.set(leak.x + off.x * 0.85, 0.12, leak.z + off.z * 0.85);
    const cr = Math.max(contourR, 0.001);
    this.contour.scale.set(cr, 1, cr);
    this.contour.visible = contourR > 0.5;

    // 浓度超限的楼栋与管段发光描边
    let ab = 0;
    for (const b of this.city.buildings) {
      const c = concentrationAt(Math.hypot(b.center.x - plumeX, b.center.z - plumeZ), t, p);
      const hot = c > p.threshold;
      if (hot) ab++;
      b.edges.visible = hot;
      b.mat.emissive.setHex(hot ? 0xff4400 : 0x000000);
      b.mat.emissiveIntensity = hot ? 0.5 + c * 0.8 : 0;
    }
    let ap = 0;
    for (const pipe of this.city.pipes) {
      const c = concentrationAt(Math.hypot(pipe.point.x - plumeX, pipe.point.z - plumeZ), t, p);
      const hot = c > p.threshold;
      if (hot) ap++;
      pipe.mat.emissive.setHex(hot ? 0xff5500 : 0x000000);
      pipe.mat.emissiveIntensity = hot ? 0.6 + c : 0;
    }
    stats.set({
      radius: r,
      contourRadius: contourR,
      affectedBuildings: ab,
      affectedPipes: ap,
    });

    // 景深聚焦泄漏点
    (this.bokehPass as unknown as { uniforms: { focus: { value: number } } }).uniforms[
      'focus'
    ].value = this.camera.position.distanceTo(new THREE.Vector3(leak.x, leak.y, leak.z));

    this.controls.update();
    this.composer.render();
  }

  dispose(): void {
    this.renderer.setAnimationLoop(null);
    this.unsubs.forEach((u) => u());
    this.resizeObs.disconnect();
    this.renderer.domElement.removeEventListener('pointerdown', this.onPointerDown);
    this.controls.dispose();
    this.composer.dispose();
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}
