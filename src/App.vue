<script setup lang="ts">
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import Viewport from '@/components/Viewport.vue'
import TexturePanel from '@/components/TexturePanel.vue'
import AnnotationPanel from '@/components/AnnotationPanel.vue'
import type { ViewerProject } from '@/types'

const viewportRef = ref<InstanceType<typeof Viewport> | null>(null)

function onProjectLoaded(project: ViewerProject): void {
  viewportRef.value?.restoreProject(project)
}
</script>

<template>
  <div class="app-shell">
    <TopBar
      @import-project="(f: File) => viewportRef?.importProjectFile(f)"
      @import-model="viewportRef?.triggerModelImport()"
      @save-bookmark="viewportRef?.saveBookmark()"
      @goto-bookmark="(id: string) => viewportRef?.gotoBookmark(id)"
      @load-demo="viewportRef?.loadDemo()"
    />
    <div class="app-body">
      <Viewport ref="viewportRef" @project-loaded="onProjectLoaded" />
      <aside class="right-col">
        <TexturePanel />
        <AnnotationPanel @goto-bookmark="(id: string) => viewportRef?.gotoBookmark(id)" />
      </aside>
    </div>
  </div>
</template>
