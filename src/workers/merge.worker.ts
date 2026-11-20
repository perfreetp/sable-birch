// 布尔合并 Worker：在独立线程内加载 manifold-3d WASM，执行实体并集，
// 并对结果做自交与拼缝缝隙分析，避免阻塞界面。
import type { ManifoldToplevel } from 'manifold-3d';
import { loadManifold } from '../lib/manifoldCore.ts';
import { detectSelfIntersections, weldByPosition, type RawMesh, type WeldResult } from '../lib/meshscan.ts';
import { analyzeSeamGap, type GapAnalysis } from '../lib/seam.ts';
import type { GapBin } from '../lib/types.ts';

export interface MergeWorkerPiece {
  id: string;
  name: string;
  mesh: RawMesh;
}

export type MergeWorkerRequest =
  | { type: 'merge'; requestId: string; pieces: MergeWorkerPiece[]; gapCutoff: number; gapThreshold: number }
  | { type: 'scan'; requestId: string; piece: { id: string; mesh: RawMesh } };

export type MergeWorkerResponse =
  | {
      type: 'merged';
      requestId: string;
      ok: true;
      result: {
        positions: Float32Array;
        index: Uint32Array;
        triangleCount: number;
        volume: number;
        components: number;
        runIds: number[];
        pieceIds: string[];
        runTriangleRanges: { id: string; from: number; to: number }[];
        selfIntersection: { count: number; triangles: number[]; pairCount: number; badPositions: Float32Array };
        gap: ReturnType<typeof analyzeSeamGap> | null;
        topology: { closed: boolean; boundaryEdges: number; nonManifoldEdges: number };
      };
    }
  | { type: 'merged'; requestId: string; ok: false; error: string }
  | {
      type: 'scanned';
      requestId: string;
      ok: true;
      pieceId: string;
      count: number;
      triangles: number[];
      badPositions: Float32Array;
      topology: ReturnType<typeof topologySummary>;
    }
  | { type: 'scanned'; requestId: string; ok: false; error: string }
  | { type: 'progress'; requestId: string; stage: string };

let wasm: ManifoldToplevel | null = null;
async function ensureWasm() {
  if (!wasm) wasm = await loadManifold();
  return wasm;
}

function toManifoldMesh(welded: WeldResult) {
  const w = wasm!;
  const m = new w.Mesh({
    numProp: 3,
    vertProperties: Float32Array.from(welded.positions),
    triVerts: Uint32Array.from(welded.index),
  });
  m.merge();
  return m;
}

function topologySummary(welded: WeldResult) {
  const { index } = welded;
  const triCount = index.length / 3;
  const vCount = welded.positions.length / 3;
  const edgeCount = new Map<number, number>();
  const key = (a: number, b: number) => (a < b ? a * vCount + b : b * vCount + a);
  for (let t = 0; t < triCount; t++) {
    const a = index[t * 3], b = index[t * 3 + 1], c = index[t * 3 + 2];
    for (const [x, y] of [[a, b], [b, c], [c, a]] as const) {
      const k = key(x, y);
      edgeCount.set(k, (edgeCount.get(k) ?? 0) + 1);
    }
  }
  let boundary = 0, nonManifold = 0;
  for (const n of edgeCount.values()) {
    if (n === 1) boundary++;
    else if (n > 2) nonManifold++;
  }
  return { closed: boundary === 0 && nonManifold === 0, boundaryEdges: boundary, nonManifoldEdges: nonManifold };
}


/**
 * 剔除体积可忽略的零厚度残渣壳。返回清理后的实体（调用方负责释放返回值）。
 * 注意：decompose() 返回的是独立副本，删除它们不会影响原实体。
 */
function pruneSlivers(manifold: InstanceType<ManifoldToplevel['Manifold']>) {
  const w = wasm!;
  const parts = manifold.decompose();
  const totalVol = Math.abs(manifold.volume());
  const minVol = Math.max(1e-4, totalVol * 1e-7);
  const keep = parts.filter((p) => Math.abs(p.volume()) > minVol && p.numTri() >= 4);
  const dropped = parts.filter((p) => !keep.includes(p));

  let result: InstanceType<ManifoldToplevel['Manifold']> | null = null;
  if (dropped.length > 0 && keep.length > 0) {
    result = keep.length === 1 ? keep[0] : w.Manifold.union(keep);
    // keep 中除 result 外的副本要释放
    for (const p of keep) {
      if (p !== result) { try { p.delete(); } catch { /* noop */ } }
    }
  }
  for (const p of dropped) {
    try { p.delete(); } catch { /* noop */ }
  }
  if (!result) {
    // 没有可剔除的残渣：parts 全是副本，全部释放
    for (const p of parts) { try { p.delete(); } catch { /* noop */ } }
    return manifold;
  }
  return result;
}

