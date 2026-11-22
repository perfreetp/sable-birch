// 全局类型定义 —— 船舶靠泊姿态模拟系统

/** 船型参数 */
export interface ShipType {
  id: string;
  name: string;
  /** 船长 L (m) */
  length: number;
  /** 船宽 B (m) */
  beam: number;
  /** 型深 D (m) */
  depth: number;
  /** 设计吃水 d (m) */
  draft: number;
  /** 方形系数 Cb */
  blockCoeff: number;
  /** 上层建筑相对船舯纵向位置系数 (-0.5 艉 ~ 0.5 艏) */
  superstructurePos: number;
  /** 上层建筑长度系数 (占船长比例) */
  superstructureLen: number;
  /** 船体水线以上漆色 */
  hullColor: string;
}

/** 护舷配置 */
export interface FenderConfig {
  /** 护舷数量 */
  count: number;
  /** 护舷沿壁方向半长 (m)，胶囊形 */
  halfLength: number;
  /** 护舷厚度（自岸壁向外凸出，m） */
  protrusion: number;
  /** 护舷中心距水面高度 (m) */
  mountHeight: number;
  /** 等效刚度 (N/m) */
  stiffness: number;
  /** 阻尼系数 (N·s/m) */
  damping: number;
  /** 摩擦系数 */
  friction: number;
}

/** 泊位配置 */
export interface BerthConfig {
  id: string;
  name: string;
  /** 泊位沿壁长度 (m) */
  quayLength: number;
  /** 岸壁高度 (m，自水面起) */
  quayHeight: number;
  /** 系缆桩数量 */
  bollardCount: number;
  /** 系缆桩距壁距离 (m) */
  bollardOffset: number;
  fender: FenderConfig;
}

/** 缆绳定义（端点均为局部坐标，y 为高度） */
export interface MooringLine {
  id: string;
  label: string;
  /** 船上导缆孔位置（船体系，x 纵向，z 左舷为负） */
  chock: Vec3;
  /** 岸壁系缆桩位置（世界系，x 沿壁，z 离岸为负） */
  bollard: Vec3;
  /** 缆绳直径 (mm) */
  diameter: number;
  /** 弹性模量 (MPa) */
  elasticModulus: number;
  /** 破断张力 (kN) */
  breakingStrength: number;
  /** 预张力 (kN) */
  pretension: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** 靠泊输入参数 */
export interface BerthInput {
  /** 靠泊角度 (deg)：船首尾线与岸壁夹角，0 = 平行靠泊 */
  berthAngleDeg: number;
  /** 靠泊法向速度 (m/s)，向岸为正 */
  approachSpeed: number;
  /** 沿壁初速度 (m/s)，向船首方向为正 */
  alongSpeed: number;
  /** 横风风速 (m/s)，吹向岸壁为正 */
  crossWind: number;
  /** 横流流速 (m/s)，流向岸壁为正 */
  crossCurrent: number;
  /** 初始船舯沿壁位置 (m) */
  initialAlongPos: number;
  /** 初始离岸距离 (m，船舯至岸壁) */
  initialOffshoreDist: number;
  /** 缆绳张力报警阈值 (kN) */
  tensionThreshold: number;
}

/** 单根缆绳的实时状态 */
export interface LineState {
  id: string;
  label: string;
  /** 是否已挂缆 */
  attached: boolean;
  /** 当前张力 (kN) */
  tension: number;
  /** 拉伸应变（无量纲） */
  strain: number;
  /** 当前两端点距离 (m) */
  length: number;
  /** 原长 (m) */
  restLength: number;
  /** 受力占破断力比例 0~1 */
  utilization: number;
  /** 是否超阈值 */
  alarm: boolean;
  /** 世界系船端坐标 */
  endA: Vec3;
  /** 世界系岸端坐标 */
  endB: Vec3;
}

/** 单个接触点的护舷反力 */
export interface FenderContact {
  index: number;
  /** 世界系接触位置 */
  point: Vec3;
  /** 法向反力 (kN，正为离岸推船) */
  normalForce: number;
  /** 摩擦力 (kN) */
  frictionForce: number;
  /** 压入量 (m) */
  penetration: number;
}

/** 单个时间步采样 */
export interface SimSample {
  t: number;
  /** 船舯世界坐标 x（沿壁） */
  x: number;
  /** 船舯世界坐标 z（离岸方向） */
  z: number;
  /** 首向角 (rad)，相对岸壁 */
  yaw: number;
  /** 横倾角 (rad)，左舷靠泊时向岸倾为负 */
  roll: number;
  /** 纵倾角 (rad) */
  pitch: number;
  /** 升沉 (m) */
  heave: number;
  /** 纵向速度 u (m/s) */
  u: number;
  /** 横向速度 v (m/s) */
  v: number;
  /** 首摇角速度 r (rad/s) */
  r: number;
  /** 横倾角速度 (rad/s) */
  rollRate: number;
  /** 纵倾角速度 (rad/s) */
  pitchRate: number;
  lines: LineState[];
  contacts: FenderContact[];
  /** 本步护舷总法向力 (kN) */
  totalFenderForce: number;
  /** 本步风浪横倾力矩 (kN·m) */
  windMoment: number;
}

/** 仿真结果 */
export interface SimResult {
  samples: SimSample[];
  /** 总仿真时长 (s) */
  duration: number;
  final: {
    /** 最终船舯沿壁位置相对泊位中心偏差 (m) */
    alongDeviation: number;
    /** 最终船舯离岸距离 (m) */
    offshoreDistance: number;
    /** 最终首向角偏差 (deg) */
    yawErrorDeg: number;
    /** 最终横倾角 (deg) */
    rollDeg: number;
    /** 最终纵倾角 (deg) */
    pitchDeg: number;
    /** 最大护舷反力 (kN) */
    maxFenderForce: number;
    /** 挂缆时间 (s)，-1 表示未挂缆 */
    lineAttachTime: number;
  };
  lineSummary: {
    id: string;
    label: string;
    maxTension: number;
    finalTension: number;
    maxUtilization: number;
    alarmCount: number;
  }[];
  configHash: string;
}

/** 导出/分享的完整配置包 */
export interface ConfigBundle {
  app: string;
  version: number;
  exportedAt: string;
  ships: ShipType[];
  berths: BerthConfig[];
  selectedShipId: string;
  selectedBerthId: string;
  input: BerthInput;
  lines: MooringLine[];
}

/** 播放状态（跨模块共享） */
export interface PlaybackState {
  running: boolean;
  time: number;
  speed: number;
  sampleIndex: number;
}
