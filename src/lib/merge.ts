import * as THREE from 'three';

import { bakeGeometry } from './geometry.ts';
import { matrixFromPose } from './transform.ts';
import type { GapAnalysis } from './seam.ts';
import { store, toast } from './store.ts';
import type { MergeReport, ShardSource } from './types.ts';
import type { MergeWorkerRequest, MergeWorkerResponse } from '../workers/merge.worker.ts';

let worker: Worker | null = null;
let requestCounter = 0;
const pending = new Map<string, {
  resolve: (r: MergeWorkerResponse) => void;
  onProgress?: (stage: string) => void;
}>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('../workers/merge.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (e: MessageEvent<MergeWorkerResponse>) => {
      const msg = e.data;
      if (msg.type === 'progress') {
        pending.get(msg.requestId)?.onProgress?.(msg.stage);
        store.setState({ mergeStatus: { running: true, stage: msg.stage } });
        return;
      }
      const entry = pending.get(msg.requestId);
      if (!entry) return;
      pending.delete(msg.requestId);
      entry.resolve(msg);
    };
    worker.onerror = (e) => {
      console.error('合并 Worker 出错', e);
      for (const [id, entry] of pending) {
        entry.resolve({ type: 'merged', requestId: id, ok: false, error: `Worker 错误：${e.message}` });
      }
      pending.clear();
    };
  }
  return worker;
}

function send(msg: MergeWorkerRequest, onProgress?: (stage: string) => void) {
  const id = msg.requestId;
  const w = getWorker();
  const p = new Promise<MergeWorkerResponse>((resolve) => {
    pending.set(id, { resolve, onProgress });
    w.postMessage(msg);
  });
  return p;
}

/** 合并前：逐片自交扫描 */
export async function scanShardsForProblems(sources: ShardSource[], poseOf: (id: string) => THREE.Matrix4) {
  store.setState({ scanRunning: true });
  const problems = { ...store.getState().problems };
  for (const src of sources) {
    const raw = bakeGeometry(src.geometry, poseOf(src.id));
    const res = await send({
      type: 'scan',
      requestId: `scan-${++requestCounter}`,
      piece: { id: src.id, mesh: raw },
    });
    if (res.type === 'scanned' && res.ok) {
      problems[src.id] = {
        count: res.count,
        geometry: toProblemGeometry(res.badPositions),
        scanned: true,
      };
    }
  }
  store.setState({ problems, scanRunning: false });
  return problems;
}

function toProblemGeometry(badPositions: ArrayLike<number>): THREE.BufferGeometry | null {
  if (!badPositions || badPositions.length < 9) return null;
  const maxVerts = 6000 * 3;
  const count = Math.min(badPositions.length, maxVerts * 3);
  const out = new Float32Array(count);
  for (let i = 0; i < count; i++) out[i] = badPositions[i];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(out, 3));
  g.computeVertexNormals();
  return g;
}

export interface MergeOptions {
  /** 参与合并的残片 id（按顺序） */
  ids: string[];
  gapCaptureRadius: number;
  gapThreshold: number;
  /** 合并前是否强制要求无自交 */
  abortOnSelfIntersection: boolean;
}

export async function mergeShards(opts: MergeOptions): Promise<MergeReport | null> {
  const s = store.getState();
  const sources = opts.ids.map(id => s.shards.find(x => x.id === id)).filter(Boolean) as ShardSource[];
  if (sources.length < 2) {
    toast('请至少选择两片残片进行合并', 'error');
    return null;
  }

  store.setState({ mergeStatus: { running: true, stage: '检查网格自交' } });

  // 1. 合并前自交检查（高亮问题面）
  const poses = new Map(sources.map(src => [src.id, matrixFromPose(s.instances[src.id].pose)]));
  const problems = await scanShardsForProblems(sources, id => poses.get(id)!);
  const totalProblems = Object.values(problems).reduce((a, p) => a + p.count, 0);
  if (totalProblems > 0 && opts.abortOnSelfIntersection) {
    store.setState({ mergeStatus: { running: false, stage: '' } });
    toast(`检测到 ${totalProblems} 个自交问题面，已在视口中高亮，请先修复再合并`, 'error');
    return null;
  }

  // 2. 组装世界坐标网格
  const pieces = sources.map(src => ({
    id: src.id,
    name: src.name,
    mesh: bakeGeometry(src.geometry, poses.get(src.id)!),
  }));

  store.setState({ mergeStatus: { running: true, stage: '实体布尔合并' } });
  const res = await send({
    type: 'merge',
    requestId: `merge-${++requestCounter}`,
    pieces,
    gapCutoff: opts.gapCaptureRadius,
    gapThreshold: opts.gapThreshold,
  }, stage => store.setState({ mergeStatus: { running: true, stage } }));

  if (res.type !== 'merged' || !res.ok) {
    store.setState({ mergeStatus: { running: false, stage: '' } });
    const error = res.type === 'merged' ? res.error : '未知错误';
    toast(`合并失败：${error}`, 'error');
    return null;
  }

  const r = res.result;

  // 3. 组装几何（保持世界坐标，便于直接与残片对齐显示）
  const mergedGeometry = new THREE.BufferGeometry();
  mergedGeometry.setAttribute('position', new THREE.BufferAttribute(Float32Array.from(r.positions), 3));
  mergedGeometry.setIndex(new THREE.BufferAttribute(Uint32Array.from(r.index), 1));
  mergedGeometry.computeVertexNormals();
  mergedGeometry.computeBoundingBox();
  mergedGeometry.computeBoundingSphere();

  const report: MergeReport = {
    id: `merge-${Date.now()}`,
    createdAt: Date.now(),
    mergedIds: sources.map(x => x.id),
    triangleCount: r.triangleCount,
    vertexCount: r.positions.length / 3,
    volume: r.volume,
    components: r.components,
    gap: r.gap as GapAnalysis | null,
    selfIntersection: {
      checked: true,
      badTriangleCount: r.selfIntersection.count,
      badTriangles: r.selfIntersection.triangles,
    },
  };
  (report as MergeReport & { geometry?: THREE.BufferGeometry }).geometry = mergedGeometry;
  (report as MergeReport & { topology?: unknown }).topology = r.topology;
  (report as MergeReport & { runRanges?: unknown }).runRanges = r.runTriangleRanges;

  // 4. 已合并的残片隐藏/标记
  const instances = { ...store.getState().instances };
  for (const id of opts.ids) {
    if (instances[id]) instances[id] = { ...instances[id], mergedInto: report.id };
  }
  // 合并后自交问题面（世界坐标，直接可显示）
  const mergedProblemGeometry = toProblemGeometry(r.selfIntersection.badPositions as Float32Array);

  store.setState({
    mergedProblemGeometry,
    reports: [report, ...store.getState().reports],
    activeReport: report.id,
    mergedGeometry,
    instances,
    mergeStatus: { running: false, stage: '' },
    problems: {},
  });

  toast(`合并完成：${r.triangleCount.toLocaleString()} 个三角形，${r.components} 个连通体`, 'ok');
  return report;
}
