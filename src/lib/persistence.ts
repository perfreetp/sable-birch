import { get } from 'svelte/store';
import {
  params,
  leakPosition,
  simTime,
  playing,
  snapshots,
  sceneApi,
  DEFAULT_PARAMS,
  type Snapshot,
  type SimParams,
  type LeakPoint,
} from './stores';

const STORAGE_KEY = 'heat-leak-sim:v1';
const FILE_APP_ID = 'heat-leak-sim';

interface PersistedState {
  params?: SimParams;
  leak?: LeakPoint;
  snapshots?: Snapshot[];
}

/** 启动时读取本地存储的推演参数与快照 */
export function loadPersisted(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

/** 参数 / 泄漏点 / 快照变化时写入 localStorage */
export function persistAll(): void {
  try {
    const state: PersistedState = {
      params: get(params),
      leak: get(leakPosition),
      snapshots: get(snapshots),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* 存储满或被禁用时静默忽略 */
  }
}

export function saveSnapshot(name: string): void {
  const camera = get(sceneApi)?.getCameraState();
  const list = get(snapshots);
  const snap: Snapshot = {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `snap-${Date.now()}`,
    name: name.trim() || `快照 ${list.length + 1}`,
    createdAt: new Date().toISOString(),
    simTime: get(simTime),
    params: { ...get(params) },
    leak: { ...get(leakPosition) },
    camera,
  };
  snapshots.update((l) => [snap, ...l]);
}

export function removeSnapshot(id: string): void {
  snapshots.update((l) => l.filter((s) => s.id !== id));
}

export function applySnapshot(s: Snapshot): void {
  playing.set(false);
  params.set({ ...s.params });
  leakPosition.set({ ...s.leak });
  simTime.set(s.simTime);
  if (s.camera) get(sceneApi)?.setCameraState(s.camera);
}

export function resetParams(): void {
  params.set({ ...DEFAULT_PARAMS });
  simTime.set(0);
  playing.set(false);
}

/** 导出推演文件 (JSON), 供他人导入复现 */
export function exportSimFile(): void {
  const data = {
    app: FILE_APP_ID,
    version: 1,
    exportedAt: new Date().toISOString(),
    simTime: get(simTime),
    params: get(params),
    leak: get(leakPosition),
    snapshots: get(snapshots),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '');
  a.href = url;
  a.download = `leak-sim-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** 导入推演文件并应用 */
export async function importSimFile(file: File): Promise<string> {
  const text = await file.text();
  const data = JSON.parse(text);
  if (!data || data.app !== FILE_APP_ID) {
    throw new Error('不是本工具导出的推演文件');
  }
  playing.set(false);
  if (data.params) params.set({ ...DEFAULT_PARAMS, ...data.params });
  if (data.leak) leakPosition.set({ ...data.leak });
  if (typeof data.simTime === 'number') simTime.set(data.simTime);
  if (Array.isArray(data.snapshots)) snapshots.set(data.snapshots);
  return `已导入: ${file.name}`;
}
