<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { store, storeRaw } from '@/store/yardStore'

const draft = reactive({
  bays: storeRaw.config.bays,
  rows: storeRaw.config.rows,
  tiers: storeRaw.config.tiers
})

// 外部导入状态导致 config 变化时同步草稿
watch(
  () => [storeRaw.config.bays, storeRaw.config.rows, storeRaw.config.tiers],
  () => {
    draft.bays = storeRaw.config.bays
    draft.rows = storeRaw.config.rows
    draft.tiers = storeRaw.config.tiers
  }
)

const stats = computed(() => {
  void storeRaw.version.value
  const all = storeRaw.yard.value.containers
  const c20 = all.filter((c: { size: number }) => c.size === 20).length
  const c40 = all.filter((c: { size: number }) => c.size === 40).length
  const slots = storeRaw.config.bays * storeRaw.config.rows * storeRaw.config.tiers
  return {
    total: all.length,
    c20,
    c40,
    slots,
    occupancy: slots === 0 ? 0 : Math.round((all.length / slots) * 100)
  }
})

function rebuild(): void {
  storeRaw.rebuild({ bays: draft.bays, rows: draft.rows, tiers: draft.tiers })
}

function clearYard(): void {
  if (confirm('确认清空整个箱区？此操作不可撤销。')) {
    storeRaw.clearYard()
  }
}
</script>

<template>
  <section class="panel">
    <header class="panel-header">
      <span class="panel-index">01</span>
      <h2>箱区网格</h2>
    </header>

    <div class="form-row">
      <label>
        贝位数量
        <input v-model.number="draft.bays" type="number" min="2" max="30" step="2" />
      </label>
      <label>
        排数
        <input v-model.number="draft.rows" type="number" min="1" max="12" />
      </label>
      <label>
        最大层高
        <input v-model.number="draft.tiers" type="number" min="1" max="10" />
      </label>
    </div>

    <div class="range-row">
      <input v-model.number="draft.bays" type="range" min="2" max="30" step="2" />
      <input v-model.number="draft.rows" type="range" min="1" max="12" />
      <input v-model.number="draft.tiers" type="range" min="1" max="10" />
    </div>

    <div class="btn-row">
      <button class="btn btn-primary" :disabled="store.isPlaying" @click="rebuild">
        生成箱区
      </button>
      <button class="btn" :disabled="store.isPlaying" @click="clearYard">清空箱区</button>
    </div>

    <div class="stat-grid">
      <div class="stat">
        <em>{{ stats.total }}</em>
        <span>在港箱量</span>
      </div>
      <div class="stat">
        <em>{{ stats.occupancy }}%</em>
        <span>占用率</span>
      </div>
      <div class="stat stat-20">
        <em>{{ stats.c20 }}</em>
        <span>20 尺</span>
      </div>
      <div class="stat stat-40">
        <em>{{ stats.c40 }}</em>
        <span>40 尺</span>
      </div>
    </div>

    <p class="tip">40 尺箱占连续两个贝位；层高 ≥ 5 的箱体以半透明显示。</p>
  </section>
</template>
