import { createEffect, onCleanup, onMount } from 'solid-js';
import { useStore } from '../store/context';
import { SceneEngine } from '../three/SceneEngine';
import { TopBar } from './TopBar';
import { ObserverModule } from './modules/ObserverModule';
import { ComputeModule } from './modules/ComputeModule';
import { LayerModule } from './modules/LayerModule';
import { LegendBar } from './LegendBar';

export function App() {
  const store = useStore();
  let viewportRef: HTMLDivElement | undefined;
  let engine: SceneEngine | undefined;

  onMount(() => {
    engine = new SceneEngine(viewportRef!);
    store.getBvh = () => engine!.getBvh();

    // 初始加载（含本地持久化数据）
    engine.setDisplayMode(store.state.displayMode);
    const bvh = engine.setBuildings(store.state.buildings);
    engine.setRegion(store.state.region);
    engine.setObservers(store.state.observers);
    if (bvh && store.state.observers.length) void store.runCompute();

    engine.onObserverDrag = ({ observerId, x, z }) => {
      store.updateObserver(observerId, { x, z });
      engine!.updateObserver(store.state.observers.find((o) => o.id === observerId)!);
    };
    engine.onObserverSelect = (id) => {
      store.selectObserver(id);
      if (id) store.setActiveModule('observers');
    };

    // 建筑变化（导入/示例/清空）-> 重建几何与 BVH
    createEffect(() => {
      const buildings = store.state.buildings;
      if (!engine) return;
      const bvh = engine.setBuildings(buildings);
      store.getBvh = () => engine!.getBvh();
      void bvh;
    });

    // 观察点结构变化（增删/替换）-> 场景对象全量重建
    createEffect(() => {
      const signature = store.state.observers.map((o) => o.id).join('|');
      if (!engine) return;
      engine.setObservers(store.state.observers);
      engine.setSelectedObserver(store.state.selectedObserverId);
      void signature;
    });

    // 单个观察点属性变化（拖拽 / 面板编辑）-> 仅更新对应对象
    createEffect(() => {
      const json = JSON.stringify(store.state.observers);
      const selected = store.state.selectedObserverId;
      if (!engine) return;
      const list = JSON.parse(json) as typeof store.state.observers;
      list.forEach((o) => engine!.updateObserver(o));
      engine.setSelectedObserver(selected);
    });

    // 采样点（引用变化即全量重建，含最新着色）
    createEffect(() => {
      engine?.setSamples(store.state.samples, store.state.layers);
    });
    createEffect(() => {
      engine?.setLayerVisibility(store.state.layers);
    });
    createEffect(() => {
      engine?.setDisplayMode(store.state.displayMode);
    });
    createEffect(() => {
      engine?.setRegion(store.state.region);
    });
    createEffect(() => {
      engine?.setSelectedObserver(store.state.selectedObserverId);
    });

    onCleanup(() => engine?.dispose());
  });

  return (
    <div class="app-shell">
      <TopBar />
      <div class="app-body">
        <aside class="sidebar">
          <nav class="module-tabs">
            <button
              class="tab"
              classList={{ active: store.state.activeModule === 'observers' }}
              onClick={() => store.setActiveModule('observers')}
            >
              <span class="tab-index">1</span>观察点设置
            </button>
            <button
              class="tab"
              classList={{ active: store.state.activeModule === 'compute' }}
              onClick={() => store.setActiveModule('compute')}
            >
              <span class="tab-index">2</span>遮挡计算
            </button>
            <button
              class="tab"
              classList={{ active: store.state.activeModule === 'layers' }}
              onClick={() => store.setActiveModule('layers')}
            >
              <span class="tab-index">3</span>分层查看
            </button>
          </nav>
          <div class="module-panel">
            {store.state.activeModule === 'observers' && <ObserverModule />}
            {store.state.activeModule === 'compute' && <ComputeModule />}
            {store.state.activeModule === 'layers' && <LayerModule />}
          </div>
        </aside>
        <main class="viewport-wrap">
          <div ref={viewportRef} class="viewport" />
          <button
            class="reset-view-btn"
            title="重置相机到全景视角"
            onClick={() => engine?.frameView()}
          >
            ⤢ 回到全景
          </button>
          <LegendBar />
          <div class="viewport-hint">左键旋转 · 右键平移 · 滚轮缩放 · 拖拽橙色观察点可移动</div>
        </main>
      </div>
    </div>
  );
}
