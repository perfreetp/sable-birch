import type {
  Container,
  ContainerSize,
  PlannedMove,
  ReshufflePlan,
  YardConfig,
  YardState
} from '@/types'
import { occupiedBays } from './layout'

export const STORAGE_KEY = 'container-yard-state-v1'

let seq = 0
const PREFIXES = ['CBHU', 'TCLU', 'MSKU', 'GESU', 'TRIU']

/** 生成箱号：四位船公司前缀 + 7 位数字，模拟真实箱号 */
export function generateBoxNo(): string {
  const prefix = PREFIXES[seq % PREFIXES.length]
  seq++
  const digits = String(Math.floor(1000000 + Math.random() * 9000000))
  return `${prefix}${digits}`
}

/** 箱区状态类：维护网格数据并提供查询/变更能力 */
export class Yard {
  config: YardConfig
  containers: Container[] = []

  constructor(config: YardConfig, containers: Container[] = []) {
    this.config = { ...config }
    this.containers = containers.map((c) => ({ ...c }))
  }

  /** 三维占用表：key = bay-row-tier -> Container */
  private index = new Map<string, Container>()
  /** 按 (bay,row) 分组的栈，tier 升序 */
  private stacks = new Map<string, Container[]>()

  private static key(bay: number, row: number, tier: number): string {
    return `${bay}-${row}-${tier}`
  }

  private stackKey(bay: number, row: number): string {
    return `${bay}-${row}`
  }

  /** 重建索引（加载 / 批量变更后调用） */
  rebuildIndex(): void {
    this.index.clear()
    this.stacks.clear()
    for (const c of this.containers) {
      for (const b of occupiedBays(c.bay, c.size)) {
        this.index.set(Yard.key(b, c.row, c.tier), c)
      }
      const sk = this.stackKey(c.bay, c.row)
      const arr = this.stacks.get(sk) ?? []
      arr.push(c)
      this.stacks.set(sk, arr)
    }
    for (const arr of this.stacks.values()) arr.sort((a, b) => a.tier - b.tier)
  }

  /** 查询某网格位置上的箱（40 尺箱在两个贝位都能命中） */
  at(bay: number, row: number, tier: number): Container | undefined {
    return this.index.get(Yard.key(bay, row, tier))
  }

  /** 取某 (bay,row) 栈（tier 升序），以起始贝位为键 */
  stackAt(bay: number, row: number): Container[] {
    return this.stacks.get(this.stackKey(bay, row)) ?? []
  }

  /** 某位置栈当前高度（层数） */
  stackHeight(bay: number, row: number): number {
    return this.stackAt(bay, row).length
  }

  /**
   * 压在指定箱上方的全部箱（自底向上排序）。
   * 扫描该箱覆盖的所有贝位，兼容跨贝位 40 尺箱的相邻栈压箱。
   */
  blockersAbove(containerId: string): Container[] {
    const target = this.find(containerId)
    if (!target) return []
    const map = new Map<string, Container>()
    for (const b of occupiedBays(target.bay, target.size)) {
      for (let tier = target.tier + 1; tier < this.config.tiers; tier++) {
        const c = this.at(b, target.row, tier)
        if (c) map.set(c.id, c)
      }
    }
    return [...map.values()].sort((a, b) => a.tier - b.tier)
  }

  /**
   * 槽位是否可放置指定尺寸的箱：
   * - 不越界
   * - 所有占用贝位在该排该层均为空
   * - 必须落地或落在同尺寸栈顶（底层以上需要正下方有支撑，且支撑箱覆盖相同贝位）
   */
  canPlace(bay: number, row: number, tier: number, size: ContainerSize): boolean {
    const bays = occupiedBays(bay, size)
    if (bays.some((b) => b < 0 || b >= this.config.bays)) return false
    if (row < 0 || row >= this.config.rows) return false
    if (tier < 0 || tier >= this.config.tiers) return false
    for (const b of bays) {
      if (this.index.has(Yard.key(b, row, tier))) return false
    }
    if (tier > 0) {
      for (const b of bays) {
        const below = this.index.get(Yard.key(b, row, tier - 1))
        if (!below) return false
        // 支撑箱必须与待放箱贝位完全一致（同起始贝位、同尺寸）
        if (below.bay !== bay || below.size !== size) return false
      }
    }
    return true
  }

  /** 添加箱（不做校验时供随机生成使用） */
  add(c: Container): void {
    this.containers.push(c)
  }

  /** 按 id 查找 */
  find(id: string): Container | undefined {
    return this.containers.find((c) => c.id === id)
  }

  /** 直接应用一次移动并重建索引 */
  applyMove(move: PlannedMove): void {
    const c = this.find(move.containerId)
    if (!c) return
    c.bay = move.to.bay
    c.row = move.to.row
    c.tier = move.to.tier
    this.rebuildIndex()
  }

