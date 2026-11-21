// Babylon 的多边形三角化（CreatePolygon/ExtrudePolygon）依赖全局 earcut，
// 这里显式注入，避免打包后 ReferenceError。
import earcut from "earcut";

const g = globalThis as unknown as { earcut?: unknown };
if (typeof g.earcut === "undefined") {
  g.earcut = earcut;
}

export {};
