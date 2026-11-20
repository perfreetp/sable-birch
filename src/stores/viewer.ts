import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AnnotationData, Bookmark, ModelRef, Vec3 } from '@/types'

let seq = 0
/** 生成不依赖 Date.now() 的可读 id（工程内唯一性足够） */
function uid(prefix: string): string {
  seq += 1
  return `${prefix}-${Date.now().toString(36)}-${seq}-${Math.floor(Math.random() * 1e4).toString(36)}`
}

export const useViewerStore = defineStore('viewer', () => {
  // ---------- 模型 ----------
  const modelRef = ref<ModelRef | null>(null)
  const modelLoading = ref(false)
  const modelProgress = ref(0)
  const modelError = ref('')

  // ---------- 纹理档位 ----------
  const MIN_TIER = 1
  const MAX_TIER = 8
  const tier = ref(4)
  const autoTier = ref(true)
  /** 引擎每帧根据视距回传的当前实际层级（1-8），仅用于 UI 展示 */
  const activeTier = ref(4)

  // ---------- 材质通道 ----------
  const channelDiffuse = ref(true)
  const channelNormal = ref(true)
  const ambient = ref(1)

  // ---------- 标注 ----------
  const annotations = ref<AnnotationData[]>([])
  const selectedAnnotationId = ref<string | null>(null)
  /** 是否处于点选标注模式 */
  const pickingMode = ref(false)

  // ---------- 书签 ----------
  const bookmarks = ref<Bookmark[]>([])

  // ---------- 框选放大 ----------
  const rectZoomMode = ref(false)

  // ---------- 工具提示 ----------
  const toast = ref<{ id: number; text: string; kind: 'info' | 'error' } | null>(null)
  let toastSeq = 0
  function showToast(text: string, kind: 'info' | 'error' = 'info'): void {
    toastSeq += 1
    toast.value = { id: toastSeq, text, kind }
  }

  const selectedAnnotation = computed(() =>
    annotations.value.find((a) => a.id === selectedAnnotationId.value) ?? null,
  )

  // ---------- 模型 ----------
  function setModel(ref_: ModelRef | null): void {
    modelRef.value = ref_
    if (ref_) {
      annotations.value = []
      bookmarks.value = []
      selectedAnnotationId.value = null
    }
  }

  // ---------- 标注 ----------
  function addAnnotation(position: Vec3, normal: Vec3, title?: string): AnnotationData {
    const ann: AnnotationData = {
      id: uid('ann'),
      title: title || `标注 ${annotations.value.length + 1}`,
      note: '',
      color: '#ffb020',
      position,
      normal,
      createdAt: Date.now(),
    }
    annotations.value.push(ann)
    selectedAnnotationId.value = ann.id
    return ann
  }

  function updateAnnotation(id: string, patch: Partial<AnnotationData>): void {
    const i = annotations.value.findIndex((a) => a.id === id)
    if (i >= 0) annotations.value[i] = { ...annotations.value[i], ...patch }
  }

  function removeAnnotation(id: string): void {
    annotations.value = annotations.value.filter((a) => a.id !== id)
    if (selectedAnnotationId.value === id) selectedAnnotationId.value = null
  }

  function selectAnnotation(id: string | null): void {
    selectedAnnotationId.value = id
  }

  // ---------- 书签 ----------
  function addBookmark(pose: Bookmark['pose'], name?: string): Bookmark {
    const bm: Bookmark = {
      id: uid('bm'),
      name: name || `视角 ${bookmarks.value.length + 1}`,
      pose,
      tier: tier.value,
      autoTier: autoTier.value,
      createdAt: Date.now(),
    }
    bookmarks.value.push(bm)
    return bm
  }

  function removeBookmark(id: string): void {
    bookmarks.value = bookmarks.value.filter((b) => b.id !== id)
  }

  function renameBookmark(id: string, name: string): void {
    const bm = bookmarks.value.find((b) => b.id === id)
    if (bm) bm.name = name
  }

  /** 恢复书签：返回需要引擎执行的位姿 */
  function applyBookmark(id: string): Bookmark | null {
    const bm = bookmarks.value.find((b) => b.id === id)
    if (!bm) return null
    tier.value = bm.tier
    autoTier.value = bm.autoTier
    return bm
  }

  return {
    // constants
    MIN_TIER,
    MAX_TIER,
    // state
    modelRef,
    modelLoading,
    modelProgress,
    modelError,
    tier,
    autoTier,
    activeTier,
    channelDiffuse,
    channelNormal,
    ambient,
    annotations,
    selectedAnnotationId,
    selectedAnnotation,
    pickingMode,
    bookmarks,
    rectZoomMode,
    toast,
    // actions
    showToast,
    setModel,
    addAnnotation,
    updateAnnotation,
    removeAnnotation,
    selectAnnotation,
    addBookmark,
    removeBookmark,
    renameBookmark,
    applyBookmark,
  }
})
