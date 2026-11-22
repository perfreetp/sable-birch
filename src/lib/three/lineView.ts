// 缆绳渲染：每帧按端点重建管状几何，按张力着色；超阈值时顶点抖动
import * as THREE from 'three';
import type { LineState } from '../types';
import { tensionColor } from './colors';

const SEG = 20;

export class LineView {
  readonly mesh: THREE.Mesh;
  private geo: THREE.TubeGeometry;
  private readonly mat: THREE.MeshStandardMaterial;
  private alarmPhase = 0;
  private readonly radius: number;
  id: string;

  constructor(id: string, radius = 0.42) {
    this.id = id;
    this.radius = radius;
    // 初始占位管（零长度会报错，给一条短曲线）
    const c0 = new THREE.Vector3(0, 0, 0);
    const c1 = new THREE.Vector3(0.001, 0, 0);
    this.geo = new THREE.TubeGeometry(
      new THREE.LineCurve3(c0, c1),
      4,
      radius,
      6,
      false
    );
    this.mat = new THREE.MeshStandardMaterial({
      roughness: 0.65,
      metalness: 0.15,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0.6
    });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.visible = false;
    this.mesh.frustumCulled = false;
  }

  update(state: LineState, dt: number, threshold: number): void {
    this.mesh.visible = state.attached;
    if (!state.attached) return;
    const a = new THREE.Vector3(state.endA.x, state.endA.y, state.endA.z);
    const b = new THREE.Vector3(state.endB.x, state.endB.y, state.endB.z);
    const sag = Math.max(0.12, state.length * 0.04 * (1 - Math.min(1, state.utilization * 2)));
    const col = tensionColor(state.utilization);
    const alarm = state.alarm;
    if (alarm) this.alarmPhase += dt * 14;

    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= SEG; i++) {
      const f = i / SEG;
      const p = a.clone().lerp(b, f);
      p.y -= Math.sin(f * Math.PI) * sag;
      if (alarm) {
        const amp = Math.sin(f * Math.PI) * 0.22 * Math.min(1, state.tension / threshold);
        p.x += Math.sin(this.alarmPhase + f * 18) * amp;
        p.z += Math.cos(this.alarmPhase * 1.2 + f * 15) * amp;
      }
      pts.push(p);
    }

    const curve = new THREE.CatmullRomCurve3(pts);
    const next = new THREE.TubeGeometry(curve, SEG, this.radius, 7, false);
    this.mesh.geometry.dispose();
    this.mesh.geometry = next;
    this.geo = next;

    this.mat.color.copy(col);
    const flicker = alarm ? 0.5 + 0.5 * Math.sin(this.alarmPhase * 1.4) : 0;
    this.mat.emissive
      .copy(col)
      .lerp(new THREE.Color(0xffffff), flicker * 0.4)
      .multiplyScalar(alarm ? 0.55 + 0.4 * flicker : 0.28);
  }

  dispose(): void {
    this.geo.dispose();
    this.mat.dispose();
  }
}
