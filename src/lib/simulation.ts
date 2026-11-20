import type { SimParams } from './stores';

/** 三档泄漏强度对应的源强与最大扩散半径 */
export const INTENSITY = {
  1: { label: '低', q: 0.55, rMax: 26 },
  2: { label: '中', q: 0.8, rMax: 40 },
  3: { label: '高', q: 1.0, rMax: 55 },
} as const;

/**
 * 分段膨胀曲线:
 *  0~20%T  快速膨胀 (幂函数)
 *  20~60%T 线性扩散
 *  60~100%T 指数趋稳, 逼近最大半径
 */
export function radiusAt(t: number, p: SimParams): number {
  const R = INTENSITY[p.intensity].rMax;
  const r0 = Math.min(p.initialRadius, R * 0.5);
  const T = p.duration;
  const t1 = T * 0.2;
  const t2 = T * 0.6;
  if (t <= 0) return r0;
  if (t < t1) {
    const k = t / t1;
    return r0 + (R * 0.5 - r0) * Math.pow(k, 0.65);
  }
  if (t < t2) {
    const k = (t - t1) / (t2 - t1);
    return R * 0.5 + R * 0.3 * k;
  }
  const k = Math.min((t - t2) / (T - t2), 1);
  return R * 0.8 + R * 0.2 * (1 - Math.exp(-3 * k));
}

/** 风导致的烟羽中心偏移量 (随时间线性, 封顶 70m) */
export function windOffsetAt(t: number, p: SimParams): { x: number; z: number } {
  const rad = (p.windAngle * Math.PI) / 180;
  const dist = Math.min(p.windSpeed * t, 70);
  return { x: Math.cos(rad) * dist, z: Math.sin(rad) * dist };
}

/** 距烟羽中心 dist 处在时刻 t 的相对浓度 (0~1) */
export function concentrationAt(dist: number, t: number, p: SimParams): number {
  const q = INTENSITY[p.intensity].q;
  const r = Math.max(radiusAt(t, p), 1);
  const sigma = r * 0.55;
  return q * Math.exp(-((dist / sigma) ** 2));
}

/** 浓度等于阈值的等值线半径, 即影响范围轮廓半径 */
export function contourRadiusAt(t: number, p: SimParams): number {
  const q = INTENSITY[p.intensity].q;
  if (p.threshold >= q) return 0;
  const r = Math.max(radiusAt(t, p), 1);
  return r * 0.55 * Math.sqrt(Math.log(q / p.threshold));
}
