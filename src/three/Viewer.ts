import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh'
import { state } from '../state'
import { voxelDownsample } from './pointcloud'
import {
  buildTerrainGrid,
  buildTerrainGeometry,
  bilinearHeight,
  type TerrainGrid,
} from './terrain'
import { extractContours, makeTextSprite } from './contours'

const LIFT = 0.05 // 线要素抬升高度,避免与地形面深度冲突

function disposeObject(root: THREE.Object3D): void {
  root.traverse(o => {
    const anyO = o as any
    if (anyO.geometry) anyO.geometry.dispose()
    if (anyO.material) {
      const mats = Array.isArray(anyO.material) ? anyO.material : [anyO.material]
      for (const m of mats) {
        if (m.map) m.map.dispose()
        m.dispose()
      }
    }
  })
}

function clearGroup(g: THREE.Group): void {
  for (const child of [...g.children]) {
    g.remove(child)
    disposeObject(child)
  }
}

export class Viewer {
  grid: TerrainGrid | null = null

  private container: HTMLElement
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private raycaster = new THREE.Raycaster()

  private rawPoints: Float32Array | null = null
  private downPoints: Float32Array | null = null
  private pointsObj: THREE.Points | null = null
  private meshObj: THREE.Mesh | null = null

  private contourGroup = new THREE.Group()
  private sectionGroup = new THREE.Group()
  private measureGroup = new THREE.Group()
  private markerGroup = new THREE.Group()

  private rectFirst: { x: number; y: number } | null = null
  private measureFirst: THREE.Vector3 | null = null
  private draggingSection = false
  private diag = 100
  private raf = 0
  private resizeObs: ResizeObserver

  constructor(container: HTMLElement) {
    this.container = container
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this.renderer.domElement)

    this.scene.background = new THREE.Color(0x14171c)

