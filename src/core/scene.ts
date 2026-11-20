/**
 * Babylon 场景管理:地形、建筑、起降场、进近视锥、热力网格、穿透高亮、相机切换。
 * 优先使用 WebGPU 引擎,不可用时回退 WebGL。
 */
import {
  ArcRotateCamera,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PointerEventTypes,
  Scene,
  StandardMaterial,
  UniversalCamera,
  Vector3,
  VertexData
} from '@babylonjs/core'
import { WebGPUEngine } from '@babylonjs/core/Engines/webgpuEngine'
import { state } from '../state'
import type { Approach, AssessmentResult, HeatmapStats, ObstacleResult } from '../types'
import { HEAT_LEVELS, heatLevel } from '../types'
import type { Building, HeatCell } from './geometry'
import {
  azimuthDir,
  buildingPenetration,
  computeHeatmap,
  coneSectionAt
} from './geometry'

const DEG = Math.PI / 180

/** 世界尺寸(米) */
export const WORLD_SIZE = 1600
const HEAT_CELL = 20
const HEAT_CELLS = WORLD_SIZE / HEAT_CELL // 80

/** 确定性地形高度函数 */
export function groundHeight(x: number, z: number): number {
  return (
    3.5 * Math.sin(x * 0.008) * Math.cos(z * 0.006) +
    2.0 * Math.sin(x * 0.02 + 1.3) * Math.sin(z * 0.017 + 0.5) +
    1.2 * Math.cos(x * 0.035) * Math.sin(z * 0.028)
  )
}

/** 确定性伪随机(可复现场景) */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hexToColor3(hex: string): Color3 {
  return Color3.FromHexString(hex)
}

export class SceneManager {
  engine!: Engine | WebGPUEngine
  scene!: Scene
  private canvas: HTMLCanvasElement
  private orbitCam!: ArcRotateCamera
  private approachCam!: UniversalCamera
  private buildings: Building[] = []
  private buildingMeshes = new Map<number, Mesh>()
  private buildingBaseMat!: StandardMaterial
  private buildingHotMat!: StandardMaterial
  private padMesh: Mesh | null = null
  private headingMesh: Mesh | null = null
  private coneMeshes: (Mesh | null)[] = [null, null, null]
  private glideLines: (Mesh | null)[] = [null, null, null]
  private heatMesh: Mesh | null = null
  private heatCells: HeatCell[] = []
  private recomputeQueued = false

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  async init(): Promise<void> {
    let engine: Engine | WebGPUEngine
    if ('gpu' in navigator) {
      try {
        const gpu = new WebGPUEngine(this.canvas, { antialias: true, adaptToDeviceRatio: true })
        await gpu.initAsync()
        engine = gpu
        state.engineKind = 'WebGPU'
      } catch {
        engine = new Engine(this.canvas, true, { adaptToDeviceRatio: true })
        state.engineKind = 'WebGL'
      }
    } else {
      engine = new Engine(this.canvas, true, { adaptToDeviceRatio: true })
      state.engineKind = 'WebGL'
    }
    this.engine = engine
    const scene = new Scene(engine)
    this.scene = scene
    scene.clearColor = new Color4(0.06, 0.08, 0.12, 1)

    // 灯光
    const hemi = new HemisphericLight('hemi', new Vector3(0.2, 1, 0.1), scene)
    hemi.intensity = 0.85
    hemi.groundColor = new Color3(0.25, 0.28, 0.32)
    const dir = new DirectionalLight('dir', new Vector3(-0.4, -1, 0.35), scene)
    dir.intensity = 0.7

    // 相机:轨道(俯视) + 进近
    this.orbitCam = new ArcRotateCamera('orbit', -Math.PI / 2, 0.35, 1400, Vector3.Zero(), scene)
    this.orbitCam.lowerRadiusLimit = 100
    this.orbitCam.upperRadiusLimit = 3000
    this.orbitCam.wheelPrecision = 3
    this.orbitCam.attachControl(this.canvas, true)
    this.approachCam = new UniversalCamera('approach', new Vector3(0, 100, 0), scene)
    this.approachCam.minZ = 0.5
    scene.activeCamera = this.orbitCam

    this.buildTerrain()
    this.buildBuildings()
    this.buildVertiport()
    this.buildHeatmapShell()
    this.bindPointer()
    this.recompute()

    engine.runRenderLoop(() => scene.render())
    window.addEventListener('resize', () => engine.resize())
    state.ready = true
  }