  /**
   * 翻箱规划：找出压在目标箱上方的所有箱，
   * 依次为每个压箱寻找最近的合法空槽，产出移动序列。
   * 找不到空位时抛错。
   */
  planReshuffle(targetId: string): ReshufflePlan {
    const target = this.find(targetId)
    if (!target) throw new Error('目标箱不存在')

    // 压箱：目标箱覆盖的任一贝位上、同排且层更高的箱（基于占用索引，兼容跨贝位 40 尺）
    const sameStack = this.blockersAbove(targetId).sort((a, b) => b.tier - a.tier)

    const moves: PlannedMove[] = []
    // 用一份临时 Yard 模拟移动过程，保证后续落点合法
    const sim = new Yard(this.config, this.containers)
    sim.rebuildIndex()

    // 禁止落回目标箱覆盖的任一贝位列（否则翻箱没有意义）
    const forbidden = new Set<string>()
    for (const b of occupiedBays(target.bay, target.size)) {
      forbidden.add(this.stackKey(b, target.row))
    }

    for (const blocker of sameStack) {
      const slot = sim.findEmptySlot(blocker.size, forbidden)
      if (!slot) {
        throw new Error('箱区没有足够空位完成翻箱，请先扩容或清理箱区')
      }
      moves.push({
        containerId: blocker.id,
        from: { bay: blocker.bay, row: blocker.row, tier: blocker.tier },
        to: slot
      })
      sim.applyMove(moves[moves.length - 1])
    }

    return { targetId, moves }
  }

  /**
   * 寻找最近合法空槽：优先低层、就近贝位/排。
   * forbiddenStacks 中的 (bay-row) 栈不作为落点。
   */
  findEmptySlot(
    size: ContainerSize,
    forbiddenStacks: Set<string>
  ): { bay: number; row: number; tier: number } | null {
    const maxBay = size === 40 ? this.config.bays - 2 : this.config.bays - 1
    let best: { bay: number; row: number; tier: number } | null = null
    let bestScore = Infinity
    for (let tier = 0; tier < this.config.tiers; tier++) {
      for (let row = 0; row < this.config.rows; row++) {
        for (let bay = 0; bay <= maxBay; bay++) {
          if (forbiddenStacks.has(this.stackKey(bay, row))) continue
          if (this.canPlace(bay, row, tier, size)) {
            const score = tier * 1000 + row * 30 + bay
            if (score < bestScore) {
              bestScore = score
              best = { bay, row, tier }
            }
          }
        }
      }
    }
    return best
  }

  /** 序列化为可导出对象 */
  toState(): YardState {
    return {
      version: 1,
      savedAt: new Date().toISOString(),
      config: { ...this.config },
      containers: this.containers.map((c) => ({ ...c }))
    }
  }

  /** 持久化到 localStorage */
  save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.toState()))
  }

  /** 从 localStorage 读取 */
  static load(): Yard | null {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try {
      const state = JSON.parse(raw) as YardState
      const yard = new Yard(state.config, state.containers)
      yard.rebuildIndex()
      return yard
    } catch {
      return null
    }
  }

  static clearStorage(): void {
    localStorage.removeItem(STORAGE_KEY)
  }
}

/** 随机生成箱区数据（保证结构合法） */
export function generateRandomYard(cfg: YardConfig, fillRate = 0.65): Yard {
  const yard = new Yard(cfg)
  let idCounter = 0
  const mkId = () => `c${++idCounter}`

  // 逐栈生成：先随机决定栈高，再从底向上放箱
  for (let row = 0; row < cfg.rows; row++) {
    let bay = 0
    while (bay < cfg.bays) {
      // 决定该贝位放 40 尺还是 20 尺
      const use40 = bay + 1 < cfg.bays && Math.random() < 0.35
      const size: ContainerSize = use40 ? 40 : 20
      if (use40) {
        const maxH = Math.floor(
          cfg.tiers * (0.3 + Math.random() * fillRate)
        )
        for (let tier = 0; tier < maxH; tier++) {
          yard.add({
            id: mkId(),
            boxNo: generateBoxNo(),
            size,
            bay,
            row,
            tier
          })
        }
        bay += 2
      } else {
        const maxH = Math.floor(
          cfg.tiers * (0.3 + Math.random() * fillRate)
        )
        for (let tier = 0; tier < maxH; tier++) {
          yard.add({
            id: mkId(),
            boxNo: generateBoxNo(),
            size: 20,
            bay,
            row,
            tier
          })
        }
        bay += 1
      }
    }
  }
  yard.rebuildIndex()
  return yard
}
