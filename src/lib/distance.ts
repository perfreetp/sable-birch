import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';
import type { ShardSource } from './types.ts';
import { matrixFromPose } from './transform.ts';
import type { Pose } from './types.ts';

export interface ShardBVH {
  bvh: MeshBVH;
  geometry: THREE.BufferGeometry;
}

/**
 * 残片距离查询：按需构建 BVH 缓存在残片几何上（几何本身不随位姿改变，
 * 所以 BVH 可以一次构建、反复使用，位姿只影响变换矩阵）。
 */
const bvhCache = new WeakMap<THREE.BufferGeometry, MeshBVH>();

export function getBVH(geometry: THREE.BufferGeometry): MeshBVH {
  let bvh = bvhCache.get(geometry);
  if (!bvh) {
    // MeshBVH 会改写索引顺序，因此在不影响原始数据的副本上构建
    const clone = geometry.clone();
    clone.index = clone.index ? clone.index.clone() : null;
    bvh = new MeshBVH(clone, { maxDepth: 40 });
    bvhCache.set(geometry, bvh);
  }
  return bvh;
}

const _target = { point: new THREE.Vector3(), distance: 0, faceIndex: 0 };
const _target2 = { point: new THREE.Vector3(), distance: 0, faceIndex: 0 };

/**
 * 两片之间的最近距离（mm），同时返回两片上的最近点。
 * BVH 位于残片局部坐标系，所以需要把另一片变换进来。
 */
export function closestDistanceBetween(
  a: ShardSource,
  poseA: Pose,
  b: ShardSource,
  poseB: Pose,
  maxThreshold = Infinity,
): { distance: number; pointA: THREE.Vector3 | null; pointB: THREE.Vector3 | null } | null {
  const bvhA = getBVH(a.geometry);
  const bvhB = getBVH(b.geometry);

  // 世界 → A 局部
  const worldToA = matrixFromPose(poseA).invert();
  const bToA = worldToA.clone().multiply(matrixFromPose(poseB));

  (bvhB.geometry as THREE.BufferGeometry & { boundsTree?: MeshBVH }).boundsTree = bvhB;

  const hit = bvhA.closestPointToGeometry(
    bvhB.geometry,
    bToA,
    _target,
    _target2,
    0,
    maxThreshold,
  );
  if (!hit) return null;

  // _target.point 在 A 局部；_target2.point 在 B 局部
  const pointA = _target.point.clone().applyMatrix4(matrixFromPose(poseA));
  const pointB = _target2.point.clone().applyMatrix4(matrixFromPose(poseB));
  return { distance: hit.distance, pointA, pointB };
}

/**
 * 快速近似最近距离：用采样点对另一片做点-面查询，适合拖动时 60fps 调用。
 * 返回米（mm）级距离，精确值改用 closestDistanceBetween。
 */
export function approxDistance(
  from: ShardSource,
  fromPose: Pose,
  to: ShardSource,
  toPose: Pose,
  maxThreshold = 400,
): { distance: number; pointFrom: THREE.Vector3 | null; pointTo: THREE.Vector3 | null } | null {
  const bvhTo = getBVH(to.geometry);
  const worldToTo = matrixFromPose(toPose).invert();
  const fromToTo = worldToTo.multiply(matrixFromPose(fromPose));

  const pts = from.samplePoints;
  const stride = Math.max(1, Math.floor(pts.length / 3 / 240));
  const p = new THREE.Vector3();
  let best = Infinity;
  let bestFrom = null as THREE.Vector3 | null;
  let bestTo = null as THREE.Vector3 | null;
  const t = { point: new THREE.Vector3(), distance: 0, faceIndex: 0 };
  for (let i = 0; i < pts.length / 3; i += stride) {
    p.set(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2]).applyMatrix4(fromToTo);
    const hit = bvhTo.closestPointToPoint(p, t, 0, Math.min(best, maxThreshold));
    if (hit && hit.distance < best) {
      best = hit.distance;
      bestFrom = p.clone().applyMatrix4(matrixFromPose(toPose));
      bestTo = hit.point.clone().applyMatrix4(matrixFromPose(toPose));
    }
  }
  if (!bestFrom) return null;
  return { distance: best, pointFrom: bestFrom, pointTo: bestTo };
}

/** 世界空间射线拾取残片 */
export function pickShard(
  raycaster: THREE.Raycaster,
  shards: { source: ShardSource; object: THREE.Object3D }[],
): { source: ShardSource; point: THREE.Vector3; faceIndex: number } | null {
  const hits = raycaster.intersectObjects(shards.map(s => s.object), false);
  for (const h of hits) {
    const entry = shards.find(s => s.object === h.object);
    if (entry) return { source: entry.source, point: h.point, faceIndex: h.faceIndex ?? 0 };
  }
  return null;
}

export { _target as _debugTarget };
