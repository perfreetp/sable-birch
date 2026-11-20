// 几何核心逻辑冒烟测试( node --experimental-strip-types 运行)
import { azimuthDir, surfaceHeightAt, buildingPenetration, computeHeatmap } from '../src/core/geometry.ts'

const vp = { x: 0, z: 0, rotation: 0, elevation: 0 }
const params = { length: 800, slopeDeg: 8, divergenceDeg: 7.5, initHalfWidth: 25, initHalfHeight: 5 }
const ap = { id: 0, azimuth: 0, color: '#fff' } // 朝北

// 1. 方位角:0°=北(+Z),90°=东(+X)
const d0 = azimuthDir(0), d90 = azimuthDir(90)
console.assert(Math.abs(d0.z - 1) < 1e-9 && Math.abs(d0.x) < 1e-9, 'azimuth 0 -> +Z')
console.assert(Math.abs(d90.x - 1) < 1e-9, 'azimuth 90 -> +X')

// 2. 净空面高度:正北 400m 处 = 400*tan(8°) ≈ 56.2
const h = surfaceHeightAt(0, 400, vp, ap, params)
console.assert(h !== null && Math.abs(h - 400 * Math.tan(8 * Math.PI / 180)) < 0.01, `surface height ${h}`)

// 3. 投影外(横向偏移过大 / 反方向)返回 null
console.assert(surfaceHeightAt(500, 400, vp, ap, params) === null, 'outside width -> null')
console.assert(surfaceHeightAt(0, -10, vp, ap, params) === null, 'behind -> null')

// 4. 穿透:正北 400m 处一栋顶高 80m 的建筑;最大穿透在建筑最近边缘(z=385):80 - 385*tan(8°) ≈ 25.9
const b = { id: 1, cx: 0, cz: 400, hx: 15, hz: 15, base: 0, top: 80 }
const pen = buildingPenetration(b, vp, ap, params)
console.assert(pen && Math.abs(pen.depth - (80 - 385 * Math.tan(8 * Math.PI / 180))) < 0.2, `penetration ${pen?.depth}`)

// 5. 低矮建筑不穿透
const low = { id: 2, cx: 0, cz: 400, hx: 15, hz: 15, base: 0, top: 30 }
console.assert(buildingPenetration(low, vp, ap, params) === null, 'low building -> no penetration')

// 6. 热力网格:正北方向上的网格应被覆盖且高度随距离增加
const cells = computeHeatmap(-800, -800, 80, 80, 20, vp, [ap], params, () => 0)
const near = cells.find(c => Math.abs(c.wx - 10) < 1 && Math.abs(c.wz - 110) < 1)
const far = cells.find(c => Math.abs(c.wx - 10) < 1 && Math.abs(c.wz - 710) < 1)
console.assert(near?.height != null && far?.height != null, 'cells covered')
console.assert(far.height > near.height, 'height grows with distance')
const offAxis = cells.find(c => Math.abs(c.wx - 710) < 1 && Math.abs(c.wz - 710) < 1)
console.assert(offAxis?.height == null, 'off-axis cell not covered')

console.log('geometry smoke test: all assertions passed')
