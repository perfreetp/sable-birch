import type { Building } from '../types';
import { uid } from './id';

/**
 * 生成内置示例城市：网格街区 + 随机高底层混合，
 * 让工具在未导入数据时也能直接演示完整流程。
 */
export function createSampleCity(): Building[] {
  const buildings: Building[] = [];
  const block = 120; // 街区尺寸
  const road = 30; // 道路宽度
  const pitch = block + road;
  const n = 6; // 6 x 6 街区
  const origin = -(n * pitch) / 2;

  // 可复现的伪随机（线性同余）
  let seed = 20261121;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cx = origin + i * pitch + block / 2;
      const cz = origin + j * pitch + block / 2;
      // 每个街区 2~4 栋
      const count = 2 + Math.floor(rand() * 3);
      for (let k = 0; k < count; k++) {
        const w = 25 + rand() * 45;
        const d = 25 + rand() * 45;
        const ox = (rand() - 0.5) * (block - w);
        const oz = (rand() - 0.5) * (block - d);
        const x0 = cx + ox - w / 2;
        const z0 = cz + oz - d / 2;
        // 中心区域更高，模拟 CBD
        const distToCenter = Math.hypot(i - (n - 1) / 2, j - (n - 1) / 2);
        const cbdFactor = Math.max(0, 1 - distToCenter / (n / 1.4));
        const height = Math.round(15 + rand() * 40 + cbdFactor * (80 + rand() * 140));
        buildings.push({
          id: uid('b'),
          name: `B${i + 1}-${j + 1}-${k + 1}`,
          footprint: [
            [x0, z0],
            [x0 + w, z0],
            [x0 + w, z0 + d],
            [x0, z0 + d]
          ],
          height
        });
      }
    }
  }

  // CBD 地标超高层
  const c = origin + (n * pitch) / 2;
  buildings.push({
    id: uid('b'),
    name: '地标塔',
    footprint: [
      [c - 30, c - 30],
      [c + 30, c - 30],
      [c + 30, c + 30],
      [c - 30, c + 30]
    ],
    height: 320
  });

  return buildings;
}
