import * as THREE from 'three';
import type { LayerId } from './state';

export interface LayerScene {
  id: LayerId;
  scene: THREE.Scene;
  hemi: THREE.HemisphereLight;
  sun: THREE.DirectionalLight;
  /** 根据雾效强度 0..1 与雾色更新该层雾效 */
  applyFog(intensity: number, color: THREE.Color): void;
  /** 昼夜与色温变化时更新天空 / 灯光 */
  applyEnvironment(sky: THREE.Color, lightColor: THREE.Color, night: boolean): void;
}

/** 确定性伪随机，保证每次加载场景一致 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeLights(scene: THREE.Scene) {
  const hemi = new THREE.HemisphereLight(0xbfd6e8, 0x3a4a3a, 0.9);
  const sun = new THREE.DirectionalLight(0xffffff, 1.4);
  sun.position.set(-120, 200, -80);
  scene.add(hemi, sun);
  return { hemi, sun };
}

interface FogRange {
  near: [number, number]; // [无雾, 最大雾]
  far: [number, number];
}

function makeLayer(
  id: LayerId,
  scene: THREE.Scene,
  fogRange: FogRange,
  extra?: (env: { sky: THREE.Color; night: boolean }) => void,
): LayerScene {
  const { hemi, sun } = makeLights(scene);
  const fog = new THREE.Fog(0xffffff, fogRange.far[0], fogRange.far[0] * 2);
  scene.fog = fog;
  return {
    id,
    scene,
    hemi,
    sun,
    applyFog(intensity, color) {
      const t = intensity * intensity; // 低段更细腻
      fog.near = fogRange.near[0] + (fogRange.near[1] - fogRange.near[0]) * t;
      fog.far = fogRange.far[0] + (fogRange.far[1] - fogRange.far[0]) * t;
      fog.color.copy(color);
    },
    applyEnvironment(sky, lightColor, night) {
      hemi.color.copy(sky).lerp(new THREE.Color(0xffffff), 0.4);
      hemi.intensity = night ? 0.25 : 0.9;
      sun.color.copy(lightColor);
      sun.intensity = night ? 0.35 : 1.4;
      extra?.({ sky, night });
    },
  };
}

/** 远景层：天空背景、太阳/月亮、连绵山峦、大地 */
function buildFarScene(): LayerScene {
  const scene = new THREE.Scene();
  const rand = mulberry32(1001);

  scene.background = new THREE.Color(0x87b5d6);

  // 太阳 / 月亮
  const sunDisc = new THREE.Mesh(
    new THREE.CircleGeometry(60, 32),
    new THREE.MeshBasicMaterial({ color: 0xfff3c0, fog: false }),
  );
  sunDisc.position.set(-500, 420, -2800);
  sunDisc.lookAt(0, 0, 0);
  scene.add(sunDisc);

  // 远山：三排不同距离与颜色的山脊
  const ridgeColors = [0x6f8296, 0x5b6f83, 0x47596d];
  [1600, 2100, 2700].forEach((z, row) => {
    const mat = new THREE.MeshLambertMaterial({ color: ridgeColors[row] });
    for (let i = 0; i < 14; i++) {
      const h = 180 + rand() * 320 + row * 60;
      const r = 260 + rand() * 300;
      const peak = new THREE.Mesh(new THREE.ConeGeometry(r, h, 5), mat);
      peak.position.set(-2600 + i * 400 + (rand() - 0.5) * 220, h / 2 - 4, -z - rand() * 200);
      peak.rotation.y = rand() * Math.PI;
      scene.add(peak);
    }
  });

  // 大地
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(8000, 6000),
    new THREE.MeshLambertMaterial({ color: 0x51663f }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.2, -2500);
  scene.add(ground);

  const layer = makeLayer('far', scene, { near: [4000, 60], far: [7000, 500] }, ({ sky, night }) => {
    (scene.background as THREE.Color).copy(sky);
    (sunDisc.material as THREE.MeshBasicMaterial).color.set(night ? 0xdfe8ff : 0xfff3c0);
  });
  return layer;
}

