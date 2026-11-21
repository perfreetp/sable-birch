import * as THREE from 'three'
import {
  BlendFunction,
  BloomEffect,
  Effect,
  EffectAttribute,
  EffectComposer,
  EffectPass,
  KernelSize,
  RenderPass,
  SMAAEffect,
  ToneMappingEffect,
  ToneMappingMode,
} from 'postprocessing'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DOMAIN, GRID } from '../weather.ts'
import type { BasemapId, Section, Waypoint } from '../types.ts'
import { DENSITY_SCALE, paletteGLSL, volumeCommon } from '../shaders.ts'
import { TerrainMesh } from './terrain.ts'

export interface SceneOptions {
  basemap: BasemapId
  threshold: number
  tier: number
  opacity: number
  showVolume: boolean
  showCloudBase: boolean
  showRoute: boolean
  showSection: boolean
  highlightRoute: boolean
  fogStrength: number
}

/**
 * Screen-space ray-marched cloud body. Runs as a post effect so it composites
 * against the rasterised scene depth and can sample sun visibility through the
 * same 3D texture.
 */
class VolumetricCloudsEffect extends Effect {
  private camera: THREE.PerspectiveCamera | null = null

  constructor() {
    super(
      'VolumetricCloudsEffect',
      /* glsl */ `
      uniform sampler3D uVolume;
      uniform sampler3D uNoiseTex;
      uniform sampler2D uCloudBase;
      uniform vec3 uCamPos;
      uniform vec3 uCamRight;
      uniform vec3 uCamUp;
      uniform vec3 uCamFwd;
      uniform vec2 uTanHalf;
      uniform float uAspect;
      uniform vec3 uBoxMin;
      uniform vec3 uBoxMax;
      uniform vec3 uSunDir;
      uniform float uThreshold;
      uniform float uOpacity;
      uniform float uTier;
      uniform float uDensityScale;
      uniform float uSteps;
      uniform float uTime;
      uniform float uHaze;
      uniform float uShowVolume;

      ${volumeCommon}
      ${paletteGLSL}

      vec2 boxHit(vec3 ro, vec3 rd, vec3 bmin, vec3 bmax){
        vec3 inv = 1.0 / rd;
        vec3 t0 = (bmin - ro) * inv;
        vec3 t1 = (bmax - ro) * inv;
        vec3 tmin = min(t0, t1);
        vec3 tmax = max(t0, t1);
        return vec2(max(max(tmin.x, tmin.y), tmin.z), min(min(tmax.x, tmax.y), tmax.z));
      }

      float rawDensity(vec3 p){
        vec3 uvw = (p - uBoxMin) / (uBoxMax - uBoxMin);
        if (any(lessThan(uvw, vec3(0.0))) || any(greaterThan(uvw, vec3(1.0)))) return 0.0;
        return texture(uVolume, uvw).r;
      }

      // Tiling detail noise: precomputed 3D fBm, sampled instead of hashed.
      float detailNoise(vec3 p){
        return texture(uNoiseTex, p).r;
      }

      float cloudBase(vec3 p){
        vec2 uvc = (p.xz - uBoxMin.xz) / (uBoxMax.xz - uBoxMin.xz);
        return texture(uCloudBase, uvc).r;
      }

      // The baked field already ramps in above each cell's condensation level, so
      // shaping here must not consult the (piecewise) cloud-base texture: doing so
      // produces hard vertical walls wherever a column has no analysable base.
      float shapedDensityFrom(float raw, vec3 p){
        float den = raw - uThreshold;
        if (den <= 0.0) return 0.0;
        vec3 size = uBoxMax - uBoxMin;
        float gy = (p.y - uBoxMin.y) / size.y;
        // Soft boundary: fade the cloud out toward the analysis-domain edges so
        // the sampling box never shows as a rectangle.
        vec2 edge = min((p.xz - uBoxMin.xz) / size.xz, (uBoxMax.xz - p.xz) / size.xz);
        float edgeFade = smoothstep(0.0, 0.055, min(edge.x, edge.y));
        if (edgeFade <= 0.001) return 0.0;

        vec3 q = p + vec3(uTime * 11.0, -uTime * 6.0, uTime * 7.0);
        float n1 = detailNoise(q * 0.00042);
        float n2 = detailNoise(q * 0.00115 + vec3(0.31, 0.13, 0.57));
        float n3 = detailNoise(q * 0.0027 + vec3(0.7, 0.42, 0.21));
        float n4 = detailNoise(q * 0.0083 - vec3(0.21, 0.66, 0.48));
        float n = n1 * 0.48 + n2 * 0.28 + n3 * 0.16 + n4 * 0.08;

        float cov = den * 1.62 + (n - 0.5) * 1.12 - 0.04;
        cov = smoothstep(0.015, 0.26, cov) * edgeFade;
        if (cov <= 0.002) return 0.0;

        float core = smoothstep(0.05, 0.62, den) * 0.65 + 0.35;
        float inner = mix(0.3, 1.2, core) * (0.70 + 0.48 * n1);
        float vertical = 0.5 + 0.85 * pow(1.0 - clamp((gy - 0.30) / 0.62, 0.0, 1.0), 0.9);
        inner *= vertical;
        inner *= smoothstep(0.0, 0.025, gy) * smoothstep(1.0, 0.945, gy);
        return max(0.0, cov * inner);
      }

      // Optical depth toward the sun plus a wider cone for multiple scattering.
      vec2 lightMarch(vec3 p){
        float od = 0.0;
        float od2 = 0.0;
        vec3 q = p;
        for (int i = 0; i < 3; i++) {
          q += uSunDir * 240.0;
          float d = max(0.0, rawDensity(q) - uThreshold * 0.55);
          od += d;
          od2 += d * (1.0 - float(i) / 3.0);
        }
        return vec2(od, od2);
      }

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
        float depth = readDepth(uv);
        float viewZ = perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
        float sceneDist = -viewZ;
        // Distance haze (the "volumetric fog strength" control) on the raster scene.
        float haze = 1.0 - exp(-sceneDist * 0.000025 * uHaze);
        vec3 hazeCol = mix(vec3(0.048, 0.078, 0.105), vec3(0.085, 0.125, 0.160), clamp(uv.y * 1.15, 0.0, 1.0));
        vec4 baseColor = vec4(mix(inputColor.rgb, hazeCol, clamp(haze, 0.0, 0.82)), inputColor.a);

        vec2 ndc = uv * 2.0 - 1.0;
        vec3 rd = normalize(uCamFwd + uCamRight * ndc.x * uTanHalf.x * uAspect + uCamUp * ndc.y * uTanHalf.y);
        vec3 ro = uCamPos;
        vec2 hit = boxHit(ro, rd, uBoxMin, uBoxMax);
        float tStart = max(hit.x, 0.0);
        float tEnd = hit.y;
        if (tEnd <= tStart || uShowVolume < 0.5) { outputColor = baseColor; return; }
        tEnd = min(tEnd, sceneDist - 8.0);
        if (tEnd <= tStart) { outputColor = baseColor; return; }

        float span = tEnd - tStart;
        int steps = int(clamp(uSteps, 24.0, 220.0));
        float dt = span / float(steps);
        // Per-pixel stratified offset kills the banding a fixed step would show.
        float jitter = fract(ign(gl_FragCoord.xy) + uTime * 0.6180339) * dt;
        vec3 size = uBoxMax - uBoxMin;

        vec3 acc = vec3(0.0);
        float trans = 1.0;
        float t = tStart + jitter;
        vec3 sunCol = vec3(1.02, 0.94, 0.82);
        vec3 skyCol = vec3(0.26, 0.40, 0.58);

        for (int i = 0; i < 220; i++) {
          if (i >= steps || trans < 0.012) break;
          vec3 p = ro + rd * t;
          float raw = rawDensity(p);

          float den = shapedDensityFrom(raw, p);
          if (den > 0.0015) {
            vec2 od = lightMarch(p);
            float sunVis = exp(-od.x * 2.4) * 0.72 + exp(-od.y * 0.55) * 0.28;
            float powder = 1.0 - exp(-den * 5.0);
            float t01 = clamp((den - uThreshold * 0.15) / max(0.02, 0.62 - uThreshold * 0.35), 0.0, 1.0);
            t01 = pow(t01, 0.55);
            vec3 albedo = paletteFor(t01, uTier);
            float heightLift = 0.46 + 0.85 * pow(clamp((p.y - uBoxMin.y) / size.y, 0.0, 1.0), 0.8);
            vec3 lum = vec3(dot(albedo, vec3(0.299, 0.587, 0.114)));
            albedo = mix(lum, albedo, 0.72);
            float ambientOccl = 0.42 + 0.58 * smoothstep(0.0, 0.55, 1.0 - den);
            vec3 lit = albedo * (skyCol * 0.72 * heightLift * ambientOccl + sunCol * sunVis * (0.42 + 0.72 * powder));
            float sigma = den * uDensityScale;
            float a = 1.0 - exp(-sigma * dt);
            acc += lit * a * trans;
            trans *= 1.0 - a;
          }
          t += dt;
        }

        float alpha = (1.0 - trans) * uOpacity;
        if (alpha < 0.003) { outputColor = baseColor; return; }
        vec3 cloudCol = acc / max(1e-4, 1.0 - trans);
        outputColor = vec4(mix(baseColor.rgb, cloudCol, clamp(alpha, 0.0, 0.96)), baseColor.a);
      }
      `,
      {
        blendFunction: BlendFunction.SRC,
        attributes: EffectAttribute.DEPTH,
        uniforms: new Map<string, THREE.Uniform>([
          ['uVolume', new THREE.Uniform(null)],
          ['uNoiseTex', new THREE.Uniform(null)],
          ['uCloudBase', new THREE.Uniform(null)],
          ['uCamPos', new THREE.Uniform(new THREE.Vector3())],
          ['uCamRight', new THREE.Uniform(new THREE.Vector3(1, 0, 0))],
          ['uCamUp', new THREE.Uniform(new THREE.Vector3(0, 1, 0))],
          ['uCamFwd', new THREE.Uniform(new THREE.Vector3(0, 0, -1))],
          ['uTanHalf', new THREE.Uniform(new THREE.Vector2(0.5, 0.5))],
          ['uAspect', new THREE.Uniform(1)],
          ['uBoxMin', new THREE.Uniform(new THREE.Vector3(-DOMAIN.halfX, 0, -DOMAIN.halfZ))],
          ['uBoxMax', new THREE.Uniform(new THREE.Vector3(DOMAIN.halfX, DOMAIN.top, DOMAIN.halfZ))],
          ['uSunDir', new THREE.Uniform(new THREE.Vector3(-0.5, 0.62, 0.6).normalize())],
          ['uThreshold', new THREE.Uniform(0.26)],
          ['uOpacity', new THREE.Uniform(0.72)],
          ['uTier', new THREE.Uniform(1)],
          ['uDensityScale', new THREE.Uniform(DENSITY_SCALE)],
          ['uSteps', new THREE.Uniform(128)],
          ['uTime', new THREE.Uniform(0)],
          ['uHaze', new THREE.Uniform(0.55)],
          ['uShowVolume', new THREE.Uniform(1)],
        ]),
      },
    )
  }

  setCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera
  }

  setVolumeTexture(tex: THREE.Texture | null): void {
    this.uniforms.get('uVolume')!.value = tex
  }

  setCloudBaseTexture(tex: THREE.Texture | null): void {
    this.uniforms.get('uCloudBase')!.value = tex
  }

  update(_renderer: THREE.WebGLRenderer, _inputBuffer: THREE.WebGLRenderTarget, deltaTime?: number): void {
    const cam = this.camera
    if (!cam) return
    const u = this.uniforms
    cam.updateMatrixWorld()
    u.get('uCamPos')!.value.copy(cam.position)
    const m = cam.matrixWorld.elements
    u.get('uCamRight')!.value.set(m[0], m[1], m[2]).normalize()
    u.get('uCamUp')!.value.set(m[4], m[5], m[6]).normalize()
    u.get('uCamFwd')!.value.set(-m[8], -m[9], -m[10]).normalize()
    const tanY = Math.tan(THREE.MathUtils.degToRad(cam.fov * 0.5))
    u.get('uTanHalf')!.value.set(tanY * cam.aspect, tanY)
    u.get('uAspect')!.value = cam.aspect
    u.get('uTime')!.value = (u.get('uTime')!.value as number) + (deltaTime ?? 0)
  }
}

/** Filmic grade / colour mapping: tint, saturation, vignette and grain. */
class GradeEffect extends Effect {
  constructor() {
    super(
      'GradeEffect',
      /* glsl */ `
      uniform float uTimeG;
      uniform float uVignette;
      uniform float uGrain;
      uniform float uSaturation;
      uniform vec3 uLift;
      uniform vec3 uGain;
      float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
        vec3 c = inputColor.rgb;
        float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
        c = mix(vec3(lum), c, uSaturation);
        c = c * uGain + uLift * (1.0 - c);
        float vig = smoothstep(0.98, 0.32, length((uv - 0.5) * vec2(1.04, 1.0)));
        c *= mix(1.0, vig, uVignette);
        c += (h21(uv * 1024.0 + uTimeG) - 0.5) * uGrain;
        outputColor = vec4(max(c, vec3(0.0)), inputColor.a);
      }
      `,
      {
        blendFunction: BlendFunction.SRC,
        uniforms: new Map<string, THREE.Uniform>([
          ['uTimeG', new THREE.Uniform(0)],
          ['uVignette', new THREE.Uniform(0.45)],
          ['uGrain', new THREE.Uniform(0.008)],
          ['uSaturation', new THREE.Uniform(1.04)],
          ['uLift', new THREE.Uniform(new THREE.Vector3(0.006, 0.013, 0.024))],
          ['uGain', new THREE.Uniform(new THREE.Vector3(0.98, 1.0, 1.04))],
        ]),
      },
    )
  }

