import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { EffectComposer, EffectPass, RenderPass, BloomEffect } from 'postprocessing'
import {
  createEarth, createGraticule, createAtmosphere, createStars, createLights, R_A, K,
} from './earth'
import {
  buildTrajectoryVisuals, setTrajectoryProgress, animateMarkers, makeRocket, makeSiteMarker,
  placeRocket, sampleIndexAt, TrajectoryVisuals,
} from './trajectoryRender'
import { DepthFogEffect } from './DepthFogEffect'
import { geodeticToECEF } from '../lib/geo'
import { TrajectoryResult } from '../lib/types'

export class EarthScene {
  private container: HTMLElement
  private renderer: THREE.WebGLRenderer
  private labelRenderer: CSS2DRenderer
  private composer: EffectComposer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private raf = 0
  private clock = new THREE.Clock()
  private resizeObs: ResizeObserver

  private result: TrajectoryResult | null = null
  private visuals: TrajectoryVisuals | null = null
  private rocket = makeRocket()
  private markersGroup: THREE.Group | null = null
  private follow = false
  private followTarget = new THREE.Vector3()
  private disposed = false

  constructor(container: HTMLElement) {
    this.container = container
    const w = container.clientWidth
    const h = container.clientHeight

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(w, h)
    this.renderer.setClearColor(0x05070f, 1)
    this.renderer.domElement.style.position = 'absolute'
    this.renderer.domElement.style.inset = '0'
    container.appendChild(this.renderer.domElement)

    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(w, h)
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.style.inset = '0'
    this.labelRenderer.domElement.style.pointerEvents = 'none'
    container.appendChild(this.labelRenderer.domElement)

    this.camera = new THREE.PerspectiveCamera(50, w / h, 1, R_A * 40)
    this.camera.position.set(R_A * 1.6, R_A * 0.9, R_A * 1.1)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.minDistance = R_A * 1.02
    this.controls.maxDistance = R_A * 8
    this.controls.target.set(0, 0, 0)

    const sunDir = new THREE.Vector3(0.5, 0.35, 0.8).normalize()
    this.scene.add(createLights(sunDir))
    this.scene.add(createStars())
    this.scene.add(createEarth(sunDir))
    this.scene.add(createGraticule())
    const atmo = createAtmosphere()
    this.scene.add(atmo.group)
    this.scene.add(this.rocket)

    // 后处理：辉光 + 深度雾
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    const bloom = new BloomEffect({
      intensity: 0.9,
      luminanceThreshold: 0.25,
      luminanceSmoothing: 0.3,
      mipmapBlur: true,
      radius: 0.72,
    })
    const fog = new DepthFogEffect(new THREE.Color(0x0a1024), R_A * 1.25, R_A * 4.5)
    this.composer.addPass(new EffectPass(this.camera, bloom, fog))

    this.resizeObs = new ResizeObserver(() => this.onResize())
    this.resizeObs.observe(container)
    this.loop()
  }

  /** 载入一次计算结果，重建弹道相关对象 */
  setResult(result: TrajectoryResult) {
    this.clearResult()
    this.result = result
    const resolution = new THREE.Vector2(this.container.clientWidth, this.container.clientHeight)
    this.visuals = buildTrajectoryVisuals(result, resolution)
    this.markersGroup = this.visuals.markers
    this.scene.add(this.visuals.group)

    const site = makeSiteMarker(result.params.siteName, result.params.longitude, result.params.latitude)
    site.name = 'site-marker'
    this.scene.add(site)

    // 初始视角：中距离侧视发射区域，兼顾地球曲率与整条上升弹道
    const first = result.samples[0]
    const lastSample = result.samples[result.samples.length - 1]
    const launchPos = new THREE.Vector3(first.x, first.y, first.z).multiplyScalar(K)
    const apexPos = new THREE.Vector3(lastSample.x, lastSample.y, lastSample.z).multiplyScalar(K)
    const midTarget = launchPos.clone().lerp(apexPos, 0.3)
    const radial = launchPos.clone().normalize()
    // 后撤约 0.42 个地球半径（中近景），抬高相机俯视角使弹道弧线落在地球亮面
    const camPos = midTarget.clone().addScaledVector(radial, R_A * 0.42)
    this.camera.position.copy(camPos)
    this.controls.target.copy(midTarget)
    this.controls.minDistance = 60
    this.controls.maxDistance = R_A * 8
    this.setPlayback(0)
  }

