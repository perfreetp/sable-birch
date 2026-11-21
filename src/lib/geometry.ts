// 2D 平面拼搭的核心几何：片形定义、位姿变换、边吸附求解、SAT 重叠检测

export type ShapeKind = "square" | "triangle" | "hexagon" | "sector";

export interface V2 {
  x: number;
  y: number;
}

/** 平面位姿：p 是台面 XZ 平面上的位置，r 是绕 Y 轴的旋转角（弧度） */
export interface Pose {
  p: V2;
  r: number;
}

export interface Edge {
  /** 局部坐标下的边端点 */
  a: V2;
  b: V2;
  straight: boolean;
  /** 弧形边：圆心（局部）与半径 */
  arc?: { center: V2; radius: number };
}

export interface ShapeDef {
  kind: ShapeKind;
  name: string;
  /** 多边形轮廓（局部坐标，CCW），扇形用采样点近似 */
  verts: V2[];
  edges: Edge[];
  front: V3Color;
  back: V3Color;
}

export interface V3Color {
  r: number;
  g: number;
  b: number;
}

export const R = 2; // 基本边长 / 扇形半径
const TAU = Math.PI * 2;

const v = (x: number, y: number): V2 => ({ x, y });
const rot = (a: number): V2 => v(Math.cos(a), Math.sin(a));

function makeSquare(): ShapeDef {
  const h = R / 2;
  const verts = [v(-h, -h), v(h, -h), v(h, h), v(-h, h)];
  return {
    kind: "square",
    name: "正方形",
    verts,
    edges: polyEdges(verts),
    front: { r: 0.36, g: 0.62, b: 0.98 },
    back: { r: 0.99, g: 0.62, b: 0.25 },
  };
}

function makeTriangle(): ShapeDef {
  // 等边三角形，边长 = R，一条边水平朝右
  const h = (R * Math.sqrt(3)) / 2;
  const verts = [v(0, -R / 2), v(0, R / 2), v(h, 0)];
  return {
    kind: "triangle",
    name: "三角形",
    verts,
    edges: polyEdges(verts),
    front: { r: 0.42, g: 0.82, b: 0.46 },
    back: { r: 0.95, g: 0.45, b: 0.55 },
  };
}

function makeHexagon(): ShapeDef {
  // 正六边形，边长 = R，从角度 0 开始
  const verts: V2[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    verts.push(v(R * Math.cos(a), R * Math.sin(a)));
  }
  return {
    kind: "hexagon",
    name: "六边形",
    verts,
    edges: polyEdges(verts),
    front: { r: 0.72, g: 0.5, b: 0.96 },
    back: { r: 0.3, g: 0.82, b: 0.86 },
  };
}

function makeSector(): ShapeDef {
  // 90° 扇形，半径 R，圆心在原点，开口朝右上（角 0~90°）
  const N = 14;
  const verts: V2[] = [v(0, 0)];
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * (Math.PI / 2);
    verts.push(v(R * Math.cos(a), R * Math.sin(a)));
  }
  const edges: Edge[] = [
    { a: verts[1], b: verts[0], straight: true },
    { a: verts[0], b: verts[N + 1], straight: true },
    {
      a: verts[N + 1],
      b: verts[1],
      straight: false,
      arc: { center: v(0, 0), radius: R },
    },
  ];
  return {
    kind: "sector",
    name: "扇形",
    verts,
    edges,
    front: { r: 1.0, g: 0.78, b: 0.28 },
    back: { r: 0.55, g: 0.66, b: 1.0 },
  };
}

function polyEdges(verts: V2[]): Edge[] {
  const out: Edge[] = [];
  for (let i = 0; i < verts.length; i++) {
    out.push({ a: verts[i], b: verts[(i + 1) % verts.length], straight: true });
  }
  return out;
}

export const SHAPES: Record<ShapeKind, ShapeDef> = {
  square: makeSquare(),
  triangle: makeTriangle(),
  hexagon: makeHexagon(),
  sector: makeSector(),
};

export const SHAPE_ORDER: ShapeKind[] = ["square", "triangle", "hexagon", "sector"];

// ---------- 向量工具 ----------
export const add = (a: V2, b: V2): V2 => v(a.x + b.x, a.y + b.y);
export const sub = (a: V2, b: V2): V2 => v(a.x - b.x, a.y - b.y);
export const scale = (a: V2, s: number): V2 => v(a.x * s, a.y * s);
export const dot = (a: V2, b: V2): number => a.x * b.x + a.y * b.y;
export const len = (a: V2): number => Math.hypot(a.x, a.y);
export const dist = (a: V2, b: V2): number => len(sub(a, b));
export const mid = (a: V2, b: V2): V2 => v((a.x + b.x) / 2, (a.y + b.y) / 2);

