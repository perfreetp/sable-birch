import { generateSampleSite, voxelDownsample, parsePointFile } from '../src/three/pointcloud'
import { buildTerrainGrid, bilinearHeight, buildTerrainGeometry } from '../src/three/terrain'
import { extractContours } from '../src/three/contours'

let failed = 0
function check(name: string, cond: boolean) {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`)
  if (!cond) failed++
}

// 示例数据 → 抽稀 → 格网 → 等高线 全流程
const raw = generateSampleSite()
check('示例点云生成 >10万点', raw.length / 3 > 100000)

for (const v of [0.1, 0.25, 0.5, 1.0]) {
  const down = voxelDownsample(raw, v)
  const grid = buildTerrainGrid(down, v)
  const nan = Array.from(grid.heights).some(h => !Number.isFinite(h))
  check(`voxel=${v} 抽稀后点数 < 原始`, down.length / 3 < raw.length / 3)
  check(`voxel=${v} 格网无 NaN`, !nan)
  check(`voxel=${v} 高程范围合理`, grid.maxH - grid.minH > 2 && grid.maxH - grid.minH < 10)
  const mid = bilinearHeight(grid, grid.originX + (grid.nx * grid.res) / 2, grid.originY + (grid.ny * grid.res) / 2)
  check(`voxel=${v} 中心双线性插值有效`, mid !== null && Number.isFinite(mid))
  const geo = buildTerrainGeometry(grid)
  check(`voxel=${v} 几何体顶点数正确`, geo.getAttribute('position').count === grid.nx * grid.ny)
  const levels = extractContours(grid, 0.5)
  check(`voxel=${v} 0.5m 等高距提取到多条等高线`, levels.length >= 5 && levels.every(l => l.segments.length > 0))
}

// 等高距可调
const grid = buildTerrainGrid(voxelDownsample(raw, 0.25), 0.25)
const l02 = extractContours(grid, 0.2).length
const l2 = extractContours(grid, 2.0).length
check('等高距 0.2m 的等高线数量 > 2m 的', l02 > l2)

// 文本点云解析
const xyz = new TextEncoder().encode('# comment\n1 2 3\n4,5,6\n7;8;9\nbad line\n').buffer
const pts = parsePointFile('a.xyz', xyz)
check('xyz 文本解析 3 个点', pts.length === 9 && pts[0] === 1 && pts[4] === 5 && pts[8] === 9)

// ASCII PLY 解析
const ply = `ply\nformat ascii 1.0\nelement vertex 2\nproperty float x\nproperty float y\nproperty float z\nend_header\n1.5 2.5 3.5\n4 5 6\n`
const ppts = parsePointFile('a.ply', new TextEncoder().encode(ply).buffer)
check('ascii PLY 解析', ppts.length === 6 && Math.abs(ppts[0] - 1.5) < 1e-6 && ppts[5] === 6)

console.log(failed === 0 ? '\nALL TESTS PASSED' : `\n${failed} TESTS FAILED`)
process.exit(failed === 0 ? 0 : 1)
