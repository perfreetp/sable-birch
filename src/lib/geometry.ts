import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshBVH } from 'three-mesh-bvh';
import type { Building } from '../types';

/**
 * 建筑底面（x/z 平面）转 THREE.Shape。
 * ExtrudeGeometry 在 XY 平面挤出 +Z，之后 rotateX(-90°)，
 * 变换关系 (x, y, z) -> (x, z, -y)，故 shape 的 y 取 -footprintZ。
 */
export function footprintToShape(b: Building): THREE.Shape {
  const ring = b.footprint;
  const shape = new THREE.Shape();
  shape.moveTo(ring[0][0], -ring[0][1]);
  for (let i = 1; i < ring.length; i++) {
    shape.lineTo(ring[i][0], -ring[i][1]);
  }
  shape.closePath();

  if (b.holes) {
    for (const hole of b.holes) {
      if (hole.length < 3) continue;
      const path = new THREE.Path();
      path.moveTo(hole[0][0], -hole[0][1]);
      for (let i = 1; i < hole.length; i++) {
        path.lineTo(hole[i][0], -hole[i][1]);
      }
      path.closePath();
      shape.holes.push(path);
    }
  }
  return shape;
}

/** 单栋建筑挤出几何体（高度方向 +Y） */
export function createBuildingGeometry(b: Building): THREE.BufferGeometry {
  const shape = footprintToShape(b);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(b.height, 0.1),
    bevelEnabled: false,
    steps: 1,
    curveSegments: 1
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, b.baseHeight ?? 0, 0);
  geo.computeVertexNormals();
  return geo;
}

/** 合并所有建筑为单一几何体（BVH 求交对象） */
export function mergeBuildingGeometries(buildings: Building[]): THREE.BufferGeometry | null {
  if (!buildings.length) return null;
  const geos = buildings.map(createBuildingGeometry);
  const merged = mergeGeometries(geos, false);
  geos.forEach((g) => g.dispose());
  return merged;
}

/** 由建筑数组构建 BVH */
export function buildBvhFromBuildings(buildings: Building[]): {
  geometry: THREE.BufferGeometry;
  bvh: MeshBVH;
} | null {
  const geometry = mergeBuildingGeometries(buildings);
  if (!geometry) return null;
  const bvh = new MeshBVH(geometry, { maxLeafTris: 10 });
  return { geometry, bvh };
}

/** 建筑包围范围（x/z），无建筑时返回 null */
export function buildingsBounds(buildings: Building[]) {
  if (!buildings.length) return null;
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (const b of buildings) {
    for (const [x, z] of b.footprint) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    }
  }
  return { minX, maxX, minZ, maxZ };
}
