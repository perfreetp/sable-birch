import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { TrajectoryResult, SeparationEvent, PHASE_LABELS } from '../lib/types'
import { K, llToScene } from './earth'
import { ecefToGeodetic } from '../lib/geo'

const LOW = new THREE.Color('#22d3ee') // 低空青
const MID = new THREE.Color('#a3e635') // 中层黄绿
const HIGH = new THREE.Color('#f97316') // 高空橙
const SPACE = new THREE.Color('#f43f5e') // 卡门线以上红

/** 高度 → 渐变色带 */
export function altitudeColor(altM: number, target = new THREE.Color()): THREE.Color {
  const t = Math.min(altM / 100_000, 1)
  if (t < 0.35) return target.lerpColors(LOW, MID, t / 0.35)
  if (t < 1) return target.lerpColors(MID, HIGH, (t - 0.35) / 0.65)
  return target.lerpColors(HIGH, SPACE, Math.min((altM - 100_000) / 300_000, 1))
}

export interface TrajectoryVisuals {
  group: THREE.Group
  lines: Line2[]
  tube: THREE.Mesh
  markers: THREE.Group
  impactZones: THREE.Group
  /** 全部弹道点（场景单位），用于回放索引 */
  pathPoints: THREE.Vector3[]
  /** 每个点对应的时间 s */
  pathTimes: number[]
  phaseBoundaries: number[]
  totalVertexCount: number
}

function makeGradientLine(points: THREE.Vector3[], altitudes: number[], resolution: THREE.Vector2): Line2 {
  const positions: number[] = []
  const colors: number[] = []
  const c = new THREE.Color()
  for (let i = 0; i < points.length; i++) {
    positions.push(points[i].x, points[i].y, points[i].z)
    altitudeColor(altitudes[i], c)
    colors.push(c.r, c.g, c.b)
  }
  const geo = new LineGeometry()
  geo.setPositions(positions)
  geo.setColors(colors)
  const mat = new LineMaterial({
    linewidth: 14, // 世界单位（km），全球视角下仍清晰可见
    vertexColors: true,
    dashed: false,
    transparent: true,
    opacity: 0.95,
    worldUnits: true,
    depthTest: false,
  })
  mat.resolution.copy(resolution)
  const line = new Line2(geo, mat)
  line.computeLineDistances()
  line.renderOrder = 15
  line.visible = true
  return line
}

/** 发光轨迹管：沿弹道点平滑生成管状网格，顶点按高度渐变色 */
function makeTrajectoryTube(points: THREE.Vector3[], altitudes: number[]): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.3)
  const tubularSegments = Math.min(points.length * 2, 600)
  const geo = new THREE.TubeGeometry(curve, tubularSegments, 6, 8, false)
  // 按管顶点在曲线上的 u 参数映射回弹道高度，再映射渐变色
  const pos = geo.getAttribute('position')
  const colors = new Float32Array(pos.count * 3)
  const c = new THREE.Color()
  const tmp = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    // TubeGeometry 截面环共享同一轴向 u，用顶点索引近似映射
    const u = Math.min(i / (pos.count - 1), 1)
    const sampleIdx = Math.min(Math.floor(u * (altitudes.length - 1)), altitudes.length - 1)
    altitudeColor(altitudes[sampleIdx], c)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
    tmp.fromBufferAttribute(pos, i)
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.name = 'trajectory-tube'
  mesh.renderOrder = 14
  // 回放：初始只显示起点
  geo.setDrawRange(0, 0)
  return mesh
}

function makeLabel(text: string, className: string): CSS2DObject {
  const el = document.createElement('div')
  el.className = `scene-label ${className}`
  el.textContent = text
  el.style.pointerEvents = 'none'
  return new CSS2DObject(el)
}

/** 分离事件标记（脉动球 + 发光环 + 文字） */
function makeMarker(ev: SeparationEvent): THREE.Group {
  const g = new THREE.Group()
  const pos = new THREE.Vector3(...ev.position).multiplyScalar(K)
  g.position.copy(pos)

  const color = new THREE.Color(ev.color)
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(22, 24, 16),
    new THREE.MeshBasicMaterial({ color, depthTest: false }),
  )
  core.name = 'core'
  core.renderOrder = 20
  g.add(core)

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(32, 38, 40),
    new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.85, depthWrite: false, depthTest: false }),
  )
  ring.name = 'ring'
  ring.renderOrder = 21
  g.add(ring)

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(36, 18, 12),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending }),
  )
  halo.name = 'halo'
  halo.renderOrder = 19
  g.add(halo)

  const label = makeLabel(ev.label, 'marker-label')
  label.position.set(0, 52, 0)
  g.add(label)
  g.userData = { event: ev }
  return g
}

