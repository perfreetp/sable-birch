/**
 * 翻箱核心逻辑冒烟测试（Node 运行，不依赖浏览器）
 * 用 esbuild 打包后执行：node scripts/smoke.mjs
 */
import assert from 'node:assert/strict'
import { Yard, generateRandomYard, generateBoxNo, STORAGE_KEY } from '../src/engine/yard.ts'
import { occupiedBays, TRANSPARENT_TIER, slotPosition } from '../src/engine/layout.ts'

let passed = 0
function check(name, fn) {
  fn()
  passed++
  console.log(`  ✓ ${name}`)
}

// ---------- 布局常量 ----------
check('40 尺箱占用两个连续贝位', () => {
  assert.deepEqual(occupiedBays(3, 40), [3, 4])
  assert.deepEqual(occupiedBays(3, 20), [3])
})

check('高透明阈值为第 5 层（tier>=4）', () => {
  assert.equal(TRANSPARENT_TIER, 4)
})

// ---------- 手工搭建确定性箱区 ----------
// 4 贝 x 2 排 x 4 层
function buildYard() {
  const yard = new Yard({ bays: 4, rows: 2, tiers: 4 })
  const boxes = [
    // bay0/row0 三层栈：A(底) B C(顶)
    { id: 'A', bay: 0, row: 0, tier: 0, size: 20 },
    { id: 'B', bay: 0, row: 0, tier: 1, size: 20 },
    { id: 'C', bay: 0, row: 0, tier: 2, size: 20 },
    // bay1/row0 两层
    { id: 'D', bay: 1, row: 0, tier: 0, size: 20 },
    { id: 'E', bay: 1, row: 0, tier: 1, size: 20 },
    // bay0/row1 一个 40 尺底层（占 bay0-bay1）
    { id: 'F', bay: 0, row: 1, tier: 0, size: 40 }
  ].map((b) => ({ ...b, boxNo: generateBoxNo() }))
  for (const b of boxes) yard.add(b)
  yard.rebuildIndex()
  return yard
}

check('索引查询：40 尺箱在两个贝位均可命中', () => {
  const yard = buildYard()
  assert.equal(yard.at(0, 1, 0)?.id, 'F')
  assert.equal(yard.at(1, 1, 0)?.id, 'F')
  assert.equal(yard.at(2, 1, 0), undefined)
})

check('栈高与栈顺序正确', () => {
  const yard = buildYard()
  const stack = yard.stackAt(0, 0)
  assert.deepEqual(stack.map((c) => c.id), ['A', 'B', 'C'])
  assert.equal(yard.stackHeight(0, 0), 3)
})

// ---------- canPlace 规则 ----------
check('canPlace：越界 / 重叠 / 悬空均拒绝', () => {
  const yard = buildYard()
  assert.equal(yard.canPlace(4, 0, 0, 20), false) // 越界
  assert.equal(yard.canPlace(0, 0, 0, 20), false) // 重叠
  assert.equal(yard.canPlace(2, 0, 1, 20), false) // 悬空（tier1 下方 tier0 为空）
  assert.equal(yard.canPlace(3, 0, 0, 40), false) // 40 尺越界（需要 bay3+bay4）
  assert.equal(yard.canPlace(2, 0, 0, 20), true) // 合法空位
  assert.equal(yard.canPlace(0, 1, 1, 40), true) // 可叠在 40 尺 F 上（同起始贝位）
  assert.equal(yard.canPlace(1, 1, 1, 40), false) // 起始贝位不一致，不能叠
})

// ---------- 翻箱规划 ----------
check('翻箱：取底层 A 需要移走 B、C 两个压箱', () => {
  const yard = buildYard()
  const plan = yard.planReshuffle('A')
  assert.equal(plan.targetId, 'A')
  assert.deepEqual(plan.moves.map((m) => m.containerId), ['C', 'B']) // 自顶向下
  // 落点不能回到目标栈
  for (const m of plan.moves) {
    assert.ok(!(m.to.bay === 0 && m.to.row === 0), '压箱不能落回目标栈')
  }
  // 模拟执行后所有移动均合法，且 A 上方清空
  for (const m of plan.moves) {
    assert.equal(yard.canPlace(m.to.bay, m.to.row, m.to.tier, yard.find(m.containerId).size), true)
    yard.applyMove(m)
  }
  assert.equal(yard.stackAt(0, 0).filter((c) => c.tier > 0).length, 0)
  assert.equal(yard.find('A')?.tier, 0)
})

check('翻箱：栈顶箱无需翻箱', () => {
  const yard = buildYard()
  const plan = yard.planReshuffle('C')
  assert.equal(plan.moves.length, 0)
})

check('翻箱：中层 B 只需移走 C', () => {
  const yard = buildYard()
  const plan = yard.planReshuffle('B')
  assert.deepEqual(plan.moves.map((m) => m.containerId), ['C'])
})