  tick(dt: number): void {
    this.uniforms.get('uTimeG')!.value = ((this.uniforms.get('uTimeG')!.value as number) + dt * 9) % 1000
  }
}

/**
 * Tileable 3D fBm used by the cloud shader for detail erosion. Storing the
 * noise in a texture lets the raymarcher do one filtered lookup per octave
 * instead of eight hashes, which is the difference between 12 and 60 fps.
 */
function makeNoiseTexture(size = 64): THREE.Data3DTexture {
  const data = new Uint8Array(size * size * size * 4)
  const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const hashed = (a: number, b: number, c: number, seed: number) => {
    let h = Math.imul(a + 1, 374761393) ^ Math.imul(b + 1, 668265263) ^ Math.imul(c + 1, 2147483647)
    h = Math.imul(h ^ (h >>> 13), 1274126177) ^ Math.imul(seed, 1442695041)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
  const sample = (x: number, y: number, z: number, freq: number, seed: number): number => {
    // Wrapped lattice value noise over a periodic grid.
    const n = freq
    const fx = (x / size) * n
    const fy = (y / size) * n
    const fz = (z / size) * n
    const x0 = Math.floor(fx)
    const y0 = Math.floor(fy)
    const z0 = Math.floor(fz)
    const tx = smoother(fx - x0)
    const ty = smoother(fy - y0)
    const tz = smoother(fz - z0)
    const w = (a: number, b: number, c: number): number => hashed(a % n, b % n, c % n, seed)
    const x1 = (x0 + 1) % n
    const y1 = (y0 + 1) % n
    const z1 = (z0 + 1) % n
    const a00 = w(x0, y0, z0) + (w(x1, y0, z0) - w(x0, y0, z0)) * tx
    const a10 = w(x0, y1, z0) + (w(x1, y1, z0) - w(x0, y1, z0)) * tx
    const a01 = w(x0, y0, z1) + (w(x1, y0, z1) - w(x0, y0, z1)) * tx
    const a11 = w(x0, y1, z1) + (w(x1, y1, z1) - w(x0, y1, z1)) * tx
    const b0 = a00 + (a10 - a00) * ty
    const b1 = a01 + (a11 - a01) * ty
    return b0 + (b1 - b0) * tz
  }
  for (let z = 0; z < size; z++) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const f =
          sample(x, y, z, 4, 11) * 0.5 +
          sample(x, y, z, 8, 29) * 0.28 +
          sample(x, y, z, 16, 47) * 0.15 +
          sample(x, y, z, 32, 71) * 0.07
        const o = ((z * size + y) * size + x) * 4
        const v = Math.round(Math.min(1, Math.max(0, f)) * 255)
        data[o] = v
        data[o + 1] = v
        data[o + 2] = v
        data[o + 3] = 255
      }
    }
  }
  const tex = new THREE.Data3DTexture(data, size, size, size)
  tex.format = THREE.RGBAFormat
  tex.type = THREE.UnsignedByteType
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.wrapR = THREE.RepeatWrapping
  tex.unpackAlignment = 1
  tex.needsUpdate = true
  return tex
}

