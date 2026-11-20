import type { Building, BuildingFile, Observer, ObserverFile } from '../types';
import { uid } from './id';

export class ImportError extends Error {}

/** 校验并规范化建筑数据 */
export function parseBuildings(raw: unknown): Building[] {
  const data = (typeof raw === 'string' ? JSON.parse(raw) : raw) as BuildingFile | BuildingFile['buildings'];
  const list = Array.isArray(data) ? data : data?.buildings;
  if (!Array.isArray(list) || list.length === 0) {
    throw new ImportError('文件中未找到 buildings 数组（或数组为空）');
  }

  return list.map((b, idx) => {
    if (!Array.isArray(b.footprint) || b.footprint.length < 3) {
      throw new ImportError(`第 ${idx + 1} 栋建筑 footprint 至少需要 3 个顶点`);
    }
    if (typeof b.height !== 'number' || b.height <= 0) {
      throw new ImportError(`第 ${idx + 1} 栋建筑 height 必须为正数`);
    }
    const footprint = b.footprint.map((p) => {
      if (!Array.isArray(p) || p.length < 2 || p.some((v) => typeof v !== 'number')) {
        throw new ImportError(`第 ${idx + 1} 栋建筑 footprint 顶点格式应为 [x, z]`);
      }
      return [p[0], p[1]] as [number, number];
    });
    return {
      id: uid('b'),
      name: b.name ?? `建筑${idx + 1}`,
      footprint,
      holes: b.holes?.map((h) =>
        h.map((p) => [p[0], p[1]] as [number, number])
      ),
      height: b.height,
      baseHeight: b.baseHeight ?? 0
    } satisfies Building;
  });
}

/** 校验观察点配置 */
export function parseObservers(raw: unknown): Observer[] {
  const data = (typeof raw === 'string' ? JSON.parse(raw) : raw) as ObserverFile | Observer[];
  const list = Array.isArray(data) ? data : data?.observers;
  if (!Array.isArray(list)) {
    throw new ImportError('文件中未找到 observers 数组');
  }
  return list.map((o, idx) => {
    if (typeof o.x !== 'number' || typeof o.z !== 'number') {
      throw new ImportError(`第 ${idx + 1} 个观察点缺少 x/z 坐标`);
    }
    return {
      id: o.id ?? uid('obs'),
      name: o.name ?? `观察点${idx + 1}`,
      x: o.x,
      z: o.z,
      eyeHeight: o.eyeHeight ?? 1.6,
      yaw: o.yaw ?? 0,
      fov: o.fov ?? 90,
      pitchUp: o.pitchUp ?? 60,
      pitchDown: o.pitchDown ?? -10,
      enabled: o.enabled ?? true
    } satisfies Observer;
  });
}

/** 读取本地文件为文本 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new ImportError('文件读取失败'));
    reader.readAsText(file);
  });
}
