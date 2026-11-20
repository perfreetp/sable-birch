<script setup lang="ts">
/**
 * 控制面板:起降场位置/旋转、视锥参数、视角切换、导出导入
 */
import { state } from '../state'
import { downloadExport, pickImportFile } from '../utils/file'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'top-view'): void
  (e: 'approach-view', id: number): void
}>()

const importError = ref('')

function onImport() {
  importError.value = ''
  pickImportFile(msg => { importError.value = msg })
}
</script>

<template>
  <div class="panel">
    <h2>起降场</h2>
    <div class="row">
      <button class="btn" :class="{ warn: state.placing }" @click="state.placing = !state.placing">
        {{ state.placing ? '点击地面放置…' : '移动位置' }}
      </button>
      <span class="coord">X {{ Math.round(state.vertiport.x) }} / Z {{ Math.round(state.vertiport.z) }}</span>
    </div>
    <div class="row">
      <label>标高</label>
      <span class="coord">{{ state.vertiport.elevation.toFixed(1) }} m</span>
    </div>
    <div class="row">
      <label>旋转角</label>
      <input type="range" min="0" max="359" v-model.number="state.vertiport.rotation" />
      <span class="val">{{ state.vertiport.rotation }}°</span>
    </div>

    <h2>视锥参数</h2>
    <div class="row">
      <label>长度</label>
      <input type="range" min="200" max="1500" step="50" v-model.number="state.coneParams.length" />
      <span class="val">{{ state.coneParams.length }}m</span>
    </div>
    <div class="row">
      <label>下滑角</label>
      <input type="range" min="3" max="15" step="0.5" v-model.number="state.coneParams.slopeDeg" />
      <span class="val">{{ state.coneParams.slopeDeg }}°</span>
    </div>
    <div class="row">
      <label>扩散半角</label>
      <input type="range" min="2" max="15" step="0.5" v-model.number="state.coneParams.divergenceDeg" />
      <span class="val">{{ state.coneParams.divergenceDeg }}°</span>
    </div>

    <h2>视角</h2>
    <div class="row">
      <button class="btn" :class="{ on: state.viewMode === 'orbit' }" @click="emit('top-view')">俯视</button>
      <button v-for="ap in state.approaches" :key="ap.id" class="btn"
              :class="{ on: state.viewMode === 'approach' && state.activeApproach === ap.id }"
              :style="{ borderColor: ap.color }"
              @click="emit('approach-view', ap.id)">
        进近{{ ap.id + 1 }}
      </button>
    </div>

    <h2>数据</h2>
    <div class="row">
      <button class="btn primary" @click="downloadExport">导出评估结果</button>
      <button class="btn" @click="onImport">载入文件</button>
    </div>
    <div v-if="importError" class="error">{{ importError }}</div>
  </div>
</template>

<style scoped>
.panel { display: flex; flex-direction: column; gap: 4px; }
h2 { font-size: 12px; color: #8fa3bd; margin: 10px 0 4px; text-transform: uppercase; letter-spacing: 1px; }
.row { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #cfd8e3; flex-wrap: wrap; }
label { width: 52px; flex-shrink: 0; color: #9fb0c5; }
.val { min-width: 48px; text-align: right; font-variant-numeric: tabular-nums; }
.coord { font-variant-numeric: tabular-nums; }
input[type="range"] { flex: 1; min-width: 80px; accent-color: #4da3ff; }
.btn {
  background: #22304a; color: #dfe8f2; border: 1px solid #3a4c6b; border-radius: 6px;
  padding: 5px 12px; font-size: 12px; cursor: pointer;
}
.btn:hover { background: #2c3f60; }
.btn.on { background: #2f5f9e; border-color: #5aa0ff; }
.btn.warn { background: #7a4a12; border-color: #d8912b; }
.btn.primary { background: #1f6f43; border-color: #35a465; }
.btn.primary:hover { background: #268552; }
.error { color: #ff7b7b; font-size: 12px; margin-top: 4px; }
</style>
