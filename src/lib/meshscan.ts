// 纯数组网格扫描：位置焊接、边流形检查、自交检测。主线程与 Worker 共用。
import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';
import { trianglesIntersect } from './triIntersect.ts';

export interface RawMesh {
  positions: Float32Array;
  index: Uint32Array;
  triangleCount: number;
}

export interface WeldResult {
  positions: Float32Array;
  index: Uint32Array;
  /** 焊接后三角形 i 对应输入三角形 i（仅重映射顶点，顺序不变） */
  triangleCount: number;
}

/**
 * 按位置焊接顶点（三角形顺序保持不变）。
 *
 * 注意：对于 manifold 的布尔输出，同位置的顶点可能属于不同的「属性顶点」，
 * 它们在拓扑上本应保持分离（通过 merge 向量关联）。把同位置顶点强行合并
 * 会让接缝处出现大片非流形边与共面重叠三角形——那并不代表网格真的自交。
 * 自交检测需要的其实是「几何上相邻即视为邻接」，这一点由共享顶点判断
 * （trianglesIntersect 内部按坐标容差判断）解决，因此这里仍按位置焊接，
 * 但在合并结果上做自交检测时要额外排除共面重叠的情形。
 */
export function weldByPosition(mesh: RawMesh, tolerance: number): WeldResult {
  const { positions, index } = mesh;
  const inv = 1 / Math.max(tolerance, 1e-6);
  const map = new Map<string, number>();
  const unique: number[] = [];
  const remap = new Uint32Array(positions.length / 3);
  for (let i = 0; i < positions.length / 3; i++) {
    const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2];
    const key = `${Math.round(x * inv)}_${Math.round(y * inv)}_${Math.round(z * inv)}`;
    let id = map.get(key);
    if (id === undefined) {
      id = unique.length / 3;
      map.set(key, id);
      unique.push(x, y, z);
    }
    remap[i] = id;
  }
  const newIndex = new Uint32Array(index.length);
  for (let i = 0; i < index.length; i++) newIndex[i] = remap[index[i]];
  return {
    positions: new Float32Array(unique),
    index: newIndex,
    triangleCount: index.length / 3,
  };
}

export function toBufferGeometry(mesh: RawMesh): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(Float32Array.from(mesh.positions), 3));
  g.setIndex(new THREE.BufferAttribute(Uint32Array.from(mesh.index), 1));
  g.computeVertexNormals();
  g.computeBoundingBox();
  g.computeBoundingSphere();
  return g;
}

export interface TopologyReport {
  closed: boolean;
  boundaryEdges: number;
  nonManifoldEdges: number;
  degenerateTriangles: number;
  /** 顶点数（焊接后） */
  vertexCount: number;
  triangleCount: number;
}

export function checkTopology(welded: WeldResult): TopologyReport {
  const { index, positions } = welded;
  const triCount = index.length / 3;
  const edges = new Map<number, number>();
  const vCount = positions.length / 3;
  const key = (a: number, b: number) => (a < b ? a * vCount + b : b * vCount + a);
  let degenerate = 0;
  const p = new THREE.Vector3();
  const q = new THREE.Vector3();
  const r = new THREE.Vector3();

  for (let t = 0; t < triCount; t++) {
    const a = index[t * 3], b = index[t * 3 + 1], c = index[t * 3 + 2];
    if (a === b || b === c || a === c) { degenerate++; continue; }
    p.fromArray(positions, a * 3);
    q.fromArray(positions, b * 3);
    r.fromArray(positions, c * 3);
    const area = q.sub(p).cross(r.sub(p)).length() * 0.5;
    if (area < 1e-12) { degenerate++; continue; }
    for (const [x, y] of [[a, b], [b, c], [c, a]] as const) {
      const k = key(x, y);
      edges.set(k, (edges.get(k) ?? 0) + 1);
    }
  }

  let boundary = 0;
  let nonManifold = 0;
  for (const count of edges.values()) {
    if (count === 1) boundary++;
    else if (count > 2) nonManifold++;
  }

  return {
    closed: boundary === 0 && nonManifold === 0 && degenerate === 0,
    boundaryEdges: boundary,
    nonManifoldEdges: nonManifold,
    degenerateTriangles: degenerate,
    vertexCount: vCount,
    triangleCount: triCount,
  };
}

export interface SelfIntersectionResult {
  /** 相交三角形数量（去重） */
  count: number;
  /** 相交三角形索引（上限 maxReport） */
  triangles: number[];
  /** 检测到的三角形对数量 */
  pairCount: number;
  triangleCount: number;
  /** 问题三角形的顶点坐标（与 triangles 顺序对应，便于直接显示） */
  badPositions: Float32Array;
  /** 说明：由于 BVH 会重排几何索引，triangles 中的索引仅对检测时的内部
   *  几何有效；跨模块使用问题面时应使用 badPositions。 */
}

