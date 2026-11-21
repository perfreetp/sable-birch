import * as THREE from 'three'
import { DOMAIN, TerrainField } from '../weather.ts'
import { fbm2 } from '../noise.ts'
import type { BasemapId } from '../types.ts'

const NL = String.fromCharCode(10)

const BASE_COLORS: Record<BasemapId, { low: string; mid: string; high: string; line: string; water: string }> = {
  relief: { low: '#25455c', mid: '#3f5f6e', high: '#9aa9ae', line: 'rgba(150,200,230,0.36)', water: '#12283a' },
  elevation: { low: '#1e4050', mid: '#4d6b58', high: '#b8ab7e', line: 'rgba(245,235,205,0.30)', water: '#173040' },
  contour: { low: '#122430', mid: '#1d3440', high: '#2b4650', line: 'rgba(130,235,210,0.62)', water: '#0c1b26' },
}

export class TerrainMesh {
  readonly group = new THREE.Group()
  readonly mesh: THREE.Mesh
  readonly field: TerrainField
  private geometry: THREE.BufferGeometry
  private material: THREE.MeshStandardMaterial
  private basemap: BasemapId = 'relief'
  private texture: THREE.CanvasTexture | null = null
  private skirtMaterial!: THREE.MeshStandardMaterial

  constructor(field: TerrainField) {
    this.field = field
    const n = field.size
    const geo = new THREE.BufferGeometry()
    const cols = n + 2
    const rows = n + 2
    const positions: number[] = []
    const uvs: number[] = []
    const colors: number[] = []
    const yAt = (i: number, j: number): number => {
      // Border ring sits one cell outside the domain and is pinned low, which
      // gives the tile a skirt instead of a visible cut face.
      if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1) return -40
      return field.heights[(j - 1) * n + (i - 1)]
    }
    const xAt = (i: number): number => {
      if (i === 0) return -DOMAIN.halfX * 3.4
      if (i === cols - 1) return DOMAIN.halfX * 3.4
      return -DOMAIN.halfX + ((i - 1) / (n - 1)) * DOMAIN.halfX * 2
    }
    const zAt = (j: number): number => {
      if (j === 0) return -DOMAIN.halfZ * 3.4
      if (j === rows - 1) return DOMAIN.halfZ * 3.4
      return -DOMAIN.halfZ + ((j - 1) / (n - 1)) * DOMAIN.halfZ * 2
    }
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const isBorder = i === 0 || j === 0 || i === cols - 1 || j === rows - 1
        positions.push(xAt(i), isBorder ? 0 : yAt(i, j), zAt(j))
        const u = Math.min(1, Math.max(0, (i - 1) / (cols - 3)))
        const v = Math.min(1, Math.max(0, (j - 1) / (rows - 3)))
        uvs.push(u, v)
        const border = i === 0 || j === 0 || i === cols - 1 || j === rows - 1
        // Skirt vertices fade into the atmospheric colour instead of ending hard.
        colors.push(border ? 0.06 : 1, border ? 0.09 : 1, border ? 0.12 : 1)
      }
    }
    // Split the mesh into the textured inner tile and the flat skirt ring. The
    // ring cannot use the basemap: its clamped UVs would stretch one texel row
    // into long radial streaks.
    const innerIdx: number[] = []
    const skirtIdx: number[] = []
    for (let j = 0; j < rows - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        const a = j * cols + i
        const b = a + 1
        const c = a + cols
        const d = c + 1
        const isSkirt = i === 0 || j === 0 || i === cols - 2 || j === rows - 2
        const target = isSkirt ? skirtIdx : innerIdx
        target.push(a, c, b, b, c, d)
      }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.setIndex([...innerIdx, ...skirtIdx])
    geo.addGroup(0, innerIdx.length, 0)
    geo.addGroup(innerIdx.length, skirtIdx.length, 1)
    geo.computeVertexNormals()
    this.geometry = geo

    this.material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: false,
      emissive: new THREE.Color(0x0a1622),
      emissiveIntensity: 1.0,
    })
    // Flat, untextured skirt material.
    this.skirtMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1c26,
      roughness: 1,
      metalness: 0,
      vertexColors: true,
    })
    this.mesh = new THREE.Mesh(geo, [this.material, this.skirtMaterial])
    this.mesh.receiveShadow = true
    this.mesh.castShadow = false
    this.mesh.name = 'terrain'
    this.group.add(this.mesh)

    this.applyBasemap('relief')
  }

  heightAt(x: number, z: number): number {
    return this.field.heightAt(x, z)
  }

  get current(): BasemapId {
    return this.basemap
  }

  applyBasemap(id: BasemapId): void {
    this.basemap = id
    const tex = this.buildTexture(id)
    this.texture?.dispose()
    this.texture = tex
    this.material.map = tex
    // Vertex colours only carry lighting-independent tint modulation, so the
    // basemap texture supplies all hue and never gets multiplied into mud.
    const colAttr = this.geometry.getAttribute('color') as THREE.BufferAttribute
    const positions = this.geometry.getAttribute('position') as THREE.BufferAttribute
    for (let v = 0; v < positions.count; v++) {
      const y = positions.getY(v)
      const t = THREE.MathUtils.clamp((y - 60) / 880, 0, 1)
      // Fade the outer margin of the analysed tile so its border is not a ridge.
      const px = Math.abs(positions.getX(v)) / DOMAIN.halfX
      const pz = Math.abs(positions.getZ(v)) / DOMAIN.halfZ
      const edge = Math.max(px, pz)
      const margin = 1 - THREE.MathUtils.smoothstep(edge, 0.80, 1.0)
      const tint = (0.74 + 0.34 * t) * margin
      colAttr.setXYZ(v, tint, tint, tint * 1.02)
    }
    colAttr.needsUpdate = true
    this.material.needsUpdate = true
  }

  private buildTexture(id: BasemapId): THREE.CanvasTexture {
    const size = 1536
    const cvs = document.createElement('canvas')
    cvs.width = size
    cvs.height = size
    const ctx = cvs.getContext('2d')!
    const palette = BASE_COLORS[id]
    const field = this.field
    const n = field.size
    if (id === 'contour') {
      ctx.fillStyle = palette.low
      ctx.fillRect(0, 0, size, size)
      // Draw contour lines every 50 m using marching squares on the heightfield.
      const step = 50
      const levels: number[] = []
      let min = Infinity
      let max = -Infinity
      for (const h of field.heights) {
        if (h < min) min = h
        if (h > max) max = h
      }
      for (let lv = Math.ceil(min / step) * step; lv < max; lv += step) levels.push(lv)
      ctx.lineWidth = 1
      for (const lv of levels) {
        const major = Math.round(lv / step) % 5 === 0
        ctx.strokeStyle = major ? 'rgba(140,235,215,0.62)' : palette.line
        ctx.beginPath()
        for (let j = 0; j < n - 1; j++) {
          for (let i = 0; i < n - 1; i++) {
            const h0 = field.heights[j * n + i]
            const h1 = field.heights[j * n + i + 1]
            const h2 = field.heights[(j + 1) * n + i]
            const h3 = field.heights[(j + 1) * n + i + 1]
            const x0 = (i / (n - 1)) * size
            const y0 = (j / (n - 1)) * size
            const dx = size / (n - 1)
            const pts: Array<[number, number]> = []
            const edges: Array<[number, number, number, number, number, number]> = [
              [x0, y0, x0 + dx, y0, h0, h1],
              [x0 + dx, y0, x0 + dx, y0 + dx, h1, h3],
              [x0, y0 + dx, x0 + dx, y0 + dx, h2, h3],
              [x0, y0, x0, y0 + dx, h0, h2],
            ]
            for (const [ax, ay, bx, by, ha, hb] of edges) {
              if ((ha < lv && hb >= lv) || (hb < lv && ha >= lv)) {
                const t = (lv - ha) / (hb - ha || 1e-6)
                pts.push([ax + (bx - ax) * t, ay + (by - ay) * t])
              }
            }
            if (pts.length >= 2) {
              ctx.moveTo(pts[0][0], pts[0][1])
              ctx.lineTo(pts[1][0], pts[1][1])
            }
          }
        }
        ctx.stroke()
      }
      // Hillshade on top of contours.
      this.hillshade(ctx, size, 0.45)
    } else if (id === 'elevation') {
      const img = ctx.createImageData(size, size)
      const ramp = [
        [26, 62, 84],
        [44, 94, 96],
        [86, 128, 102],
        [158, 152, 112],
        [226, 214, 178],
      ]
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const h = field.heightAt(
            -DOMAIN.halfX + (x / size) * DOMAIN.halfX * 2,
            -DOMAIN.halfZ + (y / size) * DOMAIN.halfZ * 2,
          )
          const t = THREE.MathUtils.clamp((h - 30) / 900, 0, 1) * (ramp.length - 1)
          const i0 = Math.floor(t)
          const i1 = Math.min(ramp.length - 1, i0 + 1)
          const f = t - i0
          const o = (y * size + x) * 4
          img.data[o] = ramp[i0][0] + (ramp[i1][0] - ramp[i0][0]) * f
          img.data[o + 1] = ramp[i0][1] + (ramp[i1][1] - ramp[i0][1]) * f
          img.data[o + 2] = ramp[i0][2] + (ramp[i1][2] - ramp[i0][2]) * f
          img.data[o + 3] = 255
        }
      }
      ctx.putImageData(img, 0, 0)
      this.hillshade(ctx, size, 0.62)
    } else {
      const img = ctx.createImageData(size, size)
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const h = field.heightAt(
            -DOMAIN.halfX + (x / size) * DOMAIN.halfX * 2,
            -DOMAIN.halfZ + (y / size) * DOMAIN.halfZ * 2,
          )
          const t = THREE.MathUtils.clamp((h - 30) / 900, 0, 1)
          const o = (y * size + x) * 4
          const band = Math.floor(t * 6) / 6
          img.data[o] = 30 + band * 116
          img.data[o + 1] = 52 + band * 122
          img.data[o + 2] = 68 + band * 116
          img.data[o + 3] = 255
        }
      }
      ctx.putImageData(img, 0, 0)
      this.hillshade(ctx, size, 0.85)
    }
    const tex = new THREE.CanvasTexture(cvs)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = THREE.ClampToEdgeWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    tex.anisotropy = 8
    tex.needsUpdate = true
    return tex
  }

  private hillshade(ctx: CanvasRenderingContext2D, size: number, strength: number): void {
    const field = this.field
    const img = ctx.getImageData(0, 0, size, size)
    const lx = -0.55
    const ly = 0.62
    const lz = 0.56
    const cell = (DOMAIN.halfX * 2) / size
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const wx = -DOMAIN.halfX + (x / size) * DOMAIN.halfX * 2
        const wz = -DOMAIN.halfZ + (y / size) * DOMAIN.halfZ * 2
        // Two shading scales: broad massing plus fine relief.
        const lambert = (scale: number) => {
          const d = cell * scale
          const nx = (field.heightAt(wx - d, wz) - field.heightAt(wx + d, wz)) / (2 * d)
          const nz = (field.heightAt(wx, wz - d) - field.heightAt(wx, wz + d)) / (2 * d)
          const inv = 1 / Math.hypot(nx, 1, nz)
          return Math.max(0, nx * inv * lx + inv * ly + nz * inv * lz)
        }
        const lam = lambert(6) * 0.55 + lambert(1.6) * 0.45
        const shade = 0.18 + 1.9 * lam
        // Fine rock/vegetation grain so the surface is not a smooth gradient.
        const grain =
          fbm2(wx / 260, wz / 260, 3, 5) * 0.55 + fbm2(wx / 70, wz / 70, 2, 19) * 0.45
        const det = 1.0 + (grain - 0.5) * 1.15
        const o = (y * size + x) * 4
        const m = 1 + (shade - 1) * strength
        // Add warm light on sun-facing slopes instead of only darkening.
        const warm = Math.max(0, shade - 1) * strength * 0.55
        img.data[o] = Math.min(255, img.data[o] * m * det + warm * 70)
        img.data[o + 1] = Math.min(255, img.data[o + 1] * m * det + warm * 62)
        img.data[o + 2] = Math.min(255, img.data[o + 2] * m * det + warm * 44)
      }
    }
    ctx.putImageData(img, 0, 0)
  }

  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
    this.skirtMaterial.dispose()
    this.texture?.dispose()
  }
}
