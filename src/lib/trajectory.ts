import * as THREE from 'three'
import {
  WGS84, E2, B, deg2rad, geodeticToECEF, ecefToGeodetic, enuBasis, azimuthToHorizontal,
} from './geo'
import {
  LaunchParams, PhaseId, PhaseInfo, TrajectoryResult, TrajectorySample,
  SeparationEvent, SeparationKind, SEPARATION_COLORS,
} from './types'

const G0 = 9.80665
const RHO0 = 1.225
const SCALE_H = 8500
const R_MEAN = (2 * WGS84.a + B) / 3

/** 火箭总体参数（内部模型，TWR 由输入决定起飞推力）
 *  理想 Δv 预算 ≈ 9.65 km/s（Isp 380s），扣除重力/阻力/转向损失后满足 LEO 入轨 */
export const VEHICLE = {
  m0: 300_000, // 起飞质量 kg
  boosterProp: 0.39, // 占 m0
  boosterDry: 0.033,
  s1Prop: 0.29,
  s1Dry: 0.028,
  s2Prop: 0.195,
  s2Dry: 0.023,
  cdA: 3.2, // 火箭本体 Cd·A m²（直径~3.7m 参考面积 10.8m² × Cd≈0.3）
  debrisCdAOverM: 0.008, // 残骸 (Cd·A)/m，稠密落体
  isp: 380, // 发动机比冲 s（决定质量流 ṁ = T / (Isp·g0)）
}

const T_VERT = 10 // 垂直飞行时间 s
const T_BOOST = 65 // 助推段结束 s
const T_S1 = 168 // 一级结束 s
const DT = 1 // 积分步长 s
const COAST_MAX = 900

interface SimState {
  r: THREE.Vector3
  v: THREE.Vector3
  m: number
}

interface StageClock {
  tVert: number
  tBoost: number
  tS1: number
  tS2: number
}

/** 指数大气密度 */
function density(h: number): number {
  if (h < 0) return RHO0
  return RHO0 * Math.exp(-h / SCALE_H)
}

/** ECEF 系下的加速度（含离心、科氏力） */
function acceleration(
  s: SimState, t: number, thrustDir: THREE.Vector3 | null, thrust: number,
): THREE.Vector3 {
  const r = s.r, v = s.v
  const rNorm = r.length()
  // 中心引力
  const a = r.clone().multiplyScalar(-WGS84.mu / (rNorm ** 3))

  // 地球自转修正（ECEF 旋转系，公式 a_rot = a_inertial − 2Ω×v − Ω×(Ω×r)）
  const omega = new THREE.Vector3(0, 0, WGS84.omega)
  const centrifugal = omega.clone().cross(omega.clone().cross(r)) // Ω×(Ω×r)，向外
  const coriolis = omega.clone().cross(v).multiplyScalar(-2) // −2Ω×v
  a.add(centrifugal).add(coriolis)

  // 推力
  if (thrustDir && thrust > 0) {
    a.addScaledVector(thrustDir, thrust / s.m)
  }

  // 气动阻力（相对旋转大气的速度）
  const geo = ecefToGeodetic(r)
  const rho = density(geo.h)
  if (rho > 1e-9) {
    const vRel = v.clone().sub(omega.clone().cross(r))
    const q = 0.5 * rho * vRel.lengthSq()
    if (q > 0) {
      a.addScaledVector(vRel.clone().normalize(), -(q * VEHICLE.cdA) / s.m)
    }
  }
  return a
}

/**
 * 程序俯仰角（相对当地水平面，度）——连续重力转弯剖面。
 * 基于动态阶段时钟：垂直段后指数压坡，一级末段转低，二级压平入轨。
 */
