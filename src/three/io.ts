import { state } from '../state'
import type { Viewer } from './Viewer'
import type { TerrainGrid } from './terrain'

interface ProjectFile {
  app: string
  version: number
  voxelSize: number
  contourInterval: number
  grid: {
    originX: number
    originY: number
    res: number
    nx: number
    ny: number
    heights: number[]
  }
  section: typeof state.section
  sectionEnabled: boolean
}

/** 导出地形网格与剖切区域参数为 JSON 文件 */
export function exportProject(viewer: Viewer): void {
  const g = viewer.grid
  if (!g) {
    state.status = '没有可导出的地形,请先生成网格'
    return
  }
  const data: ProjectFile = {
    app: 'site-terrain-recon',
    version: 1,
    voxelSize: state.voxelSize,
    contourInterval: state.contourInterval,
    grid: {
      originX: g.originX,
      originY: g.originY,
      res: g.res,
      nx: g.nx,
      ny: g.ny,
      heights: Array.from(g.heights, v => Math.round(v * 1000) / 1000),
    },
    section: state.section,
    sectionEnabled: state.sectionEnabled,
  }
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'terrain-project.json'
  a.click()
  URL.revokeObjectURL(a.href)
  state.status = '已导出地形网格与剖切参数'
}

/** 导入工程文件,恢复地形网格与剖切区域 */
export async function importProject(file: File, viewer: Viewer): Promise<void> {
  const text = await file.text()
  const data = JSON.parse(text) as ProjectFile
  if (data.app !== 'site-terrain-recon' || !data.grid) {
    throw new Error('不是本工具导出的工程文件')
  }
  const g = data.grid
  if (!Array.isArray(g.heights) || g.heights.length !== g.nx * g.ny) {
    throw new Error('工程文件中的格网数据不完整')
  }
  const heights = new Float32Array(g.heights)
  let minH = Infinity, maxH = -Infinity
  for (const h of heights) {
    if (h < minH) minH = h
    if (h > maxH) maxH = h
  }
  const grid: TerrainGrid = {
    originX: g.originX,
    originY: g.originY,
    res: g.res,
    nx: g.nx,
    ny: g.ny,
    heights,
    minH,
    maxH,
  }
  state.voxelSize = data.voxelSize ?? g.res
  state.contourInterval = data.contourInterval ?? state.contourInterval
  state.section = data.section ?? null
  state.sectionEnabled = !!data.sectionEnabled && !!data.section
  state.fileName = file.name
  viewer.setTerrainFromGrid(grid)
  state.status = `已导入工程 ${file.name}(仅地形网格,无原始点云)`
}
