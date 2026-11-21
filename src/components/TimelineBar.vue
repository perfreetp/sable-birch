<script setup lang="ts">
import { computed, ref } from 'vue'
import { GRID } from '../lib/weather'
import {
  frameDate,
  frameTimeLabel,
  preloadAll,
  setFrame,
  setSpeed,
  state,
  stepFrame,
  togglePlay,
} from '../store'

const scrubbing = ref(false)

const timeLabel = computed(() => {
  const d = frameDate.value
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
})

function onScrub(ev: Event): void {
  const v = Number((ev.target as HTMLInputElement).value)
  setFrame(v)
}

function onScrubStart(): void {
  scrubbing.value = true
  if (state.playing) togglePlay()
}
function onScrubEnd(): void {
  scrubbing.value = false
}

const progress = computed(() => (state.frame / (GRID.frames - 1)) * 100)
</script>

<template>
  <div class="timeline-bar">
    <button class="transport" :class="{ playing: state.playing }" :title="state.playing ? '暂停' : '播放'" @click="togglePlay">
      <svg v-if="!state.playing" viewBox="0 0 16 16" width="14" height="14"><path d="M4 2.5v11l9-5.5z" fill="currentColor" /></svg>
      <svg v-else viewBox="0 0 16 16" width="14" height="14"><rect x="3.5" y="2.5" width="3" height="11" fill="currentColor" /><rect x="9.5" y="2.5" width="3" height="11" fill="currentColor" /></svg>
    </button>
    <button class="step" title="上一帧" @click="stepFrame(-1)">
      <svg viewBox="0 0 16 16" width="12" height="12"><path d="M11 3v10L4 8z" fill="currentColor" /></svg>
    </button>
    <button class="step" title="下一帧" @click="stepFrame(1)">
      <svg viewBox="0 0 16 16" width="12" height="12"><path d="M5 3v10l7-5z" fill="currentColor" /></svg>
    </button>

    <div class="clock">
      <span class="t">{{ timeLabel }}</span>
      <span class="z">UTC</span>
    </div>

    <div class="track-wrap">
      <div class="track">
        <div class="fill" :style="{ width: `${progress}%` }" />
        <div class="ticks">
          <i v-for="f in GRID.frames" :key="f" :class="{ cached: state.cache.frames.includes(f - 1) }" />
        </div>
        <input
          type="range"
          min="0"
          :max="GRID.frames - 1"
          step="1"
          :value="state.frame"
          @input="onScrub"
          @pointerdown="onScrubStart"
          @pointerup="onScrubEnd"
        />
      </div>
      <div class="labels">
        <span class="mono">06:00Z</span>
        <span class="mid mono">24 帧 · 4 分钟步长</span>
        <span class="mono">07:32Z</span>
      </div>
    </div>

    <div class="frame-readout">
      <span class="mono big">{{ String(state.frame + 1).padStart(2, '0') }}</span>
      <span class="mono slash">/{{ GRID.frames }}</span>
      <span class="lbl">FRAME</span>
    </div>

    <div class="speeds">
      <button v-for="s in [0.5, 1, 2, 4]" :key="s" :class="{ on: state.speed === s }" @click="setSpeed(s)">
        {{ s }}×
      </button>
    </div>

    <div class="legend-mini">
      <span class="lm-dot cached" /> 已缓存
      <span class="lm-dot" /> 未缓存
    </div>

    <button class="preload" :disabled="state.preload.active" @click="preloadAll">
      {{ state.preload.active ? `缓存 ${state.preload.done}/${state.preload.total}` : '预缓存全部帧' }}
    </button>

    <span class="stamp mono">{{ frameTimeLabel }}</span>
  </div>
</template>

