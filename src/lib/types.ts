/** 三维向量，坐标约定：x=东，y=高度（米），z=北 */
export interface Vec3 {
  x: number
  y: number
  z: number
}

/** 单个航迹点：位置 + 该点时刻（秒，相对推演起点） */
export interface TrackPoint extends Vec3 {
  t: number
}

/** 一架飞行器的完整航迹 */
export interface AircraftTrack {
  /** 唯一编号，如 UAM-01 */
  id: string
  /** 可选机型名 */
  type?: string
  /** 按时间升序排列的航迹点 */
  points: TrackPoint[]
}

/** 载入的推演场景 */
export interface Scenario {
  name: string
  /** 安全间隔阈值（米） */
  horizontalThreshold: number
  verticalThreshold: number
  aircraft: AircraftTrack[]
}

/** 某时刻一架飞行器的内插状态 */
export interface AircraftState {
  id: string
  active: boolean
  position: Vec3
  /** 内插速度向量（米/秒） */
  velocity: Vec3
  /** 水平速率（米/秒） */
  groundSpeed: number
  /** 航向角（弧度，绕 y 轴，0 = 北 / -z 方向） */
  heading: number
  /** 轨迹起始/结束时间（秒） */
  startTime: number
  endTime: number
}

/** 一条冲突记录 */
export interface ConflictRecord {
  /** 稳定 id：两机编号排序拼接 */
  key: string
  aircraftA: string
  aircraftB: string
  /** 首次触发时刻（秒） */
  startTime: number
  /** 最近一次仍在冲突的时刻（秒） */
  endTime: number
  /** 记录生命周期内最小水平间隔（米） */
  minHorizontal: number
  /** 最小水平间隔出现时刻的垂直间隔（米） */
  verticalAtMinH: number
  /** 当前帧是否仍处于冲突状态 */
  active: boolean
}

/** 侧边列表用的飞行器摘要 */
export interface AircraftSummary {
  id: string
  active: boolean
  altitude: number
  groundSpeed: number
  conflictTotal: number
  inConflictNow: boolean
}

/** 导出文件结构 */
export interface ExportPayload {
  scenarioName: string
  exportedAt: string
  duration: number
  currentTime: number
  thresholds: { horizontal: number; vertical: number }
  conflicts: ConflictRecord[]
  tracks: AircraftTrack[]
}