/** 残骸落区：散布凸包贴椭球绘制 + 中心点（留轨级返回空组） */
function makeImpactZone(ev: SeparationEvent): THREE.Group {
  const g = new THREE.Group()
  g.name = `impact-${ev.kind}`
  if (ev.orbital) return g
  const color = new THREE.Color(ev.color)

  if (ev.impactZone.length >= 3) {
    const pts = ev.impactZone.map((p) => llToScene(p.lon, p.lat, 3))
    const shapePts = pts.map((p) => p.clone())
    // 用 LineLoop 画边界
    const loopPts = [...shapePts, shapePts[0]]
    const geo = new THREE.BufferGeometry().setFromPoints(loopPts)
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }))
    g.add(line)

    // 填充：扇形三角网
    const center = shapePts.reduce((acc, p) => acc.add(p), new THREE.Vector3()).multiplyScalar(1 / shapePts.length)
    const tri: number[] = []
    for (let i = 0; i < shapePts.length; i++) {
      const a = shapePts[i], b = shapePts[(i + 1) % shapePts.length]
      tri.push(center.x, center.y, center.z, a.x, a.y, a.z, b.x, b.y, b.z)
    }
    const fillGeo = new THREE.BufferGeometry()
    fillGeo.setAttribute('position', new THREE.Float32BufferAttribute(tri, 3))
    const fill = new THREE.Mesh(fillGeo, new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false,
    }))
    g.add(fill)
  }

  // 名义落点
  const impactPos = llToScene(ev.impact.lon, ev.impact.lat, 4)
  const dot = new THREE.Mesh(
    new THREE.CylinderGeometry(9, 9, 2, 20),
    new THREE.MeshBasicMaterial({ color }),
  )
  dot.position.copy(impactPos)
  dot.lookAt(0, 0, 0)
  g.add(dot)

  const label = makeLabel(`${ev.label}落区`, 'impact-label')
  label.position.copy(impactPos).multiplyScalar(1.002)
  g.add(label)
  return g
}

/** 发射场标注 */
export function makeSiteMarker(name: string, lon: number, lat: number): THREE.Group {
  const g = new THREE.Group()
  const pos = llToScene(lon, lat, 2)
  g.position.copy(pos)
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 10, 90, 16, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.35, depthWrite: false, side: THREE.DoubleSide }),
  )
  beam.position.copy(pos.clone().normalize().multiplyScalar(45))
  beam.lookAt(0, 0, 0)
  beam.rotateX(Math.PI / 2)
  g.add(beam)
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(10, 20, 14),
    new THREE.MeshBasicMaterial({ color: 0x67e8f9 }),
  )
  g.add(dot)
  const label = makeLabel(`发射场：${name}`, 'site-label')
  label.position.copy(pos.clone().normalize().multiplyScalar(26))
  g.add(label)
  return g
}

/** 简化三级火箭模型（Y 轴朝前） */
export function makeRocket(): THREE.Group {
  const g = new THREE.Group()
  const white = new THREE.MeshStandardMaterial({ color: 0xe8edf2, roughness: 0.45, metalness: 0.25 })
  const dark = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 })
  const accent = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 })

  const body = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 34, 20), white)
  g.add(body)
  const nose = new THREE.Mesh(new THREE.ConeGeometry(3.2, 10, 20), white)
  nose.position.y = 22
  g.add(nose)
  const band = new THREE.Mesh(new THREE.CylinderGeometry(3.35, 3.35, 3, 20), accent)
  band.position.y = 8
  g.add(band)
  const engine = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3.0, 4, 16), dark)
  engine.position.y = -19
  g.add(engine)
  // 尾焰
  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(2.6, 16, 16, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xfb923c, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }),
  )
  flame.rotateX(Math.PI)
  flame.position.y = -29
  flame.name = 'flame'
  g.add(flame)

  g.scale.setScalar(1.2)
  g.visible = false
  return g
}

