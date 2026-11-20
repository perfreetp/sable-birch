import type { ConflictRecord, ExportPayload, Scenario } from './types'

function timestamp(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  )
}

function download(filename: string, mime: string, content: string): void {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

/** 导出完整推演结果：航迹 + 冲突记录 + 阈值与时刻信息（JSON） */
export function exportJson(scenario: Scenario, conflicts: ConflictRecord[], currentTime: number, duration: number): string {
  const payload: ExportPayload = {
    scenarioName: scenario.name,
    exportedAt: new Date().toISOString(),
    duration,
    currentTime,
    thresholds: {
      horizontal: scenario.horizontalThreshold,
      vertical: scenario.verticalThreshold
    },
    conflicts,
    tracks: scenario.aircraft
  }
  const name = `uam_推演结果_${timestamp()}.json`
  download(name, 'application/json', JSON.stringify(payload, null, 2))
  return name
}

/** 仅导出冲突记录（CSV，带 BOM，Excel 可直接打开） */
export function exportConflictsCsv(conflicts: ConflictRecord[]): string {
  const header = [
    '冲突编号', '飞行器A', '飞行器B', '开始时刻(s)', '结束时刻(s)',
    '持续时长(s)', '最小水平间隔(m)', '对应垂直间隔(m)', '状态'
  ]
  const rows = conflicts.map((c, i) => [
    i + 1,
    c.aircraftA,
    c.aircraftB,
    c.startTime.toFixed(2),
    c.endTime.toFixed(2),
    (c.endTime - c.startTime).toFixed(2),
    c.minHorizontal.toFixed(2),
    c.verticalAtMinH.toFixed(2),
    c.active ? '进行中' : '已结束'
  ])
  const csv = [header, ...rows]
    .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\r\n')
  const name = `uam_冲突记录_${timestamp()}.csv`
  download(name, 'text/csv;charset=utf-8', '﻿' + csv)
  return name
}
