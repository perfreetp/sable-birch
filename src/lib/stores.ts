import { writable } from 'svelte/store';
import type { SceneManager } from './scene/SceneManager';

export interface SimParams {
  /** 泄漏强度档位 1低 2中 3高 */
  intensity: 1 | 2 | 3;
  /** 初始扩散半径 (m) */
  initialRadius: number;
  /** 风向角 (度, 0 = +X 方向, 逆时针) */
  windAngle: number;
  /** 风速 (m/s) */
  windSpeed: number;
  /** 浓度阈值 (0~1), 超过则视为影响区 */
  threshold: number;
  /** 推演总时长 (s) */
  duration: number;
}

export interface LeakPoint {
  x: number;
  y: number;
  z: number;
}

export interface Stats {
  /** 当前雾体半径 */
  radius: number;
  /** 影响范围轮廓半径 */
  contourRadius: number;
  affectedBuildings: number;
  affectedPipes: number;
}

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
}

export interface Snapshot {
  id: string;
  name: string;
  createdAt: string;
  simTime: number;
  params: SimParams;
  leak: LeakPoint;
  camera?: CameraState;
}

export const DEFAULT_PARAMS: SimParams = {
  intensity: 2,
  initialRadius: 8,
  windAngle: 45,
  windSpeed: 3,
  threshold: 0.35,
  duration: 120,
};

export const params = writable<SimParams>({ ...DEFAULT_PARAMS });
export const simTime = writable(0);
export const playing = writable(false);
export const playSpeed = writable(1);
export const leakPosition = writable<LeakPoint>({ x: 12, y: 3.35, z: 8 });
/** 是否处于"点击场景放置泄漏点"模式 */
export const placingLeak = writable(false);
export const bloomOn = writable(true);
export const dofOn = writable(true);
export const autoRotate = writable(false);
/** 自增触发相机俯冲动画 */
export const diveTrigger = writable(0);
export const stats = writable<Stats>({
  radius: 0,
  contourRadius: 0,
  affectedBuildings: 0,
  affectedPipes: 0,
});
export const snapshots = writable<Snapshot[]>([]);
export const sceneApi = writable<SceneManager | null>(null);
