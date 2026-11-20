<script setup lang="ts">
import { onBeforeUnmount, onMounted, nextTick, ref, watch } from 'vue'
import { useViewerStore } from '@/stores/viewer'
import { ViewerEngine } from '@/three/viewerEngine'
import { buildPotreeFileMap, parseProjectFile } from '@/services/projectIO'
import type { ViewerProject } from '@/types'

const store = useViewerStore()
const viewportEl = ref<HTMLDivElement | null>(null)
const labelLayerEl = ref<HTMLDivElement | null>(null)
let engine: ViewerEngine | null = null

const emit = defineEmits<{
  (e: 'project-loaded', project: ViewerProject): void
}>()

const modelInput = ref<HTMLInputElement | null>(null)
const dirInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (!viewportEl.value || !labelLayerEl.value) return
  engine = new ViewerEngine(viewportEl.value, labelLayerEl.value, {
    onActiveTierChange: (t) => {
      store.activeTier = t
    },
    onLoadingProgress: (p) => {
      store.modelProgress = p
    },
    onPick: (position, normal) => {
      // 仅写入 store；marker 的创建由下方 annotations watcher 统一负责，避免重复
      const ann = store.addAnnotation(position, normal)
      store.showToast(`已添加标注：${ann.title}`)
    },
    onToast: (text, kind) => store.showToast(text, kind),
  })

  // 初始加载演示文物
  void loadDemo()

  window.addEventListener('annotation-focus', onFocusAnnotation)
})

onBeforeUnmount(() => {
  window.removeEventListener('annotation-focus', onFocusAnnotation)
  engine?.dispose()
  engine = null
})

function onFocusAnnotation(ev: Event): void {
  const id = (ev as CustomEvent<string>).detail
  store.selectAnnotation(id)
  engine?.focusAnnotation(id)
}

async function loadDemo(): Promise<void> {
  if (!engine) return
  store.modelLoading = true
  store.modelError = ''
  try {
    const ref = await engine.loadDemo()
    store.setModel(ref)
    engine.setTier(store.tier)
    engine.setAutoTier(store.autoTier)
    engine.setChannels(store.channelDiffuse, store.channelNormal)
    engine.setAmbient(store.ambient)
  } catch (e) {
    store.modelError = (e as Error).message
    store.showToast('演示模型加载失败', 'error')
  } finally {
    store.modelLoading = false
  }
}

function triggerModelImport(): void {
  modelInput.value?.click()
}
function triggerDirImport(): void {
  dirInput.value?.click()
}

async function onGlbFile(ev: Event): Promise<void> {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !engine) return
  store.modelLoading = true
  store.modelError = ''
  try {
    const ref = await engine.loadGlb(file)
    store.setModel(ref)
    engine.setTier(store.tier)
    engine.setAutoTier(store.autoTier)
    engine.setChannels(store.channelDiffuse, store.channelNormal)
    engine.setAmbient(store.ambient)
    store.showToast(`模型已导入：${file.name}`)
  } catch (e) {
    store.modelError = (e as Error).message
    store.showToast(`模型导入失败：${store.modelError}`, 'error')
  } finally {
    store.modelLoading = false
  }
}

async function onDirFiles(ev: Event): Promise<void> {
  const input = ev.target as HTMLInputElement
  const files = Array.from(input.files ?? [])
  input.value = ''
  if (files.length === 0 || !engine) return
  const found = buildPotreeFileMap(files)
  if (!found) {
    store.showToast('目录中未找到 potree metadata.json', 'error')
    return
  }
  store.modelLoading = true
  try {
    const ref = await engine.loadPotreeFiles(found.map, found.metadataRel)
    store.setModel(ref)
    engine.setTier(store.tier)
    engine.setAutoTier(store.autoTier)
    engine.setChannels(store.channelDiffuse, store.channelNormal)
    engine.setAmbient(store.ambient)
    store.showToast('点云模型已导入，LOD 节点将按需加载')
  } catch (e) {
    store.modelError = (e as Error).message
    store.showToast(`点云加载失败：${store.modelError}`, 'error')
  } finally {
    store.modelLoading = false
  }
}

/** 工程文件入口：解析后恢复全部状态（模型引用、标注、书签、视图参数） */
async function importProjectFile(file: File): Promise<void> {
  try {
    const project = await parseProjectFile(file)
    emit('project-loaded', project)
  } catch (e) {
    store.showToast((e as Error).message, 'error')
  }
}

// ---------- 标注/框选模式联动 ----------
watch(
  () => store.pickingMode,
  (on) => {
    engine?.setPickingMode(on)
    if (on) {
      store.rectZoomMode = false
      engine?.setRectZoomMode(false)
    }
  },
)
watch(
  () => store.rectZoomMode,
  (on) => {
    engine?.setRectZoomMode(on)
    if (on) {
      store.pickingMode = false
      engine?.setPickingMode(false)
    }
  },
)
watch(
  () => store.tier,
  (t) => engine?.setTier(t),
)
watch(
  () => store.autoTier,
  (a) => engine?.setAutoTier(a),
)
watch(
  () => [store.channelDiffuse, store.channelNormal],
  ([d, n]) => engine?.setChannels(d as boolean, n as boolean),
)
watch(
  () => store.ambient,
  (v) => engine?.setAmbient(v),
)

