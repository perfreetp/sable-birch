import { DetailField, clamp, fbm2, smoothstep, valueNoise2 } from './noise.ts'
import type { FrameVolume } from './types.ts'

/**
 * Synthetic weather domain covering a 12.8 km square of low-altitude airspace.
 * All heights are metres above mean sea level (MSL); x is east, z is north.
 */
export const DOMAIN = {
  halfX: 6400,
  halfZ: 6400,
  top: 7200,
  originLat: 31.2304,
  originLon: 121.4737,
} as const

export const GRID = {
  nx: 96,
  ny: 48,
  nz: 96,
  cx: 6,
  cy: 3,
  cz: 6,
  chunk: 16,
  frames: 24,
  frameStepMinutes: 4,
} as const

export const CHUNKS_PER_FRAME = GRID.cx * GRID.cy * GRID.cz // 108
export const VOXELS_PER_CHUNK = GRID.chunk ** 3 // 4096
export const BYTES_PER_CHUNK = VOXELS_PER_CHUNK * 4 // 16 KiB
/** Raw RGBA8 footprint of one frame. */
export const FRAME_BYTES = CHUNKS_PER_FRAME * BYTES_PER_CHUNK
export function chunkIndex(cx: number, cy: number, cz: number): number {
  return (cz * GRID.cy + cy) * GRID.cx + cx
}

export const TERRAIN_SEED = 20261121

export class TerrainField {
  readonly size: number
  readonly half: number
  readonly heights: Float32Array

  constructor(size = 385) {
    this.size = size
    this.half = DOMAIN.halfX
    this.heights = new Float32Array(size * size)
    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const x = -this.half + (i / (size - 1)) * this.half * 2
        const z = -this.half + (j / (size - 1)) * this.half * 2
        let h = terrainHeight(x, z)
        // Blend the analysed terrain down to the surrounding plain at the domain
        // edge so the tile does not read as a floating plateau.
        const edge = Math.min(
          1 - Math.abs(x) / DOMAIN.halfX,
          1 - Math.abs(z) / DOMAIN.halfZ,
        )
        // Very wide skirt so the tile slopes gently into the surrounding plain.
        const blend = smoothstep(0.0, 0.34, edge)
        h = h * blend + 4 * (1 - blend)
        this.heights[j * size + i] = h
      }
    }
  }

  heightAt(x: number, z: number): number {
    const n = this.size - 1
    const fx = clamp(((x + this.half) / (this.half * 2)) * n, 0, n - 1e-6)
    const fz = clamp(((z + this.half) / (this.half * 2)) * n, 0, n - 1e-6)
    const i = Math.floor(fx)
    const j = Math.floor(fz)
    const tx = fx - i
    const tz = fz - j
    const h = this.heights
    const a = h[j * this.size + i]
    const b = h[j * this.size + i + 1]
    const c = h[(j + 1) * this.size + i]
    const d = h[(j + 1) * this.size + i + 1]
    return (a + (b - a) * tx) * (1 - tz) + (c + (d - c) * tx) * tz
  }

  /** Minimum safe altitude for the column: terrain + 300 m, rounded up to 50 m. */
  msaAt(x: number, z: number): number {
    return Math.ceil((this.heightAt(x, z) + 300) / 50) * 50
  }
}

function terrainHeight(x: number, z: number): number {
  const u = x / DOMAIN.halfX
  const v = z / DOMAIN.halfZ
  const broad = fbm2(u * 1.9 + 3.1, v * 1.9 - 1.7, 4, 21)
  const ridgeN = fbm2(u * 3.3 - 2.2, v * 3.3 + 4.1, 3, 9)
  const ridge = 1 - Math.abs(ridgeN * 2 - 1)
  // A broad valley cut for the low-altitude corridor.
  const valley = Math.exp(-Math.pow(v - 0.5 * u - 0.15, 2) / 0.05)
  // Mid- and high-frequency relief: spurs, gullies and foothills.
  const mid = fbm2(u * 9.5 - 6.3, v * 9.5 + 2.8, 3, 61) - 0.5
  const fine = fbm2(u * 26 + 1.4, v * 26 - 8.2, 2, 83) - 0.5
  const h =
    120 +
    Math.pow(broad, 1.6) * 760 +
    ridge * ridge * 230 -
    valley * 260 +
    mid * (60 + broad * 150) +
    fine * (8 + broad * 26)
  return Math.max(30, h)
}

