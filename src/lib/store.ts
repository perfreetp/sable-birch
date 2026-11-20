import { create } from 'zustand';
import * as THREE from 'three';
import type {
  AlignmentTriple, MergeReport, Pose, ShardProblem, ShardSource, Vec3,
} from './types.ts';
import { normalizeDeg, round } from './transform.ts';

export type ToolMode = 'select' | 'move' | 'rotate' | 'align';

export interface MergeProgress {
  running: boolean;
  stage: string;
}

interface Store {
  /* ---- 数据 ---- */
  shards: ShardSource[];
  instances: Record<string, import('./types.ts').ShardInstance>;
  order: string[];
  selected: string | null;
  compareId: string | null;
  hovered: string | null;

  /* ---- 工具 ---- */
  tool: ToolMode;
  rotateAxis: 'x' | 'y' | 'z';
  showNeighborDistance: boolean;
  neighborPair: { a: string; b: string; distance: number; pointA: Vec3; pointB: Vec3 } | null;
  liveDistance: number | null;

  /* ---- 显示 ---- */
  globalOpacity: number;
  wireframe: boolean;
  showEdges: boolean;
  showOriginAxes: boolean;
  displayMode: 'solid' | 'xray';
  highlightProblems: boolean;

  /* ---- 对齐 ---- */
  alignment: AlignmentTriple | null;
  pickingSlot: { role: 'fixed' | 'moving'; index: number } | null;
  alignmentStatus: string;
  alignNormalOffset: number;

  /* ---- 合并 ---- */
  mergeStatus: MergeProgress;
  reports: MergeReport[];
  activeReport: string | null;
  mergedGeometry: THREE.BufferGeometry | null;
  mergedVisible: boolean;
  /** 合并结果的自交问题面（世界坐标） */
  mergedProblemGeometry: THREE.BufferGeometry | null;
  problems: Record<string, ShardProblem>;
  scanRunning: boolean;

  /* ---- UI ---- */
  toast: { text: string; kind: 'info' | 'error' | 'ok'; id: number } | null;
  gapSettings: { captureRadius: number; threshold: number };
  distanceSettings: { showPair: boolean };
}

export const DEFAULT_GAP_SETTINGS = { captureRadius: 1.6, threshold: 0.5 };

export const useStore = create<Store>(() => ({
  shards: [],
  instances: {},
  order: [],
  selected: null,
  compareId: null,
  hovered: null,

  tool: 'select',
  rotateAxis: 'y',
  showNeighborDistance: true,
  neighborPair: null,
  liveDistance: null,

  globalOpacity: 1,
  wireframe: false,
  showEdges: false,
  showOriginAxes: true,
  displayMode: 'solid',
  highlightProblems: true,

  alignment: null,
  pickingSlot: null,
  alignmentStatus: '',
  alignNormalOffset: 0,

  mergeStatus: { running: false, stage: '' },
  reports: [],
  activeReport: null,
  mergedGeometry: null,
  mergedVisible: true,
  mergedProblemGeometry: null,
  problems: {},
  scanRunning: false,

  toast: null,
  gapSettings: { ...DEFAULT_GAP_SETTINGS },
  distanceSettings: { showPair: true },
}));

export const store = useStore;

let toastId = 0;
export function toast(text: string, kind: 'info' | 'error' | 'ok' = 'info') {
  const id = ++toastId;
  store.setState({ toast: { text, kind, id } });
  setTimeout(() => {
    if (store.getState().toast?.id === id) store.setState({ toast: null });
  }, kind === 'error' ? 6000 : 3200);
}

/* ---------------- 数据操作 ---------------- */

export function registerShards(sources: ShardSource[], initialPoses: Record<string, Pose>) {
  const st = store.getState();
  const instances = { ...st.instances };
  const order = [...st.order];
  for (const s of sources) {
    instances[s.id] = {
      id: s.id,
      name: s.name,
      color: s.color,
      visible: true,
      opacity: 1,
      pose: initialPoses[s.id] ?? { position: [0, 0, 0], rotation: [0, 0, 0] },
      mergedInto: null,
    };
    if (!order.includes(s.id)) order.push(s.id);
  }
  store.setState({
    shards: [...st.shards.filter(s => !sources.some(n => n.id === s.id)), ...sources],
    instances,
    order,
  });
}

export function removeShards(ids: string[]) {
  const st = store.getState();
  const instances = { ...st.instances };
  for (const id of ids) {
    const src = st.shards.find(s => s.id === id);
    src?.geometry.dispose();
    delete instances[id];
  }
  const problems = { ...st.problems };
  for (const id of ids) delete problems[id];
  store.setState({
    shards: st.shards.filter(s => !ids.includes(s.id)),
    instances,
    order: st.order.filter(id => !ids.includes(id)),
    selected: ids.includes(st.selected ?? '') ? null : st.selected,
    compareId: ids.includes(st.compareId ?? '') ? null : st.compareId,
    problems,
  });
}

export function setPose(id: string, pose: Pose, source: 'drag' | 'input' | 'program' = 'program') {
  const st = store.getState();
  const inst = st.instances[id];
  if (!inst) return;
  const next: Pose = {
    position: pose.position.map(v => round(v, 4)) as Vec3,
    rotation: pose.rotation.map(v => round(normalizeDeg(v), 3)) as Vec3,
  };
  const changed =
    next.position.some((v, i) => Math.abs(v - inst.pose.position[i]) > 1e-6) ||
    next.rotation.some((v, i) => Math.abs(v - inst.pose.rotation[i]) > 1e-6);
  if (!changed) return;
  store.setState({
    instances: { ...st.instances, [id]: { ...inst, pose: next } },
  });
  if (source === 'input' || source === 'drag') {
    // 位姿变动后，旧的合并报告与问题面不再对应当前摆放
    invalidateGeometryDependentState();
  }
}

export function invalidateGeometryDependentState() {
  const st = store.getState();
  if (st.reports.length || Object.keys(st.problems).length) {
    store.setState({ problems: {} });
  }
}

export function nudgePose(id: string, delta: { position?: Vec3; rotation?: Vec3 }) {
  const inst = store.getState().instances[id];
  if (!inst) return;
  const pose: Pose = {
    position: inst.pose.position.map((v, i) => v + (delta.position?.[i] ?? 0)) as Vec3,
    rotation: inst.pose.rotation.map((v, i) => v + (delta.rotation?.[i] ?? 0)) as Vec3,
  };
  setPose(id, pose, 'input');
}

export function resetPoses(poses: Record<string, Pose>) {
  const st = store.getState();
  const instances = { ...st.instances };
  for (const [id, pose] of Object.entries(poses)) {
    if (instances[id]) instances[id] = { ...instances[id], pose };
  }
  store.setState({ instances, problems: {} });
}

export function setShardProp<K extends 'visible' | 'opacity' | 'name'>(
  id: string, key: K, value: Store['instances'][string][K],
) {
  const st = store.getState();
  const inst = st.instances[id];
  if (!inst) return;
  store.setState({ instances: { ...st.instances, [id]: { ...inst, [key]: value } } });
}

export function selectShard(id: string | null) {
  store.setState({ selected: id });
}

export function setCompare(id: string | null) {
  store.setState({ compareId: id });
}
