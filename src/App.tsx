import { useCallback, useEffect, useRef, useState } from 'react';
import { SceneController } from './lib/sceneController.ts';
import { useStore, toast } from './lib/store.ts';
import { TopBar } from './components/TopBar.tsx';
import { ShardPanel } from './components/ShardPanel.tsx';
import { ViewportOverlays } from './components/ViewportOverlays.tsx';
import { SeamPanel } from './components/SeamPanel.tsx';
import { Toast } from './components/Toast.tsx';
import { loadDemoScene } from './lib/loadDemo.ts';
import { setupKeyboard } from './lib/keyboard.ts';
import { mergeShards } from './lib/merge.ts';

let demoLoadedOnce = false;

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SceneController | null>(null);
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  const picking = useStore(s => s.pickingSlot);
  const mergeStatus = useStore(s => s.mergeStatus);
  const shards = useStore(s => s.shards);

  useEffect(() => {
    if (!containerRef.current) return;
    let controller: SceneController | null = null;
    try {
      controller = new SceneController(containerRef.current);
      controllerRef.current = controller;
      setReady(true);
    } catch (err) {
      console.error(err);
      setInitError(err instanceof Error ? err.message : String(err));
    }
    return () => {
      controller?.dispose();
      controllerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      // 只在首次进入时自动加载示例（避免 StrictMode 二次挂载重复加载）
      if (demoLoadedOnce) return;
      demoLoadedOnce = true;
      try {
        await loadDemoScene();
        if (cancelled) return;
        const ctrl = controllerRef.current;
        if (!ctrl) return;
        requestAnimationFrame(() => ctrl.frameAll());
        toast('已载入示例陶俑残片，可用「对照原位」查看复原结果', 'info');
      } catch (err) {
        demoLoadedOnce = false;
        console.error(err);
        toast(`示例数据加载失败：${err instanceof Error ? err.message : String(err)}`, 'error');
      }
    })();
    return () => { cancelled = true; };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    return setupKeyboard(() => controllerRef.current);
  }, [ready]);

  const handleMerge = useCallback(async () => {
    const st = useStore.getState();
    const ids = st.order.filter(id => st.instances[id] && !st.instances[id].mergedInto && st.instances[id].visible);
    if (ids.length < 2) {
      toast('请至少显示两片残片后再合并', 'error');
      return;
    }
    await mergeShards({
      ids,
      gapCaptureRadius: st.gapSettings.captureRadius,
      gapThreshold: st.gapSettings.threshold,
      abortOnSelfIntersection: true,
    });
  }, []);

  return (
    <div className="app">
      <TopBar onMerge={handleMerge} />
      <div className="app-body">
        <aside className="panel panel-left">
          <ShardPanel controller={() => controllerRef.current} />
        </aside>

        <main className="viewport">
          <div ref={containerRef} className="viewport-canvas" />
          {initError && (
            <div className="viewport-fallback">
              <div>
                <strong>无法初始化三维视口</strong>
                <p className="hint">{initError}</p>
                <p className="hint">请确认浏览器已启用 WebGL2。</p>
              </div>
            </div>
          )}
          <ViewportOverlays controller={() => controllerRef.current} />
          {mergeStatus.running && (
            <div className="busy-overlay">
              <div className="busy-card">
                <div className="spinner" />
                <div style={{ fontWeight: 600 }}>{mergeStatus.stage || '处理中…'}</div>
                <div className="hint" style={{ margin: 0 }}>实体布尔运算在后台线程执行</div>
              </div>
            </div>
          )}
          {picking && (
            <div className="picking-banner">
              <span className="dot" style={{ background: picking.role === 'fixed' ? '#ffb347' : '#4de0c0' }} />
              <span>
                正在点选{picking.role === 'fixed' ? '固定片' : '移动片'}第 {picking.index + 1} / 3 个断口对应点
              </span>
              <button className="btn tiny ghost" onClick={() => controllerRef.current?.cancelPicking()}>
                取消
              </button>
            </div>
          )}
          {shards.length === 0 && ready && (
            <div className="viewport-fallback" style={{ pointerEvents: 'none' }}>
              <div>
                <div style={{ fontSize: 15, marginBottom: 6 }}>视口为空</div>
                <div className="hint">从顶部导入 STL/OBJ 残片，或载入示例数据</div>
              </div>
            </div>
          )}
        </main>

        <aside className="panel panel-right">
          <SeamPanel controller={() => controllerRef.current} />
        </aside>
      </div>
      <Toast />
    </div>
  );
}
