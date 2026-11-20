/** 发射窗口输入参数 */
export interface LaunchParams {
  /** 发射点经度 (度) */
  longitude: number
  /** 发射点纬度 (度) */
  latitude: number
  /** 发射方位角 (度，正北=0，顺时针) */
  azimuth: number
  /** 目标入轨高度 (km) */
  targetOrbitAltitudeKm: number
  /** 推重比 T/W0 (起飞推力 / 起飞重量) */
  thrustToWeight: number
  /** 发射场名称 */
  siteName: string
}

/** 飞行阶段 */
export type PhaseId = 'boost' | 'stage1' | 'stage2' | 'coast'

export interface PhaseInfo {
  id: PhaseId
  label: string
  /** 该阶段时间区间 (s, 相对起飞) */
  t0: number
  t1: number
}

/** 单个弹道采样点（ECEF，单位 m / m·s⁻¹） */
export interface TrajectorySample {
  /** 相对起飞时间 s */
  t: number
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  /** 椭球高 m */
  altitude: number
  /** 速度大小 m/s */
  speed: number
  /** 飞行路径角 (度，速度与当地水平面夹角) */
  flightPathAngle: number
  /** 当前阶段 */
  phase: PhaseId
}

/** 分离事件类型 */
export type SeparationKind = 'booster' | 'stage1' | 'stage2'

export interface SeparationEvent {
  kind: SeparationKind
  label: string
  /** 事件时间 s */
  t: number
  /** 事件点 ECEF */
  position: [number, number, number]
  /** 分离时刻速度矢量 ECEF */
  velocity: [number, number, number]
  speed: number
  altitude: number
  /** 残骸落点（椭球面投影） */
  impact: {
    lon: number
    lat: number
    /** 飞行时间 s */
    flightTime: number
    /** 距分离点水平航程 km */
    rangeKm: number
  }
  /** 落区多边形（椭球面经纬度，含不确定性散布） */
  impactZone: { lon: number; lat: number }[]
  /** 是否为留轨级（分离点已达轨道速度，残骸不立即再入） */
  orbital: boolean
  /** 留轨级的近地点高度 km（orbital=true 时有效） */
  perigeeKm: number
  color: string
}

export interface TrajectoryResult {
  params: LaunchParams
  samples: TrajectorySample[]
  phases: PhaseInfo[]
  events: SeparationEvent[]
  /** 总飞行时间 s */
  duration: number
  /** 入轨点速度 m/s */
  insertionSpeed: number
  /** 入轨高度 m */
  insertionAltitude: number
  generatedAt: string
  schemaVersion: 1
}

export const SEPARATION_COLORS: Record<SeparationKind, string> = {
  booster: '#ff9f43', // 橙 — 助推器分离
  stage1: '#ff4d6d', // 红 — 一级分离
  stage2: '#4dd0e1', // 青 — 二级分离
}

export const PHASE_LABELS: Record<PhaseId, string> = {
  boost: '助推段',
  stage1: '一级飞行',
  stage2: '二级飞行',
  coast: '滑行入轨',
}