interface StormCell {
  x0: number
  z0: number
  dx: number
  dz: number
  rx: number
  rz: number
  base: number
  top: number
  strength: number
  shear: number
  phase: number
}

const CELLS: StormCell[] = [
  { x0: -3000, z0: 2750, dx: 3000, dz: -700, rx: 2000, rz: 1700, base: 1120, top: 6350, strength: 1.0, shear: 0.26, phase: 0.2 },
  { x0: -1200, z0: 1500, dx: 2400, dz: 700, rx: 1450, rz: 1250, base: 1260, top: 5750, strength: 0.82, shear: 0.3, phase: 1.9 },
  { x0: 900, z0: 500, dx: 2100, dz: -900, rx: 2150, rz: 1800, base: 1030, top: 6750, strength: 1.0, shear: 0.22, phase: 3.4 },
  { x0: 3100, z0: -1500, dx: 1500, dz: -1500, rx: 1750, rz: 1500, base: 1330, top: 5550, strength: 0.9, shear: 0.34, phase: 4.7 },
  { x0: -4650, z0: -1250, dx: 2600, dz: 900, rx: 1250, rz: 1100, base: 1480, top: 5050, strength: 0.66, shear: 0.24, phase: 5.3 },
  { x0: 4450, z0: 2500, dx: 1200, dz: -1600, rx: 1550, rz: 1400, base: 1190, top: 6050, strength: 0.78, shear: 0.28, phase: 2.6 },
]

const detail = new DetailField(64, 91)

interface CellState {
  cx: number
  cz: number
  rx: number
  rz: number
  base: number
  top: number
  strength: number
  shear: number
  phase: number
}

function cellState(cell: StormCell, t: number): CellState {
  // Cells advect with the mean flow and breathe slightly as they develop.
  const growth = 0.82 + 0.26 * Math.sin(Math.PI * clamp(t * 1.15 - 0.05, 0, 1)) + 0.08 * Math.sin(t * 9 + cell.phase)
  return {
    cx: cell.x0 + cell.dx * t + Math.sin(t * 5.4 + cell.phase) * 95,
    cz: cell.z0 + cell.dz * t + Math.cos(t * 4.1 + cell.phase * 1.7) * 85,
    rx: cell.rx * (0.9 + 0.16 * Math.sin(t * 3.1 + cell.phase)),
    rz: cell.rz * (0.9 + 0.14 * Math.cos(t * 2.7 + cell.phase)),
    base: cell.base + 60 * Math.sin(t * 2.2 + cell.phase),
    top: cell.top + 220 * Math.sin(t * 1.7 + cell.phase * 0.6),
    strength: cell.strength * growth,
    shear: cell.shear,
    phase: cell.phase,
  }
}

/**
 * Convective density in [0,1] for one storm cell.
 *
 * The shape term is a smooth "presence" field; a strongly noise-perturbed
 * threshold turns it into crisp, cauliflower-edged cloud rather than haze.
 * Trihedral volume fraction near the top drives the ice/anvil band.
 */