export function buildTrajectoryVisuals(result: TrajectoryResult, resolution: THREE.Vector2): TrajectoryVisuals {
  const group = new THREE.Group()
  group.name = 'trajectory'

  const points = result.samples.map((s) => new THREE.Vector3(s.x, s.y, s.z).multiplyScalar(K))
  const altitudes = result.samples.map((s) => s.altitude)
  const times = result.samples.map((s) => s.t)

  // 按阶段分段绘制渐变线（段内仍按高度连续渐变）
  const lines: Line2[] = []
  const boundaries: number[] = [0]
  for (const ph of result.phases) {
    const idx = result.samples
      .map((s, i) => ({ i, t: s.t }))
      .filter((o) => o.t >= ph.t0 && o.t <= ph.t1)
      .map((o) => o.i)
    if (idx.length < 2) continue
    const segPts = idx.map((i) => points[i])
    const segAlt = idx.map((i) => altitudes[i])
    const line = makeGradientLine(segPts, segAlt, resolution)
    line.name = `line-${ph.id}`
    line.userData.label = PHASE_LABELS[ph.id]
    lines.push(line)
    group.add(line)
    boundaries.push(boundaries[boundaries.length - 1] + segPts.length - 1)
  }

  // 发光轨迹管：CatmullRom 平滑 + 高度渐变色，全球视角下比细线更醒目
  const tube = makeTrajectoryTube(points, altitudes)
  group.add(tube)

  const markers = new THREE.Group()
  markers.name = 'markers'
  for (const ev of result.events) markers.add(makeMarker(ev))
  group.add(markers)

  const impactZones = new THREE.Group()
  impactZones.name = 'impact-zones'
  for (const ev of result.events) impactZones.add(makeImpactZone(ev))
  group.add(impactZones)

  return {
    group, lines, tube, markers, impactZones,
    pathPoints: points, pathTimes: times,
    phaseBoundaries: boundaries,
    totalVertexCount: points.length,
  }
}

/** 更新渐变线已绘制比例 [0,1]（按全局顶点进度映射到各段，Line2 用 instanceCount 控制段数） */
export function setTrajectoryProgress(visuals: TrajectoryVisuals, progress: number) {
  const total = visuals.totalVertexCount
  const drawnGlobal = Math.max(1, Math.floor(progress * total))
  let acc = 0
  for (const line of visuals.lines) {
    // 该段折线的顶点数 = instanceStart 实例数 + 1
    const vertexCount = line.geometry.getAttribute('instanceStart').count + 1
    const local = THREE.MathUtils.clamp(drawnGlobal - acc, 0, vertexCount)
    // instanceCount = 渲染的线段（相邻顶点对）数
    line.geometry.instanceCount = Math.max(0, local - 1)
    line.visible = local >= 2
    acc += vertexCount - 1
  }
  // 轨迹管按进度更新 drawRange（索引数 = 段数 × 每段索引数）
  const tubeGeo = visuals.tube.geometry
  const maxIndex = tubeGeo.index ? tubeGeo.index.count : tubeGeo.getAttribute('position').count
  tubeGeo.setDrawRange(0, Math.floor(progress * maxIndex))
  visuals.tube.visible = progress > 0.002
}

/** 标记呼吸动画 + 环朝向相机 */
export function animateMarkers(markers: THREE.Group, elapsed: number, camera: THREE.Camera) {
  markers.children.forEach((m) => {
    const pulse = 1 + 0.18 * Math.sin(elapsed * 3)
    const core = m.getObjectByName('core')
    const halo = m.getObjectByName('halo')
    const ring = m.getObjectByName('ring') as THREE.Mesh | null
    if (core) core.scale.setScalar(pulse)
    if (halo) halo.scale.setScalar(1 + 0.12 * Math.sin(elapsed * 3 + 1))
    if (ring) ring.lookAt(camera.position)
  })
}

/** 火箭定位：位置取弹道点，Y 轴对齐速度方向 */
export function placeRocket(
  rocket: THREE.Group, result: TrajectoryResult, index: number,
): { pos: THREE.Vector3; vel: THREE.Vector3; sample: TrajectoryResult['samples'][number] } {
  const s = result.samples[THREE.MathUtils.clamp(index, 0, result.samples.length - 1)]
  const pos = new THREE.Vector3(s.x, s.y, s.z).multiplyScalar(K)
  const vel = new THREE.Vector3(s.vx, s.vy, s.vz)
  rocket.position.copy(pos)
  if (vel.lengthSq() > 1) {
    const target = pos.clone().add(vel.clone().normalize())
    rocket.up.set(0, 1, 0)
    rocket.lookAt(target)
    rocket.rotateX(Math.PI / 2) // 模型 Y 轴朝前 → 对齐速度
  }
  const flame = rocket.getObjectByName('flame')
  if (flame) flame.scale.setScalar(1 + 0.25 * Math.sin(performance.now() * 0.02))
  return { pos, vel, sample: s }
}

/** 时间 → 弹道采样索引（线性最近） */
export function sampleIndexAt(result: TrajectoryResult, t: number): number {
  const times = result.samples.map((s) => s.t)
  let lo = 0, hi = times.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (times[mid] < t) lo = mid + 1
    else hi = mid
  }
  return lo
}

export { ecefToGeodetic }
