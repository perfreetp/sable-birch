// 反射海面：基于 three/examples Reflector 做平面反射，叠加波浪法线动画与浪花泡沫
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export interface SeaModel {
  group: THREE.Group;
  update: (t: number, shipPos: THREE.Vector3, contact: boolean) => void;
}

export function buildSea(width = 900, length = 900): SeaModel {
  const group = new THREE.Group();
  group.name = 'sea';

  const size = Math.min(width, length);
  const mirror = new Reflector(new THREE.PlaneGeometry(size, size), {
    clipBias: 0.003,
    textureWidth: 2048,
    textureHeight: 2048,
    color: 0x163a4d
  });
  mirror.rotation.x = -Math.PI / 2;
  mirror.position.y = 0;
  const reflTex = (mirror as unknown as { getRenderTarget?: () => THREE.WebGLRenderTarget }).getRenderTarget?.();
  reflTex?.texture.generateMipmaps && (reflTex.texture.minFilter = THREE.LinearMipmapLinearFilter);
  group.add(mirror);

  // 半透明波浪层（顶点起伏 + 片元泡沫）
  const geo = new THREE.PlaneGeometry(size, size, 160, 160);
  const uniforms = {
    uTime: { value: 0 },
    uDeep: { value: new THREE.Color(0x0b2c3e) },
    uShallow: { value: new THREE.Color(0x1d6a86) },
    uFoamPos: { value: new THREE.Vector3(9999, 0, 9999) },
    uFoamOn: { value: 0 }
  };
  const wave = new THREE.Mesh(
    geo,
    new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        uniform float uTime;
        varying vec2 vUv;
        varying float vWave;
        varying vec3 vWorld;
        void main() {
          vUv = uv;
          vec3 p = position;
          float w = sin(p.x * 0.055 + uTime * 0.9) * 0.32
                  + sin(p.y * 0.07 - uTime * 0.7) * 0.26
                  + sin((p.x + p.y) * 0.035 + uTime * 0.5) * 0.2;
          p.z += w;
          vWave = w;
          vec4 wp = modelMatrix * vec4(p, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uDeep;
        uniform vec3 uShallow;
        uniform vec3 uFoamPos;
        uniform float uFoamOn;
        varying vec2 vUv;
        varying float vWave;
        varying vec3 vWorld;
        void main() {
          float crest = smoothstep(0.2, 0.65, vWave);
          vec3 col = mix(uDeep, uShallow, crest * 0.7);
          // 缓慢起伏的大尺度明暗，避免高频摩尔纹
          float shade = sin(vWorld.x * 0.22 + uTime * 0.9) * sin(vWorld.z * 0.18 - uTime * 0.7);
          col += vec3(0.03) * shade;
          // 接触泡沫圈
          float d = distance(vWorld.xz, uFoamPos.xz);
          float ring = smoothstep(8.0, 1.2, d) * uFoamOn;
          float foamNoise = 0.55 + 0.45 * sin(vWorld.x * 0.8 + uTime * 2.2) * sin(vWorld.z * 0.7 - uTime * 1.9);
          float foam = ring * foamNoise * (0.4 + 0.6 * smoothstep(0.3, 0.6, vWave + 0.3));
          col = mix(col, vec3(0.92, 0.96, 0.98), clamp(foam, 0.0, 0.85));
          gl_FragColor = vec4(col, 0.42);
        }
      `
    })
  );
  wave.rotation.x = -Math.PI / 2;
  wave.position.y = 0.02;
  wave.renderOrder = 2;
  group.add(wave);

  const update = (t: number, shipPos: THREE.Vector3, contact: boolean): void => {
    uniforms.uTime.value = t;
    uniforms.uFoamPos.value.set(shipPos.x, 0, shipPos.z);
    uniforms.uFoamOn.value += ((contact ? 1 : 0) - uniforms.uFoamOn.value) * 0.08;
  };

  return { group, update };
}
