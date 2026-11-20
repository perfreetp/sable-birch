import type { Container, ContainerSize, YardConfig } from '@/types'

/**
 * 世界坐标布局常量（单位：米，按真实箱尺寸近似缩放）
 * 20 尺箱：长 6.06m，40 尺箱：长 12.19m
 * 宽 2.44m，高 2.59m
 */
export const DIM = {
  /** 20 尺箱长度（一个贝位的宽度） */
  bayLen: 6.06,
  /** 40 尺箱长度（占两个贝位） */
  bayLen40: 12.19,
  /** 箱宽（一排的宽度） */
  rowWidth: 2.44,
  /** 箱高（一层的高度） */
  tierHeight: 2.59,
  /** 贝位之间的间隙 */
  bayGap: 0.25,
  /** 排之间的间隙 */
  rowGap: 0.4,
  /** 层之间的间隙 */
  tierGap: 0.08
} as const

/** 超过该层高（0 基，>=4 即第 5 层起）使用半透明 */
export const TRANSPARENT_TIER = 4

/** 箱体颜色（RGB 0-1） */
export const COLORS = {
  c20: { r: 0.95, g: 0.55, b: 0.12 }, // 20 尺：橙色
  c40: { r: 0.16, g: 0.46, b: 0.92 }, // 40 尺：蓝色
  selected: { r: 1.0, g: 0.85, b: 0.25 }, // 选中：亮黄
  target: { r: 0.95, g: 0.22, b: 0.25 }, // 目标箱：红色
  blocker: { r: 0.72, g: 0.32, b: 0.95 }, // 压箱：紫色
  moving: { r: 0.35, g: 0.95, b: 0.75 }, // 动画中：青绿
  emptySlot: { r: 0.36, g: 0.4, b: 0.48 }, // 空槽位标记
  ground: { r: 0.11, g: 0.13, b: 0.17 }
} as const

/** 一个箱占用的贝位序号列表 */
export function occupiedBays(bay: number, size: ContainerSize): number[] {
  return size === 40 ? [bay, bay + 1] : [bay]
}

/** 箱区沿 X 方向总长度 */
export function yardLength(cfg: YardConfig): number {
  return cfg.bays * DIM.bayLen + (cfg.bays - 1) * DIM.bayGap
}

/** 箱区沿 Z 方向总宽度 */
export function yardWidth(cfg: YardConfig): number {
  return cfg.rows * DIM.rowWidth + (cfg.rows - 1) * DIM.rowGap
}

/** 贝位起点 X（贝位左下角） */
export function bayOriginX(bay: number): number {
  return bay * (DIM.bayLen + DIM.bayGap)
}

/** 排起点 Z */
export function rowOriginZ(row: number): number {
  return row * (DIM.rowWidth + DIM.rowGap)
}

/** 层底面 Y */
export function tierOriginY(tier: number): number {
  return tier * (DIM.tierHeight + DIM.tierGap)
}

/** 箱位底面世界坐标（X/Z 为箱中心，Y 为底面） */
export function slotPosition(bay: number, row: number, tier: number, size: ContainerSize) {
  const len = size === 40 ? DIM.bayLen40 : DIM.bayLen
  const x = bayOriginX(bay) + len / 2
  const z = rowOriginZ(row) + DIM.rowWidth / 2
  const y = tierOriginY(tier)
  return { x, y, z }
}

/** 箱位顶部世界 Y（动画抬升参考） */
export function slotTopY(tier: number): number {
  return tierOriginY(tier) + DIM.tierHeight
}

/** 箱中心世界坐标 */
export function containerCenter(c: Container) {
  const p = slotPosition(c.bay, c.row, c.tier, c.size)
  return { x: p.x, y: p.y + DIM.tierHeight / 2, z: p.z }
}

/** 抬升安全高度：高于箱区最高层 */
export function liftHeight(cfg: YardConfig): number {
  return tierOriginY(cfg.tiers) + DIM.tierHeight * 1.6
}