<style scoped>
.timeline-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 16px;
  background: linear-gradient(180deg, rgba(10, 19, 28, 0.97), rgba(7, 14, 21, 0.97));
  border-top: 1px solid rgba(80, 126, 156, 0.28);
  backdrop-filter: blur(16px);
  pointer-events: auto;
}
.transport {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  border: 1px solid rgba(96, 200, 230, 0.45);
  background: rgba(20, 46, 60, 0.85);
  color: #7de4f8;
  display: grid;
  place-items: center;
  cursor: pointer;
}
.transport:hover {
  background: rgba(30, 66, 84, 0.9);
}
.transport.playing {
  color: #ffd47a;
  border-color: rgba(255, 200, 100, 0.5);
  background: rgba(52, 38, 18, 0.8);
}
.step {
  width: 24px;
  height: 24px;
  border-radius: 5px;
  border: 1px solid rgba(80, 120, 150, 0.32);
  background: rgba(14, 26, 36, 0.7);
  color: #9fc4dc;
  display: grid;
  place-items: center;
  cursor: pointer;
  padding: 0;
}
.step:hover {
  color: #d8f6ff;
  border-color: rgba(110, 210, 240, 0.6);
}
.clock {
  display: flex;
  align-items: baseline;
  gap: 3px;
  min-width: 66px;
}
.clock .t {
  font-family: var(--mono);
  font-size: 16px;
  color: #cfeeff;
  letter-spacing: -0.3px;
}
.clock .z {
  font-size: 8px;
  color: rgba(120, 160, 190, 0.65);
}
.track-wrap {
  flex: 1;
  min-width: 160px;
}
.track {
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
}
.track::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 2px;
  background: rgba(60, 92, 116, 0.5);
}
.fill {
  position: absolute;
  left: 0;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(74, 196, 226, 0.85), rgba(120, 232, 255, 0.95));
  box-shadow: 0 0 10px rgba(90, 210, 240, 0.4);
}
.ticks {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  align-items: center;
  pointer-events: none;
  gap: 0;
}
.ticks i {
  justify-self: center;
  width: 2px;
  height: 7px;
  border-radius: 1px;
  background: rgba(110, 150, 180, 0.45);
}
.ticks i.cached {
  background: rgba(120, 225, 245, 0.85);
  height: 10px;
}
input[type='range'] {
  position: relative;
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  background: transparent;
  outline: none;
  margin: 0;
  z-index: 2;
}
input[type='range']::-webkit-slider-runnable-track {
  height: 20px;
  background: transparent;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e9fbff;
  border: 2px solid #0a1620;
  box-shadow: 0 0 10px rgba(130, 230, 255, 0.9);
  cursor: grab;
  margin-top: 4px;
}
input[type='range']::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e9fbff;
  border: 2px solid #0a1620;
}
.labels {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  color: rgba(110, 145, 170, 0.62);
  margin-top: 1px;
}
.labels .mid {
  color: rgba(110, 145, 170, 0.5);
}
.frame-readout {
  display: flex;
  align-items: baseline;
  gap: 2px;
  min-width: 66px;
}
.big {
  font-size: 17px;
  color: #e2f4ff;
}
.slash {
  font-size: 10px;
  color: rgba(120, 160, 190, 0.6);
}
.lbl {
  font-size: 8px;
  letter-spacing: 1px;
  color: rgba(110, 145, 170, 0.6);
  margin-left: 5px;
}
.speeds {
  display: flex;
  gap: 2px;
  background: rgba(10, 20, 28, 0.6);
  border-radius: 6px;
  padding: 2px;
  border: 1px solid rgba(80, 120, 150, 0.2);
}
.speeds button {
  border: none;
  background: transparent;
  color: rgba(140, 175, 200, 0.75);
  font-family: var(--mono);
  font-size: 9px;
  padding: 3px 6px;
  border-radius: 4px;
  cursor: pointer;
}
.speeds button.on {
  background: rgba(40, 90, 112, 0.85);
  color: #d8f4ff;
}
.legend-mini {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8.5px;
  color: rgba(120, 155, 180, 0.7);
}
.lm-dot {
  width: 5px;
  height: 5px;
  border-radius: 1px;
  background: rgba(110, 150, 180, 0.5);
}
.lm-dot.cached {
  background: rgba(120, 225, 245, 0.9);
}
.preload {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(90, 160, 190, 0.35);
  background: rgba(16, 34, 46, 0.7);
  color: #a8d8ec;
  font-size: 9.5px;
  cursor: pointer;
  white-space: nowrap;
}
.preload:hover:not(:disabled) {
  border-color: rgba(110, 220, 245, 0.7);
  color: #ddf6ff;
}
.preload:disabled {
  opacity: 0.7;
  cursor: progress;
}
.stamp {
  font-size: 8.5px;
  color: rgba(110, 145, 170, 0.5);
  white-space: nowrap;
}
</style>
