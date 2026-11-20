/**
 * 评估结果与起降场参数的导出 / 导入
 */
import { state } from '../state'
import type { ExportFile } from '../types'

export function buildExport(): ExportFile {
  return {
    format: 'vertiport-assessment',
    version: 1,
    exportedAt: new Date().toISOString(),
    vertiport: { ...state.vertiport },
    approaches: state.approaches.map(a => ({ ...a })),
    coneParams: { ...state.coneParams },
    results: state.results ?? {
      obstacles: [],
      heatmap: { coveredCells: 0, totalCells: 0, minHeight: 0, levelCounts: [0, 0, 0, 0, 0] },
      computedAt: ''
    }
  }
}

export function downloadExport() {
  const data = buildExport()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const ts = data.exportedAt.slice(0, 19).replace(/[:T]/g, '-')
  a.href = url
  a.download = `vertiport-assessment-${ts}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/** 解析并应用导入文件;失败时抛出带中文说明的错误 */
export function applyImport(text: string): void {
  let data: ExportFile
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('文件不是有效的 JSON')
  }
  if (data?.format !== 'vertiport-assessment' || data.version !== 1) {
    throw new Error('文件格式或版本不受支持')
  }
  if (!data.vertiport || !Array.isArray(data.approaches) || data.approaches.length !== 3) {
    throw new Error('文件缺少起降场或进近方向数据')
  }
  state.vertiport.x = Number(data.vertiport.x) || 0
  state.vertiport.z = Number(data.vertiport.z) || 0
  state.vertiport.rotation = Number(data.vertiport.rotation) || 0
  data.approaches.forEach((ap, i) => {
    state.approaches[i].azimuth = ((Number(ap.azimuth) || 0) % 360 + 360) % 360
  })
  if (data.coneParams) {
    Object.assign(state.coneParams, data.coneParams)
  }
}

export function pickImportFile(onError: (msg: string) => void) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json,application/json'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    try {
      applyImport(await file.text())
    } catch (e) {
      onError(e instanceof Error ? e.message : '导入失败')
    }
  }
  input.click()
}