async function handleMerge(msg: Extract<MergeWorkerRequest, { type: 'merge' }>) {
  const w = await ensureWasm();
  self.postMessage({ type: 'progress', requestId: msg.requestId, stage: '准备实体' } satisfies MergeWorkerResponse);

  const built: { id: string; manifold: InstanceType<ManifoldToplevel['Manifold']> }[] = [];
  const weldedById = new Map<string, WeldResult>();
  try {
    for (const piece of msg.pieces) {
      const welded = weldByPosition(piece.mesh, 1e-4);
      weldedById.set(piece.id, welded);
      const mm = toManifoldMesh(welded);
      const manifold = new w.Manifold(mm).asOriginal();
      const status = manifold.status();
      if (status !== 'NoError') throw new Error(`残片「${piece.name}」不是有效实体（${status}）`);
      built.push({ id: piece.id, manifold });
    }

    self.postMessage({ type: 'progress', requestId: msg.requestId, stage: '实体布尔并集' } satisfies MergeWorkerResponse);
    const rawUnion = w.Manifold.union(built.map(b => b.manifold));
    if (rawUnion.status() !== 'NoError') throw new Error(`布尔合并失败（${rawUnion.status()}）`);

    // 清除布尔运算残渣：接合面处偶发的零体积薄壳没有实体意义
    const union = pruneSlivers(rawUnion);
    if (union !== rawUnion) rawUnion.delete();
    const compParts = union.decompose();
    const components = compParts.length;
    for (const p of compParts) { try { p.delete(); } catch { /* noop */ } }

    self.postMessage({ type: 'progress', requestId: msg.requestId, stage: '拼缝缝隙分析' } satisfies MergeWorkerResponse);

    const out = union.getMesh();
    const positions = Float32Array.from(out.vertProperties);
    const triVerts = Uint32Array.from(out.triVerts);
    const triangleCount = triVerts.length / 3;

    // run 归属：runOriginalID 对应 asOriginal 的 id
    const idByOrig = new Map<number, string>();
    for (const b of built) idByOrig.set(b.manifold.originalID(), b.id);
    const runTriangleRanges: { id: string; from: number; to: number }[] = [];
    const runIds = Array.from(out.runOriginalID ?? []);
    const runIndex = Array.from(out.runIndex ?? []);
    for (let r = 0; r < runIds.length; r++) {
      const id = idByOrig.get(runIds[r]) ?? `run-${r}`;
      runTriangleRanges.push({ id, from: runIndex[r] / 3, to: runIndex[r + 1] / 3 });
    }

    // 合并结果的三角面位置（供缝隙分析用：两片各自的原始网格已足够）
    const mergedRaw: RawMesh = { positions, index: triVerts, triangleCount };

    // 拼缝缝隙分析：逐对相邻残片分析后合并统计。
    // 只有包围盒间隙小于 3×捕获半径的片对才视为「可能相接」，
    // 避免把互不靠近的片也计入统计。
    let gap = null as GapAnalysis | null;
    if (msg.pieces.length >= 2) {
      const boxes = msg.pieces.map(p => boundsOf(p.mesh));
      const maxBoxGap = Math.max(3 * msg.gapCutoff, 2);
      const all: GapAnalysis[] = [];
      for (let i = 0; i < msg.pieces.length; i++) {
        for (let j = i + 1; j < msg.pieces.length; j++) {
          if (boxGap(boxes[i], boxes[j]) > maxBoxGap) continue;
          const g = analyzeSeamGap(msg.pieces[i].mesh, msg.pieces[j].mesh, {
            captureRadius: msg.gapCutoff,
            threshold: msg.gapThreshold,
            sampleTarget: msg.pieces.length === 2 ? 8000 : 2500,
          });
          if (g.sampleCount > 0) all.push(g);
        }
      }
      if (all.length === 1) gap = all[0];
      else if (all.length > 1) gap = mergeGapAnalyses(all, msg.gapThreshold);
    }

    self.postMessage({ type: 'progress', requestId: msg.requestId, stage: '自交检测' } satisfies MergeWorkerResponse);
    const mergedWelded = weldByPosition(mergedRaw, 1e-4);
    // 合并结果中的共面薄片是实体布尔的正常产物，不构成穿模，判定时排除
    const selfInt = detectSelfIntersections(mergedWelded, { countCoplanar: false });
    const topology = topologySummary(mergedWelded);

    self.postMessage({
      type: 'merged', requestId: msg.requestId, ok: true,
      result: {
        positions, index: triVerts, triangleCount,
        volume: union.volume(),
        components,
        runIds: runIds,
        pieceIds: built.map(b => b.id),
        runTriangleRanges,
        selfIntersection: selfInt,
        gap,
        topology,
      },
    } satisfies MergeWorkerResponse);

    union.delete();
    for (const b of built) b.manifold.delete();
  } catch (err) {
    for (const b of built) {
      try { b.manifold.delete(); } catch { /* noop */ }
    }
    self.postMessage({
      type: 'merged', requestId: msg.requestId, ok: false,
      error: err instanceof Error ? err.message : String(err),
    } satisfies MergeWorkerResponse);
  }
}

