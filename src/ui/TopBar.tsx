import { useStore } from '../store/context';
import { Button } from './controls';
import { parseBuildings, readFileAsText } from '../lib/importer';
import { createSampleCity } from '../lib/sampleCity';
import { exportBuildings } from '../lib/export';
import { storage } from '../lib/storage';

export function TopBar() {
  const store = useStore();

  const importFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const text = await readFileAsText(file);
      const buildings = parseBuildings(text);
      store.setBuildings(buildings);
    } catch (err) {
      alert(`建筑导入失败：${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const loadSample = () => {
    store.setBuildings(createSampleCity());
    if (!store.state.observers.length) {
      // 放在城市北侧外缘，朝南俯瞰城区，宽视场便于演示遮挡渐变
      store.addObserver({ x: 0, z: -520, yaw: 180, fov: 120, pitchUp: 75, pitchDown: -20 });
    }
  };

  const clearAll = () => {
    if (!confirm('确认清除浏览器中保存的建筑体块、观察点与设置？此操作不可撤销。')) return;
    store.clearStorage();
    location.reload();
  };

  const storageKb = () => (storage.usedBytes() / 1024).toFixed(0);

  return (
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark">◈</span>
        <div>
          <h1>城市建筑遮挡评估工具</h1>
          <p class="brand-sub">空域规划 · 视线遮挡分析 · SolidJS + three.js + BVH</p>
        </div>
      </div>
      <div class="topbar-actions">
        <label class="btn btn-primary">
          导入建筑 JSON
          <input
            type="file"
            accept=".json,application/json"
            style={{ display: 'none' }}
            onChange={(e) => {
              void importFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </label>
        <Button onClick={loadSample}>加载示例城市</Button>
        <Button
          onClick={() => exportBuildings(store.state.buildings)}
          disabled={!store.state.buildings.length}
        >
          导出建筑
        </Button>
        <div class="display-switch">
          {(['solid', 'transparent'] as const).map((mode) => (
            <button
              class="seg"
              classList={{ active: store.state.displayMode === mode }}
              onClick={() => store.setDisplayMode(mode)}
            >
              {mode === 'solid' ? '实体' : '半透明'}
            </button>
          ))}
        </div>
        <span class="storage-info" title="浏览器 localStorage 占用估算">
          本地存储 {storageKb()} KB
        </span>
        <Button variant="danger" onClick={clearAll}>
          清空数据
        </Button>
      </div>
    </header>
  );
}
