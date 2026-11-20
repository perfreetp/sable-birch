import { get } from 'svelte/store';
import {
  material,
  envIndex,
  modelName,
  setStatus
} from './store.js';

const FILE_TAG = 'evtol-livery-studio';
const FILE_VERSION = 1;

function u8ToBase64(u8) {
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < u8.length; i += chunk) {
    bin += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
  }
  return btoa(bin);
}

function base64ToU8(b64) {
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8;
}

/** 导出:分色遮罩 + 材质参数 + 分区 → 涂装文件(JSON) */
export function exportLivery(viewer) {
  const { paintables } = viewer.getLiveryData();
  if (!paintables.length) {
    setStatus('当前没有可涂装的部件,无法导出');
    return;
  }
  const paint = {};
  const zones = {};
  for (const p of paintables) {
    zones[p.name] = p.zone;
    // 仅导出有遮罩数据的部件,减小文件体积
    if (p.mask.some((v) => v !== 0)) {
      paint[p.name] = {
        verts: p.mask.length,
        mask: u8ToBase64(p.mask),
        colors: u8ToBase64(p.paintCol)
      };
    }
  }
  const data = {
    app: FILE_TAG,
    version: FILE_VERSION,
    savedAt: new Date().toISOString(),
    model: get(modelName),
    material: get(material),
    env: get(envIndex),
    zones,
    paint
  };
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
  a.href = url;
  a.download = `evtol-livery-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
  setStatus(`涂装文件已导出(${Object.keys(paint).length} 个部件含漆面数据)`);
}

/** 导入涂装文件:还原全部漆面遮罩、分区与材质参数 */
export async function importLivery(file, viewer) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    setStatus('涂装文件解析失败:不是有效的 JSON', 5000);
    return;
  }
  if (data.app !== FILE_TAG) {
    setStatus('涂装文件格式不匹配', 5000);
    return;
  }
  // 还原材质参数与环境
  if (data.material) material.set({ ...get(material), ...data.material });
  if (typeof data.env === 'number') envIndex.set(data.env);

  // 还原遮罩(按部件名 + 顶点数校验)
  const paint = {};
  for (const [name, rec] of Object.entries(data.paint || {})) {
    paint[name] = {
      verts: rec.verts,
      mask: base64ToU8(rec.mask),
      paintCol: base64ToU8(rec.colors)
    };
  }
  const { restored, skipped } = viewer.applyLivery({ paint, zones: data.zones });
  let msg = `涂装文件已导入:还原 ${restored} 个部件漆面`;
  if (skipped) msg += `,${skipped} 个部件因顶点数不匹配被跳过`;
  setStatus(msg, 5000);
}
