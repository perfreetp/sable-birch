<template>
  <div>
    <h2>点云数据</h2>
    <div class="row">
      <label class="file-btn">
        <button class="primary" @click="fileInput?.click()">加载点云</button>
        <input
          ref="fileInput"
          type="file"
          accept=".ply,.xyz,.txt,.csv,.pts"
          @change="onFile"
        />
      </label>
      <button @click="onSample">生成示例点云</button>
    </div>
    <div class="stat" v-if="state.rawCount > 0">
      文件:<b>{{ state.fileName }}</b><br />
      原始点数:<b>{{ state.rawCount.toLocaleString() }}</b><br />
      抽稀后点数:<b>{{ state.downsampledCount.toLocaleString() }}</b>
      <template v-if="state.rawCount > 0 && state.downsampledCount > 0">
        ({{ ((state.downsampledCount / state.rawCount) * 100).toFixed(1) }}%)
      </template>
    </div>

    <h2>体素抽稀</h2>
    <div class="row">
      <label v-for="v in voxelOptions" :key="v">
        <input type="radio" :value="v" v-model="state.voxelSize" />
        {{ v }} m
      </label>
    </div>
    <div class="stat" v-if="state.gridInfo">
      网格:<b>{{ state.gridInfo.nx }} × {{ state.gridInfo.ny }}</b
      ><br />
      高程范围:<b>{{ state.gridInfo.minH.toFixed(2) }} ~ {{ state.gridInfo.maxH.toFixed(2) }} m</b>
    </div>

    <h2>显示</h2>
    <div class="row">
      <label><input type="checkbox" v-model="state.showPoints" /> 点云</label>
      <label><input type="checkbox" v-model="state.showMesh" /> 地形网格</label>
    </div>
    <div class="row">
      <label>点源</label>
      <label><input type="radio" value="down" v-model="state.pointsSource" /> 抽稀</label>
      <label><input type="radio" value="raw" v-model="state.pointsSource" /> 原始</label>
    </div>
    <div class="row">
      <label>点大小</label>
      <input type="range" min="1" max="8" step="0.5" v-model.number="state.pointSize" />
      <span class="val">{{ state.pointSize.toFixed(1) }}</span>
    </div>

    <h2>工程</h2>
    <div class="row">
      <button :disabled="!state.hasTerrain" @click="onExport">导出工程</button>
      <label class="file-btn">
        <button @click="importInput?.click()">导入工程</button>
        <input ref="importInput" type="file" accept=".json" @change="onImport" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { state, viewerRef } from '../state'
import { parsePointFile, generateSampleSite } from '../three/pointcloud'
import { exportProject, importProject } from '../three/io'

const voxelOptions = [0.1, 0.25, 0.5, 1.0]
const fileInput = ref<HTMLInputElement | null>(null)
const importInput = ref<HTMLInputElement | null>(null)

async function onFile(ev: Event) {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !viewerRef.v) return
  try {
    state.status = `正在解析 ${file.name} …`
    const buf = await file.arrayBuffer()
    const pts = parsePointFile(file.name, buf)
    viewerRef.v.setPointCloud(pts, file.name)
  } catch (e: any) {
    state.status = `加载失败: ${e?.message ?? e}`
  }
}

function onSample() {
  if (!viewerRef.v) return
  const pts = generateSampleSite()
  viewerRef.v.setPointCloud(pts, '示例遗址点云')
}

function onExport() {
  if (viewerRef.v) exportProject(viewerRef.v)
}

async function onImport(ev: Event) {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !viewerRef.v) return
  try {
    await importProject(file, viewerRef.v)
  } catch (e: any) {
    state.status = `导入失败: ${e?.message ?? e}`
  }
}
</script>
