import type { AircraftTrack, Scenario, TrackPoint, Vec3 } from './types'

/** 确定性伪随机 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const TYPES = ['EH216-S', 'AE200', 'Joby-S4', 'Volocopter', 'EHang-VT30']

function buildTrack(id: string, type: string, waypoints: Array<Vec3 & { t: number }>): AircraftTrack {
  const points: TrackPoint[] = waypoints.map((p) => ({ ...p }))
  points.sort((a, b) => a.t - b.t)
  return { id, type, points }
}

/**
 * 生成内置演示场景：10 架飞行器，其中刻意构造两组冲突对
 * （同高度对头/汇聚穿越），其余为随机巡航航迹。
 */
export function generateSampleScenario(): Scenario {
  const rnd = mulberry32(77)
  const aircraft: AircraftTrack[] = []

  // —— 冲突对 1：对头穿越，t≈40s 于原点上空相遇（同高度）——
  aircraft.push(
    buildTrack('UAM-01', TYPES[0], [
      { x: -600, y: 150, z: 0, t: 0 },
      { x: -200, y: 150, z: 0, t: 25 },
      { x: 0, y: 150, z: 0, t: 40 },
      { x: 200, y: 150, z: 0, t: 55 },
      { x: 600, y: 150, z: 0, t: 80 }
    ])
  )
  aircraft.push(
    buildTrack('UAM-02', TYPES[1], [
      { x: 600, y: 145, z: 30, t: 5 },
      { x: 200, y: 145, z: 20, t: 27 },
      { x: 0, y: 145, z: 10, t: 40 },
      { x: -200, y: 145, z: 0, t: 53 },
      { x: -600, y: 145, z: -10, t: 75 }
    ])
  )

  // —— 冲突对 2：汇聚穿越，t≈62s 于 (150,*, -120) 相遇 ——
  aircraft.push(
    buildTrack('UAM-03', TYPES[2], [
      { x: -350, y: 200, z: -400, t: 10 },
      { x: -100, y: 200, z: -260, t: 35 },
      { x: 150, y: 200, z: -120, t: 62 },
      { x: 400, y: 200, z: 20, t: 88 }
    ])
  )
  aircraft.push(
    buildTrack('UAM-04', TYPES[3], [
      { x: -200, y: 195, z: 250, t: 0 },
      { x: -20, y: 195, z: 60, t: 32 },
      { x: 150, y: 195, z: -120, t: 62 },
      { x: 320, y: 195, z: -300, t: 90 }
    ])
  )

  // —— 其余 6 架：从起降坪起飞后沿随机折线巡航 ——
  // 分配互不重叠的高度层（层间距 > 垂直阈值），避免随机航迹产生意外垂直接近，
  // 使演示场景的冲突集中在刻意构造的两对对头/汇聚航迹上。
  const altBands = [60, 105, 250, 295, 340, 385]
  for (let i = 5; i <= 10; i++) {
    const angle = rnd() * Math.PI * 2
    const cruiseAlt = altBands[i - 5] + Math.round((rnd() - 0.5) * 8)
    // 起始点沿坪面环形分布（半径 > 水平阈值），且起飞时刻彼此错峰，
    // 保证共坪爬升阶段水平间隔始终不越限，避免随机航迹产生非设计冲突
    const slot = i - 5
    const startAngle = (slot / 6) * Math.PI * 2
    let x = Math.cos(startAngle) * 110
    let z = Math.sin(startAngle) * 110
    let t = slot * 20
    const wp: Array<Vec3 & { t: number }> = [{ x, y: 0, z, t }]
    t += 12 + rnd() * 6
    wp.push({ x, y: cruiseAlt, z, t })

    const legs = 3 + Math.floor(rnd() * 3)
    for (let k = 0; k < legs; k++) {
      const dist = 220 + rnd() * 260
      x += Math.cos(angle + (rnd() - 0.5) * 1.2) * dist
      z += Math.sin(angle + (rnd() - 0.5) * 1.2) * dist
      x = THREE_clamp(x, -700, 700)
      z = THREE_clamp(z, -700, 700)
      t += 16 + rnd() * 10
      wp.push({ x, y: cruiseAlt + (rnd() - 0.5) * 8, z, t })
    }
    // 降落
    t += 14
    wp.push({ x, y: 0, z, t })
    aircraft.push(buildTrack(`UAM-${String(i).padStart(2, '0')}`, TYPES[i % TYPES.length], wp))
  }

  return {
    name: '演示场景 · 城市低空物流走廊',
    horizontalThreshold: 80,
    verticalThreshold: 30,
    aircraft
  }
}

function THREE_clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v))
}

/** 载入校验：结构不合法时抛出带中文说明的错误 */
export function validateScenario(raw: unknown): Scenario {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('文件内容不是有效的 JSON 对象')
  }
  const obj = raw as Record<string, unknown>
  const list = obj.aircraft
  if (!Array.isArray(list) || list.length === 0) {
    throw new Error('缺少 aircraft 航迹数组或数组为空')
  }

  const aircraft: AircraftTrack[] = list.map((item, idx) => {
    const ac = item as Record<string, unknown>
    if (typeof ac.id !== 'string' || !ac.id) {
      throw new Error(`第 ${idx + 1} 架飞行器缺少 id`)
    }
    if (!Array.isArray(ac.points) || ac.points.length < 1) {
      throw new Error(`飞行器 ${ac.id} 缺少航迹点 points`)
    }
    const points: TrackPoint[] = (ac.points as Record<string, unknown>[]).map((p, k) => {
      const t = Number(p.t)
      const x = Number(p.x)
      const y = Number(p.y)
      const z = Number(p.z)
      if ([t, x, y, z].some((n) => !Number.isFinite(n))) {
        throw new Error(`飞行器 ${ac.id} 第 ${k + 1} 个航迹点字段非法（需要数值型 t/x/y/z）`)
      }
      return { t, x, y, z }
    }).sort((a, b) => a.t - b.t)
    return {
      id: ac.id,
      type: typeof ac.type === 'string' ? ac.type : undefined,
      points
    }
  })

  const ids = new Set(aircraft.map((a) => a.id))
  if (ids.size !== aircraft.length) {
    throw new Error('飞行器 id 存在重复')
  }

  const h = Number(obj.horizontalThreshold)
  const v = Number(obj.verticalThreshold)
  return {
    name: typeof obj.name === 'string' ? obj.name : '未命名场景',
    horizontalThreshold: Number.isFinite(h) && h > 0 ? h : 80,
    verticalThreshold: Number.isFinite(v) && v > 0 ? v : 30,
    aircraft
  }
}