function programmedGammaDeg(t: number, clk?: StageClock): number {
  if (t <= T_VERT) return 89.5
  const tBoost = clk?.tBoost || T_BOOST
  const tS1 = clk?.tS1 || T_S1
  const tS2 = clk?.tS2 || tS1 + 200
  if (t < tBoost) {
    const s = (t - T_VERT) / Math.max(tBoost - T_VERT, 1)
    const e = s * s * (3 - 2 * s)
    return 89.5 - 12 * e // → ~77.5°
  }
  if (t < tS1) {
    const s = (t - tBoost) / Math.max(tS1 - tBoost, 1)
    const e = s * s * (3 - 2 * s)
    return 77.5 - 62 * e // → 15.5°
  }
  const s = THREE.MathUtils.clamp((t - tS1) / Math.max(tS2 - tS1, 1), 0, 1)
  const e = s * s * (3 - 2 * s)
  return 15.5 - 14.3 * e // → 1.2°
}

/** 当前推力方向：椭球法线天 + 方位角水平方向，按程序俯仰角合成 */
function thrustDirection(
  r: THREE.Vector3, lon: number, lat: number, azimuth: number, gamma: number,
): THREE.Vector3 {
  const basis = enuBasis(lon, lat)
  const az = azimuthToHorizontal(azimuth)
  const horizontal = basis.east.clone().multiplyScalar(az.e)
    .addScaledVector(basis.north, az.n)
  // 大地垂直（椭球法线），与程序俯仰角的参考面一致
  const up = basis.up.clone()
  return horizontal.multiplyScalar(Math.cos(gamma)).addScaledVector(up, Math.sin(gamma)).normalize()
}

/** 大地经纬度处的椭球法线单位向量（天向） */
function geo2up(lon: number, lat: number): THREE.Vector3 {
  return enuBasis(lon, lat).up.clone()
}

function rk4(s: SimState, t: number, dt: number, dir: THREE.Vector3 | null, thrust: number): SimState {
  const deriv = (st: SimState, tt: number) => ({
    dr: st.v.clone(),
    dv: acceleration(st, tt, dir, thrust),
    dm: 0,
  })
  const k1 = deriv(s, t)
  const s2: SimState = {
    r: s.r.clone().addScaledVector(k1.dr, dt / 2),
    v: s.v.clone().addScaledVector(k1.dv, dt / 2),
    m: s.m,
  }
  const k2 = deriv(s2, t + dt / 2)
  const s3: SimState = {
    r: s.r.clone().addScaledVector(k2.dr, dt / 2),
    v: s.v.clone().addScaledVector(k2.dv, dt / 2),
    m: s.m,
  }
  const k3 = deriv(s3, t + dt / 2)
  const s4: SimState = {
    r: s.r.clone().addScaledVector(k3.dr, dt),
    v: s.v.clone().addScaledVector(k3.dv, dt),
    m: s.m,
  }
  const k4 = deriv(s4, t + dt)
  return {
    r: s.r.clone()
      .addScaledVector(k1.dr, dt / 6).addScaledVector(k2.dr, dt / 3)
      .addScaledVector(k3.dr, dt / 3).addScaledVector(k4.dr, dt / 6),
    v: s.v.clone()
      .addScaledVector(k1.dv, dt / 6).addScaledVector(k2.dv, dt / 3)
      .addScaledVector(k3.dv, dt / 3).addScaledVector(k4.dv, dt / 6),
    m: s.m,
  }
}

function makeSample(s: SimState, t: number, phase: PhaseId): TrajectorySample {
  const geo = ecefToGeodetic(s.r)
  const up = s.r.clone().normalize()
  const vUp = s.v.dot(up)
  const vHoriz = Math.sqrt(Math.max(0, s.v.lengthSq() - vUp * vUp))
  return {
    t,
    x: s.r.x, y: s.r.y, z: s.r.z,
    vx: s.v.x, vy: s.v.y, vz: s.v.z,
    altitude: geo.h,
    speed: s.v.length(),
    flightPathAngle: THREE.MathUtils.radToDeg(Math.atan2(vUp, vHoriz)),
    phase,
  }
}

