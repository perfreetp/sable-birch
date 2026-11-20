import {
  ArcRotateCamera,
  Color3,
  Color4,
  DynamicTexture,
  Engine,
  HemisphericLight,
  Matrix,
  Mesh,
  MeshBuilder,
  PointerEventTypes,
  Quaternion,
  Scene,
  StandardMaterial,
  Vector3
} from '@babylonjs/core'
import type { Container, PlannedMove, ViewMode, YardConfig } from '@/types'
import {
  COLORS,
  DIM,
  TRANSPARENT_TIER,
  containerCenter,
  liftHeight,
  rowOriginZ,
  slotPosition,
  tierOriginY,
  yardLength,
  yardWidth,
  bayOriginX
} from './layout'
import type { Yard } from './yard'

interface InstRef {
  mesh: Mesh
  index: number
}

const IDENTITY_Q = Quaternion.Identity()
const UNIT = new Vector3(1, 1, 1)

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}
function easeIn(t: number): number {
  return t * t * t
}

/** Babylon 场景引擎：实例化箱体渲染 + 拾取 + 翻箱动画 */
export class SceneEngine {
  readonly engine: Engine
  readonly scene: Scene
  private camera: ArcRotateCamera
  private yard: Yard
  private canvas: HTMLCanvasElement

  private box20!: Mesh
  private box40!: Mesh
  private idToInst = new Map<string, InstRef>()
  private idToMatrix = new Map<string, Matrix>()
  private indexToId20: string[] = []
  private indexToId40: string[] = []

  private outline!: Mesh
  private labels: Mesh[] = []

  selectedId: string | null = null
  targetId: string | null = null
  blockerIds = new Set<string>()
  movingId: string | null = null

  /** 点击箱位回调 */
  onPick: ((container: Container | null) => void) | null = null

