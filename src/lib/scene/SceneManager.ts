import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Text } from 'troika-three-text'
import type { AircraftState, ConflictRecord } from '../types'
import type { Simulation } from '../simulation'
import { resampleForTrail } from '../interpolate'
import arialUrl from '../../assets/fonts/arial.ttf?url'

/** 拖尾保留时长（秒） */
const TRAIL_DURATION = 20
/** 拖尾采样步长（秒） */
const TRAIL_STEP = 0.25
/** 单条拖尾顶点上限 */
const TRAIL_MAX = 1200
const LABEL_BASE_FONT = 3.4
const LABEL_LIFT = 14

const COLOR_BODY = new THREE.Color(0x4fc3f7)
const COLOR_SELECTED = new THREE.Color(0xffd54f)
const COLOR_CONFLICT = new THREE.Color(0xff5252)
const COLOR_IDLE = new THREE.Color(0x607d8b)
const COLOR_LABEL_OK = 0xd7f0ff
const COLOR_LABEL_WARN = 0xff5252
const COLOR_LABEL_IDLE = 0x8aa0ad

/** 每架飞行器在场景中的可视对象集合 */
interface AircraftView {
  id: string
  group: THREE.Group
  body: THREE.Mesh
  trail: THREE.Line
  trailGeom: THREE.BufferGeometry
  trailPositions: Float32Array
  trailAlphas: Float32Array
  trailPts: number
  trailTimes: number[]
  label: Text
  labelText: string
  labelWarn: boolean
  labelIdle: boolean
  /** 标签防重叠后的屏幕偏移（米，世界单位） */
  labelOffset: THREE.Vector3
}

/** 确定性伪随机，用于城市楼宇布局 */
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

export class SceneManager {
  private container: HTMLElement
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private raycaster = new THREE.Raycaster()
  private pointer = new THREE.Vector2()
  private clock = new THREE.Clock()

  private views = new Map<string, AircraftView>()
  private conflictLines = new Map<string, THREE.Line>()
  private conflictMat: THREE.LineBasicMaterial
  private selectRing: THREE.Mesh

  private sim: Simulation | null = null
  selectedId: string | null = null

  /** 相机聚焦补间 */
  private focusTween: {
    targetPos: THREE.Vector3
    camPos: THREE.Vector3
    t: number
    dur: number
  } | null = null

  /** 指针拾取状态（区分点击与轨道拖拽） */
  private downX = 0
  private downY = 0

  onPick: ((id: string | null) => void) | null = null
  onBackgroundClick: (() => void) | null = null

  private resizeObs: ResizeObserver
  private tmpV = new THREE.Vector3()
  private tmpV2 = new THREE.Vector3()
  private tmpQ = new THREE.Quaternion()
  private labelProject: THREE.Vector3[] = []

  constructor(container: HTMLElement) {
    this.container = container

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.1
    container.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x0b1220)
    this.scene.fog = new THREE.FogExp2(0x0b1220, 0.00055)

