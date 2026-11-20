<template>
  <div>
    <h2>等高线</h2>
    <div class="row">
      <label><input type="checkbox" v-model="state.contourEnabled" /> 显示等高线</label>
      <label><input type="checkbox" v-model="state.contourLabels" /> 高程标注</label>
    </div>
    <div class="row">
      <label>等高距</label>
      <input
        type="range"
        min="0.2"
        max="2"
        step="0.1"
        v-model.number="state.contourInterval"
      />
      <span class="val">{{ state.contourInterval.toFixed(1) }} m</span>
    </div>

    <h2>探方与剖切</h2>
    <div class="row">
      <button
        class="primary"
        :class="{ active: state.mode === 'rect' }"
        :disabled="!state.hasTerrain"
        @click="startRect"
      >
        {{ state.mode === 'rect' ? '点击地形对角点…' : '绘制矩形探方' }}
      </button>
      <button :disabled="!state.section" @click="clearSection">清除探方</button>
    </div>
    <template v-if="state.section">
      <div class="stat">
        探方尺寸:{{ rectW.toFixed(2) }} × {{ rectH.toFixed(2) }} m
      </div>
      <div class="row">
        <label><input type="checkbox" v-model="state.sectionEnabled" /> 启用剖切</label>
      </div>
      <div class="row">
        <label>剖切方向</label>
        <label>
          <input type="radio" value="x" v-model="state.section.dir" /> 沿 X(东西)
        </label>
        <label>
          <input type="radio" value="y" v-model="state.section.dir" /> 沿 Y(南北)
        </label>
      </div>
      <div class="row">
        <label>剖切位置</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.005"
          v-model.number="state.section.t"
          :disabled="!state.sectionEnabled"
        />
        <span class="val">{{ (state.section.t * 100).toFixed(0) }}%</span>
      </div>
      <div class="stat">提示:在视口中靠近剖切线按住左键可拖动平移剖切面</div>
    </template>

    <h2>距离测量</h2>
    <div class="row">
      <button
        class="primary"
        :class="{ active: state.mode === 'measure' }"
        :disabled="!state.hasTerrain"
        @click="startMeasure"
      >
        {{ state.mode === 'measure' ? '点击地形两点…' : '测量两点距离' }}
      </button>
      <button :disabled="!state.measureResult" @click="clearMeasure">清除</button>
    </div>
    <div v-if="state.measureResult" class="measure-result">
      水平距离:<b>{{ state.measureResult.dist.toFixed(3) }} m</b><br />
      高差:<b>{{ state.measureResult.dh >= 0 ? '+' : '' }}{{ state.measureResult.dh.toFixed(3) }} m</b><br />
      斜距:<b>{{ state.measureResult.slope.toFixed(3) }} m</b>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { state, viewerRef } from '../state'

const rectW = computed(() => (state.section ? state.section.x2 - state.section.x1 : 0))
const rectH = computed(() => (state.section ? state.section.y2 - state.section.y1 : 0))

function startRect() {
  state.mode = state.mode === 'rect' ? 'view' : 'rect'
}

function clearSection() {
  viewerRef.v?.clearSection()
}

function startMeasure() {
  state.mode = state.mode === 'measure' ? 'view' : 'measure'
}

function clearMeasure() {
  viewerRef.v?.clearMeasure()
}
</script>
