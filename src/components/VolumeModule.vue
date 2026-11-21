<script setup lang="ts">
import { computed } from 'vue'
import {
  activeVolume,
  cloudBaseAtRoute,
  datasetSummary,
  focusRoute,
  frameDate,
  frameTimeLabel,
  resetView,
  setBasemap,
  setTier,
  state,
  syncSceneOptions,
} from '../store'
import { BASEMAPS, DENSITY_LEVELS } from '../lib/types'
import { CHUNKS_PER_FRAME, FRAME_BYTES, GRID } from '../lib/weather'

const summary = computed(() => datasetSummary())
const baseLabel = computed(() => {
  const v = cloudBaseAtRoute()
  if (Number.isNaN(v)) return '—'
  return `${Math.round(v)} m`
})
const timeUtc = computed(() => {
  const d = frameDate.value
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
})
const cloudCoverPct = computed(() => Math.round(summary.value.coverage * 100))

function formatBytes(b: number): string {
  if (b > 1024 * 1024) return `${(b / 1024 / 1024).toFixed(1)} MB`
  if (b > 1024) return `${(b / 1024).toFixed(0)} KB`
  return `${b} B`
}

const cachePct = computed(() =>
  Math.round((state.cache.frames.length / GRID.frames) * 100),
)

function toggle(key: 'showVolume' | 'showCloudBase' | 'showRoute' | 'showSection' | 'highlightRoute') {
  state[key] = !state[key]
  syncSceneOptions()
}

function setFog(v: number) {
  state.fogStrength = v
  syncSceneOptions()
}
</script>

