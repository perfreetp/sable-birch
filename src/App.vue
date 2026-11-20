<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Compass from './components/Compass.vue'
import ControlPanel from './components/ControlPanel.vue'
import ResultsPanel from './components/ResultsPanel.vue'
import { SceneManager } from './core/scene'
import { state } from './state'
import { HEAT_LEVELS } from './types'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let scene: SceneManager | null = null

onMounted(async () => {
  scene = new SceneManager(canvasRef.value!)
  await scene.init()
  // 状态变化 → 视锥 / 热力 / 穿透实时重算(rAF 合帧)
  watch(
    () => [state.vertiport, state.approaches, state.coneParams],
    () => scene?.requestRecompute(),
    { deep: true }
  )
})

onBeforeUnmount(() => scene?.dispose())

function topView() { scene?.setTopView() }
function approachView(id: number) { scene?.setApproachView(id) }
</script>

<template>
  <div class="layout">
    <div class="viewport">
      <canvas ref="canvasRef" class="render"></canvas>
      <div class="hud-top">
        <span class="title">低空起降场视景评估</span>
        <span v-if="state.engineKind" class="engine">{{ state.engineKind }}</span>
      </div>
      <div v-if="state.placing" class="placing-tip">放置模式:点击地面设置起降场位置</div>
      <!-- 悬停热力网格提示 -->
      <div v-if="state.hoverCell" class="tooltip"
           :style="{ left: state.hoverCell.screenX + 14 + 'px', top: state.hoverCell.screenY + 12 + 'px' }">
        <div class="tt-title">
          <span class="sw" :style="{ background: `rgb(${HEAT_LEVELS[state.hoverCell.level].color.map(c => Math.round(c * 255)).join(',')})` }"></span>
          覆盖高度 {{ state.hoverCell.height.toFixed(1) }} m
        </div>
        <div class="tt-sub">({{ Math.round(state.hoverCell.wx) }}, {{ Math.round(state.hoverCell.wz) }}) · {{ state.hoverCell.coneCount }} 个视锥覆盖</div>
      </div>
    </div>
    <aside class="sidebar">
      <Compass />
      <ControlPanel @top-view="topView" @approach-view="approachView" />
      <ResultsPanel />
    </aside>
  </div>
</template>

<style>
* { box-sizing: border-box; }
html, body, #app { margin: 0; height: 100%; overflow: hidden; background: #0d1117; }
body { font-family: 'Segoe UI', 'Microsoft YaHei', system-ui, sans-serif; }
</style>

<style scoped>
.layout { display: flex; height: 100%; }
.viewport { flex: 1; position: relative; min-width: 0; }
.render { width: 100%; height: 100%; display: block; outline: none; touch-action: none; }
.sidebar {
  width: 300px; flex-shrink: 0; overflow-y: auto; padding: 12px 14px;
  background: #141a24; border-left: 1px solid #232c3c;
  display: flex; flex-direction: column; gap: 4px;
}
.hud-top {
  position: absolute; top: 10px; left: 12px; display: flex; gap: 10px; align-items: center;
  pointer-events: none;
}
.title { color: #e8eef5; font-size: 14px; font-weight: 600; text-shadow: 0 1px 3px #000; }
.engine {
  font-size: 10px; color: #9fd8ff; background: rgba(40, 120, 200, 0.25);
  border: 1px solid rgba(90, 160, 255, 0.4); border-radius: 4px; padding: 1px 6px;
}
.placing-tip {
  position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
  background: rgba(216, 145, 43, 0.9); color: #1a1206; font-size: 13px; font-weight: 600;
  padding: 6px 16px; border-radius: 6px; pointer-events: none;
}
.tooltip {
  position: absolute; pointer-events: none; z-index: 10;
  background: rgba(16, 22, 32, 0.92); border: 1px solid #3a4c6b; border-radius: 6px;
  padding: 6px 10px; font-size: 12px; color: #e8eef5; white-space: nowrap;
}
.tt-title { display: flex; align-items: center; gap: 6px; font-weight: 600; }
.tt-sub { color: #93a5bc; font-size: 11px; margin-top: 2px; }
.sw { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
</style>
