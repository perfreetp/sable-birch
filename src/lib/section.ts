import { DOMAIN, GRID, TerrainField, lonLatAt, makeSampler, visibilityFrom } from './weather.ts'
import type {
  FrameVolume,
  Leg,
  Section,
  SectionLegSpan,
  SectionSamplePoint,
  Waypoint,
} from './types.ts'

export const SECTION_COLS = 512
export const SECTION_ROWS = 144
/** Sampling stride along a leg when exporting numeric samples. */
export const EXPORT_STEP_M = 50

export function legGeometry(waypoints: Waypoint[]): Leg[] {
  const legs: Leg[] = []
  let s = 0
  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i]
    const b = waypoints[i + 1]
    const dx = b.x - a.x
    const dz = b.z - a.z
    const len = Math.hypot(dx, dz)
    if (len < 1) continue
    const bearing = (Math.atan2(dx, dz) * 180) / Math.PI
    legs.push({
      index: legs.length,
      fromId: a.id,
      toId: b.id,
      label: `${a.name} → ${b.name}`,
      s0: s,
      s1: s + len,
      length: len,
      bearing: (bearing + 360) % 360,
    })
    s += len
  }
  return legs
}

export function routeLength(legs: Leg[]): number {
  return legs.length ? legs[legs.length - 1].s1 : 0
}

export interface RoutePoint {
  x: number
  z: number
  /** Fraction along the whole route. */
  t: number
  /** Leg index the point lies on. */
  legIndex: number
}

/** Piecewise-linear sample of the polyline at an along-track distance. */
export function pointAtDistance(waypoints: Waypoint[], legs: Leg[], s: number): RoutePoint {
  if (!legs.length) {
    const w = waypoints[0]
    return { x: w?.x ?? 0, z: w?.z ?? 0, t: 0, legIndex: 0 }
  }
  const total = routeLength(legs)
  const d = Math.max(0, Math.min(total, s))
  for (const leg of legs) {
    if (d <= leg.s1 || leg === legs[legs.length - 1]) {
      const a = waypoints.find((w) => w.id === leg.fromId)!
      const b = waypoints.find((w) => w.id === leg.toId)!
      const f = leg.length > 0 ? Math.min(1, Math.max(0, (d - leg.s0) / leg.length)) : 0
      return {
        x: a.x + (b.x - a.x) * f,
        z: a.z + (b.z - a.z) * f,
        t: total > 0 ? d / total : 0,
        legIndex: leg.index,
      }
    }
  }
  const w = waypoints[waypoints.length - 1]
  return { x: w.x, z: w.z, t: 1, legIndex: legs.length - 1 }
}

/** Linear interpolation of the altitude band at along-track distance. */
export function bandAt(waypoints: Waypoint[], legs: Leg[], s: number): { lo: number; hi: number } {
  if (!legs.length) {
    const w = waypoints[0]
    return { lo: w?.altMin ?? 300, hi: w?.altMax ?? 1200 }
  }
  const total = routeLength(legs)
  const d = Math.max(0, Math.min(total, s))
  for (const leg of legs) {
    if (d <= leg.s1 || leg === legs[legs.length - 1]) {
      const a = waypoints.find((w) => w.id === leg.fromId)!
      const b = waypoints.find((w) => w.id === leg.toId)!
      const f = leg.length > 0 ? Math.min(1, Math.max(0, (d - leg.s0) / leg.length)) : 0
      return { lo: a.altMin + (b.altMin - a.altMin) * f, hi: a.altMax + (b.altMax - a.altMax) * f }
    }
  }
  const w = waypoints[waypoints.length - 1]
  return { lo: w.altMin, hi: w.altMax }
}

