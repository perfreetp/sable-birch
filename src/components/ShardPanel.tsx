import React, { useEffect, useState } from 'react';
import {
  useStore, store, selectShard, setCompare, setShardProp, setPose, removeShards,
  nudgePose, toast,
} from '../lib/store.ts';
import { pushPoses, undoPoses, subscribeHistory } from '../lib/history.ts';
import type { SceneController } from '../lib/sceneController.ts';
import { showMerged } from '../lib/sceneController.ts';
import { snapAngle, snapTranslation } from '../lib/transform.ts';
import type { Vec3 } from '../lib/types.ts';

interface Props {
  controller: () => SceneController | null;
}

function Section({ title, badge, children, defaultOpen = true }: {
  title: string; badge?: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="section">
      <button className="section-head" onClick={() => setOpen(o => !o)}>
        <span className={`chev ${open ? 'open' : ''}`}>▶</span>
        {title}
        {badge !== undefined && <span className="badge">{badge}</span>}
      </button>
      {open && <div className="section-body">{children}</div>}
    </div>
  );
}

export function ShardPanel({ controller }: Props) {
  const shards = useStore(s => s.shards);
  const instances = useStore(s => s.instances);
  const order = useStore(s => s.order);
  const selected = useStore(s => s.selected);
  const compareId = useStore(s => s.compareId);
  const tool = useStore(s => s.tool);
  const rotateAxis = useStore(s => s.rotateAxis);
  const globalOpacity = useStore(s => s.globalOpacity);
  const picking = useStore(s => s.pickingSlot);
  const alignment = useStore(s => s.alignment);
  const alignNormalOffset = useStore(s => s.alignNormalOffset);
  const reports = useStore(s => s.reports);
  const mergedVisible = useStore(s => s.mergedVisible);
  const [histDepth, setHistDepth] = useState(0);
  const hasMerge = reports.length > 0;

  useEffect(() => {
    const unsub = subscribeHistory(setHistDepth);
    return () => { unsub(); };
  }, []);

  const allShards = order.filter(id => instances[id]);
  const visibleShards = allShards.filter(id => !instances[id].mergedInto);
  const srcById = new Map(shards.map(s => [s.id, s]));
  const sel = selected ? instances[selected] : null;
  const selSource = selected ? srcById.get(selected) : null;

  return (
    <div className="panel-scroll">
      <Section title="残片列表" badge={`${visibleShards.length} / ${allShards.length} 片`}>
        <div className="btn-row tight" style={{ marginBottom: 9 }}>
          <button
            className="btn tiny ghost"
            disabled={!histDepth}
            onClick={() => {
              if (undoPoses()) toast('已撤销位姿变更', 'ok');
            }}
          >
            撤销位姿 {histDepth > 0 ? `(${histDepth})` : ''}
          </button>
          <button
            className="btn tiny ghost"
            onClick={() => {
              const next = visibleShards.every(id => !instances[id].visible);
              for (const id of visibleShards) setShardProp(id, 'visible', next);
              toast(next ? '已显示全部残片' : '已隐藏全部残片', 'info');
            }}
          >
            全显/全隐
          </button>
          <button
            className="btn tiny ghost"
            onClick={() => controller()?.frameAll()}
          >
            取景全览
          </button>
          {hasMerge && (
            <button
              className="btn tiny ghost"
              title="显示/隐藏合并结果，便于与原始残片对照"
              onClick={() => {
                showMerged(!mergedVisible);
                store.setState({ mergedVisible: !mergedVisible });
              }}
            >
              {mergedVisible ? '隐藏合并结果' : '显示合并结果'}
            </button>
          )}
        </div>

        {allShards.length === 0 && (
          <div className="empty">还没有残片<br />从顶部「导入残片」开始</div>
        )}

        <div className="shard-list">
          {allShards.map(id => {
            const inst = instances[id];
            const src = srcById.get(id);
            return (
              <div
                key={id}
                className={`shard-item ${selected === id ? 'selected' : ''} ${compareId === id ? 'compare' : ''} ${!inst.visible ? 'hidden' : ''} ${inst.mergedInto ? 'merged' : ''}`}
                onClick={() => selectShard(id)}
                onDoubleClick={() => controller()?.frameShard(id)}
                title={inst.mergedInto ? '该片已并入合并结果' : '单击选择，双击取景'}
              >
                <button
                  className="shard-vis"
                  title={inst.visible ? '隐藏' : '显示'}
                  disabled={!!inst.mergedInto}
                  onClick={e => {
                    e.stopPropagation();
                    if (inst.mergedInto) return;
                    setShardProp(id, 'visible', !inst.visible);
                  }}
                >
                  {inst.mergedInto ? '⊘' : inst.visible ? '◉' : '○'}
                </button>
                <span className="shard-swatch" style={{ background: inst.color }} />
                <span className="shard-name">{inst.name}</span>
                <span className="shard-meta">
                  {inst.mergedInto ? '已合并' : src ? `${(src.triangleCount / 1000).toFixed(1)}k` : ''}
                </span>
              </div>
            );
          })}
        </div>

        {allShards.length > 0 && (
          <div className="hint" style={{ marginTop: 9 }}>
            单击选择 · 双击取景 · H 键切换显隐
          </div>
        )}
      </Section>

      <Section title="对齐参数" badge={selected ? instances[selected]?.name : '未选择'}>
        {!sel && <div className="empty">选择一片残片后可编辑其位姿</div>}
        {sel?.mergedInto && (
          <div className="alert warn" style={{ marginTop: 0 }}>
            该残片已并入合并结果，位姿编辑已锁定。
          </div>
        )}
        {sel && !sel.mergedInto && (
          <>
            <div className="mini-label">平移 (mm) — 步进 1 mm</div>
            <PoseRow
              values={sel.pose.position}
              step={1}
              onChange={(axis, value) => {
                const p = [...sel.pose.position] as Vec3;
                p[axis] = snapTranslation(value, 1);
                pushPoses();
                setPose(sel.id, { ...sel.pose, position: p }, 'input');
              }}
            />
            <div className="nudge-grid">
              {(['X', 'Y', 'Z'] as const).map((ax, i) => (
                <React.Fragment key={ax}>
                  <button className="btn tiny" onClick={() => { pushPoses(); nudgePose(sel.id, { position: axisDelta(i, -1) as Vec3 }); }}>−{ax}</button>
                  <button className="btn tiny" onClick={() => { pushPoses(); nudgePose(sel.id, { position: axisDelta(i, 1) as Vec3 }); }}>+{ax}</button>
                  <button
                    className="btn tiny ghost"
                    title={`将 ${ax} 归零`}
                    onClick={() => {
                      const p = [...sel.pose.position] as Vec3;
                      p[i] = 0;
                      pushPoses();
                      setPose(sel.id, { ...sel.pose, position: p }, 'input');
                    }}
                  >0</button>
                </React.Fragment>
              ))}
            </div>

            <div className="mini-label" style={{ marginTop: 13 }}>旋转 (°) — 步进 0.5°</div>
            <PoseRow
              values={sel.pose.rotation}
              step={0.5}
              onChange={(axis, value) => {
                const r = [...sel.pose.rotation] as Vec3;
                r[axis] = snapAngle(value, 0.5);
                pushPoses();
                setPose(sel.id, { ...sel.pose, rotation: r }, 'input');
              }}
            />
            <div className="field" style={{ marginTop: 8 }}>
              <label style={{ flex: '0 0 auto' }}>旋转轴</label>
              <div className="seg">
                {(['x', 'y', 'z'] as const).map(a => (
                  <button
                    key={a}
                    className={rotateAxis === a ? 'active' : ''}
                    onClick={() => store.setState({ rotateAxis: a, tool: 'rotate' })}
                  >
                    {a.toUpperCase()}
                  </button>
                ))}
              </div>
              <span className="hint" style={{ margin: 0, marginLeft: 'auto' }}>
                ← → 键微调
              </span>
            </div>

            <div className="divider" />

            <div className="mini-label">显示</div>
            <div className="field">
              <label>单片透明度</label>
              <input
                className="field-main"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={sel.opacity}
                onChange={e => setShardProp(sel.id, 'opacity', Number(e.target.value))}
              />
              <span className="field-value">{Math.round(sel.opacity * 100)}%</span>
            </div>
            <div className="field">
              <label>全局透明度</label>
              <input
                className="field-main"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={globalOpacity}
                onChange={e => store.setState({ globalOpacity: Number(e.target.value) })}
              />
              <span className="field-value">{Math.round(globalOpacity * 100)}%</span>
            </div>

            <div className="btn-row" style={{ marginTop: 10 }}>
              <button
                className="btn tiny"
                onClick={() => setCompare(compareId === sel.id ? null : sel.id)}
              >
                {compareId === sel.id ? '取消对照片' : '设为对照片'}
              </button>
              <button className="btn tiny ghost" onClick={() => controller()?.frameShard(sel.id)}>取景此片</button>
              <button
                className="btn tiny danger"
                onClick={() => {
                  removeShards([sel.id]);
                  toast('已移除该残片', 'info');
                }}
              >移除</button>
            </div>
            {selSource && (
              <div style={{ marginTop: 10 }}>
                <div className="kv"><span className="k">三角形</span><span className="v">{selSource.triangleCount.toLocaleString()}</span></div>
                <div className="kv"><span className="k">封闭体积</span><span className="v">{Math.round(selSource.volume).toLocaleString()} mm³</span></div>
                <div className="kv"><span className="k">包围盒对角</span><span className="v">{selSource.diagonal.toFixed(1)} mm</span></div>
              </div>
            )}
          </>
        )}
      </Section>

      <Section title="断口三点对齐" badge={alignment ? '已完成' : '未对齐'}>
        <div className="hint" style={{ marginTop: 0 }}>
          在两片断口上各点选 3 个相互对应的特征点，系统用最小二乘求最优刚体变换。
        </div>

        <div className="field" style={{ marginTop: 10 }}>
          <label>固定片</label>
          <span className="field-main" style={{ color: compareId ? 'var(--teal)' : 'var(--text-faint)' }}>
            {compareId ? instances[compareId]?.name : '未设置（用「设为对照片」）'}
          </span>
        </div>
        <div className="field">
          <label>移动片</label>
          <span className="field-main" style={{ color: selected ? 'var(--accent)' : 'var(--text-faint)' }}>
            {selected ? instances[selected]?.name : '未选择'}
          </span>
        </div>

        <div className="btn-row" style={{ marginTop: 8 }}>
          <button
            className="btn tiny"
            disabled={!compareId || !!picking}
            onClick={() => controller()?.startPicking({ role: 'fixed', index: 0 })}
          >
            点选固定片 3 点
          </button>
          <button
            className="btn tiny"
            disabled={!selected || !!picking}
            onClick={() => controller()?.startPicking({ role: 'moving', index: 0 })}
          >
            点选移动片 3 点
          </button>
        </div>

        {picking && (
          <div className="alert info" style={{ marginTop: 9 }}>
            正在点选{picking.role === 'fixed' ? '固定片' : '移动片'}第 {picking.index + 1} / 3 点
            <button className="btn tiny ghost" style={{ marginLeft: 'auto' }} onClick={() => controller()?.cancelPicking()}>取消</button>
          </div>
        )}

        <div className="btn-row" style={{ marginTop: 9 }}>
          <button
            className="btn primary"
            style={{ flex: 1 }}
            onClick={() => {
              controller()?.applyAlignment(compareId, selected, alignNormalOffset);
            }}
          >
            计算并应用粗对齐
          </button>
          <button className="btn ghost" onClick={() => controller()?.resetPickPoints()}>清空</button>
        </div>

        {alignment && (
          <div className="alert ok" style={{ marginTop: 9 }}>
            {useStore.getState().alignmentStatus}
          </div>
        )}

        <div className="divider" />

        <div className="field">
          <label style={{ width: 76 }}>法向微调</label>
          <input
            className="field-main"
            type="range"
            min={0}
            max={20}
            step={0.5}
            value={alignNormalOffset}
            onChange={e => setAlignOffset(Number(e.target.value), controller)}
          />
          <span className="field-value">{alignNormalOffset.toFixed(1)} mm</span>
        </div>
        <div className="hint">沿断口拟合法向平移 0–20 mm，用于消除拼接间隙或压合。</div>
      </Section>

      <Section title="操作工具" defaultOpen={false}>
        <div className="btn-row">
          {([
            ['select', '选择'],
            ['move', '平移 (W)'],
            ['rotate', '旋转 (E)'],
          ] as const).map(([mode, label]) => (
            <button
              key={mode}
              className={`btn tiny ${tool === mode ? 'active' : ''}`}
              onClick={() => store.setState({ tool: mode })}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="hint">
          平移手柄按 1 mm、旋转手柄按 0.5° 吸附。选中残片后可直接拖拽手柄。
        </div>
        <div className="divider" />
        <div className="field">
          <label>显示网格线</label>
          <button
            className={`switch ${useStore.getState().wireframe ? 'on' : ''}`}
            onClick={() => store.setState({ wireframe: !store.getState().wireframe })}
          />
        </div>
        <div className="field">
          <label>显示轮廓线</label>
          <button
            className={`switch ${useStore.getState().showEdges ? 'on' : ''}`}
            onClick={() => store.setState({ showEdges: !store.getState().showEdges })}
          />
        </div>
      </Section>
    </div>
  );
}

function setAlignOffset(mm: number, controller: () => SceneController | null) {
  store.setState({ alignNormalOffset: mm });
  controller()?.applyNormalOffset(mm);
}

function axisDelta(axis: number, sign: number): [number, number, number] {
  const d: [number, number, number] = [0, 0, 0];
  d[axis] = sign;
  return d;
}

function PoseRow({ values, step, onChange }: {
  values: readonly number[];
  step: number;
  onChange: (axis: number, value: number) => void;
}) {
  return (
    <div className="pose-grid">
      {(['X', 'Y', 'Z'] as const).map((ax, i) => (
        <div className="pose-cell" key={ax}>
          <span>{ax}</span>
          <input
            type="number"
            step={step}
            value={round(values[i], step < 1 ? 1 : 1)}
            onChange={e => {
              const v = Number(e.target.value);
              if (!Number.isNaN(v)) onChange(i, v);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function round(v: number, digits: number) {
  const p = 10 ** digits;
  return Math.round(v * p) / p;
}
