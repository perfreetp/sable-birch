import { computed, reactive, ref, shallowRef, type UnwrapNestedRefs } from 'vue'
import type {
  Container,
  PlaybackState,
  ReshufflePlan,
  ViewMode,
  YardConfig,
  YardState
} from '@/types'
import { Yard, generateRandomYard, STORAGE_KEY } from '@/engine/yard'

export { STORAGE_KEY }

const DEFAULT_CONFIG: YardConfig = { bays: 12, rows: 5, tiers: 6 }

/** 箱区数据模型（非响应式类，配合 version 触发刷新） */
const yard = shallowRef<Yard>(new Yard(DEFAULT_CONFIG))
/** 数据版本号，任何结构/位置变更后自增以驱动 computed 重算 */
const version = ref(0)

const config = reactive<YardConfig>({ ...DEFAULT_CONFIG })
const selectedId = ref<string | null>(null)
const viewMode = ref<ViewMode>('perspective')

const plan = ref<ReshufflePlan | null>(null)
const planError = ref<string | null>(null)

const playback = reactive<PlaybackState>({
  active: false,
  targetId: null,
  totalSteps: 0,
  currentStep: 0,
  movingContainerId: null
})
/** 自增令牌：YardCanvas 监听到变化后开始/重播动画 */
const playToken = ref(0)
let cancelRequested = false

// 初始化：优先读取 localStorage，否则生成示例箱区
const loaded = Yard.load()
if (loaded) {
  yard.value = loaded
  Object.assign(config, loaded.config)
} else {
  yard.value = generateRandomYard(DEFAULT_CONFIG)
  yard.value.save()
}

function tick(): void {
  version.value++
}

/** 当前全部箱（依赖 version） */
const containers = computed<Container[]>(() => {
  void version.value
  return yard.value.containers
})

/** 选中箱 */
const selected = computed<Container | null>(() => {
  void version.value
  if (!selectedId.value) return null
  return yard.value.find(selectedId.value) ?? null
})

/** 选中箱所在栈（自底向上） */
const selectedStack = computed<Container[]>(() => {
  void version.value
  const c = selected.value
  if (!c) return []
  return yard.value.stackAt(c.bay, c.row)
})

/** 压在选中箱上方的箱 id 列表（含跨贝位 40 尺相邻栈压箱） */
const blockerIds = computed<string[]>(() => {
  void version.value
  const c = selected.value
  if (!c) return []
  return yard.value.blockersAbove(c.id).map((x) => x.id)
})

const isPlaying = computed(() => playback.active)
const remainingSteps = computed(() =>
  playback.active ? Math.max(0, playback.totalSteps - playback.currentStep) : 0
)

function select(id: string | null): void {
  if (playback.active) return
  selectedId.value = id
  plan.value = null
  planError.value = null
}

/** 按新配置重建箱区并随机生成 */
function rebuild(next: YardConfig, fillRate = 0.65): void {
  if (playback.active) return
  Object.assign(config, next)
  yard.value = generateRandomYard({ ...next }, fillRate)
  yard.value.save()
  selectedId.value = null
  plan.value = null
  planError.value = null
  tick()
}

function clearYard(): void {
  if (playback.active) return
  yard.value = new Yard({ ...config })
  yard.value.rebuildIndex()
  yard.value.save()
  selectedId.value = null
  plan.value = null
  tick()
}

/** 计算翻箱计划（只规划，不执行） */
function computePlan(): void {
  const c = selected.value
  if (!c) return
  try {
    plan.value = yard.value.planReshuffle(c.id)
    planError.value = null
  } catch (e) {
    plan.value = null
    planError.value = e instanceof Error ? e.message : String(e)
  }
}

/** 开始播放翻箱动画 */
function startPlayback(): void {
  if (!plan.value || playback.active) return
  cancelRequested = false
  playback.targetId = plan.value.targetId
  playback.totalSteps = plan.value.moves.length
  playback.currentStep = 0
  playback.movingContainerId = null
  playback.active = true
  playToken.value++
}

function requestCancel(): void {
  cancelRequested = true
}

/** 单步移动落位后由画布层调用，同步数据模型 */
function commitMove(index: number): void {
  const move = plan.value?.moves[index]
  if (!move) return
  yard.value.applyMove(move)
  tick()
  yard.value.save()
}

/** 动画全部结束（或被取消）后的收尾 */
function finishPlayback(): void {
  playback.active = false
  playback.movingContainerId = null
  plan.value = null
  tick()
}

/** 导出状态文件（浏览器下载） */
function exportState(): YardState {
  const state = yard.value.toState()
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: 'application/json'
  })
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const name = `yard-state-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(
    d.getDate()
  )}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.json`
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
  return state
}

/** 导入状态文件，返回错误信息或 null */
async function importState(file: File): Promise<string | null> {
  const text = await file.text()
  try {
    const state = JSON.parse(text) as YardState
    if (
      !state.config ||
      typeof state.config.bays !== 'number' ||
      !Array.isArray(state.containers)
    ) {
      return '文件格式不正确：缺少 config 或 containers 字段'
    }
    const next = new Yard(state.config, state.containers)
    next.rebuildIndex()
    yard.value = next
    Object.assign(config, next.config)
    selectedId.value = null
    plan.value = null
    next.save()
    tick()
    return null
  } catch (e) {
    return `解析失败：${e instanceof Error ? e.message : String(e)}`
  }
}

/**
 * 两个导出：
 * - storeRaw：原始 ref 对象，供 <script setup> 逻辑使用（storeRaw.xxx.value）
 * - store：reactive 解包后的对象，供模板直接使用（store.xxx 自动解包）
 * 两者共享同一组 ref，状态完全同步。
 */
const storeDef = {
  // 状态
  yard,
  version,
  config,
  selectedId,
  viewMode,
  plan,
  planError,
  playback,
  playToken,
  // 派生
  containers,
  selected,
  selectedStack,
  blockerIds,
  isPlaying,
  remainingSteps,
  // 操作
  select,
  rebuild,
  clearYard,
  computePlan,
  startPlayback,
  requestCancel,
  finishPlayback,
  commitMove,
  exportState,
  importState,
  get cancelled() {
    return cancelRequested
  }
}

export const storeRaw = storeDef

export const store = reactive(storeDef) as UnwrapNestedRefs<typeof storeDef>