function cellDensity(x: number, h: number, z: number, c: CellState, t: number): number {
  const span = c.top - c.base
  const hr = (h - c.base) / span
  if (hr < 0) {
    const below = (c.base - h) / Math.max(1, c.base)
    if (below > 0.34) return 0
    const ex = (x - c.cx) / (c.rx * 0.44)
    const ez = (z - c.cz) / (c.rz * 0.44)
    const radial = Math.exp(-(ex * ex + ez * ez) * 3.1)
    const fade = Math.exp(-below * 3.4)
    const streak = 0.6 + 0.7 * detail.sample(x / 220 + t * 10, h / 130 - t * 7, z / 220)
    const shape = radial * fade * streak
    return shape > 0.45 ? Math.min(0.55, (shape - 0.45) * 1.9) * c.strength : 0
  }
  if (hr > 1) return 0

  // Tower narrows upward, then flares into a broad thin anvil near the top.
  const anvil = smoothstep(0.66, 0.88, hr)
  const anvilTop = 1 - smoothstep(0.9, 1.0, hr)
  // Tower radius pulses with height so the silhouette is lumpy, not a column.
  const pulse = 1 + 0.22 * Math.sin(hr * 9.5 + c.phase) + 0.12 * Math.sin(hr * 21 - c.phase * 2)
  const towerR = 0.62 + 0.38 * (1 - hr * 0.55) * pulse
  const spread = towerR * (1 + 4.6 * anvil)
  const leanX = (h - c.base) * c.shear
  const twist = hr * 1.9 + t * 4.4
  const cosT = Math.cos(twist)
  const sinT = Math.sin(twist)
  const dx0 = x - (c.cx + leanX)
  const dz0 = z - c.cz
  const ex = (dx0 * cosT - dz0 * sinT) / (c.rx * spread * 0.8)
  const ez = (dx0 * sinT + dz0 * cosT) / (c.rz * spread * 0.8)
  const q = ex * ex + ez * ez
  if (q > 3.4) return 0

  // Presence field, with a fat pedestal at the base and a tapering updraft.
  const flare = 1 + 0.34 * Math.exp(-Math.pow((hr - 0.04) / 0.13, 2))
  const presence = Math.exp(-q * 1.5) * flare * (0.78 + 0.32 * Math.exp(-q * 4.0))
  const big = detail.sample(x / 700 + t * 3.1, h / 330 + t * 1.4, z / 700 - t * 2.6)
  const mid = detail.sample(x / 240 - t * 4.6, h / 170 + t * 2.7, z / 240 + t * 3.8)
  const fine = detail.sample(x / 95 + t * 8.2, h / 80 - t * 4.0, z / 95 - t * 6.4)
  const noise = big * 0.5 + mid * 0.34 + fine * 0.16
  // Radius perturbation: makes the silhouette lumpy rather than rotationally smooth.
  const rN = detail.sample(x / 330 + t * 4.5, h / 420 + t * 1.2, z / 330 - t * 3.7)
  const lobes = detail.sample(x / 95 - t * 7, h / 230 + t * 3.1, z / 95 + t * 6)
  const balloon = 1 + 0.30 * rN + 0.14 * lobes

  // Anvil texture: fibrous, striated, much thinner than the tower core.
  const fibre = 0.55 + 0.75 * detail.sample(x / 150 + hr * 26 + t * 2, h / 55, z / 150 - hr * 21)

  const iso = 0.26
  const shaped = presence * balloon + noise * 0.62 - iso
  const margin = smoothstep(-0.06, 0.05, shaped)
  if (margin <= 0.001) return 0

  const core = 1 + 0.45 * Math.exp(-q * 5.0)
  const baseRamp = smoothstep(0.0, 0.05, hr)
  const core01 = clamp(presence * core, 0, 1.5)
  let d = margin * (0.58 + 0.52 * core01) * baseRamp * c.strength
  // Thin out with height inside the tower; the anvil is much wispier.
  d *= 1.02 - 0.3 * smoothstep(0.45, 0.86, hr)
  d *= 1 - anvil * 0.4
  d = d * (1 - anvil * 0.85) + anvil * margin * fibre * 0.60 * c.strength * anvilTop
  // Anvil gets a soft underside so it does not end in a flat plate.
  d *= 1 - 0.5 * smoothstep(0.94, 1.0, hr)
  // Break up the interior so each density shell shows real structure.
  d *= 0.68 + 0.5 * (0.5 + 0.5 * lobes)
  d *= 1 - 0.12 * Math.exp(-q * 6.0)
  return clamp(d, 0, 1)
}

