/** 箱尺寸类型：20 尺 / 40 尺 */
export type ContainerSize = 20 | 40

/** 单个集装箱（一个实例化箱体对应一条记录） */
export interface Container {
  /** 全局唯一 id */
  id: string
  /** 箱号，如 CBHU1234567 */
  boxNo: string
  /** 20 / 40 尺 */
  size: ContainerSize
  /** 起始贝位（20 尺占 1 贝，40 尺占连续 2 贝） */
  bay: number
  /** 排号（0 基） */
  row: number
  /** 层号（0 基，0 为底层） */
  tier: number
}

/** 箱区网格配置 */
export interface YardConfig {
  /** 20 尺贝位数量 */
  bays: number
  /** 排数 */
  rows: number
  /** 最大层高 */
  tiers: number
}

/** 导出 / localStorage 持久化的完整状态 */
export interface YardState {
  version: 1
  savedAt: string
  config: YardConfig
  containers: Container[]
}

/** 视图模式 */
export type ViewMode = 'perspective' | 'top' | 'side'

/** 一次翻箱移动（planner 产出） */
export interface PlannedMove {
  /** 被移动的箱 id */
  containerId: string
  /** 移动前位置 */
  from: { bay: number; row: number; tier: number }
  /** 移动后位置 */
  to: { bay: number; row: number; tier: number }
}

/** 一次完整翻箱计划 */
export interface ReshufflePlan {
  /** 目标箱 id */
  targetId: string
  /** 顺序执行的移动列表 */
  moves: PlannedMove[]
}

/** 翻箱动画运行时状态（驱动 HUD） */
export interface PlaybackState {
  active: boolean
  targetId: string | null
  totalSteps: number
  currentStep: number
  movingContainerId: string | null
}
