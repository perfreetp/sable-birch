import { useStore, store, toast } from '../lib/store.ts';
import type { SceneController } from '../lib/sceneController.ts';

interface Props {
  controller: () => SceneController | null;
}

export function ViewportOverlays({ controller }: Props) {
  const tool = useStore(s => s.tool);
  const rotateAxis = useStore(s => s.rotateAxis);
  const pair = useStore(s => s.neighborPair);
  const showDist = useStore(s => s.showNeighborDistance);
  const selected = useStore(s => s.selected);
  const instances = useStore(s => s.instances);
  const globalOpacity = useStore(s => s.globalOpacity);
  const shards = useStore(s => s.shards);
  const activeReport = useStore(s => s.activeReport);
  const reports = useStore(s => s.reports);
  const mergedVisible = useStore(s => s.mergedVisible);

  const nearName = pair ? [instances[pair.a]?.name, instances[pair.b]?.name].filter(Boolean).join(' ↔ ') : '';

  return (
    <>
      <div className="viewport-toolbar">
        <div className="toolgroup">
          {([
            ['select', '选择', 'Q'],
            ['move', '平移', 'W'],
            ['rotate', '旋转', 'E'],
            ['align', '点选', ''],
          ] as const).map(([mode, label, key]) => (
            <button
              key={mode}
              className={`btn ${tool === mode ? 'active' : ''}`}
              title={key ? `${label}（${key}）` : label}
              onClick={() => {
                if (mode === 'align') {
                  store.setState({ tool: 'align' });
                  const st = store.getState();
                  if (st.selected && st.compareId) {
                    controller()?.startPicking({ role: 'fixed', index: 0 });
                  } else {
                    toast('请先在左侧指定固定片（对照片）与当前选中的移动片', 'info');
                  }
                } else {
                  store.setState({ tool: mode });
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {(tool === 'rotate' || tool === 'move') && (
          <div className="toolgroup">
            {(['x', 'y', 'z'] as const).map(a => (
              <button
                key={a}
                className={`btn ${rotateAxis === a ? 'active' : ''}`}
                title={`限制为 ${a.toUpperCase()} 轴`}
                onClick={() => store.setState({ rotateAxis: a })}
              >
                {a.toUpperCase()}
              </button>
            ))}
            <span className="hint" style={{ padding: '4px 6px', margin: 0 }}>
              {tool === 'rotate' ? '0.5° 吸附' : '1 mm 吸附'}
            </span>
          </div>
        )}

        <div className="toolgroup">
          <button className="btn" title="取景全部（R）" onClick={() => controller()?.frameAll()}>全览</button>
          {(['iso', 'front', 'top'] as const).map(v => (
            <button
              key={v}
              className="btn"
              onClick={() => controller()?.setView(v)}
              title={{ iso: '轴测视图', front: '正视图', top: '俯视图' }[v]}
            >
              {{ iso: '轴测', front: '正视', top: '俯视' }[v]}
            </button>
          ))}
        </div>

        <div className="toolgroup">
          <button
            className={`btn ${showDist ? 'active' : ''}`}
            onClick={() => store.setState({ showNeighborDistance: !showDist })}
            title="开关拖动时的最近距离探针"
          >
            距离探针
          </button>
          <button
            className={`btn ${globalOpacity < 0.99 ? 'active' : ''}`}
            onClick={() => {
              store.setState({ globalOpacity: globalOpacity < 0.99 ? 1 : 0.45 });
            }}
            title="切换 X 光透视（全局半透明）"
          >
            透视
          </button>
          {reports.length > 0 && activeReport && (
            <button
              className="btn"
              onClick={() => {
                if (!mergedVisible) {
                  store.setState({ mergedVisible: true });
                  controller()?.showMerged(true);
                }
                controller()?.frameMerged();
              }}
              title="取景合并结果"
            >
              取景结果
            </button>
          )}
          {reports.length > 0 && (
            <button
              className={`btn ${mergedVisible ? 'active' : ''}`}
              onClick={() => store.setState({ mergedVisible: !mergedVisible })}
              title="显示/隐藏合并后的网格"
            >
              合并网格
            </button>
          )}
        </div>
      </div>

      <div className="viewport-hint">
        <div><kbd>左键拖拽</kbd> 旋转视角</div>
        <div><kbd>右键/中键</kbd> 平移 / 缩放</div>
        <div><kbd>← →</kbd> 微调 1mm / 0.5°</div>
        <div><kbd>1 2 3</kbd> 切换旋转轴</div>
      </div>

      <div className="viewport-hud">
        <div className="hud-card hud-distance">
          <div>
            <div className="label">最近距离</div>
            <div className="value" style={{ color: pair && pair.distance < 0.5 ? 'var(--teal)' : 'var(--accent-strong)' }}>
              {showDist && pair ? pair.distance.toFixed(2) : '—'}
              <span className="unit"> mm</span>
            </div>
          </div>
          {showDist && pair && (
            <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 10 }}>
              <div className="hud-pill">
                <span className="dot" style={{ background: '#5ee0b0' }} />
                {nearName}
              </div>
              <div className="hud-pill" style={{ marginTop: 2, color: 'var(--text-faint)' }}>
                实时测距 · 拖动时更新
              </div>
            </div>
          )}
        </div>

        <div className="hud-card" style={{ padding: '6px 10px' }}>
          <div className="hud-pill" style={{ gap: 10 }}>
            <span>{shards.length} 片</span>
            <span style={{ color: 'var(--text-faint)' }}>·</span>
            <span>{selected ? instances[selected]?.name : '未选择'}</span>
          </div>
        </div>
      </div>
    </>
  );
}
