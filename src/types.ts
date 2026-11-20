/** 三维向量（可序列化） */
export interface Vec3 {
  x: number
  y: number
  z: number
}

/** 标注点：位置与法线均存储在模型根节点的局部坐标系中，随模型变换始终贴合表面 */
export interface AnnotationData {
  id: string
  title: string
  note: string
  color: string
  position: Vec3
  normal: Vec3
  createdAt: number
}

/** 相机位姿书签 */
export interface CameraPose {
  position: Vec3
  target: Vec3
  up: Vec3
  fov: number
}

export interface Bookmark {
  id: string
  name: string
  pose: CameraPose
  /** 保存书签时的纹理档位（1-8） */
  tier: number
  autoTier: boolean
  createdAt: number
}

export type ModelKind = 'gltf' | 'potree' | 'demo'

export interface ModelRef {
  kind: ModelKind
  /** 模型来源名称（文件名 / URL / 内置演示），重新导入工程时用于匹配 */
  name: string
  /** 归一化后模型根节点名称 */
  rootName?: string
}

/** 导出/导入的工程文件结构 */
export interface ViewerProject {
  format: 'artifact-viewer-project'
  version: 1
  model: ModelRef | null
  annotations: AnnotationData[]
  bookmarks: Bookmark[]
  view: {
    tier: number
    autoTier: boolean
    channelDiffuse: boolean
    channelNormal: boolean
    ambient: number
  }
  exportedAt: number
}

export interface ChannelState {
  diffuse: boolean
  normal: boolean
}

export const PROJECT_FORMAT = 'artifact-viewer-project'