// ---------- 标注增删改联动（引擎侧 marker 集合与 store 保持同步） ----------
const markerIdSet = new Set<string>()
watch(
  () => store.annotations.map((a) => a.id).join(','),
  () => {
    if (!engine) return
    const live = new Set(store.annotations.map((a) => a.id))
    for (const id of Array.from(markerIdSet)) {
      if (!live.has(id)) {
        engine.removeMarker(id)
        markerIdSet.delete(id)
      }
    }
    for (const ann of store.annotations) {
      if (!markerIdSet.has(ann.id)) {
        engine.addMarker(ann)
        markerIdSet.add(ann.id)
      }
    }
  },
)

watch(
  () => store.selectedAnnotationId,
  (id) => engine?.selectMarker(id),
)

// 标注内容（颜色/标题）编辑后刷新
watch(
  () => store.annotations.map((a) => `${a.id}:${a.title}:${a.color}`).join('|'),
  () => {
    for (const ann of store.annotations) engine?.updateMarker(ann)
  },
)

// 书签跳转
function gotoBookmark(id: string): void {
  const bm = store.applyBookmark(id)
  if (bm) {
    engine?.restorePose(bm.pose)
    store.showToast(`回到书签：${bm.name}`)
  }
}

function saveBookmark(): void {
  if (!engine) return
  const pose = engine.getCameraPose()
  const bm = store.addBookmark(pose)
  store.showToast(`书签已保存：${bm.name}（${bm.tier} 档）`)
}

async function restoreProject(project: ViewerProject): Promise<void> {
  if (!engine) return
  // 模型引用：演示模型可直接恢复；其它类型提示用户重新选择源文件
  if (project.model?.kind === 'demo') {
    await loadDemo()
  } else if (project.model) {
    store.showToast(`请重新导入模型文件：${project.model.name}（标注与书签将自动恢复）`)
    store.modelRef = project.model
  }
  // 视图状态
  store.tier = project.view.tier
  store.autoTier = project.view.autoTier
  store.channelDiffuse = project.view.channelDiffuse
  store.channelNormal = project.view.channelNormal
  store.ambient = project.view.ambient
  engine.setTier(store.tier)
  engine.setAutoTier(store.autoTier)
  engine.setChannels(store.channelDiffuse, store.channelNormal)
  engine.setAmbient(store.ambient)
  // 标注：仅写入 store；marker 创建由 annotations watcher 统一完成（含首次恢复）
  markerIdSet.clear()
  store.annotations = project.annotations.map((a) => ({ ...a }))
  await nextTick()
  // 书签
  store.bookmarks = project.bookmarks.map((b) => ({ ...b }))
  store.showToast('工程状态已恢复')
}
defineExpose({ restoreProject, gotoBookmark, saveBookmark, importProjectFile, triggerModelImport, triggerDirImport, loadDemo })
</script>

<template>
  <div class="viewport-col">
    <div ref="viewportEl" class="viewport-canvas" style="position: absolute; inset: 0"></div>
    <div ref="labelLayerEl" style="position: absolute; inset: 0; pointer-events: none; z-index: 9"></div>

    <div class="viewport-toolbar">
      <button :class="{ toggled: store.pickingMode }" @click="store.pickingMode = !store.pickingMode">
        {{ store.pickingMode ? '● 标注点选中…' : '◎ 表面点选标注' }}
      </button>
      <button :class="{ toggled: store.rectZoomMode }" @click="store.rectZoomMode = !store.rectZoomMode">
        ⬒ 框选放大
      </button>
      <button @click="engine?.frameCameraToModel()">⟳ 复位视角</button>
      <button @click="triggerDirImport">📁 导入点云目录</button>
    </div>

    <div v-if="store.pickingMode" class="viewport-hint">标注模式：点击模型表面放置标注点（拖动旋转视角不会误触）</div>
    <div v-else-if="store.rectZoomMode" class="viewport-hint">框选模式：在模型上拖拽矩形，松开后放大到该区域并重算纹理层级</div>

    <div v-if="store.modelLoading" class="loading-bar"><i :style="{ width: `${Math.round(store.modelProgress * 100)}%` }"></i></div>

    <div v-if="store.toast" :key="store.toast.id" class="toast" :class="store.toast.kind">
      {{ store.toast.text }}
    </div>

    <input ref="modelInput" type="file" accept=".glb,.gltf,model/gltf-binary" style="display: none" @change="onGlbFile" />
    <input ref="dirInput" type="file" webkitdirectory directory style="display: none" @change="onDirFiles" />
  </div>
</template>