<template>
  <div class="volume-module">
    <aside class="panel left">
      <header class="panel-head">
        <div>
          <h2>体积视图</h2>
          <p class="sub">VOLUMETRIC CLOUD FIELD</p>
        </div>
        <span class="live" :class="{ on: !state.loading }">
          <i />{{ state.loading ? '载入中' : '实时' }}
        </span>
      </header>

      <div class="readout">
        <div class="ro-main">
          <span class="ro-label">云底高度</span>
          <span class="ro-value">{{ baseLabel }}</span>
          <span class="ro-hint">沿航路最低层结</span>
        </div>
        <div class="ro-grid">
          <div class="ro-cell">
            <span class="k">分析时刻</span>
            <span class="v mono">{{ frameTimeLabel }}</span>
          </div>
          <div class="ro-cell">
            <span class="k">云量覆盖</span>
            <span class="v mono">{{ cloudCoverPct }}%</span>
          </div>
          <div class="ro-cell">
            <span class="k">天气性质</span>
            <span class="v">{{ summary.condition }}</span>
          </div>
          <div class="ro-cell">
            <span class="k">峰值密度</span>
            <span class="v mono">{{ summary.maxDensity.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <section class="block">
        <h3>密度阈值 <span class="tiny">3 档 · CLOUD OPTICAL DENSITY</span></h3>
        <div class="tier-row">
          <button
            v-for="(tier, i) in DENSITY_LEVELS"
            :key="tier.id"
            class="tier"
            :class="{ active: state.tier === i }"
            @click="setTier(i)"
          >
            <span class="tier-name">{{ tier.name }}</span>
            <span class="tier-code mono">{{ tier.label }}</span>
            <span class="tier-bar"><i :style="{ width: `${28 + i * 32}%` }" /></span>
          </button>
        </div>
        <p class="note">
          提高阈值会剔除低密度凝结，云体更通透；降低阈值则显示更完整的砧状与降水拖尾。
        </p>
      </section>

      <section class="block">
        <h3>地形底图 <span class="tiny">BASEMAP</span></h3>
        <div class="seg">
          <button
            v-for="b in BASEMAPS"
            :key="b.id"
            :class="{ active: state.basemap === b.id }"
            @click="setBasemap(b.id)"
          >
            {{ b.name }}
          </button>
        </div>
      </section>

      <section class="block">
        <h3>图层 <span class="tiny">LAYERS</span></h3>
        <div class="toggles">
          <button class="toggle" :class="{ on: state.showVolume }" @click="toggle('showVolume')">
            <i /> 体积云体
          </button>
          <button class="toggle" :class="{ on: state.showCloudBase }" @click="toggle('showCloudBase')">
            <i /> 云底高度面
          </button>
          <button class="toggle" :class="{ on: state.showRoute }" @click="toggle('showRoute')">
            <i /> 航路
          </button>
          <button class="toggle" :class="{ on: state.highlightRoute }" @click="toggle('highlightRoute')">
            <i /> 航路高亮
          </button>
          <button class="toggle" :class="{ on: state.showSection }" @click="toggle('showSection')">
            <i /> 剖面切片
          </button>
        </div>
      </section>

      <section class="block">
        <h3>体积雾强度 <span class="tiny">POST VOLUMETRIC FOG</span></h3>
        <div class="slider-row">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="state.fogStrength"
            @input="setFog(Number(($event.target as HTMLInputElement).value))"
          />
          <span class="mono small">{{ Math.round(state.fogStrength * 100) }}%</span>
        </div>
      </section>

      <div class="view-actions">
        <button @click="resetView">重置视角</button>
        <button @click="focusRoute">聚焦航路</button>
      </div>
    </aside>

    <aside class="panel right compact">
      <h3>数据缓存 <span class="tiny">CHUNKED TEXTURE CACHE</span></h3>
      <div class="cache-bar">
        <i :style="{ width: `${cachePct}%` }" />
      </div>
      <div class="cache-meta">
        <span class="mono">{{ state.cache.frames.length }} / {{ GRID.frames }} 帧</span>
        <span class="mono">{{ formatBytes(state.cache.bytes) }}</span>
      </div>
      <div class="cache-detail">
        <div><span>体素网格</span><span class="mono">{{ GRID.nx }}×{{ GRID.ny }}×{{ GRID.nz }}</span></div>
        <div><span>分块纹理</span><span class="mono">{{ GRID.cx }}×{{ GRID.cy }}×{{ GRID.cz }} × 16³</span></div>
        <div><span>分块数 / 帧</span><span class="mono">{{ CHUNKS_PER_FRAME }}</span></div>
        <div><span>全序列体积</span><span class="mono">≈ {{ ((GRID.frames * FRAME_BYTES) / 1048576).toFixed(0) }} MB</span></div>
      </div>
      <h3 class="mt">时间序列 <span class="tiny">24 FRAMES · 4 MIN STEP</span></h3>
      <div class="timeline">
        <i
          v-for="f in GRID.frames"
          :key="f"
          class="tick"
          :class="{ cached: state.cache.frames.includes(f - 1), current: f - 1 === state.frame }"
        />
      </div>
      <div class="tl-labels mono">
        <span>06:00Z</span>
        <span>07:32Z</span>
      </div>
      <div class="now">
        <span class="mono clock">{{ timeUtc }}</span>
        <span class="zone">UTC</span>
        <span class="mono frame">FRAME {{ String(state.frame + 1).padStart(2, '0') }}</span>
      </div>
      <div class="volume-meta">
        <div><span>活动体纹理</span><span class="mono">{{ activeVolume ? '已装载' : '未装载' }}</span></div>
        <div><span>渲染帧率</span><span class="mono">{{ state.fps }} fps</span></div>
        <div><span>步进采样</span><span class="mono">150 步 · 抖动</span></div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.volume-module {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.panel {
  position: absolute;
  top: 14px;
  bottom: 14px;
  width: 300px;
  pointer-events: auto;
  background: linear-gradient(180deg, rgba(10, 20, 30, 0.93), rgba(7, 14, 22, 0.95));
  border: 1px solid rgba(86, 128, 158, 0.26);
  border-radius: 12px;
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
}
.panel.left {
  left: 14px;
}
.panel.right {
  right: 14px;
  width: 252px;
}
.panel.compact {
  gap: 10px;
}
.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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
.live {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  color: rgba(255, 190, 100, 0.9);
  padding: 3px 7px;
  border-radius: 4px;
  border: 1px solid rgba(255, 190, 100, 0.25);
  background: rgba(255, 170, 60, 0.08);
}
.live.on {
  color: #7fe8c8;
  border-color: rgba(90, 230, 190, 0.3);
  background: rgba(60, 220, 170, 0.08);
}
.live i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 6px currentColor;
}
.readout {
  border-radius: 10px;
  border: 1px solid rgba(86, 150, 180, 0.25);
  background: linear-gradient(160deg, rgba(22, 48, 64, 0.75), rgba(12, 24, 34, 0.7));
  padding: 12px;
}
.ro-label {
  font-size: 10px;
  color: rgba(150, 190, 214, 0.8);
  letter-spacing: 0.5px;
}
.ro-value {
  display: block;
  font-family: var(--mono);
  font-size: 30px;
  line-height: 1.15;
  color: #b8ecff;
  text-shadow: 0 0 20px rgba(110, 220, 255, 0.35);
  letter-spacing: -0.5px;
}
.ro-hint {
  font-size: 9px;
  color: rgba(130, 170, 195, 0.6);
}
.ro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(80, 120, 150, 0.2);
}
.ro-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ro-cell .k {
  font-size: 9px;
  color: rgba(130, 165, 190, 0.7);
}
.ro-cell .v {
  font-size: 11px;
  color: #d8ecfa;
}
.block h3 {
  margin: 0 0 7px;
  font-size: 10px;
  font-weight: 600;
  color: rgba(160, 194, 216, 0.95);
  letter-spacing: 0.4px;
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.tiny {
  font-family: var(--mono);
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.6px;
  color: rgba(110, 145, 170, 0.6);
}
.tier-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.tier {
  display: grid;
  grid-template-columns: 42px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 7px 9px;
  border-radius: 7px;
  border: 1px solid rgba(80, 120, 150, 0.24);
  background: rgba(14, 26, 36, 0.55);
  cursor: pointer;
  text-align: left;
  transition: all 0.16s;
}
.tier:hover {
  border-color: rgba(100, 180, 210, 0.5);
}
.tier.active {
  border-color: rgba(96, 218, 242, 0.75);
  background: rgba(24, 54, 68, 0.75);
  box-shadow: 0 0 14px rgba(60, 190, 230, 0.14);
}
.tier-name {
  font-size: 11px;
  color: #d8ecf8;
}
.tier-code {
  font-size: 9px;
  color: rgba(130, 170, 195, 0.7);
}
.tier-bar {
  display: block;
  height: 3px;
  width: 44px;
  border-radius: 2px;
  background: rgba(80, 120, 150, 0.3);
  overflow: hidden;
}
.tier-bar i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #4fd0c8, #ffcf5c, #ff6b57);
}
.note {
  margin: 7px 0 0;
  font-size: 9px;
  line-height: 1.6;
  color: rgba(120, 155, 180, 0.7);
}
.seg {
  display: flex;
  gap: 4px;
  background: rgba(10, 20, 28, 0.6);
  padding: 3px;
  border-radius: 7px;
  border: 1px solid rgba(80, 120, 150, 0.2);
}
.seg button {
  flex: 1;
  padding: 6px 4px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: rgba(150, 185, 210, 0.8);
  font-size: 10px;
  cursor: pointer;
}
.seg button.active {
  background: rgba(40, 90, 112, 0.85);
  color: #d8f4ff;
  box-shadow: 0 0 10px rgba(60, 180, 220, 0.15);
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
  padding: 7px 8px;
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
.slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.slider-row input {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(80, 200, 230, 0.65), rgba(80, 140, 180, 0.3));
  outline: none;
}
.slider-row input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #9fe8ff;
  border: 2px solid #0a1620;
  cursor: pointer;
}
.small {
  font-size: 9px;
  color: rgba(130, 165, 190, 0.8);
  width: 30px;
  text-align: right;
}
.view-actions {
  display: flex;
  gap: 6px;
  margin-top: auto;
}
.view-actions button {
  flex: 1;
  padding: 8px;
  border-radius: 7px;
  border: 1px solid rgba(90, 150, 180, 0.35);
  background: rgba(16, 34, 46, 0.7);
  color: #a8d8ec;
  font-size: 11px;
  cursor: pointer;
}
.view-actions button:hover {
  border-color: rgba(110, 220, 245, 0.7);
  color: #ddf6ff;
}
.panel.right h3 {
  margin: 0;
  font-size: 10px;
  font-weight: 600;
  color: rgba(160, 194, 216, 0.95);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.panel.right h3.mt {
  margin-top: 6px;
}
.cache-bar {
  height: 4px;
  border-radius: 2px;
  background: rgba(60, 90, 112, 0.4);
  overflow: hidden;
}
.cache-bar i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #4fd0c8, #6fe0f6);
  transition: width 0.3s;
}
.cache-meta {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: rgba(130, 170, 195, 0.8);
}
.cache-detail,
.volume-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  border-radius: 7px;
  background: rgba(12, 24, 34, 0.6);
  border: 1px solid rgba(80, 120, 150, 0.18);
}
.cache-detail div,
.volume-meta div {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: rgba(130, 165, 190, 0.75);
}
.mono {
  font-family: var(--mono);
}
.timeline {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 2px;
  height: 22px;
  align-items: end;
}
.tick {
  display: block;
  height: 8px;
  border-radius: 1px;
  background: rgba(70, 100, 124, 0.4);
  transition: all 0.15s;
}
.tick.cached {
  background: rgba(90, 200, 220, 0.55);
  height: 12px;
}
.tick.current {
  background: #b8f2ff;
  height: 20px;
  box-shadow: 0 0 8px rgba(140, 235, 255, 0.9);
}
.tl-labels {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  color: rgba(110, 145, 170, 0.65);
}
.now {
  display: flex;
  align-items: baseline;
  gap: 5px;
  padding: 6px 0;
  border-top: 1px solid rgba(80, 120, 150, 0.18);
}
.clock {
  font-size: 20px;
  color: #b8ecff;
  letter-spacing: -0.5px;
}
.zone {
  font-size: 8px;
  color: rgba(130, 165, 190, 0.7);
}
.frame {
  margin-left: auto;
  font-size: 9px;
  color: rgba(120, 200, 225, 0.8);
}
</style>