  // ---------- 地形 ----------
  private buildTerrain() {
    const ground = MeshBuilder.CreateGround('terrain', {
      width: WORLD_SIZE,
      height: WORLD_SIZE,
      subdivisions: 120,
      updatable: true
    }, this.scene)
    const positions = ground.getVerticesData('position')!
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] = groundHeight(positions[i], positions[i + 2])
    }
    ground.updateVerticesData('position', positions)
    const normals: number[] = []
    VertexData.ComputeNormals(positions, ground.getIndices(), normals)
    ground.updateVerticesData('normal', normals)
    const mat = new StandardMaterial('terrainMat', this.scene)
    mat.diffuseColor = new Color3(0.24, 0.32, 0.22)
    mat.specularColor = Color3.Black()
    ground.material = mat
  }

  // ---------- 建筑 ----------
  private buildBuildings() {
    const rng = mulberry32(20261121)
    this.buildingBaseMat = new StandardMaterial('bMat', this.scene)
    this.buildingBaseMat.diffuseColor = new Color3(0.62, 0.64, 0.68)
    this.buildingBaseMat.specularColor = new Color3(0.05, 0.05, 0.05)
    this.buildingHotMat = new StandardMaterial('bHot', this.scene)
    this.buildingHotMat.diffuseColor = new Color3(0.9, 0.12, 0.1)
    this.buildingHotMat.emissiveColor = new Color3(0.55, 0.05, 0.05)

    let id = 0
    for (let gx = -700; gx <= 700; gx += 80) {
      for (let gz = -700; gz <= 700; gz += 80) {
        if (rng() < 0.35) continue
        const cx = gx + (rng() - 0.5) * 36
        const cz = gz + (rng() - 0.5) * 36
        if (Math.abs(cx) < 130 && Math.abs(cz) < 130) continue // 中心留给起降场
        // 模拟一片高层核心区
        const downtown = Math.exp(-((cx - 320) ** 2 + (cz + 240) ** 2) / (2 * 220 ** 2))
        const h = 10 + rng() * 55 + downtown * (60 + rng() * 80)
        const hx = 12 + rng() * 10
        const hz = 12 + rng() * 10
        const base = groundHeight(cx, cz) - 0.5
        const b: Building = { id: id++, cx, cz, hx, hz, base, top: base + h }
        this.buildings.push(b)
        const box = MeshBuilder.CreateBox(`b${b.id}`, { width: hx * 2, depth: hz * 2, height: h }, this.scene)
        box.position.set(cx, base + h / 2, cz)
        box.material = this.buildingBaseMat
        this.buildingMeshes.set(b.id, box)
      }
    }
  }

  // ---------- 起降场 ----------
  private buildVertiport() {
    const pad = MeshBuilder.CreateCylinder('pad', { diameter: 44, height: 1.6, tessellation: 48 }, this.scene)
    const padMat = new StandardMaterial('padMat', this.scene)
    padMat.diffuseColor = new Color3(0.15, 0.16, 0.18)
    padMat.emissiveColor = new Color3(0.02, 0.05, 0.08)
    pad.material = padMat
    const ring = MeshBuilder.CreateTorus('padRing', { diameter: 34, thickness: 1.2, tessellation: 48 }, this.scene)
    const ringMat = new StandardMaterial('ringMat', this.scene)
    ringMat.emissiveColor = new Color3(1, 1, 1)
    ringMat.disableLighting = true
    ring.material = ringMat
    ring.parent = pad
    ring.position.y = 0.9
    // 航向指示箭头
    const arrow = MeshBuilder.CreateBox('padArrow', { width: 3, depth: 20, height: 0.6 }, this.scene)
    const arrowMat = new StandardMaterial('arrowMat', this.scene)
    arrowMat.emissiveColor = new Color3(1, 0.85, 0.1)
    arrowMat.disableLighting = true
    arrow.material = arrowMat
    arrow.parent = pad
    arrow.position.y = 0.9
    this.padMesh = pad
    this.headingMesh = arrow
    this.syncPad()
  }

  private syncPad() {
    const vp = state.vertiport
    vp.elevation = groundHeight(vp.x, vp.z)
    if (this.padMesh) {
      this.padMesh.position.set(vp.x, vp.elevation + 0.8, vp.z)
      this.padMesh.rotation.y = vp.rotation * DEG
    }
  }

  // ---------- 进近视锥 ----------
  private buildConeMesh(ap: Approach): Mesh {
    const vp = state.vertiport
    const p = state.coneParams
    const dir = azimuthDir(ap.azimuth)
    const d0 = 22 // 从场坪边缘起算
    const sections = [d0, p.length]
    const positions: number[] = []
    for (const d of sections) {
      const { surfaceH, halfWidth, halfHeight } = coneSectionAt(p, d)
      const cx = vp.x + dir.x * d
      const cz = vp.z + dir.z * d
      const y = vp.elevation + surfaceH
      // 底左、底右、顶右、顶左
      positions.push(
        cx - dir.z * halfWidth, y, cz + dir.x * halfWidth,
        cx + dir.z * halfWidth, y, cz - dir.x * halfWidth,
        cx + dir.z * halfWidth, y + halfHeight * 2, cz - dir.x * halfWidth,
        cx - dir.z * halfWidth, y + halfHeight * 2, cz + dir.x * halfWidth
      )
    }
    const indices = [
      0, 1, 2, 0, 2, 3, // 近端
      4, 6, 5, 4, 7, 6, // 远端
      0, 4, 5, 0, 5, 1, // 底面(净空面)
      3, 2, 6, 3, 6, 7, // 顶面
      1, 5, 6, 1, 6, 2, // 右侧
      0, 3, 7, 0, 7, 4  // 左侧
    ]
    const mesh = new Mesh(`cone${ap.id}`, this.scene)
    const vd = new VertexData()
    const normals: number[] = []
    VertexData.ComputeNormals(positions, indices, normals)
    vd.positions = positions
    vd.indices = indices
    vd.normals = normals
    vd.applyToMesh(mesh)
    const mat = new StandardMaterial(`coneMat${ap.id}`, this.scene)
    const c = hexToColor3(ap.color)
    mat.emissiveColor = c
    mat.diffuseColor = c
    mat.alpha = 0.22
    mat.disableLighting = true
    mat.backFaceCulling = false
    mesh.material = mat
    mesh.isPickable = false
    return mesh
  }

  private buildGlideLine(ap: Approach): Mesh {
    const vp = state.vertiport
    const p = state.coneParams
    const dir = azimuthDir(ap.azimuth)
    const pts: Vector3[] = []
    for (let d = 22; d <= p.length; d += 40) {
      pts.push(new Vector3(
        vp.x + dir.x * d,
        vp.elevation + coneSectionAt(p, d).surfaceH + 0.5,
        vp.z + dir.z * d
      ))
    }
    const line = MeshBuilder.CreateDashedLines(`glide${ap.id}`, {
      points: pts, dashSize: 6, gapSize: 4
    }, this.scene)
    line.color = hexToColor3(ap.color)
    line.isPickable = false
    return line
  }

  // ---------- 热力网格 ----------
  private buildHeatmapShell() {
    // 每个网格一个独立四边形(顶点不共享),保证分档颜色边界清晰
    const n = HEAT_CELLS
    const positions = new Float32Array(n * n * 4 * 3)
    const colors = new Float32Array(n * n * 4 * 4)
    const indices: number[] = []
    for (let c = 0; c < n * n; c++) {
      const v = c * 4
      indices.push(v, v + 1, v + 2, v, v + 2, v + 3)
    }
    const mesh = new Mesh('heatmap', this.scene)
    const vd = new VertexData()
    vd.positions = positions
    vd.colors = colors
    vd.indices = indices
    vd.applyToMesh(mesh, true)
    const mat = new StandardMaterial('heatMat', this.scene)
    mat.disableLighting = true
    mat.specularColor = Color3.Black()
    mesh.material = mat
    mesh.useVertexColors = true
    mesh.hasVertexAlpha = true
    this.heatMesh = mesh
  }

  private updateHeatmap() {
    const half = WORLD_SIZE / 2
    this.heatCells = computeHeatmap(
      -half, -half, HEAT_CELLS, HEAT_CELLS, HEAT_CELL,
      state.vertiport, state.approaches, state.coneParams, groundHeight
    )
    const mesh = this.heatMesh!
    const positions = mesh.getVerticesData('position')! as number[]
    const colors = mesh.getVerticesData('color')! as number[]
    let covered = 0
    let minH = Infinity
    const levelCounts = [0, 0, 0, 0, 0]
    for (const cell of this.heatCells) {
      const ci = (cell.gz * HEAT_CELLS + cell.gx) * 4
      const x0 = -half + cell.gx * HEAT_CELL
      const x1 = x0 + HEAT_CELL
      const z0 = -half + cell.gz * HEAT_CELL
      const z1 = z0 + HEAT_CELL
      const corners: [number, number][] = [[x0, z0], [x1, z0], [x1, z1], [x0, z1]]
      let rgba: [number, number, number, number] = [0, 0, 0, 0]
      if (cell.height !== null) {
        const lv = heatLevel(cell.height)
        const [r, g, b] = HEAT_LEVELS[lv].color
        rgba = [r, g, b, 0.55]
        covered++
        levelCounts[lv]++
        if (cell.height < minH) minH = cell.height
      }
      corners.forEach(([cx, cz], k) => {
        const vi = (ci + k) * 3
        positions[vi] = cx
        positions[vi + 1] = groundHeight(cx, cz) + 0.5
        positions[vi + 2] = cz
        const ki = (ci + k) * 4
        colors[ki] = rgba[0]; colors[ki + 1] = rgba[1]
        colors[ki + 2] = rgba[2]; colors[ki + 3] = rgba[3]
      })
    }
    mesh.updateVerticesData('position', positions)
    mesh.updateVerticesData('color', colors)
    const stats: HeatmapStats = {
      coveredCells: covered,
      totalCells: HEAT_CELLS * HEAT_CELLS,
      minHeight: covered ? Math.round(minH * 10) / 10 : 0,
      levelCounts
    }
    return stats
  }

  // ---------- 穿透检测 ----------
  private detectPenetrations(): ObstacleResult[] {
    const results: ObstacleResult[] = []
    const hot = new Set<number>()
    for (const ap of state.approaches) {
      for (const b of this.buildings) {
        const hit = buildingPenetration(b, state.vertiport, ap, state.coneParams)
        if (hit) {
          results.push(hit)
          hot.add(b.id)
        }
      }
    }
    for (const b of this.buildings) {
      const mesh = this.buildingMeshes.get(b.id)!
      mesh.material = hot.has(b.id) ? this.buildingHotMat : this.buildingBaseMat
    }
    results.sort((a, b) => b.depth - a.depth)
    return results
  }

  // ---------- 主重算入口 ----------
  requestRecompute() {
    if (this.recomputeQueued) return
    this.recomputeQueued = true
    requestAnimationFrame(() => {
      this.recomputeQueued = false
      this.recompute()
    })
  }

  recompute() {
    if (!this.scene) return
    this.syncPad()
    // 重建视锥与下滑道线
    for (const ap of state.approaches) {
      this.coneMeshes[ap.id]?.dispose()
      this.coneMeshes[ap.id] = this.buildConeMesh(ap)
      this.glideLines[ap.id]?.dispose()
      this.glideLines[ap.id] = this.buildGlideLine(ap)
    }
    const heatStats = this.updateHeatmap()
    const obstacles = this.detectPenetrations()
    state.results = {
      obstacles,
      heatmap: heatStats,
      computedAt: new Date().toISOString()
    }
    if (state.viewMode === 'approach') this.updateApproachCamera()
  }

  // ---------- 视角 ----------
  setTopView() {
    state.viewMode = 'orbit'
    this.scene.activeCamera = this.orbitCam
    this.orbitCam.attachControl(this.canvas, true)
    // 一键回到正俯视
    this.orbitCam.setTarget(new Vector3(state.vertiport.x, 0, state.vertiport.z))
    this.orbitCam.alpha = -Math.PI / 2
    this.orbitCam.beta = 0.02
    this.orbitCam.radius = 1500
  }

  setApproachView(approachId: number) {
    state.viewMode = 'approach'
    state.activeApproach = approachId
    this.orbitCam.detachControl()
    this.updateApproachCamera()
    this.scene.activeCamera = this.approachCam
    this.approachCam.attachControl(this.canvas, true)
  }

  private updateApproachCamera() {
    const ap = state.approaches[state.activeApproach]
    if (!ap) return
    const vp = state.vertiport
    const p = state.coneParams
    const dir = azimuthDir(ap.azimuth)
    // 相机位于视锥远端、净空面上方,沿下滑道看向起降场
    const d = p.length * 0.85
    const camY = vp.elevation + coneSectionAt(p, d).surfaceH + 6
    this.approachCam.position.set(vp.x + dir.x * d, camY, vp.z + dir.z * d)
    this.approachCam.setTarget(new Vector3(vp.x, vp.elevation + 2, vp.z))
  }

  // ---------- 交互 ----------
  private bindPointer() {
    this.scene.onPointerObservable.add(pi => {
      if (pi.type === PointerEventTypes.POINTERMOVE) {
        this.handleHover()
      } else if (pi.type === PointerEventTypes.POINTERDOWN) {
        if (state.placing && pi.event.button === 0) {
          const pick = this.scene.pick(
            this.scene.pointerX, this.scene.pointerY,
            m => m.name === 'terrain' || m.name === 'heatmap'
          )
          if (pick?.hit && pick.pickedPoint) {
            state.vertiport.x = Math.round(pick.pickedPoint.x)
            state.vertiport.z = Math.round(pick.pickedPoint.z)
            state.placing = false
          }
        }
      }
    })
  }

  private handleHover() {
    const pick = this.scene.pick(
      this.scene.pointerX, this.scene.pointerY,
      m => m === this.heatMesh
    )
    if (!pick?.hit || !pick.pickedPoint) {
      state.hoverCell = null
      return
    }
    const half = WORLD_SIZE / 2
    const gx = Math.floor((pick.pickedPoint.x + half) / HEAT_CELL)
    const gz = Math.floor((pick.pickedPoint.z + half) / HEAT_CELL)
    if (gx < 0 || gx >= HEAT_CELLS || gz < 0 || gz >= HEAT_CELLS) {
      state.hoverCell = null
      return
    }
    const cell = this.heatCells[gz * HEAT_CELLS + gx]
    if (!cell || cell.height === null) {
      state.hoverCell = null
      return
    }
    state.hoverCell = {
      wx: cell.wx, wz: cell.wz,
      height: Math.round(cell.height * 10) / 10,
      level: heatLevel(cell.height),
      coneCount: cell.coneCount,
      screenX: (this.scene.getEngine().getInputElement()?.clientLeft ?? 0) + (this.scene.pointerX),
      screenY: this.scene.pointerY
    }
  }

  dispose() {
    this.engine.dispose()
  }
}