    this.camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      20000,
    )
    this.camera.up.set(0, 0, 1)
    this.camera.position.set(50, -70, 55)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.12

    const hemi = new THREE.HemisphereLight(0xffffff, 0x33414f, 1.05)
    const dir = new THREE.DirectionalLight(0xfff2dd, 1.7)
    dir.position.set(80, -50, 120)
    this.scene.add(hemi, dir)
    this.scene.add(this.contourGroup, this.sectionGroup, this.measureGroup, this.markerGroup)
    this.scene.add(new THREE.AxesHelper(5))

    ;(this.raycaster as any).firstHitOnly = true

    const dom = this.renderer.domElement
    dom.addEventListener('pointerdown', this.onPointerDown)
    dom.addEventListener('pointermove', this.onPointerMove)
    window.addEventListener('pointerup', this.onPointerUp)

    this.resizeObs = new ResizeObserver(() => this.onResize())
    this.resizeObs.observe(container)

    this.animate()
  }

  // ---------- 数据 ----------

  setPointCloud(pts: Float32Array, name: string): void {
    this.rawPoints = pts
    state.rawCount = pts.length / 3
    state.fileName = name
    state.section = null
    state.sectionEnabled = false
    this.clearMeasure()
    this.rebuildTerrain()
    this.frameScene()
    state.status = `已加载 ${name},共 ${state.rawCount.toLocaleString()} 点`
  }

  /** 由导入的格网恢复地形(无点云) */
  setTerrainFromGrid(grid: TerrainGrid): void {
    this.rawPoints = null
    this.downPoints = null
    this.grid = grid
    state.rawCount = 0
    state.downsampledCount = 0
    state.gridInfo = { nx: grid.nx, ny: grid.ny, minH: grid.minH, maxH: grid.maxH }
    state.hasTerrain = true
    this.buildMesh()
    this.refreshPoints()
    this.rebuildContours()
    this.updateSection()
    this.frameScene()
  }

  rebuildTerrain(): void {
    if (!this.rawPoints) return
    this.downPoints = voxelDownsample(this.rawPoints, state.voxelSize)
    state.downsampledCount = this.downPoints.length / 3
    this.grid = buildTerrainGrid(this.downPoints, state.voxelSize)
    state.gridInfo = {
      nx: this.grid.nx,
      ny: this.grid.ny,
      minH: this.grid.minH,
      maxH: this.grid.maxH,
    }
    state.hasTerrain = true
    this.buildMesh()
    this.refreshPoints()
    this.rebuildContours()
    this.updateSection()
  }

  // ---------- 网格 / 点云 ----------

  private buildMesh(): void {
    if (!this.grid) return
    if (this.meshObj) {
      this.scene.remove(this.meshObj)
      disposeObject(this.meshObj)
    }
    const geo = buildTerrainGeometry(this.grid)
    ;(geo as any).boundsTree = new MeshBVH(geo)
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.95,
      metalness: 0.0,
    })
    const mesh = new THREE.Mesh(geo, mat)
    ;(mesh as any).raycast = acceleratedRaycast
    mesh.visible = state.showMesh
    this.meshObj = mesh
    this.scene.add(mesh)
  }

  refreshPoints(): void {
    if (this.pointsObj) {
      this.scene.remove(this.pointsObj)
      disposeObject(this.pointsObj)
      this.pointsObj = null
    }
    const src = state.pointsSource === 'raw' ? this.rawPoints : this.downPoints
    if (!src) return
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(src, 3))
    const mat = new THREE.PointsMaterial({
      color: state.pointsSource === 'raw' ? 0x7ec8ff : 0xffd27a,
      size: state.pointSize,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    })
    this.pointsObj = new THREE.Points(geo, mat)
    this.pointsObj.visible = state.showPoints
    this.scene.add(this.pointsObj)
  }

  setPointSize(v: number): void {
    if (this.pointsObj) (this.pointsObj.material as THREE.PointsMaterial).size = v
  }

  setPointsVisible(v: boolean): void {
    if (this.pointsObj) this.pointsObj.visible = v
  }

  setMeshVisible(v: boolean): void {
    if (this.meshObj) this.meshObj.visible = v
  }

  // ---------- 等高线 ----------

  rebuildContours(): void {
    clearGroup(this.contourGroup)
    if (!state.contourEnabled || !this.grid) return
    const levels = extractContours(this.grid, state.contourInterval)
    const labelH = this.diag * 0.016
    let labels = 0
    for (const lv of levels) {
      const n = lv.segments.length / 4
      const pos = new Float32Array(n * 6)
      for (let k = 0; k < n; k++) {
        pos[k * 6] = lv.segments[k * 4]
        pos[k * 6 + 1] = lv.segments[k * 4 + 1]
        pos[k * 6 + 2] = lv.level + LIFT
        pos[k * 6 + 3] = lv.segments[k * 4 + 2]
        pos[k * 6 + 4] = lv.segments[k * 4 + 3]
        pos[k * 6 + 5] = lv.level + LIFT
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const line = new THREE.LineSegments(
        geo,
        new THREE.LineBasicMaterial({ color: 0x241505, transparent: true, opacity: 0.85 }),
      )
      this.contourGroup.add(line)
      // 高程标注:每条等高线均匀取若干线段中点
      if (state.contourLabels && labels < 300) {
        const step = Math.max(1, Math.floor(n / 4))
        for (let k = 0; k < n && labels < 300; k += step) {
          const mx = (lv.segments[k * 4] + lv.segments[k * 4 + 2]) / 2
          const my = (lv.segments[k * 4 + 1] + lv.segments[k * 4 + 3]) / 2
          const sprite = makeTextSprite(lv.level.toFixed(1), labelH)
          sprite.position.set(mx, my, lv.level + LIFT * 2)
          this.contourGroup.add(sprite)
          labels++
        }
      }
    }
  }

  // ---------- 探方与剖切 ----------

  updateSection(): void {
    clearGroup(this.sectionGroup)
    state.profile = null
    const sec = state.section
    if (!state.sectionEnabled || !sec || !this.grid) return
    const g = this.grid

    // 探方边界(贴地形)
    const perimeter: THREE.Vector3[] = []
    const edges: [number, number, number, number][] = [
      [sec.x1, sec.y1, sec.x2, sec.y1],
      [sec.x2, sec.y1, sec.x2, sec.y2],
      [sec.x2, sec.y2, sec.x1, sec.y2],
      [sec.x1, sec.y2, sec.x1, sec.y1],
    ]
    for (const [ax, ay, bx, by] of edges) {
      const m = 40
      for (let k = 0; k <= m; k++) {
        const x = ax + ((bx - ax) * k) / m
        const y = ay + ((by - ay) * k) / m
        const h = bilinearHeight(g, x, y)
        if (h !== null) perimeter.push(new THREE.Vector3(x, y, h + LIFT))
      }
    }
    if (perimeter.length > 1) {
      const geo = new THREE.BufferGeometry().setFromPoints(perimeter)
      this.sectionGroup.add(
        new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xffb74d })),
      )
    }

    // 剖切线位置
    let ax: number, ay: number, bx: number, by: number
    if (sec.dir === 'x') {
      const y = sec.y1 + sec.t * (sec.y2 - sec.y1)
      ax = sec.x1; ay = y; bx = sec.x2; by = y
    } else {
      const x = sec.x1 + sec.t * (sec.x2 - sec.x1)
      ax = x; ay = sec.y1; bx = x; by = sec.y2
    }
    const length = Math.hypot(bx - ax, by - ay)
    if (length < 1e-6) return

    // 沿剖切线采样剖面
    const N = 240
    const ds: number[] = []
    const hs: number[] = []
    const linePts: THREE.Vector3[] = []
    let pMin = Infinity, pMax = -Infinity
    for (let k = 0; k <= N; k++) {
      const s = k / N
      const x = ax + (bx - ax) * s
      const y = ay + (by - ay) * s
      const h = bilinearHeight(g, x, y)
      if (h === null) continue
      const d = s * length
      ds.push(d)
      hs.push(h)
      linePts.push(new THREE.Vector3(x, y, h + LIFT))
      if (h < pMin) pMin = h
      if (h > pMax) pMax = h
    }
    if (linePts.length < 2) return
    state.profile = { d: ds, h: hs, length }

    // 剖面轮廓线
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts)
    this.sectionGroup.add(
      new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xff3d00 })),
    )

    // 剖切平面(半透明)
    const margin = Math.max(0.3, (pMax - pMin) * 0.15)
    const z0 = pMin - margin
    const z1 = pMax + margin
    const quad = new THREE.BufferGeometry()
    quad.setAttribute(
      'position',
      new THREE.BufferAttribute(
        new Float32Array([ax, ay, z0, bx, by, z0, bx, by, z1, ax, ay, z1]),
        3,
      ),
    )
    quad.setIndex([0, 1, 2, 0, 2, 3])
    quad.computeVertexNormals()
    this.sectionGroup.add(
      new THREE.Mesh(
        quad,
        new THREE.MeshBasicMaterial({
          color: 0xff3d00,
          transparent: true,
          opacity: 0.13,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      ),
    )
  }

  clearSection(): void {
    state.section = null
    state.sectionEnabled = false
    state.profile = null
    this.rectFirst = null
    clearGroup(this.sectionGroup)
    clearGroup(this.markerGroup)
  }

  // ---------- 测量 ----------

  clearMeasure(): void {
    this.measureFirst = null
    state.measureResult = null
    clearGroup(this.measureGroup)
  }

  private drawMeasure(a: THREE.Vector3, b?: THREE.Vector3): void {
    clearGroup(this.measureGroup)
    const r = this.diag * 0.005
    const mkSphere = (p: THREE.Vector3, color: number) => {
      const s = new THREE.Mesh(
        new THREE.SphereGeometry(r, 16, 12),
        new THREE.MeshBasicMaterial({ color }),
      )
      s.position.copy(p)
      this.measureGroup.add(s)
    }
    mkSphere(a, 0x4fc3f7)
    if (!b) return
    mkSphere(b, 0xff8a65)
    const geo = new THREE.BufferGeometry().setFromPoints([
      a.clone().setZ(a.z + LIFT),
      b.clone().setZ(b.z + LIFT),
    ])
    this.measureGroup.add(
      new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x4fc3f7 })),
    )
    const dist = Math.hypot(b.x - a.x, b.y - a.y)
    const dh = b.z - a.z
    const sprite = makeTextSprite(
      `水平 ${dist.toFixed(2)} m\n高差 ${dh >= 0 ? '+' : ''}${dh.toFixed(2)} m`,
      this.diag * 0.02,
      '#b3e5fc',
    )
    sprite.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, Math.max(a.z, b.z) + this.diag * 0.03)
    this.measureGroup.add(sprite)
  }

  // ---------- 模式切换 ----------

  onModeChange(): void {
    this.rectFirst = null
    this.measureFirst = null
    clearGroup(this.markerGroup)
    clearGroup(this.measureGroup)
    if (state.mode !== 'measure') state.measureResult = null
  }

  // ---------- 拾取与交互 ----------

  private pickTerrain(ev: PointerEvent): THREE.Vector3 | null {
    if (!this.meshObj) return null
    const rect = this.renderer.domElement.getBoundingClientRect()
    const ndc = new THREE.Vector2(
      ((ev.clientX - rect.left) / rect.width) * 2 - 1,
      -((ev.clientY - rect.top) / rect.height) * 2 + 1,
    )
    this.raycaster.setFromCamera(ndc, this.camera)
    const hits = this.raycaster.intersectObject(this.meshObj, false)
    return hits.length > 0 ? hits[0].point.clone() : null
  }

  private sectionPerpDist(p: THREE.Vector3): number {
    const sec = state.section!
    return sec.dir === 'x'
      ? Math.abs(p.y - (sec.y1 + sec.t * (sec.y2 - sec.y1)))
      : Math.abs(p.x - (sec.x1 + sec.t * (sec.x2 - sec.x1)))
  }

  private setSectionTFromPoint(p: THREE.Vector3): void {
    const sec = state.section!
    const t =
      sec.dir === 'x'
        ? (p.y - sec.y1) / (sec.y2 - sec.y1)
        : (p.x - sec.x1) / (sec.x2 - sec.x1)
    sec.t = Math.min(1, Math.max(0, t))
  }

  private onPointerDown = (ev: PointerEvent): void => {
    if (ev.button !== 0) return
    const p = this.pickTerrain(ev)
    if (state.mode === 'rect') {
      if (!p) return
      if (!this.rectFirst) {
        this.rectFirst = { x: p.x, y: p.y }
        clearGroup(this.markerGroup)
        const s = new THREE.Mesh(
          new THREE.SphereGeometry(this.diag * 0.006, 16, 12),
          new THREE.MeshBasicMaterial({ color: 0xffb74d }),
        )
        s.position.copy(p)
        this.markerGroup.add(s)
        state.status = '已确定探方第一角点,请点击对角'
      } else {
        const c = this.rectFirst
        this.rectFirst = null
        clearGroup(this.markerGroup)
        const prev = state.section
        state.section = {
          x1: Math.min(c.x, p.x),
          y1: Math.min(c.y, p.y),
          x2: Math.max(c.x, p.x),
          y2: Math.max(c.y, p.y),
          t: prev ? prev.t : 0.5,
          dir: prev ? prev.dir : 'x',
        }
        state.sectionEnabled = true
        state.mode = 'view'
        this.updateSection()
        state.status = '探方已建立,可在剖切线附近按住拖动平移剖切面'
      }
      return
    }
    if (state.mode === 'measure') {
      if (!p) return
      if (!this.measureFirst) {
        this.measureFirst = p
        this.drawMeasure(p)
        state.status = '已确定测量起点,请点击终点'
      } else {
        const a = this.measureFirst
        this.measureFirst = null
        const dist = Math.hypot(p.x - a.x, p.y - a.y)
        const dh = p.z - a.z
        state.measureResult = { dist, dh, slope: Math.hypot(dist, dh) }
        this.drawMeasure(a, p)
        state.mode = 'view'
        state.status = '测量完成'
      }
      return
    }
    // 视图模式:靠近剖切线时拖动剖切面
    if (state.sectionEnabled && state.section && p) {
      if (this.sectionPerpDist(p) < this.diag * 0.02) {
        this.draggingSection = true
        this.controls.enabled = false
        this.setSectionTFromPoint(p)
      }
    }
  }

  private onPointerMove = (ev: PointerEvent): void => {
    if (!this.draggingSection) return
    const p = this.pickTerrain(ev)
    if (p) this.setSectionTFromPoint(p)
  }

  private onPointerUp = (): void => {
    if (this.draggingSection) {
      this.draggingSection = false
      this.controls.enabled = true
    }
  }

  // ---------- 视图 ----------

  frameScene(): void {
    const g = this.grid
    if (!g) return
    const cx = g.originX + (g.nx * g.res) / 2
    const cy = g.originY + (g.ny * g.res) / 2
    const cz = (g.minH + g.maxH) / 2
    this.diag = Math.max(
      1,
      Math.hypot(g.nx * g.res, g.ny * g.res, g.maxH - g.minH),
    )
    this.camera.near = this.diag / 1000
    this.camera.far = this.diag * 30
    this.camera.updateProjectionMatrix()
    this.camera.position.set(cx + this.diag * 0.55, cy - this.diag * 0.65, cz + this.diag * 0.55)
    this.controls.target.set(cx, cy, cz)
    this.controls.update()
  }

  private onResize(): void {
    const w = this.container.clientWidth
    const h = Math.max(1, this.container.clientHeight)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  private animate = (): void => {
    this.raf = requestAnimationFrame(this.animate)
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  dispose(): void {
    cancelAnimationFrame(this.raf)
    this.resizeObs.disconnect()
    window.removeEventListener('pointerup', this.onPointerUp)
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
