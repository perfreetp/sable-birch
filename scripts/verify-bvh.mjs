// 验证 SceneManager 中使用的 three-mesh-bvh 调用方式:
// closestPointToGeometry(局部几何+矩阵) 与 shapecast 包络穿透收集
import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';

// 静态障碍: 10x10x10 盒子, 中心在原点
const staticGeom = new THREE.BoxGeometry(10, 10, 10).toNonIndexed();
const staticBVH = new MeshBVH(staticGeom);

// 吊具: 12.192 x 0.9 x 2.438, 局部坐标
const spreaderGeom = new THREE.BoxGeometry(12.192, 0.9, 2.438);
spreaderGeom.boundsTree = new MeshBVH(spreaderGeom);

function check(px, py, pz, rotDeg, threshold) {
  const m = new THREE.Matrix4()
    .makeRotationY(THREE.MathUtils.degToRad(rotDeg))
    .setPosition(px, py, pz);
  const t1 = { point: new THREE.Vector3() };
  const t2 = { point: new THREE.Vector3() };
  const hit = staticBVH.closestPointToGeometry(spreaderGeom, m, t1, t2);
  const dist = hit ? hit.distance : Infinity;

  // 包络穿透: 吊具外扩 threshold 的 OBB
  const localBox = new THREE.Box3(
    new THREE.Vector3(-12.192 / 2 - threshold, -0.45 - threshold, -2.438 / 2 - threshold),
    new THREE.Vector3(12.192 / 2 + threshold, 0.45 + threshold, 2.438 / 2 + threshold),
  );
  const inv = m.clone().invert();
  const worldBox = localBox.clone().applyMatrix4(m);
  const hitTris = [];
  const tmp = new THREE.Triangle();
  staticBVH.shapecast({
    intersectsBounds: (box) => box.intersectsBox(worldBox),
    intersectsTriangle: (tri, idx) => {
      tmp.a.copy(tri.a).applyMatrix4(inv);
      tmp.b.copy(tri.b).applyMatrix4(inv);
      tmp.c.copy(tri.c).applyMatrix4(inv);
      if (tmp.intersectsBox(localBox)) hitTris.push(idx);
      return false;
    },
  });
  return { dist, hits: hitTris.length };
}

// 场景1: 吊具在障碍物正上方 3m 净空 (盒顶 y=5, 吊具底 y=8-0.45=7.55 -> 距离 2.55)
const r1 = check(0, 8, 0, 0, 0.5);
console.log('case1 expect dist≈2.55, hits=0 ->', r1.dist.toFixed(3), r1.hits);

// 场景2: 吊具底面贴到盒顶上方 0.3m -> 距离 0.3, 阈值 0.5 -> 有穿透面
const r2 = check(0, 5 + 0.45 + 0.3, 0, 0, 0.5);
console.log('case2 expect dist≈0.30, hits>0 ->', r2.dist.toFixed(3), r2.hits);

// 场景3: 吊具嵌入盒子 -> 距离 0, 穿透
const r3 = check(0, 5, 0, 0, 0.5);
console.log('case3 expect dist=0, hits>0 ->', r3.dist.toFixed(3), r3.hits);

// 场景4: 远离 (x=50) -> 距离很大, 无穿透
const r4 = check(50, 8, 0, 0, 0.5);
console.log('case4 expect dist≈43.9, hits=0 ->', r4.dist.toFixed(3), r4.hits);

// 场景5: 回转 45 度后角部接近盒子 (盒子边 x=5, 吊具半长 6.096)
// 吊具中心 x=10.5, 旋转45° -> 角点 x 向延伸 6.096*cos45+1.219*sin45 ≈ 5.17 -> 角点 x≈5.33 > 5 不穿
const r5 = check(10.5, 0.45 + 0.2, 0, 45, 0.5);
console.log('case5 rotated, expect small dist>0 ->', r5.dist.toFixed(3), r5.hits);
