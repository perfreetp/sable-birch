/** 四轴姿态 + 吊具规格 */
export interface Pose {
  /** 大车行走位置 (m, 沿轨道 X) */
  gantry: number;
  /** 小车横移位置 (m, 横跨箱区 Z) */
  trolley: number;
  /** 起升高度 (m, 吊具底面离地) */
  hoist: number;
  /** 吊具回转角度 (度, 绕竖直轴) */
  rotation: number;
  /** 吊具规格: 20 或 40 尺 */
  spreader: 20 | 40;
}

export interface AxisLimits {
  gantry: [number, number];
  trolley: [number, number];
  hoist: [number, number];
  rotation: [number, number];
}

export interface ClearanceResult {
  /** 吊具到最近障碍物的最小间距 (m) */
  minDistance: number;
  /** 是否满足净空阈值 */
  ok: boolean;
  /** 穿透/侵入包络的三角面数量 */
  hitTriangles: number;
  /** 使用的净空阈值 (m) */
  threshold: number;
  /** 最近点对(世界坐标), 用于可视化 */
  closestA: [number, number, number] | null;
  closestB: [number, number, number] | null;
}

export interface SavedPose {
  id: number;
  name: string;
  savedAt: string;
  pose: Pose;
  result: ClearanceResult | null;
}

export interface ContainerInfo {
  /** 箱号 */
  boxId: string;
  /** 所在区位, 如 A 区 */
  block: string;
  /** 贝位 */
  bay: number;
  /** 排 */
  row: number;
  /** 层高 (1 = 底层) */
  tier: number;
  /** 箱尺寸 */
  size: 20 | 40;
}

export type HelperViewMode = 'none' | 'top' | 'side';

export const AXIS_LIMITS: AxisLimits = {
  gantry: [0, 250],
  trolley: [-3, 27],
  hoist: [0.2, 17],
  rotation: [-180, 180],
};

export const DEFAULT_POSE: Pose = {
  gantry: 40,
  trolley: 12,
  hoist: 10,
  rotation: 0,
  spreader: 40,
};

export const DEFAULT_THRESHOLD = 0.5;
export const MAX_CONTAINERS = 2000;
