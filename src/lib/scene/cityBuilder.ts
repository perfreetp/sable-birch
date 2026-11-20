import * as THREE from 'three';

export interface BuildingInfo {
  mesh: THREE.Mesh;
  edges: THREE.LineSegments;
  center: THREE.Vector3;
  mat: THREE.MeshStandardMaterial;
}

export interface PipeInfo {
  mesh: THREE.Mesh;
  point: THREE.Vector3;
  mat: THREE.MeshStandardMaterial;
}

export interface CityData {
  group: THREE.Group;
  buildings: BuildingInfo[];
  pipes: PipeInfo[];
  ground: THREE.Mesh;
  pickTargets: THREE.Object3D[];
}

/** 可复现的伪随机数, 保证街区布局固定 */
function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildCity(): CityData {
  const group = new THREE.Group();
  const rand = mulberry32(20261121);

  // 地面
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(260, 260),
    new THREE.MeshStandardMaterial({ color: 0x2b2f36, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.name = 'ground';
  group.add(ground);

  // 十字主干道
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x191c21, roughness: 0.95 });
  const roadX = new THREE.Mesh(new THREE.PlaneGeometry(260, 18), roadMat);
  roadX.rotation.x = -Math.PI / 2;
  roadX.position.y = 0.02;
  const roadZ = new THREE.Mesh(new THREE.PlaneGeometry(18, 260), roadMat);
  roadZ.rotation.x = -Math.PI / 2;
  roadZ.position.y = 0.02;
  group.add(roadX, roadZ);

  // 楼栋
  const buildings: BuildingInfo[] = [];
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const edgeGeo = new THREE.EdgesGeometry(boxGeo);
  for (let gx = -3; gx <= 3; gx++) {
    for (let gz = -3; gz <= 3; gz++) {
      const cx = gx * 34 + (rand() - 0.5) * 8;
      const cz = gz * 34 + (rand() - 0.5) * 8;
      if (Math.abs(cx) < 16 || Math.abs(cz) < 16) continue; // 让开道路
      const w = 10 + rand() * 8;
      const d = 10 + rand() * 8;
      const h = 8 + rand() * 26;
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.08 + rand() * 0.05, 0.12, 0.3 + rand() * 0.16),
        roughness: 0.85,
      });
      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.scale.set(w, h, d);
      mesh.position.set(cx, h / 2, cz);
      const edges = new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({ color: 0xff6633, transparent: true, opacity: 0.95 })
      );
      edges.visible = false;
      mesh.add(edges);
      group.add(mesh);
      buildings.push({ mesh, edges, center: new THREE.Vector3(cx, h / 2, cz), mat });
    }
  }

  // 综合管廊 (半透明混凝土舱体): 沿 X 主干道 z=8, 沿 Z 主干道 x=-8
  const corridorMat = new THREE.MeshStandardMaterial({
    color: 0x9aa4ad,
    transparent: true,
    opacity: 0.26,
    roughness: 0.6,
    depthWrite: false,
  });
  const corridorX = new THREE.Mesh(new THREE.BoxGeometry(220, 2.6, 3.4), corridorMat);
  corridorX.position.set(0, 1.3, 8);
  const corridorZ = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.6, 220), corridorMat);
  corridorZ.position.set(-8, 1.3, 0);
  group.add(corridorX, corridorZ);

  // 热力管道: 每舱两根, 分段建模以便逐段高亮
  const pipes: PipeInfo[] = [];
  const segLen = 20;
  const half = 110;
  const pipeGeo = new THREE.CylinderGeometry(0.45, 0.45, segLen - 0.6, 12);
  const addPipeRun = (axis: 'x' | 'z', fixed: number, lateral: number) => {
    for (let s = -half + segLen / 2; s < half; s += segLen) {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xb0722e,
        roughness: 0.45,
        metalness: 0.6,
      });
      const mesh = new THREE.Mesh(pipeGeo, mat);
      if (axis === 'x') {
        mesh.rotation.z = Math.PI / 2;
        mesh.position.set(s, 2.9, fixed + lateral);
      } else {
        mesh.rotation.x = Math.PI / 2;
        mesh.position.set(fixed + lateral, 2.9, s);
      }
      group.add(mesh);
      pipes.push({ mesh, point: mesh.position.clone(), mat });
    }
  };
  addPipeRun('x', 8, -0.8);
  addPipeRun('x', 8, 0.8);
  addPipeRun('z', -8, -0.8);
  addPipeRun('z', -8, 0.8);

  const pickTargets: THREE.Object3D[] = [ground, corridorX, corridorZ, ...pipes.map((p) => p.mesh)];
  return { group, buildings, pipes, ground, pickTargets };
}
