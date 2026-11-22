// 护舷接触浪花粒子（GPU Points，CPU 端维护生命周期）
import * as THREE from 'three';

interface Particle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  age: number;
  maxLife: number;
}

const MAX = 420;

export class SpraySystem {
  readonly points: THREE.Points;
  private particles: Particle[] = [];
  private readonly positions: Float32Array;
  private readonly alphas: Float32Array;
  private readonly geo: THREE.BufferGeometry;

  constructor() {
    this.positions = new Float32Array(MAX * 3).fill(9999);
    this.alphas = new Float32Array(MAX);
    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uColor: { value: new THREE.Color(0xdceef5) } },
      vertexShader: /* glsl */ `
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(180.0 / -mv.z, 2.0, 14.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float r = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.12, r) * vAlpha;
          gl_FragColor = vec4(uColor, a);
        }
      `
    });
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
  }

  /** 在接触点迸发一批水花，strength 0~1.5 */
  burst(origin: THREE.Vector3, strength: number): void {
    const n = Math.min(MAX - this.particles.length, Math.round(6 + strength * 18));
    for (let i = 0; i < n; i++) {
      const k = Math.min(1.4, strength);
      this.particles.push({
        pos: origin
          .clone()
          .add(new THREE.Vector3((Math.random() - 0.5) * 1.2, 0, (Math.random() - 0.5) * 0.8)),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 3.2,
          1.5 + Math.random() * 3.5 * k,
          1.0 + Math.random() * 2.4 * k
        ),
        age: 0,
        maxLife: 0.7 + Math.random() * 0.9
      });
    }
  }

  update(dt: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;
      if (p.age >= p.maxLife) this.particles.splice(i, 1);
    }
    for (let i = 0; i < MAX; i++) {
      const p = this.particles[i];
      if (!p) {
        this.positions[i * 3] = 9999;
        this.positions[i * 3 + 1] = 9999;
        this.positions[i * 3 + 2] = 9999;
        this.alphas[i] = 0;
        continue;
      }
      p.vel.y -= 9.81 * dt;
      p.pos.addScaledVector(p.vel, dt);
      if (p.pos.y < 0.05) {
        p.pos.y = 0.05;
        p.vel.set(0, 0, 0);
      }
      this.positions[i * 3] = p.pos.x;
      this.positions[i * 3 + 1] = p.pos.y;
      this.positions[i * 3 + 2] = p.pos.z;
      this.alphas[i] = (1 - p.age / p.maxLife) * 0.85;
    }
    (this.geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.getAttribute('aAlpha') as THREE.BufferAttribute).needsUpdate = true;
  }

  reset(): void {
    this.particles.length = 0;
    this.positions.fill(9999);
    this.alphas.fill(0);
  }
}
