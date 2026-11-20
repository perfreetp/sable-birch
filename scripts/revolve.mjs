// 构建一个封闭的旋转体（截面为闭合折线：外壁→口沿→内壁→内底），保证水密流形。
// profile: [[r, y], ...] 首尾为 r≈0 的轴心点。
import * as THREE from 'three';

export function revolveClosed(profile, segments = 96) {
  const positions = [];
  const indices = [];
  const rings = []; // 每个截面点：ring 索引数组（极点只有一个）

  const pushVertex = (x, y, z) => {
    positions.push(x, y, z);
    return positions.length / 3 - 1;
  };

  for (const [r, y] of profile) {
    if (r <= 1e-4) {
      rings.push([pushVertex(0, y, 0)]);
    } else {
      const ring = [];
      for (let s = 0; s < segments; s++) {
        const a = -(s / segments) * Math.PI * 2;
        ring.push(pushVertex(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      rings.push(ring);
    }
  }

  for (let i = 0; i < rings.length - 1; i++) {
    const A = rings[i], B = rings[i + 1];
    if (A.length === 1 && B.length === 1) continue;
    if (A.length === 1) {
      for (let s = 0; s < segments; s++) {
        indices.push(A[0], B[(s + 1) % segments], B[s]);
      }
    } else if (B.length === 1) {
      for (let s = 0; s < segments; s++) {
        indices.push(A[s], A[(s + 1) % segments], B[0]);
      }
    } else {
      for (let s = 0; s < segments; s++) {
        const s1 = (s + 1) % segments;
        indices.push(A[s], A[s1], B[s]);
        indices.push(A[s1], B[s1], B[s]);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}