function boundsOf(mesh: RawMesh) {
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (let i = 0; i < mesh.positions.length; i += 3) {
    const x = mesh.positions[i], y = mesh.positions[i + 1], z = mesh.positions[i + 2];
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
  }
  return { minX, minY, minZ, maxX, maxY, maxZ };
}

function boxGap(a: ReturnType<typeof boundsOf>, b: ReturnType<typeof boundsOf>) {
  const dx = Math.max(0, a.minX - b.maxX, b.minX - a.maxX);
  const dy = Math.max(0, a.minY - b.maxY, b.minY - a.maxY);
  const dz = Math.max(0, a.minZ - b.maxZ, b.minZ - a.maxZ);
  return Math.hypot(dx, dy, dz);
}

function mergeGapAnalyses(list: GapAnalysis[], threshold: number): GapAnalysis | null {
  const valid = list.filter(g => g.sampleCount > 0);
  if (!valid.length) return list[0] ?? null;
  const allSamples = valid.flatMap(g => g.samples);
  const total = valid.reduce((s, g) => s + g.sampleCount, 0);
  const weighted = (f: (g: GapAnalysis) => number) =>
    valid.reduce((s, g) => s + f(g) * (g.sampleCount / total), 0);
  const histMap = new Map<string, GapBin>();
  for (const g of valid) {
    for (const b of g.histogram) {
      const k = b.from.toFixed(3);
      const cur = histMap.get(k);
      if (cur) cur.count += b.count;
      else histMap.set(k, { ...b });
    }
  }
  const histogram = [...histMap.values()].sort((a, b) => a.from - b.from);
  return {
    sampleCount: total,
    min: Math.min(...valid.map(g => g.min)),
    max: Math.max(...valid.map(g => g.max)),
    mean: weighted(g => g.mean),
    median: weighted(g => g.median),
    p90: weighted(g => g.p90),
    p99: weighted(g => g.p99),
    overThreshold: valid.reduce((s, g) => s + g.overThreshold, 0),
    threshold,
    captureRadius: Math.max(...valid.map(g => g.captureRadius)),
    contactRatio: weighted(g => g.contactRatio),
    cellCount: total,
    histogram,
    samples: allSamples,
  };
}

async function handleScan(msg: Extract<MergeWorkerRequest, { type: 'scan' }>) {
  try {
    const welded = weldByPosition(msg.piece.mesh, 1e-4);
    const result = detectSelfIntersections(welded);
    const topology = topologySummary(welded);
    self.postMessage({
      type: 'scanned', requestId: msg.requestId, ok: true,
      pieceId: msg.piece.id,
      count: result.count,
      triangles: result.triangles,
      badPositions: result.badPositions,
      topology,
    } satisfies MergeWorkerResponse);
  } catch (err) {
    self.postMessage({
      type: 'scanned', requestId: msg.requestId, ok: false,
      error: err instanceof Error ? err.message : String(err),
    } satisfies MergeWorkerResponse);
  }
}

self.onmessage = (e: MessageEvent<MergeWorkerRequest>) => {
  const msg = e.data;
  if (msg.type === 'merge') void handleMerge(msg);
  else if (msg.type === 'scan') void handleScan(msg);
};