export function angleOf(a: V2): number {
  return Math.atan2(a.y, a.x);
}

export function rotVec(a: V2, r: number): V2 {
  const c = Math.cos(r);
  const s = Math.sin(r);
  return v(a.x * c - a.y * s, a.x * s + a.y * c);
}

/** 局部点 -> 世界（台面）点 */
export function localToWorld(pt: V2, pose: Pose): V2 {
  return add(rotVec(pt, pose.r), pose.p);
}

/** 世界方向 -> 局部 */
export function worldToLocalVec(pt: V2, pose: Pose): V2 {
  return rotVec(pt, -pose.r);
}

export function edgeMidWorld(e: Edge, pose: Pose): V2 {
  return localToWorld(mid(e.a, e.b), pose);
}

export function edgeDirWorld(e: Edge, pose: Pose): V2 {
  return rotVec(sub(e.b, e.a), pose.r);
}

export function edgeLength(e: Edge): number {
  return e.straight ? dist(e.a, e.b) : 0;
}

/** 片在给定位姿下的世界轮廓 */
export function worldPolygon(kind: ShapeKind, pose: Pose): V2[] {
  return SHAPES[kind].verts.map((p) => localToWorld(p, pose));
}

// ---------- SAT 多边形重叠检测 ----------
function projectPoly(poly: V2[], axis: V2): [number, number] {
  let min = Infinity;
  let max = -Infinity;
  for (const p of poly) {
    const d = dot(p, axis);
    if (d < min) min = d;
    if (d > max) max = d;
  }
  return [min, max];
}

const EPS = 0.04; // 贴合时允许的极小间隙

export function polygonsOverlap(a: V2[], b: V2[]): boolean {
  for (const poly of [a, b]) {
    for (let i = 0; i < poly.length; i++) {
      const d = sub(poly[(i + 1) % poly.length], poly[i]);
      const axis = v(-d.y, d.x);
      const l = len(axis);
      if (l < 1e-9) continue;
      const n = scale(axis, 1 / l);
      const [a1, a2] = projectPoly(a, n);
      const [b1, b2] = projectPoly(b, n);
      if (a2 <= b1 + EPS || b2 <= a1 + EPS) return false;
    }
  }
  return true;
}

// ---------- 边吸附 ----------
export interface SnapResult {
  pose: Pose;
  /** 吸附的两片边索引 [拖动片, 静止片] */
  edges: [number, number];
  otherId: string;
}

/**
 * 求解直边贴合：两条等长边对齐。
 * 同一条边有两种端点映射（同向/反向），返回两个候选位姿，
 * 由调用方用重叠检测选出"落在对方外侧"的那个。
 */
function straightSnapCandidates(eA: Edge, poseA: Pose, eB: Edge, poseB: Pose): Pose[] {
  const dA = edgeDirWorld(eA, poseA);
  const dB = edgeDirWorld(eB, poseB);
  const ma = edgeMidWorld(eA, poseA);
  const mb = edgeMidWorld(eB, poseB);
  return [Math.PI, 0].map((flip) => {
    const r = angleOf(dB) - angleOf(dA) + flip;
    const newR = poseA.r + r;
    const shifted = add(rotVec(sub(poseA.p, ma), r), mb);
    return { p: shifted, r: newR };
  });
}

/** 扇形弧边贴合：同半径弧边反向贴合 -> 圆心重合、开口相对 */
function arcSnapTransform(
  defA: ShapeDef,
  poseA: Pose,
  defB: ShapeDef,
  poseB: Pose
): Pose | null {
  const iA = defA.edges.findIndex((e) => !e.straight);
  const iB = defB.edges.findIndex((e) => !e.straight);
  if (iA < 0 || iB < 0) return null;
  const cA = localToWorld(defA.edges[iA].arc!.center, poseA);
  const cB = localToWorld(defB.edges[iB].arc!.center, poseB);
  if (dist(cA, cB) > SNAP_DIST) return null;
  // 两片直边两两重合时贴合最好，取最近的一组直边来定角度
  let best: Pose | null = null;
  let bestD = Infinity;
  for (const ea of defA.edges.filter((e) => e.straight)) {
    for (const eb of defB.edges.filter((e) => e.straight)) {
      for (const cand of straightSnapCandidates(ea, poseA, eb, poseB)) {
        const c = localToWorld(defA.edges[iA].arc!.center, cand);
        const d = dist(c, cB);
        if (d < bestD) {
          bestD = d;
          cand.p = add(cand.p, sub(cB, c)); // 强制圆心重合
          best = cand;
        }
      }
    }
  }
  return best;
}

export const SNAP_DIST = 0.85; // 边中点距离小于该值才吸附

