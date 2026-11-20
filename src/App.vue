<template>
  <div class="app">
    <LeftPanel class="panel left" />
    <div ref="viewportRef" class="viewport">
      <div v-if="state.mode !== 'view'" class="hint">{{ modeHint }}</div>
      <ProfileChart v-if="state.profile && state.sectionEnabled" />
      <div class="statusbar">{{ state.status }}</div>
    </div>
    <RightPanel class="panel right" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import LeftPanel from './components/LeftPanel.vue'
import RightPanel from './components/RightPanel.vue'
import ProfileChart from './components/ProfileChart.vue'
import { state, viewerRef } from './state'
import { Viewer } from './three/Viewer'

const viewportRef = ref<HTMLElement | null>(null)

const modeHint = computed(() =>
  state.mode === 'rect'
    ? '探方绘制:在地形上点击两个对角点'
    : '距离测量:在地形上点击起点与终点',
)

onMounted(() => {
  const viewer = new Viewer(viewportRef.value!)
  viewerRef.v = viewer
})

onBeforeUnmount(() => {
  viewerRef.v?.dispose()
  viewerRef.v = null
})

watch(() => state.pointSize, v => viewerRef.v?.setPointSize(v))
watch(() => state.showPoints, v => viewerRef.v?.setPointsVisible(v))
watch(() => state.showMesh, v => viewerRef.v?.setMeshVisible(v))
watch(() => state.pointsSource, () => viewerRef.v?.refreshPoints())
watch(
  () => [state.contourEnabled, state.contourInterval, state.contourLabels],
  () => viewerRef.v?.rebuildContours(),
)
watch(() => state.voxelSize, () => viewerRef.v?.rebuildTerrain())
watch(() => state.section, () => viewerRef.v?.updateSection(), { deep: true })
watch(() => state.sectionEnabled, () => viewerRef.v?.updateSection())
watch(() => state.mode, () => viewerRef.v?.onModeChange())
</script>