    this.camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.5,
      5000
    )
    this.camera.position.set(320, 260, 420)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.maxDistance = 1800
    this.controls.minDistance = 20
    this.controls.target.set(0, 120, 0)

    this.buildEnvironment()

    this.conflictMat = new THREE.LineBasicMaterial({
      color: 0xff3b30,
      transparent: true,
      opacity: 0.9,
      depthTest: false
    })

    this.selectRing = new THREE.Mesh(
      new THREE.RingGeometry(5.2, 6.4, 40),
      new THREE.MeshBasicMaterial({
        color: 0xffd54f,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        depthTest: false
      })
    )
    this.selectRing.rotation.x = -Math.PI / 2
    this.selectRing.visible = false
    this.scene.add(this.selectRing)

    this.renderer.domElement.addEventListener('pointerdown', this.handleDown)
    this.renderer.domElement.addEventListener('pointerup', this.handleUp)

    this.resizeObs = new ResizeObserver(() => this.handleResize())
    this.resizeObs.observe(container)
  }

  // ---------------------------------------------------------------- 环境

  private buildEnvironment(): void {
    const hemi = new THREE.HemisphereLight(0xbcd8ff, 0x1a2433, 1.1)
    this.scene.add(hemi)
    const dir = new THREE.DirectionalLight(0xffffff, 1.6)
    dir.position.set(300, 500, 200)
    this.scene.add(dir)

    // 地面
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(2400, 2400),
      new THREE.MeshBasicMaterial({ color: 0x101a2c })
    )
    ground.rotation.x = -Math.PI / 2
    this.scene.add(ground)

    const grid = new THREE.GridHelper(2400, 60, 0x2a4a6b, 0x1a2c42)
    ;(grid.material as THREE.Material).transparent = true
    ;(grid.material as THREE.Material).opacity = 0.55
    this.scene.add(grid)

    // 城市楼宇（确定性布局，避开中心起降区）
    const rnd = mulberry32(20261121)
    const boxGeo = new THREE.BoxGeometry(1, 1, 1)
    const matA = new THREE.MeshStandardMaterial({ color: 0x1e3148, roughness: 0.85, metalness: 0.2 })
    const matB = new THREE.MeshStandardMaterial({ color: 0x27425f, roughness: 0.8, metalness: 0.25 })
    for (let i = 0; i < 110; i++) {
      const x = (rnd() - 0.5) * 1500
      const z = (rnd() - 0.5) * 1500
      if (Math.hypot(x, z) < 90) continue
      const w = 18 + rnd() * 40
      const d = 18 + rnd() * 40
      const h = 25 + rnd() * 170
      const m = new THREE.Mesh(boxGeo, rnd() > 0.5 ? matA : matB)
      m.scale.set(w, h, d)
      m.position.set(x, h / 2, z)
      this.scene.add(m)
    }

    // 中心起降坪
    const pad = new THREE.Mesh(
      new THREE.CylinderGeometry(36, 36, 1.2, 48),
      new THREE.MeshStandardMaterial({ color: 0x2e5d8a, emissive: 0x123047, roughness: 0.6 })
    )
    pad.position.y = 0.6
    this.scene.add(pad)
  }

  // ---------------------------------------------------------------- 场景装载

  loadSimulation(sim: Simulation): void {
    this.clearAircraft()
    this.sim = sim
    this.selectedId = null

    for (const track of sim.tracks) {
      const view = this.createAircraftView(track.id)
      this.views.set(track.id, view)
      this.scene.add(view.group)
      this.scene.add(view.trail)
      this.scene.add(view.label)
    }
    this.rebuildAllTrails(sim.time)
    this.update(sim.time)
  }

  private clearAircraft(): void {
    for (const v of this.views.values()) {
      this.scene.remove(v.group, v.trail, v.label)
      v.group.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
        }
      })
      v.trailGeom.dispose()
      ;(v.trail.material as THREE.Material).dispose()
      v.label.dispose()
    }
    this.views.clear()
    for (const line of this.conflictLines.values()) {
      this.scene.remove(line)
      line.geometry.dispose()
      ;(line.material as THREE.Material).dispose()
    }
    this.conflictLines.clear()
    this.selectRing.visible = false
  }

  private createAircraftView(id: string): AircraftView {
    const group = new THREE.Group()

    // 机身：沿 -z 的圆锥；机翼/尾翼用扁盒
    const bodyMat = new THREE.MeshStandardMaterial({
      color: COLOR_BODY,
      roughness: 0.4,
      metalness: 0.35
    })
    const body = new THREE.Mesh(new THREE.ConeGeometry(1.7, 7.5, 12), bodyMat)
    body.rotation.x = -Math.PI / 2 // 锥尖对准 -z（机头）
    body.userData.aircraftId = id
    group.add(body)

    const wing = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.28, 1.7), bodyMat)
    wing.position.z = 0.6
    wing.userData.aircraftId = id
    group.add(wing)

    const tail = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.25, 1.3), bodyMat)
    tail.position.set(0, 0.5, 2.9)
    tail.userData.aircraftId = id
    group.add(tail)

    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.8, 1.4), bodyMat)
    fin.position.set(0, 1.2, 2.7)
    fin.userData.aircraftId = id
    group.add(fin)

    // 渐隐拖尾：position + alpha 自定义着色
    const trailPositions = new Float32Array(TRAIL_MAX * 3)
    const trailAlphas = new Float32Array(TRAIL_MAX)
    const trailGeom = new THREE.BufferGeometry()
    trailGeom.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3))
    trailGeom.setAttribute('aAlpha', new THREE.BufferAttribute(trailAlphas, 1))
    trailGeom.setDrawRange(0, 0)
    const trailMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vAlpha;
        uniform vec3 uColor;
        void main() {
          gl_FragColor = vec4(uColor, vAlpha * 0.85);
        }
      `,
      uniforms: { uColor: { value: new THREE.Color(0x54d0ff) } }
    })
    const trail = new THREE.Line(trailGeom, trailMat)
    trail.frustumCulled = false

    const label = new Text()
    label.font = arialUrl
    label.fontSize = LABEL_BASE_FONT
    label.anchorX = 'center'
    label.anchorY = 'bottom'
    label.outlineWidth = 0.18
    label.outlineColor = 0x06101c
    label.color = COLOR_LABEL_OK
    label.renderOrder = 999
    label.text = ''
    label.sync()

    return {
      id,
      group,
      body,
      trail,
      trailGeom,
      trailPositions,
      trailAlphas,
      trailPts: 0,
      trailTimes: [],
      label,
      labelText: '',
      labelWarn: false,
      labelIdle: false,
      labelOffset: new THREE.Vector3()
    }
  }

  // ---------------------------------------------------------------- 拖尾

  /** 正常播放：追加当前时刻位置 */
  pushTrailPoint(view: AircraftView, time: number, pos: THREE.Vector3): void {
    view.trailTimes.push(time)
    // 丢弃超出保留窗口的旧点
    while (view.trailTimes.length && view.trailTimes[0] < time - TRAIL_DURATION) {
      view.trailTimes.shift()
    }
    const keepFrom = view.trailPts - view.trailTimes.length
    if (keepFrom > 0) this.compactTrail(view, keepFrom)
    this.writeTrailVertex(view, view.trailPts++, pos)
    if (view.trailPts >= TRAIL_MAX) {
      this.compactTrail(view, Math.floor(TRAIL_MAX / 4))
    }
    this.refreshTrail(view, time)
  }

  /** 拖动/装载：按 [time-TRAIL_DURATION, time] 重采样重建 */
  rebuildTrail(view: AircraftView, time: number): void {
    if (!this.sim) return
    const track = this.sim.tracks.find((t) => t.id === view.id)
    if (!track) return
    const pts = resampleForTrail(
      track,
      Math.max(0, time - TRAIL_DURATION),
      time,
      TRAIL_STEP
    )
    view.trailPts = Math.min(pts.length, TRAIL_MAX)
    view.trailTimes = []
    const start = Math.max(0, time - TRAIL_DURATION)
    for (let k = 0; k < view.trailPts; k++) {
      const p = pts[k]
      const idx = k * 3
      view.trailPositions[idx] = p.x
      view.trailPositions[idx + 1] = p.y
      view.trailPositions[idx + 2] = p.z
      view.trailTimes.push(start + k * TRAIL_STEP)
    }
    this.refreshTrail(view, time)
  }

  private rebuildAllTrails(time: number): void {
    for (const view of this.views.values()) {
      this.rebuildTrail(view, time)
    }
  }

  private compactTrail(view: AircraftView, drop: number): void {
    const remain = view.trailPts - drop
    view.trailPositions.copyWithin(0, drop * 3, view.trailPts * 3)
    view.trailAlphas.copyWithin(0, drop, view.trailPts)
    view.trailPts = remain
  }

  private writeTrailVertex(view: AircraftView, idx: number, pos: THREE.Vector3): void {
    const i3 = idx * 3
    view.trailPositions[i3] = pos.x
    view.trailPositions[i3 + 1] = pos.y
    view.trailPositions[i3 + 2] = pos.z
  }

  /** 依据每个点的年龄刷新 alpha：尾部 1 -> 头部方向渐隐到 0 */
  private refreshTrail(view: AircraftView, time: number): void {
    const n = view.trailPts
    for (let k = 0; k < n; k++) {
      const age = time - (view.trailTimes[k] ?? time)
      const f = Math.max(0, 1 - age / TRAIL_DURATION)
      view.trailAlphas[k] = f * f
    }
    view.trailGeom.setDrawRange(0, n)
    ;(view.trailGeom.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
    ;(view.trailGeom.getAttribute('aAlpha') as THREE.BufferAttribute).needsUpdate = true
    view.trailGeom.computeBoundingSphere()
  }

  /** 时间轴拖动：全部航迹按新时刻重建拖尾并刷新 */
  handleScrub(time: number): void {
    if (!this.sim) return
    this.rebuildAllTrails(time)
    this.update(time, false)
  }

  /** 阈值变化等场景参数变化后的静默刷新 */
  refresh(time: number): void {
    this.update(time, false)
  }

  // ---------------------------------------------------------------- 每帧更新

  /**
   * 依据仿真当前状态刷新全部可视对象。
   * @param time     仿真时刻
   * @param playing  是否处于播放（播放时追加拖尾点）
   */
  update(time: number, playing = false): void {
    if (!this.sim) return
    const sim = this.sim

    for (const [id, view] of this.views) {
      const st = sim.states.get(id)
      if (!st) continue

      view.group.visible = true
      view.group.position.set(st.position.x, st.position.y, st.position.z)
      // 机头朝向跟随速度方向（静止时保持上一航向）
      if (st.groundSpeed > 1e-6) {
        this.tmpQ.setFromEuler(new THREE.Euler(0, st.heading, 0))
        view.group.quaternion.copy(this.tmpQ)
      }

      if (playing && st.active) {
        this.tmpV.set(st.position.x, st.position.y, st.position.z)
        this.pushTrailPoint(view, time, this.tmpV)
      }

      // 外观：冲突 > 选中 > 存活 > 待命/结束
      const inConflict = sim.isInConflict(id)
      const mat = view.body.material as THREE.MeshStandardMaterial
      if (inConflict) mat.color.copy(COLOR_CONFLICT)
      else if (id === this.selectedId) mat.color.copy(COLOR_SELECTED)
      else if (st.active) mat.color.copy(COLOR_BODY)
      else mat.color.copy(COLOR_IDLE)
      view.group.scale.setScalar(st.active ? 1 : 0.8)

      this.updateLabel(view, st, inConflict)
    }

    this.updateConflictLines()
    this.updateSelectionRing(time)
    this.resolveLabelOverlap()
    this.updateFocusTween()
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  private updateLabel(view: AircraftView, st: AircraftState, inConflict: boolean): void {
    const text = `${view.id}\nALT ${Math.round(st.position.y)} m`
    const idle = !st.active
    if (text !== view.labelText) {
      view.label.text = text
      view.labelText = text
      view.label.sync()
    }
    let color = COLOR_LABEL_OK
    if (inConflict) color = COLOR_LABEL_WARN
    else if (idle) color = COLOR_LABEL_IDLE
    if (inConflict !== view.labelWarn || idle !== view.labelIdle) {
      view.labelWarn = inConflict
      view.labelIdle = idle
      view.label.color = color
      view.label.sync()
    }
    // 随距离自动缩放：保证屏幕上字号恒定，近处不炸屏、远处可读
    this.tmpV.copy(view.group.position)
    const dist = this.tmpV.distanceTo(this.camera.position)
    const scale = Math.max(0.55, dist / 220)
    view.label.scale.setScalar(scale)
  }

  /** 屏幕空间防重叠：投影到 NDC，迭代推开重叠标签（偏移换算回世界单位） */
  private resolveLabelOverlap(): void {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    const entries: Array<{
      view: AircraftView
      px: number
      py: number
      halfW: number
      halfH: number
      depth: number
    }> = []

    for (const view of this.views.values()) {
      const anchor = this.tmpV.copy(view.group.position).add(this.tmpV2.set(0, LABEL_LIFT, 0))
      const proj = anchor.clone().project(this.camera)
      if (proj.z > 1) {
        view.label.visible = false
        continue
      }
      view.label.visible = true
      const px = (proj.x * 0.5 + 0.5) * w
      const py = (-proj.y * 0.5 + 0.5) * h
      const dist = anchor.distanceTo(this.camera.position)
      // 估算标签像素包围盒（两行，字号经 scale 放大）
      const worldW = (view.labelText.split('\n')[0]?.length ?? 4) * LABEL_BASE_FONT * 0.62 * view.label.scale.x
      const worldH = 2.4 * LABEL_BASE_FONT * view.label.scale.x
      const halfW = (worldW / dist) * (h / (2 * Math.tan(this.camera.fov * Math.PI / 360))) / 2
      const halfH = (worldH / dist) * (h / (2 * Math.tan(this.camera.fov * Math.PI / 360))) / 2
      entries.push({ view, px, py, halfW: halfW + 6, halfH: halfH + 4, depth: dist })
    }

    // 远的先固定，近的向外推
    entries.sort((a, b) => b.depth - a.depth)
    for (let pass = 0; pass < 4; pass++) {
      for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
          const a = entries[i]
          const b = entries[j]
          const dx = b.px - a.px
          const dy = b.py - a.py
          const ox = a.halfW + b.halfW - Math.abs(dx)
          const oy = a.halfH + b.halfH - Math.abs(dy)
          if (ox > 0 && oy > 0) {
            if (ox < oy) {
              const push = ox / 2
              b.px += dx >= 0 ? push : -push
              a.px -= dx >= 0 ? push : -push
            } else {
              const push = oy / 2
              b.py += dy >= 0 ? push : -push
              a.py -= dy >= 0 ? push : -push
            }
          }
        }
      }
    }

    // 把像素偏移还原为相机右/上方向的世界位移
    const camRight = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0)
    const camUp = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1)
    for (const e of entries) {
      const baseX = (e.view.group.position.x)
      const baseY = e.view.group.position.y + LABEL_LIFT
      const baseZ = e.view.group.position.z
      // 原始屏幕坐标
      const baseProj = new THREE.Vector3(baseX, baseY, baseZ).project(this.camera)
      const basePx = (baseProj.x * 0.5 + 0.5) * w
      const basePy = (-baseProj.y * 0.5 + 0.5) * h
      const shiftPx = e.px - basePx
      const shiftPy = e.py - basePy
      const worldPerPx =
        e.depth * (2 * Math.tan((this.camera.fov * Math.PI) / 360)) / h
      e.view.labelOffset
        .set(0, 0, 0)
        .addScaledVector(camRight, shiftPx * worldPerPx)
        .addScaledVector(camUp, -shiftPy * worldPerPx)
      e.view.label.position.set(
        baseX + e.view.labelOffset.x,
        baseY + e.view.labelOffset.y,
        baseZ + e.view.labelOffset.z
      )
      e.view.label.quaternion.copy(this.camera.quaternion)
    }
  }

  // ---------------------------------------------------------------- 告警连线

  private updateConflictLines(): void {
    if (!this.sim) return
    const pairs = this.sim.getActivePairs()
    const live = new Set(pairs.map((p) => p.key))

    for (const { key, a, b } of pairs) {
      let line = this.conflictLines.get(key)
      if (!line) {
        const geom = new THREE.BufferGeometry()
        geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
        line = new THREE.Line(geom, this.conflictMat.clone())
        line.renderOrder = 998
        line.frustumCulled = false
        this.conflictLines.set(key, line)
        this.scene.add(line)
      }
      const sa = this.sim.states.get(a)
      const sb = this.sim.states.get(b)
      if (!sa || !sb) continue
      const arr = (line.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array
      arr[0] = sa.position.x; arr[1] = sa.position.y; arr[2] = sa.position.z
      arr[3] = sb.position.x; arr[4] = sb.position.y; arr[5] = sb.position.z
      ;(line.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
      line.visible = true
    }

    for (const [key, line] of this.conflictLines) {
      if (!live.has(key)) {
        line.visible = false
      }
    }
  }

  private updateSelectionRing(time: number): void {
    if (!this.sim || !this.selectedId) {
      this.selectRing.visible = false
      return
    }
    const st = this.sim.states.get(this.selectedId)
    if (!st || !st.active) {
      this.selectRing.visible = false
      return
    }
    this.selectRing.visible = true
    this.selectRing.position.set(st.position.x, st.position.y - 3.2, st.position.z)
    const pulse = 1 + 0.12 * Math.sin(time * 6)
    this.selectRing.scale.setScalar(pulse)
  }

  // ---------------------------------------------------------------- 拾取与聚焦

  private handleDown = (e: PointerEvent): void => {
    this.downX = e.clientX
    this.downY = e.clientY
  }

  private handleUp = (e: PointerEvent): void => {
    if (Math.hypot(e.clientX - this.downX, e.clientY - this.downY) > 5) return
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)

    const meshes: THREE.Object3D[] = []
    for (const v of this.views.values()) meshes.push(v.body, ...v.group.children)
    const hits = this.raycaster.intersectObjects(meshes, false)
    if (hits.length > 0) {
      let obj: THREE.Object3D | null = hits[0].object
      while (obj && !obj.userData.aircraftId) obj = obj.parent
      const id = obj?.userData.aircraftId as string | undefined
      if (id) {
        this.select(id)
        this.onPick?.(id)
        return
      }
    }
    this.select(null)
    this.onBackgroundClick?.()
  }

  select(id: string | null): void {
    this.selectedId = id
  }

  /** 侧边列表点击：选中并把相机平滑聚焦到飞行器 */
  focusOn(id: string): void {
    if (!this.sim) return
    const st = this.sim.states.get(id)
    if (!st) return
    this.selectedId = id
    const target = new THREE.Vector3(st.position.x, st.position.y, st.position.z)
    // 保持当前观察距离与俯角，整体平移到目标附近
    const offset = this.camera.position.clone().sub(this.controls.target)
    const dist = THREE.MathUtils.clamp(offset.length(), 60, 500)
    offset.setLength(dist)
    this.focusTween = {
      targetPos: target,
      camPos: target.clone().add(offset),
      t: 0,
      dur: 0.7
    }
  }

  private updateFocusTween(): void {
    if (!this.focusTween) return
    const tw = this.focusTween
    tw.t += Math.min(this.clock.getDelta(), 0.05) / tw.dur
    const k = tw.t >= 1 ? 1 : 1 - Math.pow(1 - tw.t, 3) // easeOutCubic
    this.controls.target.lerp(tw.targetPos, k)
    this.camera.position.lerp(tw.camPos, k)
    if (tw.t >= 1) this.focusTween = null
  }

  // ---------------------------------------------------------------- 生命周期

  private handleResize(): void {
    const w = this.container.clientWidth
    const h = Math.max(this.container.clientHeight, 1)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  getClock(): THREE.Clock {
    return this.clock
  }

  dispose(): void {
    this.resizeObs.disconnect()
    this.renderer.domElement.removeEventListener('pointerdown', this.handleDown)
    this.renderer.domElement.removeEventListener('pointerup', this.handleUp)
    this.clearAircraft()
    this.controls.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
