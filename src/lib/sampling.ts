import type { AirspaceRegion, AltitudeLayer, SampleResult, SamplingDensity } from '../types';

/** 采样间距 3 档（米） */
export const SAMPLING_PRESETS: Record<
  SamplingDensity,
  { label: string; spacing: number; desc: string }
> = {
  coarse: { label: '稀疏', spacing: 50, desc: '50 m 间距，适合大范围快速评估' },
  medium: { label: '标准', spacing: 25, desc: '25 m 间距，常规评估精度' },
  fine: { label: '精细', spacing: 10, desc: '10 m 间距，高精度但计算量大' }
};

/** 采样点数量硬上限，防止浏览器卡死 */
export const MAX_SAMPLES = 300_000;

export interface GeneratedSamples {
  samples: SampleResult[];
  /** 因超出上限被截断的网格行数提示 */
  truncated: boolean;
  /** 单层网格规模 */
  gridCount: number;
}

/**
 * 在空域矩形区域内生成水平网格采样点，
 * 每个高度层取层高中点作为采样高度。
 */
export function generateSamples(
  region: AirspaceRegion,
  layers: AltitudeLayer[],
  spacingKey: SamplingDensity
): GeneratedSamples {
  const spacing = SAMPLING_PRESETS[spacingKey].spacing;
  const { minX, maxX, minZ, maxZ } = region;

  const nx = Math.max(1, Math.floor((maxX - minX) / spacing) + 1);
  const nz = Math.max(1, Math.floor((maxZ - minZ) / spacing) + 1);
  const perLayer = nx * nz;
  const activeLayers = layers.length;
  let truncated = false;
  let takeX = nx;
  let takeZ = nz;

  if (perLayer * activeLayers > MAX_SAMPLES) {
    truncated = true;
    const capacity = Math.floor(MAX_SAMPLES / activeLayers);
    const ratio = Math.sqrt(capacity / perLayer);
    takeX = Math.max(1, Math.floor(nx * ratio));
    takeZ = Math.max(1, Math.floor(nz * ratio));
  }

  const samples: SampleResult[] = [];
  for (const layer of layers) {
    const y = (layer.low + layer.high) / 2;
    for (let iz = 0; iz < takeZ; iz++) {
      const z = minZ + iz * spacing;
      for (let ix = 0; ix < takeX; ix++) {
        const x = minX + ix * spacing;
        samples.push({
          x,
          y,
          z,
          layerId: layer.id,
          occlusion: 0,
          inFov: false,
          hitObservers: 0,
          totalObservers: 0
        });
      }
    }
  }

  return { samples, truncated, gridCount: takeX * takeZ };
}

/** 默认 5 个高度带（0–300 m 均分） */
export function defaultLayers(): AltitudeLayer[] {
  const min = 0;
  const max = 300;
  const step = (max - min) / 5;
  return Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: `L${i + 1}`,
    low: Math.round(min + i * step),
    high: Math.round(min + (i + 1) * step),
    visible: true
  }));
}

/** 按给定总高度上下限重新均分 5 层 */
export function splitLayers(min: number, max: number): AltitudeLayer[] {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const step = (hi - lo) / 5;
  return Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: `L${i + 1}`,
    low: Math.round((lo + i * step) * 10) / 10,
    high: Math.round((lo + (i + 1) * step) * 10) / 10,
    visible: true
  }));
}
