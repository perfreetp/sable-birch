import { createStore, produce } from 'solid-js/store';
import { createMemo, type Accessor } from 'solid-js';
import type {
  AirspaceRegion,
  AltitudeLayer,
  Building,
  BuildingDisplayMode,
  ComputeStatus,
  LayerStats,
  Observer,
  SampleResult,
  SamplingDensity
} from '../types';
import { storage, type PersistedSettings } from '../lib/storage';
import { defaultLayers, generateSamples, splitLayers } from '../lib/sampling';
import { computeLayerStats, overallStats } from '../lib/stats';
import { computeOcclusion } from '../lib/occlusion';
import { buildingsBounds } from '../lib/geometry';
import { uid } from '../lib/id';

export type ModuleKey = 'observers' | 'compute' | 'layers';

interface AppState {
  buildings: Building[];
  observers: Observer[];
  layers: AltitudeLayer[];
  region: AirspaceRegion;
  spacing: SamplingDensity;
  displayMode: BuildingDisplayMode;
  samples: SampleResult[];
  stats: LayerStats[];
  status: ComputeStatus;
  progress: number;
  selectedObserverId: string | null;
  activeModule: ModuleKey;
  truncated: boolean;
  lastError: string | null;
  autoRecompute: boolean;
}

const DEFAULT_REGION: AirspaceRegion = { minX: -360, maxX: 360, minZ: -360, maxZ: 360 };

function initialState(): AppState {
  const settings = storage.loadSettings();
  return {
    buildings: storage.loadBuildings(),
    observers: storage.loadObservers(),
    layers: storage.loadLayers() ?? defaultLayers(),
    region: settings?.region ?? DEFAULT_REGION,
    spacing: settings?.spacing ?? 'medium',
    displayMode: settings?.displayMode ?? 'solid',
    samples: [],
    stats: [],
    status: 'idle',
    progress: 0,
    selectedObserverId: null,
    activeModule: 'observers',
    truncated: false,
    lastError: null,
    autoRecompute: true
  };
}

export class AppStore {
  state: AppState = initialState();
  private store;
  private setStore;
  private abort: { aborted: boolean } | null = null;
  private recomputeQueued = false;
  /** BVH 由 SceneEngine 注入，计算时读取 */
  getBvh: (() => import('three-mesh-bvh').MeshBVH | null) | null = null;
  overall: Accessor<LayerStats>;

  constructor() {
    [this.store, this.setStore] = createStore<AppState>(this.state);
    this.state = this.store;
    this.overall = createMemo(() => overallStats(this.state.stats));
  }

  // ---------- 建筑 ----------

  setBuildings(buildings: Building[], persist = true) {
    this.setStore('buildings', buildings);
    if (persist) {
      const ok = storage.saveBuildings(buildings);
      if (!ok) this.setStore('lastError', '建筑数据超出浏览器存储配额，本次未持久化');
    }
    const bounds = buildingsBounds(buildings);
    if (bounds) {
      const pad = 40;
      this.setRegion({
        minX: Math.floor(bounds.minX - pad),
        maxX: Math.ceil(bounds.maxX + pad),
        minZ: Math.floor(bounds.minZ - pad),
        maxZ: Math.ceil(bounds.maxZ + pad)
      });
    }
    this.requestRecompute();
  }

  // ---------- 观察点 ----------

  addObserver(partial?: Partial<Observer>): Observer {
    const centerX = (this.state.region.minX + this.state.region.maxX) / 2;
    const centerZ = (this.state.region.minZ + this.state.region.maxZ) / 2;
    const observer: Observer = {
      id: uid('obs'),
      name: `观察点${this.state.observers.length + 1}`,
      x: partial?.x ?? centerX,
      z: partial?.z ?? centerZ,
      eyeHeight: partial?.eyeHeight ?? 1.6,
      yaw: partial?.yaw ?? 0,
      fov: partial?.fov ?? 90,
      pitchUp: partial?.pitchUp ?? 60,
      pitchDown: partial?.pitchDown ?? -10,
      enabled: partial?.enabled ?? true
    };
    this.setStore('observers', (arr) => [...arr, observer]);
    this.setStore('selectedObserverId', observer.id);
    this.persistObservers();
    this.requestRecompute();
    return observer;
  }

