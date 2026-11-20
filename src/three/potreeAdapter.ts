/**
 * potree-core 适配层
 *
 * 封装 potree-core 2.x 的点云八叉树加载、LOD 更新、点选与材质控制，
 * 对上层 ViewerEngine 暴露统一接口，避免 potree 细节扩散到引擎代码中。
 */
import * as THREE from 'three'
import { Potree, PointColorType, PointSizeType, PointShape } from 'potree-core'
import type { PointCloudOctree } from 'potree-core'

/** potree-core 的 RequestManager 结构（该接口未从包顶层导出，按声明同构定义） */
interface PotreeRequestManager {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  getUrl(url: string): Promise<string>
}

export interface PotreePickResult {
  point: THREE.Vector3
  normal: THREE.Vector3
}

/**
 * 自定义 RequestManager：把逻辑 URL 前缀映射到本地 File 对象（blob URL），
 * 使 potree 可以直接加载用户通过目录选择器导入的点云数据。
 */
class BlobRequestManager implements PotreeRequestManager {
  private map = new Map<string, string>()
  private base: string

  constructor(fileMap: Map<string, File>, basePrefix: string) {
    for (const [relPath, file] of fileMap) {
      const blobUrl = URL.createObjectURL(file)
      this.map.set(relPath.replaceAll('\\', '/'), blobUrl)
    }
    this.base = basePrefix
  }

  private resolve(url: string): string {
    // potree 传入的可能是完整 URL（http://localhost/xxx/metadata.json），取 base 之后的相对段
    const idx = url.indexOf(this.base)
    const rel = idx >= 0 ? url.slice(idx + this.base.length).replace(/^\/+/, '') : url
    const hit = this.map.get(rel)
    if (!hit) throw new Error(`点云文件缺失: ${rel}`)
    return hit
  }

  async getUrl(url: string): Promise<string> {
    return this.resolve(url)
  }

  async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const raw = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
    return fetch(this.resolve(raw), init)
  }

  dispose(): void {
    for (const u of this.map.values()) URL.revokeObjectURL(u)
    this.map.clear()
  }
}

export class PotreeAdapter {
  readonly potree = new Potree()
  private clouds: PointCloudOctree[] = []
  private requestManagers: BlobRequestManager[] = []
  private renderer: THREE.WebGLRenderer

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer
    this.potree.pointBudget = 1_000_000
  }

  get pointClouds(): PointCloudOctree[] {
    return this.clouds
  }

  /**
   * 从 URL 加载（metadata.json 的可访问地址，http(s) 服务场景）
   */
  async loadFromUrl(metadataUrl: string): Promise<PointCloudOctree> {
    const rm: PotreeRequestManager = {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init),
      getUrl: (url: string) => Promise.resolve(url),
    }
    const cloud = await this.potree.loadPointCloud(metadataUrl, rm)
    this.configureMaterial(cloud)
    this.clouds.push(cloud)
    return cloud
  }

  /**
   * 从本地目录加载：fileMap 为相对路径 -> File，metadataRel 为 metadata.json 的相对路径
   */
  async loadFromFiles(fileMap: Map<string, File>, metadataRel: string): Promise<PointCloudOctree> {
    const basePrefix = 'data/'
    const rm = new BlobRequestManager(fileMap, basePrefix)
    this.requestManagers.push(rm)
    const cloud = await this.potree.loadPointCloud(`${basePrefix}${metadataRel}`, rm)
    this.configureMaterial(cloud)
    this.clouds.push(cloud)
    return cloud
  }

  private configureMaterial(cloud: PointCloudOctree): void {
    const mat = cloud.material as any
    mat.pointColorType = PointColorType.RGB
    mat.pointSizeType = PointSizeType.ADAPTIVE
    mat.shape = PointShape.CIRCLE
    mat.size = 2
    mat.minSize = 1
    mat.maxSize = 10
    mat.opacity = 1
  }

  /** 每帧调用，驱动八叉树 LOD 节点加载与可见性更新 */
  update(camera: THREE.Camera): void {
    if (this.clouds.length === 0) return
    this.potree.updatePointClouds(this.clouds, camera, this.renderer)
  }

  /** 屏幕射线点选，返回世界坐标与法线 */
  pick(camera: THREE.Camera, ray: THREE.Ray): PotreePickResult | null {
    if (this.clouds.length === 0) return null
    const hit = Potree.pick(this.clouds, this.renderer, camera, ray)
    if (hit && hit.position) {
      const point = hit.position.clone()
      const normal = hit.normal
        ? hit.normal.clone().normalize()
        : this.estimateNormal(this.clouds[0], point)
      return { point, normal }
    }
    return null
  }

  /** 点云无法线属性时，用包围球中心向外的径向方向作为近似表面法线 */
  private estimateNormal(cloud: PointCloudOctree, point: THREE.Vector3): THREE.Vector3 {
    const center = cloud.boundingSphere.center
    const n = point.clone().sub(center)
    if (n.lengthSq() < 1e-8) n.set(0, 1, 0)
    return n.normalize()
  }

  /** 纹理档位（1-8）-> potree 点预算与节点细分粒度 */
  applyTier(tier: number): void {
    // 档位越高：点预算越大、节点屏幕像素阈值越小（加载更深层节点）
    const budgets = [20_000, 50_000, 120_000, 300_000, 700_000, 1_500_000, 3_000_000, 6_000_000]
    const minPixelSizes = [160, 120, 90, 64, 44, 28, 16, 8]
    const idx = THREE.MathUtils.clamp(tier, 1, 8) - 1
    this.potree.pointBudget = budgets[idx]
    for (const cloud of this.clouds) {
      cloud.minNodePixelSize = minPixelSizes[idx]
    }
  }

  /** 通道开关：漫反射(RGB) / 法线(NORMAL 着色) / 全部关闭(DEPTH) */
  applyChannels(diffuseOn: boolean, normalOn: boolean): void {
    for (const cloud of this.clouds) {
      const mat = cloud.material as any
      if (diffuseOn && normalOn) mat.pointColorType = PointColorType.RGB
      else if (diffuseOn) mat.pointColorType = PointColorType.RGB
      else if (normalOn) mat.pointColorType = PointColorType.NORMAL
      else mat.pointColorType = PointColorType.DEPTH
    }
  }

  /** 环境光强度 0-2：映射为 potree RGB 亮度增益 */
  applyAmbient(value: number): void {
    for (const cloud of this.clouds) {
      const mat = cloud.material as any
      // rgbBrightness 为加减项；0 时仍保留基础可见度
      mat.rgbBrightness = (value - 1) * 0.6
      mat.rgbGamma = THREE.MathUtils.clamp(1.25 - value * 0.2, 0.7, 1.4)
    }
  }

  getLoadingProgress(): number {
    if (this.clouds.length === 0) return 0
    let sum = 0
    for (const cloud of this.clouds) sum += cloud.progress
    return sum / this.clouds.length
  }

  dispose(): void {
    for (const cloud of this.clouds) {
      try {
        cloud.dispose()
      } catch {
        /* 已释放则忽略 */
      }
    }
    this.clouds = []
    for (const rm of this.requestManagers) rm.dispose()
    this.requestManagers = []
  }
}
