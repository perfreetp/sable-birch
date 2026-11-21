<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  activeVolume,
  clearInMemoryCache,
  exportCsv,
  exportJson,
  exportSectionPng,
  legs,
  refreshSectionStyles,
  sectionRef,
  state,
  syncSceneOptions,
  terrain,
} from '../store'
import { drawSection, visibilityStops } from '../lib/sectionCanvas'
import { makeSampler, visibilityFrom } from '../lib/weather'
import { VISIBILITY_BANDS } from '../lib/types'

const canvasEl = ref<HTMLCanvasElement | null>(null)
const wrapEl = ref<HTMLDivElement | null>(null)
const hover = ref<{ s: number; alt: number; vis: number; den: number; msa: number; cb: number } | null>(null)
const size = ref({ w: 800, h: 360 })
let ro: ResizeObserver | null = null

const sec = computed(() => sectionRef.value)
const stops = visibilityStops()

const sampleFn = computed(() => {
  const vol = activeVolume.value
  if (!vol) return null
  return makeSampler(vol)
})

function redraw(): void {
  const canvas = canvasEl.value
  const s = sec.value
  if (!canvas || !s) return
  drawSection(canvas, s, {
    mode: 'chart',
    showVisibility: state.sectionOptions.showVisibility,
    showMsa: state.sectionOptions.showMsa,
    showBand: state.sectionOptions.showBand,
    showCloudBase: state.sectionOptions.showCloudBase,
    showGrid: state.sectionOptions.showGrid,
    width: size.value.w,
    height: size.value.h,
    dpr: Math.min(2, window.devicePixelRatio || 1),
    hover: hover.value ? { s: hover.value.s, alt: hover.value.alt } : null,
  })
  void refreshSectionStyles
}

onMounted(() => {
  const wrap = wrapEl.value
  if (!wrap) return
  ro = new ResizeObserver(() => {
    const rect = wrap.getBoundingClientRect()
    size.value = { w: Math.max(320, rect.width), h: Math.max(200, rect.height) }
    redraw()
  })
  ro.observe(wrap)
  const rect = wrap.getBoundingClientRect()
  size.value = { w: Math.max(320, rect.width), h: Math.max(200, rect.height) }
  redraw()
})

onBeforeUnmount(() => {
  ro?.disconnect()
})

watch(
  () => [sectionRef.value, state.sectionOptions.showVisibility, state.sectionOptions.showMsa, state.sectionOptions.showBand, state.sectionOptions.showCloudBase],
  () => redraw(),
)

function onMove(ev: PointerEvent): void {
  const canvas = canvasEl.value
  const s = sec.value
  if (!canvas || !s) return
  const rect = canvas.getBoundingClientRect()
  const padL = 58
  const padR = 20
  const padT = 34
  const padB = 34
  const plotW = rect.width - padL - padR
  const plotH = rect.height - padT - padB
  const fx = (ev.clientX - rect.left - padL) / plotW
  const fy = 1 - (ev.clientY - rect.top - padT) / plotH
  if (fx < 0 || fx > 1 || fy < 0 || fy > 1) {
    hover.value = null
    redraw()
    return
  }
  const dist = fx * s.sMax
  const alt = fy * s.altMax
  const col = Math.min(s.cols - 1, Math.max(0, Math.round(fx * (s.cols - 1))))
  const row = Math.min(s.rows - 1, Math.max(0, Math.round(fy * (s.rows - 1))))
  const i = col + s.cols * row
  const den = s.density[i]
  const vis = s.visibility[i]
  hover.value = {
    s: dist,
    alt,
    vis: den < 0 ? 0 : vis,
    den: Math.max(0, den),
    msa: s.msa[col],
    cb: s.cloudBase[col],
  }
  redraw()
}

function onLeave(): void {
  hover.value = null
  redraw()
}

const bandOf = (vis: number) => {
  for (let i = 0; i < VISIBILITY_BANDS.length; i++) {
    if (vis < VISIBILITY_BANDS[i].max) return VISIBILITY_BANDS[i]
  }
  return VISIBILITY_BANDS[VISIBILITY_BANDS.length - 1]
}

const hoverBand = computed(() => (hover.value ? bandOf(hover.value.vis) : null))