  updateObserver(id: string, patch: Partial<Observer>, opts: { skipRecompute?: boolean } = {}) {
    this.setStore(
      'observers',
      (o) => o.id === id,
      produce((o: Observer) => Object.assign(o, patch))
    );
    this.persistObservers();
    if (!opts.skipRecompute) this.requestRecompute();
  }

  removeObserver(id: string) {
    this.setStore('observers', (arr) => arr.filter((o) => o.id !== id));
    if (this.state.selectedObserverId === id) this.setStore('selectedObserverId', null);
    this.persistObservers();
    this.requestRecompute();
  }

  replaceObservers(observers: Observer[]) {
    this.setStore('observers', observers);
    this.persistObservers();
    this.requestRecompute();
  }

  selectObserver(id: string | null) {
    this.setStore('selectedObserverId', id);
  }

  private persistObservers() {
    storage.saveObservers(this.state.observers);
  }

  // ---------- 高度层 ----------

  setLayerVisible(id: number, visible: boolean) {
    this.setStore(
      'layers',
      (l) => l.id === id,
      produce((l: AltitudeLayer) => {
        l.visible = visible;
      })
    );
    storage.saveLayers(this.state.layers);
  }

  updateLayer(id: number, patch: Partial<AltitudeLayer>) {
    this.setStore(
      'layers',
      (l) => l.id === id,
      produce((l: AltitudeLayer) => Object.assign(l, patch))
    );
    storage.saveLayers(this.state.layers);
    this.requestRecompute();
  }

  resplitLayers(min: number, max: number) {
    this.setStore('layers', splitLayers(min, max));
    storage.saveLayers(this.state.layers);
    this.requestRecompute();
  }

  resetLayers() {
    this.setStore('layers', defaultLayers());
    storage.saveLayers(this.state.layers);
    this.requestRecompute();
  }

  // ---------- 采样 / 显示设置 ----------

  setRegion(region: AirspaceRegion) {
    this.setStore('region', region);
    this.persistSettings();
    this.requestRecompute();
  }

  setSpacing(spacing: SamplingDensity) {
    this.setStore('spacing', spacing);
    this.persistSettings();
    this.requestRecompute();
  }

  setDisplayMode(mode: BuildingDisplayMode) {
    this.setStore('displayMode', mode);
    this.persistSettings();
  }

  setActiveModule(m: ModuleKey) {
    this.setStore('activeModule', m);
  }

  setAutoRecompute(v: boolean) {
    this.setStore('autoRecompute', v);
  }

  private persistSettings() {
    const s: PersistedSettings = {
      displayMode: this.state.displayMode,
      spacing: this.state.spacing,
      region: this.state.region
    };
    storage.saveSettings(s);
  }

  // ---------- 遮挡计算 ----------

  /** 配置变化后的自动重算（微任务合并，避免拖拽时频繁触发） */
  private requestRecompute() {
    if (!this.state.autoRecompute || this.recomputeQueued) return;
    this.recomputeQueued = true;
    queueMicrotask(() => {
      this.recomputeQueued = false;
      void this.runCompute();
    });
  }

  async runCompute(): Promise<void> {
    const bvh = this.getBvh?.();
    if (!bvh) {
      this.setStore('status', 'idle');
      return;
    }
    if (!this.state.observers.some((o) => o.enabled)) {
      this.setStore('samples', []);
      this.setStore('stats', []);
      this.setStore('status', 'idle');
      return;
    }

    // 中止上一轮
    if (this.abort) this.abort.aborted = true;
    const signal = { aborted: false };
    this.abort = signal;
    this.setStore('status', 'computing');
    this.setStore('progress', 0);
    this.setStore('lastError', null);

    try {
      const generated = generateSamples(this.state.region, this.state.layers, this.state.spacing);
      this.setStore('truncated', generated.truncated);
      await computeOcclusion(bvh, this.state.observers, generated.samples, {
        signal,
        yieldStep: 500,
        onProgress: (p) => {
          if (!signal.aborted) this.setStore('progress', p);
        }
      });
      if (signal.aborted) return;
      this.setStore('samples', generated.samples);
      this.setStore('stats', computeLayerStats(generated.samples, this.state.layers));
      this.setStore('status', 'done');
      this.setStore('progress', 1);
    } catch (err) {
      if (signal.aborted) return;
      this.setStore('status', 'error');
      this.setStore('lastError', err instanceof Error ? err.message : String(err));
    }
  }

  clearStorage() {
    storage.clearAll();
  }
}
