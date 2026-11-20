import * as THREE from 'three'

/** WGS84 椭球参数 */
export const WGS84 = {
  /** 长半轴 (m) */
  a: 6378137.0,
  /** 扁率 */
  f: 1 / 298.257223563,
  /** 地球自转角速度 (rad/s) */
  omega: 7292115e-11,
  /** 标准引力常数 GM (m^3/s^2) */
  mu: 3.986004418e14,
} as const

/** 第一偏心率平方 e² = 2f − f² */
export const E2 = 2 * WGS84.f - WGS84.f * WGS84.f
/** 短半轴 b */
export const B = WGS84.a * (1 - WGS84.f)

const DEG = Math.PI / 180

export const deg2rad = (d: number) => d * DEG
export const rad2deg = (r: number) => r / DEG

/**
 * 大地坐标 (经纬度 + 椭球高) → ECEF 地固直角坐标
 * @param lonDeg 经度 (度), latDeg 纬度 (度), h 椭球高 (m)
 */
export function geodeticToECEF(lonDeg: number, latDeg: number, h = 0): THREE.Vector3 {
  const lon = deg2rad(lonDeg)
  const lat = deg2rad(latDeg)
  const sinLat = Math.sin(lat)
  const cosLat = Math.cos(lat)
  const N = WGS84.a / Math.sqrt(1 - E2 * sinLat * sinLat)
  return new THREE.Vector3(
    (N + h) * cosLat * Math.cos(lon),
    (N + h) * cosLat * Math.sin(lon),
    (N * (1 - E2) + h) * sinLat,
  )
}

/** ECEF → 大地坐标，Bowring 迭代 */
export function ecefToGeodetic(p: THREE.Vector3): { lon: number; lat: number; h: number } {
  const { x, y, z } = p
  const lon = Math.atan2(y, x)
  const p_xy = Math.hypot(x, y)
  const ep2 = (WGS84.a * WGS84.a - B * B) / (B * B)
  const theta = Math.atan2(z * WGS84.a, p_xy * B)

  let lat = Math.atan2(
    z + ep2 * B * Math.pow(Math.sin(theta), 3),
    p_xy - E2 * WGS84.a * Math.pow(Math.cos(theta), 3),
  )
  // 再做一次 Newton 精化（高高度时收敛更稳）
  for (let i = 0; i < 5; i++) {
    const sinLat = Math.sin(lat)
    const N = WGS84.a / Math.sqrt(1 - E2 * sinLat * sinLat)
    lat = Math.atan2(z + N * E2 * sinLat, p_xy)
  }
  const sinLat = Math.sin(lat)
  const N = WGS84.a / Math.sqrt(1 - E2 * sinLat * sinLat)
  const h = p_xy / Math.cos(lat) - N
  return { lon: rad2deg(lon), lat: rad2deg(lat), h }
}

/** 发射点处的 ENU 局部坐标系基向量（东/北/天），返回列向量 */
export function enuBasis(lonDeg: number, latDeg: number) {
  const lon = deg2rad(lonDeg)
  const lat = deg2rad(latDeg)
  const sinLon = Math.sin(lon), cosLon = Math.cos(lon)
  const sinLat = Math.sin(lat), cosLat = Math.cos(lat)
  const east = new THREE.Vector3(-sinLon, cosLon, 0)
  const north = new THREE.Vector3(-sinLat * cosLon, -sinLat * sinLon, cosLat)
  const up = new THREE.Vector3(cosLat * cosLon, cosLat * sinLon, sinLat)
  return { east, north, up }
}

/** ENU 偏移量 → ECEF（基于发射点局部坐标架） */
export function enuToECEF(
  originECEF: THREE.Vector3,
  basis: { east: THREE.Vector3; north: THREE.Vector3; up: THREE.Vector3 },
  e: number, n: number, u: number,
): THREE.Vector3 {
  return originECEF.clone()
    .addScaledVector(basis.east, e)
    .addScaledVector(basis.north, n)
    .addScaledVector(basis.up, u)
}

/** 方位角 (度，从正北顺时针) → ENU 水平单位方向 */
export function azimuthToHorizontal(azimuthDeg: number): { e: number; n: number } {
  const az = deg2rad(azimuthDeg)
  return { e: Math.sin(az), n: Math.cos(az) }
}

/** 卡门线高度 (m) */
export const KARMAN_LINE = 100_000

/** 沿地心方向、高度 h 处的单位径向向量（近似椭球法线方向） */
export function localUpAt(p: THREE.Vector3): THREE.Vector3 {
  return p.clone().normalize()
}