/** 中景层：行道树、沿线建筑、跨线桥 */
function buildMidScene(): LayerScene {
  const scene = new THREE.Scene();
  const rand = mulberry32(2002);

  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5a4632 });
  const leafMats = [0x3f6b2f, 0x4a7a36, 0x57863d].map(
    (c) => new THREE.MeshLambertMaterial({ color: c }),
  );
  const trunkGeo = new THREE.CylinderGeometry(0.25, 0.35, 3, 6);
  const leafGeo = new THREE.ConeGeometry(2.2, 6, 8);

  // 轨道两侧成排的树
  for (let z = -40; z > -600; z -= 12 + rand() * 10) {
    for (const side of [-1, 1]) {
      if (rand() < 0.25) continue;
      const x = side * (12 + rand() * 45);
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.5;
      const leaves = new THREE.Mesh(leafGeo, leafMats[Math.floor(rand() * 3)]);
      leaves.position.y = 3 + 3;
      const s = 0.8 + rand() * 0.9;
      tree.scale.setScalar(s);
      tree.add(trunk, leaves);
      tree.position.set(x, 0, z);
      scene.add(tree);
    }
  }

  // 沿线建筑
  const buildingMats = [0x8a7f70, 0x9c8f80, 0x7d8a94].map(
    (c) => new THREE.MeshLambertMaterial({ color: c }),
  );
  for (let z = -80; z > -560; z -= 55 + rand() * 40) {
    const side = rand() < 0.5 ? -1 : 1;
    const w = 12 + rand() * 14;
    const h = 8 + rand() * 22;
    const d = 10 + rand() * 10;
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      buildingMats[Math.floor(rand() * 3)],
    );
    b.position.set(side * (55 + rand() * 40), h / 2, z);
    scene.add(b);
  }

  // 跨线桥
  const bridgeMat = new THREE.MeshLambertMaterial({ color: 0x707880 });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(60, 1.6, 6), bridgeMat);
  deck.position.set(0, 7.5, -140);
  scene.add(deck);
  for (const x of [-18, 18]) {
    const pier = new THREE.Mesh(new THREE.BoxGeometry(2.5, 7.5, 4), bridgeMat);
    pier.position.set(x, 3.75, -140);
    scene.add(pier);
  }

  // 地面
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(1200, 900),
    new THREE.MeshLambertMaterial({ color: 0x4c6b38 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.1, -350);
  scene.add(ground);

  return makeLayer('mid', scene, { near: [5000, 40], far: [9000, 350] });
}

/** 近景层：钢轨、轨枕、道砟、接触网支柱、护栏与草丛 */
function buildNearScene(): LayerScene {
  const scene = new THREE.Scene();
  const rand = mulberry32(3003);

  // 道砟
  const ballast = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 140),
    new THREE.MeshLambertMaterial({ color: 0x6b6f75 }),
  );
  ballast.rotation.x = -Math.PI / 2;
  ballast.position.set(0, 0, -55);
  scene.add(ballast);

  // 两侧草地
  const grassMat = new THREE.MeshLambertMaterial({ color: 0x557a3a });
  for (const side of [-1, 1]) {
    const g = new THREE.Mesh(new THREE.PlaneGeometry(60, 140), grassMat);
    g.rotation.x = -Math.PI / 2;
    g.position.set(side * 37, -0.05, -55);
    scene.add(g);
  }

  // 钢轨
  const railMat = new THREE.MeshLambertMaterial({ color: 0x9aa0a8 });
  for (const x of [-0.75, 0.75]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 140), railMat);
    rail.position.set(x, 0.32, -55);
    scene.add(rail);
  }

  // 轨枕
  const sleeperMat = new THREE.MeshLambertMaterial({ color: 0x4a3d30 });
  const sleeperGeo = new THREE.BoxGeometry(2.4, 0.14, 0.24);
  for (let z = 5; z > -125; z -= 0.65) {
    const s = new THREE.Mesh(sleeperGeo, sleeperMat);
    s.position.set(0, 0.2, z);
    scene.add(s);
  }

  // 接触网支柱（右侧）与横臂
  const poleMat = new THREE.MeshLambertMaterial({ color: 0x3f464e });
  const poleGeo = new THREE.CylinderGeometry(0.16, 0.2, 7.5, 8);
  const armGeo = new THREE.BoxGeometry(4.2, 0.14, 0.14);
  for (let z = -10; z > -120; z -= 25) {
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(4.2, 3.75, z);
    const arm = new THREE.Mesh(armGeo, poleMat);
    arm.position.set(2.4, 6.6, z);
    scene.add(pole, arm);
  }

  // 左侧护栏
  const fenceMat = new THREE.MeshLambertMaterial({ color: 0xb8bcc2 });
  const railBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 120), fenceMat);
  railBar.position.set(-3.5, 1.0, -55);
  scene.add(railBar);
  const postGeo = new THREE.BoxGeometry(0.1, 1.0, 0.1);
  for (let z = 2; z > -115; z -= 4) {
    const p = new THREE.Mesh(postGeo, fenceMat);
    p.position.set(-3.5, 0.5, z);
    scene.add(p);
  }

  // 草丛
  const tuftMats = [0x5f8a40, 0x6d9a48].map((c) => new THREE.MeshLambertMaterial({ color: c }));
  const tuftGeo = new THREE.ConeGeometry(0.35, 0.8, 5);
  for (let i = 0; i < 90; i++) {
    const side = rand() < 0.5 ? -1 : 1;
    const tuft = new THREE.Mesh(tuftGeo, tuftMats[i % 2]);
    tuft.position.set(side * (2.2 + rand() * 6), 0.4, 4 - rand() * 120);
    tuft.scale.setScalar(0.7 + rand() * 0.8);
    scene.add(tuft);
  }

  return makeLayer('near', scene, { near: [7000, 90], far: [12000, 800] });
}

export function buildLayerScenes(): Record<LayerId, LayerScene> {
  return {
    far: buildFarScene(),
    mid: buildMidScene(),
    near: buildNearScene(),
  };
}
