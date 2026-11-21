import { VISIBILITY_BANDS } from './types.ts'
import type { Section } from './types.ts'

export interface SectionDrawOptions {
  /** Curtain mode omits axes and titles (used as a 3D texture). */
  mode: 'chart' | 'curtain'
  showVisibility: boolean
  showMsa: boolean
  showBand: boolean
  showGrid: boolean
  showCloudBase: boolean
  width: number
  height: number
  dpr: number
  hover?: { s: number; alt: number } | null
}

const FONT = '"Segoe UI Variable", "Segoe UI", "Microsoft YaHei", system-ui, sans-serif'
const MONO = '"Cascadia Mono", "SF Mono", Consolas, monospace'

function visColor(v: number): [number, number, number] {
  const stops: Array<[number, [number, number, number]]> = [
    [600, [255, 74, 74]],
    [1500, [255, 128, 56]],
    [3000, [255, 190, 66]],
    [5000, [255, 219, 88]],
    [10000, [150, 224, 104]],
    [20000, [78, 214, 168]],
    [26000, [86, 200, 210]],
  ]
  if (v <= stops[0][0]) return stops[0][1]
  for (let i = 1; i < stops.length; i++) {
    if (v <= stops[i][0]) {
      const [v0, c0] = stops[i - 1]
      const [v1, c1] = stops[i]
      const t = (v - v0) / (v1 - v0)
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * t),
        Math.round(c0[1] + (c1[1] - c0[1]) * t),
        Math.round(c0[2] + (c1[2] - c0[2]) * t),
      ]
    }
  }
  return stops[stops.length - 1][1]
}

/** Value used by the legend swatches. */
export function visibilitySwatch(v: number): string {
  const [r, g, b] = visColor(v)
  return `rgb(${r} ${g} ${b})`
}

export function visibilityStops(): Array<{ v: number; color: string; label: string }> {
  return [600, 1200, 2400, 4000, 7000, 12000, 22000].map((v) => ({
    v,
    color: visibilitySwatch(v),
    label: v >= 1000 ? `${(v / 1000).toFixed(1)} km` : `${v} m`,
  }))
}

