import * as THREE from 'three'
import { WGS84, B, geodeticToECEF, deg2rad } from '../lib/geo'

/** 场景单位：1 unit = 1 km */
export const K = 1 / 1000
export const R_A = WGS84.a * K
export const R_B = B * K

const v = (x: number, y: number, z: number) => new THREE.Vector3(x * K, y * K, z * K)

/** 经纬度 + 高度(km) → 场景坐标 */
export function llToScene(lonDeg: number, latDeg: number, altKm = 0): THREE.Vector3 {
  const p = geodeticToECEF(lonDeg, latDeg, altKm * 1000)
  return v(p.x, p.y, p.z)
}

/* ---------------- 地球本体（程序化着色，无需贴图） ---------------- */

const earthVertex = /* glsl */ `
varying vec3 vDir;
varying vec3 vNormalW;
void main() {
  vDir = normalize(position);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const earthFragment = /* glsl */ `
precision highp float;
varying vec3 vDir;
varying vec3 vNormalW;
uniform vec3 uSunDir;

float hash3(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x),
        mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x),
        mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { s += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return s;
}

void main() {
  vec3 d = normalize(vDir);
  float continents = fbm(d * 2.6 + vec3(7.3, 1.7, 4.2));
  float detail = fbm(d * 7.5);
  float lat = abs(d.z);

  vec3 oceanDeep = vec3(0.015, 0.07, 0.22);
  vec3 oceanShal = vec3(0.05, 0.28, 0.45);
  vec3 landLow = vec3(0.12, 0.34, 0.14);
  vec3 landHigh = vec3(0.45, 0.36, 0.22);
  vec3 ice = vec3(0.82, 0.88, 0.94);

  float landMask = smoothstep(0.48, 0.54, continents);
  vec3 ocean = mix(oceanDeep, oceanShal, smoothstep(0.30, 0.50, continents));
  vec3 land = mix(landLow, landHigh, clamp(detail * 1.3 - 0.25, 0.0, 1.0));
  vec3 color = mix(ocean, land, landMask);

  float iceCap = smoothstep(0.82, 0.94, lat + detail * 0.05);
  color = mix(color, ice, iceCap);

  float light = clamp(dot(normalize(vNormalW), normalize(uSunDir)), 0.0, 1.0);
  float day = 0.12 + 0.88 * pow(light, 0.8);
  color *= day;
  // 晨昏线暖色过渡
  color += vec3(0.18, 0.08, 0.02) * smoothstep(0.0, 0.25, light) * (1.0 - smoothstep(0.25, 0.5, light));
  gl_FragColor = vec4(color, 1.0);
}
`

export function createEarth(sunDir: THREE.Vector3): THREE.Mesh {
  const geo = new THREE.SphereGeometry(R_A, 128, 96)
  geo.scale(1, 1, R_B / R_A)
  const mat = new THREE.ShaderMaterial({
    vertexShader: earthVertex,
    fragmentShader: earthFragment,
    uniforms: { uSunDir: { value: sunDir.clone().normalize() } },
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.name = 'earth'
  return mesh
}

/* ---------------- 经纬网格 ---------------- */

function ellipsoidPoint(lonDeg: number, latDeg: number): THREE.Vector3 {
  return llToScene(lonDeg, latDeg, 0)
}

export function createGraticule(): THREE.Group {
  const group = new THREE.Group()
  group.name = 'graticule'
  const major: number[][] = []
  const minor: number[][] = []

  const push = (arr: number[][], p: THREE.Vector3) => arr.push([p.x, p.y, p.z])

  // 经线，每 15°
  for (let lon = -180; lon < 180; lon += 15) {
    const arr = lon % 90 === 0 ? major : minor
    const seg = 96
    for (let i = 0; i < seg; i++) {
      const lat1 = -90 + (180 / seg) * i
      const lat2 = -90 + (180 / seg) * (i + 1)
      push(arr, ellipsoidPoint(lon, lat1))
      push(arr, ellipsoidPoint(lon, lat2))
    }
  }
  // 纬线，每 15°
  for (let lat = -75; lat <= 75; lat += 15) {
    const arr = lat === 0 ? major : minor
    const seg = 128
    for (let i = 0; i < seg; i++) {
      const lon1 = -180 + (360 / seg) * i
      const lon2 = -180 + (360 / seg) * (i + 1)
      push(arr, ellipsoidPoint(lon1, lat))
      push(arr, ellipsoidPoint(lon2, lat))
    }
  }

  const makeLines = (positions: number[][], color: number, opacity: number) => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions.flat(), 3))
    const mat = new THREE.LineBasicMaterial({
      color, transparent: true, opacity, depthWrite: false,
    })
    return new THREE.LineSegments(geo, mat)
  }
  group.add(makeLines(minor, 0x5fa8d3, 0.18))
  group.add(makeLines(major, 0x9ad1ff, 0.38))
  return group
}

/* ---------------- 大气层（卡门线 100km 分层球壳） ---------------- */

function shellMesh(altKm: number, material: THREE.Material): THREE.Mesh {
  const rA = R_A + altKm
  const rB = R_B + altKm
  const geo = new THREE.SphereGeometry(rA, 64, 48)
  geo.scale(1, 1, rB / rA)
  return new THREE.Mesh(geo, material)
}

const glowVertex = /* glsl */ `
varying vec3 vN;
varying vec3 vView;
void main() {
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`
const glowFragment = /* glsl */ `
precision highp float;
varying vec3 vN;
varying vec3 vView;
uniform vec3 uColor;
uniform float uIntensity;
void main() {
  float rim = pow(1.0 - abs(dot(vN, vView)), 2.5);
  gl_FragColor = vec4(uColor, rim * uIntensity);
}
`

export interface AtmosphereLayers {
  group: THREE.Group
  karmanLabelAnchor: THREE.Object3D
}

export function createAtmosphere(): AtmosphereLayers {
  const group = new THREE.Group()
  group.name = 'atmosphere'

  // 内层：0–100km 稠密大气，两层半透明壳（30km / 70km）
  for (const [alt, opacity] of [[30, 0.05], [70, 0.045]] as const) {
    const mat = new THREE.MeshBasicMaterial({
      color: 0x4aa3ff, transparent: true, opacity,
      side: THREE.FrontSide, depthWrite: false, blending: THREE.AdditiveBlending,
    })
    group.add(shellMesh(alt, mat))
  }

  // 卡门线球壳（100km），BackSide 形成可见边界
  const karmanMat = new THREE.MeshBasicMaterial({
    color: 0x7cc4ff, transparent: true, opacity: 0.16,
    side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending,
  })
  const karman = shellMesh(100, karmanMat)
  karman.name = 'karman-shell'
  group.add(karman)

  // 卡门线线框圈（经纬线式细网格，强化分层边界）
  const karmanWire = shellMesh(100, new THREE.MeshBasicMaterial({
    color: 0x9fd8ff, wireframe: true, transparent: true, opacity: 0.06, depthWrite: false,
  }))
  group.add(karmanWire)

  // 外层辉光（160km）
  const glowMat = new THREE.ShaderMaterial({
    vertexShader: glowVertex,
    fragmentShader: glowFragment,
    uniforms: { uColor: { value: new THREE.Color(0x3d8bff) }, uIntensity: { value: 0.9 } },
    side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  })
  group.add(shellMesh(160, glowMat))

  // 卡门线标注锚点（放在发射方位一侧的赤道上空）
  const anchor = new THREE.Object3D()
  anchor.position.copy(llToScene(110, 0, 102))
  group.add(anchor)

  return { group, karmanLabelAnchor: anchor }
}

/* ---------------- 星空 ---------------- */

export function createStars(count = 2500): THREE.Points {
  const positions = new Float32Array(count * 3)
  const radius = R_A * 12
  for (let i = 0; i < count; i++) {
    const u = Math.random()
    const vv = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * vv - 1)
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({
    color: 0xffffff, size: 90, sizeAttenuation: true, transparent: true, opacity: 0.85, depthWrite: false,
  })
  return new THREE.Points(geo, mat)
}

/* ---------------- 太阳光照 ---------------- */

export function createLights(sunDir: THREE.Vector3) {
  const group = new THREE.Group()
  group.add(new THREE.AmbientLight(0x334466, 1.4))
  const sun = new THREE.DirectionalLight(0xfff4e0, 2.2)
  sun.position.copy(sunDir.clone().normalize().multiplyScalar(R_A * 5))
  group.add(sun)
  return group
}

export { deg2rad }