/**
 * 在所有静止片里寻找拖动片的最佳吸附。
 * occupied 为当前台面其它片的世界轮廓（用于重叠校验）。
 */
export function findSnap(
  kind: ShapeKind,
  pose: Pose,
  others: { id: string; kind: ShapeKind; pose: Pose }[]
): SnapResult | null {
  const def = SHAPES[kind];
  let best: SnapResult | null = null;
  let bestScore = SNAP_DIST;

  for (const o of others) {
    const od = SHAPES[o.kind];

    // 弧边对弧边
    if (kind === "sector" && o.kind === "sector") {
      const cand = arcSnapTransform(def, pose, od, o.pose);
      if (cand) {
        const poly = worldPolygon(kind, cand);
        if (!others.some((x) => x.id !== o.id && polygonsOverlap(poly, worldPolygon(x.kind, x.pose)))) {
          const score = dist(localToWorld(def.edges[2].arc!.center, cand), localToWorld(od.edges[2].arc!.center, o.pose));
          if (score < bestScore) {
            bestScore = score;
            best = { pose: cand, edges: [2, 2], otherId: o.id };
          }
        }
      }
    }

    // 直边对直边（等长），同向/反向两种候选，取落在对方外侧且最贴近的
    for (let i = 0; i < def.edges.length; i++) {
      const ea = def.edges[i];
      if (!ea.straight) continue;
      for (let j = 0; j < od.edges.length; j++) {
        const eb = od.edges[j];
        if (!eb.straight) continue;
        if (Math.abs(edgeLength(ea) - edgeLength(eb)) > 1e-4) continue;
        if (dist(edgeMidWorld(ea, pose), edgeMidWorld(eb, o.pose)) > SNAP_DIST) continue;
        for (const cand of straightSnapCandidates(ea, pose, eb, o.pose)) {
          const poly = worldPolygon(kind, cand);
          // 不能与目标片本身重叠（否则说明折进对方内部了），也不能与第三方重叠
          const hit =
            polygonsOverlap(poly, worldPolygon(o.kind, o.pose)) ||
            others.some((x) => x.id !== o.id && polygonsOverlap(poly, worldPolygon(x.kind, x.pose)));
          if (hit) continue;
          const score = dist(edgeMidWorld(ea, cand), edgeMidWorld(eb, o.pose));
          if (score < bestScore) {
            bestScore = score;
            best = { pose: cand, edges: [i, j], otherId: o.id };
          }
        }
      }
    }
  }
  return best;
}

/** 与任何其它片重叠？ */
export function overlapsAny(
  kind: ShapeKind,
  pose: Pose,
  others: { kind: ShapeKind; pose: Pose }[]
): boolean {
  const poly = worldPolygon(kind, pose);
  return others.some((o) => polygonsOverlap(poly, worldPolygon(o.kind, o.pose)));
}

/** 量化到 15° 步进 */
export function quantizeAngle(r: number, stepDeg = 15): number {
  const step = (stepDeg * Math.PI) / 180;
  return Math.round(r / step) * step;
}

/** 判断两片在当前位姿下是否共边贴合，返回边索引对 */
export function sharedEdge(
  kA: ShapeKind,
  pA: Pose,
  kB: ShapeKind,
  pB: Pose
): [number, number] | null {
  const dA = SHAPES[kA];
  const dB = SHAPES[kB];
  for (let i = 0; i < dA.edges.length; i++) {
    const ea = dA.edges[i];
    if (!ea.straight) continue;
    for (let j = 0; j < dB.edges.length; j++) {
      const eb = dB.edges[j];
      if (!eb.straight) continue;
      if (Math.abs(edgeLength(ea) - edgeLength(eb)) > 1e-4) continue;
      const ma = edgeMidWorld(ea, pA);
      const mb = edgeMidWorld(eb, pB);
      if (dist(ma, mb) > 0.12) continue;
      const da = edgeDirWorld(ea, pA);
      const db = edgeDirWorld(eb, pB);
      // 贴合要求两条边共线（同向/反向均可，取决于各自绕序）
      if (Math.abs(dot(da, db)) < 0.985) continue;
      return [i, j];
    }
  }
  // 扇形弧边贴合
  if (kA === "sector" && kB === "sector") {
    const ca = localToWorld(dA.edges[2].arc!.center, pA);
    const cb = localToWorld(dB.edges[2].arc!.center, pB);
    if (dist(ca, cb) < 0.12) return [2, 2];
  }
  return null;
}

/** 把角度规范到 [0, 2π) */
export function normAngle(a: number): number {
  a = a % TAU;
  return a < 0 ? a + TAU : a;
}

export const TAU_VAL = TAU;
