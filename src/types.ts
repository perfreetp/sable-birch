// 全局类型定义

/** 建筑体块（地面为 z=0 平面，z 为高度方向） */
export interface Building {
  id: string;
  /** 底面多边形（外环，米，x/z） */
  footprint: [number, number][];
  /** 底面孔洞（如天井），米 */
  holes?: [number, number][][];
  /** 高度（米） */
  height: number;
  /** 底部标高（米，默认 0） */
  baseHeight?: number;
  /** 可选名称 */
  name?: string;
}

/** 观察点配置 */
export interface Observer {
  id: string;
  name: string;
  /** 地面坐标（米） */
  x: number;
  z: number;
  /** 观察眼高（米） */
  eyeHeight: number;
  /** 朝向角（度，0 = 正北 / -Z 方向，顺时针） */
  yaw: number;
  /** 水平视场角（度） */
  fov: number;
  /** 垂直视场上角（度） */
  pitchUp: number;
  /** 垂直视场下角（度） */
  pitchDown: number;
  /** 是否启用 */
  enabled: boolean;
}

/** 高度带分层 */
export interface AltitudeLayer {
  id: number;
  name: string;
  /** 层高下限（米） */
  low: number;
  /** 层高上限（米） */
  high: number;
  /** 单独开关 */
  visible: boolean;
}

/** 空域采样区域（矩形，米） */
export interface AirspaceRegion {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

/** 采样间距档位（米） */
export type SamplingDensity = 'coarse' | 'medium' | 'fine';

/** 单个采样点的遮挡结果 */
export interface SampleResult {
  /** 采样点坐标（米） */
  x: number;
  y: number;
  z: number;
  /** 所属高度层 */
  layerId: number;
  /** 遮挡程度 0~1（被遮挡视线比例） */
  occlusion: number;
  /** 是否落在任一启用观察点的视场内 */
  inFov: boolean;
  /** 命中观察点数量 */
  hitObservers: number;
  /** 参与统计的有效观察点数量 */
  totalObservers: number;
}

/** 单层统计结果 */
export interface LayerStats {
  layerId: number;
  totalSamples: number;
  inFovSamples: number;
  visibleSamples: number;
  partialSamples: number;
  occludedSamples: number;
  /** 平均遮挡程度（仅视场内样本） */
  avgOcclusion: number;
  /** 遮挡率：(部分遮挡 + 完全遮挡) / 视场内样本 */
  occlusionRate: number;
  /** 完全遮挡率 */
  fullOcclusionRate: number;
}

/** 建筑导入数据格式（自定义 JSON） */
export interface BuildingFile {
  source?: string;
  /** 是否为经纬度坐标 */
  geographic?: boolean;
  buildings: Array<{
    footprint: [number, number][];
    holes?: [number, number][][];
    height: number;
    baseHeight?: number;
    name?: string;
  }>;
}

/** 观察点配置文件格式 */
export interface ObserverFile {
  observers: Observer[];
}

/** 计算状态 */
export type ComputeStatus = 'idle' | 'computing' | 'done' | 'error';

/** 显示模式 */
export type BuildingDisplayMode = 'solid' | 'transparent';
