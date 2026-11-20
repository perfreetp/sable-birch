/**
 * 纯几何计算:进近视锥、穿透检测、热力网格。
 * 不依赖 Babylon,便于独立测试与复用。
 *
 * 坐标约定:世界坐标 X 东、Z 北、Y 上;方位角 0=北(+Z),顺时针为正。
 */
import type { Approach, ConeParams, ObstacleResult, Vertiport } from '../types'

const DEG = Math.PI / 180

/** 方位角 → 单位方向向量 (x, z) */
export function azimuthDir(azimuthDeg: number): { x: number; z: number } {
  const a = azimuthDeg * DEG
  return { x: Math.sin(a), z: Math.cos(a) }
}

/** 视锥在距离 d 处的横截面参数 */
export function coneSectionAt(params: ConeParams, d: number) {
  const slope = Math.tan(params.slopeDeg * DEG)
  const div = Math.tan(params.divergenceDeg * DEG)
  return {
    /** 净空面(下滑道面)相对场坪的高度 */
    surfaceH: d * slope,
    halfWidth: params.initHalfWidth + d * div,
    halfHeight: params.initHalfHeight + d * div
  }
}

/**
 * 点是否落在某视锥的水平投影(梯形)内。
 * 返回 null 表示不在;否则返回沿轴距离 d 与横向偏移 t。
 */
export function pointInConeFootprint(
  px: number, pz: number,
  vp: Vertiport, approach: Approach, params: ConeParams
): { d: number; t: number } | null {
  const dir = azimuthDir(approach.azimuth)
  const rx = px - vp.x
  const rz = pz - vp.z
  const d = rx * dir.x + rz * dir.z
  if (d < 0 || d > params.length) return null
  const t = rx * dir.z - rz * dir.x // 垂直于轴向的偏移
  const { halfWidth } = coneSectionAt(params, d)
  if (Math.abs(t) > halfWidth) return null
  return { d, t }
}

/**
 * 净空面(下滑道面)在某世界点的海拔高度。
 * 点不在视锥水平投影内时返回 null。
 */
export function surfaceHeightAt(
  px: number, pz: number,
  vp: Vertiport, approach: Approach, params: ConeParams
): number | null {
  const hit = pointInConeFootprint(px, pz, vp, approach, params)
  if (!hit) return null
  return vp.elevation + coneSectionAt(params, hit.d).surfaceH
}

/** 建筑物(轴对齐盒)定义 */
export interface Building {
  id: number
  cx: number
  cz: number
  /** 半宽(X 向) */
  hx: number
  /** 半深(Z 向) */
  hz: number
  /** 底海拔 */
  base: number
  /** 顶海拔 */
  top: number
}

/**
 * 检测一栋建筑对一个视锥的穿透。
 * 在建筑顶面采样(角点+中心+边中点),找出高出净空面的最大深度。
 */
export function buildingPenetration(
  b: Building,
  vp: Vertiport, approach: Approach, params: ConeParams
): ObstacleResult | null {
  const samples: [number, number][] = [
    [b.cx, b.cz],
    [b.cx - b.hx, b.cz - b.hz],
    [b.cx + b.hx, b.cz - b.hz],
    [b.cx - b.hx, b.cz + b.hz],
    [b.cx + b.hx, b.cz + b.hz],
    [b.cx - b.hx, b.cz],
    [b.cx + b.hx, b.cz],
    [b.cx, b.cz - b.hz],
    [b.cx, b.cz + b.hz]
  ]
  let maxDepth = 0
  let bestSurface = 0
  for (const [sx, sz] of samples) {
    const surf = surfaceHeightAt(sx, sz, vp, approach, params)
    if (surf === null) continue
    const depth = b.top - surf
    if (depth > maxDepth) {
      maxDepth = depth
      bestSurface = surf
    }
  }
  if (maxDepth <= 0) return null
  const dx = b.cx - vp.x
  const dz = b.cz - vp.z
  return {
    buildingId: b.id,
    approachId: approach.id,
    depth: Math.round(maxDepth * 10) / 10,
    topHeight: Math.round(b.top * 10) / 10,
    surfaceHeight: Math.round(bestSurface * 10) / 10,
    distance: Math.round(Math.sqrt(dx * dx + dz * dz)),
    cx: b.cx,
    cz: b.cz
  }
}

/**
 * 热力网格单元结果。
 * height = 该网格中心处所有视锥净空面中,距地面最近的高度(米);
 * 无覆盖时为 null。
 */
export interface HeatCell {
  gx: number
  gz: number
  /** 网格中心世界坐标 */
  wx: number
  wz: number
  /** 覆盖高度(净空面距地面),无覆盖为 null */
  height: number | null
  /** 覆盖该网格的视锥数量 */
  coneCount: number
}

/**
 * 计算热力网格。groundHeight(x,z) 返回地面海拔。
 */
export function computeHeatmap(
  originX: number, originZ: number,
  cellsX: number, cellsZ: number, cellSize: number,
  vp: Vertiport, approaches: Approach[], params: ConeParams,
  groundHeight: (x: number, z: number) => number
): HeatCell[] {
  const cells: HeatCell[] = []
  for (let gz = 0; gz < cellsZ; gz++) {
    for (let gx = 0; gx < cellsX; gx++) {
      const wx = originX + (gx + 0.5) * cellSize
      const wz = originZ + (gz + 0.5) * cellSize
      let minClear: number | null = null
      let count = 0
      for (const ap of approaches) {
        const surf = surfaceHeightAt(wx, wz, vp, ap, params)
        if (surf === null) continue
        count++
        const clear = surf - groundHeight(wx, wz)
        if (minClear === null || clear < minClear) minClear = clear
      }
      cells.push({ gx, gz, wx, wz, height: minClear, coneCount: count })
    }
  }
  return cells
}
