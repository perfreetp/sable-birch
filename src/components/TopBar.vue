<script setup lang="ts">
import { computed } from 'vue'
import {
  domainLabel,
  exportCsv,
  exportJson,
  preloadAll,
  state,
  frameTimeLabel,
  setModule,
  clearCache,
} from '../store'
import type { ModuleId } from '../store'

const modules: Array<{ id: ModuleId; name: string; en: string; key: string }> = [
  { id: 'route', name: '航路编辑', en: 'ROUTE', key: '1' },
  { id: 'volume', name: '体积视图', en: 'VOLUME', key: '2' },
  { id: 'section', name: '剖面分析', en: 'SECTION', key: '3' },
]

const loadingPct = computed(() =>
  state.preload.active ? Math.round((state.preload.done / state.preload.total) * 100) : 0,
)

const hasSection = computed(() => state.waypoints.length >= 2)
</script>

<template>
  <header class="topbar">
    <div class="brand">
      <div class="mark">
        <svg viewBox="0 0 32 32" width="26" height="26">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#7ff0ff" />
              <stop offset="1" stop-color="#3f8fd8" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="13" fill="none" stroke="url(#g1)" stroke-width="1.4" opacity="0.7" />
          <path d="M3.5 19.5c3-2.5 6.5-3.4 12.5-3.4s9.5.9 12.5 3.4" fill="none" stroke="url(#g1)" stroke-width="1.6" />
          <path d="M6 14.2c2.4-1.7 5.4-2.3 10-2.3s7.6.6 10 2.3" fill="none" stroke="#8fd8f0" stroke-width="1.1" opacity="0.6" />
          <circle cx="16" cy="22.4" r="1.7" fill="#bff4ff" />
          <path d="M16 22.4 11.5 9.4M16 22.4 20.5 9.4" stroke="#d8f8ff" stroke-width="0.9" opacity="0.75" />
        </svg>
      </div>
      <div class="title">
        <h1>AEROSCOPE</h1>
        <p>低空航路气象体积渲染 · <span class="mono">{{ domainLabel }}</span></p>
      </div>
    </div>

    <nav class="modules">
      <button
        v-for="m in modules"
        :key="m.id"
        :class="{ active: state.module === m.id }"
        @click="setModule(m.id)"
      >
        <span class="k">{{ m.key }}</span>
        <span class="nm">{{ m.name }}</span>
        <span class="en">{{ m.en }}</span>
      </button>
    </nav>

    <div class="right">
      <div class="status">
        <div class="srow">
          <span class="dot" :class="{ busy: state.loading || state.preload.active }" />
          <span class="mono">{{ state.loading ? 'STREAMING' : 'SYNCED' }}</span>
          <span class="sep">|</span>
          <span class="mono">{{ state.fps }} FPS</span>
        </div>
        <div class="srow dim">
          <span class="mono">分析 {{ frameTimeLabel }}</span>
          <span class="sep">|</span>
          <span class="mono">缓存 {{ state.cache.frames.length }}/24</span>
        </div>

      </div>

      <div v-if="state.preload.active" class="preload-pill">
        <i :style="{ width: `${loadingPct}%` }" />
        <span class="mono">写入分块纹理 {{ loadingPct }}%</span>
      </div>

      <div class="actions">
        <button class="act" :disabled="!hasSection" title="导出逐航段剖面与能见度 CSV" @click="exportCsv">
          导出 CSV
        </button>
        <button class="act" :disabled="!hasSection" title="导出完整剖面 JSON" @click="exportJson">
          导出 JSON
        </button>
        <div class="menu-wrap">
          <button class="act ghost" title="缓存管理">缓存</button>
          <div class="menu">
            <button @click="preloadAll" :disabled="state.preload.active">预缓存全部 24 帧</button>
            <button class="danger" @click="clearCache">清空分块缓存</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 56px;
  padding: 0 14px;
  flex-wrap: nowrap;
  background: linear-gradient(180deg, rgba(9, 17, 26, 0.98), rgba(8, 15, 23, 0.94));
  border-bottom: 1px solid rgba(80, 126, 156, 0.3);
  backdrop-filter: blur(16px);
  pointer-events: auto;
  position: relative;
  z-index: 5;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex-shrink: 1;
  overflow: hidden;
}
.modules {
  flex-shrink: 0;
}
.mark {
  filter: drop-shadow(0 0 8px rgba(90, 210, 255, 0.45));
}
.title h1 {
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: 3px;
  color: #e3f4ff;
}
.title p {
  margin: 1px 0 0;
  font-size: 9px;
  color: rgba(125, 160, 188, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mono {
  font-family: var(--mono);
}
.modules {
  display: flex;
  gap: 2px;
  background: rgba(10, 20, 28, 0.7);
  padding: 3px;
  border-radius: 9px;
  border: 1px solid rgba(80, 120, 150, 0.22);
}
.modules button {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 13px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: rgba(150, 185, 210, 0.78);
  cursor: pointer;
  transition: all 0.15s;
}
.modules button .k {
  font-family: var(--mono);
  font-size: 8px;
  color: rgba(110, 150, 180, 0.6);
  border: 1px solid rgba(110, 150, 180, 0.3);
  border-radius: 3px;
  padding: 0 3px;
  line-height: 12px;
}
.modules button .nm {
  font-size: 11.5px;
}
.modules button .en {
  font-family: var(--mono);
  font-size: 7.5px;
  letter-spacing: 0.8px;
  color: rgba(110, 150, 180, 0.45);
}
.modules button:hover {
  color: #cdeefc;
  background: rgba(24, 44, 58, 0.6);
}
.modules button.active {
  background: linear-gradient(180deg, rgba(36, 84, 104, 0.95), rgba(24, 58, 74, 0.95));
  color: #e0f8ff;
  box-shadow: 0 0 0 1px rgba(96, 210, 240, 0.35), 0 0 18px rgba(60, 180, 220, 0.16);
}
.modules button.active .k {
  color: #8fe8fa;
  border-color: rgba(120, 230, 250, 0.5);
}
.modules button.active .en {
  color: rgba(150, 225, 245, 0.7);
}
.right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.status {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 150px;
}
.srow {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 9px;
  color: rgba(150, 200, 220, 0.85);
}
.srow.dim {
  color: rgba(120, 155, 180, 0.62);
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #5ee0b0;
  box-shadow: 0 0 7px rgba(94, 224, 176, 0.8);
}
.dot.busy {
  background: #ffc861;
  box-shadow: 0 0 7px rgba(255, 200, 97, 0.9);
  animation: pulse 1.1s ease-in-out infinite;
}
@keyframes pulse {
  50% {
    opacity: 0.35;
  }
}
.sep {
  color: rgba(90, 125, 150, 0.4);
}
.preload-pill {
  position: relative;
  width: 150px;
  padding: 4px 7px;
  border-radius: 4px;
  overflow: hidden;
  background: rgba(20, 40, 54, 0.8);
  border: 1px solid rgba(90, 160, 190, 0.3);
}
.preload-pill i {
  position: absolute;
  inset: 0 auto 0 0;
  background: linear-gradient(90deg, rgba(70, 190, 220, 0.3), rgba(90, 220, 245, 0.22));
  transition: width 0.2s;
}
.preload-pill span {
  position: relative;
  font-size: 8.5px;
  color: #b8e8f8;
}
.actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.act {
  padding: 7px 12px;
  border-radius: 6px;
  border: 1px solid rgba(90, 160, 190, 0.4);
  background: rgba(18, 38, 50, 0.8);
  color: #b0dcee;
  font-size: 10.5px;
  cursor: pointer;
  white-space: nowrap;
}
.act:hover:not(:disabled) {
  border-color: rgba(110, 220, 245, 0.75);
  color: #e2f8ff;
  background: rgba(26, 56, 70, 0.9);
}
.act:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.act.ghost {
  border-color: rgba(80, 120, 150, 0.28);
  background: transparent;
  color: rgba(150, 185, 210, 0.8);
}
.menu-wrap {
  position: relative;
}
.menu-wrap:hover .menu {
  display: flex;
}
.menu {
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  padding-top: 5px;
  flex-direction: column;
  min-width: 168px;
  z-index: 20;
}
.menu button {
  text-align: left;
  padding: 8px 10px;
  border: 1px solid rgba(80, 120, 150, 0.28);
  border-top: none;
  background: rgba(10, 20, 28, 0.98);
  color: #a8d0e4;
  font-size: 10px;
  cursor: pointer;
}
.menu button:first-child {
  border-radius: 6px 6px 0 0;
  border-top: 1px solid rgba(80, 120, 150, 0.28);
}
.menu button:last-child {
  border-radius: 0 0 6px 6px;
}
.menu button:hover {
  background: rgba(22, 44, 58, 0.98);
  color: #ddf6ff;
}
.menu button.danger:hover {
  color: #ff9a8f;
}
</style>
