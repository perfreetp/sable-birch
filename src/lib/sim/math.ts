// 小型向量/矩阵工具（仅实现仿真所需）
import type { Vec3 } from '../types';

export const v3 = (x = 0, y = 0, z = 0): Vec3 => ({ x, y, z });
export const add = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
export const sub = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
export const scale = (a: Vec3, s: number): Vec3 => ({ x: a.x * s, y: a.y * s, z: a.z * s });
export const dot = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z;
export const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
});
export const len = (a: Vec3): number => Math.hypot(a.x, a.y, a.z);
export const dist = (a: Vec3, b: Vec3): number => len(sub(a, b));
export const norm = (a: Vec3): Vec3 => {
  const l = len(a) || 1;
  return scale(a, 1 / l);
};

export const clamp = (x: number, lo: number, hi: number): number => Math.max(lo, Math.min(hi, x));
export const deg2rad = (d: number): number => (d * Math.PI) / 180;
export const rad2deg = (r: number): number => (r * 180) / Math.PI;

/** 绕 Y 轴旋转（水平面，船首向） */
export function rotY(a: Vec3, yaw: number): Vec3 {
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  return { x: c * a.x + s * a.z, y: a.y, z: -s * a.x + c * a.z };
}

/** 船体系 -> 世界系（仅 yaw，加平移） */
export function bodyToWorld(p: Vec3, ox: number, oz: number, yaw: number): Vec3 {
  const r = rotY(p, yaw);
  return { x: r.x + ox, y: p.y, z: r.z + oz };
}

/** 世界系矢量 -> 船体系矢量（仅 yaw） */
export function worldToBodyVec(p: Vec3, yaw: number): Vec3 {
  return rotY(p, -yaw);
}

/** 四阶龙格-库塔单步积分 */
export function rk4Step(
  y: number[],
  dy: (y: number[]) => number[],
  dt: number
): number[] {
  const k1 = dy(y);
  const k2 = dy(y.map((v, i) => v + (dt / 2) * k1[i]));
  const k3 = dy(y.map((v, i) => v + (dt / 2) * k2[i]));
  const k4 = dy(y.map((v, i) => v + dt * k3[i]));
  return y.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
}

/** 稳定的一阶低通 */
export function lowpass(prev: number, target: number, rate: number, dt: number): number {
  return prev + (target - prev) * (1 - Math.exp(-rate * dt));
}
