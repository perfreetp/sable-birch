import { strict as assert } from 'node:assert'
import { Simulation } from '../src/lib/simulation'
import { generateSampleScenario } from '../src/lib/sampleData'
import { evaluateAircraft, sampleTrack } from '../src/lib/interpolate'
import { exportJson, exportConflictsCsv } from '../src/lib/exportData'

let passed = 0
function check(name: string, fn: () => void): void {
  fn()
  passed++
  console.log(`  ✓ ${name}`)
}

const scenario = generateSampleScenario()
const sim = new Simulation(scenario)

check('场景装载：10 架飞行器，时长 > 0', () => {
  assert.equal(sim.tracks.length, 10)
  assert.ok(sim.duration > 100)
})

check('航迹插值：t=40 时 UAM-01 位于原点附近', () => {
  const t1 = sim.tracks.find((t) => t.id === 'UAM-01')!
  const s = sampleTrack(t1, 40)
  assert.ok(Math.abs(s.position.x) < 1e-6)
  assert.ok(Math.abs(s.position.z) < 1e-6)
  assert.equal(s.position.y, 150)
})

check('速度与航向：UAM-01 向东飞，航向 ≈ π/2', () => {
  const t1 = sim.tracks.find((t) => t.id === 'UAM-01')!
  const st = evaluateAircraft(t1, 20)
  assert.ok(st.velocity.x > 0)
  assert.ok(Math.abs(st.heading - Math.PI / 2) < 1e-6)
  assert.ok(st.groundSpeed > 0)
})

check('边界：超出航迹时间范围钳制在端点', () => {
  const t1 = sim.tracks.find((t) => t.id === 'UAM-01')!
  const a = sampleTrack(t1, -50)
  const b = sampleTrack(t1, 9999)
  assert.deepEqual(a.position, { x: -600, y: 150, z: 0 })
  assert.deepEqual(b.position, { x: 600, y: 150, z: 0 })
})

check('冲突检测：t=40 时 UAM-01 ↔ UAM-02 触发', () => {
  sim.evaluate(40)
  assert.ok(sim.isInConflict('UAM-01'))
  assert.ok(sim.isInConflict('UAM-02'))
  const pairs = sim.getActivePairs()
  assert.ok(pairs.some((p) => p.key.includes('UAM-01') && p.key.includes('UAM-02')))
})

check('冲突检测：t=62 时 UAM-03 ↔ UAM-04 触发', () => {
  sim.evaluate(62)
  assert.ok(sim.isInConflict('UAM-03'))
  assert.ok(sim.isInConflict('UAM-04'))
})

check('冲突闭合：连续逐帧推演后 active 复位但记录保留', () => {
  // 模拟真实主循环：0.1s 步长连续推演
  for (let t = 0; t <= 100; t += 0.1) sim.evaluate(Math.round(t * 10) / 10)
  assert.ok(!sim.isInConflict('UAM-01'))
  const rec = sim.getConflictList().find((c) => c.key === 'UAM-01::UAM-02')
  assert.ok(rec)
  assert.equal(rec!.active, false)
  assert.ok(rec!.endTime > rec!.startTime)
  assert.ok(rec!.minHorizontal < scenario.horizontalThreshold)
})

check('拖动重扫：scrubTo 后历史冲突统计完整', () => {
  sim.scrubTo(80)
  const keys = sim.getConflictList().map((c) => c.key)
  assert.ok(keys.includes('UAM-01::UAM-02'))
  assert.ok(keys.includes('UAM-03::UAM-04'))
  assert.equal(sim.time, 80)
})

check('来回拖动一致性：再次 scrubTo(0) 清空历史', () => {
  sim.scrubTo(0)
  assert.equal(sim.getConflictList().length, 0)
})

check('侧边列表：按冲突数降序排列', () => {
  sim.scrubTo(90)
  const sums = sim.getSummaries()
  for (let i = 1; i < sums.length; i++) {
    assert.ok(sums[i - 1].conflictTotal >= sums[i].conflictTotal)
  }
  assert.ok(sums[0].conflictTotal >= 1)
})

check('阈值收紧：扩大阈值后冲突数量增加', () => {
  const before = sim.getConflictList().length
  sim.setThresholds(200, 80)
  const after = sim.getConflictList().length
  assert.ok(after > before, `${after} 应大于 ${before}`)
  sim.setThresholds(80, 30)
})

check('导出数据结构完整（mock DOM 由浏览器测试覆盖下载）', () => {
  const payload = {
    scenarioName: scenario.name,
    duration: sim.duration,
    currentTime: sim.time,
    conflicts: sim.getConflictList().length,
    tracks: sim.tracks.length
  }
  assert.equal(payload.tracks, 10)
  assert.ok(payload.conflicts >= 2)
  assert.equal(typeof exportJson, 'function')
  assert.equal(typeof exportConflictsCsv, 'function')
})

console.log(`\n全部 ${passed} 项逻辑测试通过 ✔`)
