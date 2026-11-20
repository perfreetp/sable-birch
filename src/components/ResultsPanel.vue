<script setup lang="ts">
/**
 * 评估结果面板:穿透障碍物列表 + 热力统计
 */
import { computed } from 'vue'
import { state } from '../state'
import { HEAT_LEVELS } from '../types'

const obstacles = computed(() => state.results?.obstacles ?? [])
const heat = computed(() => state.results?.heatmap ?? null)

function approachColor(id: number) {
  return state.approaches[id]?.color ?? '#fff'
}
</script>

<template>
  <div class="results">
    <h2>
      穿透障碍物
      <span class="badge" :class="{ danger: obstacles.length > 0 }">{{ obstacles.length }}</span>
    </h2>
    <div v-if="obstacles.length === 0" class="ok">净空面内无穿透障碍物 ✓</div>
    <div v-else class="list">
      <div v-for="o in obstacles" :key="`${o.approachId}-${o.buildingId}`" class="item">
        <span class="dot" :style="{ background: approachColor(o.approachId) }"></span>
        <span class="bid">建筑 #{{ o.buildingId }}</span>
        <span class="depth">穿透 {{ o.depth.toFixed(1) }}m</span>
        <span class="sub">顶 {{ o.topHeight.toFixed(0) }}m / 面 {{ o.surfaceHeight.toFixed(0) }}m / 距 {{ o.distance }}m</span>
      </div>
    </div>

    <h2>热力覆盖</h2>
    <div v-if="heat" class="heat">
      <div class="row">覆盖网格 {{ heat.coveredCells }} / {{ heat.totalCells }}</div>
      <div class="row">最低覆盖高度 {{ heat.minHeight }} m</div>
      <div class="legend">
        <div v-for="(lv, i) in HEAT_LEVELS" :key="i" class="lg-row">
          <span class="sw" :style="{ background: `rgb(${lv.color.map(c => Math.round(c * 255)).join(',')})` }"></span>
          <span class="lg-label">{{ lv.label }}</span>
          <span class="lg-count">{{ heat.levelCounts[i] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 { font-size: 12px; color: #8fa3bd; margin: 10px 0 4px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 6px; }
.badge { background: #2c4a35; color: #7fe0a0; border-radius: 8px; padding: 1px 8px; font-size: 11px; }
.badge.danger { background: #5a2222; color: #ff9c9c; }
.ok { color: #7fe0a0; font-size: 12px; padding: 4px 0; }
.list { max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 3px; }
.item {
  display: grid; grid-template-columns: 12px 1fr auto; gap: 2px 6px; align-items: center;
  background: rgba(255, 80, 80, 0.08); border: 1px solid rgba(255, 90, 90, 0.25);
  border-radius: 5px; padding: 4px 6px; font-size: 12px; color: #e8eef5;
}
.dot { width: 9px; height: 9px; border-radius: 50%; }
.bid { font-weight: 600; }
.depth { color: #ff9c9c; font-weight: 700; font-variant-numeric: tabular-nums; }
.sub { grid-column: 2 / 4; color: #93a5bc; font-size: 11px; }
.heat .row { font-size: 12px; color: #cfd8e3; padding: 1px 0; }
.legend { margin-top: 6px; display: flex; flex-direction: column; gap: 3px; }
.lg-row { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #b9c7d8; }
.sw { width: 14px; height: 10px; border-radius: 2px; }
.lg-label { flex: 1; }
.lg-count { font-variant-numeric: tabular-nums; }
</style>
