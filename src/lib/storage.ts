import type { AltitudeLayer, Building, Observer } from '../types';

const KEY_BUILDINGS = 'uao:buildings:v1';
const KEY_OBSERVERS = 'uao:observers:v1';
const KEY_LAYERS = 'uao:layers:v1';
const KEY_SETTINGS = 'uao:settings:v1';

export interface PersistedSettings {
  displayMode: 'solid' | 'transparent';
  spacing: 'coarse' | 'medium' | 'fine';
  region: { minX: number; maxX: number; minZ: number; maxZ: number };
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const storage = {
  loadBuildings(): Building[] {
    return safeParse<Building[]>(localStorage.getItem(KEY_BUILDINGS), []);
  },
  saveBuildings(buildings: Building[]) {
    try {
      localStorage.setItem(KEY_BUILDINGS, JSON.stringify(buildings));
      return true;
    } catch (e) {
      console.warn('建筑数据过大，浏览器存储失败', e);
      return false;
    }
  },
  loadObservers(): Observer[] {
    return safeParse<Observer[]>(localStorage.getItem(KEY_OBSERVERS), []);
  },
  saveObservers(observers: Observer[]) {
    localStorage.setItem(KEY_OBSERVERS, JSON.stringify(observers));
  },
  loadLayers(): AltitudeLayer[] | null {
    return safeParse<AltitudeLayer[] | null>(localStorage.getItem(KEY_LAYERS), null);
  },
  saveLayers(layers: AltitudeLayer[]) {
    localStorage.setItem(KEY_LAYERS, JSON.stringify(layers));
  },
  loadSettings(): PersistedSettings | null {
    return safeParse<PersistedSettings | null>(localStorage.getItem(KEY_SETTINGS), null);
  },
  saveSettings(s: PersistedSettings) {
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(s));
  },
  clearAll() {
    [KEY_BUILDINGS, KEY_OBSERVERS, KEY_LAYERS, KEY_SETTINGS].forEach((k) =>
      localStorage.removeItem(k)
    );
  },
  /** 已用存储估算（字节） */
  usedBytes(): number {
    return [KEY_BUILDINGS, KEY_OBSERVERS, KEY_LAYERS, KEY_SETTINGS].reduce(
      (sum, k) => sum + (localStorage.getItem(k)?.length ?? 0) * 2,
      0
    );
  }
};
