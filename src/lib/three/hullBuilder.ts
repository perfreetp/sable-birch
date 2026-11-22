// 按船长/船宽/型深/吃水参数化生成船体（21 站横剖面 + 甲板 + 上层建筑）
import * as THREE from 'three';
import type { ShipType } from '../types';

export interface HullModel {
  group: THREE.Group;
  chockAnchors: THREE.Object3D[];
  deckY: number;
}

export function buildHull(ship: ShipType): HullModel {
  const { length: L, beam: B, depth: D, draft: d } = ship;
  const group = new THREE.Group();
  group.name = 'ship';

  const N_ST = 21;
  const N_PT = 9; // 每侧剖面点数（含龙骨与甲板边）
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const hullCol = new THREE.Color(ship.hullColor);
  const bottomCol = new THREE.Color('#8a1f1f');
  const waterCol = new THREE.Color('#c0504d');

  const station = (s: number): { x: number; top: number; chine: number; rise: number } => {
    const taper = Math.cos((s * Math.PI) / 2);
    const bowFine = s > 0.75 ? 1 - 0.45 * ((s - 0.75) / 0.25) ** 2 : 1;
    const sternFine = s < -0.85 ? 1 - 0.25 * ((-s - 0.85) / 0.15) ** 2 : 1;
    const k = Math.max(0.08, taper) * bowFine * sternFine;
    return {
      x: (s * L) / 2,
      top: (B / 2) * k,
      chine: (B / 2) * k * 0.92,
      rise: -d + (1 - k) * d * 0.55 // 端部龙骨上翘
    };
  };

  // 剖面点：右舷甲板边 -> 右舷舭 -> 龙骨 -> 左舷舭 -> 左舷甲板边
  const sectionPts = (st: ReturnType<typeof station>): THREE.Vector3[] => {
    const pts: THREE.Vector3[] = [];
    const profile = [
      [1, D - d],
      [1, D - d - (D - d) * 0.35],
      [0.82, -d * 0.45],
      [0.45, st.rise + d * 0.12],
      [0, st.rise],
      [-0.45, st.rise + d * 0.12],
      [-0.82, -d * 0.45],
      [-1, D - d - (D - d) * 0.35],
      [-1, D - d]
    ];
    for (const [sz, sy] of profile) {
      const half = sz >= 0 ? st.top * Math.abs(sz) : -st.top * Math.abs(sz);
      void st.chine;
      pts.push(new THREE.Vector3(st.x, sy as number, half));
    }
    return pts;
  };

  const pushColor = (y: number): void => {
    let c: THREE.Color;
    if (y < -d * 0.55) c = bottomCol;
    else if (y < 0.3) c = waterCol.clone().lerp(hullCol, (y + d * 0.55) / (0.3 + d * 0.55));
    else c = hullCol;
    colors.push(c.r, c.g, c.b);
  };

  for (let i = 0; i < N_ST; i++) {
    const s = -1 + (2 * i) / (N_ST - 1);
    const pts = sectionPts(station(s));
    for (const p of pts) {
      positions.push(p.x, p.y, p.z);
      pushColor(p.y);
    }
  }

  for (let i = 0; i < N_ST - 1; i++) {
    for (let j = 0; j < N_PT - 1; j++) {
      const a = i * N_PT + j;
      const b = (i + 1) * N_PT + j;
      const c = (i + 1) * N_PT + j + 1;
      const dd = i * N_PT + j + 1;
      indices.push(a, b, dd, b, c, dd);
    }
  }
  // 艏艉封板
  const cap = (stIndex: number, reverse: boolean): void => {
    const base = stIndex * N_PT;
    const center = new THREE.Vector3();
    for (let j = 0; j < N_PT; j++) {
      center.x += positions[(base + j) * 3];
      center.y += positions[(base + j) * 3 + 1];
      center.z += positions[(base + j) * 3 + 2];
    }
    center.multiplyScalar(1 / N_PT);
    const ci = positions.length / 3;
    positions.push(center.x, center.y, center.z);
    pushColor(0);
    for (let j = 0; j < N_PT - 1; j++) {
      if (reverse) indices.push(ci, base + j + 1, base + j);
      else indices.push(ci, base + j, base + j + 1);
    }
  };
  cap(0, true);
  cap(N_ST - 1, false);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const hull = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.62, metalness: 0.18 })
  );
  group.add(hull);

  // 甲板
  const deckGeo = new THREE.BoxGeometry(L * 0.94, 0.4, B * 0.9);
  const deck = new THREE.Mesh(
    deckGeo,
    new THREE.MeshStandardMaterial({ color: 0x3d4a57, roughness: 0.85 })
  );
  deck.position.set(-L * 0.01, D - d + 0.15, 0);
  group.add(deck);

  // 上层建筑
  const ssLen = L * ship.superstructureLen;
  const ssX = L * ship.superstructurePos;
  const ssH = D * 0.55;
  const ss = new THREE.Mesh(
    new THREE.BoxGeometry(ssLen, ssH, B * 0.62),
    new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.5 })
  );
  ss.position.set(ssX, D - d + 0.4 + ssH / 2, 0);
  group.add(ss);
  const bridge = new THREE.Mesh(
    new THREE.BoxGeometry(ssLen * 0.72, ssH * 0.45, B * 0.5),
    new THREE.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.4 })
  );
  bridge.position.set(ssX + ssLen * 0.08, D - d + 0.4 + ssH + ssH * 0.22, 0);
  group.add(bridge);
  // 烟囱
  const funnel = new THREE.Mesh(
    new THREE.CylinderGeometry(B * 0.05, B * 0.065, ssH * 0.5, 12),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  funnel.position.set(ssX - ssLen * 0.28, D - d + 0.4 + ssH + ssH * 0.2, 0);
  group.add(funnel);

  // 货舱口（集装箱/散货风格）
  const hatchMat = new THREE.MeshStandardMaterial({ color: 0x273746, roughness: 0.8 });
  const hatchCount = Math.max(2, Math.round(L / 45));
  for (let i = 0; i < hatchCount; i++) {
    const hx = -L * 0.32 + (i * L * 0.62) / Math.max(1, hatchCount - 1);
    if (Math.abs(hx - ssX) < ssLen * 0.7) continue;
    const hatch = new THREE.Mesh(new THREE.BoxGeometry(L * 0.1, 0.3, B * 0.6), hatchMat);
    hatch.position.set(hx, D - d + 0.5, 0);
    group.add(hatch);
  }

  // 导缆孔锚点（与配置中典型位置对应）
  const chockAnchors: THREE.Object3D[] = [];
  const chockMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.6, roughness: 0.4 });
  const chockXs = [L * 0.42, L * 0.3, L * 0.2, -L * 0.2, -L * 0.3, -L * 0.42];
  for (const cx of chockXs) {
    const anchor = new THREE.Object3D();
    anchor.position.set(cx, D - d + 0.6, -B / 2 + 0.8);
    group.add(anchor);
    chockAnchors.push(anchor);
    const roller = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.09, 8, 16), chockMat);
    roller.position.copy(anchor.position);
    roller.rotation.y = Math.PI / 2;
    group.add(roller);
  }

  // 桅杆
  const mastMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d8 });
  for (const mx of [L * 0.4, -L * 0.42]) {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, D * 0.5, 8), mastMat);
    mast.position.set(mx, D - d + 0.4 + D * 0.25, 0);
    group.add(mast);
  }

  group.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = true;
  });
  return { group, chockAnchors, deckY: D - d + 0.6 };
}