/** Height- and azimuth-aware sky dome with a low sun band. */
function makeSkyDome(): THREE.Mesh {
  const geo = new THREE.SphereGeometry(38000, 48, 32)
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
    fog: false,
    toneMapped: false,
    uniforms: {
      uSunDir: { value: new THREE.Vector3(-0.5, 0.22, 0.6).normalize() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main(){
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uSunDir;
      varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        float h = clamp(d.y, -1.0, 1.0);
        vec3 zenith = vec3(0.010, 0.024, 0.045);
        vec3 mid = vec3(0.032, 0.078, 0.120);
        vec3 haze = vec3(0.10, 0.19, 0.25);
        vec3 ground = vec3(0.014, 0.022, 0.030);
        vec3 c;
        if (h > 0.16) {
          c = mix(mid, zenith, smoothstep(0.16, 0.95, h));
        } else if (h > 0.0) {
          c = mix(haze, mid, smoothstep(0.0, 0.16, h));
        } else {
          c = mix(haze * 0.75, ground, smoothstep(0.0, -0.22, h));
        }
        float sunAmt = pow(max(dot(d, uSunDir), 0.0), 22.0);
        float glow = pow(max(dot(d, uSunDir), 0.0), 3.2) * smoothstep(0.5, 0.05, h);
        c += vec3(1.0, 0.86, 0.62) * (sunAmt * 1.5 + glow * 0.10);
        // Subtle high-altitude cirrus veiling.
        float veil = sin(d.x * 7.0 + d.z * 4.0) * 0.5 + 0.5;
        c += vec3(0.014, 0.020, 0.028) * veil * smoothstep(0.35, 0.9, h);
        gl_FragColor = vec4(c, 1.0);
      }
    `,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.renderOrder = -10
  mesh.frustumCulled = false
  return mesh
}

export class WeatherScene {
  readonly renderer: THREE.WebGLRenderer
  readonly scene = new THREE.Scene()
  readonly camera: THREE.PerspectiveCamera
  readonly controls: OrbitControls
  readonly composer: EffectComposer
  readonly terrain: TerrainMesh
  readonly clouds: VolumetricCloudsEffect
  private grade: GradeEffect
  private cloudPass: EffectPass
  private curtainPass!: RenderPass
  private bloom: BloomEffect
  private cloudBaseTex: THREE.DataTexture
  private noiseTex: THREE.Data3DTexture
  private deck: CloudBaseSurface
  private cloudBaseValues: Float32Array | null = null
  private densityProbe: ((x: number, y: number, z: number) => number) | null = null
  private cloudBaseData = new Float32Array(GRID.nx * GRID.nz)
  private routeGroup = new THREE.Group()
  private sectionCurtain: THREE.Mesh | null = null
  private curtainScene = new THREE.Scene()
  private sectionTexture: THREE.CanvasTexture | null = null
  private lastTime = 0
  private disposed = false
  private resizeObserver: ResizeObserver
  private container: HTMLElement
  private opts: SceneOptions
  private raf = 0
  private waypoints: Waypoint[] = []
  private getSection: (() => Section | null) | null = null
  private onPick: ((wp: Waypoint | null, x: number, z: number) => void) | null = null
  private raycaster = new THREE.Raycaster()
  private hoverRing: THREE.Mesh
  private selectionRing: THREE.Mesh
  private sky: THREE.Mesh
  private routeHighlight = true
  private frameCount = 0
  private fpsAccum = 0
  onStats: ((fps: number) => void) | null = null

  constructor(container: HTMLElement, terrain: TerrainMesh, opts: SceneOptions) {
    this.container = container
    this.terrain = terrain
    this.opts = { ...opts }
    this.routeHighlight = opts.highlightRoute

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    this.renderer.setClearColor(0x050a11, 1)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.NoToneMapping
    container.appendChild(this.renderer.domElement)
    this.renderer.domElement.style.display = 'block'
    this.renderer.domElement.style.width = '100%'
    this.renderer.domElement.style.height = '100%'

    this.camera = new THREE.PerspectiveCamera(46, 1, 20, 60000)
    this.camera.position.set(-11800, 5400, 12600)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 2400, 0)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.maxPolarAngle = Math.PI * 0.495
    this.controls.minDistance = 700
    this.controls.maxDistance = 30000
    this.controls.zoomSpeed = 0.9
    this.controls.update()

    this.scene.fog = new THREE.FogExp2(0x0d1a24, 0.000019)

    this.setupLights()
    this.scene.add(terrain.group)

    this.sky = makeSkyDome()
    this.scene.add(this.sky)

    this.cloudBaseTex = new THREE.DataTexture(
      this.cloudBaseData,
      GRID.nx,
      GRID.nz,
      THREE.RedFormat,
      THREE.FloatType,
    )
    this.cloudBaseTex.minFilter = THREE.LinearFilter
    this.cloudBaseTex.magFilter = THREE.LinearFilter
    this.cloudBaseTex.wrapS = THREE.ClampToEdgeWrapping
    this.cloudBaseTex.wrapT = THREE.ClampToEdgeWrapping
    this.cloudBaseTex.needsUpdate = true

    this.scene.add(this.routeGroup)

    this.deck = new CloudBaseSurface(120)
    this.scene.add(this.deck.mesh)

    const hoverGeo = new THREE.RingGeometry(46, 62, 32)
    hoverGeo.rotateX(-Math.PI / 2)
    this.hoverRing = new THREE.Mesh(
      hoverGeo,
      new THREE.MeshBasicMaterial({
        color: 0x9ef2ff,
        transparent: true,
        opacity: 0.8,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      }),
    )
    this.hoverRing.visible = false
    this.hoverRing.renderOrder = 20
    this.scene.add(this.hoverRing)

    const selGeo = new THREE.RingGeometry(64, 86, 40)
    selGeo.rotateX(-Math.PI / 2)
    this.selectionRing = new THREE.Mesh(
      selGeo,
      new THREE.MeshBasicMaterial({
        color: 0xffd27a,
        transparent: true,
        opacity: 0.95,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      }),
    )
    this.selectionRing.visible = false
    this.selectionRing.renderOrder = 21
    this.scene.add(this.selectionRing)

    this.composer = new EffectComposer(this.renderer, {
      frameBufferType: THREE.HalfFloatType,
      multisampling: 0,
    })
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.clouds = new VolumetricCloudsEffect()
    this.clouds.setCamera(this.camera)
    this.clouds.setCloudBaseTexture(this.cloudBaseTex)
    this.noiseTex = makeNoiseTexture(64)
    this.clouds.uniforms.get('uNoiseTex')!.value = this.noiseTex
    this.grade = new GradeEffect()
    this.bloom = new BloomEffect({
      intensity: 0.55,
      luminanceThreshold: 0.8,
      luminanceSmoothing: 0.3,
      mipmapBlur: true,
      radius: 0.7,
      kernelSize: KernelSize.MEDIUM,
    })
    this.cloudPass = new EffectPass(this.camera, this.clouds, this.grade, this.bloom)
    this.composer.addPass(this.cloudPass)

    // Curtain overlay: drawn on top of the cloud volume with real alpha blending.
    const curtainPass = new RenderPass(this.curtainScene, this.camera)
    curtainPass.clear = false
    this.curtainPass = curtainPass
    this.composer.addPass(curtainPass)

    const smaa = new SMAAEffect()
    const tone = new ToneMappingEffect({ mode: ToneMappingMode.AGX })
    this.composer.addPass(new EffectPass(this.camera, smaa, tone))

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(container)
    this.resize()

    this.renderer.domElement.addEventListener('pointermove', this.handlePointerMove)
    this.renderer.domElement.addEventListener('pointerleave', this.handlePointerLeave)
    this.renderer.domElement.addEventListener('dblclick', this.handleDoubleClick)

    this.applyOptions(this.opts)
    this.loop()
  }

  private setupLights(): void {
    this.scene.add(new THREE.HemisphereLight(0x8fb8db, 0x131d26, 0.85))
    const key = new THREE.DirectionalLight(0xffeedd, 1.15)
    key.position.set(-6200, 9000, 4200)
    this.scene.add(key)
    const rim = new THREE.DirectionalLight(0x6fb0e0, 0.7)
    rim.position.set(7000, 2400, -6000)
    this.scene.add(rim)
    this.scene.add(new THREE.AmbientLight(0x1c2b38, 0.4))
  }

  setSectionProvider(fn: () => Section | null): void {
    this.getSection = fn
  }

  setPickHandler(fn: (wp: Waypoint | null, x: number, z: number) => void): void {
    this.onPick = fn
  }

  setVolumeTexture(tex: THREE.Data3DTexture | null): void {
    this.clouds.setVolumeTexture(tex)
  }

  setCloudBase(base: Float32Array | null, probe?: (x: number, y: number, z: number) => number): void {
    const dst = this.cloudBaseData
    if (!base) dst.fill(0)
    else {
      for (let i = 0; i < dst.length; i++) {
        const v = base[i]
        dst[i] = Number.isNaN(v) ? 0 : v
      }
    }
    this.cloudBaseTex.needsUpdate = true
    this.cloudBaseValues = base ? dst : null
    if (probe) this.densityProbe = probe
    this.refreshDeck()
  }

  private refreshDeck(): void {
    const probe = this.densityProbe
    this.deck.update(this.cloudBaseValues, probe ?? (() => 0.5))
    this.deck.setVisible(this.opts.showCloudBase)
  }

  setWaypoints(wps: Waypoint[]): void {
    this.waypoints = wps
    this.rebuildRoute()
  }

  setSelected(id: string | null): void {
    const wp = this.waypoints.find((w) => w.id === id)
    if (!wp) {
      this.selectionRing.visible = false
      return
    }
    this.selectionRing.position.set(wp.x, this.terrain.heightAt(wp.x, wp.z) + 6, wp.z)
    this.selectionRing.visible = true
  }

  applyOptions(next: Partial<SceneOptions>): void {
    Object.assign(this.opts, next)
    const o = this.opts
    const u = this.clouds.uniforms
    u.get('uThreshold')!.value = o.threshold
    u.get('uOpacity')!.value = o.opacity
    u.get('uTier')!.value = o.tier
    u.get('uHaze')!.value = o.fogStrength
    u.get('uShowVolume')!.value = o.showVolume ? 1 : 0
    // The pass stays enabled so distance haze survives with the volume hidden.
    this.cloudPass.enabled = true
    this.bloom.intensity = 0.34 + 0.34 * o.tier
    if (this.routeGroup) this.routeGroup.visible = o.showRoute
    if (this.sectionCurtain) this.sectionCurtain.visible = o.showSection
    if (this.curtainPass) this.curtainPass.enabled = o.showSection && !!this.sectionCurtain
    this.deck?.setVisible(o.showCloudBase)
    if (this.terrain.current !== o.basemap) this.terrain.applyBasemap(o.basemap)
    if (this.routeHighlight !== o.highlightRoute) {
      this.routeHighlight = o.highlightRoute
      this.rebuildRoute()
    }
  }

  applyBasemap(id: BasemapId): void {
    if (this.terrain.current !== id) this.terrain.applyBasemap(id)
    this.opts.basemap = id
  }

  sectionTextureFromCanvas(canvas: HTMLCanvasElement): THREE.CanvasTexture {
    const tex = new THREE.CanvasTexture(canvas)
    // The chart raster is authored in display space; tell three so it is not
    // linearised on sample, which would wash every hue out.
    tex.colorSpace = THREE.SRGBColorSpace
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    tex.needsUpdate = true
    return tex
  }

  setSectionCurtain(sec: Section | null, texture: THREE.CanvasTexture | null): void {
    if (!sec) {
      if (this.sectionCurtain) this.sectionCurtain.visible = false
      return
    }
    this.ensureCurtain()
    if (!this.sectionCurtain) return
    if (texture) {
      this.sectionTexture?.dispose()
      this.sectionTexture = texture
      const mat = this.sectionCurtain.material as THREE.MeshBasicMaterial
      mat.map = texture
      mat.needsUpdate = true
    }
    this.rebuildCurtainGeometry()
    this.sectionCurtain.visible = this.opts.showSection
    this.curtainPass.enabled = this.opts.showSection
  }

  private ensureCurtain(): void {
    if (this.sectionCurtain) return
    const mat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.82,
      side: THREE.DoubleSide,
      depthWrite: true,
      depthTest: true,
      toneMapped: false,
      fog: false,
    })
    this.sectionCurtain = new THREE.Mesh(new THREE.BufferGeometry(), mat)
    this.sectionCurtain.renderOrder = 9
    this.sectionCurtain.frustumCulled = false
    // The slice lives in its own scene so it can be composited after the cloud
    // pass; otherwise the volumetric effect overwrites it with translucent haze.
    this.curtainScene.add(this.sectionCurtain)
  }

  private rebuildCurtainGeometry(): void {
    const sec = this.getSection?.()
    const mesh = this.sectionCurtain
    if (!sec || !mesh || this.waypoints.length < 2) return
    const cols = 512
    const positions = new Float32Array(cols * 2 * 3)
    const uvs = new Float32Array(cols * 2 * 2)
    const legs = buildLegs(this.waypoints)
    for (let c = 0; c < cols; c++) {
      const s = (c / (cols - 1)) * sec.sMax
      const p = pointAt(this.waypoints, legs, s)
      // The analysis grid carries one row per altitude step; the curtain spans the
      // same altitude range so the chart and the slice agree point for point.
      const col = Math.min(sec.cols - 1, Math.round((c / (cols - 1)) * (sec.cols - 1)))
      const ground = Math.min(sec.terrain[col] ?? 0, 2000)
      const o = c * 6
      positions[o] = p.x
      positions[o + 1] = ground
      positions[o + 2] = p.z
      positions[o + 3] = p.x
      positions[o + 4] = sec.altMax
      positions[o + 5] = p.z
      const u = c / (cols - 1)
      // Curtain texture v runs bottom=ground .. top=altMax, matching the chart.
      uvs[c * 4] = u
      uvs[c * 4 + 1] = ground / sec.altMax
      uvs[c * 4 + 2] = u
      uvs[c * 4 + 3] = 1
    }
    const index: number[] = []
    for (let c = 0; c < cols - 1; c++) {
      const a = c * 2
      const b = a + 1
      const d = a + 2
      const e = a + 3
      index.push(a, b, d, b, e, d)
    }
    const geo = mesh.geometry
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    geo.setIndex(index)
    geo.computeBoundingSphere()
    void mesh
  }

  private rebuildRoute(): void {
    const group = this.routeGroup
    for (const child of [...group.children]) {
      group.remove(child)
      disposeObject(child)
    }
    const wps = this.waypoints
    if (wps.length === 0) {
      group.visible = this.opts.showRoute
      return
    }
    const accent = this.opts.highlightRoute ? 0x86f4ff : 0x4f9fbc
    const accentDim = this.opts.highlightRoute ? 0x5fd8ef : 0x397b93
    for (const w of wps) {
      const ground = this.terrain.heightAt(w.x, w.z)
      const stem = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(w.x, ground, w.z),
        new THREE.Vector3(w.x, w.altMax, w.z),
      ])
      const stemLine = new THREE.Line(
        stem,
        new THREE.LineDashedMaterial({
          color: accentDim,
          dashSize: 90,
          gapSize: 70,
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
          toneMapped: false,
        }),
      )
      stemLine.computeLineDistances()
      group.add(stemLine)
      addMarker(group, w, this.terrain, accent)
    }
    if (wps.length < 2) {
      group.visible = this.opts.showRoute
      return
    }
    const segs = 120
    const legs = buildLegs(wps)
    const top: THREE.Vector3[] = []
    const bot: THREE.Vector3[] = []
    for (let i = 0; i <= segs; i++) {
      const s = (i / segs) * legs[legs.length - 1].s1
      const p = pointAt(wps, legs, s)
      const band = bandAt(wps, legs, s)
      top.push(new THREE.Vector3(p.x, band.hi, p.z))
      bot.push(new THREE.Vector3(p.x, band.lo, p.z))
    }
    for (const rail of [top, bot]) {
      group.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(rail),
          new THREE.LineBasicMaterial({
            color: accent,
            transparent: true,
            opacity: this.opts.highlightRoute ? 0.95 : 0.6,
            depthWrite: false,
            toneMapped: false,
          }),
        ),
      )
    }
    group.add(buildRibbon(top, bot, accent, this.opts.highlightRoute ? 0.22 : 0.1))
    group.visible = this.opts.showRoute
  }

  private resize(): void {
    const rect = this.container.getBoundingClientRect()
    const w = Math.max(1, Math.floor(rect.width))
    const h = Math.max(1, Math.floor(rect.height))
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
    this.composer.setSize(w, h)
  }

  private handlePointerMove = (ev: PointerEvent): void => {
    for (const w of this.waypoints) {
      if (this.distanceToScreen(w, ev) < 26) {
        this.hoverRing.visible = true
        this.hoverRing.position.set(w.x, this.terrain.heightAt(w.x, w.z) + 8, w.z)
        this.renderer.domElement.style.cursor = 'pointer'
        return
      }
    }
    this.hoverRing.visible = false
    this.renderer.domElement.style.cursor = ''
  }

  private distanceToScreen(w: Waypoint, ev: PointerEvent): number {
    const rect = this.renderer.domElement.getBoundingClientRect()
    const p = new THREE.Vector3(w.x, w.altMin, w.z).project(this.camera)
    const sx = rect.left + ((p.x + 1) / 2) * rect.width
    const sy = rect.top + ((1 - p.y) / 2) * rect.height
    return Math.hypot(sx - ev.clientX, sy - ev.clientY)
  }

  private handlePointerLeave = (): void => {
    this.hoverRing.visible = false
    this.renderer.domElement.style.cursor = ''
  }

  private handleDoubleClick = (ev: MouseEvent): void => {
    if (!this.onPick) return
    const rect = this.renderer.domElement.getBoundingClientRect()
    const nx = ((ev.clientX - rect.left) / rect.width) * 2 - 1
    const ny = -((ev.clientY - rect.top) / rect.height) * 2 + 1
    this.raycaster.setFromCamera(new THREE.Vector2(nx, ny), this.camera)
    const hits = this.raycaster.intersectObject(this.terrain.mesh, false)
    if (hits.length === 0) return
    const p = hits[0].point
    let best: Waypoint | null = null
    let bestD = 600
    for (const w of this.waypoints) {
      const d = Math.hypot(w.x - p.x, w.z - p.z)
      if (d < bestD) {
        best = w
        bestD = d
      }
    }
    this.onPick(best, p.x, p.z)
  }

  private loop = (): void => {
    if (this.disposed) return
    this.raf = requestAnimationFrame(this.loop)
    const now = performance.now()
    const dt = Math.min(0.1, (now - this.lastTime) / 1000 || 0.016)
    this.lastTime = now
    this.controls.update()
    this.camera.updateMatrixWorld()
    this.sky.position.copy(this.camera.position)
    this.grade.tick(dt)

    this.frameCount++
    this.fpsAccum += dt
    if (this.fpsAccum >= 0.5) {
      this.onStats?.(this.frameCount / this.fpsAccum)
      this.frameCount = 0
      this.fpsAccum = 0
    }

    this.composer.render(dt)
  }

  snapshot(): string {
    return this.renderer.domElement.toDataURL('image/png')
  }

  resetView(): void {
    this.camera.position.set(-11800, 5400, 12600)
    this.controls.target.set(0, 2400, 0)
    this.controls.update()
  }

  focusRoute(): void {
    const wps = this.waypoints
    if (wps.length === 0) return
    let cx = 0
    let cz = 0
    let y = 0
    for (const w of wps) {
      cx += w.x
      cz += w.z
      y += (w.altMin + w.altMax) / 2
    }
    cx /= wps.length
    cz /= wps.length
    y /= wps.length
    const spread = wps.reduce((m, w) => Math.max(m, Math.hypot(w.x - cx, w.z - cz)), 0)
    const d = Math.max(2200, Math.min(13000, spread * 2.4))
    this.controls.target.set(cx, Math.max(700, y), cz)
    this.camera.position.set(cx - d * 0.55, y + d * 0.42, cz + d * 0.8)
    this.controls.update()
  }

  dispose(): void {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.resizeObserver.disconnect()
    this.renderer.domElement.removeEventListener('pointermove', this.handlePointerMove)
    this.renderer.domElement.removeEventListener('pointerleave', this.handlePointerLeave)
    this.renderer.domElement.removeEventListener('dblclick', this.handleDoubleClick)
    this.controls.dispose()
    this.composer.dispose()
    this.cloudBaseTex.dispose()
    this.noiseTex.dispose()
    this.deck.dispose()
    this.sectionTexture?.dispose()
    this.sectionCurtain?.geometry.dispose()
    ;(this.sectionCurtain?.material as THREE.Material | undefined)?.dispose()
    this.terrain.dispose()
    this.renderer.dispose()
    if (this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement)
    }
  }
}

/**
 * Cloud-base surface: a height field mesh at the analysed condensation level,
 * banded like a contour map and faded where there is no cloud above.
 */
class CloudBaseSurface {
  readonly mesh: THREE.Mesh
  private geometry: THREE.BufferGeometry
  private material: THREE.ShaderMaterial
  private baseData: Float32Array
  private densityData: Float32Array

  constructor(res = 128) {
    this.geometry = new THREE.BufferGeometry()
    const count = (res + 1) * (res + 1)
    const positions = new Float32Array(count * 3)
    const uvs = new Float32Array(count * 2)
    for (let j = 0; j <= res; j++) {
      for (let i = 0; i <= res; i++) {
        const k = j * (res + 1) + i
        positions[k * 3] = -DOMAIN.halfX + (i / res) * DOMAIN.halfX * 2
        positions[k * 3 + 1] = 1200
        positions[k * 3 + 2] = -DOMAIN.halfZ + (j / res) * DOMAIN.halfZ * 2
        uvs[k * 2] = i / res
        uvs[k * 2 + 1] = j / res
      }
    }
    const index: number[] = []
    for (let j = 0; j < res; j++) {
      for (let i = 0; i < res; i++) {
        const a = j * (res + 1) + i
        const b = a + 1
        const c = a + res + 1
        const d = c + 1
        index.push(a, c, b, b, c, d)
      }
    }
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    this.geometry.setIndex(index)

    this.baseData = new Float32Array(count).fill(0)
    this.densityData = new Float32Array(count).fill(0)
    this.geometry.setAttribute('aBase', new THREE.BufferAttribute(this.baseData, 1))
    this.geometry.setAttribute('aDensity', new THREE.BufferAttribute(this.densityData, 1))

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
      fog: false,
      uniforms: {
        uColorLo: { value: new THREE.Color(0x2a5f80) },
        uColorHi: { value: new THREE.Color(0x8fd0f0) },
        uOpacity: { value: 0.44 },
        uSunDir: { value: new THREE.Vector3(-0.5, 0.62, 0.6).normalize() },
      },
      vertexShader: /* glsl */ `
        attribute float aBase;
        attribute float aDensity;
        varying float vBase;
        varying float vDensity;
        varying vec3 vWorld;
        void main(){
          vBase = aBase;
          vDensity = aDensity;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorLo;
        uniform vec3 uColorHi;
        uniform float uOpacity;
        uniform vec3 uSunDir;
        varying float vBase;
        varying float vDensity;
        varying vec3 vWorld;
        void main(){
          if (vBase < 1.0) discard;
          // Fade where the sheet was extrapolated rather than measured; without
          // this the smoothing pass leaks a flat plate across clear air.
          float measured = smoothstep(0.22, 0.55, vDensity);
          // Contour bands every 100 m, bolder every 500 m.
          float band = fract(vBase / 100.0);
          float line = smoothstep(0.0, 0.05, band) * smoothstep(1.0, 0.95, band);
          float major = smoothstep(0.0, 0.035, fract(vBase / 500.0));
          float contour = mix(0.55, 1.0, line * major);
          float edge = measured;
          vec3 tint = mix(uColorLo, uColorHi, clamp(vDensity * 1.9, 0.0, 1.0));
          // Desaturate toward the horizon haze so the sheet sits in the scene.
          tint = mix(tint, vec3(0.20, 0.28, 0.36), 0.35);
          // Small normal tilt from the height gradient for a lit surface feel.
          float glow = 0.78 + 0.30 * clamp(dot(normalize(vec3(0.0, 1.0, 0.0)), uSunDir) + 0.5, 0.0, 1.0);
          float a = uOpacity * edge * (0.62 + 0.38 * contour);
          gl_FragColor = vec4(tint * glow * contour, a);
        }
      `,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.renderOrder = 7
    this.mesh.frustumCulled = false
    this.mesh.visible = false
  }

  /** Rebuild heights/opacities from the cloud-base grid and its density. */
  update(cloudBase: Float32Array | null, sampledDensity: (x: number, y: number, z: number) => number): void {
    const res = Math.round(Math.sqrt(this.baseData.length)) - 1
    const pos = this.geometry.getAttribute('position') as THREE.BufferAttribute
    const { nx, nz } = GRID
    const n = res + 1
    const height = this.baseData
    const validity = new Float32Array(n * n)

    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const k = j * n + i
        const u = i / res
        const v = j / res
        let base = NaN
        if (cloudBase) {
          const gx = u * (nx - 1)
          const gz = v * (nz - 1)
          const x0 = Math.floor(gx)
          const z0 = Math.floor(gz)
          const tx = gx - x0
          const tz = gz - z0
          const gx1 = Math.min(nx - 1, x0 + 1)
          const gz1 = Math.min(nz - 1, z0 + 1)
          let wsum = 0
          let sum = 0
          const cells: Array<[number, number]> = [
            [cloudBase[z0 * nx + x0], (1 - tx) * (1 - tz)],
            [cloudBase[z0 * nx + gx1], tx * (1 - tz)],
            [cloudBase[gz1 * nx + x0], (1 - tx) * tz],
            [cloudBase[gz1 * nx + gx1], tx * tz],
          ]
          for (const [val, w] of cells) {
            if (Number.isNaN(val)) continue
            sum += val * w
            wsum += w
          }
          base = wsum > 0.35 ? sum / wsum : NaN
          validity[k] = wsum
        }
        height[k] = Number.isNaN(base) ? 0 : base
      }
    }

    // Organic fill: carry valid heights outward with a few masked smoothing passes
    // so the sheet never ends in a vertical cliff at the cloud margin.
    const tmp = new Float32Array(height.length)
    for (let pass = 0; pass < 14; pass++) {
      tmp.set(height)
      for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
          const k = j * n + i
          let sum = tmp[k]
          let weight = validity[k] > 0.35 ? 1 : 0.001
          for (let dj = -1; dj <= 1; dj++) {
            for (let di = -1; di <= 1; di++) {
              if (di === 0 && dj === 0) continue
              const ii = i + di
              const jj = j + dj
              if (ii < 0 || jj < 0 || ii >= n || jj >= n) continue
              const kk = jj * n + ii
              const w = validity[kk] > 0.35 ? 1.1 : 0.35
              sum += tmp[kk] * w
              weight += w
            }
          }
          height[k] = sum / weight
        }
      }
    }

    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const k = j * n + i
        const base = height[k]
        pos.setY(k, base > 1 ? base : -60)
        const x = -DOMAIN.halfX + (i / res) * DOMAIN.halfX * 2
        const z = -DOMAIN.halfZ + (j / res) * DOMAIN.halfZ * 2
        this.densityData[k] = base > 1 ? sampledDensity(x, base + 90, z) : 0
      }
    }
    pos.needsUpdate = true
    ;(this.geometry.getAttribute('aBase') as THREE.BufferAttribute).needsUpdate = true
    ;(this.geometry.getAttribute('aDensity') as THREE.BufferAttribute).needsUpdate = true
    this.geometry.computeVertexNormals()
  }

  setVisible(v: boolean): void {
    this.mesh.visible = v
  }

  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
  }
}

function buildRibbon(top: THREE.Vector3[], bot: THREE.Vector3[], color: number, opacity: number): THREE.Mesh {
  const n = top.length
  const positions = new Float32Array(n * 2 * 3)
  const colors = new Float32Array(n * 2 * 4)
  const c = new THREE.Color(color)
  for (let i = 0; i < n; i++) {
    positions[i * 6] = bot[i].x
    positions[i * 6 + 1] = bot[i].y
    positions[i * 6 + 2] = bot[i].z
    positions[i * 6 + 3] = top[i].x
    positions[i * 6 + 4] = top[i].y
    positions[i * 6 + 5] = top[i].z
    colors[i * 8] = c.r
    colors[i * 8 + 1] = c.g
    colors[i * 8 + 2] = c.b
    colors[i * 8 + 3] = 0.02
    colors[i * 8 + 4] = c.r
    colors[i * 8 + 5] = c.g
    colors[i * 8 + 6] = c.b
    colors[i * 8 + 7] = opacity
  }
  const index: number[] = []
  for (let i = 0; i < n - 1; i++) {
    const a = i * 2
    const b = a + 1
    const d = a + 2
    const e = a + 3
    index.push(a, b, d, b, e, d)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 4))
  geo.setIndex(index)
  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    toneMapped: false,
    fog: false,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.renderOrder = 6
  return mesh
}

function addMarker(group: THREE.Group, wp: Waypoint, terrain: TerrainMesh, color: number): void {
  const ground = terrain.heightAt(wp.x, wp.z)
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(44, 16, 12),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, toneMapped: false }),
  )
  sphere.position.set(wp.x, wp.altMin, wp.z)
  group.add(sphere)
  const ringGeo = new THREE.RingGeometry(66, 82, 36)
  ringGeo.rotateX(-Math.PI / 2)
  const ring = new THREE.Mesh(
    ringGeo,
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      toneMapped: false,
    }),
  )
  ring.position.set(wp.x, ground + 4, wp.z)
  group.add(ring)
  const stem = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(wp.x, ground, wp.z),
    new THREE.Vector3(wp.x, wp.altMin, wp.z),
  ])
  group.add(
    new THREE.Line(
      stem,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.42, depthWrite: false, toneMapped: false }),
    ),
  )
}

function disposeObject(obj: THREE.Object3D): void {
  obj.traverse((o) => {
    const mesh = o as THREE.Mesh
    if (mesh.geometry) mesh.geometry.dispose()
    const mat = (mesh as unknown as { material?: THREE.Material | THREE.Material[] }).material
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
    else mat?.dispose()
  })
}

function buildLegs(wps: Waypoint[]) {
  const legs: Array<{ s0: number; s1: number; length: number; fromId: string; toId: string }> = []
  let s = 0
  for (let i = 0; i < wps.length - 1; i++) {
    const a = wps[i]
    const b = wps[i + 1]
    const len = Math.hypot(b.x - a.x, b.z - a.z)
    legs.push({ s0: s, s1: s + len, length: len, fromId: a.id, toId: b.id })
    s += len
  }
  return legs
}

function pointAt(wps: Waypoint[], legs: ReturnType<typeof buildLegs>, s: number) {
  if (!legs.length) return { x: wps[0]?.x ?? 0, z: wps[0]?.z ?? 0 }
  for (const leg of legs) {
    if (s <= leg.s1 || leg === legs[legs.length - 1]) {
      const a = wps.find((w) => w.id === leg.fromId)!
      const b = wps.find((w) => w.id === leg.toId)!
      const f = leg.length > 0 ? Math.min(1, Math.max(0, (s - leg.s0) / leg.length)) : 0
      return { x: a.x + (b.x - a.x) * f, z: a.z + (b.z - a.z) * f }
    }
  }
  const w = wps[wps.length - 1]
  return { x: w.x, z: w.z }
}

function bandAt(wps: Waypoint[], legs: ReturnType<typeof buildLegs>, s: number) {
  if (!legs.length) return { lo: wps[0]?.altMin ?? 300, hi: wps[0]?.altMax ?? 1200 }
  for (const leg of legs) {
    if (s <= leg.s1 || leg === legs[legs.length - 1]) {
      const a = wps.find((w) => w.id === leg.fromId)!
      const b = wps.find((w) => w.id === leg.toId)!
      const f = leg.length > 0 ? Math.min(1, Math.max(0, (s - leg.s0) / leg.length)) : 0
      return { lo: a.altMin + (b.altMin - a.altMin) * f, hi: a.altMax + (b.altMax - a.altMax) * f }
    }
  }
  const w = wps[wps.length - 1]
  return { lo: w.altMin, hi: w.altMax }
}

export function makeVolumeTexture(chunks: Uint8Array[] | null): THREE.Data3DTexture | null {
  if (!chunks) return null
  const { nx, ny, nz, cx, cy, cz, chunk } = GRID
  const data = new Uint8Array(nx * ny * nz * 4)
  for (let cz0 = 0; cz0 < cz; cz0++) {
    for (let cy0 = 0; cy0 < cy; cy0++) {
      for (let cx0 = 0; cx0 < cx; cx0++) {
        const src = chunks[(cz0 * cy + cy0) * cx + cx0]
        let o = 0
        for (let lz = 0; lz < chunk; lz++) {
          for (let ly = 0; ly < chunk; ly++) {
            for (let lx = 0; lx < chunk; lx++) {
              const gx = cx0 * chunk + lx
              const gy = cy0 * chunk + ly
              const gz = cz0 * chunk + lz
              const dst = (gx + nx * (gy + ny * gz)) * 4
              data[dst] = src[o]
              data[dst + 1] = src[o + 1]
              data[dst + 2] = src[o + 2]
              data[dst + 3] = 255
              o += 4
            }
          }
        }
      }
    }
  }
  const tex = new THREE.Data3DTexture(data, nx, ny, nz)
  tex.format = THREE.RGBAFormat
  tex.type = THREE.UnsignedByteType
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  tex.wrapR = THREE.ClampToEdgeWrapping
  tex.unpackAlignment = 1
  tex.needsUpdate = true
  return tex
}
