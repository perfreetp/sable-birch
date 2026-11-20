import * as THREE from 'three'

/** 规则格网地形(Z 向上) */
export interface TerrainGrid {
  originX: number
  originY: number
  res: number
  nx: number
  ny: number
  heights: Float32Array
  minH: number
  maxH: number
}

/** 由(抽稀后的)点云构建规则格网,空洞用 BFS 邻域均值填充 */
export function buildTerrainGrid(pts: Float32Array, res: number): TerrainGrid {
  let minX = Infinity, minY = Infinity, minZ = Infinity
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity
  for (let i = 0; i < pts.length; i += 3) {
    const x = pts[i], y = pts[i + 1], z = pts[i + 2]
    if (x < minX) minX = x; if (x > maxX) maxX = x
    if (y < minY) minY = y; if (y > maxY) maxY = y
    if (z < minZ) minZ = z; if (z > maxZ) maxZ = z
  }
  const nx = Math.max(2, Math.ceil((maxX - minX) / res) + 1)
  const ny = Math.max(2, Math.ceil((maxY - minY) / res) + 1)
  const n = nx * ny
  const sums = new Float64Array(n)
  const counts = new Uint32Array(n)
  for (let i = 0; i < pts.length; i += 3) {
    let ix = Math.floor((pts[i] - minX) / res)
    let iy = Math.floor((pts[i + 1] - minY) / res)
    if (ix < 0) ix = 0; if (ix >= nx) ix = nx - 1
    if (iy < 0) iy = 0; if (iy >= ny) iy = ny - 1
    const c = iy * nx + ix
    sums[c] += pts[i + 2]
    counts[c]++
  }
  const heights = new Float32Array(n)
  const known = new Uint8Array(n)
  for (let c = 0; c < n; c++) {
    if (counts[c] > 0) {
      heights[c] = sums[c] / counts[c]
      known[c] = 1
    }
  }
  // BFS 填充空洞:从已知格向外逐层用邻域均值填充
  let queue: number[] = []
  for (let c = 0; c < n; c++) {
    if (known[c]) continue
    const x = c % nx, y = (c / nx) | 0
    if ((x > 0 && known[c - 1]) || (x < nx - 1 && known[c + 1]) ||
        (y > 0 && known[c - nx]) || (y < ny - 1 && known[c + nx])) {
      queue.push(c)
    }
  }
  while (queue.length) {
    const next: number[] = []
    for (const c of queue) {
      if (known[c]) continue
      const x = c % nx, y = (c / nx) | 0
      let s = 0, k = 0
      if (x > 0 && known[c - 1]) { s += heights[c - 1]; k++ }
      if (x < nx - 1 && known[c + 1]) { s += heights[c + 1]; k++ }
      if (y > 0 && known[c - nx]) { s += heights[c - nx]; k++ }
      if (y < ny - 1 && known[c + nx]) { s += heights[c + nx]; k++ }
      if (k === 0) { next.push(c); continue }
      heights[c] = s / k
      known[c] = 1
      if (x > 0 && !known[c - 1]) next.push(c - 1)
      if (x < nx - 1 && !known[c + 1]) next.push(c + 1)
      if (y > 0 && !known[c - nx]) next.push(c - nx)
      if (y < ny - 1 && !known[c + nx]) next.push(c + nx)
    }
    if (next.length === queue.length) break // 无进展,剩余为孤立区域
    queue = next
  }
  // 仍未填充的(理论上不会)用最低点兜底
  let minH = Infinity, maxH = -Infinity
  for (let c = 0; c < n; c++) {
    if (!known[c]) heights[c] = minZ
    const h = heights[c]
    if (h < minH) minH = h
    if (h > maxH) maxH = h
  }
  return { originX: minX, originY: minY, res, nx, ny, heights, minH, maxH }
}

/** 双线性插值取格网高程,超出范围返回 null */
export function bilinearHeight(g: TerrainGrid, x: number, y: number): number | null {
  const fx = (x - g.originX) / g.res
  const fy = (y - g.originY) / g.res
  if (fx < 0 || fy < 0 || fx > g.nx - 1 || fy > g.ny - 1) return null
  const i = Math.min(Math.floor(fx), g.nx - 2)
  const j = Math.min(Math.floor(fy), g.ny - 2)
  const tx = fx - i, ty = fy - j
  const h00 = g.heights[j * g.nx + i]
  const h10 = g.heights[j * g.nx + i + 1]
  const h01 = g.heights[(j + 1) * g.nx + i]
  const h11 = g.heights[(j + 1) * g.nx + i + 1]
  return (h00 * (1 - tx) + h10 * tx) * (1 - ty) + (h01 * (1 - tx) + h11 * tx) * ty
}

/** 高程渐变色带(低→高:绿→黄绿→黄褐→灰白) */
const RAMP: [number, number, number, number][] = [
  [0.00, 0.16, 0.38, 0.22],
  [0.30, 0.42, 0.52, 0.28],
  [0.55, 0.66, 0.58, 0.34],
  [0.75, 0.58, 0.44, 0.30],
  [1.00, 0.90, 0.88, 0.84],
]

export function heightColor(t: number): [number, number, number] {
  const c = Math.min(1, Math.max(0, t))
  for (let k = 0; k < RAMP.length - 1; k++) {
    const a = RAMP[k], b = RAMP[k + 1]
    if (c >= a[0] && c <= b[0]) {
      const f = (c - a[0]) / (b[0] - a[0])
      return [a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f, a[3] + (b[3] - a[3]) * f]
    }
  }
  const last = RAMP[RAMP.length - 1]
  return [last[1], last[2], last[3]]
}

/** 由格网构建带顶点色的地形网格几何体 */
export function buildTerrainGeometry(g: TerrainGrid): THREE.BufferGeometry {
  const { nx, ny, res, originX, originY, heights, minH, maxH } = g
  const positions = new Float32Array(nx * ny * 3)
  const colors = new Float32Array(nx * ny * 3)
  const range = Math.max(maxH - minH, 1e-6)
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const c = j * nx + i
      const h = heights[c]
      positions[c * 3] = originX + i * res
      positions[c * 3 + 1] = originY + j * res
      positions[c * 3 + 2] = h
      const [r, gg, b] = heightColor((h - minH) / range)
      colors[c * 3] = r
      colors[c * 3 + 1] = gg
      colors[c * 3 + 2] = b
    }
  }
  const index = new Uint32Array((nx - 1) * (ny - 1) * 6)
  let k = 0
  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const a = j * nx + i
      const b = a + 1
      const c = a + nx + 1
      const d = a + nx
      index[k++] = a; index[k++] = b; index[k++] = c
      index[k++] = a; index[k++] = c; index[k++] = d
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.setIndex(new THREE.BufferAttribute(index, 1))
  geo.computeVertexNormals()
  geo.computeBoundingBox()
  geo.computeBoundingSphere()
  return geo
}
