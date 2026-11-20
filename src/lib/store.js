import { writable, get } from 'svelte/store';

// ---------- 常量 ----------
export const MODULES = [
  { id: 'import', label: '模型导入' },
  { id: 'paint', label: '分区绘制' },
  { id: 'material', label: '材质调校' }
];

export const ZONES = [
  { id: 'fuselage', label: '机身', color: '#4da3ff' },
  { id: 'wing', label: '机翼', color: '#ffb84d' },
  { id: 'door', label: '舱门', color: '#6dffa8' }
];

export const METALNESS_STEPS = [0, 0.25, 0.5, 0.75, 1];
export const ROUGHNESS_STEPS = [0.1, 0.3, 0.5, 0.7, 0.9];
export const BRUSH_RADII = [0.12, 0.3, 0.65]; // 3 档笔刷半径(世界单位,会随模型缩放)
export const BRUSH_LABELS = ['细', '中', '粗'];

export const ENVIRONMENTS = [
  { id: 0, label: '室内机库' },
  { id: 1, label: '户外夕阳' }
];

export const DISPLAY_MODES = [
  { id: 'solid', label: '实体' },
  { id: 'wireframe', label: '线框' },
  { id: 'normal', label: '法线' }
];

// ---------- 浏览器持久化(材质配置) ----------
const LS_KEY = 'evtol-livery-config-v1';

function loadPersisted() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || {};
  } catch {
    return {};
  }
}
const persisted = typeof localStorage !== 'undefined' ? loadPersisted() : {};

// ---------- Stores ----------
export const activeModule = writable('import');

export const material = writable(
  persisted.material ?? {
    primer: '#8a8f94', // 底漆颜色
    metalness: 3, // 金属漆金属度档位 0-4
    roughness: 1, // 金属漆粗糙度档位 0-4
    clearcoat: 0.8, // 清漆厚度 0-1
    clearcoatGloss: 0.75 // 清漆光泽 0-1
  }
);

export const envIndex = writable(persisted.envIndex ?? 0);
export const displayMode = writable(persisted.displayMode ?? 'solid');
export const brushSize = writable(persisted.brushSize ?? 1);

export const activeZone = writable('fuselage');
export const paintColor = writable('#c8102e');
export const eraseMode = writable(false);

export const meshList = writable([]); // [{name, zone, paintable, verts}]
export const modelName = writable('');
export const statusMsg = writable('');

if (typeof localStorage !== 'undefined') {
  const save = () => {
    const cfg = {
      material: get(material),
      envIndex: get(envIndex),
      displayMode: get(displayMode),
      brushSize: get(brushSize)
    };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(cfg));
    } catch {
      /* 存储满或不可用时忽略 */
    }
  };
  [material, envIndex, displayMode, brushSize].forEach((s) => s.subscribe(save));
}

// ---------- 状态提示 ----------
let statusTimer = null;
export function setStatus(msg, ms = 3200) {
  statusMsg.set(msg);
  if (statusTimer) clearTimeout(statusTimer);
  if (ms > 0) statusTimer = setTimeout(() => statusMsg.set(''), ms);
}
