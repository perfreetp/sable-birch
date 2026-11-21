// 几何逻辑冒烟测试（Node 环境，通过 esbuild 转译后运行）
import {
  SHAPES,
  findSnap,
  sharedEdge,
  polygonsOverlap,
  worldPolygon,
  quantizeAngle,
  type Pose,
  type ShapeKind,
} from "./lib/geometry";
import { TEMPLATES } from "./lib/templates";

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) {
    pass++;
    console.log(`  ✅ ${name}`);
  } else {
    fail++;
    console.log(`  ❌ ${name} ${extra}`);
  }
}

// 1. 两个方块：拖动片靠近静止片的一条边，应吸附且共边
{
  const base: Pose = { p: { x: 0, y: 0 }, r: 0 };
  // 放在右边附近，略偏
  const mover: Pose = { p: { x: 2.6, y: 0.15 }, r: 0 };
  const snap = findSnap("square", mover, [{ id: "b", kind: "square", pose: base }]);
  check("方块-方块吸附", !!snap);
  if (snap) {
    check("吸附后共边", !!sharedEdge("square", snap.pose, "square", base));
    check(
      "吸附位置精确(边中点重合)",
      Math.abs(snap.pose.p.x - 2) < 1e-6 && Math.abs(snap.pose.p.y) < 1e-6,
      JSON.stringify(snap.pose.p)
    );
  }
}

// 2. 三角形吸附六边形
{
  const base: Pose = { p: { x: 0, y: 0 }, r: 0 };
  const mover: Pose = { p: { x: 1.3, y: 0.3 }, r: 0.4 };
  const snap = findSnap("triangle", mover, [{ id: "h", kind: "hexagon", pose: base }]);
  check("三角-六边形吸附", !!snap);
  if (snap) check("吸附后共边", !!sharedEdge("triangle", snap.pose, "hexagon", base));
}

// 3. 15 度量化
check("15度量化", Math.abs(quantizeAngle(0.23) - 0.261799) < 1e-6);

// 4. 扇形弧边贴合（圆心重合）
{
  const a: Pose = { p: { x: 0, y: 0 }, r: 0 };
  const b: Pose = { p: { x: 0.35, y: 0.35 }, r: 0.5 };
  const snap = findSnap("sector", b, [{ id: "s", kind: "sector", pose: a }]);
  check("扇形-扇形吸附", !!snap);
  if (snap) {
    check("弧边圆心重合", Math.hypot(snap.pose.p.x, snap.pose.p.y) < 1e-6);
    check("扇形直边共边", !!sharedEdge("sector", snap.pose, "sector", a));
  }
}

// 5. 重叠检测
{
  const a = worldPolygon("square", { p: { x: 0, y: 0 }, r: 0 });
  const b = worldPolygon("square", { p: { x: 0.5, y: 0.5 }, r: 0 });
  const c = worldPolygon("square", { p: { x: 5, y: 5 }, r: 0 });
  check("重叠=true", polygonsOverlap(a, b));
  check("远离=false", !polygonsOverlap(a, c));
}

// 6. 所有模板：片间无面积重叠，且除首片外每片都与前序片共边
for (const tpl of TEMPLATES) {
  let connected = true;
  let overlap = false;
  for (let i = 1; i < tpl.steps.length; i++) {
    const s = tpl.steps[i];
    const prev = tpl.steps.slice(0, i);
    if (!prev.some((p) => sharedEdge(s.kind, s.pose, p.kind, p.pose))) connected = false;
    for (const p of prev) {
      if (polygonsOverlap(worldPolygon(s.kind, s.pose), worldPolygon(p.kind, p.pose))) {
        overlap = true;
      }
    }
  }
  check(`模板[${tpl.name}]全部连通`, connected);
  check(`模板[${tpl.name}]无重叠`, !overlap);
}

// 7. 形状边数 sanity
check("扇形有3条边(2直1弧)", SHAPES.sector.edges.length === 3);
check("六边形6条边", SHAPES.hexagon.edges.length === 6);
check("所有直边等长(R=2)", ["square", "triangle", "hexagon"].every((k) =>
  SHAPES[k as ShapeKind].edges.every((e) => Math.abs(Math.hypot(e.b.x - e.a.x, e.b.y - e.a.y) - 2) < 1e-6)
));

console.log(`\n结果: ${pass} 通过, ${fail} 失败`);
if (fail) (globalThis as { process?: { exit: (n: number) => void } }).process?.exit(1);