export function buildSection(
  waypoints: Waypoint[],
  legs: Leg[],
  volume: FrameVolume,
  terrain: TerrainField,
  _frame: number,
): Section {
  const sample = makeSampler(volume)
  const total = routeLength(legs)
  const cols = SECTION_COLS
  const rows = SECTION_ROWS
  const altMax = 7200

  const density = new Float32Array(cols * rows)
  const visibility = new Float32Array(cols * rows)
  const terrainRow = new Float32Array(cols)
  const msaRow = new Float32Array(cols)
  const cloudBaseRow = new Float32Array(cols)
  const bandBottom = new Float32Array(cols)
  const bandTop = new Float32Array(cols)

  const dS = total / (cols - 1)
  const dH = altMax / (rows - 1)

  for (let c = 0; c < cols; c++) {
    const s = c * dS
    const p = pointAtDistance(waypoints, legs, s)
    const g = terrain.heightAt(p.x, p.z)
    terrainRow[c] = g
    msaRow[c] = terrain.msaAt(p.x, p.z)
    const band = bandAt(waypoints, legs, s)
    bandBottom[c] = band.lo
    bandTop[c] = band.hi
    // Cloud base from the packed column grid (nearest column, bilinear in the lateral axes
    // is skipped because the section samples exactly along the route).
    cloudBaseRow[c] = sampleCloudBase(volume, p.x, p.z)
    for (let r = 0; r < rows; r++) {
      const h = r * dH
      const i = c + cols * r
      if (h < g) {
        density[i] = -1
        visibility[i] = 0
        continue
      }
      const v = sample(p.x, h, p.z)
      density[i] = v.density
      visibility[i] = visibilityFrom(v.density, v.precip)
    }
  }

  // Per-leg summary in the altitude band.
  const legSpans: SectionLegSpan[] = legs.map((leg) => {
    let minVis = Infinity
    let maxDen = 0
    let samples = 0
    let conflict = 0
    let caution = 0
    const c0 = Math.floor((leg.s0 / Math.max(1e-6, total)) * (cols - 1))
    const c1 = Math.min(cols - 1, Math.ceil((leg.s1 / Math.max(1e-6, total)) * (cols - 1)))
    for (let c = c0; c <= c1; c++) {
      const lo = bandBottom[c]
      const hi = bandTop[c]
      const r0 = Math.max(0, Math.floor(lo / dH))
      const r1 = Math.min(rows - 1, Math.ceil(hi / dH))
      for (let r = r0; r <= r1; r++) {
        const i = c + cols * r
        const vis = visibility[i]
        if (density[i] < 0) continue
        samples++
        if (vis < minVis) minVis = vis
        if (density[i] > maxDen) maxDen = density[i]
        if (vis < 2400) conflict++
        else if (vis < 5000) caution++
      }
    }
    const status: SectionLegSpan['status'] =
      samples === 0 ? 'clear' : conflict / samples > 0.02 ? 'conflict' : caution / samples > 0.03 ? 'caution' : 'clear'
    return {
      index: leg.index,
      label: leg.label,
      s0: leg.s0,
      s1: leg.s1,
      status,
      minVisibility: Number.isFinite(minVis) ? minVis : 26000,
      maxDensity: maxDen,
    }
  })

  let minVis = Infinity
  let sumVis = 0
  let visCount = 0
  let maxDen = 0
  for (let i = 0; i < density.length; i++) {
    if (density[i] < 0) continue
    const vis = visibility[i]
    if (vis < minVis) minVis = vis
    sumVis += vis
    visCount++
    if (density[i] > maxDen) maxDen = density[i]
  }

  return {
    cols,
    rows,
    sMax: total,
    altMax,
    density,
    visibility,
    terrain: terrainRow,
    msa: msaRow,
    cloudBase: cloudBaseRow,
    bandBottom,
    bandTop,
    colStep: dS,
    rowStep: dH,
    legSpans,
    stats: {
      minVisibility: Number.isFinite(minVis) ? minVis : 26000,
      meanVisibility: visCount ? sumVis / visCount : 26000,
      maxDensity: maxDen,
      conflictLegs: legSpans.filter((l) => l.status === 'conflict').length,
      cautionLegs: legSpans.filter((l) => l.status === 'caution').length,
    },
  }
}

function sampleCloudBase(volume: FrameVolume, x: number, z: number): number {
  const { nx, nz } = GRID
  const fx = Math.min(nx - 1, Math.max(0, ((x + DOMAIN.halfX) / (DOMAIN.halfX * 2)) * (nx - 1)))
  const fz = Math.min(nz - 1, Math.max(0, ((z + DOMAIN.halfZ) / (DOMAIN.halfZ * 2)) * (nz - 1)))
  const x0 = Math.floor(fx)
  const z0 = Math.floor(fz)
  const tx = fx - x0
  const tz = fz - z0
  const x1 = Math.min(nx - 1, x0 + 1)
  const z1 = Math.min(nz - 1, z0 + 1)
  const cb = volume.cloudBase
  const a = cb[z0 * nx + x0]
  const b = cb[z0 * nx + x1]
  const c = cb[z1 * nx + x0]
  const d = cb[z1 * nx + x1]
  const vals = [a, b, c, d].filter((v) => !Number.isNaN(v))
  if (vals.length === 0) return NaN
  // Weighted mean honouring validity.
  let wsum = 0
  let sum = 0
  const w = [
    (1 - tx) * (1 - tz),
    tx * (1 - tz),
    (1 - tx) * tz,
    tx * tz,
  ]
  const src = [a, b, c, d]
  for (let i = 0; i < 4; i++) {
    if (Number.isNaN(src[i])) continue
    wsum += w[i]
    sum += src[i] * w[i]
  }
  return wsum > 0 ? sum / wsum : NaN
}

/** Sample points along every leg inside the altitude band, for file export. */
export function collectSamples(
  waypoints: Waypoint[],
  legs: Leg[],
  volume: FrameVolume,
  terrain: TerrainField,
  frame: number,
): SectionSamplePoint[] {
  const sample = makeSampler(volume)
  const total = routeLength(legs)
  const out: SectionSamplePoint[] = []
  const levels = 5
  for (const leg of legs) {
    const n = Math.max(2, Math.round(leg.length / EXPORT_STEP_M))
    for (let k = 0; k <= n; k++) {
      const s = leg.s0 + (leg.length * k) / n
      const p = pointAtDistance(waypoints, legs, s)
      const band = bandAt(waypoints, legs, s)
      const { lon, lat } = lonLatAt(p.x, p.z)
      for (let li = 0; li < levels; li++) {
        const h = band.lo + ((band.hi - band.lo) * li) / (levels - 1)
        const v = sample(p.x, h, p.z)
        out.push({
          legIndex: leg.index,
          legLabel: leg.label,
          distance: Number(s.toFixed(1)),
          lon: Number(lon.toFixed(6)),
          lat: Number(lat.toFixed(6)),
          altitude: Number(h.toFixed(1)),
          density: Number(v.density.toFixed(4)),
          precip: Number(v.precip.toFixed(4)),
          visibility: Math.round(visibilityFrom(v.density, v.precip)),
          cloudBase: Math.round(sampleCloudBase(volume, p.x, p.z)) || -1,
          msa: Math.round(terrain.msaAt(p.x, p.z)),
          inBand: true,
        })
      }
    }
  }
  return out
}