/**
 * 完整积分一次。
 * @param pitchScale 俯仰程序整体缩放：>1 更陡（爬得高、水平速度低），<1 更平（加速早、顶点低）
 * @param s2MaxBurn 二级最长燃烧时间（燃料约束在循环内处理）
 */
/** @internal 诊断用导出 */
export function simulate(params: LaunchParams, pitchScale: number, _s2MaxBurnUnused: number) {
  const r0 = geodeticToECEF(params.longitude, params.latitude, 0)
  let state: SimState = { r: r0.clone(), v: new THREE.Vector3(0, 0, 0), m: VEHICLE.m0 }

  // 各阶段推重比（相对该阶段初始质量），输入 TWR 决定起飞段
  const twrBoost = params.thrustToWeight
  const twrS1 = 3.0
  const twrS2 = 2.2
  const dryBooster = VEHICLE.boosterDry * VEHICLE.m0
  const dryS1 = VEHICLE.s1Dry * VEHICLE.m0
  const dryS2 = VEHICLE.s2Dry * VEHICLE.m0
  const mAtS1 = VEHICLE.m0 * (1 - VEHICLE.boosterProp) - dryBooster
  const mAtS2 = mAtS1 - VEHICLE.s1Prop * VEHICLE.m0 - dryS1
  const thrustTable: Record<PhaseId, number> = {
    boost: twrBoost * VEHICLE.m0 * G0,
    stage1: twrS1 * mAtS1 * G0,
    stage2: twrS2 * mAtS2 * G0,
    coast: 0,
  }
  // 质量流由比冲决定：ṁ = T / (Isp·g0)
  const ve = VEHICLE.isp * G0
  const propBudget: Record<PhaseId, number> = {
    boost: VEHICLE.boosterProp * VEHICLE.m0,
    stage1: VEHICLE.s1Prop * VEHICLE.m0,
    stage2: VEHICLE.s2Prop * VEHICLE.m0,
    coast: 0,
  }
  const propUsed: Record<PhaseId, number> = { boost: 0, stage1: 0, stage2: 0, coast: 0 }
  const flowOf = (phase: PhaseId) => (thrustTable[phase] > 0 ? thrustTable[phase] / ve : 0)
  const dryDrop: Record<SeparationKind, number> = { booster: dryBooster, stage1: dryS1, stage2: dryS2 }
  const phaseOrder: PhaseId[] = ['boost', 'stage1', 'stage2', 'coast']
  const sepOfPhase: Record<PhaseId, SeparationKind | null> = {
    boost: 'booster', stage1: 'stage1', stage2: 'stage2', coast: null,
  }

  // 动态阶段时钟：边界在燃料耗尽时确定
  const clk: StageClock = { tVert: T_VERT, tBoost: 0, tS1: 0, tS2: 0 }
  let phase: PhaseId = 'boost' as PhaseId
  const samples: TrajectorySample[] = [makeSample(state, 0, 'boost')]
  const eventStates: { kind: SeparationKind; t: number; state: SimState }[] = []
  const tEnd = 2000
  let t = 0
  let reachedTarget = false
  let lastMaxAlt = 0
  let actualS2End = 0

  const advancePhase = (atTime: number) => {
    const sep = sepOfPhase[phase]
    if (sep) {
      eventStates.push({ kind: sep, t: atTime, state: { ...state, r: state.r.clone(), v: state.v.clone() } })
      state.m -= dryDrop[sep]
    }
    if (phase === 'boost') clk.tBoost = atTime
    else if (phase === 'stage1') clk.tS1 = atTime
    else if (phase === 'stage2') { clk.tS2 = atTime; actualS2End = atTime }
    phase = phaseOrder[phaseOrder.indexOf(phase) + 1]
  }

  while (t < tEnd - 1e-9) {
    const flow = flowOf(phase)
    const propLeft = propBudget[phase] - propUsed[phase]
    const thrust = phase === 'coast' || propLeft <= 1e-6 ? 0 : thrustTable[phase]

    // 燃料耗尽 → 阶段推进（在本步积分前判定，先把当前步长截断到耗尽时刻）
    let dt = DT
    if (phase !== 'coast' && flow > 0) dt = Math.min(dt, propLeft / flow)

    let dir: THREE.Vector3 | null = null
    if (thrust > 0 && t >= T_VERT) {
      const geo = ecefToGeodetic(state.r)
      const speed = state.v.length()
      const baseDeg = programmedGammaDeg(t, clk)
      const gammaDeg = 90 - (90 - baseDeg) / pitchScale
      const gamma = deg2rad(THREE.MathUtils.clamp(gammaDeg, 0.5, 90))
      const programDir = thrustDirection(state.r, geo.lon, geo.lat, params.azimuth, gamma)
      const up = geo2up(geo.lon, geo.lat)

      if (speed > 25) {
        const vDir = state.v.clone().normalize()
        if (phase === 'stage2') {
          // 二级强程序制导：权重随时间升至 0.95，强制压平到近圆轨（弹道角→~0）
          const s = THREE.MathUtils.clamp((t - (clk.tS1 || T_S1)) / Math.max((clk.tS2 || 300) - (clk.tS1 || T_S1), 1), 0, 1)
          const w = 0.3 + 0.65 * s
          dir = vDir.clone().lerp(programDir, w).normalize()
        } else {
          // 助推/一级：重力转弯，程序角作下限防止压平撞地
          dir = vDir
          if (dir.dot(up) < programDir.dot(up)) dir = programDir
        }
      } else {
        dir = programDir
      }
    } else if (thrust > 0) {
      dir = state.r.clone().normalize()
    }

    const dm = Math.min(flow * dt, Math.max(propLeft, 0))
    const next = rk4(state, t, dt, dir, thrust)
    next.m = state.m - dm
    propUsed[phase] += dm
    state = next
    t += dt
    samples.push(makeSample(state, t, phase))

    // 燃料耗尽 → 分离/关机，推进阶段
    if (phase !== 'coast' && propBudget[phase] - propUsed[phase] <= 1e-6) {
      advancePhase(t)
    }

    const h = ecefToGeodetic(state.r).h
    const targetH = params.targetOrbitAltitudeKm * 1000
    if (phase === 'coast') {
      // 首次到达目标入轨高度即结束（亚轨道式上升入轨，速度已达轨道级）
      if (h >= targetH) { reachedTarget = true; break }
      // 弹道顶点已过且明显回落 → 本次燃烧不足以入轨
      if (t > clk.tS2 + 90 && h < lastMaxAlt - 15000) break
      lastMaxAlt = Math.max(lastMaxAlt, h)
      if (t >= clk.tS2 + COAST_MAX) break
    } else if (h < -2000) {
      break // 动力段穿地保护
    }
  }

  return { samples, eventStates, clk, finalState: state, reachedTarget, actualS2End }
}

