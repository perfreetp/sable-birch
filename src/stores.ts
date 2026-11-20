import { writable } from 'svelte/store';
import type { Exhibit } from './types';

/** 当前展开模型的展品(null = 全景模式) */
export const activeExhibit = writable<Exhibit | null>(null);
/** 是否正在沿路径移动 */
export const moving = writable<boolean>(false);
/** 移动速度档位 0=慢 1=中 2=快 */
export const speedLevel = writable<0 | 1 | 2>(1);
/** 当前路径点索引 */
export const pathIndex = writable<number>(0);
/** 全景加载完成 */
export const panoReady = writable<boolean>(false);

/**
 * 由 PanoViewer 在挂载时注入实现的控制器,
 * 供侧栏 / 底部控制条调用。
 */
export const controller = {
  goToExhibit: (_exhibit: Exhibit) => {},
  play: () => {},
  pause: () => {},
  stepNext: () => {},
  stepPrev: () => {}
};
