// 拼缝缝隙分析
//
// 目标：量化合并后拼缝处的「缝隙宽度分布」，即两片残片接合面上的实际张开量。
//
// 方法：
//  1. 在两片表面分别按三角形面积加权采样；
//  2. 用 BVH 求每个采样点到对方表面的最近距离（点到面距离）；
//     —— 这个量对「面对面且平行」的接合面就等于垂直缝隙宽度；
//        对断口侧壁等非接合面，最近距离会被限制在捕获半径内，但不会
//        被误当成缝隙（见第 3 步筛选）。
//  3. 只保留最近距离 < captureRadius 的采样作为接触带；
//  4. 把接触带在三维空间中分箱（voxel），每箱取最小距离作为该处局部
//     缝隙宽度 —— 得到的是「拼缝最窄处」的张开量，符合考古上对拼缝
//     宽度（缝口最小间距）的理解；
//  5. 汇总所有箱的局部缝隙宽度，得到分布/中位数/P 分位。
//
// 注意：不做「法向朝向」筛选。真实断口是起伏的断裂面，两片沿裂缝接触时
// 点法向与最近点方向的夹角分布极散，任何硬性朝向阈值都会丢掉绝大部分
// 真实拼缝采样（实测 >95%）。体素取最小天然抑制了斜向绕行距离。
//
// 之所以不用「沿法向射线投射」：残片断口是起伏的曲面，法向在断口边缘
// 剧烈变化，射线常常擦过或穿透到另一片的内壁，产生几毫米以上的伪缝隙。
// 点到面最近距离 + 空间分箱取最小，是在真实残片数据上稳定可复现的定义。
import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';
import type { RawMesh } from './meshscan.ts';
import { weldByPosition, toBufferGeometry } from './meshscan.ts';
import type { GapBin, SeamSample } from './types.ts';

export interface GapAnalysis {
  sampleCount: number;
  min: number;
  max: number;
  mean: number;
  median: number;
  p90: number;
  p99: number;
  overThreshold: number;
  threshold: number;
  captureRadius: number;
  histogram: GapBin[];
  samples: SeamSample[];
  /** 接触带采样占全部采样的比例 */
  contactRatio: number;
  /** 局部缝隙箱数（每箱代表拼缝上一处测量点） */
  cellCount: number;
}

const MAX_BINS = 32;

export interface GapOptions {
  /** 接触带捕获半径（mm） */
  captureRadius?: number;
  /** 接触带空间分箱尺寸（mm）：每箱取最小距离作为该处缝隙宽度 */
  voxel?: number;
  /** 每片采样点上限 */
  sampleTarget?: number;
  /** 缝隙超限阈值（mm） */
  threshold?: number;
  /** 直方图箱宽（mm） */
  binWidth?: number;
}

