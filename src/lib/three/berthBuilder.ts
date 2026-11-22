// 泊位：岸壁、护舷、系缆桩、码头面设施
import * as THREE from 'three';
import type { BerthConfig } from '../types';
import { bollardPositions, fenderPositions } from '../sim/hydro';

export interface BerthModel {
  group: THREE.Group;
  fenders: THREE.Mesh[];
  bollards: THREE.Object3D[];
}

export function buildBerth(berth: BerthConfig): BerthModel {
  const group = new THREE.Group();
  group.name = 'berth';
  const q = berth.quayLength;
  const h = berth.quayHeight;

  // 岸壁主体（壁面位于 z=0，码头向 -z 延伸）
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(q + 20, h + 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x8a8f96, roughness: 0.95 })
  );
  wall.position.set(0, (h - 4) / 2, -4);
  wall.receiveShadow = true;
  group.add(wall);

  // 码头铺面
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(q + 20, 0.5, 10),
    new THREE.MeshStandardMaterial({ color: 0x6c757d, roughness: 0.9 })
  );
  deck.position.set(0, h + 0.25, -5);
  deck.receiveShadow = true;
  group.add(deck);

  // 橡胶护舷条带（竖向安装背板）
  const strip = new THREE.Mesh(
    new THREE.BoxGeometry(q, h * 0.55, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.8 })
  );
  strip.position.set(0, berth.fender.mountHeight, 0.05);
  group.add(strip);

  // 胶囊形护舷
  const fenderMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.85,
    metalness: 0.05
  });
  const fenders: THREE.Mesh[] = [];
  for (const fx of fenderPositions(berth)) {
    const f = new THREE.Mesh(
      new THREE.CapsuleGeometry(berth.fender.protrusion * 0.55, berth.fender.halfLength * 2 - berth.fender.protrusion, 6, 12),
      fenderMat
    );
    f.rotation.z = Math.PI / 2; // 沿岸壁方向横放
    f.position.set(fx, berth.fender.mountHeight, berth.fender.protrusion * 0.55);
    f.castShadow = true;
    f.name = 'fender';
    group.add(f);
    fenders.push(f);
  }

  // 系缆桩
  const bollardMat = new THREE.MeshStandardMaterial({
    color: 0x30343a,
    metalness: 0.7,
    roughness: 0.35
  });
  const bollards: THREE.Object3D[] = [];
  for (const bp of bollardPositions(berth)) {
    const bg = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 0.4, 14), bollardMat);
    base.position.y = 0.2;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 1.4, 12), bollardMat);
    post.position.y = 0.9;
    const cross = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.0, 10), bollardMat);
    cross.rotation.z = Math.PI / 2;
    cross.position.y = 1.5;
    bg.add(base, post, cross);
    bg.position.set(bp.x, 0, bp.z);
    bg.traverse((o) => {
      if (o instanceof THREE.Mesh) o.castShadow = true;
    });
    group.add(bg);
    bollards.push(bg);
  }

  // 码头边缘防撞条与系船标识
  const edge = new THREE.Mesh(
    new THREE.BoxGeometry(q + 20, 0.6, 0.4),
    new THREE.MeshStandardMaterial({ color: 0xc9a227, roughness: 0.7 })
  );
  edge.position.set(0, h + 0.6, 0.1);
  group.add(edge);

  return { group, fenders, bollards };
}
