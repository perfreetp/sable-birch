<script setup lang="ts">
import { computed } from 'vue'
import { store, storeRaw } from '@/store/yardStore'
import { TRANSPARENT_TIER } from '@/engine/layout'

const selected = computed(() => storeRaw.selected.value)
const stack = computed(() => storeRaw.selectedStack.value)
const blockers = computed(() => storeRaw.blockerIds.value)
const plan = computed(() => storeRaw.plan.value)

function boxNoOf(id: string): string {
  return storeRaw.yard.value.find(id)?.boxNo ?? id
}

function makePlan(): void {
  storeRaw.computePlan()
}

function play(): void {
  storeRaw.startPlayback()
}
</script>

<template>
  <section class="panel">
    <header class="panel-header">
      <span class="panel-index">02</span>
      <h2>翻箱操作</h2>
    </header>

    <div v-if="!selected" class="empty-hint">
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 7v10l9 4 9-4V7" />
        <path d="M12 11v10" />
      </svg>
      <p>点击 3D 场景中的箱体<br />查看箱位堆叠信息</p>
    </div>

    <template v-else>
      <div class="slot-card">
        <div class="slot-head">
          <span class="box-no mono">{{ selected.boxNo }}</span>
          <span class="badge" :class="selected.size === 40 ? 'badge-40' : 'badge-20'">
            {{ selected.size }} 尺
          </span>
        </div>
        <div class="coord-grid">
          <div><span>贝位</span><strong>B{{ selected.bay }}<template v-if="selected.size === 40">–B{{ selected.bay + 1 }}</template></strong></div>
          <div><span>排</span><strong>R{{ selected.row }}</strong></div>
          <div><span>层</span><strong>T{{ selected.tier }}（第 {{ selected.tier + 1 }} 层）</strong></div>
          <div><span>栈高</span><strong>{{ stack.length }} 层</strong></div>
        </div>
        <div v-if="selected.tier >= TRANSPARENT_TIER" class="warn">该箱位于高位（≥ 5 层），场景中以半透明区分</div>
      </div>

      <div class="blocker-box">
        <div class="blocker-title">
          上方压箱
          <span class="count" :class="{ zero: blockers.length === 0 }">{{ blockers.length }}</span>
        </div>
        <ul v-if="blockers.length" class="blocker-list">
          <li v-for="id in blockers" :key="id">
            <span class="mono">{{ boxNoOf(id) }}</span>
            <span class="muted">需移走</span>
          </li>
        </ul>
        <p v-else class="muted ok-text">该箱位于栈顶，可直接提箱，无需翻箱</p>
      </div>

      <div class="btn-row">
        <button
          class="btn btn-primary"
          :disabled="store.isPlaying || blockers.length === 0"
          @click="makePlan"
        >
          计算翻箱路径
        </button>
        <button class="btn" :disabled="store.isPlaying" @click="store.select(null)">
          取消选中
        </button>
      </div>

      <p v-if="store.planError" class="error">{{ store.planError }}</p>

      <div v-if="plan" class="plan-box">
        <div class="plan-head">
          翻箱计划 · 共 {{ plan.moves.length }} 步
        </div>
        <ol class="plan-list">
          <li v-for="(m, i) in plan.moves" :key="i">
            <span class="step-no">{{ i + 1 }}</span>
            <span class="mono">{{ boxNoOf(m.containerId) }}</span>
            <span class="arrow">
              B{{ m.from.bay }}/R{{ m.from.row }}/T{{ m.from.tier }}
              → B{{ m.to.bay }}/R{{ m.to.row }}/T{{ m.to.tier }}
            </span>
          </li>
        </ol>
        <button class="btn btn-accent btn-block" :disabled="store.isPlaying" @click="play">
          开始翻箱动画
        </button>
      </div>

      <div v-if="store.playback.active" class="playing-tip">
        动画播放中：已移动 {{ store.playback.currentStep }} 箱，剩余
        {{ store.remainingSteps }} 步
      </div>
    </template>
  </section>
</template>
