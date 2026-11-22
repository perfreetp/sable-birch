export type BlendMode = 'normal' | 'overlay' | 'screen';
export type LayerId = 'far' | 'mid' | 'near';

export interface LayerState {
  id: LayerId;
  opacity: number; // 0..1
  blendMode: BlendMode;
}

export interface AppState {
  /** 合成顺序：数组首位 = 最底层，末位 = 最顶层 */
  layers: LayerState[];
  fog: number; // 0..1
  night: boolean;
  colorTemp: number; // 2000..8000 K
  pitch: number; // -30..30 度
  yaw: number; // -60..60 度
}

export const LAYER_IDS: LayerId[] = ['far', 'mid', 'near'];
export const BLEND_MODES: BlendMode[] = ['normal', 'overlay', 'screen'];

export const DEFAULT_STATE: AppState = {
  layers: [
    { id: 'far', opacity: 1, blendMode: 'normal' },
    { id: 'mid', opacity: 1, blendMode: 'normal' },
    { id: 'near', opacity: 1, blendMode: 'normal' },
  ],
  fog: 0.35,
  night: false,
  colorTemp: 5500,
  pitch: 0,
  yaw: 0,
};

const STORAGE_KEY = 'train-view-compositor-v1';

function clamp2(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Number.isFinite(v) ? v : min));
}

/** 校验并规范化外部数据（localStorage / 导入的 JSON），非法时返回 null */
export function validateState(input: unknown): AppState | null {
  if (typeof input !== 'object' || input === null) return null;
  const o = input as Record<string, unknown>;
  if (!Array.isArray(o.layers)) return null;

  const layers: LayerState[] = [];
  for (const item of o.layers) {
    if (typeof item !== 'object' || item === null) return null;
    const l = item as Record<string, unknown>;
    if (!LAYER_IDS.includes(l.id as LayerId)) return null;
    if (!BLEND_MODES.includes(l.blendMode as BlendMode)) return null;
    if (typeof l.opacity !== 'number') return null;
    layers.push({
      id: l.id as LayerId,
      opacity: clamp2(l.opacity, 0, 1),
      blendMode: l.blendMode as BlendMode,
    });
  }
  // 三个图层必须齐全且不重复
  if (layers.length !== 3 || new Set(layers.map((l) => l.id)).size !== 3) {
    return null;
  }

  const num = (v: unknown, fallback: number) =>
    typeof v === 'number' && Number.isFinite(v) ? v : fallback;

  return {
    layers,
    fog: clamp2(num(o.fog, DEFAULT_STATE.fog), 0, 1),
    night: typeof o.night === 'boolean' ? o.night : DEFAULT_STATE.night,
    colorTemp: clamp2(num(o.colorTemp, DEFAULT_STATE.colorTemp), 2000, 8000),
    pitch: clamp2(num(o.pitch, DEFAULT_STATE.pitch), -30, 30),
    yaw: clamp2(num(o.yaw, DEFAULT_STATE.yaw), -60, 60),
  };
}

type Listener = () => void;

class Store {
  private state: AppState;
  private listeners = new Set<Listener>();
  private saveTimer: number | undefined;

  constructor() {
    let restored: AppState | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) restored = validateState(JSON.parse(raw));
    } catch {
      /* 损坏的本地数据直接忽略 */
    }
    this.state = restored ?? structuredClone(DEFAULT_STATE);
  }

  get(): Readonly<AppState> {
    return this.state;
  }

  update(patch: Partial<AppState>): void {
    Object.assign(this.state, patch);
    this.emit();
  }

  setLayers(layers: LayerState[]): void {
    this.state.layers = layers;
    this.emit();
  }

  /** 整体替换（导入 JSON / 重置） */
  replace(next: AppState): void {
    this.state = structuredClone(next);
    this.emit();
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(): void {
    this.schedulePersist();
    for (const fn of this.listeners) fn();
  }

  private schedulePersist(): void {
    window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch {
        /* 存储不可用时静默跳过 */
      }
    }, 200);
  }
}

export const store = new Store();

/** 导出当前状态为 JSON 文件 */
export function exportStateToFile(): void {
  const json = JSON.stringify(store.get(), null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'train-view-preset.json';
  a.click();
  URL.revokeObjectURL(url);
}

/** 从 JSON 文本导入状态，成功返回 true */
export function importStateFromJson(json: string): boolean {
  try {
    const state = validateState(JSON.parse(json));
    if (!state) return false;
    store.replace(state);
    return true;
  } catch {
    return false;
  }
}