  private clearResult() {
    if (this.visuals) {
      this.scene.remove(this.visuals.group)
      this.visuals.group.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else mat?.dispose?.()
      })
      this.visuals = null
    }
    const site = this.scene.getObjectByName('site-marker')
    if (site) {
      this.scene.remove(site)
      site.traverse((o) => {
        const mesh = o as THREE.Mesh
        mesh.geometry?.dispose()
        const mat = mesh.material as THREE.Material | undefined
        mat?.dispose?.()
      })
    }
    this.markersGroup = null
    this.rocket.visible = false
  }

  /** 回放推进：t 为相对起飞秒数 */
  setPlayback(t: number) {
    if (!this.result || !this.visuals) return
    const result = this.result
    const progress = THREE.MathUtils.clamp(t / result.duration, 0, 1)
    setTrajectoryProgress(this.visuals, progress)

    const idx = sampleIndexAt(result, Math.min(t, result.duration))
    const { pos } = placeRocket(this.rocket, result, idx)
    this.rocket.visible = t >= 0
    this.followTarget.copy(pos)

    // 分离标记随事件发生逐个显现
    if (this.markersGroup) {
      this.markersGroup.children.forEach((m, i) => {
        const ev = result.events[i]
        m.visible = !!ev && t >= ev.t - 0.05
      })
    }
    // 落区在对应分离后显现
    this.visuals.impactZones.children.forEach((g, i) => {
      const ev = result.events[i]
      g.visible = !!ev && t >= ev.t
    })
  }

  setFollow(on: boolean) {
    this.follow = on
  }

  get isFollowing() {
    return this.follow
  }

  /** 相机聚焦到经纬度/高度(km) */
  focusLLA(lon: number, lat: number, altKm = 0, distance = 500) {
    const target = geodeticToECEF(lon, lat, altKm * 1000).multiplyScalar(K)
    const radial = target.clone().normalize()
    this.camera.position.copy(target).addScaledVector(radial, distance)
    this.controls.target.copy(target)
  }

  focusEvent(index: number) {
    if (!this.result) return
    const ev = this.result.events[index]
    if (!ev) return
    const target = new THREE.Vector3(...ev.position).multiplyScalar(K)
    const radial = target.clone().normalize()
    this.camera.position.copy(target).addScaledVector(radial, 350)
    this.controls.target.copy(target)
  }

  /** 世界坐标 → 屏幕坐标（供 React 弹窗定位） */
  toScreen(world: THREE.Vector3): { x: number; y: number; visible: boolean } {
    const p = world.clone().project(this.camera)
    const rect = this.container.getBoundingClientRect()
    return {
      x: (p.x * 0.5 + 0.5) * rect.width,
      y: (-p.y * 0.5 + 0.5) * rect.height,
      visible: p.z < 1,
    }
  }

  eventWorldPosition(index: number): THREE.Vector3 | null {
    if (!this.result?.events[index]) return null
    return new THREE.Vector3(...this.result.events[index].position).multiplyScalar(K)
  }

  private loop = () => {
    if (this.disposed) return
    this.raf = requestAnimationFrame(this.loop)
    const elapsed = this.clock.getElapsedTime()
    this.controls.update()

    if (this.follow && this.result) {
      // 平滑把轨道控制器目标拉向火箭，相机随动且仍可环绕
      const delta = this.followTarget.clone().sub(this.controls.target)
      this.controls.target.addScaledVector(delta, 0.15)
      this.camera.position.addScaledVector(delta, 0.15)
    }
    if (this.markersGroup) animateMarkers(this.markersGroup, elapsed, this.camera)
    this.composer.render()
    this.labelRenderer.render(this.scene, this.camera)
  }

  private onResize() {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    if (w === 0 || h === 0) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.labelRenderer.setSize(w, h)
    this.composer.setSize(w, h)
    if (this.visuals) {
      const res = new THREE.Vector2(w, h)
      this.visuals.lines.forEach((l) => l.material.resolution.copy(res))
    }
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.resizeObs.disconnect()
    this.controls.dispose()
    this.clearResult()
    this.scene.traverse((o) => {
      const mesh = o as THREE.Mesh
      mesh.geometry?.dispose?.()
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
      else mat?.dispose?.()
    })
    this.composer.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
    this.labelRenderer.domElement.remove()
  }
}
