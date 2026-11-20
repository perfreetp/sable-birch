<template>
  <div class="profile-box">
    <span class="title">剖面轮廓(水平距离 m / 高程 m)</span>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { state } from '../state'

const canvasRef = ref<HTMLCanvasElement | null>(null)

function draw() {
  const canvas = canvasRef.value
  const profile = state.profile
  if (!canvas || !profile) return
  const box = canvas.parentElement!
  const w = box.clientWidth - 8
  const h = box.clientHeight - 8
  const dpr = Math.min(window.devicePixelRatio, 2)
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, w, h)

  const { d, h: hs, length } = profile
  if (d.length < 2) return
  let hMin = Infinity, hMax = -Infinity
  for (const v of hs) {
    if (v < hMin) hMin = v
    if (v > hMax) hMax = v
  }
  const pad = Math.max(0.2, (hMax - hMin) * 0.1)
  hMin -= pad
  hMax += pad

  const ml = 52, mr = 12, mt = 22, mb = 24
  const pw = w - ml - mr
  const ph = h - mt - mb
  const X = (dv: number) => ml + (dv / length) * pw
  const Y = (hv: number) => mt + (1 - (hv - hMin) / (hMax - hMin)) * ph

  // 网格与刻度
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.fillStyle = '#9aa4b2'
  ctx.font = '11px sans-serif'
  ctx.lineWidth = 1
  const nY = 4
  for (let i = 0; i <= nY; i++) {
    const hv = hMin + ((hMax - hMin) * i) / nY
    const y = Y(hv)
    ctx.beginPath()
    ctx.moveTo(ml, y)
    ctx.lineTo(w - mr, y)
    ctx.stroke()
    ctx.textAlign = 'right'
    ctx.fillText(hv.toFixed(2), ml - 6, y + 4)
  }
  const nX = Math.max(2, Math.floor(pw / 90))
  for (let i = 0; i <= nX; i++) {
    const dv = (length * i) / nX
    const x = X(dv)
    ctx.beginPath()
    ctx.moveTo(x, mt)
    ctx.lineTo(x, h - mb)
    ctx.stroke()
    ctx.textAlign = 'center'
    ctx.fillText(dv.toFixed(1), x, h - mb + 14)
  }

  // 剖面填充与轮廓线
  ctx.beginPath()
  ctx.moveTo(X(d[0]), Y(hs[0]))
  for (let i = 1; i < d.length; i++) ctx.lineTo(X(d[i]), Y(hs[i]))
  ctx.strokeStyle = '#ff7043'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.lineTo(X(d[d.length - 1]), h - mb)
  ctx.lineTo(X(d[0]), h - mb)
  ctx.closePath()
  ctx.fillStyle = 'rgba(255, 112, 67, 0.18)'
  ctx.fill()
}

onMounted(() => {
  draw()
  window.addEventListener('resize', draw)
})

watch(() => state.profile, draw, { deep: true })
</script>
