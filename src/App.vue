<script setup lang="ts">
import YardCanvas from '@/components/YardCanvas.vue'
import GridPanel from '@/components/GridPanel.vue'
import ReshufflePanel from '@/components/ReshufflePanel.vue'
import StatePanel from '@/components/StatePanel.vue'
import { store, storeRaw } from '@/store/yardStore'
import type { ViewMode } from '@/types'

const modes: { key: ViewMode; label: string }[] = [
  { key: 'perspective', label: '透视图' },
  { key: 'top', label: '俯视图' },
  { key: 'side', label: '侧视图' }
]
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="brand">
        <div class="brand-mark">箱</div>
        <div>
          <h1>堆场箱区堆叠与翻箱可视化</h1>
          <p>Container Yard Stacking &amp; Rehandling Visualizer</p>
        </div>
      </div>

      <div class="header-right">
        <div class="view-switch" role="group" aria-label="视图切换">
          <button
            v-for="m in modes"
            :key="m.key"
            class="view-btn"
            :class="{ active: store.viewMode === m.key }"
            @click="store.viewMode = m.key"
          >
            {{ m.label }}
          </button>
        </div>
      </div>
    </header>

    <main class="app-main">
      <div class="stage">
        <YardCanvas />
        <div class="legend">
          <span><i class="sw sw-20"></i>20 尺箱</span>
          <span><i class="sw sw-40"></i>40 尺箱</span>
          <span><i class="sw sw-high"></i>层高 ≥ 5（半透明）</span>
          <span><i class="sw sw-sel"></i>选中</span>
          <span><i class="sw sw-target"></i>目标箱</span>
          <span><i class="sw sw-block"></i>压箱</span>
          <span><i class="sw sw-move"></i>移动中</span>
        </div>
      </div>

      <aside class="sidebar">
        <GridPanel />
        <ReshufflePanel />
        <StatePanel />
      </aside>
    </main>
  </div>
</template>
