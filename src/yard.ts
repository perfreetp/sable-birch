import { ContainerInfo, MAX_CONTAINERS } from './types';

/** 集装箱尺寸 (m) */
export const CONTAINER = {
  L40: 12.192,
  L20: 6.058,
  W: 2.438,
  H: 2.591,
};

/** 堆场布局常量 (m) */
export const YARD = {
  /** 贝位间距 (沿 X, 40 尺槽位) */
  bayPitch: 13.2,
  /** 排间距 (沿 Z) */
  rowPitch: 2.9,
  /** 每区排数 */
  rowsPerBlock: 6,
  /** 贝位数 */
  bays: 18,
  /** 堆高层数上限 */
  maxTier: 4,
  /** 场桥跨距 (轨道中心距) */
  craneSpan: 23.47,
  /** 集卡车道中心 Z (位于场桥跨内, 靠近海侧轨道) */
  truckLaneZ: 21.3,
  /** 轨道梁顶高 */
  railTop: 0.35,
};

export interface ContainerCell extends ContainerInfo {
  /** 中心坐标 */
  x: number;
  y: number;
  z: number;
}

/** 箱号生成: 4 字母箱主代码 + 7 位数字 */
function makeBoxId(seed: number): string {
  const owners = ['CSQU', 'TGHU', 'MSKU', 'OOLU', 'HLCU', 'EGHU', 'TCLU', 'GESU'];
  const owner = owners[seed % owners.length];
  const num = 1000000 + ((seed * 7919 + 13) % 9000000);
  return `${owner}${num}`;
}

/**
 * 生成堆场箱区数据。两个箱区 (A 区在场桥跨内, B 区在车道外侧),
 * 总量控制在 MAX_CONTAINERS 以内。
 */
export function generateYard(): ContainerCell[] {
  const cells: ContainerCell[] = [];
  let seed = 1;

  const blocks: Array<{ name: string; zStart: number; rows: number }> = [
    { name: 'A', zStart: 1.6, rows: YARD.rowsPerBlock },
    { name: 'B', zStart: 31.5, rows: 4 },
  ];

  for (const block of blocks) {
    for (let bay = 0; bay < YARD.bays; bay++) {
      for (let row = 0; row < block.rows; row++) {
        // 用确定性伪随机决定堆存层高 (1..maxTier), 留出部分空槽
        const h = (bay * 31 + row * 17 + block.name.charCodeAt(0) * 7) % 11;
        if (h >= 8) continue; // 空槽
        const tiers = 1 + (h % YARD.maxTier);
        for (let tier = 1; tier <= tiers; tier++) {
          if (cells.length >= MAX_CONTAINERS) return cells;
          const size: 20 | 40 = (bay + row + tier) % 5 === 0 ? 20 : 40;
          const x = bay * YARD.bayPitch + YARD.bayPitch / 2;
          const z = block.zStart + row * YARD.rowPitch + YARD.rowPitch / 2;
          const y = (tier - 0.5) * CONTAINER.H;
          cells.push({
            boxId: makeBoxId(seed++),
            block: block.name,
            bay: bay + 1,
            row: row + 1,
            tier,
            size,
            x,
            y,
            z,
          });
        }
      }
    }
  }
  return cells;
}