interface CumulusColumn {
  cov: number
  base: number
}

function cumulusColumn(x: number, z: number): CumulusColumn {
  const cov = smoothstep(0.62, 0.84, fbm2(x / 2600 + 11.3, z / 2600 - 4.2, 4, 33))
  if (cov <= 0.001) return { cov: 0, base: 0 }
  const base = 1180 + 360 * valueNoise2(x / 3200 + 3.1, z / 3200 + 8.7, 51)
  return { cov, base }
}

/** Height of the lowest cloud deck over a ground column (NaN when clear). */
export function cloudBaseAt(x: number, z: number, t: number): number {
  let base = Infinity
  const cum = cumulusColumn(x, z)
  if (cum.cov > 0.14) base = cum.base
  for (const cell of CELLS) {
    const c = cellState(cell, t)
    const ex = (x - c.cx) / (c.rx * 1.15)
    const ez = (z - c.cz) / (c.rz * 1.15)
    const q = ex * ex + ez * ez
    if (q > 2.2) continue
    if (Math.exp(-q * 1.85) * c.strength < 0.22) continue
    if (c.base < base) base = c.base
  }
  return Number.isFinite(base) ? base : NaN
}

const cumulusCache = new Map<string, CumulusColumn>()
function cumulusAt(ix: number, iz: number, x: number, z: number): CumulusColumn {
  // Columns repeat across frames, so cache per (x,z).
  const key = `${ix},${iz}`
  let c = cumulusCache.get(key)
  if (!c) {
    c = cumulusColumn(x, z)
    cumulusCache.set(key, c)
  }
  return c
}

export interface BakeStats {
  maxDensity: number
  cloudCover: number
  minCloudBase: number
}