function fmtVis(v: number): string {
  return v >= 1000 ? `${(v / 1000).toFixed(2)} km` : `${Math.round(v)} m`
}

function toggleOption(k: keyof typeof state.sectionOptions): void {
  state.sectionOptions[k] = !state.sectionOptions[k]
  refreshSectionStyles()
  redraw()
}

const legRows = computed(() => {
  const s = sec.value
  if (!s) return []
  return s.legSpans.map((span) => {
    const leg = legs.value[span.index]
    // mean visibility of the leg inside the band for the table.
    let sum = 0
    let n = 0
    const c0 = Math.max(0, Math.floor((span.s0 / Math.max(1e-6, s.sMax)) * (s.cols - 1)))
    const c1 = Math.min(s.cols - 1, Math.ceil((span.s1 / Math.max(1e-6, s.sMax)) * (s.cols - 1)))
    for (let c = c0; c <= c1; c++) {
      for (let r = 0; r < s.rows; r++) {
        const alt = r * s.rowStep
        if (alt < s.bandBottom[c] || alt > s.bandTop[c]) continue
        const d = s.density[c + s.cols * r]
        if (d < 0) continue
        sum += s.visibility[c + s.cols * r]
        n++
      }
    }
    return {
      ...span,
      lengthKm: leg ? leg.length / 1000 : 0,
      meanVis: n ? sum / n : 26000,
    }
  })
})

function exportLeg(legIndex: number): void {
  exportJson()
  void legIndex
}

// Called on demand so the section options apply to the 3D curtain too.
function applyToScene(): void {
  syncSceneOptions()
  redraw()
}

onMounted(() => {
  applyToScene()
})

const sectionSamples = computed(() => {
  const s = sec.value
  if (!s) return 0
  return s.legSpans.length * 0
})
</script>

