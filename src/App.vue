<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import TopBar from './components/TopBar.vue'
import TimelineBar from './components/TimelineBar.vue'
import RouteModule from './components/RouteModule.vue'
import VolumeModule from './components/VolumeModule.vue'
import SectionModule from './components/SectionModule.vue'
import { TerrainMesh } from './lib/scene/terrain'
import { WeatherScene } from './lib/scene/weatherScene'
import {
  attachScene,
  detachScene,
  disposePlayback,
  preloadAll,
  refreshCacheStatus,
  togglePlay,
  state,
  syncSceneOptions,
  terrain,
} from './store'

const viewport = ref<HTMLDivElement | null>(null)
const ready = ref(false)
const bootError = ref<string | null>(null)
let scene: WeatherScene | null = null

onMounted(async () => {
  try {
    const terrainMesh = new TerrainMesh(terrain)
    scene = new WeatherScene(viewport.value!, terrainMesh, {
      basemap: state.basemap,
      threshold: 0.26,
      tier: state.tier,
      opacity: 0.72,
      showVolume: state.showVolume,
      showCloudBase: state.showCloudBase,
      showRoute: state.showRoute,
      showSection: state.showSection,
      highlightRoute: state.highlightRoute,
      fogStrength: state.fogStrength,
    })
    scene.setPickHandler((wp) => {
      if (wp) {
        state.selectedId = wp.id
        scene?.setSelected(wp.id)
        if (state.module !== 'route') state.module = 'route'
      }
    })
    attachScene(scene)
    if (import.meta.env.DEV) {
      ;(window as unknown as Record<string, unknown>).__app = await import('./store')
      ;(window as unknown as Record<string, unknown>).__scene = scene
    }
    await refreshCacheStatus()
    void preloadAll()
    ready.value = true
  } catch (err) {
    bootError.value = err instanceof Error ? err.message : String(err)
    console.error(err)
  }
})

onBeforeUnmount(() => {
  disposePlayback()
  detachScene()
  scene?.dispose()
  scene = null
})

watch(
  () => [state.basemap, state.showRoute, state.highlightRoute],
  () => syncSceneOptions(),
)

function onKey(ev: KeyboardEvent): void {
  const tag = (ev.target as HTMLElement | null)?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  if (ev.key === '1') state.module = 'route'
  else if (ev.key === '2') state.module = 'volume'
  else if (ev.key === '3') state.module = 'section'
  else if (ev.key === ' ') {
    ev.preventDefault()
    togglePlay()
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="app">
    <TopBar />
    <main class="stage">
      <div ref="viewport" class="viewport" />
      <div class="vignette" />
      <div class="scanlines" />
      <RouteModule v-if="state.module === 'route'" :key="'route'" class="module-fade" />
      <VolumeModule v-if="state.module === 'volume'" :key="'volume'" class="module-fade" />
      <SectionModule v-if="state.module === 'section'" :key="'section'" class="module-fade" />

      <div v-if="!ready" class="boot">
        <div class="boot-inner">
          <div class="spinner" />
          <p>正在构建体积场景与分块纹理缓存…</p>
          <span v-if="bootError" class="err">{{ bootError }}</span>
        </div>
      </div>

      <div class="hud-corner tl" />
      <div class="hud-corner tr" />
      <div class="hud-corner bl" />
      <div class="hud-corner br" />
    </main>
    <TimelineBar />
  </div>
</template>

<style scoped>
.app {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: #050a11;
  overflow: hidden;
}
.stage {
  position: relative;
  flex: 1;
  min-height: 0;
}
.viewport {
  position: absolute;
  inset: 0;
}
.vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(2, 6, 10, 0.55) 100%);
}
.scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.045;
  background: repeating-linear-gradient(0deg, #9fd8ff 0px, #9fd8ff 1px, transparent 1px, transparent 3px);
}
.boot {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(4, 9, 14, 0.86);
  z-index: 40;
}
.boot-inner {
  text-align: center;
  color: rgba(160, 200, 225, 0.9);
  font-size: 11px;
}
.spinner {
  width: 32px;
  height: 32px;
  margin: 0 auto 14px;
  border-radius: 50%;
  border: 2px solid rgba(90, 160, 190, 0.2);
  border-top-color: #7fe4fa;
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.err {
  display: block;
  margin-top: 10px;
  font-family: var(--mono);
  font-size: 10px;
  color: #ff9a8f;
  max-width: 520px;
}
.hud-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(120, 200, 225, 0.28);
  pointer-events: none;
}
.hud-corner.tl {
  top: 8px;
  left: 8px;
  border-right: none;
  border-bottom: none;
}
.hud-corner.tr {
  top: 8px;
  right: 8px;
  border-left: none;
  border-bottom: none;
}
.hud-corner.bl {
  bottom: 8px;
  left: 8px;
  border-right: none;
  border-top: none;
}
.hud-corner.br {
  bottom: 8px;
  right: 8px;
  border-left: none;
  border-top: none;
}

</style>
