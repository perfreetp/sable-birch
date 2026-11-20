/**
 * 共享类型定义:起降场、进近方向、评估结果、导出文件格式
 */

/** 一个进近方向(由罗盘设定) */
export interface Approach {
  id: number
  /** 方位角(度,0=北,顺时针) */
  azimuth: number
  /** 显示颜色(十六进制,如 #ff8800) */
  color: string
}

/** 起降场参数 */
export interface Vertiport {
  /** 世界坐标 X(米) */
  x: number
  /** 世界坐标 Z(米) */
  z: number
  /** 旋转角(度,绕Y轴,0=北) */
  rotation: number
  /** 场坪标高(米,由地形自动取值) */
  elevation: number
}

/** 进近视锥几何参数 */
export interface ConeParams {
  /** 视锥长度(米) */
  length: number
  /** 下滑道角(度) */
  slopeDeg: number
  /** 水平扩散半角(度) */
  divergenceDeg: number
  /** 起始半宽(米) */
  initHalfWidth: number
  /** 起始半高(米) */
  initHalfHeight: number
}

/** 单个穿透障碍物评估结果 */
export interface ObstacleResult {
  /** 建筑物编号 */
  buildingId: number
  /** 所属进近方向编号 */
  approachId: number
  /** 穿透深度(米,障碍物顶高出净空面的最大距离) */
  depth: number
  /** 障碍物最高点海拔(米) */
  topHeight: number
  /** 该点净空面海拔(米) */
  surfaceHeight: number
  /** 障碍物中心到起降场距离(米) */
  distance: number
  /** 障碍物中心世界坐标 */
  cx: number
  cz: number
}

/** 热力网格统计 */
export interface HeatmapStats {
  /** 被至少一个视锥覆盖的网格数 */
  coveredCells: number
  /** 总网格数 */
  totalCells: number
  /** 最低覆盖高度(米) */
  minHeight: number
  /** 各档(0-4)网格数量 */
  levelCounts: number[]
}

/** 评估结果汇总 */
export interface AssessmentResult {
  obstacles: ObstacleResult[]
  heatmap: HeatmapStats
  computedAt: string
}

/** 导出文件格式 */
export interface ExportFile {
  format: 'vertiport-assessment'
  version: 1
  exportedAt: string
  vertiport: Vertiport
  approaches: Approach[]
  coneParams: ConeParams
  results: AssessmentResult
}

export const APPROACH_COLORS = ['#ffb020', '#28c8ff', '#ff5c7a']

/** 热力分档(按覆盖高度,米):5 档颜色 */
export const HEAT_LEVELS: { max: number; color: [number, number, number]; label: string }[] = [
  { max: 20, color: [0.85, 0.15, 0.15], label: '< 20m' },
  { max: 50, color: [0.95, 0.45, 0.10], label: '20–50m' },
  { max: 100, color: [0.95, 0.80, 0.15], label: '50–100m' },
  { max: 200, color: [0.35, 0.80, 0.30], label: '100–200m' },
  { max: Infinity, color: [0.15, 0.45, 0.90], label: '> 200m' }
]

export function heatLevel(height: number): number {
  for (let i = 0; i < HEAT_LEVELS.length; i++) {
    if (height < HEAT_LEVELS[i].max) return i
  }
  return HEAT_LEVELS.length - 1
}
