import * as THREE from 'three';

/**
 * 色温（开尔文）转 RGB，Tanner Helland 近似算法。
 * 返回 0..1 的线性分量，可直接作为 THREE.Color。
 */
export function kelvinToColor(kelvin: number): THREE.Color {
  const k = Math.min(40000, Math.max(1000, kelvin)) / 100;
  let r: number, g: number, b: number;

  if (k <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(k) - 161.1195681661;
    b = k <= 19 ? 0 : 138.5177312231 * Math.log(k - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(k - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(k - 60, -0.0755148492);
    b = 255;
  }
  const c = (v: number) => Math.min(255, Math.max(0, v)) / 255;
  return new THREE.Color(c(r), c(g), c(b));
}
