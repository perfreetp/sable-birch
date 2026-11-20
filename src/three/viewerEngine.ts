/**
 * ViewerEngine：three.js 场景引擎
 *
 * 职责：
 * - 渲染循环、相机与 OrbitControls
 * - 模型加载（内置演示 / glTF / potree 点云）
 * - 按视距自动切换 1-8 纹理档位，手动档位时锁定
 * - 表面点选 -> 模型局部坐标标注
 * - 框选局部区域放大并重算纹理层级
 * - 书签相机位姿保存/恢复
 * - 材质通道开关与环境光
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { PotreeAdapter } from './potreeAdapter'
import { createDemoArtifact, type DemoArtifact } from './demoArtifact'
import { AnnotationMarker } from './annotationMarker'
import type { AnnotationData, Bookmark, CameraPose, ModelRef, Vec3 } from '@/types'

type LoadedKind = 'demo' | 'gltf' | 'potree'

export interface EngineCallbacks {
  onActiveTierChange: (tier: number) => void
  onLoadingProgress: (progress: number) => void
  onPick: (position: Vec3, normal: Vec3) => void
  onToast: (text: string, kind?: 'info' | 'error') => void
}

export class ViewerEngine {
  private container: HTMLElement
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private ambientLight: THREE.AmbientLight
  private dirLight: THREE.DirectionalLight
  private fillLight: THREE.DirectionalLight
  private raycaster = new THREE.Raycaster()
  private pointer = new THREE.Vector2()
  private resizeObserver: ResizeObserver
  private rafId = 0
  private disposed = false

  // 模型
  private modelRoot = new THREE.Group()
  private kind: LoadedKind | null = null
  private demo: DemoArtifact | null = null
  private potree: PotreeAdapter | null = null
  private modelBox = new THREE.Box3()
  private modelSize = 1
  private baseAnisotropy = 8

  // 标注
  private markers = new Map<string, AnnotationMarker>()
  private labelLayer: HTMLDivElement

  // 状态
  private tier = 4
  private autoTier = true
  private activeTier = 4
  private callbacks: EngineCallbacks
  private lastTierEmit = -1
  private cameraTween: { from: THREE.Vector3; to: THREE.Vector3; targetFrom: THREE.Vector3; targetTo: THREE.Vector3; t: number; dur: number } | null = null

  // 框选
  private rectMode = false
  private rectDiv: HTMLDivElement
  private rectStart: { x: number; y: number } | null = null

  constructor(container: HTMLElement, labelLayer: HTMLDivElement, callbacks: EngineCallbacks) {
    this.container = container
    this.labelLayer = labelLayer
    this.callbacks = callbacks

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 0.92
    container.appendChild(this.renderer.domElement)
    this.renderer.domElement.style.display = 'block'

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x1a1d23)

    this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 500)
    this.camera.position.set(3.2, 2.2, 4.4)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.minDistance = 0.15
    this.controls.maxDistance = 60

    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    this.dirLight = new THREE.DirectionalLight(0xfff2dd, 1.3)
    this.dirLight.position.set(4, 6, 5)
    this.fillLight = new THREE.DirectionalLight(0xbfd4ff, 0.6)
    this.fillLight.position.set(-5, 2, -4)
    this.scene.add(this.ambientLight, this.dirLight, this.fillLight, this.modelRoot)

    // 网格地面
    const grid = new THREE.GridHelper(12, 24, 0x3a4150, 0x2a2f3a)
    grid.position.y = -1.4
    grid.name = 'floor-grid'
    this.scene.add(grid)

    this.rectDiv = document.createElement('div')
    this.rectDiv.className = 'rect-zoom-overlay'
    this.rectDiv.hidden = true
    container.appendChild(this.rectDiv)

    this.resizeObserver = new ResizeObserver(() => this.handleResize())
    this.resizeObserver.observe(container)

    this.bindPointerEvents()
    this.loop()
  }

  // ===================== 模型加载 =====================

  async loadDemo(): Promise<ModelRef> {
    this.clearModel()
    const artifact = createDemoArtifact()
    this.demo = artifact
    this.kind = 'demo'
    this.modelRoot.add(artifact.group)
    this.finalizeLoaded(artifact.box)
    const ref: ModelRef = { kind: 'demo', name: '内置演示 · 馆藏青铜壶', rootName: artifact.group.name }
    return ref
  }

  async loadGlb(file: File): Promise<ModelRef> {
    this.clearModel()
    const url = URL.createObjectURL(file)
    try {
      const loader = new GLTFLoader()
      const gltf = await loader.loadAsync(url, (ev) => {
        if (ev.total) this.callbacks.onLoadingProgress(ev.loaded / ev.total)
      })
      const root = gltf.scene
      root.name = root.name || 'gltf-root'
      this.modelRoot.add(root)
      this.kind = 'gltf'
      this.modelBox.setFromObject(root)
      this.normalizeRoot(root, this.modelBox)
      this.modelBox.setFromObject(root)
      this.finalizeLoaded(this.modelBox)
      // 加载后按当前通道/档位刷新
      this.applyChannelsToGlb()
      this.applyTierToGlb(this.tier)
      return { kind: 'gltf', name: file.name, rootName: root.name }
    } finally {
      URL.revokeObjectURL(url)
    }
  }

  /**
   * 加载 potree 点云。
   * fileMap: 目录内全部文件（相对路径 -> File）；metadataRel: metadata.json 相对路径
   */
  async loadPotreeFiles(fileMap: Map<string, File>, metadataRel: string): Promise<ModelRef> {
    this.clearModel()
    this.potree = new PotreeAdapter(this.renderer)
    const cloud = await this.potree.loadFromFiles(fileMap, metadataRel)
    this.modelRoot.add(cloud)
    this.kind = 'potree'
    this.modelBox.copy(cloud.boundingBox)
    const center = this.modelBox.getCenter(new THREE.Vector3())
    cloud.position.sub(center)
    this.modelBox.setFromObject(cloud)
    this.finalizeLoaded(this.modelBox)
    this.potree.applyTier(this.tier)
    this.potree.applyChannels(true, true)
    this.potree.applyAmbient(1)
    return { kind: 'potree', name: metadataRel.split('/')[0] || 'potree-cloud', rootName: cloud.name || undefined }
  }

  async loadPotreeUrl(metadataUrl: string): Promise<ModelRef> {
    this.clearModel()
    this.potree = new PotreeAdapter(this.renderer)
    const cloud = await this.potree.loadFromUrl(metadataUrl)
    this.modelRoot.add(cloud)
    this.kind = 'potree'
    this.modelBox.copy(cloud.boundingBox)
    const center = this.modelBox.getCenter(new THREE.Vector3())
    cloud.position.sub(center)
    this.modelBox.setFromObject(cloud)
    this.finalizeLoaded(this.modelBox)
    this.potree.applyTier(this.tier)
    return { kind: 'potree', name: metadataUrl, rootName: cloud.name || undefined }
  }

  private normalizeRoot(root: THREE.Object3D, box: THREE.Box3): void {
    const center = box.getCenter(new THREE.Vector3())
    root.position.sub(center)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    if (maxDim > 0) root.scale.setScalar(2.4 / maxDim)
  }

  private finalizeLoaded(box: THREE.Box3): void {
    this.modelBox = box.clone()
    this.modelSize = box.getSize(new THREE.Vector3()).length() || 1
    this.frameCameraToModel()
    this.callbacks.onLoadingProgress(1)
  }

  clearModel(): void {
    for (const marker of this.markers.values()) marker.dispose()
    this.markers.clear()
    this.labelLayer.innerHTML = ''

    if (this.potree) {
      this.scene.remove(...this.potree.pointClouds)
      this.potree.dispose()
      this.potree = null
    }
    if (this.demo) {
      this.demo.textures.forEach((t) => t.dispose())
      this.demo.materials.forEach((m) => m.dispose())
      this.demo = null
    }
    // 清理 gltf / 残留子节点
    while (this.modelRoot.children.length > 0) {
      const child = this.modelRoot.children[0]
      this.modelRoot.remove(child)
      child.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else mat?.dispose()
      })
    }
    this.kind = null
  }

  frameCameraToModel(): void {
    if (this.modelBox.isEmpty()) return
    const center = this.modelBox.getCenter(new THREE.Vector3())
    const size = this.modelBox.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const dist = maxDim * 1.9
    const dir = new THREE.Vector3(0.9, 0.55, 1.1).normalize()
    this.camera.position.copy(center).add(dir.multiplyScalar(dist))
    this.controls.target.copy(center)
    this.controls.minDistance = maxDim * 0.08
    this.controls.maxDistance = maxDim * 12
    this.controls.update()
  }

  // ===================== 纹理档位 =====================

  setTier(tier: number): void {
    this.tier = THREE.MathUtils.clamp(Math.round(tier), 1, 8)
    if (!this.autoTier) this.applyTier(this.tier)
  }

  setAutoTier(auto: boolean): void {
    this.autoTier = auto
    if (!auto) this.applyTier(this.tier)
  }

  private applyTier(t: number): void {
    if (this.kind === 'potree' && this.potree) {
      this.potree.applyTier(t)
    } else if (this.kind === 'gltf' || this.kind === 'demo') {
      this.applyTierToGlb(t)
    }
    this.activeTier = t
  }

  /**
   * glTF/演示模型档位：
   * 通过 mipmap bias 强制采样更粗/更细的纹理层级，并联动各向异性过滤强度，
   * 1 档最模糊（强制高 mip）、8 档最清晰（全分辨率 + 高各向异性）。
   */
  private applyTierToGlb(t: number): void {
    const targets: THREE.MeshStandardMaterial[] = []
    this.modelRoot.traverse((o) => {
      const mesh = o as THREE.Mesh
      const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[] | undefined
      if (!mat) return
      const arr = Array.isArray(mat) ? mat : [mat]
      for (const m of arr) if (m.isMeshStandardMaterial && !targets.includes(m)) targets.push(m)
    })
    // bias: 1 档 -> +3.0 mip（很糊），8 档 -> -0.5（允许锐化采样）
    const bias = 3.4 - (t - 1) * (3.9 / 7)
    const anisotropy = Math.max(1, Math.round(this.baseAnisotropy * ((t - 1) / 7)))
    for (const mat of targets) {
      for (const tex of [mat.map, mat.normalMap, mat.roughnessMap, mat.metalnessMap]) {
        if (!tex) continue
        tex.mipmapsAutoUpdate = t >= 7
        tex.anisotropy = anisotropy
        // three r152+ 用 bias 控制 mip 偏移
        ;(tex as THREE.Texture & { bias: number }).bias = bias
        tex.needsUpdate = true
      }
    }
  }

  /** 视距 -> 推荐档位（1-8）：距离模型越近档位越高 */
  private tierFromDistance(): number {
    if (this.modelBox.isEmpty()) return this.activeTier
    const center = this.modelBox.getCenter(new THREE.Vector3())
    const dist = this.camera.position.distanceTo(center)
    const size = Math.max(this.modelBox.getSize(new THREE.Vector3()).length(), 1e-6)
    const ratio = dist / size // 0.15(很近) ~ 4(很远)
    const t = Math.round(THREE.MathUtils.mapLinear(THREE.MathUtils.clamp(ratio, 0.15, 3.2), 3.2, 0.15, 1, 8))
    return THREE.MathUtils.clamp(t, 1, 8)
  }

  // ===================== 通道与环境光 =====================

  setChannels(diffuseOn: boolean, normalOn: boolean): void {
    if (this.kind === 'potree' && this.potree) {
      this.potree.applyChannels(diffuseOn, normalOn)
    } else {
      this.applyChannelsToGlb(diffuseOn, normalOn)
    }
  }

  private applyChannelsToGlb(diffuseOn?: boolean, normalOn?: boolean): void {
    const d = diffuseOn ?? true
    const n = normalOn ?? true
    this.modelRoot.traverse((o) => {
      const mesh = o as THREE.Mesh
      const mat = mesh.material as THREE.MeshStandardMaterial | undefined
      if (!mat || !mat.isMeshStandardMaterial) return
      // 漫反射通道：关闭后断开颜色贴图并压暗基色；法线通道：关闭 normalMap（缩放归零）
      if (mat.map) {
        if (d) {
          if (mat.map !== mat.userData.__savedMap) mat.userData.__savedMap = mat.map
        }
      }
      mat.map = d ? (mat.userData.__savedMap ?? mat.map) : null
      mat.color.set(d ? 0xffffff : 0x3a3a3a)
      const nScale = n ? 1.1 : 0
      mat.normalScale.set(nScale, nScale)
      mat.needsUpdate = true
    })
  }

  setAmbient(value: number): void {
    const v = THREE.MathUtils.clamp(value, 0, 2)
    this.ambientLight.intensity = v
    if (this.potree) this.potree.applyAmbient(v)
    // 反向补偿直射光，避免高环境光时整体过曝
    this.dirLight.intensity = 1.5 - v * 0.35
    this.fillLight.intensity = 0.35 + v * 0.3
  }

  // ===================== 标注点选 =====================

  setPickingMode(on: boolean): void {
    this.container.classList.toggle('picking-mode', on)
    this.renderer.domElement.style.cursor = on ? 'crosshair' : ''
  }

  /** 屏幕坐标射线拾取，命中后把世界坐标转换为模型局部坐标与局部法线 */
  private pickAt(clientX: number, clientY: number): void {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)

    let point: THREE.Vector3 | null = null
    let normal: THREE.Vector3 | null = null

    if (this.kind === 'potree' && this.potree) {
      const ray = this.raycaster.ray
      const hit = this.potree.pick(this.camera, ray)
      if (hit) {
        point = hit.point
        normal = hit.normal
      }
    } else {
      const hits = this.raycaster.intersectObject(this.modelRoot, true)
      const hit = hits.find((h) => !(h.object as THREE.Sprite).isSprite)
      if (hit) {
        point = hit.point.clone()
        normal = hit.face
          ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
          : point.clone().sub(this.modelRoot.getWorldPosition(new THREE.Vector3())).normalize()
      }
    }

    if (!point || !normal) {
      this.callbacks.onToast('未命中模型表面，请在模型范围内点选', 'error')
      return
    }

    // 世界坐标 -> 模型根局部坐标（标注锚定局部坐标，模型变换不影响贴合）
    const localPoint = this.modelRoot.worldToLocal(point.clone())
    const worldQ = this.modelRoot.getWorldQuaternion(new THREE.Quaternion())
    const localNormal = normal.clone().applyQuaternion(worldQ.invert()).normalize()

    this.callbacks.onPick(
      { x: localPoint.x, y: localPoint.y, z: localPoint.z },
      { x: localNormal.x, y: localNormal.y, z: localNormal.z },
    )
  }

  addMarker(ann: AnnotationData): void {
    const marker = new AnnotationMarker(ann, this.modelRoot)
    this.markers.set(ann.id, marker)
    this.labelLayer.appendChild(marker.labelEl)
    marker.labelEl.addEventListener('click', (e) => {
      e.stopPropagation()
      this.callbacks.onToast(`标注：${ann.title}`)
      window.dispatchEvent(new CustomEvent('annotation-focus', { detail: ann.id }))
    })
  }

  removeMarker(id: string): void {
    const marker = this.markers.get(id)
    if (marker) {
      marker.dispose()
      this.markers.delete(id)
    }
  }

  updateMarker(ann: AnnotationData): void {
    const marker = this.markers.get(ann.id)
    if (!marker) return
    marker.setColor(ann.color)
    marker.setTitle(ann.title)
  }

  selectMarker(id: string | null): void {
    for (const [mid, marker] of this.markers) marker.setSelected(mid === id)
  }

  /** 相机平滑飞行到标注点（从列表点击定位） */
  focusAnnotation(id: string): void {
    const marker = this.markers.get(id)
    if (!marker) return
    const worldPos = new THREE.Vector3()
    marker.sprite.getWorldPosition(worldPos)
    const normalWorld = new THREE.Vector3(marker.data.normal.x, marker.data.normal.y, marker.data.normal.z)
      .applyQuaternion(this.modelRoot.getWorldQuaternion(new THREE.Quaternion()))
      .normalize()
    const dist = Math.max(this.modelSize * 0.28, 0.3)
    const camTarget = worldPos.clone().add(normalWorld.multiplyScalar(dist))
    this.flyTo(camTarget, worldPos, 0.7)
  }

  // ===================== 框选放大 =====================

  setRectZoomMode(on: boolean): void {
    this.rectMode = on
    this.container.classList.toggle('rect-zoom-mode', on)
    this.renderer.domElement.style.cursor = on ? 'crosshair' : ''
    if (!on) {
      this.rectDiv.hidden = true
      this.rectStart = null
    }
  }

  private startRect(x: number, y: number): void {
    this.rectStart = { x, y }
    this.rectDiv.hidden = false
    this.rectDiv.style.left = `${x}px`
    this.rectDiv.style.top = `${y}px`
    this.rectDiv.style.width = '0px'
    this.rectDiv.style.height = '0px'
  }

  private moveRect(x: number, y: number): void {
    if (!this.rectStart) return
    const left = Math.min(x, this.rectStart.x)
    const top = Math.min(y, this.rectStart.y)
    this.rectDiv.style.left = `${left}px`
    this.rectDiv.style.top = `${top}px`
    this.rectDiv.style.width = `${Math.abs(x - this.rectStart.x)}px`
    this.rectDiv.style.height = `${Math.abs(y - this.rectStart.y)}px`
  }

  private finishRect(x: number, y: number): void {
    if (!this.rectStart) return
    const x0 = Math.min(x, this.rectStart.x)
    const x1 = Math.max(x, this.rectStart.x)
    const y0 = Math.min(y, this.rectStart.y)
    const y1 = Math.max(y, this.rectStart.y)
    this.rectDiv.hidden = true
    const start = this.rectStart
    this.rectStart = null
    const w = x1 - x0
    const h = y1 - y0
    if (w < 12 || h < 12) {
      this.callbacks.onToast('框选区域过小，请重新框选', 'error')
      return
    }
    this.zoomToScreenRect((x0 + x1) / 2, (y0 + y1) / 2, w, h, start)
  }

  /**
   * 框选放大：
   * 1. 屏幕矩形四角反投影到近/远平面形成视锥；
   * 2. 与模型求交，取交点中心作为新的轨道目标；
   * 3. 按矩形占视口比例推进相机距离；
   * 4. 推进后触发自动档位重算（视距变小 -> 纹理层级升高）。
   */
  private zoomToScreenRect(cx: number, cy: number, w: number, h: number, _start: { x: number; y: number }): void {
    const rect = this.renderer.domElement.getBoundingClientRect()
    const ndc = (px: number, py: number): THREE.Vector2 =>
      new THREE.Vector2(((px - rect.left) / rect.width) * 2 - 1, -((py - rect.top) / rect.height) * 2 + 1)

    const corners = [ndc(cx - w / 2, cy - h / 2), ndc(cx + w / 2, cy - h / 2), ndc(cx - w / 2, cy + h / 2), ndc(cx + w / 2, cy + h / 2)]
    const hits: THREE.Vector3[] = []
    const collectPotree = (): void => {
      const r = this.potree?.pick(this.camera, this.raycaster.ray)
      if (r) hits.push(r.point.clone())
    }
    for (const c of corners) {
      this.raycaster.setFromCamera(c, this.camera)
      if (this.kind === 'potree') {
        collectPotree()
      } else {
        const hit = this.raycaster.intersectObject(this.modelRoot, true)[0]
        if (hit) hits.push(hit.point.clone())
      }
    }
    // 再补充中心点射线
    this.raycaster.setFromCamera(ndc(cx, cy), this.camera)
    if (this.kind === 'potree') {
      collectPotree()
    } else {
      const centerHit = this.raycaster.intersectObject(this.modelRoot, true)[0]
      if (centerHit) hits.push(centerHit.point.clone())
    }

    if (hits.length === 0) {
      this.callbacks.onToast('框选区域未与模型相交', 'error')
      return
    }
    const target = new THREE.Vector3()
    for (const p of hits) target.add(p)
    target.divideScalar(hits.length)

    const fraction = Math.max(w / rect.width, h / rect.height)
    const camDir = this.camera.position.clone().sub(this.controls.target).normalize()
    const currentDist = this.camera.position.distanceTo(this.controls.target)
    const newDist = THREE.MathUtils.clamp(currentDist * fraction, this.controls.minDistance, this.controls.maxDistance)
    const newCamPos = target.clone().add(camDir.multiplyScalar(newDist))
    this.flyTo(newCamPos, target, 0.6)
    this.callbacks.onToast(`已放大到所选区域，纹理层级按视距重算（当前 ${this.activeTier} 档）`)
  }

  // ===================== 相机位姿 / 书签 =====================

  getCameraPose(): CameraPose {
    return {
      position: { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
      target: { x: this.controls.target.x, y: this.controls.target.y, z: this.controls.target.z },
      up: { x: this.camera.up.x, y: this.camera.up.y, z: this.camera.up.z },
      fov: this.camera.fov,
    }
  }

  restorePose(pose: CameraPose): void {
    this.flyTo(
      new THREE.Vector3(pose.position.x, pose.position.y, pose.position.z),
      new THREE.Vector3(pose.target.x, pose.target.y, pose.target.z),
      0.7,
      pose.fov,
    )
  }

  private flyTo(camTo: THREE.Vector3, targetTo: THREE.Vector3, dur = 0.7, fov?: number): void {
    this.cameraTween = {
      from: this.camera.position.clone(),
      to: camTo.clone(),
      targetFrom: this.controls.target.clone(),
      targetTo: targetTo.clone(),
      t: 0,
      dur,
    }
    if (fov && Math.abs(fov - this.camera.fov) > 0.01) {
      const startFov = this.camera.fov
      const start = performance.now()
      const animateFov = (): void => {
        const k = Math.min((performance.now() - start) / (dur * 1000), 1)
        this.camera.fov = THREE.MathUtils.lerp(startFov, fov, this.easeInOut(k))
        this.camera.updateProjectionMatrix()
        if (k < 1 && this.cameraTween) requestAnimationFrame(animateFov)
      }
      animateFov()
    }
  }

  private easeInOut(k: number): number {
    return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2
  }

  // ===================== 指针事件 =====================

  private downPos: { x: number; y: number } | null = null

  private bindPointerEvents(): void {
    const el = this.renderer.domElement
    el.addEventListener('pointerdown', (e) => {
      this.downPos = { x: e.clientX, y: e.clientY }
      if (this.rectMode) this.startRect(e.clientX - el.getBoundingClientRect().left, e.clientY - el.getBoundingClientRect().top)
    })
    el.addEventListener('pointermove', (e) => {
      if (this.rectMode && this.rectStart) {
        const r = el.getBoundingClientRect()
        this.moveRect(e.clientX - r.left, e.clientY - r.top)
      }
    })
    window.addEventListener('pointerup', (e) => {
      if (!this.downPos) return
      const moved = Math.hypot(e.clientX - this.downPos.x, e.clientY - this.downPos.y)
      const wasRect = this.rectMode && this.rectStart
      if (wasRect) {
        const r = el.getBoundingClientRect()
        this.finishRect(e.clientX - r.left, e.clientY - r.top)
      } else if (moved < 5 && this.container.classList.contains('picking-mode')) {
        this.pickAt(e.clientX, e.clientY)
      }
      this.downPos = null
    })
  }

  // ===================== 渲染循环 =====================

  private loop = (): void => {
    if (this.disposed) return
    this.rafId = requestAnimationFrame(this.loop)

    // 相机补间
    if (this.cameraTween) {
      const tw = this.cameraTween
      tw.t += 1 / 60
      const k = this.easeInOut(Math.min(tw.t / tw.dur, 1))
      this.camera.position.lerpVectors(tw.from, tw.to, k)
      this.controls.target.lerpVectors(tw.targetFrom, tw.targetTo, k)
      if (k >= 1) this.cameraTween = null
    }
    this.controls.update()

    // potree LOD 更新
    if (this.potree) {
      this.potree.update(this.camera)
      const p = this.potree.getLoadingProgress()
      this.callbacks.onLoadingProgress(p)
    }

    // 自动档位：视距驱动
    if (this.autoTier && this.kind) {
      const t = this.tierFromDistance()
      if (t !== this.activeTier) {
        this.applyTier(t)
      }
    }

    if (this.activeTier !== this.lastTierEmit) {
      this.lastTierEmit = this.activeTier
      this.callbacks.onActiveTierChange(this.activeTier)
    }

    // 标注更新
    for (const marker of this.markers.values()) {
      marker.update(this.camera, this.renderer, this.container)
    }

    this.renderer.render(this.scene, this.camera)
  }

  private handleResize(): void {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    if (w === 0 || h === 0) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  get currentKind(): LoadedKind | null {
    return this.kind
  }

  dispose(): void {
    this.disposed = true
    cancelAnimationFrame(this.rafId)
    this.resizeObserver.disconnect()
    this.clearModel()
    this.controls.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
    this.rectDiv.remove()
  }
}