/** 残骸弹道：从分离状态自由落体（重力 + 阻力），求椭球面交点 */
function impactPoint(
  r0: THREE.Vector3, v0: THREE.Vector3, perturbDir?: THREE.Vector3, perturbSpeed = 0,
): { lon: number; lat: number; flightTime: number; rangeKm: number } | null {
  const state: SimState = { r: r0.clone(), v: v0.clone(), m: 1 }
  if (perturbDir) {
    state.v = perturbDir.clone().multiplyScalar(v0.length() * (1 + perturbSpeed))
  }
  const omega = new THREE.Vector3(0, 0, WGS84.omega)
  const maxT = 7200
  let t = 0
  let prev = state.r.clone()
  let prevH = ecefToGeodetic(state.r).h
  const dt = 2
  while (t < maxT) {
    const rNorm = state.r.length()
    const a = state.r.clone().multiplyScalar(-WGS84.mu / rNorm ** 3)
    a.add(omega.clone().cross(omega.clone().cross(state.r)).negate())
    const geo = ecefToGeodetic(state.r)
    const rho = density(geo.h)
    if (rho > 1e-9) {
      const vRel = state.v.clone().sub(omega.clone().cross(state.r))
      const q = 0.5 * rho * vRel.lengthSq()
      a.addScaledVector(vRel.normalize(), -q * VEHICLE.debrisCdAOverM)
    }
    state.v.addScaledVector(a, dt)
    prev = state.r.clone()
    state.r.addScaledVector(state.v, dt)
    t += dt
    const h = ecefToGeodetic(state.r).h
    if (h <= 0) {
      // 线性插值到椭球面
      const f = prevH / (prevH - h)
      const hit = prev.clone().lerp(state.r, f)
      const g = ecefToGeodetic(hit)
      const central = Math.acos(THREE.MathUtils.clamp(hit.clone().normalize().dot(r0.clone().normalize()), -1, 1))
      return { lon: g.lon, lat: g.lat, flightTime: t - dt + f * dt, rangeKm: (central * R_MEAN) / 1000 }
    }
    prevH = h
  }
  return null
}

