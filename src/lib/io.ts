import { TrajectoryResult, LaunchParams } from './types'

/** 导出轨迹数据为 JSON 文件（浏览器下载） */
export function exportTrajectoryJSON(result: TrajectoryResult) {
  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const stamp = result.generatedAt.replace(/[:.]/g, '-').slice(0, 19)
  a.href = url
  a.download = `trajectory-${result.params.siteName || 'launch'}-${stamp}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** 从 File 读取并校验轨迹 JSON */
export async function importTrajectoryJSON(file: File): Promise<TrajectoryResult> {
  const text = await file.text()
  const data = JSON.parse(text) as TrajectoryResult
  if (!data || data.schemaVersion !== 1 || !Array.isArray(data.samples) || !Array.isArray(data.events)) {
    throw new Error('文件格式无效：缺少 schemaVersion / samples / events 字段')
  }
  const required: (keyof LaunchParams)[] = [
    'longitude', 'latitude', 'azimuth', 'targetOrbitAltitudeKm', 'thrustToWeight',
  ]
  for (const k of required) {
    if (typeof data.params?.[k] !== 'number') throw new Error(`文件格式无效：params.${k} 缺失`)
  }
  return data
}

export const fmtKm = (m: number, digits = 1) => `${(m / 1000).toFixed(digits)} km`
export const fmtSpeed = (v: number) => `${(v / 1000).toFixed(2)} km/s`
export const fmtTime = (s: number) => {
  const mm = Math.floor(s / 60)
  const ss = Math.floor(s % 60)
  return `T+${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}
