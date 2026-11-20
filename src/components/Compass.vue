<script setup lang="ts">
/**
 * 罗盘组件:拖动 3 个手柄设定进近方向方位角
 */
import { computed, ref } from 'vue'
import { state, setApproachAzimuth } from '../state'

const SIZE = 220
const C = SIZE / 2
const R = 86 // 手柄轨道半径

const compassRef = ref<HTMLElement | null>(null)
const dragging = ref<number | null>(null)

function handlePos(azimuth: number) {
  const a = (azimuth - 90) * (Math.PI / 180) // 0°=北(上方)
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
}

const ticks = computed(() => {
  const list: { deg: number; x1: number; y1: number; x2: number; y2: number; label: string | null; lx: number; ly: number }[] = []
  for (let deg = 0; deg < 360; deg += 15) {
    const a = (deg - 90) * (Math.PI / 180)
    const major = deg % 90 === 0
    const r1 = major ? R - 14 : R - 8
    list.push({
      deg,
      x1: C + r1 * Math.cos(a), y1: C + r1 * Math.sin(a),
      x2: C + R * Math.cos(a), y2: C + R * Math.sin(a),
      label: major ? ['北', '东', '南', '西'][deg / 90] : null,
      lx: C + (R - 26) * Math.cos(a), ly: C + (R - 26) * Math.sin(a)
    })
  }
  return list
})

function angleFromEvent(e: PointerEvent): number {
  const rect = compassRef.value!.getBoundingClientRect()
  const x = e.clientX - rect.left - C
  const y = e.clientY - rect.top - C
  return ((Math.atan2(y, x) * 180 / Math.PI + 90) % 360 + 360) % 360
}

function onHandleDown(id: number, e: PointerEvent) {
  dragging.value = id
  ;(e.target as Element).setPointerCapture(e.pointerId)
  e.preventDefault()
}
function onMove(e: PointerEvent) {
  if (dragging.value === null) return
  setApproachAzimuth(dragging.value, Math.round(angleFromEvent(e)))
}
function onUp() {
  dragging.value = null
}
</script>

<template>
  <div class="compass" ref="compassRef" @pointermove="onMove" @pointerup="onUp" @pointerleave="onUp">
    <svg :width="SIZE" :height="SIZE" :viewBox="`0 0 ${SIZE} ${SIZE}`">
      <circle :cx="C" :cy="C" :r="R" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" />
      <circle :cx="C" :cy="C" :r="R - 30" fill="none" stroke="rgba(255,255,255,0.1)" stroke-dasharray="2 4" />
      <g v-for="t in ticks" :key="t.deg">
        <line :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" stroke="rgba(255,255,255,0.5)" :stroke-width="t.label ? 2 : 1" />
        <text v-if="t.label" :x="t.lx" :y="t.ly" text-anchor="middle" dominant-baseline="central"
              fill="#dfe6ee" font-size="12" font-weight="600">{{ t.label }}</text>
      </g>
      <!-- 中心:起降场 -->
      <circle :cx="C" :cy="C" r="7" fill="#fff" />
      <text :x="C" :y="C" text-anchor="middle" dominant-baseline="central" font-size="8" fill="#222" font-weight="700">H</text>
      <!-- 进近方向手柄 -->
      <g v-for="ap in state.approaches" :key="ap.id">
        <line :x1="C" :y1="C" :x2="handlePos(ap.azimuth).x" :y2="handlePos(ap.azimuth).y"
              :stroke="ap.color" stroke-width="2" stroke-dasharray="5 4" opacity="0.8" />
        <g :transform="`translate(${handlePos(ap.azimuth).x},${handlePos(ap.azimuth).y})`"
           class="handle" :class="{ active: dragging === ap.id }"
           @pointerdown="onHandleDown(ap.id, $event)">
          <circle r="13" :fill="ap.color" stroke="#fff" stroke-width="2" style="cursor: grab" />
          <text y="1" text-anchor="middle" dominant-baseline="central" font-size="10" fill="#111" font-weight="700">{{ ap.id + 1 }}</text>
        </g>
      </g>
    </svg>
    <div class="az-list">
      <div v-for="ap in state.approaches" :key="ap.id" class="az-row">
        <span class="dot" :style="{ background: ap.color }"></span>
        进近{{ ap.id + 1 }}
        <input type="number" min="0" max="359" :value="Math.round(ap.azimuth)"
               @change="setApproachAzimuth(ap.id, Number(($event.target as HTMLInputElement).value))" />
        °
      </div>
    </div>
  </div>
</template>

<style scoped>
.compass { user-select: none; touch-action: none; }
.handle { cursor: grab; }
.handle.active circle { stroke-width: 3; filter: drop-shadow(0 0 4px #fff); }
.az-list { margin-top: 6px; display: flex; flex-direction: column; gap: 4px; }
.az-row { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #cfd8e3; }
.dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.az-row input {
  width: 56px; background: #1c2430; color: #e8eef5; border: 1px solid #344052;
  border-radius: 4px; padding: 2px 4px; font-size: 12px;
}
</style>
