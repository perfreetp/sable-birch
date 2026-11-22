// 船体几何与水动力派生参数
import type { BerthConfig, ShipType } from '../types';

export interface ShipHydro {
  /** 排水体积 (m³) */
  volume: number;
  /** 排水量 (t)，海水密度 1.025 */
  displacement: number;
  /** 质量 (kg) */
  mass: number;
  /** 绕 Z（首摇）转动惯量 (kg·m²)，经验公式 Izz = m*(L/4)² 量级 */
  Izz: number;
  /** 横倾转动惯量 (kg·m²) */
  Ixx: number;
  /** 纵倾转动惯量 (kg·m²) */
  Iyy: number;
  /** 水线面面积 (m²) */
  waterplaneArea: number;
  /** 初稳心高 GM (m) */
  GM: number;
  /** 横摇固有周期 (s) */
  rollPeriod: number;
  /** 纵摇固有周期 (s) */
  pitchPeriod: number;
  /** 每厘米纵倾力矩 MCT (kN·m/cm) 简化值 */
  MCT: number;
  /** 横向受风面积 (m²) */
  windArea: number;
  /** 受风面积中心距水面高度 (m) */
  windAreaCentroid: number;
  /** 水线面半宽站（舯=1，向两端衰减），用于护舷接触判定 */
  halfBreadthStations: { x: number; b: number }[];
}

const RHO_SEA = 1025;

export function deriveHydro(ship: ShipType): ShipHydro {
  const { length: L, beam: B, depth: D, draft: d, blockCoeff: Cb } = ship;
  const volume = L * B * d * Cb;
  const displacement = (volume * RHO_SEA) / 1000;
  const mass = volume * RHO_SEA;

  const Izz = mass * (L / 3.6) ** 2;
  const Ixx = mass * (B / 2.6) ** 2 + mass * (D / 2.4) ** 2;
  const Iyy = mass * (L / 3.4) ** 2;

  // 水线面系数近似 0.92*Cb+0.08
  const Cwp = Math.min(0.94, 0.92 * Cb + 0.08);
  const waterplaneArea = L * B * Cwp;

  // 浮心、重心与稳心简化估算
  const KB = 0.53 * d;
  const BM = (L * B ** 3 * Cwp) / (12 * volume);
  const KG = d + 0.25 * (D - d);
  const GM = KB + BM - KG;

  const rollPeriod = 2 * Math.PI * Math.sqrt(Ixx / (mass * 9.81 * Math.max(GM, 0.15)));
  // 纵摇稳心高很大，用 BM_L 估算
  const BML = (L ** 3 * B * Cwp) / (12 * volume);
  const GML = KB + BML - KG;
  const pitchPeriod = 2 * Math.PI * Math.sqrt(Iyy / (mass * 9.81 * Math.max(GML, 1)));
  const MCT = (mass * 9.81 * GML) / (100 * L);

  const windArea = L * (D - d) * 0.85 + L * D * 0.12;
  const windAreaCentroid = (D - d) * 0.7 + 0.8;

  // 21 站半宽曲线（余弦衰减+端部收缩）
  const stations: { x: number; b: number }[] = [];
  for (let i = 0; i <= 20; i++) {
    const s = -1 + (2 * i) / 20; // -1 艉 ~ 1 艏
    const x = (s * L) / 2;
    const taper = Math.cos((s * Math.PI) / 2);
    const bowFine = s > 0.75 ? 1 - 0.35 * ((s - 0.75) / 0.25) ** 2 : 1;
    const sternFine = s < -0.85 ? 1 - 0.2 * ((-s - 0.85) / 0.15) ** 2 : 1;
    stations.push({ x, b: (B / 2) * Math.max(0.06, taper) * bowFine * sternFine });
  }

  return {
    volume,
    displacement,
    mass,
    Izz,
    Ixx,
    Iyy,
    waterplaneArea,
    GM,
    rollPeriod,
    pitchPeriod,
    MCT,
    windArea,
    windAreaCentroid,
    halfBreadthStations: stations
  };
}

/** 查询船体在局部纵向位置 x 处的半宽 */
export function halfBreadthAt(h: ShipHydro, x: number): number {
  const st = h.halfBreadthStations;
  if (x <= st[0].x) return st[0].b;
  if (x >= st[st.length - 1].x) return st[st.length - 1].b;
  for (let i = 0; i < st.length - 1; i++) {
    if (x >= st[i].x && x <= st[i + 1].x) {
      const f = (x - st[i].x) / (st[i + 1].x - st[i].x);
      return st[i].b + f * (st[i + 1].b - st[i].b);
    }
  }
  return 0;
}

/** 护舷沿岸壁的世界 x 坐标数组 */
export function fenderPositions(berth: BerthConfig): number[] {
  const count = berth.fender.count;
  const { quayLength } = berth;
  const span = quayLength * 0.8;
  return Array.from({ length: count }, (_, i) => -span / 2 + (span * i) / Math.max(1, count - 1));
}

/** 系缆桩世界坐标数组 */
export function bollardPositions(berth: BerthConfig): { x: number; y: number; z: number }[] {
  const { bollardCount, quayLength, bollardOffset } = berth;
  return Array.from({ length: bollardCount }, (_, i) => ({
    x: -quayLength / 2 + (quayLength * (i + 1)) / (bollardCount + 1),
    y: 0.9,
    z: -bollardOffset
  }));
}