/** Bake a single frame into 32 RGBA8 chunks (16^3 voxels each). */
export function bakeFrame(frame: number): { volume: FrameVolume; stats: BakeStats } {
  const { nx, ny, nz, chunk, cx, cy, cz } = GRID
  const t = frame / (GRID.frames - 1)
  const dens = new Float32Array(nx * ny * nz)
  const prec = new Float32Array(nx * ny * nz)
  const ice = new Float32Array(nx * ny * nz)
  const dx = (DOMAIN.halfX * 2) / nx
  const dy = DOMAIN.top / ny
  const dz = (DOMAIN.halfZ * 2) / nz

  // Scattered boundary-layer cumulus.
  for (let gz = 0; gz < nz; gz++) {
    const z = -DOMAIN.halfZ + (gz + 0.5) * dz
    for (let gx = 0; gx < nx; gx++) {
      const x = -DOMAIN.halfX + (gx + 0.5) * dx
      const c = cumulusAt(gx, gz, x, z)
      if (c.cov <= 0.002) continue
      const thickness = 760
      const gy0 = Math.max(0, Math.floor(c.base / dy))
      const gy1 = Math.min(ny - 1, Math.ceil((c.base + thickness) / dy))
      for (let gy = gy0; gy <= gy1; gy++) {
        const h = (gy + 0.5) * dy
        const u = (h - c.base) / thickness
        if (u < 0 || u > 1) continue
        const profile =
          smoothstep(0, 0.06, u) * (1 - smoothstep(0.62, 1, u)) * (1 - 0.3 * u)
        const d = c.cov * profile * 0.5
        const i = gx + nx * (gy + ny * gz)
        if (d > dens[i]) dens[i] = d
      }
    }
  }

  // Convective cells.
  for (const cell of CELLS) {
    const c = cellState(cell, t)
    const reach = Math.max(c.rx, c.rz) * 2.6
    const y0 = 0
    const y1 = c.top
    const gx0 = Math.max(0, Math.floor((c.cx - reach + DOMAIN.halfX) / dx))
    const gx1 = Math.min(nx - 1, Math.ceil((c.cx + reach + DOMAIN.halfX) / dx))
    const gz0 = Math.max(0, Math.floor((c.cz - reach + DOMAIN.halfZ) / dz))
    const gz1 = Math.min(nz - 1, Math.ceil((c.cz + reach + DOMAIN.halfZ) / dz))
    const gy0 = 0
    const gy1 = Math.min(ny - 1, Math.ceil(y1 / dy))
    for (let gz = gz0; gz <= gz1; gz++) {
      const z = -DOMAIN.halfZ + (gz + 0.5) * dz
      for (let gx = gx0; gx <= gx1; gx++) {
        const x = -DOMAIN.halfX + (gx + 0.5) * dx
        const dq = ((x - c.cx) / (c.rx * 2.4)) ** 2 + ((z - c.cz) / (c.rz * 2.4)) ** 2
        if (dq > 1) continue
        for (let gy = gy0; gy <= gy1; gy++) {
          const h = (gy + 0.5) * dy
          if (h < y0) continue
          const d = cellDensity(x, h, z, c, t)
          if (d <= 0.002) continue
          const i = gx + nx * (gy + ny * gz)
          if (d > dens[i]) dens[i] = d
          const hr = (h - c.base) / Math.max(1, c.top - c.base)
          const shaft = h < c.base ? d * 1.45 : 0
          const p = Math.max(shaft, hr < 0.75 ? clamp((d - 0.42) * 1.7, 0, 1) : 0)
          if (p > prec[i]) prec[i] = p
          const iv = clamp((d - 0.5) * 2.4, 0, 1) * (hr > 0.2 ? 1 : 0.35)
          if (iv > ice[i]) ice[i] = iv
        }
      }
    }
  }

  // Pack into chunk-major RGBA8 textures.
  const chunks: Uint8Array[] = new Array(cx * cy * cz)
  let maxDensity = 0
  for (let cz0 = 0; cz0 < cz; cz0++) {
    for (let cy0 = 0; cy0 < cy; cy0++) {
      for (let cx0 = 0; cx0 < cx; cx0++) {
        const data = new Uint8Array(VOXELS_PER_CHUNK * 4)
        let o = 0
        for (let lz = 0; lz < chunk; lz++) {
          for (let ly = 0; ly < chunk; ly++) {
            for (let lx = 0; lx < chunk; lx++) {
              const gx = cx0 * chunk + lx
              const gy = cy0 * chunk + ly
              const gz = cz0 * chunk + lz
              const i = gx + nx * (gy + ny * gz)
              const d = dens[i]
              data[o++] = Math.round(clamp(d, 0, 1) * 255)
              data[o++] = Math.round(clamp(prec[i], 0, 1) * 255)
              data[o++] = Math.round(clamp(ice[i], 0, 1) * 255)
              data[o++] = 255
              if (d > maxDensity) maxDensity = d
            }
          }
        }
        chunks[chunkIndex(cx0, cy0, cz0)] = data
      }
    }
  }

  // Cloud base per ground column, taken analytically so that the deck is crisp.
  const cloudBase = new Float32Array(nx * nz)
  let covered = 0
  let minBase = Infinity
  for (let gz = 0; gz < nz; gz++) {
    const z = -DOMAIN.halfZ + (gz + 0.5) * dz
    for (let gx = 0; gx < nx; gx++) {
      const x = -DOMAIN.halfX + (gx + 0.5) * dx
      const base = cloudBaseAt(x, z, t)
      cloudBase[gx + nx * gz] = base
      if (!Number.isNaN(base)) {
        covered++
        if (base < minBase) minBase = base
      }
    }
  }

  return {
    volume: {
      frame,
      chunks,
      cloudBase,
      minutes: frame * GRID.frameStepMinutes,
    },
    stats: {
      maxDensity,
      cloudCover: covered / (nx * nz),
      minCloudBase: Number.isFinite(minBase) ? minBase : NaN,
    },
  }
}

export function frameTimestamp(frame: number): Date {
  const epoch = Date.UTC(2026, 10, 21, 6, 0, 0)
  return new Date(epoch + frame * GRID.frameStepMinutes * 60000)
}

