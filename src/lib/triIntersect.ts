import * as THREE from 'three';

/**
 * 两个三角形的真相交判定（不含仅共享边/点的接触）。
 *
 * three-mesh-bvh 自带的 ExtendedTriangle#intersectsTriangle 在三角形法向
 * 不严格共线时会漏判部分厚面穿刺情形；这里用基于分离轴（SAT）的实现，
 * 只处理三维三角形对，并显式排除「仅共享顶点/边」的邻接接触。
 */
const EPS = 1e-9;

const _a0 = new THREE.Vector3();
const _a1 = new THREE.Vector3();
const _a2 = new THREE.Vector3();
const _b0 = new THREE.Vector3();
const _b1 = new THREE.Vector3();
const _b2 = new THREE.Vector3();
const _n1 = new THREE.Vector3();
const _n2 = new THREE.Vector3();
const _dir = new THREE.Vector3();

function project(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, dir: THREE.Vector3) {
  const p0 = a.dot(dir);
  const p1 = b.dot(dir);
  const p2 = c.dot(dir);
  return { min: Math.min(p0, p1, p2), max: Math.max(p0, p1, p2) };
}

function overlap1D(min1: number, max1: number, min2: number, max2: number) {
  return !(max1 < min2 - EPS || max2 < min1 - EPS);
}

function triNormal(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, out: THREE.Vector3) {
  const ux = b.x - a.x, uy = b.y - a.y, uz = b.z - a.z;
  const vx = c.x - a.x, vy = c.y - a.y, vz = c.z - a.z;
  out.set(uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx);
  const len = out.length();
  if (len < 1e-12) return false;
  out.divideScalar(len);
  return true;
}

function triArea2(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) {
  return new THREE.Vector3().subVectors(b, a).cross(new THREE.Vector3().subVectors(c, a)).length();
}

export interface TriangleIntersectOptions {
  /** 小于该量的「接触」不计为相交（mm） */
  contactTolerance?: number;
  /** 是否把「共面重叠」也算作相交。实体布尔切片会留下大量共面薄片，
   *  对「合并结果是否自交」的判定应设为 false；对「单片网格是否有穿模」
   *  的判定应设为 true。 */
  countCoplanar?: boolean;
}

/**
 * 三角形对是否相交。
 *
 * 分为两类：
 *  - 穿插（crossing）：一面的三角形穿过另一面所在平面，是明确的实体自交；
 *  - 共面重叠（coplanar overlap）：两面几乎共面且投影重叠。布尔运算切片
 *    留下的共面薄片属于这一类，物理上不构成穿模，可由调用方决定是否计入。
 */
export function trianglesIntersect(
  a0: THREE.Vector3, a1: THREE.Vector3, a2: THREE.Vector3,
  b0: THREE.Vector3, b1: THREE.Vector3, b2: THREE.Vector3,
  contactToleranceOrOptions: number | TriangleIntersectOptions = 1e-6,
): boolean {
  const opts: TriangleIntersectOptions = typeof contactToleranceOrOptions === 'number'
    ? { contactTolerance: contactToleranceOrOptions }
    : contactToleranceOrOptions;
  const contactTolerance = opts.contactTolerance ?? 1e-6;
  const countCoplanar = opts.countCoplanar ?? true;
  _a0.copy(a0); _a1.copy(a1); _a2.copy(a2);
  _b0.copy(b0); _b1.copy(b1); _b2.copy(b2);

  // 退化三角形无法定义法向，按点/线接触处理
  const areaA = triArea2(_a0, _a1, _a2);
  const areaB = triArea2(_b0, _b1, _b2);
  if (areaA < 1e-12 || areaB < 1e-12) return false;

  triNormal(_a0, _a1, _a2, _n1);
  triNormal(_b0, _b1, _b2, _n2);

  // 共享顶点/边只可能是邻接接触
  if (verticesShared(_a0, _a1, _a2, _b0, _b1, _b2, contactTolerance)) return false;

  // 1) 各自法向作为分离轴
  const pa = project(_a0, _a1, _a2, _n2);
  const pb = project(_b0, _b1, _b2, _n2);
  if (!overlap1D(pa.min, pa.max, pb.min, pb.max)) return false;

  const qa = project(_a0, _a1, _a2, _n1);
  const qb = project(_b0, _b1, _b2, _n1);
  if (!overlap1D(qa.min, qa.max, qb.min, qb.max)) return false;

  // 2) 边叉积方向作为分离轴
  const axes = [
    _edge(_a0, _a1), _edge(_a1, _a2), _edge(_a2, _a0),
    _edge(_b0, _b1), _edge(_b1, _b2), _edge(_b2, _b0),
  ];
  for (const e1 of axes.slice(0, 3)) {
    for (const e2 of axes) {
      _dir.crossVectors(e1, e2);
      if (_dir.lengthSq() < 1e-16) continue;
      _dir.normalize();
      const ra = project(_a0, _a1, _a2, _dir);
      const rb = project(_b0, _b1, _b2, _dir);
      if (!overlap1D(ra.min, ra.max, rb.min, rb.max)) return false;
    }
  }

  // 3) 共面：需要二维重叠判定（且重叠面积 > 接触容差）
  if (Math.abs(_n1.dot(_n2)) > 1 - 1e-6) {
    if (!countCoplanar) return false;
    return coplanarOverlap(_a0, _a1, _a2, _b0, _b1, _b2, _n1, contactTolerance);
  }
  return true;
}

function _edge(a: THREE.Vector3, b: THREE.Vector3) {
  // 返回归一化边方向
  const v = new THREE.Vector3().subVectors(b, a);
  const len = v.length();
  return len > 1e-12 ? v.divideScalar(len) : v;
}

function verticesShared(
  a0: THREE.Vector3, a1: THREE.Vector3, a2: THREE.Vector3,
  b0: THREE.Vector3, b1: THREE.Vector3, b2: THREE.Vector3,
  tol: number,
) {
  const A = [a0, a1, a2];
  const B = [b0, b1, b2];
  for (const p of A) {
    for (const q of B) {
      if (p.distanceToSquared(q) < tol * tol) return true;
    }
  }
  return false;
}

/** 共面三角形的二维重叠面积是否显著 */
function coplanarOverlap(
  a0: THREE.Vector3, a1: THREE.Vector3, a2: THREE.Vector3,
  b0: THREE.Vector3, b1: THREE.Vector3, b2: THREE.Vector3,
  normal: THREE.Vector3,
  tol: number,
) {
  // 用边法向分离轴（共面情形只需 6 条边法向 + 各自一条边方向）
  const edgesA = [
    [_a0, _a1], [_a1, _a2], [_a2, _a0],
  ];
  const edgesB = [
    [_b0, _b1], [_b1, _b2], [_b2, _b0],
  ];
  for (const [p, q] of [...edgesA, ...edgesB]) {
    _dir.subVectors(q, p).cross(normal);
    if (_dir.lengthSq() < 1e-16) continue;
    _dir.normalize();
    const ra = project(a0, a1, a2, _dir);
    const rb = project(b0, b1, b2, _dir);
    if (!overlap1D(ra.min, ra.max, rb.min, rb.max)) return false;
    if (Math.min(ra.max, rb.max) - Math.max(ra.min, rb.min) < tol) return false;
  }
  return true;
}
