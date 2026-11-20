import { useMemo, useState } from 'react';
import { useStore, store } from '../lib/store.ts';
import { mergeShards } from '../lib/merge.ts';
import { exportMerge, exportPoses, copyPoseManifest } from '../lib/poseExport.ts';
import type { SceneController } from '../lib/sceneController.ts';
import type { GapAnalysis } from '../lib/seam.ts';
import { DEFAULT_GAP_SETTINGS } from '../lib/store.ts';

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

export function SeamPanel(_props: Props) {
  const reports = useStore(s => s.reports);
  const activeReport = useStore(s => s.activeReport);
  const problems = useStore(s => s.problems);
  const scanRunning = useStore(s => s.scanRunning);
  const mergeStatus = useStore(s => s.mergeStatus);
  const gapSettings = useStore(s => s.gapSettings);
  const instances = useStore(s => s.instances);
  const order = useStore(s => s.order);
  const highlight = useStore(s => s.highlightProblems);

  const report = reports.find(r => r.id === activeReport) ?? reports[0] ?? null;
  const problemEntries = Object.entries(problems).filter(([, p]) => p.count > 0);
  const problemTotal = problemEntries.reduce((a, [, p]) => a + p.count, 0);

  const visibleIds = order.filter(id => instances[id] && !instances[id].mergedInto && instances[id].visible);

  const runMerge = async () => {
    await mergeShards({
      ids: visibleIds,
      gapCaptureRadius: gapSettings.captureRadius,
      gapThreshold: gapSettings.threshold,
      abortOnSelfIntersection: true,
    });
  };

  return (
    <div className="panel-scroll">
      <Section title="拼缝检测" badge={report ? '有结果' : '待合并'}>
        {!report && (
          <>
            <div className="empty">
              尚未执行实体合并<br />
              合并后在此查看拼缝缝隙宽度分布
            </div>
            <div className="field">
              <label style={{ width: 88 }}>捕获半径</label>
              <input
                className="field-main"
                type="range"
                min={0.2}
                max={6}
                step={0.1}
                value={gapSettings.captureRadius}
                onChange={e => store.setState({
                  gapSettings: { ...gapSettings, captureRadius: Number(e.target.value) },
                })}
              />
              <span className="field-value">{gapSettings.captureRadius.toFixed(1)} mm</span>
            </div>
            <div className="field">
              <label style={{ width: 88 }}>超限阈值</label>
              <input
                className="field-main"
                type="range"
                min={0.05}
                max={3}
                step={0.05}
                value={gapSettings.threshold}
                onChange={e => store.setState({
                  gapSettings: { ...gapSettings, threshold: Number(e.target.value) },
                })}
              />
              <span className="field-value">{gapSettings.threshold.toFixed(2)} mm</span>
            </div>
            <button
              className="btn primary"
              style={{ width: '100%', marginTop: 8 }}
              disabled={mergeStatus.running || visibleIds.length < 2}
              onClick={() => void runMerge()}
            >
              {mergeStatus.running ? mergeStatus.stage || '合并中…' : `合并当前 ${visibleIds.length} 片`}
            </button>
            <p className="hint">
              捕获半径：在此距离内视为「接合区域」；超限阈值：缝隙宽于该值计为超限。
            </p>
          </>
        )}

        {report && report.gap && <GapReportView gap={report.gap as GapAnalysis} />}

        {report && !report.gap && (
          <div className="alert warn">本次合并没有产生可分析的拼缝采样。</div>
        )}
      </Section>

      <Section title="合并结果" badge={reports.length || 0}>
        {reports.length === 0 && <div className="empty">还没有合并记录</div>}
        <div className="report-list">
          {reports.map(r => (
            <div
              key={r.id}
              className={`report-item ${r.id === (activeReport ?? reports[0]?.id) ? 'active' : ''}`}
              onClick={() => store.setState({ activeReport: r.id })}
            >
              <span className="name">
                {r.mergedIds.map(id => instances[id]?.name ?? id).join(' + ')}
              </span>
              <span className="chip">{r.components} 体</span>
              <span className={`chip ${r.selfIntersection.badTriangleCount ? 'bad' : 'ok'}`}>
                {r.selfIntersection.badTriangleCount ? `${r.selfIntersection.badTriangleCount} 问题面` : '无自交'}
              </span>
            </div>
          ))}
        </div>

        {report && (
          <>
            <div className="stat-grid" style={{ marginTop: 11 }}>
              <div className="stat">
                <div className="k">三角形</div>
                <div className="v">{report.triangleCount.toLocaleString()}</div>
              </div>
              <div className="stat">
                <div className="k">顶点</div>
                <div className="v">{report.vertexCount.toLocaleString()}</div>
              </div>
              <div className="stat">
                <div className="k">体积</div>
                <div className="v">{(report.volume / 1000).toFixed(1)}<span className="u">cm³</span></div>
              </div>
              <div className="stat">
                <div className="k">连通体</div>
                <div className="v" style={{ color: report.components > 1 ? 'var(--warn)' : 'var(--ok)' }}>
                  {report.components}
                </div>
              </div>
            </div>
          </>
        )}
      </Section>

      <Section title="自交检测" badge={
        problemTotal > 0 ? `${problemTotal} 面`
          : report?.selfIntersection.badTriangleCount ? '合并后有问题面'
          : scanRunning ? '扫描中' : '未检出'
      }>
        {problemTotal === 0 && (
          <div className="alert ok" style={{ marginTop: 0 }}>
            <span>✓</span>
            <span>合并前自交检查通过，各残片网格均无自相交面。</span>
          </div>
        )}
        {report && report.selfIntersection.badTriangleCount > 0 && (
          <div className="alert warn">
            <span>△</span>
            <span>
              合并结果中检出 {report.selfIntersection.badTriangleCount} 个穿插面，
              已在视口中高亮。通常来自残片位姿轻微重叠，可微调后重新合并。
              （布尔切片留下的共面薄片不计入）
            </span>
          </div>
        )}
        {problemTotal > 0 && (
          <>
            <div className="alert bad">
              <span>!</span>
              <span>
                检出 {problemTotal} 个自交问题面，已在视口中高亮为红色。请修整这些面后再合并。
              </span>
            </div>
            <div style={{ marginTop: 6 }}>
              {problemEntries.map(([id, p]) => (
                <div className="kv" key={id}>
                  <span className="k">{instances[id]?.name ?? id}</span>
                  <span className="v" style={{ color: 'var(--danger)' }}>{p.count} 面</span>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="field" style={{ marginTop: 9 }}>
          <label>高亮问题面</label>
          <button
            className={`switch ${highlight ? 'on' : ''}`}
            onClick={() => store.setState({ highlightProblems: !highlight })}
          />
        </div>
        <p className="hint">
          自交检测在合并前对每片网格执行 BVH 自相交遍历，共享顶点的相邻三角形不视为相交。
        </p>
      </Section>

      <Section title="导出" badge="STL / OBJ / ZIP">
        <div className="btn-row">
          <button className="btn" style={{ flex: 1 }} disabled={!report} onClick={() => exportMerge('stl')}>
            合并 STL
          </button>
          <button className="btn" style={{ flex: 1 }} disabled={!report} onClick={() => exportMerge('obj')}>
            合并 OBJ
          </button>
        </div>
        <button
          className="btn primary"
          style={{ width: '100%', marginTop: 7 }}
          disabled={!report}
          onClick={() => exportMerge('zip')}
        >
          导出压缩包（网格 + 位姿 + 缝隙报告）
        </button>
        <div className="btn-row" style={{ marginTop: 7 }}>
          <button className="btn ghost" style={{ flex: 1 }} onClick={() => exportPoses()}>位姿清单 JSON</button>
          <button className="btn ghost" style={{ flex: 1 }} onClick={() => void copyPoseManifest()}>复制</button>
        </div>
        <p className="hint">
          位姿清单包含每片残片的位置、XYZ 欧拉角与 4×4 变换矩阵，以及对齐参数与合并记录。
        </p>
      </Section>

      <Section title="合并参数" defaultOpen={false}>
        <div className="field">
          <label style={{ width: 88 }}>捕获半径</label>
          <input
            className="field-main"
            type="range"
            min={0.2}
            max={6}
            step={0.1}
            value={gapSettings.captureRadius}
            onChange={e => store.setState({
              gapSettings: { ...gapSettings, captureRadius: Number(e.target.value) },
            })}
          />
          <span className="field-value">{gapSettings.captureRadius.toFixed(1)} mm</span>
        </div>
        <div className="field">
          <label style={{ width: 88 }}>超限阈值</label>
          <input
            className="field-main"
            type="range"
            min={0.05}
            max={3}
            step={0.05}
            value={gapSettings.threshold}
            onChange={e => store.setState({
              gapSettings: { ...gapSettings, threshold: Number(e.target.value) },
            })}
          />
          <span className="field-value">{gapSettings.threshold.toFixed(2)} mm</span>
        </div>
        <button
          className="btn ghost"
          style={{ width: '100%' }}
          onClick={() => store.setState({ gapSettings: { ...DEFAULT_GAP_SETTINGS } })}
        >
          恢复默认
        </button>
      </Section>
    </div>
  );
}

function GapReportView({ gap }: { gap: GapAnalysis }) {
  const maxCount = Math.max(...gap.histogram.map(b => b.count), 1);
  const maxGap = Math.max(gap.max, 0.2);
  const overRatio = gap.sampleCount ? gap.overThreshold / gap.sampleCount : 0;

  const bars = useMemo(() => gap.histogram.map(b => {
    const h = (b.count / maxCount) * 100;
    const over = b.from >= gap.threshold;
    return {
      key: `${b.from}`,
      height: Math.max(b.count > 0 ? 3 : 0, h),
      color: over ? 'linear-gradient(180deg,#e8735e,#8f3d2e)' : 'linear-gradient(180deg,#5ee0b0,#2b7a60)',
      title: `${b.from.toFixed(2)}–${b.to.toFixed(2)} mm：${b.count} 个采样`,
    };
  }), [gap, maxCount]);

  return (
    <>
      <div className="stat-grid">
        <div className="stat">
          <div className="k">缝隙中位数</div>
          <div className="v" style={{ color: gap.median <= gap.threshold ? 'var(--teal)' : 'var(--danger)' }}>
            {formatGap(gap.median)}
          </div>
        </div>
        <div className="stat">
          <div className="k">P90 缝隙</div>
          <div className="v">{formatGap(gap.p90)}</div>
        </div>
        <div className="stat">
          <div className="k">P99 缝隙</div>
          <div className="v">{formatGap(gap.p99)}</div>
        </div>
        <div className="stat">
          <div className="k">贴合率</div>
          <div className="v" style={{ color: overRatio > 0.1 ? 'var(--danger)' : 'var(--ok)' }}>
            {((1 - overRatio) * 100).toFixed(1)}<span className="u">%</span>
          </div>
        </div>
      </div>

      <div className="mini-label">
        缝隙宽度分布（{gap.cellCount ?? gap.sampleCount} 个拼缝局部测量 · 阈值 {gap.threshold.toFixed(2)} mm）
      </div>
      <div className="hist">
        {bars.map(b => (
          <div key={b.key} className="hist-bar" style={{ height: `${b.height}%`, background: b.color }} title={b.title} />
        ))}
      </div>
      <div className="hist-axis">
        <span>0</span>
        <span>{(maxGap / 2).toFixed(2)}</span>
        <span>{maxGap.toFixed(2)} mm</span>
      </div>

      <div className="legend">
        <span><i className="dot" style={{ background: '#5ee0b0' }} /> ≤ 阈值</span>
        <span><i className="dot" style={{ background: '#e8735e' }} /> 超限</span>
      </div>

      <div style={{ marginTop: 10 }}>
        <div className="kv"><span className="k">平均缝隙</span><span className="v">{formatGap(gap.mean)}</span></div>
        <div className="kv"><span className="k">最小缝隙</span><span className="v">{formatGap(gap.min)}</span></div>
        <div className="kv"><span className="k">P90 缝隙</span><span className="v">{formatGap(gap.p90)}</span></div>
        <div className="kv"><span className="k">最大局部缝隙</span><span className="v">{formatGap(gap.max)}</span></div>
        <div className="kv"><span className="k">超限局部</span><span className="v">{gap.overThreshold} / {gap.sampleCount}</span></div>
        <div className="kv"><span className="k">接触带占比</span><span className="v">{(gap.contactRatio * 100).toFixed(1)}%</span></div>
      </div>

      <p className="hint">
        在两片接触带（捕获半径 {gap.captureRadius.toFixed(1)} mm）内按 1 mm 见方的空间块统计，
        每块取两片表面最近间距作为该处缝隙宽度；中位数反映整体贴合程度，
        P90/P99 反映局部张开，贴合率为缝隙不超过阈值的拼缝块占比。
      </p>
    </>
  );
}

function formatGap(v: number) {
  if (!Number.isFinite(v)) return '—';
  if (v < 0.01) return '<0.01 mm';
  return `${v.toFixed(2)} mm`;
}
