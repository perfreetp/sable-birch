/** Deterministic hash / value-noise utilities shared by the terrain and the weather model. */

export function hash2i(x: number, y: number, seed = 1337): number {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 1442695041)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

export function hash3i(x: number, y: number, z: number, seed = 1337): number {
  let h =
    Math.imul(x, 374761393) ^
    Math.imul(y, 668265263) ^
    Math.imul(z, 2147483647) ^
    Math.imul(seed, 1442695041)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t)
}

export function valueNoise2(x: number, y: number, seed = 1): number {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = smooth(x - xi)
  const yf = smooth(y - yi)
  const a = hash2i(xi, yi, seed)
  const b = hash2i(xi + 1, yi, seed)
  const c = hash2i(xi, yi + 1, seed)
  const d = hash2i(xi + 1, yi + 1, seed)
  return (a + (b - a) * xf) * (1 - yf) + (c + (d - c) * xf) * yf
}

export function fbm2(x: number, y: number, octaves = 4, seed = 7): number {
  let sum = 0
  let amp = 0.5
  let norm = 0
  let fx = x
  let fy = y
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise2(fx, fy, seed + i * 17)
    norm += amp
    amp *= 0.5
    fx = fx * 2.03 + 11.7
    fy = fy * 2.03 - 5.3
  }
  return sum / norm
}

/**
 * A wrapping 3D detail field sampled with trilinear interpolation.
 * Used as the "cauliflower" modulation inside storm cells.
 */
export class DetailField {
  readonly size: number
  private readonly data: Float32Array
  private readonly mask: number

  constructor(size = 64, seed = 91) {
    this.size = size
    this.mask = size - 1
    const raw = new Float32Array(size * size * size)
    // build from 3 octaves of value noise on a coarser lattice, then wrap-sample
    for (let z = 0; z < size; z++) {
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const n =
            valueNoise2(x * 0.19 + y * 0.11, z * 0.17 - y * 0.07, seed) * 0.55 +
            valueNoise2(x * 0.37 - z * 0.21, y * 0.31 + z * 0.13, seed + 5) * 0.3 +
            valueNoise2(x * 0.71 + z * 0.43, y * 0.67 - x * 0.29, seed + 11) * 0.15
          raw[(z * size + y) * size + x] = n
        }
      }
    }
    // Normalise to -1..1-ish around mean 0.
    let mean = 0
    for (let i = 0; i < raw.length; i++) mean += raw[i]
    mean /= raw.length
    let maxDev = 0.0001
    for (let i = 0; i < raw.length; i++) maxDev = Math.max(maxDev, Math.abs(raw[i] - mean))
    this.data = new Float32Array(raw.length)
    for (let i = 0; i < raw.length; i++) this.data[i] = (raw[i] - mean) / maxDev
  }

  /** Sample with wrapping, returns roughly -1..1. */
  sample(x: number, y: number, z: number): number {
    const n = this.size
    const mask = this.mask
    const fx0 = Math.floor(x)
    const fy0 = Math.floor(y)
    const fz0 = Math.floor(z)
    const tx = smooth(x - fx0)
    const ty = smooth(y - fy0)
    const tz = smooth(z - fz0)
    const x0 = fx0 & mask
    const y0 = fy0 & mask
    const z0 = fz0 & mask
    const x1 = (x0 + 1) & mask
    const y1 = (y0 + 1) & mask
    const z1 = (z0 + 1) & mask
    const d = this.data
    const c000 = d[(z0 * n + y0) * n + x0]
    const c100 = d[(z0 * n + y0) * n + x1]
    const c010 = d[(z0 * n + y1) * n + x0]
    const c110 = d[(z0 * n + y1) * n + x1]
    const c001 = d[(z1 * n + y0) * n + x0]
    const c101 = d[(z1 * n + y0) * n + x1]
    const c011 = d[(z1 * n + y1) * n + x0]
    const c111 = d[(z1 * n + y1) * n + x1]
    const a = (c000 + (c100 - c000) * tx) * (1 - ty) + (c010 + (c110 - c010) * tx) * ty
    const b = (c001 + (c101 - c001) * tx) * (1 - ty) + (c011 + (c111 - c011) * tx) * ty
    return a + (b - a) * tz
  }
}

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}
