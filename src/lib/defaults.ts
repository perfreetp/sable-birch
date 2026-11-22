import type { BerthConfig, BerthInput, MooringLine, ShipType } from './types';

// ---------- 船型预设 ----------
export const DEFAULT_SHIPS: ShipType[] = [
  {
    id: 'ship-container-180',
    name: '180TEU 集装箱船',
    length: 180,
    beam: 28,
    depth: 15,
    draft: 9.5,
    blockCoeff: 0.62,
    superstructurePos: -0.32,
    superstructureLen: 0.16,
    hullColor: '#1f4e79'
  },
  {
    id: 'ship-bulk-225',
    name: '225m 散货船',
    length: 225,
    beam: 32.2,
    depth: 18,
    draft: 13,
    blockCoeff: 0.82,
    superstructurePos: -0.4,
    superstructureLen: 0.13,
    hullColor: '#5b2d1a'
  },
  {
    id: 'ship-tanker-244',
    name: '244m 油轮',
    length: 244,
    beam: 42,
    depth: 21,
    draft: 14.5,
    blockCoeff: 0.8,
    superstructurePos: -0.42,
    superstructureLen: 0.12,
    hullColor: '#2f4f4f'
  },
  {
    id: 'ship-general-120',
    name: '120m 杂货船',
    length: 120,
    beam: 18,
    depth: 10.5,
    draft: 7.2,
    blockCoeff: 0.72,
    superstructurePos: -0.36,
    superstructureLen: 0.18,
    hullColor: '#3a5f3a'
  }
];

// ---------- 泊位预设 ----------
export const DEFAULT_BERTHS: BerthConfig[] = [
  {
    id: 'berth-general-300',
    name: '300m 通用泊位',
    quayLength: 300,
    quayHeight: 6,
    bollardCount: 6,
    bollardOffset: 1.6,
    fender: {
      count: 5,
      halfLength: 2.2,
      protrusion: 1.4,
      mountHeight: 1.2,
      stiffness: 1.2e6,
      damping: 3.2e5,
      friction: 0.35
    }
  },
  {
    id: 'berth-deep-350',
    name: '350m 深水泊位',
    quayLength: 350,
    quayHeight: 7,
    bollardCount: 7,
    bollardOffset: 1.8,
    fender: {
      count: 6,
      halfLength: 2.5,
      protrusion: 1.6,
      mountHeight: 1.4,
      stiffness: 1.8e6,
      damping: 4.2e5,
      friction: 0.35
    }
  }
];

// ---------- 默认靠泊输入 ----------
export const DEFAULT_INPUT: BerthInput = {
  berthAngleDeg: 8,
  approachSpeed: 0.12,
  alongSpeed: 0.3,
  crossWind: 8,
  crossCurrent: 0.4,
  initialAlongPos: 0,
  initialOffshoreDist: 25,
  tensionThreshold: 120
};

/**
 * 根据泊位与船型生成典型 6 缆布置：
 * 2 头缆 + 2 尾缆（纵缆）+ 2 横缆（艏艉倒缆位置）
 * 船体系：x 指向船首，左舷 z 为负；世界系：z 负指向岸壁
 */
export function buildDefaultLines(ship: ShipType, berth: BerthConfig): MooringLine[] {
  const L = ship.length;
  const deckY = ship.depth - ship.draft + 0.6;
  const chockZ = -ship.beam / 2 + 0.8;
  const bolZ = -berth.bollardOffset;
  const bolY = 0.9;
  const q = berth.quayLength;
  // 桩位沿壁均布
  const bollardX = (i: number): number => -q / 2 + (q * (i + 1)) / (berth.bollardCount + 1);
  const mk = (
    id: string,
    label: string,
    cx: number,
    bx: number,
    diameter = 44
  ): MooringLine => ({
    id,
    label,
    chock: { x: cx, y: deckY, z: chockZ },
    bollard: { x: bx, y: bolY, z: bolZ },
    diameter,
    elasticModulus: 1200,
    breakingStrength: 320,
    pretension: 30
  });

  return [
    mk('line-head-1', '头缆①', L * 0.42, bollardX(berth.bollardCount - 1)),
    mk('line-head-2', '头缆②', L * 0.3, bollardX(berth.bollardCount - 2)),
    mk('line-breast-bow', '艏横缆', L * 0.2, bollardX(berth.bollardCount - 3)),
    mk('line-breast-stern', '艉横缆', -L * 0.2, bollardX(2)),
    mk('line-stern-1', '尾缆①', -L * 0.3, bollardX(1)),
    mk('line-stern-2', '尾缆②', -L * 0.42, bollardX(0))
  ];
}
