import * as THREE from 'three';
import type { ModelDef } from '../types';

const bronzeMat = new THREE.MeshStandardMaterial({ color: 0x4a6b52, metalness: 0.75, roughness: 0.35 });
const celadonMat = new THREE.MeshStandardMaterial({ color: 0x9fc8b5, metalness: 0.1, roughness: 0.15 });
const stoneMat = new THREE.MeshStandardMaterial({ color: 0x9a9186, metalness: 0.05, roughness: 0.9 });
const jadeMat = new THREE.MeshStandardMaterial({
  color: 0x7fbf9a,
  metalness: 0.2,
  roughness: 0.25,
  transparent: true,
  opacity: 0.92
});
const goldMat = new THREE.MeshStandardMaterial({ color: 0xc9a227, metalness: 0.9, roughness: 0.25 });

/** 青铜鼎 */
function buildDing(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.45, 0.55, 32), bronzeMat);
  body.position.y = 0.65;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.045, 12, 40), bronzeMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.93;
  g.add(body, rim);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.42, 12), bronzeMat);
    leg.position.set(Math.cos(a) * 0.34, 0.21, Math.sin(a) * 0.34);
    g.add(leg);
  }
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.03, 10, 24, Math.PI), bronzeMat);
    ear.position.set(s * 0.3, 0.95, 0);
    g.add(ear);
  }
  return g;
}

/** 青瓷瓶(车削轮廓) */
function buildVase(): THREE.Group {
  const pts: THREE.Vector2[] = [];
  const profile = [
    [0.0, 0.0], [0.3, 0.0], [0.34, 0.05], [0.42, 0.3], [0.46, 0.6],
    [0.38, 0.9], [0.2, 1.1], [0.14, 1.25], [0.16, 1.4], [0.22, 1.48], [0.0, 1.5]
  ];
  for (const [x, y] of profile) pts.push(new THREE.Vector2(x, y));
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), celadonMat);
  mesh.position.y = -0.75;
  const g = new THREE.Group();
  g.add(mesh);
  return g;
}

/** 石佛坐像(抽象组合) */
function buildBuddha(): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.2, 24), stoneMat);
  base.position.y = 0.1;
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.9, 24), stoneMat);
  body.position.y = 0.65;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 18), stoneMat);
  head.position.y = 1.25;
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.03, 10, 40), stoneMat);
  halo.position.y = 1.28;
  halo.position.z = -0.08;
  g.add(base, body, head, halo);
  g.position.y = -0.6;
  return g;
}

/** 玉璧 */
function buildJade(): THREE.Group {
  const g = new THREE.Group();
  const bi = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.16, 20, 64), jadeMat);
  g.add(bi);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), jadeMat);
    dot.position.set(Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0.16);
    g.add(dot);
  }
  return g;
}

/** 铜剑 */
function buildSword(): THREE.Group {
  const g = new THREE.Group();
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.15, 0.018), goldMat);
  blade.position.y = 0.65;
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 4), goldMat);
  tip.position.y = 1.29;
  tip.rotation.y = Math.PI / 4;
  const guard = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.05, 0.06), bronzeMat);
  guard.position.y = 0.06;
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.24, 12), bronzeMat);
  grip.position.y = -0.08;
  const pommel = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.02, 8, 20), bronzeMat);
  pommel.position.y = -0.22;
  g.add(blade, tip, guard, grip, pommel);
  return g;
}

export function buildProceduralModel(shape: string): THREE.Group {
  switch (shape) {
    case 'ding': return buildDing();
    case 'vase': return buildVase();
    case 'buddha': return buildBuddha();
    case 'jade': return buildJade();
    case 'sword': return buildSword();
    default: return new THREE.Group();
  }
}

/** 统一缩放并居中模型,便于相机取景 */
export function normalizeModel(obj: THREE.Object3D, targetSize = 1.6): void {
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetSize / maxDim;
  obj.scale.setScalar(scale);
  const box2 = new THREE.Box3().setFromObject(obj);
  const center = box2.getCenter(new THREE.Vector3());
  obj.position.sub(center);
}

export type { ModelDef };
