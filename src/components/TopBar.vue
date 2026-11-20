<script setup lang="ts">
import { computed } from 'vue'
import { useViewerStore } from '@/stores/viewer'
import type { ViewerProject } from '@/types'
import { exportProject } from '@/services/projectIO'

const store = useViewerStore()

const tiers = Array.from({ length: 8 }, (_, i) => i + 1)

const emit = defineEmits<{
  (e: 'import-project', file: File): void
  (e: 'import-model'): void
  (e: 'save-bookmark'): void
  (e: 'goto-bookmark', id: string): void
  (e: 'load-demo'): void
}>()

const autoLabel = computed(() => (store.autoTier ? `自动 · 实际 ${store.activeTier} 档` : `手动锁定 ${store.tier} 档`))

function pickTier(t: number): void {
  store.autoTier = false
  store.tier = t
}

function onProjectFile(ev: Event): void {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) emit('import-project', file)
  input.value = ''
}

function doExport(): void {
  const project: ViewerProject = {
    format: 'artifact-viewer-project',
    version: 1,
    model: store.modelRef,
    annotations: store.annotations.map((a) => ({ ...a })),
    bookmarks: store.bookmarks.map((b) => ({ ...b })),
    view: {
      tier: store.tier,
      autoTier: store.autoTier,
      channelDiffuse: store.channelDiffuse,
      channelNormal: store.channelNormal,
      ambient: store.ambient,
    },
    exportedAt: Date.now(),
  }
  exportProject(project)
  store.showToast('工程文件已导出')
}
</script>

<template>
  <header class="topbar">
    <div class="brand">
      文物高精纹理查看器
      <span class="sub">three.js · potree-core</span>
    </div>

    <div class="top-divider"></div>

    <div class="tier-control">
      <span>纹理档位</span>
      <div class="tier-steps">
        <button
          v-for="t in tiers"
          :key="t"
          class="tier-dot"
          :class="{ active: !store.autoTier && store.tier === t, 'current-auto': store.autoTier && store.activeTier === t }"
          :title="`${t} 档${t === 1 ? '（最粗）' : t === 8 ? '（最精）' : ''}`"
          @click="pickTier(t)"
        >
          {{ t }}
        </button>
      </div>
      <label style="display: flex; align-items: center; gap: 5px; color: var(--fg-2); font-size: 11px">
        <input type="checkbox" v-model="store.autoTier" />
        随视距自动
      </label>
      <span style="color: var(--fg-2); font-size: 11px; min-width: 110px">{{ autoLabel }}</span>
    </div>

    <div class="top-divider"></div>

    <button class="icon-btn" title="保存当前相机位姿与档位为书签" @click="emit('save-bookmark')">
      ☆ 存书签
    </button>
    <div class="bookmarks-wrap">
      <span
        v-for="bm in store.bookmarks"
        :key="bm.id"
        class="bookmark-chip"
        :title="`回到 ${bm.name}（${bm.tier} 档）`"
        @click="emit('goto-bookmark', bm.id)"
      >
        📍 {{ bm.name }}
        <i class="x" @click.stop="store.removeBookmark(bm.id)">✕</i>
      </span>
      <span v-if="store.bookmarks.length === 0" style="color: var(--fg-2); font-size: 11px; align-self: center">
        暂无书签
      </span>
    </div>

    <div class="top-divider"></div>

    <button class="icon-btn" @click="emit('load-demo')">演示文物</button>
    <button class="icon-btn" @click="emit('import-model')">导入模型</button>
    <button class="icon-btn primary" @click="doExport">导出工程</button>
    <label class="icon-btn" style="display: inline-grid; place-items: center">
      导入工程
      <input type="file" accept=".json,application/json" style="display: none" @change="onProjectFile" />
    </label>
  </header>
</template>
