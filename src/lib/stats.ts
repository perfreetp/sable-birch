import type { LayerStats, SampleResult, AltitudeLayer } from '../types';
import { occlusionLevel } from './occlusion';

/** 按高度层汇总遮挡统计 */
export function computeLayerStats(samples: SampleResult[], layers: AltitudeLayer[]): LayerStats[] {
  return layers.map((layer) => {
    const inLayer = samples.filter((s) => s.layerId === layer.id);
    const inFov = inLayer.filter((s) => s.inFov);
    const visible = inFov.filter((s) => occlusionLevel(s.occlusion) === 'visible');
    const partial = inFov.filter((s) => occlusionLevel(s.occlusion) === 'partial');
    const occluded = inFov.filter((s) => occlusionLevel(s.occlusion) === 'occluded');
    const avgOcclusion = inFov.length
      ? inFov.reduce((sum, s) => sum + s.occlusion, 0) / inFov.length
      : 0;

    return {
      layerId: layer.id,
      totalSamples: inLayer.length,
      inFovSamples: inFov.length,
      visibleSamples: visible.length,
      partialSamples: partial.length,
      occludedSamples: occluded.length,
      avgOcclusion,
      occlusionRate: inFov.length ? (partial.length + occluded.length) / inFov.length : 0,
      fullOcclusionRate: inFov.length ? occluded.length / inFov.length : 0
    };
  });
}

/** 全部层合计统计 */
export function overallStats(stats: LayerStats[]): LayerStats {
  const sum = (key: keyof LayerStats) =>
    stats.reduce((acc, s) => acc + (s[key] as number), 0);
  const inFov = sum('inFovSamples');
  const partial = sum('partialSamples');
  const occluded = sum('occludedSamples');
  const weightedAvg =
    inFov > 0
      ? stats.reduce((acc, s) => acc + s.avgOcclusion * s.inFovSamples, 0) / inFov
      : 0;
  return {
    layerId: -1,
    totalSamples: sum('totalSamples'),
    inFovSamples: inFov,
    visibleSamples: sum('visibleSamples'),
    partialSamples: partial,
    occludedSamples: occluded,
    avgOcclusion: weightedAvg,
    occlusionRate: inFov ? (partial + occluded) / inFov : 0,
    fullOcclusionRate: inFov ? occluded / inFov : 0
  };
}
