// 全局应用状态（Svelte 5 runes 风格 store）
import { writable, derived, get } from 'svelte/store';
import type {
  BerthConfig,
  BerthInput,
  MooringLine,
  ShipType,
  SimResult
} from './types';
import { loadState, saveState, hashConfig, type PersistedState } from './storage';
import { buildDefaultLines } from './defaults';
import { runSimulation } from './sim/engine';

const initial = loadState();

export const ships = writable<ShipType[]>(initial.ships);
export const berths = writable<BerthConfig[]>(initial.berths);
export const selectedShipId = writable<string>(initial.selectedShipId);
export const selectedBerthId = writable<string>(initial.selectedBerthId);
export const input = writable<BerthInput>(initial.input);
export const lines = writable<MooringLine[]>(initial.lines);

export const selectedShip = derived(
  [ships, selectedShipId],
  ([$ships, $id]) => $ships.find((s) => s.id === $id) ?? $ships[0]
);
export const selectedBerth = derived(
  [berths, selectedBerthId],
  ([$berths, $id]) => $berths.find((b) => b.id === $id) ?? $berths[0]
);

export const simResult = writable<SimResult | null>(null);
export const simRunning = writable(false);
export const simError = writable<string | null>(null);
/** 回放当前时间 (s) */
export const playbackTime = writable(0);
export const playbackRunning = writable(false);
export const playbackSpeed = writable(1);

export function snapshot(): PersistedState {
  return {
    ships: get(ships),
    berths: get(berths),
    input: get(input),
    lines: get(lines),
    selectedShipId: get(selectedShipId),
    selectedBerthId: get(selectedBerthId)
  };
}

export function persist(): void {
  saveState(snapshot());
}

export function rebuildDefaultLines(): void {
  lines.set(buildDefaultLines(get(selectedShip), get(selectedBerth)));
  persist();
}

export function replaceState(state: PersistedState): void {
  ships.set(state.ships);
  berths.set(state.berths);
  selectedShipId.set(state.selectedShipId);
  selectedBerthId.set(state.selectedBerthId);
  input.set(state.input);
  lines.set(state.lines);
  persist();
}

/** 运行仿真（同步执行，典型 <100ms） */
export async function runSim(): Promise<SimResult> {
  simRunning.set(true);
  simError.set(null);
  try {
    // 让出一帧以便 UI 切到 loading
    await new Promise((r) => setTimeout(r, 30));
    const result = runSimulation({
      ship: get(selectedShip),
      berth: get(selectedBerth),
      input: get(input),
      lines: get(lines)
    });
    result.configHash = hashConfig({
      ship: get(selectedShip),
      berth: get(selectedBerth),
      input: get(input),
      lines: get(lines)
    });
    simResult.set(result);
    playbackTime.set(0);
    playbackRunning.set(true);
    return result;
  } catch (e) {
    simError.set(e instanceof Error ? e.message : String(e));
    throw e;
  } finally {
    simRunning.set(false);
  }
}

// 任一配置变化即持久化（防抖）
let persistTimer: ReturnType<typeof setTimeout> | undefined;
function schedulePersist(): void {
  clearTimeout(persistTimer);
  persistTimer = setTimeout(persist, 250);
}
for (const w of [ships, berths, selectedShipId, selectedBerthId, input, lines]) {
  w.subscribe(schedulePersist);
}
