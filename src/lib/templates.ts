import {
  SHAPES,
  type Pose,
  type ShapeKind,
  type V2,
  edgeMidWorld,
  dist,
  edgeDirWorld,
  angleOf,
  rotVec,
  sub,
  add,
  mid,
  polygonsOverlap,
  worldPolygon,
} from "./geometry";

export interface TemplateStep {
  kind: ShapeKind;
  /** 该步片应处的位姿（世界坐标） */
  pose: Pose;
}

export interface Template {
  id: string;
  name: string;
  emoji: string;
  steps: TemplateStep[];
}

const P0: Pose = { p: { x: 0, y: 0 }, r: 0 };

/**
 * 已知父片位姿，求子片在"父边 pe 与子边 ce 共边"后的位姿。
 * 同向/反向两种端点映射，优先选不与父片重叠（落在外侧）的候选。
 */
function snapToParent(
  childKind: ShapeKind,
  ceIdx: number,
  parent: Pose,
  peIdx: number,
  parentKind: ShapeKind
): Pose {
  const cd = SHAPES[childKind];
  const pd = SHAPES[parentKind];
  const ce = cd.edges[ceIdx];
  const pe = pd.edges[peIdx];
  const dChild = rotVec(sub(ce.b, ce.a), P0.r); // 局部方向
  const dParentWorld = edgeDirWorld(pe, parent);
  const cmLocal = mid(ce.a, ce.b);
  const pm = edgeMidWorld(pe, parent);

  const cands: Pose[] = [Math.PI, 0].map((flip) => {
    const r = angleOf(dParentWorld) + flip - angleOf(dChild);
    const cmWorld = add(rotVec(cmLocal, r), P0.p);
    return { p: sub(pm, sub(cmWorld, P0.p)), r };
  });
  const outside = cands.find(
    (c) => !polygonsOverlap(worldPolygon(childKind, c), worldPolygon(parentKind, parent))
  );
  return outside ?? cands[0];
}

/** 平移整个模板到画面中心 */
function centerize(steps: TemplateStep[]): TemplateStep[] {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const s of steps) {
    for (const v of SHAPES[s.kind].verts) {
      const w = add(rotVec(v, s.pose.r), s.pose.p);
      minX = Math.min(minX, w.x);
      maxX = Math.max(maxX, w.x);
      minY = Math.min(minY, w.y);
      maxY = Math.max(maxY, w.y);
    }
  }
  const c: V2 = { x: -(minX + maxX) / 2, y: -(minY + maxY) / 2 };
  return steps.map((s) => ({ ...s, pose: { p: add(s.pose.p, c), r: s.pose.r } }));
}

/** 小房子：方块墙 + 三角屋顶 */
function buildHouse(): Template {
  const steps: TemplateStep[] = [];
  const wall: Pose = { p: { x: 0, y: 0 }, r: 0 };
  steps.push({ kind: "square", pose: wall });
  // 三角形边 0（底边）贴方块边 2（+X 方向的边，即上边）
  const roof = snapToParent("triangle", 0, wall, 2, "square");
  steps.push({ kind: "triangle", pose: roof });
  return { id: "house", name: "小房子", emoji: "🏠", steps: centerize(steps) };
}

/** 六边花：中心六边形 + 6 个三角形围一圈 */
function buildFlower(): Template {
  const steps: TemplateStep[] = [{ kind: "hexagon", pose: P0 }];
  for (let i = 0; i < 6; i++) {
    // 三角形边 0 贴六边形第 i 条边
    const pose = snapToParent("triangle", 0, P0, i, "hexagon");
    steps.push({ kind: "triangle", pose });
  }
  return { id: "flower", name: "六边花", emoji: "🌸", steps: centerize(steps) };
}

/** 开口盒子：中心方块 + 4 个方块墙（折起来就是无盖盒子） */
function buildBox(): Template {
  const steps: TemplateStep[] = [{ kind: "square", pose: P0 }];
  for (let i = 0; i < 4; i++) {
    const pose = snapToParent("square", 0, P0, i, "square");
    steps.push({ kind: "square", pose });
  }
  return { id: "box", name: "小盒子", emoji: "📦", steps: centerize(steps) };
}

/** 圆圆饼：4 个 90° 扇形拼成整圆（显式位姿，弧边朝外） */
function buildFan(): Template {
  const steps: TemplateStep[] = [];
  const c: V2 = { x: 0, y: 0 };
  for (let i = 0; i < 4; i++) {
    // 扇形局部角域 0~90°，旋转 i*90° 即铺满
    steps.push({
      kind: "sector",
      pose: { p: c, r: (i * Math.PI) / 2 },
    });
  }
  return { id: "fan", name: "圆圆饼", emoji: "🍩", steps: centerize(steps) };
}

export const TEMPLATES: Template[] = [buildHouse(), buildFlower(), buildBox(), buildFan()];

/** 判断一次落片是否命中模板下一步（形状相同且位姿接近） */
export function matchesStep(
  step: TemplateStep,
  kind: ShapeKind,
  pose: Pose
): boolean {
  if (step.kind !== kind) return false;
  const a = step.pose.p;
  const b = pose.p;
  return dist(a, b) < 0.9 && Math.abs(angleDiff(step.pose.r, pose.r)) < 0.35;
}

function angleDiff(a: number, b: number): number {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}