export function lonLatAt(x: number, z: number): { lon: number; lat: number } {
  const lat = DOMAIN.originLat + z / 111320
  const lon = DOMAIN.originLon + x / (111320 * Math.cos((DOMAIN.originLat * Math.PI) / 180))
  return { lon, lat }
}

export interface VolumeSample {
  density: number
  precip: number
  ice: number
}

/** Trilinear sampling of the packed frame data (used by the section analysis). */
export function makeSampler(volume: FrameVolume) {
  const { nx, ny, nz } = GRID
  const d = new Uint8Array(nx * ny * nz)
  const p = new Uint8Array(nx * ny * nz)
  const b = new Uint8Array(nx * ny * nz)
  for (let cz0 = 0; cz0 < GRID.cz; cz0++) {
    for (let cy0 = 0; cy0 < GRID.cy; cy0++) {
      for (let cx0 = 0; cx0 < GRID.cx; cx0++) {
        const chunk = volume.chunks[chunkIndex(cx0, cy0, cz0)]
        let o = 0
        for (let lz = 0; lz < 16; lz++) {
          for (let ly = 0; ly < 16; ly++) {
            for (let lx = 0; lx < 16; lx++) {
              const gx = cx0 * 16 + lx
              const gy = cy0 * 16 + ly
              const gz = cz0 * 16 + lz
              const i = gx + nx * (gy + ny * gz)
              d[i] = chunk[o]
              p[i] = chunk[o + 1]
              b[i] = chunk[o + 2]
              o += 4
            }
          }
        }
      }
    }
  }
  const dx = (DOMAIN.halfX * 2) / nx
  const dy = DOMAIN.top / ny
  const dz = (DOMAIN.halfZ * 2) / nz

  return function sample(x: number, h: number, z: number): VolumeSample {
    const fx = clamp((x + DOMAIN.halfX) / dx - 0.5, 0, nx - 1)
    const fy = clamp(h / dy - 0.5, 0, ny - 1)
    const fz = clamp((z + DOMAIN.halfZ) / dz - 0.5, 0, nz - 1)
    const x0 = Math.floor(fx)
    const y0 = Math.floor(fy)
    const z0 = Math.floor(fz)
    const x1 = Math.min(nx - 1, x0 + 1)
    const y1 = Math.min(ny - 1, y0 + 1)
    const z1 = Math.min(nz - 1, z0 + 1)
    const tx = fx - x0
    const ty = fy - y0
    const tz = fz - z0
    const lerp3 = (arr: Uint8Array) => {
      const c000 = arr[x0 + nx * (y0 + ny * z0)]
      const c100 = arr[x1 + nx * (y0 + ny * z0)]
      const c010 = arr[x0 + nx * (y1 + ny * z0)]
      const c110 = arr[x1 + nx * (y1 + ny * z0)]
      const c001 = arr[x0 + nx * (y0 + ny * z1)]
      const c101 = arr[x1 + nx * (y0 + ny * z1)]
      const c011 = arr[x0 + nx * (y1 + ny * z1)]
      const c111 = arr[x1 + nx * (y1 + ny * z1)]
      const a = (c000 + (c100 - c000) * tx) * (1 - ty) + (c010 + (c110 - c010) * tx) * ty
      const bb = (c001 + (c101 - c001) * tx) * (1 - ty) + (c011 + (c111 - c011) * tx) * ty
      return (a + (bb - a) * tz) / 255
    }
    return { density: lerp3(d), precip: lerp3(p), ice: lerp3(b) }
  }
}

/** Meteorological range (m) from cloud density and precipitation rate. */
export function visibilityFrom(density: number, precip: number): number {
  const v = 27000 * Math.exp(-3.25 * precip - 1.45 * density)
  return clamp(v, 120, 26000)
}

export function skyCondition(coverage: number): string {
  if (coverage > 0.44) return '大范围雷暴'
  if (coverage > 0.24) return '分散雷暴'
  if (coverage > 0.1) return '局地积雨云'
  return '晴空少云'
}
