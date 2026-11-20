import { reactive } from 'vue'
import type { Viewer } from './three/Viewer'

export interface SectionParams {
  x1: number
  y1: number
  x2: number
  y2: number
  t: number
  dir: 'x' | 'y'
}

export interface ProfileData {
  d: number[]
  h: number[]
  length: number
}

export interface MeasureResult {
  dist: number
  dh: number
  slope: number
}

export type WorkMode = 'view' | 'rect' | 'measure'

export const state = reactive({
  fileName: '',
  status: '请加载点云文件(.ply/.xyz/.txt/.csv),或点击"生成示例点云"',
  rawCount: 0,
  downsampledCount: 0,
  voxelSize: 0.25,
  pointSize: 2,
  pointsSource: 'down' as 'raw' | 'down',
  showPoints: true,
  showMesh: true,
  hasTerrain: false,
  gridInfo: null as null | { nx: number; ny: number; minH: number; maxH: number },
  contourEnabled: true,
  contourInterval: 0.5,
  contourLabels: true,
  mode: 'view' as WorkMode,
  sectionEnabled: false,
  section: null as SectionParams | null,
  profile: null as ProfileData | null,
  measureResult: null as MeasureResult | null,
})

/** 由 App 挂载后注入,供各面板调用三维视图方法 */
export const viewerRef: { v: Viewer | null } = { v: null }
