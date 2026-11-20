<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { PlannedMove } from '@/types'
import { SceneEngine } from '@/engine/scene'
import { store, storeRaw } from '@/store/yardStore'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let engine: SceneEngine | null = null

onMounted(() => {
  engine = new SceneEngine(canvasRef.value!, storeRaw.yard.value)
  engine.onPick = (c) => storeRaw.select(c ? c.id : null)
  engine.setSelected(storeRaw.selectedId.value)
  engine.fitCamera(storeRaw.viewMode.value, true)
})

/** 数据模型变更后同步重建实例（同步触发，保证动画衔接一致） */
watch(
  () => storeRaw.version.value,
  () => engine?.renderInstances(),
  { flush: 'sync' }
)
watch(() => storeRaw.selectedId.value, (id) => engine?.setSelected(id))
watch(() => storeRaw.viewMode.value, (mode) => engine?.fitCamera(mode))

/** 翻箱播放令牌：每次开始翻箱驱动一轮动画 */
watch(() => storeRaw.playToken.value, async () => {
  if (!engine || !storeRaw.plan.value || storeRaw.playToken.value === 0) return
  await runPlayback(engine)
})

async function runPlayback(eng: SceneEngine): Promise<void> {
  const plan = storeRaw.plan.value!
  eng.setTarget(plan.targetId)
  eng.setBlockers(plan.moves.map((m: PlannedMove) => m.containerId))
  try {
    for (let i = 0; i < plan.moves.length; i++) {
      if (storeRaw.cancelled) break
      const move = plan.moves[i]
      storeRaw.playback.currentStep = i
      storeRaw.playback.movingContainerId = move.containerId
      // 已移走的箱不再标记为压箱
      eng.setBlockers(plan.moves.slice(i).map((m: PlannedMove) => m.containerId))
      await eng.animateMove(move)
      if (storeRaw.cancelled) break
      storeRaw.commitMove(i)
      storeRaw.playback.currentStep = i + 1
    }
  } finally {
    eng.setTarget(null)
    eng.setBlockers([])
    storeRaw.finishPlayback()
  }
}

function movingBoxNo(): string {
  const id = storeRaw.playback.movingContainerId
  const c = id ? storeRaw.yard.value.find(id) : null
  return c ? c.boxNo : '—'
}

onBeforeUnmount(() => engine?.dispose())
</script>

<template>
  <div class="canvas-wrap">
    <canvas ref="canvasRef"></canvas>

    <div v-if="store.playback.active" class="playback-hud">
      <div class="hud-title">
        <span class="hud-dot"></span>
        翻箱作业中
      </div>
      <div class="hud-row">
        <span>当前移动箱数</span>
        <strong>{{ store.playback.currentStep }} / {{ store.playback.totalSteps }}</strong>
      </div>
      <div class="hud-row">
        <span>剩余步数</span>
        <strong>{{ store.remainingSteps }}</strong>
      </div>
      <div class="hud-row">
        <span>移动箱号</span>
        <strong class="mono">{{ movingBoxNo() }}</strong>
      </div>
      <div class="hud-progress">
        <div
          class="hud-progress-bar"
          :style="{
            width:
              store.playback.totalSteps === 0
                ? '0%'
                : (store.playback.currentStep / store.playback.totalSteps) * 100 + '%'
          }"
        ></div>
      </div>
      <button class="btn btn-danger btn-block" @click="store.requestCancel()">
        中止翻箱
      </button>
    </div>

    <div class="canvas-hint">左键拖拽旋转 · 滚轮缩放 · 右键平移 · 点击箱体查看箱位信息</div>
  </div>
</template>
