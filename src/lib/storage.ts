// 浏览器持久化与配置导入导出
import type {
  BerthConfig,
  BerthInput,
  ConfigBundle,
  MooringLine,
  ShipType
} from './types';
import { DEFAULT_BERTHS, DEFAULT_INPUT, DEFAULT_SHIPS, buildDefaultLines } from './defaults';

const KEY_SHIPS = 'bas.ships.v1';
const KEY_BERTHS = 'bas.berths.v1';
const KEY_INPUT = 'bas.input.v1';
const KEY_LINES = 'bas.lines.v1';
const KEY_SELECT = 'bas.select.v1';

export interface PersistedState {
  ships: ShipType[];
  berths: BerthConfig[];
  input: BerthInput;
  lines: MooringLine[];
  selectedShipId: string;
  selectedBerthId: string;
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? ({ ...fallback, ...(JSON.parse(raw) as T) } as T) : fallback;
  } catch {
    return fallback;
  }
}

function readArray<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const arr = JSON.parse(raw);
    return Array.isArray(arr) && arr.length ? (arr as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('持久化失败', e);
  }
}

export function loadState(): PersistedState {
  const ships = readArray<ShipType>(KEY_SHIPS, DEFAULT_SHIPS);
  const berths = readArray<BerthConfig>(KEY_BERTHS, DEFAULT_BERTHS);
  const input = read<BerthInput>(KEY_INPUT, DEFAULT_INPUT);
  const sel = read<{ ship?: string; berth?: string }>(KEY_SELECT, {});
  const selectedShipId = sel.ship && ships.some((s) => s.id === sel.ship) ? sel.ship! : ships[0].id;
  const selectedBerthId =
    sel.berth && berths.some((b) => b.id === sel.berth) ? sel.berth! : berths[0].id;
  const ship = ships.find((s) => s.id === selectedShipId)!;
  const berth = berths.find((b) => b.id === selectedBerthId)!;
  let lines = readArray<MooringLine>(KEY_LINES, buildDefaultLines(ship, berth));
  if (lines.length === 0) lines = buildDefaultLines(ship, berth);
  return { ships, berths, input, lines, selectedShipId, selectedBerthId };
}

export function saveState(state: PersistedState): void {
  write(KEY_SHIPS, state.ships);
  write(KEY_BERTHS, state.berths);
  write(KEY_INPUT, state.input);
  write(KEY_LINES, state.lines);
  write(KEY_SELECT, { ship: state.selectedShipId, berth: state.selectedBerthId });
}

export function exportBundle(state: PersistedState): string {
  const bundle: ConfigBundle = {
    app: 'berth-attitude-sim',
    version: 1,
    exportedAt: new Date().toISOString(),
    ships: state.ships,
    berths: state.berths,
    selectedShipId: state.selectedShipId,
    selectedBerthId: state.selectedBerthId,
    input: state.input,
    lines: state.lines
  };
  return JSON.stringify(bundle, null, 2);
}

export function downloadBundle(state: PersistedState): void {
  const blob = new Blob([exportBundle(state)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `berth-config-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseBundle(text: string): ConfigBundle {
  const data = JSON.parse(text) as ConfigBundle;
  if (data.app !== 'berth-attitude-sim' || !Array.isArray(data.ships) || !Array.isArray(data.berths)) {
    throw new Error('配置文件格式不正确');
  }
  return data;
}

/** 简易稳定哈希，用于结果与配置关联 */
export function hashConfig(obj: unknown): string {
  const s = JSON.stringify(obj);
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(16);
}
