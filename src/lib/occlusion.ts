import * as THREE from 'three';
import type { MeshBVH } from 'three-mesh-bvh';
import type { Observer, SampleResult } from '../types';

const _origin = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _ray = new THREE.Ray();
const _target = new THREE.Vector3();

/** 观察点眼位（世界坐标） */
export function observerEye(o: Observer, out = new THREE.Vector3()): THREE.Vector3 {
  return out.set(o.x, o.eyeHeight, o.z);
}

/**
 * 判断采样点是否落在观察点视场内。
 * yaw=0 指向 -Z（正北），顺时针为正；
 * 水平半角 fov/2，垂直角范围 pitchDown ~ pitchUp（度，仰角）。
 */
export function isInFov(o: Observer, sample: SampleResult): boolean {
  const dx = sample.x - o.x;
  const dz = sample.z - o.z;
  const dy = sample.y - o.eyeHeight;
  const horizontalDist = Math.hypot(dx, dz);
  if (horizontalDist < 1e-6 && Math.abs(dy) < 1e-6) return true;

  // 方位角：相对 -Z 轴的顺时针夹角，归一化到 0~360
  let bearing = Math.atan2(dx, -dz) * (180 / Math.PI);
  if (bearing < 0) bearing += 360;
  let diff = Math.abs(bearing - o.yaw) % 360;
  if (diff > 180) diff = 360 - diff;
  if (diff > o.fov / 2) return false;

  const elevation = Math.atan2(dy, horizontalDist) * (180 / Math.PI);
  if (elevation < o.pitchDown || elevation > o.pitchUp) return false;
  return true;
}

export interface OcclusionOptions {
  /** 每处理多少采样点让出一次事件循环，保持 UI 响应 */
  yieldStep?: number;
  /** 进度回调（0~1） */
  onProgress?: (p: number) => void;
  /** 中止信号 */
  signal?: { aborted: boolean };
}

/**
 * 逐条视线 BVH 求交。
 * 对每个启用观察点：先做视场锥剔除，命中视场的采样点再发射射线，
 * 被建筑命中即记一次遮挡。occlusion = 被遮挡观察点数 / 有效观察点数。
 */
export async function computeOcclusion(
  bvh: MeshBVH,
  observers: Observer[],
  samples: SampleResult[],
  opts: OcclusionOptions = {}
): Promise<void> {
  const yieldStep = opts.yieldStep ?? 400;
  const active = observers.filter((o) => o.enabled);

  // 重置结果
  for (const s of samples) {
    s.occlusion = 0;
    s.inFov = false;
    s.hitObservers = 0;
    s.totalObservers = 0;
  }

  if (!active.length || !samples.length) return;

  const eyes = active.map((o) => observerEye(o));

  for (let i = 0; i < samples.length; i++) {
    if (opts.signal?.aborted) return;
    if (i % yieldStep === 0) {
      await new Promise((r) => setTimeout(r, 0));
      opts.onProgress?.(i / samples.length);
    }

    const s = samples[i];
    _target.set(s.x, s.y, s.z);

    for (let k = 0; k < active.length; k++) {
      if (!isInFov(active[k], s)) continue;
      s.inFov = true;
      s.totalObservers++;

      _origin.copy(eyes[k]);
      _dir.subVectors(_target, _origin);
      const dist = _dir.length();
      if (dist < 1e-6) continue;
      _dir.multiplyScalar(1 / dist);
      _ray.set(_origin, _dir);

      // far 限定为目标距离：仅统计到达采样点之前命中建筑的视线，
      // 端点落在建筑表面（far 处）不计为遮挡
      const hit = bvh.raycastFirst(_ray, THREE.DoubleSide, 0, dist - 0.05);
      if (hit) {
        s.hitObservers++;
      }
    }

    if (s.totalObservers > 0) {
      s.occlusion = s.hitObservers / s.totalObservers;
    }
  }

  opts.onProgress?.(1);
}

/** 遮挡程度分档（用于统计与着色） */
export function occlusionLevel(o: number): 'visible' | 'partial' | 'occluded' {
  if (o <= 0.001) return 'visible';
  if (o >= 0.999) return 'occluded';
  return 'partial';
}