export function drawSection(canvas: HTMLCanvasElement, sec: Section, opt: SectionDrawOptions): void {
  const { width, height, dpr } = opt
  canvas.width = Math.max(1, Math.floor(width * dpr))
  canvas.height = Math.max(1, Math.floor(height * dpr))
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)

  const isChart = opt.mode === 'chart'
  const padL = isChart ? 58 : 0
  const padR = isChart ? 20 : 0
  const padT = isChart ? 34 : 0
  const padB = isChart ? 34 : 0
  const plotW = Math.max(1, width - padL - padR)
  const plotH = Math.max(1, height - padT - padB)

  // The chart carries its own dark ground; the 3D curtain must stay transparent
  // so the scene behind it shows through clear air.
  if (isChart) {
    const bg = ctx.createLinearGradient(0, padT, 0, padT + plotH)
    bg.addColorStop(0, '#0a1a2a')
    bg.addColorStop(0.65, '#0a1420')
    bg.addColorStop(1, '#070e17')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)
  }

  const xOf = (s: number) => padL + (s / Math.max(1e-6, sec.sMax)) * plotW
  const yOf = (alt: number) => padT + plotH - (alt / sec.altMax) * plotH
  const colW = plotW / sec.cols
  const rowH = plotH / sec.rows

  // ---- Field raster: visibility colour modulated by local density ----
  const img = ctx.createImageData(sec.cols, sec.rows)
  for (let r = 0; r < sec.rows; r++) {
    for (let c = 0; c < sec.cols; c++) {
      const i = c + sec.cols * r
      // Source rows are bottom-up; ImageData rows are top-down.
      const o = ((sec.rows - 1 - r) * sec.cols + c) * 4
      const d = sec.density[i]
      if (d < 0) {
        img.data[o + 3] = 0
        continue
      }
      // Clear air stays transparent; cloud body ramps in quickly then saturates.
      // The 3D curtain gets a higher cut so thin haze does not veil the scene.
      const floor = isChart ? 0.02 : 0.055
      const body = Math.min(1, Math.pow(Math.max(0, d - floor) / 0.5, 0.8))
      if (body < 0.004) {
        img.data[o + 3] = 0
        continue
      }
      const vis = sec.visibility[i]
      const [vr, vg, vb] = visColor(vis)
      // Shade by density within the band so internal structure stays legible.
      const shade = 0.62 + 0.5 * Math.min(1, d * 1.5)
      let r0 = vr * shade
      let g0 = vg * shade
      let b0 = vb * shade
      if (!isChart) {
        // The 3D curtain goes through the filmic tone mapper, which flattens
        // saturated hues; pre-boost so the slice matches the chart's ramp.
        const boost = 1.0
        const [br, bg, bb] = [r0, g0, b0]
        const lum2 = 0.299 * br + 0.587 * bg + 0.114 * bb
        r0 = lum2 + (br - lum2) * boost
        g0 = lum2 + (bg - lum2) * boost
        b0 = lum2 + (bb - lum2) * boost
        const bright = 1.0
        r0 *= bright
        g0 *= bright
        b0 *= bright
      }
      if (!opt.showVisibility) {
        // Greyscale reflectivity view: dark air, bright dense cores.
        const lum = 18 + 210 * Math.min(1, Math.pow(d, 1.35) * 1.15)
        r0 = lum * 0.95
        g0 = lum * 0.98
        b0 = lum
      }
      img.data[o] = Math.min(255, r0)
      img.data[o + 1] = Math.min(255, g0)
      img.data[o + 2] = Math.min(255, b0)
      // The slice is a solid curtain standing in the scene: dense cloud cores are
      // fully opaque, only the cloud margin feathers out.
      const alpha = isChart
        ? Math.min(246, 30 + 250 * body)
        : Math.min(252, Math.pow(body, 0.3) * 252)
      img.data[o + 3] = alpha
    }
  }
  const off = document.createElement('canvas')
  off.width = sec.cols
  off.height = sec.rows
  off.getContext('2d')!.putImageData(img, 0, 0)
  ctx.save()
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.globalCompositeOperation = opt.showVisibility && isChart ? 'lighter' : 'source-over'
  ctx.globalAlpha = opt.showVisibility && isChart ? 0.94 : 1
  ctx.drawImage(off, padL, padT, plotW, plotH)
  ctx.restore()

  // ---- Terrain silhouette ----
  if (!isChart) {
    // Curtain: opaque ground only below the terrain line; the sky stays clear.
    ctx.beginPath()
    ctx.moveTo(0, height)
    for (let c = 0; c < sec.cols; c++) ctx.lineTo(c * colW, yOf(sec.terrain[c]))
    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.fillStyle = 'rgba(9, 16, 24, 0.97)'
    ctx.fill()
  } else {
    ctx.beginPath()
    ctx.moveTo(padL, padT + plotH)
    for (let c = 0; c < sec.cols; c++) {
      const s = (c / (sec.cols - 1)) * sec.sMax
      ctx.lineTo(xOf(s), yOf(sec.terrain[c]))
    }
    ctx.lineTo(padL + plotW, padT + plotH)
    ctx.closePath()
    const ground = ctx.createLinearGradient(0, padT + plotH - plotH * 0.22, 0, padT + plotH)
    ground.addColorStop(0, 'rgba(28, 40, 52, 0.96)')
    ground.addColorStop(1, 'rgba(10, 16, 24, 0.99)')
    ctx.fillStyle = ground
    ctx.fill()
  }
  ctx.strokeStyle = 'rgba(126, 168, 196, 0.8)'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  for (let c = 0; c < sec.cols; c++) {
    const s = (c / (sec.cols - 1)) * sec.sMax
    const x = xOf(s)
    const y = yOf(sec.terrain[c])
    if (c === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  // ---- Route altitude band ----
  if (opt.showBand) {
    ctx.beginPath()
    ctx.moveTo(xOf(0), yOf(sec.bandTop[0]))
    for (let c = 1; c < sec.cols; c++) {
      const s = (c / (sec.cols - 1)) * sec.sMax
      ctx.lineTo(xOf(s), yOf(sec.bandTop[c]))
    }
    for (let c = sec.cols - 1; c >= 0; c--) {
      const s = (c / (sec.cols - 1)) * sec.sMax
      ctx.lineTo(xOf(s), yOf(sec.bandBottom[c]))
    }
    ctx.closePath()
    ctx.fillStyle = 'rgba(95, 214, 240, 0.1)'
    ctx.fill()
    ctx.setLineDash([7, 5])
    ctx.strokeStyle = 'rgba(95, 214, 240, 0.85)'
    ctx.lineWidth = 1.4
    ctx.beginPath()
    for (let c = 0; c < sec.cols; c++) {
      const s = (c / (sec.cols - 1)) * sec.sMax
      if (c === 0) ctx.moveTo(xOf(s), yOf(sec.bandTop[c]))
      else ctx.lineTo(xOf(s), yOf(sec.bandTop[c]))
    }
    ctx.stroke()
    ctx.beginPath()
    for (let c = 0; c < sec.cols; c++) {
      const s = (c / (sec.cols - 1)) * sec.sMax
      if (c === 0) ctx.moveTo(xOf(s), yOf(sec.bandBottom[c]))
      else ctx.lineTo(xOf(s), yOf(sec.bandBottom[c]))
    }
    ctx.stroke()
    ctx.setLineDash([])
  }

  // ---- Cloud base ----
  if (opt.showCloudBase) {
    ctx.save()
    ctx.strokeStyle = 'rgba(190, 226, 255, 0.95)'
    ctx.lineWidth = 1.6
    ctx.shadowColor = 'rgba(160, 210, 255, 0.9)'
    ctx.shadowBlur = 7
    let pen = false
    ctx.beginPath()
    for (let c = 0; c < sec.cols; c++) {
      const cb = sec.cloudBase[c]
      const s = (c / (sec.cols - 1)) * sec.sMax
      const col = Math.min(sec.cols - 1, c)
      // A base is meaningful only where the column actually carries cloud.
      let hasCloud = false
      const r0 = Math.max(0, Math.floor((cb - 400) / sec.rowStep))
      const r1 = Math.min(sec.rows - 1, Math.ceil((cb + 200) / sec.rowStep))
      if (!Number.isNaN(cb)) {
        for (let r = r0; r <= r1; r++) {
          if (sec.density[col + sec.cols * r] > 0.1) {
            hasCloud = true
            break
          }
        }
      }
      if (Number.isNaN(cb) || !hasCloud) {
        pen = false
        continue
      }
      if (!pen) {
        ctx.moveTo(xOf(s), yOf(cb))
        pen = true
      } else ctx.lineTo(xOf(s), yOf(cb))
    }
    ctx.stroke()
    ctx.restore()
  }

  // ---- Minimum safe altitude (stepped) ----
  if (opt.showMsa) {
    ctx.save()
    ctx.strokeStyle = 'rgba(255, 176, 74, 0.95)'
    ctx.lineWidth = 1.7
    ctx.setLineDash([10, 5])
    ctx.shadowColor = 'rgba(255, 150, 40, 0.55)'
    ctx.shadowBlur = 6
    ctx.beginPath()
    let prev = sec.msa[0]
    ctx.moveTo(xOf(0), yOf(prev))
    for (let c = 1; c < sec.cols; c++) {
      const x = xOf((c / (sec.cols - 1)) * sec.sMax)
      const v = sec.msa[c]
      if (Math.abs(v - prev) > 0.5) {
        ctx.lineTo(x, yOf(prev))
        ctx.lineTo(x, yOf(v))
        prev = v
      } else {
        ctx.lineTo(x, yOf(v))
      }
    }
    ctx.stroke()
    ctx.restore()
  }

  // ---- Leg dividers ----
  ctx.save()
  for (const leg of sec.legSpans) {
    if (leg.index === 0) continue
    const x = xOf(leg.s0)
    ctx.strokeStyle = 'rgba(150, 180, 210, 0.28)'
    ctx.lineWidth = 1
    ctx.setLineDash([3, 4])
    ctx.beginPath()
    ctx.moveTo(x, padT)
    ctx.lineTo(x, padT + plotH)
    ctx.stroke()
    ctx.setLineDash([])
  }
  ctx.restore()

  // ---- Axes ----
  if (isChart) {
    ctx.save()
    ctx.font = `10px ${MONO}`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(150, 176, 200, 0.85)'
    ctx.strokeStyle = 'rgba(120, 150, 180, 0.16)'
    ctx.lineWidth = 1
    const altTicks = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000]
    for (const a of altTicks) {
      const y = yOf(a)
      ctx.beginPath()
      ctx.moveTo(padL, y)
      ctx.lineTo(padL + plotW, y)
      ctx.stroke()
      ctx.textAlign = 'right'
      ctx.fillText(a === 0 ? '0' : `${(a / 1000).toFixed(0)} km`, padL - 8, y)
      if (a === 0) continue
      ctx.textAlign = 'right'
    }
    ctx.save()
    ctx.translate(13, padT + plotH / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(150, 176, 200, 0.7)'
    ctx.font = `10px ${FONT}`
    ctx.fillText('高度 / ALT (m MSL)', 0, 0)
    ctx.restore()

    const totalKm = sec.sMax / 1000
    const stepKm = totalKm > 20 ? 5 : totalKm > 10 ? 2 : 1
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    for (let km = 0; km <= totalKm + 1e-6; km += stepKm) {
      const x = xOf(km * 1000)
      ctx.strokeStyle = 'rgba(120, 150, 180, 0.28)'
      ctx.beginPath()
      ctx.moveTo(x, padT + plotH)
      ctx.lineTo(x, padT + plotH + 5)
      ctx.stroke()
      ctx.fillStyle = 'rgba(150, 176, 200, 0.85)'
      ctx.fillText(`${km.toFixed(0)}`, x, padT + plotH + 9)
    }
    // Leg labels on the top strip.
    for (const leg of sec.legSpans) {
      const cx = xOf((leg.s0 + leg.s1) / 2)
      const w = xOf(leg.s1) - xOf(leg.s0)
      const statusColor =
        leg.status === 'conflict' ? '#ff7a6b' : leg.status === 'caution' ? '#ffd24a' : '#7fe0c0'
      ctx.fillStyle = 'rgba(11, 22, 34, 0.82)'
      const label = `L${leg.index + 1}`
      ctx.font = `600 10px ${MONO}`
      const tw = ctx.measureText(label).width + 20
      if (w > tw + 8) {
        ctx.beginPath()
        roundRect(ctx, cx - tw / 2, padT - 26, tw, 16, 4)
        ctx.fill()
        ctx.strokeStyle = 'rgba(80, 110, 140, 0.5)'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = statusColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(label, cx, padT - 18)
      }
    }
    // Title.
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.font = `600 11px ${FONT}`
    ctx.fillStyle = 'rgba(196, 216, 236, 0.92)'
    ctx.fillText('垂直剖面 · 距离 × 高度', padL, 10)
    ctx.font = `10px ${MONO}`
    ctx.fillStyle = 'rgba(140, 168, 194, 0.8)'
    ctx.textAlign = 'right'
    const summary = `剖面长度 ${(sec.sMax / 1000).toFixed(2)} km · 最低能见度 ${(sec.stats.minVisibility / 1000).toFixed(2)} km`
    // Drop the summary line rather than overlap the title on narrow charts.
    if (ctx.measureText(summary).width < plotW * 0.55) {
      ctx.fillText(summary, padL + plotW, 11)
    }
    ctx.restore()
  }

  // ---- Inner border ----
  ctx.strokeStyle = 'rgba(120, 160, 194, 0.32)'
  ctx.lineWidth = 1
  ctx.strokeRect(padL + 0.5, padT + 0.5, plotW - 1, plotH - 1)

  // ---- Cursor readout ----
  if (opt.hover && isChart) {
    const { s, alt } = opt.hover
    const x = xOf(s)
    const y = yOf(alt)
    ctx.save()
    ctx.strokeStyle = 'rgba(220, 240, 255, 0.5)'
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(x, padT)
    ctx.lineTo(x, padT + plotH)
    ctx.moveTo(padL, y)
    ctx.lineTo(padL + plotW, y)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#e9f6ff'
    ctx.fill()
    ctx.strokeStyle = 'rgba(10, 20, 30, 0.9)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.restore()
  }

  void colW
  void rowH
  void VISIBILITY_BANDS
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}
