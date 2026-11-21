<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  addWaypoint,
  legs,
  moveWaypoint,
  removeWaypoint,
  randomizeRoute,
  reorderWaypoints,
  routeKm,
  selectWaypoint,
  state,
  terrain,
  updateWaypoint,
} from '../store'
import { DOMAIN } from '../lib/weather'

const dragId = ref<string | null>(null)

const total = computed(() => legs.value.reduce((m, l) => m + l.length, 0))

function groundAt(w: { x: number; z: number }): number {
  return Math.round(terrain.heightAt(w.x, w.z))
}

function clampX(v: number): number {
  return Math.max(-DOMAIN.halfX + 200, Math.min(DOMAIN.halfX - 200, v))
}
function clampZ(v: number): number {
  return Math.max(-DOMAIN.halfZ + 200, Math.min(DOMAIN.halfZ - 200, v))
}

function setX(id: string, v: number): void {
  updateWaypoint(id, { x: Math.round(clampX(v)) })
}
function setZ(id: string, v: number): void {
  updateWaypoint(id, { z: Math.round(clampZ(v)) })
}

const selected = computed(() => state.waypoints.find((w) => w.id === state.selectedId) ?? null)

function dragStart(id: string, ev: DragEvent): void {
  dragId.value = id
  ev.dataTransfer?.setData('text/plain', id)
  if (ev.dataTransfer) ev.dataTransfer.effectAllowed = 'move'
}
function dropOn(id: string): void {
  const from = dragId.value
  dragId.value = null
  if (!from || from === id) return
  reorderWaypoints(from, id)
}
</script>

