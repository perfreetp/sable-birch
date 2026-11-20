import { reactive } from 'vue'
import type { Approach, AssessmentResult, ConeParams, Vertiport } from './types'
import { APPROACH_COLORS } from './types'

/** 全局响应式状态 */
export const state = reactive({
  vertiport: { x: 0, z: 0, rotation: 0, elevation: 0 } as Vertiport,
  approaches: [
    { id: 0, azimuth: 0, color: APPROACH_COLORS[0] },
    { id: 1, azimuth: 120, color: APPROACH_COLORS[1] },
    { id: 2, azimuth: 240, color: APPROACH_COLORS[2] }
  ] as Approach[],
  coneParams: {
    length: 800,
    slopeDeg: 8,
    divergenceDeg: 7.5,
    initHalfWidth: 25,
    initHalfHeight: 5
  } as ConeParams,
  /** 视角模式 */
  viewMode: 'orbit' as 'orbit' | 'approach',
  /** 进近视角使用的进近方向 */
  activeApproach: 0,
  /** 是否处于"点击地面放置起降场"模式 */
  placing: false,
  /** 评估结果(场景重算后更新) */
  results: null as AssessmentResult | null,
  /** 悬停的热力网格信息 */
  hoverCell: null as null | {
    wx: number; wz: number; height: number; level: number
    coneCount: number; screenX: number; screenY: number
  },
  /** 引擎类型提示 */
  engineKind: '' as '' | 'WebGPU' | 'WebGL',
  /** 场景是否就绪 */
  ready: false
})

export function setApproachAzimuth(id: number, azimuth: number) {
  const ap = state.approaches.find(a => a.id === id)
  if (ap) ap.azimuth = ((azimuth % 360) + 360) % 360
}