/** 单调链凸包（经纬度平面） */
function convexHull(points: { lon: number; lat: number }[]): { lon: number; lat: number }[] {
  const pts = [...points].sort((a, b) => a.lon - b.lon || a.lat - b.lat)
  if (pts.length <= 2) return pts
  const cross = (o: typeof pts[0], a: typeof pts[0], b: typeof pts[0]) =>
    (a.lon - o.lon) * (b.lat - o.lat) - (a.lat - o.lat) * (b.lon - o.lon)
  const lower: typeof pts = []
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop()
    lower.push(p)
  }
  const upper: typeof pts = []
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i]
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop()
    upper.push(p)
  }
  lower.pop()
  upper.pop()
  return lower.concat(upper)
}

/** 落区：速度矢量方向/大小扰动后的落点散布凸包 */
function computeImpactZone(r: THREE.Vector3, v: THREE.Vector3) {
  const nominal = impactPoint(r, v)
  if (!nominal) return { zone: [] as { lon: number; lat: number }[], nominal: null as null | typeof nominal }
  const pts = [nominal]
  const vHat = v.clone().normalize()
  // 方向锥 ±2°、大小 ±3% 的扰动组合
  const ref = Math.abs(vHat.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0)
  const u = new THREE.Vector3().crossVectors(vHat, ref).normalize()
  const w = new THREE.Vector3().crossVectors(vHat, u).normalize()
  for (const ang of [-2, 2]) {
    for (const dV of [-0.03, 0.03]) {
      const rad = deg2rad(ang)
      const dir = vHat.clone().multiplyScalar(Math.cos(rad))
        .addScaledVector(u, Math.sin(rad) * 0.7)
        .addScaledVector(w, Math.sin(rad) * 0.7)
        .normalize()
      const hit = impactPoint(r, v, dir, dV)
      if (hit) pts.push(hit)
    }
  }
  return { zone: convexHull(pts), nominal }
}

/** 计算轨道近地点高度（km）与比机械能（MJ/kg），用于留轨判定 */
function orbitElements(r: THREE.Vector3, v: THREE.Vector3): { perigeeKm: number; energyMJ: number; isOrbital: boolean } {
  const mu = WGS84.mu
  const rMag = r.length()
  const energy = v.lengthSq() / 2 - mu / rMag // 比机械能 J/kg
  const h = new THREE.Vector3().crossVectors(r, v).length()
  const a = -mu / (2 * energy)
  const e = energy >= 0 ? 1 : Math.sqrt(Math.max(0, 1 - (h * h) / (mu * a)))
  const rp = energy >= 0 ? rMag : a * (1 - e)
  const perigeeKm = (rp - WGS84.a) / 1000
  // 近地点高于卡门线，或能量非负（逃逸/圆轨），视为留轨
  const isOrbital = perigeeKm > 100 || energy >= 0
  return { perigeeKm, energyMJ: energy / 1e6, isOrbital }
}

