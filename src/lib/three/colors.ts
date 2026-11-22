// 缆绳颜色映射：低张力(绿) -> 中(黄) -> 高(橙) -> 临界(红)
import * as THREE from 'three';

const STOPS: [number, THREE.Color][] = [
  [0, new THREE.Color(0x35e07a)],
  [0.45, new THREE.Color(0xffd23f)],
  [0.75, new THREE.Color(0xff8c1a)],
  [1, new THREE.Color(0xff2d2d)]
];

export function tensionColor(util: number): THREE.Color {
  const u = Math.max(0, Math.min(1, util));
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [a, ca] = STOPS[i];
    const [b, cb] = STOPS[i + 1];
    if (u <= b) return ca.clone().lerp(cb, (u - a) / (b - a));
  }
  return STOPS[STOPS.length - 1][1].clone();
}

export function tensionColorHex(util: number): string {
  return '#' + tensionColor(util).getHexString();
}
