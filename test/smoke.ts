/**
 * 核心算法冒烟测试（Node 环境，不含 DOM/three 渲染）：
 * 1. 建筑挤出几何体的坐标轴/高度方向
 * 2. BVH 射线求交：被建筑遮挡 vs 越过屋顶可见
 * 3. 视场锥判定
 * 4. 采样生成数量与上限保护
 * 5. 分层统计
 */
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { buildBvhFromBuildings, createBuildingGeometry } from '../src/lib/geometry';
import { computeOcclusion, isInFov } from '../src/lib/occlusion';
import { generateSamples, defaultLayers } from '../src/lib/sampling';
import { computeLayerStats } from '../src/lib/stats';
import type { Building, Observer, SampleResult } from '../src/types';

const boxBuilding: Building = {
  id: 'b1',
  footprint: [
    [0, 0],
    [20, 0],
    [20, 20],
    [0, 20]
  ],
  height: 100
};

// 1. 挤出几何：x/z 保持底面范围，y 为高度方向
const geo = createBuildingGeometry(boxBuilding);
geo.computeBoundingBox();
const b = geo.boundingBox!;
const approx = (actual: number, expected: number, message: string, tol = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${message}：期望 ${expected}，实际 ${actual}`);
approx(b.min.x, 0, 'x 下限');
approx(b.max.x, 20, 'x 上限');
approx(b.min.y, 0, 'y 从地面起');
approx(b.max.y, 100, 'y 为建筑高度');
approx(b.min.z, 0, 'z 下限');
approx(b.max.z, 20, 'z 上限');
geo.dispose();
console.log('✓ 挤出几何体坐标轴与高度方向正确');

// 2. BVH 求交
const built = buildBvhFromBuildings([boxBuilding])!;
assert.ok(built, 'BVH 构建成功');

const observer: Observer = {
  id: 'o1',
  name: 't',
  x: 10,
  z: 50, // 建筑北侧，朝南（+Z 方向？否：yaw=0 朝北 -Z；建筑在 z=0..20，观察点 z=50，视线方向 -Z）
  eyeHeight: 1.6,
  yaw: 0,
  fov: 90,
  pitchUp: 90,
  pitchDown: -90,
  enabled: true
};

function makeSample(x: number, y: number, z: number): SampleResult {
  return { x, y, z, layerId: 0, occlusion: 0, inFov: false, hitObservers: 0, totalObservers: 0 };
}

// 观察点距建筑近端 30m。穿楼目标仰角 40°（近端高度 ~26.8m < 100m 屋顶）；
// 越顶目标需保证近端 (z=20) 高度 ≥ 100m：斜率 (100-1.6)/30 ≈ 3.28，取 y=330
const lowTarget = makeSample(10, 85.4, -50);
const highTarget = makeSample(10, 330, -50);

await computeOcclusion(built.bvh, [observer], [lowTarget, highTarget], { yieldStep: 1 });
assert.equal(lowTarget.inFov, true, '低目标在视场内');
assert.equal(lowTarget.hitObservers, 1, '低目标被建筑遮挡');
assert.equal(lowTarget.occlusion, 1, '单观察点完全遮挡 = 1');
assert.equal(highTarget.hitObservers, 0, '高目标越过屋顶可见');
assert.equal(highTarget.occlusion, 0, '高目标遮挡程度 = 0');
console.log('✓ BVH 射线求交：遮挡/可见判定正确');

// 侧面绕行目标：从建筑东侧（+X）外经过，约 45° 方位
const sideTarget = makeSample(60, 10, 0);
await computeOcclusion(built.bvh, [observer], [sideTarget], { yieldStep: 1 });
assert.equal(sideTarget.inFov, true, '侧向目标在 90° 视场内');
assert.equal(sideTarget.hitObservers, 0, '侧向绕行不被遮挡');
console.log('✓ 侧向视线绕行正确');

// 3. 视场锥
const north = makeSample(10, 10, -100); // 正北 -Z
const south = makeSample(10, 10, 100); // 正南 +Z（观察点背后）
const east = makeSample(60, 10, 0); // 相对观察点 dx=50, dz=-50，恰为东偏北 45°
assert.equal(isInFov({ ...observer, fov: 90 }, north), true, '正北在 90° 视场内');
assert.equal(isInFov({ ...observer, fov: 90 }, south), false, '正南不在视场内');
assert.equal(isInFov({ ...observer, fov: 90 }, east), true, '东偏北 45° 在 90° 视场内');
assert.equal(isInFov({ ...observer, fov: 30 }, east), false, '东偏北不在 30° 窄视场内');
const above = makeSample(10, 200, 0);
assert.equal(
  isInFov({ ...observer, pitchUp: 30 }, above),
  false,
  '超出垂直上仰角的目标被剔除'
);
console.log('✓ 水平/垂直视场锥判定正确');

// 禁用观察点不参与
const disabled = { ...observer, enabled: false };
const s4 = makeSample(10, 85.4, -50);
void s4;
await computeOcclusion(built.bvh, [disabled], [s4], { yieldStep: 1 });
assert.equal(s4.inFov, false, '禁用观察点不产生视场样本');
console.log('✓ 禁用观察点正确跳过');

// 4. 采样生成
const layers = defaultLayers();
const generated = generateSamples(
  { minX: 0, maxX: 100, minZ: 0, maxZ: 100 },
  layers,
  'coarse' // 50m
);
// 每层 3x3 = 9，共 5 层
assert.equal(generated.gridCount, 9, '单层网格 3×3');
assert.equal(generated.samples.length, 45, '5 层共 45 个采样点');
assert.equal(generated.samples[0].y, 30, '第一层采样高度为层高中点 30m');
const fine = generateSamples({ minX: 0, maxX: 3000, minZ: 0, maxZ: 3000 }, layers, 'fine');
assert.equal(fine.truncated, true, '超上限触发稀疏化保护');
assert.ok(fine.samples.length <= 300_000, '稀疏化后不超过上限');
console.log('✓ 采样网格生成与上限保护正确');

// 5. 分层统计
const stats = computeLayerStats(generated.samples, layers);
assert.equal(stats.length, 5, '输出 5 层统计');
for (const st of stats) {
  assert.equal(st.totalSamples, 9);
  assert.equal(st.inFovSamples, 0);
  assert.equal(st.occlusionRate, 0, '无视场样本时遮挡率为 0');
}
console.log('✓ 分层统计结构正确');

console.log('\n全部冒烟测试通过 ✅');
