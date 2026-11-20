<script setup lang="ts">
import { ref } from 'vue'
import { store, storeRaw, STORAGE_KEY } from '@/store/yardStore'
import { Yard } from '@/engine/yard'

const fileInput = ref<HTMLInputElement | null>(null)
const importMsg = ref<{ ok: boolean; text: string } | null>(null)

function doExport(): void {
  storeRaw.exportState()
  importMsg.value = { ok: true, text: '状态文件已导出到下载目录' }
}

function triggerImport(): void {
  fileInput.value?.click()
}

async function onFile(e: Event): Promise<void> {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const err = await storeRaw.importState(file)
  importMsg.value = err
    ? { ok: false, text: err }
    : { ok: true, text: `已导入 ${file.name}（${storeRaw.yard.value.containers.length} 个箱）` }
  input.value = ''
}

function storageInfo(): string {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return '暂无本地存档'
  try {
    const state = JSON.parse(raw)
    const t = new Date(state.savedAt)
    return `已保存 ${state.containers.length} 箱 · ${t.toLocaleString()}`
  } catch {
    return '存档解析异常'
  }
}

function clearStorage(): void {
  if (confirm('确认清除浏览器中的箱区存档？清除后将重新生成示例数据。')) {
    Yard.clearStorage()
    storeRaw.rebuild({ ...storeRaw.config })
    importMsg.value = { ok: true, text: '本地存档已清除并重新生成示例箱区' }
  }
}
</script>

<template>
  <section class="panel">
    <header class="panel-header">
      <span class="panel-index">03</span>
      <h2>状态导出</h2>
    </header>

    <p class="storage-line">
      <span class="storage-dot"></span>
      {{ storageInfo() }}
    </p>

    <div class="btn-row">
      <button class="btn btn-primary" :disabled="store.isPlaying" @click="doExport">
        导出状态文件 (.json)
      </button>
      <button class="btn" :disabled="store.isPlaying" @click="triggerImport">
        导入状态文件
      </button>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="application/json,.json"
      hidden
      @change="onFile"
    />

    <button class="btn btn-ghost btn-block" @click="clearStorage">
      清除本地存档
    </button>

    <div v-if="importMsg" class="import-msg" :class="importMsg.ok ? 'ok' : 'err'">
      {{ importMsg.text }}
    </div>

    <p class="tip">
      数据自动保存在浏览器 localStorage（键：{{ STORAGE_KEY }}），刷新页面不丢失；
      导出的 JSON 包含网格配置与全部箱位记录，可在其他浏览器导入恢复。
    </p>
  </section>
</template>