  constructor(canvas: HTMLCanvasElement, yard: Yard) {
    this.canvas = canvas
    this.yard = yard
    this.engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    })
    this.scene = new Scene(this.engine)
    this.scene.clearColor = new Color4(0.07, 0.08, 0.11, 1)

    this.camera = new ArcRotateCamera(
      'cam',
      -Math.PI / 2,
      1.05,
      45,
      new Vector3(0, 2, 0),
      this.scene
    )
    this.camera.attachControl(canvas, true)
    this.camera.wheelPrecision = 8
    this.camera.lowerRadiusLimit = 8
    this.camera.upperRadiusLimit = 160
    this.camera.upperBetaLimit = Math.PI / 2 - 0.02
    this.camera.minZ = 0.1
    this.camera.fov = 0.9

    new HemisphericLight('hemi', new Vector3(0.3, 1, 0.2), this.scene)
    const dir = new HemisphericLight('hemi2', new Vector3(-0.6, 0.4, -0.5), this.scene)
    dir.intensity = 0.45

    this.buildGround()
    this.buildBoxMeshes()
    this.buildOutline()
    this.renderInstances()
    this.fitCamera('perspective', true)
    this.bindPicking()

    this.engine.runRenderLoop(() => this.scene.render())
    const onResize = () => this.engine.resize()
    window.addEventListener('resize', onResize)
    this.scene.onDisposeObservable.add(() =>
      window.removeEventListener('resize', onResize)
    )
  }

  private get cfg(): YardConfig {
    return this.yard.config
  }

  /** 地面 + 贝位/排网格线 + 坐标标签 */
  private buildGround(): void {
    const len = yardLength(this.cfg)
    const wid = yardWidth(this.cfg)

    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: len + 6, height: wid + 6, subdivisions: 1 },
      this.scene
    )
    const gMat = new StandardMaterial('gmat', this.scene)
    gMat.diffuseColor = new Color3(COLORS.ground.r, COLORS.ground.g, COLORS.ground.b)
    gMat.specularColor = new Color3(0.05, 0.05, 0.05)
    ground.material = gMat
    ground.position.set(len / 2, -0.02, wid / 2)

    // 网格线：每个贝位边界与排边界
    const lines: Vector3[][] = []
    for (let b = 0; b <= this.cfg.bays; b++) {
      const x = b === 0 ? 0 : bayOriginX(b) - DIM.bayGap / 2
      lines.push([
        new Vector3(x, 0.01, 0),
        new Vector3(x, 0.01, wid)
      ])
    }
    for (let r = 0; r <= this.cfg.rows; r++) {
      const z = r === 0 ? 0 : rowOriginZ(r) - DIM.rowGap / 2
      lines.push([
        new Vector3(0, 0.01, z),
        new Vector3(len, 0.01, z)
      ])
    }
    const lineSystem = MeshBuilder.CreateLineSystem(
      'grid',
      { lines, updatable: false },
      this.scene
    )
    lineSystem.color = new Color3(0.45, 0.5, 0.58)

    // 贝位标签（沿 X 边缘）与排标签（沿 Z 边缘）
    for (let b = 0; b < this.cfg.bays; b++) {
      const label = this.makeLabel(`B${b}`, 2.4, 0.9)
      label.position.set(bayOriginX(b) + DIM.bayLen / 2, 0.03, -1.1)
      this.labels.push(label)
    }
    for (let r = 0; r < this.cfg.rows; r++) {
      const label = this.makeLabel(`R${r}`, 1.6, 0.9)
      label.position.set(-1.6, 0.03, rowOriginZ(r) + DIM.rowWidth / 2)
      this.labels.push(label)
    }
  }

  private makeLabel(text: string, w: number, h: number): Mesh {
    const dt = new DynamicTexture(
      `label-${text}-${this.labels.length}`,
      { width: 256, height: 128 },
      this.scene,
      true
    )
    dt.hasAlpha = true
    dt.drawText(text, null, 86, 'bold 64px sans-serif', '#c9d4e3', 'transparent', true)
    const plane = MeshBuilder.CreatePlane(
      `lbl-${text}`,
      { width: w, height: h },
      this.scene
    )
    const mat = new StandardMaterial(`lblm-${text}`, this.scene)
    mat.emissiveTexture = dt
    mat.diffuseColor = new Color3(0, 0, 0)
    mat.specularColor = new Color3(0, 0, 0)
    mat.backFaceCulling = false
    plane.material = mat
    plane.rotation.x = Math.PI / 2
    return plane
  }

  /** 两个尺寸各一个箱体 Mesh，全部箱以 ThinInstance 渲染 */
  private buildBoxMeshes(): void {
    const mk = (name: string, len: number, color: Color3): Mesh => {
      const mesh = MeshBuilder.CreateBox(
        name,
        { width: len, height: DIM.tierHeight, depth: DIM.rowWidth },
        this.scene
      )
      const mat = new StandardMaterial(`${name}-mat`, this.scene)
      mat.diffuseColor = color
      mat.specularColor = new Color3(0.12, 0.12, 0.12)
      // 高箱层（>=5）实例颜色带 0.45 alpha，需要开启透明混合
      mat.needAlphaBlending()
      mat.alpha = 1
      mesh.material = mat
      mesh.enableEdgesRendering()
      mesh.edgesWidth = 1.2
      mesh.edgesColor = new Color4(0.08, 0.09, 0.12, 1)
      mesh.thinInstanceRegisterAttribute('color', 4)
      return mesh
    }
    this.box20 = mk('box20', DIM.bayLen, new Color3(COLORS.c20.r, COLORS.c20.g, COLORS.c20.b))
    this.box40 = mk('box40', DIM.bayLen40, new Color3(COLORS.c40.r, COLORS.c40.g, COLORS.c40.b))
  }

  /** 选中/目标高亮外框 */
  private buildOutline(): void {
    this.outline = MeshBuilder.CreateBox('outline', { size: 1 }, this.scene)
    const mat = new StandardMaterial('outline-mat', this.scene)
    mat.emissiveColor = new Color3(1, 0.85, 0.25)
    mat.wireframe = true
    mat.disableLighting = true
    this.outline.material = mat
    this.outline.isPickable = false
    this.outline.setEnabled(false)
  }

  /** 全量重建实例（初始化 / 箱区重建时） */
  renderInstances(): void {
    const mats20: number[] = []
    const cols20: number[] = []
    const mats40: number[] = []
    const cols40: number[] = []

    this.idToInst.clear()
    this.idToMatrix.clear()
    this.indexToId20 = []
    this.indexToId40 = []

    for (const c of this.yard.containers) {
      const center = containerCenter(c)
      const matrix = Matrix.Compose(UNIT, IDENTITY_Q, new Vector3(center.x, center.y, center.z))
      const col = this.colorFor(c)
      const is40 = c.size === 40
      const mats = is40 ? mats40 : mats20
      const cols = is40 ? cols40 : cols20
      const index = mats.length / 16

      mats.push(...matrix.m)
      cols.push(col.r, col.g, col.b, col.a)
      this.idToInst.set(c.id, { mesh: is40 ? this.box40 : this.box20, index })
      this.idToMatrix.set(c.id, matrix)
      ;(is40 ? this.indexToId40 : this.indexToId20)[index] = c.id
    }

    this.box20.thinInstanceSetBuffer('matrix', mats20.length ? new Float32Array(mats20) : null, 16)
    this.box40.thinInstanceSetBuffer('matrix', mats40.length ? new Float32Array(mats40) : null, 16)
    this.box20.thinInstanceSetBuffer('color', cols20.length ? new Float32Array(cols20) : null, 4)
    this.box40.thinInstanceSetBuffer('color', cols40.length ? new Float32Array(cols40) : null, 4)
    // 手动 setBuffer 不会自动启用 thin instance 标志，必须显式注册属性并开启拾取
    this.box20.thinInstanceRegisterAttribute('color', 4)
    this.box40.thinInstanceRegisterAttribute('color', 4)
    this.box20.thinInstanceEnablePicking = true
    this.box40.thinInstanceEnablePicking = true
    // 手动 setBuffer 不会自动扩展包围盒，必须显式刷新，否则射线拾取在粗裁阶段被剔除
    this.box20.thinInstanceRefreshBoundingInfo(true)
    this.box40.thinInstanceRefreshBoundingInfo(true)
    this.updateOutline()
  }

  /** 计算某箱当前应显示的颜色（含尺寸/层高透明/状态覆盖） */
  private colorFor(c: Container): Color4 {
    let rgb: { r: number; g: number; b: number } =
      c.size === 40 ? COLORS.c40 : COLORS.c20
    if (this.blockerIds.has(c.id)) rgb = COLORS.blocker
    if (this.idEquals(c.id, this.targetId)) rgb = COLORS.target
    if (this.idEquals(c.id, this.selectedId)) rgb = COLORS.selected
    if (this.idEquals(c.id, this.movingId)) rgb = COLORS.moving
    const alpha = c.tier >= TRANSPARENT_TIER ? 0.45 : 1
    return new Color4(rgb.r, rgb.g, rgb.b, alpha)
  }

  private idEquals(a: string, b: string | null): boolean {
    return b !== null && a === b
  }

  /** 刷新全部实例颜色 */
  updateAllColors(): void {
    for (const c of this.yard.containers) {
      const ref = this.idToInst.get(c.id)
      if (!ref) continue
      const col = this.colorFor(c)
      ref.mesh.thinInstanceSetAttributeAt('color', ref.index, [
        col.r,
        col.g,
        col.b,
        col.a
      ])
    }
    this.box20.thinInstanceBufferUpdated('color')
    this.box40.thinInstanceBufferUpdated('color')
  }

  /** 单箱矩阵更新（动画用） */
  private setInstanceMatrix(id: string, matrix: Matrix): void {
    const ref = this.idToInst.get(id)
    if (!ref) return
    ref.mesh.thinInstanceSetMatrixAt(ref.index, matrix, true)
    this.idToMatrix.set(id, matrix)
  }

  private downX = 0
  private downY = 0
  private movedAfterDown = false

  private pickAtPointer(): void {
    const pick = this.scene.pick(
      this.scene.pointerX,
      this.scene.pointerY,
      (m) => m === this.box20 || m === this.box40
    )
    if (pick?.hit && pick.thinInstanceIndex !== undefined && pick.pickedMesh) {
      const map = pick.pickedMesh === this.box40 ? this.indexToId40 : this.indexToId20
      const id = map[pick.thinInstanceIndex]
      const c = id ? this.yard.find(id) : undefined
      this.onPick?.(c ?? null)
    } else {
      this.onPick?.(null)
    }
  }

  private bindPicking(): void {
    // POINTERDOWN/UP 组合：按下记录位置，松开时若未发生拖动则视为点击（避免与相机旋转冲突）
    this.scene.onPointerObservable.add((info) => {
      if (info.type === PointerEventTypes.POINTERDOWN) {
        this.downX = this.scene.pointerX
        this.downY = this.scene.pointerY
        this.movedAfterDown = false
      } else if (info.type === PointerEventTypes.POINTERMOVE) {
        if (Math.abs(this.scene.pointerX - this.downX) > 5 ||
            Math.abs(this.scene.pointerY - this.downY) > 5) {
          this.movedAfterDown = true
        }
        const pick = this.scene.pick(
          this.scene.pointerX,
          this.scene.pointerY,
          (m) => m === this.box20 || m === this.box40
        )
        this.canvas.style.cursor = pick?.hit ? 'pointer' : 'default'
      } else if (info.type === PointerEventTypes.POINTERUP) {
        if (!this.movedAfterDown) this.pickAtPointer()
      }
    })
  }

  setSelected(id: string | null): void {
    this.selectedId = id
    this.updateAllColors()
    this.updateOutline()
  }

  setTarget(id: string | null): void {
    this.targetId = id
    this.updateAllColors()
  }

  setBlockers(ids: string[]): void {
    this.blockerIds = new Set(ids)
    this.updateAllColors()
  }

  private updateOutline(): void {
    if (!this.selectedId) {
      this.outline.setEnabled(false)
      return
    }
    const c = this.yard.find(this.selectedId)
    if (!c) {
      this.outline.setEnabled(false)
      return
    }
    const center = containerCenter(c)
    const len = c.size === 40 ? DIM.bayLen40 : DIM.bayLen
    this.outline.scaling.set(
      len + 0.18,
      DIM.tierHeight + 0.18,
      DIM.rowWidth + 0.18
    )
    this.outline.position.set(center.x, center.y, center.z)
    this.outline.setEnabled(true)
  }

  /** 视图切换（带相机过渡动画） */
  fitCamera(mode: ViewMode, instant = false): Promise<void> {
    const len = yardLength(this.cfg)
    const wid = yardWidth(this.cfg)
    const target = new Vector3(len / 2, tierOriginY(Math.min(2, this.cfg.tiers - 1)), wid / 2)
    const diag = Math.sqrt(len * len + wid * wid)

    let alpha = -Math.PI / 2
    let beta = 1.05
    let radius = diag * 0.95
    if (mode === 'top') {
      beta = 0.04
      radius = diag * 0.75
    } else if (mode === 'side') {
      beta = Math.PI / 2 - 0.04
      alpha = -Math.PI / 2
      radius = Math.max(len, wid) * 1.15
    }
    return this.tweenCamera(alpha, beta, radius, target, instant ? 0 : 550)
  }

  private tweenCamera(
    alpha: number,
    beta: number,
    radius: number,
    target: Vector3,
    durationMs: number
  ): Promise<void> {
    if (durationMs === 0) {
      this.camera.alpha = alpha
      this.camera.beta = beta
      this.camera.radius = radius
      this.camera.setTarget(target)
      return Promise.resolve()
    }
    const a0 = this.camera.alpha
    const b0 = this.camera.beta
    const r0 = this.camera.radius
    const t0 = this.camera.target.clone()
    return this.runTimeline(durationMs, (t) => {
      const e = easeInOut(t)
      this.camera.alpha = a0 + (alpha - a0) * e
      this.camera.beta = b0 + (beta - b0) * e
      this.camera.radius = r0 + (radius - r0) * e
      this.camera.setTarget(Vector3.Lerp(t0, target, e))
    })
  }

  /** 等待一帧并返回 delta 秒 */
  private nextFrame(): Promise<number> {
    return new Promise((resolve) => {
      const obs = this.scene.onBeforeRenderObservable.add(() => {
        this.scene.onBeforeRenderObservable.remove(obs)
        resolve(this.engine.getDeltaTime() / 1000)
      })
    })
  }

  private async runTimeline(durationMs: number, fn: (t: number) => void): Promise<void> {
    if (durationMs <= 0) {
      fn(1)
      return
    }
    let elapsed = 0
    fn(0)
    while (elapsed < durationMs) {
      const dt = await this.nextFrame()
      elapsed += dt * 1000
      fn(Math.min(1, elapsed / durationMs))
    }
    fn(1)
  }

  /**
   * 翻箱移动动画：垂直抬升 -> 水平平移到目标上空 -> 垂直落位
   */
  async animateMove(move: PlannedMove): Promise<void> {
    const c = this.yard.find(move.containerId)
    if (!c) return
    this.movingId = c.id
    this.updateAllColors()

    const from = slotPosition(move.from.bay, move.from.row, move.from.tier, c.size)
    const to = slotPosition(move.to.bay, move.to.row, move.to.tier, c.size)
    const liftY = liftHeight(this.cfg)
    const halfH = DIM.tierHeight / 2

    const start = new Vector3(from.x, from.y + halfH, from.z)
    const upPos = new Vector3(from.x, liftY + halfH, from.z)
    const overPos = new Vector3(to.x, liftY + halfH, to.z)
    const endPos = new Vector3(to.x, to.y + halfH, to.z)

    const place = (p: Vector3) =>
      this.setInstanceMatrix(c.id, Matrix.Compose(UNIT, IDENTITY_Q, p.clone()))

    place(start)
    const travel = Vector3.Distance(upPos, overPos)
    const traverseMs = Math.min(1600, Math.max(500, travel * 90))

    await this.runTimeline(480, (t) => place(Vector3.Lerp(start, upPos, easeOut(t))))
    await this.runTimeline(traverseMs, (t) =>
      place(Vector3.Lerp(upPos, overPos, easeInOut(t)))
    )
    await this.runTimeline(480, (t) => place(Vector3.Lerp(overPos, endPos, easeIn(t))))

    this.movingId = null
    this.updateAllColors()
  }

  /** 立即把某箱矩阵同步到数据模型位置（无动画） */
  syncInstance(id: string): void {
    const c = this.yard.find(id)
    if (!c) return
    const center = containerCenter(c)
    this.setInstanceMatrix(
      id,
      Matrix.Compose(UNIT, IDENTITY_Q, new Vector3(center.x, center.y, center.z))
    )
    if (id === this.selectedId) this.updateOutline()
  }

  dispose(): void {
    this.engine.dispose()
  }
}
