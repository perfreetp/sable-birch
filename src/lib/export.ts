import * as THREE from 'three';
import type { AltitudeLayer, LayerStats, Observer, SampleResult } from '../types';

/** 遮挡程度 0~1 -> 绿 -> 黄 -> 红 */
export function occlusionColor(t: number, out = new THREE.Color()): THREE.Color {
  const v = Math.min(1, Math.max(0, t));
  if (v < 0.5) {
    out.setRGB(0.15 + v * 0.85, 0.75, 0.2); // 绿 -> 黄
  } else {
    out.setRGB(1, 0.75 - (v - 0.5) * 1.5, 0.2 - (v - 0.5) * 0.4); // 黄 -> 红
  }
  return out;
}

/** 视场外采样点颜色（冷灰） */
export const OUT_OF_FOV_COLOR = new THREE.Color(0x5b6b7a);

/** 高度层配色（开关与图例用） */
export const LAYER_COLORS = [
  0x4fc3f7,
  0x29b6f6,
  0x039be5,
  0x1565c0,
  0x0d47a1
];

function download(filename: string, content: string | Blob, mime: string) {
  const blob =
    typeof content === 'string' ? new Blob([content], { type: `${mime};charset=utf-8` }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function timestamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(
    d.getMinutes()
  )}${p(d.getSeconds())}`;
}

/** 导出完整 JSON 报告：分层遮挡率 + 全部采样点结果 */
export function exportResultsJSON(
  layers: AltitudeLayer[],
  stats: LayerStats[],
  samples: SampleResult[],
  observers: Observer[],
  spacingLabel: string
) {
  const report = {
    exportedAt: new Date().toISOString(),
    spacing: spacingLabel,
    observers: observers.map((o) => ({ ...o })),
    layerStats: stats.map((s) => ({
      layer: layers.find((l) => l.id === s.layerId)?.name ?? `L${s.layerId + 1}`,
      altitudeRange: layers.find((l) => l.id === s.layerId)
        ? [
            layers.find((l) => l.id === s.layerId)!.low,
            layers.find((l) => l.id === s.layerId)!.high
          ]
        : null,
      ...s
    })),
    samples: samples.map((s) => ({ ...s }))
  };
  download(`occlusion_report_${timestamp()}.json`, JSON.stringify(report, null, 2), 'application/json');
}

/** 导出采样点 CSV（含每层结果） */
export function exportResultsCSV(layers: AltitudeLayer[], samples: SampleResult[]) {
  const header = [
    'layer_id',
    'layer_name',
    'x_m',
    'y_m',
    'z_m',
    'in_fov',
    'occlusion_ratio',
    'hit_observers',
    'total_observers',
    'level'
  ];
  const levelOf = (o: number) => (o <= 0.001 ? 'visible' : o >= 0.999 ? 'occluded' : 'partial');
  const rows = samples.map((s) => {
    const layer = layers.find((l) => l.id === s.layerId);
    return [
      s.layerId,
      layer?.name ?? '',
      s.x.toFixed(2),
      s.y.toFixed(2),
      s.z.toFixed(2),
      s.inFov ? 1 : 0,
      s.occlusion.toFixed(4),
      s.hitObservers,
      s.totalObservers,
      levelOf(s.occlusion)
    ].join(',');
  });
  // BOM 便于 Excel 识别 UTF-8
  download(`occlusion_samples_${timestamp()}.csv`, '﻿' + [header.join(','), ...rows].join('\n'), 'text/csv');
}

/** 导出观察点配置文件 */
export function exportObservers(observers: Observer[]) {
  download(
    `observers_${timestamp()}.json`,
    JSON.stringify({ observers }, null, 2),
    'application/json'
  );
}

/** 导出建筑体块文件 */
export function exportBuildings<T>(buildings: T[]) {
  download(
    `buildings_${timestamp()}.json`,
    JSON.stringify({ source: 'urban-airspace-occlusion', buildings }, null, 2),
    'application/json'
  );
}