<template>
  <div class="route-module">
    <aside class="panel left">
      <header class="panel-head">
        <div>
          <h2>航路编辑</h2>
          <p class="sub">WAYPOINTS &amp; ALTITUDE BAND</p>
        </div>
        <button class="ghost" title="重置为标准航路" @click="randomizeRoute">重置</button>
      </header>

      <div class="summary">
        <div class="stat">
          <span class="k">航路总长</span>
          <span class="v">{{ routeKm.toFixed(2) }}<em>km</em></span>
        </div>
        <div class="stat">
          <span class="k">航路点</span>
          <span class="v">{{ state.waypoints.length }}<em>个</em></span>
        </div>
        <div class="stat">
          <span class="k">高度带</span>
          <span class="v">
            {{ Math.min(...state.waypoints.map((w) => w.altMin)) }}–{{
              Math.max(...state.waypoints.map((w) => w.altMax))
            }}<em>m</em>
          </span>
        </div>
      </div>

      <div class="wp-list">
        <div
          v-for="(w, i) in state.waypoints"
          :key="w.id"
          class="wp"
          :class="{ active: w.id === state.selectedId, dragging: dragId === w.id }"
          draggable="true"
          @click="selectWaypoint(w.id)"
          @dragstart="dragStart(w.id, $event)"
          @dragover.prevent
          @drop="dropOn(w.id)"
        >
          <div class="index">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="wp-body">
            <input
              class="name-input"
              :value="w.name"
              @input="updateWaypoint(w.id, { name: ($event.target as HTMLInputElement).value })"
              @click.stop
            />
            <div class="wp-meta">
              <span>E {{ (w.x / 1000).toFixed(2) }} km</span>
              <span>N {{ (w.z / 1000).toFixed(2) }} km</span>
              <span class="ground">地面 {{ groundAt(w) }} m</span>
            </div>
          </div>
          <div class="wp-actions">
            <button class="icon" title="上移" @click.stop="moveWaypoint(w.id, -1)">↑</button>
            <button class="icon" title="下移" @click.stop="moveWaypoint(w.id, 1)">↓</button>
            <button
              class="icon danger"
              title="删除"
              :disabled="state.waypoints.length <= 2"
              @click.stop="removeWaypoint(w.id)"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <button class="add" @click="addWaypoint">＋ 添加航路点</button>

      <div class="hint">
        在三维视图中<strong>双击</strong>地面可拾取最近的航路点并高亮；拖动左侧列表可调整顺序。
      </div>
    </aside>

    <aside class="panel right">
      <template v-if="selected">
        <header class="panel-head">
          <div>
            <h2>{{ selected.name }}</h2>
            <p class="sub">EDIT WAYPOINT</p>
          </div>
          <span class="chip">{{ selected.id.toUpperCase() }}</span>
        </header>

        <div class="field">
          <label>东西偏移 X <em>m</em></label>
          <input
            type="range"
            :min="-DOMAIN.halfX + 200"
            :max="DOMAIN.halfX - 200"
            step="50"
            :value="selected.x"
            @input="setX(selected.id, Number(($event.target as HTMLInputElement).value))"
          />
          <div class="num">
            <input
              type="number"
              :value="selected.x"
              step="50"
              @input="setX(selected.id, Number(($event.target as HTMLInputElement).value))"
            />
            <span class="unit">m</span>
          </div>
        </div>

        <div class="field">
          <label>南北偏移 Z <em>m</em></label>
          <input
            type="range"
            :min="-DOMAIN.halfZ + 200"
            :max="DOMAIN.halfZ - 200"
            step="50"
            :value="selected.z"
            @input="setZ(selected.id, Number(($event.target as HTMLInputElement).value))"
          />
          <div class="num">
            <input
              type="number"
              :value="selected.z"
              step="50"
              @input="setZ(selected.id, Number(($event.target as HTMLInputElement).value))"
            />
            <span class="unit">m</span>
          </div>
        </div>

        <div class="field">
          <label>高度带下界 <em>m MSL</em></label>
          <input
            type="range"
            min="100"
            max="6500"
            step="50"
            :value="selected.altMin"
            @input="
              updateWaypoint(selected.id, { altMin: Number(($event.target as HTMLInputElement).value) })
            "
          />
          <div class="num">
            <input
              type="number"
              :value="selected.altMin"
              step="50"
              min="100"
              max="6500"
              @input="
                updateWaypoint(selected.id, { altMin: Number(($event.target as HTMLInputElement).value) })
              "
            />
            <span class="unit">m</span>
          </div>
        </div>

        <div class="field">
          <label>高度带上界 <em>m MSL</em></label>
          <input
            type="range"
            min="200"
            max="7000"
            step="50"
            :value="selected.altMax"
            @input="
              updateWaypoint(selected.id, { altMax: Number(($event.target as HTMLInputElement).value) })
            "
          />
          <div class="num">
            <input
              type="number"
              :value="selected.altMax"
              step="50"
              min="200"
              max="7000"
              @input="
                updateWaypoint(selected.id, { altMax: Number(($event.target as HTMLInputElement).value) })
              "
            />
            <span class="unit">m</span>
          </div>
        </div>

        <div class="band-gauge">
          <div class="gauge-label">高度带 {{ selected.altMax - selected.altMin }} m</div>
          <div class="gauge-track">
            <div
              class="gauge-fill"
              :style="{
                bottom: `${(selected.altMin / 7000) * 100}%`,
                height: `${((selected.altMax - selected.altMin) / 7000) * 100}%`,
              }"
            />
            <div class="gauge-msa" :style="{ bottom: `${(terrain.msaAt(selected.x, selected.z) / 7000) * 100}%` }">
              <span>MSA {{ Math.round(terrain.msaAt(selected.x, selected.z)) }}</span>
            </div>
          </div>
          <div class="gauge-foot">
            地面 {{ groundAt(selected) }} m · 最低安全高度
            {{ Math.round(terrain.msaAt(selected.x, selected.z)) }} m
          </div>
        </div>
      </template>
      <template v-else>
        <div class="empty">请在左侧选择一个航路点</div>
      </template>

      <div class="legs">
        <h3>航路段</h3>
        <div v-for="leg in legs" :key="leg.index" class="leg">
          <span class="badge">L{{ leg.index + 1 }}</span>
          <span class="leg-name">{{ leg.label }}</span>
          <span class="leg-len">{{ (leg.length / 1000).toFixed(2) }} km</span>
          <span class="leg-brg">{{ leg.bearing.toFixed(0) }}°</span>
        </div>
        <div class="legs-total">合计 {{ (total / 1000).toFixed(2) }} km</div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.route-module {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.panel {
  position: absolute;
  top: 14px;
  bottom: 14px;
  width: 296px;
  pointer-events: auto;
  background: linear-gradient(180deg, rgba(10, 20, 30, 0.94), rgba(7, 14, 22, 0.96));
  border: 1px solid rgba(86, 128, 158, 0.28);
  border-radius: 12px;
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  padding: 14px;
  overflow-y: auto;
  gap: 12px;
}
.panel.left {
  left: 14px;
  width: 318px;
}
.panel.right {
  right: 14px;
}
.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
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
  font-family: var(--mono);
  font-size: 9px;
  padding: 3px 7px;
  border-radius: 4px;
  background: rgba(80, 200, 230, 0.12);
  color: #7fe3f5;
  border: 1px solid rgba(80, 200, 230, 0.3);
}
.ghost {
  background: transparent;
  border: 1px solid rgba(120, 160, 190, 0.35);
  color: #9fc4dc;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  cursor: pointer;
}
.ghost:hover {
  border-color: rgba(120, 210, 240, 0.7);
  color: #cdeefc;
}
.summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.stat {
  background: rgba(20, 36, 50, 0.5);
  border: 1px solid rgba(80, 120, 150, 0.2);
  border-radius: 8px;
  padding: 7px 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.stat .k {
  font-size: 9px;
  color: rgba(140, 175, 200, 0.75);
}
.stat .v {
  font-family: var(--mono);
  font-size: 14px;
  color: #e7f4ff;
}
.stat .v em {
  font-style: normal;
  font-size: 9px;
  margin-left: 2px;
  color: rgba(140, 175, 200, 0.7);
}
.wp-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.wp {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  padding: 6px 8px;
  border: 1px solid transparent;
  background: rgba(16, 28, 40, 0.55);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.wp:hover {
  background: rgba(24, 42, 58, 0.7);
}
.wp.active {
  border-color: rgba(86, 212, 240, 0.65);
  background: rgba(26, 54, 70, 0.7);
  box-shadow: inset 0 0 0 1px rgba(86, 212, 240, 0.15);
}
.wp.dragging {
  opacity: 0.4;
}
.index {
  font-family: var(--mono);
  font-size: 10px;
  color: #6fd4ea;
  width: 18px;
}
.wp-body {
  flex: 1;
  min-width: 0;
}
.name-input {
  width: 100%;
  background: transparent;
  border: none;
  color: #dcecf8;
  font-size: 12px;
  padding: 0;
  outline: none;
}
.name-input:focus {
  color: #fff;
  text-shadow: 0 0 8px rgba(120, 220, 255, 0.5);
}
.wp-meta {
  display: flex;
  gap: 8px;
  margin-top: 3px;
  font-family: var(--mono);
  font-size: 9px;
  color: rgba(130, 165, 190, 0.72);
}
.ground {
  color: rgba(255, 190, 100, 0.72);
}
.wp-actions {
  display: flex;
  gap: 2px;
}
.icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(90, 130, 160, 0.3);
  background: rgba(10, 20, 28, 0.6);
  color: #9fc4dc;
  font-size: 10px;
  cursor: pointer;
  line-height: 1;
}
.icon:hover {
  border-color: rgba(120, 220, 245, 0.6);
  color: #d8f6ff;
}
.icon.danger:hover {
  border-color: rgba(255, 110, 100, 0.7);
  color: #ff9a8f;
}
.icon:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}
.add {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px dashed rgba(96, 160, 190, 0.4);
  background: rgba(16, 32, 44, 0.4);
  color: #8fd8ec;
  font-size: 12px;
  cursor: pointer;
}
.add:hover {
  border-color: rgba(120, 220, 245, 0.8);
  background: rgba(24, 50, 64, 0.6);
}
.hint {
  font-size: 10px;
  line-height: 1.6;
  color: rgba(125, 160, 188, 0.7);
}
.hint strong {
  color: #9fe6f8;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.field label {
  font-size: 10px;
  color: rgba(150, 182, 206, 0.85);
  display: flex;
  justify-content: space-between;
}
.field label em {
  font-style: normal;
  font-family: var(--mono);
  color: rgba(120, 200, 225, 0.7);
}
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(80, 200, 230, 0.65), rgba(80, 140, 180, 0.3));
  outline: none;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #9fe8ff;
  border: 2px solid #0a1620;
  box-shadow: 0 0 8px rgba(110, 220, 255, 0.7);
  cursor: pointer;
}
.num {
  display: flex;
  align-items: center;
  gap: 4px;
}
.num input {
  flex: 1;
  background: rgba(8, 16, 24, 0.8);
  border: 1px solid rgba(80, 120, 150, 0.3);
  border-radius: 5px;
  color: #dff1ff;
  font-family: var(--mono);
  font-size: 11px;
  padding: 4px 6px;
  outline: none;
}
.num input:focus {
  border-color: rgba(110, 210, 240, 0.7);
}
.unit {
  font-family: var(--mono);
  font-size: 9px;
  color: rgba(130, 165, 190, 0.7);
  width: 22px;
}
.band-gauge {
  background: rgba(14, 26, 38, 0.6);
  border: 1px solid rgba(80, 120, 150, 0.22);
  border-radius: 8px;
  padding: 9px;
  margin-top: 2px;
}
.gauge-label {
  font-size: 10px;
  color: rgba(160, 194, 216, 0.9);
  margin-bottom: 6px;
}
.gauge-track {
  position: relative;
  height: 78px;
  border-radius: 4px;
  background: linear-gradient(180deg, rgba(20, 40, 56, 0.7), rgba(10, 20, 30, 0.7));
  overflow: hidden;
}
.gauge-fill {
  position: absolute;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(80, 200, 230, 0.35), rgba(60, 140, 190, 0.2));
  border-top: 1px solid rgba(120, 225, 250, 0.75);
  border-bottom: 1px solid rgba(120, 225, 250, 0.75);
}
.gauge-msa {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1.5px dashed rgba(255, 176, 74, 0.9);
}
.gauge-msa span {
  position: absolute;
  right: 4px;
  top: -11px;
  font-family: var(--mono);
  font-size: 8px;
  color: rgba(255, 190, 100, 0.95);
}
.gauge-foot {
  margin-top: 6px;
  font-family: var(--mono);
  font-size: 9px;
  color: rgba(130, 165, 190, 0.72);
}
.legs {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.legs h3 {
  margin: 0 0 4px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  color: rgba(140, 180, 210, 0.8);
}
.leg {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  padding: 3px 0;
}
.badge {
  font-family: var(--mono);
  font-size: 8px;
  padding: 1px 4px;
  border-radius: 3px;
  background: rgba(80, 200, 230, 0.14);
  color: #7fe3f5;
}
.leg-name {
  flex: 1;
  color: rgba(190, 214, 232, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.leg-len,
.leg-brg {
  font-family: var(--mono);
  font-size: 9px;
  color: rgba(130, 165, 190, 0.8);
}
.legs-total {
  font-family: var(--mono);
  font-size: 9px;
  color: rgba(130, 200, 220, 0.7);
  text-align: right;
  margin-top: 4px;
}
.empty {
  color: rgba(130, 165, 190, 0.6);
  font-size: 11px;
  padding: 20px 0;
  text-align: center;
}
</style>
