/**
 * 标注标记：锚点 Sprite（始终面向相机）+ 屏幕空间 HTML 标签。
 * 位置与法线存储于模型根节点局部坐标系，模型任意变换后标记仍贴合表面。
 */
import * as THREE from 'three'
import type { AnnotationData } from '@/types'

function makePinTexture(color: string): THREE.CanvasTexture {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)

  const c = size / 2
  // 柔和外圈（低透明度，避免过曝）
  const halo = ctx.createRadialGradient(c, c, size * 0.18, c, c, c - 4)
  halo.addColorStop(0, color)
  halo.addColorStop(0.5, color)
  halo.addColorStop(0.8, 'rgba(0,0,0,0.25)')
  halo.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.globalAlpha = 0.9
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(c, c, c - 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1

  // 中心实心点（占画布约 44% 直径）+ 白色描边
  ctx.fillStyle = color
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 7
  ctx.beginPath()
  ctx.arc(c, c, size * 0.22, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export class AnnotationMarker {
  readonly data: AnnotationData
  readonly sprite: THREE.Sprite
  readonly labelEl: HTMLDivElement
  private texture: THREE.CanvasTexture
  private modelRoot: THREE.Object3D
  private tmpWorld = new THREE.Vector3()
  private isDisposed = false
  private selected = false

  constructor(data: AnnotationData, modelRoot: THREE.Object3D) {
    this.data = data
    this.modelRoot = modelRoot
    this.texture = makePinTexture(data.color)

    const mat = new THREE.SpriteMaterial({
      map: this.texture,
      depthTest: true,
      depthWrite: false,
      transparent: true,
    })
    this.sprite = new THREE.Sprite(mat)
    this.sprite.name = `annotation-${data.id}`
    this.sprite.userData.annotationId = data.id
    // Sprite 作为模型根节点的子节点：局部坐标锚定，跟随模型一切变换
    this.sprite.position.set(data.position.x, data.position.y, data.position.z)
    modelRoot.add(this.sprite)

    this.labelEl = document.createElement('div')
    this.labelEl.className = 'annotation-label'
    this.labelEl.dataset.annotationId = data.id
    this.labelEl.textContent = data.title
  }

  setColor(color: string): void {
    this.texture.dispose()
    this.texture = makePinTexture(color)
    ;(this.sprite.material as THREE.SpriteMaterial).map = this.texture
    ;(this.sprite.material as THREE.SpriteMaterial).needsUpdate = true
  }

  setTitle(title: string): void {
    this.labelEl.textContent = title
  }

  setSelected(selected: boolean): void {
    this.selected = selected
    this.labelEl.classList.toggle('is-selected', selected)
  }

  /**
   * 每帧更新：
   * 1. 按相机距离缩放 sprite，保证屏幕尺寸近似恒定；
   * 2. 投影到屏幕坐标定位 HTML 标签；
   * 3. 被模型遮挡时降低标签透明度。
   */
  update(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, container: HTMLElement): void {
    if (this.isDisposed || !this.sprite.parent) return
    this.sprite.getWorldPosition(this.tmpWorld)
    const distance = camera.position.distanceTo(this.tmpWorld)
    // 恒定屏幕尺寸：目标直径约 22px（选中 28px）。
    // 视口在距离 d 处的世界高度 = 2·d·tan(fov/2)，按像素比例换算 sprite 世界直径。
    const viewportHeightPx = container.clientHeight || 1
    const targetPx = this.selected ? 30 : 24
    const worldHeightAtDistance = 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5))
    const worldSize = (targetPx / viewportHeightPx) * worldHeightAtDistance
    this.sprite.scale.setScalar(worldSize)

    const projected = this.tmpWorld.clone().project(camera)
    const w = container.clientWidth
    const h = container.clientHeight
    const visible = projected.z > -1 && projected.z < 1
    this.labelEl.style.display = visible ? '' : 'none'
    if (!visible) return

    const x = (projected.x * 0.5 + 0.5) * w
    const y = (-projected.y * 0.5 + 0.5) * h
    // 标签整体上移，给 pin 留出空间（约 1.4 个 pin 直径）
    const labelLift = (this.selected ? 30 : 24) * 1.4
    this.labelEl.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - labelLift}px)`

    // 遮挡检测：从相机向标记点发射深度射线，仅检测网格，不递归 Sprite/容器
    const dir = this.tmpWorld.clone().sub(camera.position)
    const distToPoint = dir.length()
    const rc = new THREE.Raycaster(camera.position.clone(), dir.normalize(), 0, distToPoint - worldSize * 0.6)
    rc.camera = camera
    const occluders: THREE.Mesh[] = []
    this.modelRoot.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.isMesh) occluders.push(mesh)
    })
    const occluded = rc.intersectObjects(occluders, false).length > 0
    this.labelEl.classList.toggle('is-occluded', occluded)
  }

  dispose(): void {
    this.isDisposed = true
    if (this.sprite.parent) this.sprite.parent.remove(this.sprite)
    this.texture.dispose()
    ;(this.sprite.material as THREE.SpriteMaterial).dispose()
    this.labelEl.remove()
  }
}