/**
 * 自交检测：BVH 自相交遍历 + 三角形精确相交。
 * 共享顶点的相邻三角形视为合法接触而跳过；共面重叠但无穿透的情况也算相交。
 */
export interface SelfIntersectionOptions {
  /** 是否把共面重叠计入自交（默认 true，用于单片网格的穿模检测）。 */
  countCoplanar?: boolean;
  /** 相交三角形上报上限 */
  maxReport?: number;
}

export function detectSelfIntersections(
  welded: WeldResult,
  optsOrMaxReport: number | SelfIntersectionOptions = 20000,
): SelfIntersectionResult {
  const opts: SelfIntersectionOptions = typeof optsOrMaxReport === 'number'
    ? { maxReport: optsOrMaxReport }
    : optsOrMaxReport;
  const maxReport = opts.maxReport ?? 20000;
  const countCoplanar = opts.countCoplanar ?? true;
  // 注意：MeshBVH 构建时会就地重排 geometry 的索引，
  // 因此必须从「BVH 实际使用的那份几何」读三角形，否则索引与顶点会对不上，
  // 导致相交判定完全错乱。
  const geometry = toBufferGeometry(welded);
  const bvh = new MeshBVH(geometry, { maxDepth: 40 });
  const idxAttr = geometry.index!;
  const idx = idxAttr.array as unknown as Uint32Array;
  const pos = (geometry.attributes.position.array as Float32Array);
  const triCount = idx.length / 3;
  const a0 = new THREE.Vector3(), a1 = new THREE.Vector3(), a2 = new THREE.Vector3();
  const b0 = new THREE.Vector3(), b1 = new THREE.Vector3(), b2 = new THREE.Vector3();
  const bad = new Set<number>();
  const badVecs: number[] = [];
  let pairCount = 0;

  const load = (t: number, p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3) => {
    p0.fromArray(pos, idx[t * 3] * 3);
    p1.fromArray(pos, idx[t * 3 + 1] * 3);
    p2.fromArray(pos, idx[t * 3 + 2] * 3);
  };

  bvh.bvhcast(bvh, new THREE.Matrix4(), {
    intersectsTriangles: (_ta, _tb, i1, i2) => {
      if (i1 >= i2) return false;
      const v0 = idx[i1 * 3], v1 = idx[i1 * 3 + 1], v2 = idx[i1 * 3 + 2];
      const w0 = idx[i2 * 3], w1 = idx[i2 * 3 + 1], w2 = idx[i2 * 3 + 2];
      if (
        v0 === w0 || v0 === w1 || v0 === w2 ||
        v1 === w0 || v1 === w1 || v1 === w2 ||
        v2 === w0 || v2 === w1 || v2 === w2
      ) {
        return false;
      }
      load(i1, a0, a1, a2);
      load(i2, b0, b1, b2);
      if (trianglesIntersect(a0, a1, a2, b0, b1, b2, { contactTolerance: 1e-5, countCoplanar })) {
        pairCount++;
        if (bad.size < maxReport) {
          for (const [t, isNew] of [[i1, !bad.has(i1)], [i2, !bad.has(i2)]] as const) {
        if (!isNew) continue;
        bad.add(t);
        if (badVecs.length / 9 < maxReport) {
          for (let k = 0; k < 3; k++) {
            const vi = idx[t * 3 + k] * 3;
            badVecs.push(pos[vi], pos[vi + 1], pos[vi + 2]);
          }
        }
      }
        }
      }
      return false;
    },
  });

  geometry.dispose();
  (bvh as unknown as { dispose?: () => void }).dispose?.();
  return {
    count: bad.size,
    triangles: [...bad],
    badPositions: new Float32Array(badVecs),
    pairCount,
    triangleCount: triCount,
  };
}

/** 从问题三角形列表中抽取世界坐标几何，用于高亮显示 */
export function trianglesToGeometry(
  mesh: RawMesh,
  triangles: ArrayLike<number>,
  maxCount = 6000,
): THREE.BufferGeometry {
  const n = Math.min(triangles.length, maxCount);
  const out = new Float32Array(n * 9);
  const pos = mesh.positions;
  const idx = mesh.index;
  for (let i = 0; i < n; i++) {
    const t = triangles[i];
    for (let k = 0; k < 3; k++) {
      const vi = idx[t * 3 + k] * 3;
      out[i * 9 + k * 3] = pos[vi];
      out[i * 9 + k * 3 + 1] = pos[vi + 1];
      out[i * 9 + k * 3 + 2] = pos[vi + 2];
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(out, 3));
  g.computeVertexNormals();
  return g;
}