check('翻箱：压箱起始贝位与目标不同（跨栈 40 尺压箱）', () => {
  // 8 贝 2 排 4 层
  const yard = new Yard({ bays: 8, rows: 2, tiers: 4 })
  const add = (id, bay, row, tier, size) =>
    yard.add({ id, boxNo: id, bay, row, tier, size })
  // 目标 20 尺箱在 bay3 / row0 / tier0
  add('T', 3, 0, 0, 20)
  // bay3 同列底层补一个 20 尺支撑 D（与 T 同层相邻，不重叠）
  add('D', 2, 0, 0, 20)
  // 40 尺压箱 A 起始于 bay2，横跨 bay2-bay3，压在目标 T 正上方 tier1
  add('A', 2, 0, 1, 40)
  // A 上方再叠一个 40 尺箱 B
  add('B', 2, 0, 2, 40)
  yard.rebuildIndex()

  // T 的起始贝位栈 stackAt(3,0) 只有 T 自己，但压箱 A/B 起始于 bay2
  assert.deepEqual(yard.stackAt(3, 0).map((c) => c.id), ['T'])
  // blockersAbove 必须能通过 bay3 占用索引发现 A、B
  const blockers = yard.blockersAbove('T').map((c) => c.id).sort()
  assert.deepEqual(blockers, ['A', 'B'], '跨栈 40 尺压箱必须被识别')

  const plan = yard.planReshuffle('T')
  assert.deepEqual(plan.moves.map((m) => m.containerId), ['B', 'A'])
  for (const m of plan.moves) yard.applyMove(m)
  assert.equal(yard.blockersAbove('T').length, 0)
})

check('箱区满时翻箱抛出无空位错误', () => {
  // 1 贝 1 排 2 层，两个箱，取底层 -> 没有任何其他栈可落
  const yard = new Yard({ bays: 1, rows: 1, tiers: 2 })
  yard.add({ id: 'x1', boxNo: 'X1', size: 20, bay: 0, row: 0, tier: 0 })
  yard.add({ id: 'x2', boxNo: 'X2', size: 20, bay: 0, row: 0, tier: 1 })
  yard.rebuildIndex()
  assert.throws(() => yard.planReshuffle('x1'), /没有足够空位/)
})

check('连续翻箱：每次移动后模拟状态保持合法', () => {
  const yard = buildYard()
  const plan = yard.planReshuffle('A')
  for (const m of plan.moves) {
    const c = yard.find(m.containerId)
    yard.applyMove(m)
    // 落位后可在新位置查到
    assert.equal(yard.at(m.to.bay, m.to.row, m.to.tier)?.id, c.id)
  }
  assert.equal(yard.containers.length, 6) // 箱数量不变
})

// ---------- 随机箱区合法性 ----------
check('随机箱区：所有箱位置合法且无冲突', () => {
  const cfg = { bays: 12, rows: 5, tiers: 6 }
  const yard = generateRandomYard(cfg, 0.7)
  assert.ok(yard.containers.length > 0)
  const seen = new Set()
  for (const c of yard.containers) {
    const bays = occupiedBays(c.bay, c.size)
    for (const b of bays) {
      const k = `${b}-${c.row}-${c.tier}`
      assert.ok(!seen.has(k), `位置冲突 ${k}`)
      seen.add(k)
    }
    if (c.tier > 0) {
      // 下方必须有同尺寸同起始贝位的支撑
      const below = yard.at(c.bay, c.row, c.tier - 1)
      assert.ok(below, `箱 ${c.id} 悬空`)
      assert.equal(below.size, c.size)
      assert.equal(below.bay, c.bay)
    }
  }
})

check('随机箱区：任意箱翻箱计划可完整执行（有足够空位时）', () => {
  const yard = generateRandomYard({ bays: 10, rows: 4, tiers: 5 }, 0.5)
  const target = yard.containers[0]
  try {
    const plan = yard.planReshuffle(target.id)
    for (const m of plan.moves) yard.applyMove(m)
    const above = yard.stackAt(target.bay, target.row).filter((c) => c.tier > target.tier)
    assert.equal(above.length, 0)
  } catch (e) {
    // 满箱区允许抛“无空位”，但不能有其他异常
    assert.match(String(e.message), /没有足够空位/)
  }
})

// ---------- 序列化 / 持久化 ----------
check('toState 序列化与重建一致', () => {
  const yard = buildYard()
  const state = yard.toState()
  assert.equal(state.version, 1)
  assert.deepEqual(state.config, { bays: 4, rows: 2, tiers: 4 })
  const restored = new Yard(state.config, state.containers)
  restored.rebuildIndex()
  assert.equal(restored.containers.length, yard.containers.length)
  assert.equal(restored.at(0, 0, 2)?.id, 'C')
})

check('localStorage 保存/加载往返', () => {
  const store = new Map()
  globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, v),
    removeItem: (k) => store.delete(k)
  }
  const yard = buildYard()
  yard.save()
  assert.ok(store.has(STORAGE_KEY))
  const loaded = Yard.load()
  assert.ok(loaded)
  assert.equal(loaded.containers.length, 6)
  assert.equal(loaded.at(1, 1, 0)?.id, 'F')
  Yard.clearStorage()
  assert.equal(store.has(STORAGE_KEY), false)
})

check('localStorage 损坏数据返回 null 而不抛异常', () => {
  globalThis.localStorage = {
    getItem: () => '{broken json',
    setItem: () => {},
    removeItem: () => {}
  }
  assert.equal(Yard.load(), null)
})

// ---------- 世界坐标 ----------
check('20/40 尺箱世界坐标 X 中心不同，Y 随层抬升', () => {
  const p20 = slotPosition(0, 0, 0, 20)
  const p40 = slotPosition(0, 0, 0, 40)
  assert.ok(p40.x > p20.x)
  const pUp = slotPosition(0, 0, 2, 20)
  assert.ok(pUp.y > p20.y)
})

console.log(`\n全部 ${passed} 项测试通过 ✅`)
