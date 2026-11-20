import * as THREE from 'three';

const NOISE_GLSL = /* glsl */ `
float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
    f.z);
}
float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}
`;

/** 半透明体积雾: 噪声扰动边缘 + 菲涅尔柔和过渡 */
export function createFogMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 0.85 },
      uMix: { value: 0.5 },
      uColorA: { value: new THREE.Color(0xffc266) },
      uColorB: { value: new THREE.Color(0xff4422) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vObj;
      varying vec3 vWorld;
      varying vec3 vNormalW;
      void main() {
        vObj = position;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vObj;
      varying vec3 vWorld;
      varying vec3 vNormalW;
      uniform float uTime;
      uniform float uOpacity;
      uniform float uMix;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      ${NOISE_GLSL}
      void main() {
        float r = length(vObj);
        float n = fbm(vObj * 2.6 + vec3(0.0, uTime * 0.18, uTime * 0.12));
        // 噪声扰动边缘, 形成不规则扩散前沿
        float edge = 1.0 - smoothstep(0.42, 1.0, r + (n - 0.5) * 0.5);
        vec3 V = normalize(cameraPosition - vWorld);
        float fres = pow(1.0 - abs(dot(V, normalize(vNormalW))), 1.8);
        float a = edge * (0.16 + 0.6 * fres) * uOpacity;
        if (a < 0.004) discard;
        vec3 col = mix(uColorA, uColorB, clamp(uMix + (n - 0.5) * 0.35, 0.0, 1.0));
        gl_FragColor = vec4(col, a);
      }
    `,
  });
}

/** 地面热区贴图: 浓度分级色带 (绿→黄→红), 噪声扰动边缘 */
export function createHeatMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: 0.8 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uIntensity;
      ${NOISE_GLSL}
      vec3 ramp(float c) {
        vec3 g = vec3(0.18, 0.80, 0.44);
        vec3 y = vec3(0.95, 0.77, 0.06);
        vec3 r = vec3(0.90, 0.22, 0.17);
        return c < 0.5 ? mix(g, y, c * 2.0) : mix(y, r, (c - 0.5) * 2.0);
      }
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float d = length(p);
        float n = fbm(vec3(p * 3.0, uTime * 0.08));
        // 高斯衰减近似浓度场
        float c = uIntensity * exp(-pow(d * 1.7, 2.0));
        c *= 0.85 + 0.3 * n;
        c = clamp(c, 0.0, 1.0);
        vec3 col = ramp(c);
        float a = (1.0 - smoothstep(0.55, 1.0, d + (n - 0.5) * 0.25))
                * 0.62 * clamp(c * 2.5, 0.12, 1.0);
        if (a < 0.004) discard;
        gl_FragColor = vec4(col, a);
      }
    `,
  });
}