export function analyzeSeamGap(meshA: RawMesh, meshB: RawMesh, opts: GapOptions = {}): GapAnalysis {
  const captureRadius = opts.captureRadius ?? 1.6;
  const threshold = opts.threshold ?? 0.5;
  const binWidth = opts.binWidth ?? 0.2;
  // 分块尺寸固定 1 mm：每块 1 mm² 量级的拼缝小面取一次最小间距。
  // 分块过大（如等于捕获半径）会把离缝较远的表面也并入同一块，
  // 经「取最小」后仍被拉低为中位数附近的数值，失去分辨力。
  const voxel = opts.voxel ?? 1.0;
  const sampleTarget = opts.sampleTarget ?? 6000;

  // 双向都取最小，再双向取小：双向最小保证对「A 一侧点更密、B 一侧更稀」
  // 的网格密度差异不敏感，也不会因为一侧采样点落在面内而漏掉窄缝。
  const ab = sampleContacts(meshA, meshB, captureRadius, sampleTarget);
  const ba = sampleContacts(meshB, meshA, captureRadius, sampleTarget);

  // 空间分箱，每箱取最小距离（拼缝局部最窄处）
  const cells = new Map<string, number>();
  const inv = 1 / voxel;
  const keyOf = (p: THREE.Vector3) =>
    `${Math.round(p.x * inv)}_${Math.round(p.y * inv)}_${Math.round(p.z * inv)}`;
  const addCell = (p: THREE.Vector3, d: number) => {
    const k = keyOf(p);
    const cur = cells.get(k);
    if (cur === undefined || d < cur) cells.set(k, d);
  };
  for (const s of ab.points) addCell(s.point, s.distance);
  for (const s of ba.points) addCell(s.point, s.distance);

  // 只保留捕获带内（≤ captureRadius）的拼缝块。个别采样点在体素里
  // 可能因两侧点落在同一格而合并出超过捕获半径的值，一律剔除，
  // 保证统计口径统一为「捕获带内的缝隙宽度」。
  const gaps = [...cells.values()].filter(d => d <= captureRadius).sort((x, y) => x - y);
  const totalSamples = ab.sampled + ba.sampled;
  const contactSamples = ab.points.length + ba.points.length;
  const contactRatio = totalSamples > 0 ? contactSamples / totalSamples : 0;

  if (!gaps.length) {
    return {
      sampleCount: 0, min: 0, max: 0, mean: 0, median: 0, p90: 0, p99: 0,
      overThreshold: 0, threshold, captureRadius, histogram: [], samples: [],
      contactRatio, cellCount: 0,
    };
  }

  const pick = (q: number) => gaps[Math.min(gaps.length - 1, Math.floor(q * gaps.length))];
  const sum = gaps.reduce((x, y) => x + y, 0);
  const max = gaps[gaps.length - 1];

  // 直方图箱宽：在 [binWidth, max] 之间选，且不超过 MAX_BINS 个箱子，
  // 并保证箱宽不会退化成 0.02 mm 这样的碎箱（可读性优先）。
  let width = Math.max(binWidth, max / MAX_BINS);
  let binCount = Math.max(1, Math.ceil(max / width));
  if (binCount > MAX_BINS) {
    binCount = MAX_BINS;
    width = max / binCount;
  }
  const histogram: GapBin[] = Array.from({ length: binCount }, (_, i) => ({
    from: i * width, to: (i + 1) * width, count: 0,
  }));
  for (const g of gaps) {
    const i = Math.min(binCount - 1, Math.max(0, Math.floor(g / width)));
    histogram[i].count++;
  }

  const maxVisual = 2600;
  const visuals = [...ab.points, ...ba.points];
  const step = Math.max(1, Math.floor(visuals.length / maxVisual));
  const samples: SeamSample[] = visuals
    .filter((_, i) => i % step === 0)
    .map(v => ({ point: [v.point.x, v.point.y, v.point.z], distance: v.distance }));

  return {
    sampleCount: gaps.length,
    min: gaps[0],
    max,
    mean: sum / gaps.length,
    median: pick(0.5),
    p90: pick(0.9),
    p99: pick(0.99),
    overThreshold: gaps.filter(g => g > threshold).length,
    threshold,
    captureRadius,
    histogram,
    samples,
    contactRatio,
    cellCount: gaps.length,
  };
}

interface ContactPoint {
  point: THREE.Vector3;
  distance: number;
}

function sampleContacts(
  from: RawMesh,
  to: RawMesh,
  captureRadius: number,
  target: number,
) {
  const toWelded = weldByPosition(to, 1e-4);
  const toGeo = toBufferGeometry(toWelded);
  const bvh = new MeshBVH(toGeo, { maxDepth: 40 });

  const { positions, index } = from;
  const triCount = index.length / 3;
  const perTri = Math.max(1, Math.min(6, Math.round(target / Math.max(1, triCount))));

  const points: ContactPoint[] = [];
  let sampled = 0;

  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const p = new THREE.Vector3();
  const abv = new THREE.Vector3();
  const acv = new THREE.Vector3();
  const closest = { point: new THREE.Vector3(), distance: 0, faceIndex: 0 };

  let seed = 0x9e3779b9;
  const rnd = () => {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return ((seed >>> 0) % 100000) / 100000;
  };

  for (let t = 0; t < triCount; t++) {
    const i0 = index[t * 3], i1 = index[t * 3 + 1], i2 = index[t * 3 + 2];
    a.fromArray(positions, i0 * 3);
    b.fromArray(positions, i1 * 3);
    c.fromArray(positions, i2 * 3);
    abv.subVectors(b, a);
    acv.subVectors(c, a);
    const area2 = abv.clone().cross(acv).length();
    if (area2 < 1e-12) continue; // 退化三角形
    const weight = area2 / 2;
    const k = Math.max(perTri, Math.min(perTri * 3, Math.round(perTri * (0.4 + weight / 30))));
    for (let s = 0; s < k; s++) {
      let u = rnd(), v = rnd();
      if (u + v > 1) { u = 1 - u; v = 1 - v; }
      p.copy(a).addScaledVector(abv, u).addScaledVector(acv, v);
      sampled++;
      const hit = bvh.closestPointToPoint(p, closest, 0, captureRadius);
      if (hit) points.push({ point: p.clone(), distance: hit.distance });
    }
  }

  toGeo.dispose();
  (bvh as unknown as { dispose?: () => void }).dispose?.();
  return { points, sampled };
}
