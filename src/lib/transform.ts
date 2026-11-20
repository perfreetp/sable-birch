import * as THREE from 'three';
import type { Pose } from './types.ts';

export function eulerFromDegrees(rotation: readonly number[]) {
  const d = Math.PI / 180;
  return new THREE.Euler(rotation[0] * d, rotation[1] * d, rotation[2] * d, 'XYZ');
}

export function quaternionFromPose(pose: Pose): THREE.Quaternion {
  return new THREE.Quaternion().setFromEuler(eulerFromDegrees(pose.rotation));
}

/** 残片局部 → 世界 的矩阵 */
export function matrixFromPose(pose: Pose): THREE.Matrix4 {
  const q = quaternionFromPose(pose);
  return new THREE.Matrix4().compose(
    new THREE.Vector3(pose.position[0], pose.position[1], pose.position[2]),
    q,
    new THREE.Vector3(1, 1, 1),
  );
}

/** 从 Object3D 当前变换提取位姿（度） */
export function poseFromObject(object: THREE.Object3D): Pose {
  const e = new THREE.Euler().setFromQuaternion(object.quaternion, 'XYZ');
  const r = 180 / Math.PI;
  return {
    position: [round(object.position.x, 4), round(object.position.y, 4), round(object.position.z, 4)],
    rotation: [round(normalizeDeg(e.x * r), 3), round(normalizeDeg(e.y * r), 3), round(normalizeDeg(e.z * r), 3)],
  };
}

export function round(v: number, digits: number) {
  const p = 10 ** digits;
  return Math.round(v * p) / p;
}

export function normalizeDeg(deg: number) {
  let d = ((deg + 180) % 360 + 360) % 360 - 180;
  if (Object.is(d, -180)) d = 180;
  return d;
}

/** 以 0.5° 精度吸附角度 */
export function snapAngle(deg: number, step = 0.5) {
  return normalizeDeg(Math.round(deg / step) * step);
}

/** 以 1mm 精度吸附平移 */
export function snapTranslation(mm: number, step = 1) {
  return Math.round(mm / step) * step;
}

export const DEG = Math.PI / 180;
