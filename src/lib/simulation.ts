import type {
  AircraftState,
  AircraftSummary,
  AircraftTrack,
  ConflictRecord,
  Scenario
} from './types'
import { evaluateAircraft, horizontalDistance, verticalDistance } from './interpolate'

/** 拖动回放时全量重扫的时间步长（秒） */
const RESCAN_STEP = 0.5

function pairKey(a: string, b: string): string {
  return [a, b].sort().join('::')
}

/**
 * 推演核心：持有场景与当前时刻，负责逐帧状态计算、两两间隔检测、
 * 冲突记录维护，以及拖动时间轴后的全量重扫重建。
 */
export class Simulation {
  scenario: Scenario
  time = 0
  duration = 0
  states = new Map<string, AircraftState>()
  /** key -> 冲突记录（含已闭合的历史记录） */
  conflicts = new Map<string, ConflictRecord>()
  /** 当前帧处于冲突的 key 集合 */
  activeKeys = new Set<string>()
  /** 每架飞行器累计涉及的冲突次数（闭合记录计 1 次，活动中计 1 次） */
  private conflictCounts = new Map<string, number>()

  constructor(scenario: Scenario) {
    this.scenario = scenario
    let maxEnd = 0
    for (const ac of scenario.aircraft) {
      maxEnd = Math.max(maxEnd, ac.points[ac.points.length - 1].t)
    }
    this.duration = maxEnd
    this.evaluate(0)
  }

  get tracks(): AircraftTrack[] {
    return this.scenario.aircraft
  }

  get hThreshold(): number {
    return this.scenario.horizontalThreshold
  }

  get vThreshold(): number {
    return this.scenario.verticalThreshold
  }

  setThresholds(h: number, v: number): void {
    this.scenario.horizontalThreshold = h
    this.scenario.verticalThreshold = v
    // 阈值变化后历史记录不再可比，全量重建
    this.rebuildFromScratch(this.time)
  }

  /** 逐帧推进：计算所有飞行器状态并检测冲突 */
  evaluate(t: number): AircraftState[] {
    this.time = Math.max(0, Math.min(t, this.duration))
    const list: AircraftState[] = []
    for (const track of this.scenario.aircraft) {
      const st = evaluateAircraft(track, this.time)
      this.states.set(track.id, st)
      list.push(st)
    }
    this.detectConflicts(list)
    return list
  }

  /**
   * 拖动时间轴：跳到目标时刻，全部航迹重算位置，
   * 并对 [0, target] 全量重扫以重建冲突记录（保证来回拖动统计一致）。
   */
  scrubTo(target: number): AircraftState[] {
    this.rebuildFromScratch(target)
    return this.evaluate(target)
  }

  private rebuildFromScratch(target: number): void {
    this.conflicts.clear()
    this.activeKeys.clear()
    this.conflictCounts.clear()

    const steps = Math.max(1, Math.ceil(target / RESCAN_STEP))
    for (let k = 0; k <= steps; k++) {
      const t = Math.min(k * RESCAN_STEP, target)
      const states = this.scenario.aircraft.map((tr) => evaluateAircraft(tr, t))
      this.detectConflicts(states, t)
    }
    // 重扫结束后，非 target 时刻仍活动的记录需要闭合
    for (const rec of this.conflicts.values()) {
      if (rec.active && Math.abs(rec.endTime - target) > 1e-6) {
        rec.active = false
      }
    }
    this.recomputeCounts()
  }

  private detectConflicts(states: AircraftState[], atTime: number = this.time): void {
    const seen = new Set<string>()
    const n = states.length
    const hTh = this.hThreshold
    const vTh = this.vThreshold

    for (let i = 0; i < n; i++) {
      const a = states[i]
      if (!a.active) continue
      for (let j = i + 1; j < n; j++) {
        const b = states[j]
        if (!b.active) continue

        const dh = horizontalDistance(a.position, b.position)
        const dv = verticalDistance(a.position, b.position)
        const key = pairKey(a.id, b.id)

        if (dh < hTh && dv < vTh) {
          seen.add(key)
          let rec = this.conflicts.get(key)
          if (!rec) {
            rec = {
              key,
              aircraftA: [a.id, b.id].sort()[0],
              aircraftB: [a.id, b.id].sort()[1],
              startTime: atTime,
              endTime: atTime,
              minHorizontal: dh,
              verticalAtMinH: dv,
              active: true
            }
            this.conflicts.set(key, rec)
          }
          rec.endTime = atTime
          rec.active = true
          if (dh < rec.minHorizontal) {
            rec.minHorizontal = dh
            rec.verticalAtMinH = dv
          }
        }
      }
    }

    // 本帧未触发但仍标记活动的记录 -> 闭合
    for (const rec of this.conflicts.values()) {
      if (rec.active && !seen.has(rec.key)) {
        rec.active = false
      }
    }
    this.activeKeys = seen
    this.recomputeCounts()
  }

  private recomputeCounts(): void {
    this.conflictCounts.clear()
    for (const rec of this.conflicts.values()) {
      this.conflictCounts.set(
        rec.aircraftA,
        (this.conflictCounts.get(rec.aircraftA) ?? 0) + 1
      )
      this.conflictCounts.set(
        rec.aircraftB,
        (this.conflictCounts.get(rec.aircraftB) ?? 0) + 1
      )
    }
  }

  /** 侧边列表数据：按冲突数降序，同数次按编号 */
  getSummaries(): AircraftSummary[] {
    return this.scenario.aircraft.map((track) => {
      const st = this.states.get(track.id)
      const pos = st?.position ?? track.points[0]
      return {
        id: track.id,
        active: st?.active ?? false,
        altitude: pos.y,
        groundSpeed: st?.groundSpeed ?? 0,
        conflictTotal: this.conflictCounts.get(track.id) ?? 0,
        inConflictNow: this.isInConflict(track.id)
      }
    }).sort((a, b) =>
      b.conflictTotal - a.conflictTotal ||
      Number(b.inConflictNow) - Number(a.inConflictNow) ||
      a.id.localeCompare(b.id)
    )
  }

  isInConflict(id: string): boolean {
    for (const key of this.activeKeys) {
      if (key.includes(id)) return true
    }
    return false
  }

  /** 当前活动冲突 -> 告警连线端点对 */
  getActivePairs(): Array<{ key: string; a: string; b: string }> {
    const out: Array<{ key: string; a: string; b: string }> = []
    for (const rec of this.conflicts.values()) {
      if (rec.active) out.push({ key: rec.key, a: rec.aircraftA, b: rec.aircraftB })
    }
    return out
  }

  getConflictList(): ConflictRecord[] {
    return [...this.conflicts.values()].sort((a, b) => a.startTime - b.startTime)
  }
}