const EVENT_LABELS: Record<SeparationKind, string> = {
  booster: '助推器分离',
  stage1: '一级分离',
  stage2: '二级分离',
}

/** 主入口：计算三级飞行弹道 */
export function computeTrajectory(params: LaunchParams): TrajectoryResult {
  const targetH = params.targetOrbitAltitudeKm * 1000

  // 二级最大燃烧时长（燃料 / 质量流），由 Isp 与二级 TWR 物理决定
  const dryBooster = VEHICLE.boosterDry * VEHICLE.m0
  const dryS1 = VEHICLE.s1Dry * VEHICLE.m0
  const mAtS1 = VEHICLE.m0 * (1 - VEHICLE.boosterProp) - dryBooster
  const mAtS2 = mAtS1 - VEHICLE.s1Prop * VEHICLE.m0 - dryS1
  const s2Thrust = 2.2 * mAtS2 * G0
  const s2Flow = s2Thrust / (VEHICLE.isp * G0)
  const s2MaxBurn = (VEHICLE.s2Prop * VEHICLE.m0) / s2Flow

  // 二分搜索俯仰缩放：pitchScale 越大 → 转弯越浅、顶点越高
  let lo = 0.15
  let hi = 5.0
  let best = simulate(params, hi, s2MaxBurn)
  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) / 2
    const sim = simulate(params, mid, s2MaxBurn)
    const h = ecefToGeodetic(sim.finalState.r).h
    if (!sim.reachedTarget || h < targetH) lo = mid
    else hi = mid
    best = sim
    if (sim.reachedTarget && Math.abs(h - targetH) < 2000) break
  }

  const { samples, eventStates, clk } = best
  const last = samples[samples.length - 1]

  const phases: PhaseInfo[] = [
    { id: 'boost', label: '助推段', t0: 0, t1: clk.tBoost },
    { id: 'stage1', label: '一级飞行', t0: clk.tBoost, t1: clk.tS1 },
    { id: 'stage2', label: '二级飞行', t0: clk.tS1, t1: clk.tS2 },
    { id: 'coast', label: '滑行入轨', t0: clk.tS2, t1: last.t },
  ]

  const events: SeparationEvent[] = eventStates.map(({ kind, t, state }) => {
    const geo = ecefToGeodetic(state.r)
    const orb = orbitElements(state.r, state.v)
    // 留轨级（近地点高于卡门线或逃逸能量）不做再入落点投影
    const { zone, nominal } = orb.isOrbital
      ? { zone: [] as { lon: number; lat: number }[], nominal: null }
      : computeImpactZone(state.r, state.v)
    return {
      kind,
      label: EVENT_LABELS[kind],
      t,
      position: [state.r.x, state.r.y, state.r.z] as [number, number, number],
      velocity: [state.v.x, state.v.y, state.v.z] as [number, number, number],
      speed: state.v.length(),
      altitude: geo.h,
      impact: nominal ?? { lon: geo.lon, lat: geo.lat, flightTime: 0, rangeKm: 0 },
      impactZone: zone,
      orbital: orb.isOrbital,
      perigeeKm: orb.perigeeKm,
      color: SEPARATION_COLORS[kind],
    }
  })

  return {
    params,
    samples,
    phases,
    events,
    duration: last.t,
    insertionSpeed: last.speed,
    insertionAltitude: last.altitude,
    generatedAt: new Date().toISOString(),
    schemaVersion: 1,
  }
}

export const DEFAULT_LAUNCH_PARAMS: LaunchParams = {
  longitude: 110.95,
  latitude: 19.61,
  azimuth: 90,
  targetOrbitAltitudeKm: 400,
  thrustToWeight: 1.8,
  siteName: '文昌航天发射场',
}
