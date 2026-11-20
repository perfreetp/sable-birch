import type { AircraftState, AircraftTrack, TrackPoint, Vec3 } from './types'

function lerp(a: number, b: number, u: number): number {
  return a + (b - a) * u
}

/** 二分查找定位 t 所在的航段 [i, i+1]，返回 i */
function findSegment(points: TrackPoint[], t: number): number {
  let lo = 0
  let hi = points.length - 2
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (t < points[mid].t) {
      hi = mid - 1
    } else if (t > points[mid + 1].t) {
      lo = mid + 1
    } else {
      return mid
    }
  }
  return Math.max(0, Math.min(lo, points.length - 2))
}

export interface SampledPoint {
  position: Vec3
  velocity: Vec3
}

/**
 * 按时间对单条航迹做线性插值。
 * 速度由相邻航迹点的差分得到（航段内恒定），保证机头朝向平滑跟随运动方向。
 */
export function sampleTrack(track: AircraftTrack, t: number): SampledPoint {
  const pts = track.points
  const n = pts.length

  if (n === 1) {
    const p = pts[0]
    return {
      position: { x: p.x, y: p.y, z: p.z },
      velocity: { x: 0, y: 0, z: 0 }
    }
  }

  const clamped = Math.max(pts[0].t, Math.min(t, pts[n - 1].t))
  const i = findSegment(pts, clamped)
  const a = pts[i]
  const b = pts[i + 1]
  const dt = Math.max(b.t - a.t, 1e-9)
  const u = (clamped - a.t) / dt

  const position: Vec3 = {
    x: lerp(a.x, b.x, u),
    y: lerp(a.y, b.y, u),
    z: lerp(a.z, b.z, u)
  }
  const velocity: Vec3 = {
    x: (b.x - a.x) / dt,
    y: (b.y - a.y) / dt,
    z: (b.z - a.z) / dt
  }
  return { position, velocity }
}

/** 计算某时刻一架飞行器的完整状态（含航向） */
export function evaluateAircraft(track: AircraftTrack, t: number): AircraftState {
  const { position, velocity } = sampleTrack(track, t)
  const startTime = track.points[0].t
  const endTime = track.points[track.points.length - 1].t
  const active = t >= startTime && t <= endTime
  const groundSpeed = Math.hypot(velocity.x, velocity.z)

  // 模型机头朝 -z（北）；heading 为速度水平方向相对 -z 绕 y 轴的转角
  let heading = 0
  if (groundSpeed > 1e-6) {
    heading = Math.atan2(velocity.x, -velocity.z)
  }

  return {
    id: track.id,
    active,
    position,
    velocity,
    groundSpeed,
    heading,
    startTime,
    endTime
  }
}

/** 在 [from, to] 区间按固定步长重采样一条航迹，用于拖尾重建 */
export function resampleForTrail(track: AircraftTrack, from: number, to: number, step: number): Vec3[] {
  const start = track.points[0].t
  const end = track.points[track.points.length - 1].t
  const lo = Math.max(from, start)
  const hi = Math.min(to, end)
  if (hi < lo) return []

  const out: Vec3[] = []
  for (let t = lo; t < hi - 1e-9; t += step) {
    out.push(sampleTrack(track, t).position)
  }
  out.push(sampleTrack(track, hi).position)
  return out
}

export function horizontalDistance(a: Vec3, b: Vec3): number {
  return Math.hypot(a.x - b.x, a.z - b.z)
}

export function verticalDistance(a: Vec3, b: Vec3): number {
  return Math.abs(a.y - b.y)
}