<template>
  <div class="section-module">
    <aside class="panel left">
      <header class="panel-head">
        <div>
          <h2>剖面分析</h2>
          <p class="sub">VERTICAL SECTION · VISIBILITY</p>
        </div>
        <span class="chip mono">{{ sec?.cols ?? 0 }}×{{ sec?.rows ?? 0 }}</span>
      </header>

      <section v-if="sec" class="kpis">
        <div class="kpi">
          <span class="k">最低能见度</span>
          <span class="v" :style="{ color: bandOf(sec.stats.minVisibility).color }">
            {{ fmtVis(sec.stats.minVisibility) }}
          </span>
        </div>
        <div class="kpi">
          <span class="k">平均能见度</span>
          <span class="v">{{ fmtVis(sec.stats.meanVisibility) }}</span>
        </div>
        <div class="kpi">
          <span class="k">冲突航段</span>
          <span class="v danger">{{ sec.stats.conflictLegs }}</span>
        </div>
        <div class="kpi">
          <span class="k">关注航段</span>
          <span class="v warn">{{ sec.stats.cautionLegs }}</span>
        </div>
      </section>

      <section class="block">
        <h3>叠加图层 <span class="tiny">OVERLAYS</span></h3>
        <div class="toggles">
          <button class="toggle" :class="{ on: state.sectionOptions.showVisibility }" @click="toggleOption('showVisibility')">
            <i /> 能见度色带
          </button>
          <button class="toggle" :class="{ on: state.sectionOptions.showMsa }" @click="toggleOption('showMsa')">
            <i /> 最低安全高度
          </button>
          <button class="toggle" :class="{ on: state.sectionOptions.showBand }" @click="toggleOption('showBand')">
            <i /> 高度带
          </button>
          <button class="toggle" :class="{ on: state.sectionOptions.showCloudBase }" @click="toggleOption('showCloudBase')">
            <i /> 云底高度线
          </button>
        </div>
      </section>

      <section class="block">
        <h3>能见度色带 <span class="tiny">VISIBILITY RAMP</span></h3>
        <div class="ramp">
          <i v-for="s in stops" :key="s.v" :style="{ background: s.color }" />
        </div>
        <div class="ramp-labels mono">
          <span v-for="s in stops" :key="s.v">{{ s.label }}</span>
        </div>
        <div class="bands">
          <span v-for="b in VISIBILITY_BANDS" :key="b.code" class="band">
            <i :style="{ background: b.color }" />{{ b.name }}
            <em>{{ b.code }}</em>
          </span>
        </div>
      </section>

      <section class="block">
        <h3>航路段汇总 <span class="tiny">PER-LEG</span></h3>
        <div class="leg-table">
          <div class="lh"><span>航段</span><span>长度</span><span>最低能见度</span><span>状态</span></div>
          <div v-for="l in legRows" :key="l.index" class="lr">
            <span class="ll">L{{ l.index + 1 }}</span>
            <span class="mono">{{ l.lengthKm.toFixed(2) }} km</span>
            <span class="mono">{{ fmtVis(l.minVisibility) }}</span>
            <span class="st" :class="l.status">{{
              l.status === 'conflict' ? '冲突' : l.status === 'caution' ? '关注' : '畅通'
            }}</span>
          </div>
        </div>
      </section>

      <div class="exports">
        <button @click="exportCsv">导出 CSV</button>
        <button @click="exportJson">导出 JSON</button>
        <button @click="exportSectionPng(canvasEl)">导出剖面图</button>
      </div>
      <p class="export-note">
        导出文件包含逐航段剖面采样点：经纬度、航路距离、高度、体积密度、降水强度、能见度、云底与最低安全高度。
      </p>
    </aside>

    <div class="chart-shell">
      <div ref="wrapEl" class="chart-wrap">
        <canvas
          ref="canvasEl"
          @pointermove="onMove"
          @pointerleave="onLeave"
        />
      </div>
      <div v-if="hover" class="cursor-card">
        <div class="cc-head">
          <span class="mono">{{ (hover.s / 1000).toFixed(2) }} km</span>
          <span class="cc-alt mono">{{ Math.round(hover.alt) }} m</span>
        </div>
        <div class="cc-row">
          <span>能见度</span>
          <span class="mono" :style="{ color: hoverBand?.color }">{{ fmtVis(hover.vis) }}</span>
        </div>
        <div class="cc-row"><span>体密度</span><span class="mono">{{ hover.den.toFixed(3) }}</span></div>
        <div class="cc-row"><span>云底高度</span><span class="mono">{{ Number.isNaN(hover.cb) ? '无云' : Math.round(hover.cb) + ' m' }}</span></div>
        <div class="cc-row"><span>最低安全高度</span><span class="mono">{{ Math.round(hover.msa) }} m</span></div>
        <div class="cc-band" :style="{ background: hoverBand?.color }">{{ hoverBand?.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-module {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.panel {
  position: absolute;
  top: 14px;
  bottom: 14px;
  width: 318px;
  left: 14px;
  pointer-events: auto;
  background: linear-gradient(180deg, rgba(10, 20, 30, 0.93), rgba(7, 14, 22, 0.96));
  border: 1px solid rgba(86, 128, 158, 0.26);
  border-radius: 12px;
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}
.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.panel-head h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #dcecfa;
  letter-spacing: 0.4px;
}
.sub {
  margin: 2px 0 0;
  font-size: 9px;
  letter-spacing: 1.4px;
  color: rgba(120, 160, 190, 0.7);
}
.chip {
  font-size: 9px;
  padding: 3px 7px;
  border-radius: 4px;
  background: rgba(80, 200, 230, 0.1);
  color: #7fe3f5;
  border: 1px solid rgba(80, 200, 230, 0.28);
}
.mono {
  font-family: var(--mono);
}
.kpis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.kpi {
  background: rgba(16, 32, 44, 0.6);
  border: 1px solid rgba(80, 120, 150, 0.2);
  border-radius: 7px;
  padding: 7px 9px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.kpi .k {
  font-size: 9px;
  color: rgba(130, 165, 190, 0.72);
}
.kpi .v {
  font-family: var(--mono);
  font-size: 15px;
  color: #e4f3ff;
}
.kpi .v.danger {
  color: #ff8578;
}
.kpi .v.warn {
  color: #ffd06b;
}
.block h3 {
  margin: 0 0 7px;
  font-size: 10px;
  font-weight: 600;
  color: rgba(160, 194, 216, 0.95);
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.tiny {
  font-family: var(--mono);
  font-size: 8px;
  font-weight: 400;
  color: rgba(110, 145, 170, 0.6);
}
.toggles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}
.toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid rgba(80, 120, 150, 0.22);
  background: rgba(14, 26, 36, 0.5);
  color: rgba(140, 175, 200, 0.8);
  font-size: 10px;
  cursor: pointer;
}
.toggle i {
  width: 7px;
  height: 7px;
  border-radius: 2px;
  border: 1px solid rgba(120, 160, 190, 0.5);
}
.toggle.on {
  color: #cdeefc;
  border-color: rgba(96, 200, 230, 0.5);
  background: rgba(20, 44, 58, 0.7);
}
.toggle.on i {
  background: #6fe0f6;
  border-color: #6fe0f6;
  box-shadow: 0 0 7px rgba(110, 224, 246, 0.8);
}
.ramp {
  display: flex;
  height: 9px;
  border-radius: 3px;
  overflow: hidden;
}
.ramp i {
  flex: 1;
}
.ramp-labels {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  color: rgba(120, 155, 180, 0.7);
  margin-top: 3px;
}
.bands {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 10px;
  margin-top: 7px;
}
.band {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  color: rgba(170, 200, 222, 0.85);
}
.band i {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
.band em {
  font-style: normal;
  font-family: var(--mono);
  font-size: 8px;
  color: rgba(110, 145, 170, 0.6);
}
.leg-table {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 9.5px;
}
.lh,
.lr {
  display: grid;
  grid-template-columns: 36px 1fr 1fr 40px;
  gap: 4px;
  align-items: center;
}
.lh {
  color: rgba(120, 155, 180, 0.65);
  font-size: 8.5px;
  padding-bottom: 2px;
}
.lr {
  padding: 4px 0;
  border-top: 1px solid rgba(70, 105, 130, 0.16);
  color: rgba(190, 214, 232, 0.85);
}
.ll {
  font-family: var(--mono);
  color: #7fe3f5;
}
.st {
  font-size: 8.5px;
  text-align: center;
  border-radius: 3px;
  padding: 1px 0;
}
.st.conflict {
  color: #ffb0a4;
  background: rgba(255, 100, 80, 0.16);
}
.st.caution {
  color: #ffe0a0;
  background: rgba(255, 190, 60, 0.14);
}
.st.clear {
  color: #9fe8cf;
  background: rgba(60, 200, 150, 0.12);
}
.exports {
  display: flex;
  gap: 5px;
  margin-top: auto;
}
.exports button {
  flex: 1;
  padding: 8px 4px;
  border-radius: 7px;
  border: 1px solid rgba(90, 150, 180, 0.35);
  background: rgba(16, 34, 46, 0.7);
  color: #a8d8ec;
  font-size: 10px;
  cursor: pointer;
}
.exports button:hover {
  border-color: rgba(110, 220, 245, 0.7);
  color: #ddf6ff;
}
.export-note {
  margin: 0;
  font-size: 9px;
  line-height: 1.55;
  color: rgba(115, 150, 175, 0.65);
}
.chart-shell {
  position: absolute;
  left: 350px;
  right: 16px;
  top: 16px;
  bottom: 16px;
  pointer-events: auto;
  border-radius: 12px;
  border: 1px solid rgba(86, 128, 158, 0.26);
  background: rgba(7, 14, 22, 0.82);
  backdrop-filter: blur(8px);
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}
.chart-wrap {
  position: absolute;
  inset: 0;
}
.chart-wrap canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: crosshair;
}
.cursor-card {
  position: absolute;
  top: 44px;
  right: 16px;
  width: 178px;
  padding: 9px 11px;
  border-radius: 8px;
  background: rgba(8, 18, 28, 0.92);
  border: 1px solid rgba(96, 150, 180, 0.35);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  font-size: 9.5px;
}
.cc-head {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(80, 120, 150, 0.24);
  color: #cfe8f8;
  font-size: 11px;
}
.cc-alt {
  color: #9fd8ff;
}
.cc-row {
  display: flex;
  justify-content: space-between;
  padding: 1.5px 0;
  color: rgba(145, 180, 205, 0.85);
}
.cc-band {
  margin-top: 6px;
  text-align: center;
  border-radius: 3px;
  padding: 2px;
  font-size: 9px;
  color: #071016;
  font-weight: 600;
}
</style>
