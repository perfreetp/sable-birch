import * as THREE from 'three'
import type { TerrainGrid } from './terrain'

export interface ContourLevel {
  level: number
  /** 线段列表,每 4 个数为一条: x1, y1, x2, y2 */
  segments: number[]
}

/**  marching squares 提取等高线 */
export function extractContours(g: TerrainGrid, interval: number): ContourLevel[] {
  const { nx, ny, heights, originX, originY, res, minH, maxH } = g
  const out: ContourLevel[] = []
  const start = Math.ceil(minH / interval - 1e-9) * interval
  let count = 0
  for (let L = start; L <= maxH + 1e-9 && count < 1000; L += interval, count++) {
    const segs: number[] = []
    for (let j = 0; j < ny - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const h0 = heights[j * nx + i] - L
        const h1 = heights[j * nx + i + 1] - L
        const h2 = heights[(j + 1) * nx + i + 1] - L
        const h3 = heights[(j + 1) * nx + i] - L
        const x0 = originX + i * res, x1 = x0 + res
        const y0 = originY + j * res, y1 = y0 + res
        const pts: number[] = []
        const cross = (ha: number, hb: number, ax: number, ay: number, bx: number, by: number) => {
          if ((ha < 0) === (hb < 0)) return
          const t = ha / (ha - hb)
          pts.push(ax + (bx - ax) * t, ay + (by - ay) * t)
        }
        cross(h0, h1, x0, y0, x1, y0) // 底边
        cross(h1, h2, x1, y0, x1, y1) // 右边
        cross(h2, h3, x1, y1, x0, y1) // 顶边
        cross(h3, h0, x0, y1, x0, y0) // 左边
        if (pts.length === 4) {
          segs.push(pts[0], pts[1], pts[2], pts[3])
        } else if (pts.length === 8) {
          // 鞍部:按中心值决定连接方式
          const c = (h0 + h1 + h2 + h3) / 4
          if (c >= 0) {
            segs.push(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5], pts[6], pts[7])
          } else {
            segs.push(pts[2], pts[3], pts[4], pts[5], pts[6], pts[7], pts[0], pts[1])
          }
        }
      }
    }
    if (segs.length > 0) out.push({ level: L, segments: segs })
  }
  return out
}

/** 生成文字精灵(用于高程标注) */
export function makeTextSprite(
  text: string,
  worldH: number,
  fg = '#ffe9a8',
  bg = 'rgba(15, 18, 22, 0.72)',
): THREE.Sprite {
  const font = 30
  const pad = 10
  const canvas = document.createElement('canvas')
  const ctx0 = canvas.getContext('2d')!
  ctx0.font = `bold ${font}px 'Segoe UI', 'Microsoft YaHei', sans-serif`
  const lines = text.split('\n')
  const tw = Math.max(...lines.map(l => ctx0.measureText(l).width))
  canvas.width = Math.ceil(tw + pad * 2)
  canvas.height = font * lines.length + pad * 2
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = bg
  const r = 8
  ctx.beginPath()
  ctx.roundRect(0, 0, canvas.width, canvas.height, r)
  ctx.fill()
  ctx.font = `bold ${font}px 'Segoe UI', 'Microsoft YaHei', sans-serif`
  ctx.fillStyle = fg
  ctx.textBaseline = 'top'
  lines.forEach((l, i) => ctx.fillText(l, pad, pad + i * font))
  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 4
  const mat = new THREE.SpriteMaterial({ map: tex, depthWrite: false, transparent: true })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set((worldH * canvas.width) / canvas.height, worldH, 1)
  return sprite
}
