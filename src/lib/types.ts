/** Shared domain types for the low-altitude weather volume tool. */

export interface Waypoint {
  id: string
  name: string
  /** East offset from domain centre, metres. */
  x: number
  /** North offset from domain centre, metres. */
  z: number
  /** Lower bound of the altitude band, metres MSL. */
  altMin: number
  /** Upper bound of the altitude band, metres MSL. */
  altMax: number
}

export interface FlightRoute {
  name: string
  waypoints: Waypoint[]
}

export interface Leg {
  index: number
  fromId: string
  toId: string
  label: string
  /** Along-track start distance, metres. */
  s0: number
  /** Along-track end distance, metres. */
  s1: number
  length: number
  bearing: number
}

export interface FrameVolume {
  frame: number
  /** 32 chunks of 16^3 RGBA8 voxels, chunk-major order. */
  chunks: Uint8Array[]
  /** Cloud base height (m MSL) per 64x64 ground column, NaN when clear. */
  cloudBase: Float32Array
  /** Time offset of this frame from the analysis epoch, minutes. */
  minutes: number
}

export interface CacheStatus {
  frames: number[]
  bytes: number
  totalFrames: number
}

export interface SectionLegSpan {
  index: number
  label: string
  s0: number
  s1: number
  status: 'clear' | 'caution' | 'conflict'
  minVisibility: number
  maxDensity: number
}

export interface Section {
  cols: number
  rows: number
  sMax: number
  altMax: number
  /** cols*rows row-major (row 0 = lowest altitude). */
  density: Float32Array
  visibility: Float32Array
  /** per column. */
  terrain: Float32Array
  msa: Float32Array
  cloudBase: Float32Array
  bandBottom: Float32Array
  bandTop: Float32Array
  /** cheap subset of the data for cursor readout */
  colStep: number
  rowStep: number
  legSpans: SectionLegSpan[]
  stats: {
    minVisibility: number
    meanVisibility: number
    maxDensity: number
    conflictLegs: number
    cautionLegs: number
  }
}

export interface SectionSamplePoint {
  legIndex: number
  legLabel: string
  distance: number
  lon: number
  lat: number
  altitude: number
  density: number
  precip: number
  visibility: number
  cloudBase: number
  msa: number
  inBand: boolean
}

export const DENSITY_LEVELS = [
  { id: 0, name: '稀薄', threshold: 0.14, opacity: 0.42, label: 'EDT-0.14' },
  { id: 1, name: '标准', threshold: 0.26, opacity: 0.72, label: 'EDT-0.26' },
  { id: 2, name: '致密', threshold: 0.4, opacity: 0.95, label: 'EDT-0.40' },
] as const

export const BASEMAPS = [
  { id: 'relief', name: '暗色地形' },
  { id: 'elevation', name: '高程分层' },
  { id: 'contour', name: '等高线' },
] as const

export type BasemapId = (typeof BASEMAPS)[number]['id']

export const VISIBILITY_BANDS = [
  { max: 1500, color: '#ff4d4d', name: '很差', code: 'LIFR' },
  { max: 3000, color: '#ff9a3c', name: '较差', code: 'IFR' },
  { max: 5000, color: '#ffd24a', name: '一般', code: 'MVFR' },
  { max: 10000, color: '#a8e05f', name: '良好', code: 'VFR' },
  { max: Infinity, color: '#3fd6a0', name: '优良', code: 'SVFR' },
] as const

export function visibilityColor(vis: number): string {
  for (const band of VISIBILITY_BANDS) {
    if (vis < band.max) return band.color
  }
  return '#3fd6a0'
}
