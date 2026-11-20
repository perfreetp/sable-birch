import * as THREE from 'three';

export interface RawMesh {
  positions: Float32Array;
  index: Uint32Array;
  triangleCount: number;
}

/** 将几何烘焙到世界坐标，返回可直接跨 Worker 传输的裸数组 */
export function bakeGeometry(geometry: THREE.BufferGeometry, matrix?: THREE.Matrix4): RawMesh {
  const g = matrix ? geometry.clone().applyMatrix4(matrix) : geometry.clone();
  const posAttr = g.attributes.position;
  const positions = new Float32Array(posAttr.array as ArrayLike<number>);
  let index: Uint32Array;
  if (g.index) {
    const src = g.index.array as ArrayLike<number>;
    index = Uint32Array.from(src as Uint32Array);
  } else {
    index = new Uint32Array(posAttr.count);
    for (let i = 0; i < index.length; i++) index[i] = i;
  }
  g.dispose();
  return { positions, index, triangleCount: index.length / 3 };
}

/**
 * 归一化一个网格：缩放至 targetDiagonal（包围盒对角线），居中原点。
 * 用于导入了单位/比例不一致的扫描网格时的自动规整。
 */
export function normalizeGeometry(geometry: THREE.BufferGeometry, targetDiagonal = 110): { scale: number; offset: THREE.Vector3 } {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const size = new THREE.Vector3();
  box.getSize(size);
  const diag = size.length();
  const scale = diag > 1e-6 ? Math.min(3, Math.max(0.08, targetDiagonal / diag)) : 1;
  const center = new THREE.Vector3();
  box.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);
  geometry.scale(scale, scale, scale);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  geometry.computeVertexNormals();
  return { scale, offset: center };
}

/** 生成残片表面采样点（局部坐标，用于快速距离预筛） */
export function sampleSurfacePoints(geometry: THREE.BufferGeometry, count = 800): Float32Array {
  const pos = geometry.attributes.position;
  const total = pos.count;
  const stride = Math.max(1, Math.floor(total / count));
  const out: number[] = [];
  for (let i = 0; i < total; i += stride) {
    out.push(pos.getX(i), pos.getY(i), pos.getZ(i));
  }
  return new Float32Array(out);
}
