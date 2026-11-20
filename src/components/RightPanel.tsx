import { useState } from 'react';
import { Pose, ClearanceResult, SavedPose } from '../types';

interface Props {
  saved: (SavedPose | null)[];
  currentPose: Pose;
  currentClearance: ClearanceResult | null;
  onSave: (slot: number) => void;
  onReplay: (slot: number) => void;
  onDelete: (slot: number) => void;
  onExport: () => void;
}

export function RightPanel(props: Props) {
  const [compare, setCompare] = useState<number[]>([]);

  const toggleCompare = (i: number) => {
    setCompare((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i].slice(-3),
    );
  };

  const compared = compare
    .map((i) => ({ i, s: props.saved[i] }))
    .filter((x) => x.s != null);

  return (
    <div className="panel right-panel">
      <h2>预演姿态记录</h2>
      {props.saved.map((s, i) => (
        <div key={i} className={`pose-slot ${s ? '' : 'empty'}`}>
          {s ? (
            <>
              <div className="pose-head">
                <label>
                  <input
                    type="checkbox"
                    checked={compare.includes(i)}
                    onChange={() => toggleCompare(i)}
                  />
                  <b>{s.name}</b>
                </label>
                <span className={`badge ${s.result?.ok ? 'ok' : 'bad'}`}>
                  {s.result ? (s.result.ok ? '净空OK' : '净空不足') : '—'}
                </span>
              </div>
              <div className="pose-params">
                大车 {s.pose.gantry.toFixed(1)}m · 小车 {s.pose.trolley.toFixed(1)}m
                <br />
                起升 {s.pose.hoist.toFixed(1)}m · 回转 {s.pose.rotation.toFixed(0)}° ·{' '}
                {s.pose.spreader}尺
                <br />
                最小间距 {s.result ? s.result.minDistance.toFixed(2) : '—'} m
                (阈值 {s.result ? s.result.threshold.toFixed(2) : '—'} m)
              </div>
              <div className="pose-actions">
                <button onClick={() => props.onReplay(i)}>回放</button>
                <button className="ghost" onClick={() => props.onSave(i)}>
                  覆盖
                </button>
                <button className="ghost" onClick={() => props.onDelete(i)}>
                  删除
                </button>
              </div>
            </>
          ) : (
            <div className="empty-slot">
              <span>姿态 {i + 1} · 未记录</span>
              <button onClick={() => props.onSave(i)}>记录当前姿态</button>
            </div>
          )}
        </div>
      ))}

      {compared.length >= 2 && (
        <>
          <h2>姿态对比</h2>
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                {compared.map(({ s }) => (
                  <th key={s!.id}>{s!.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>大车</td>
                {compared.map(({ s }) => (
                  <td key={s!.id}>{s!.pose.gantry.toFixed(1)} m</td>
                ))}
              </tr>
              <tr>
                <td>小车</td>
                {compared.map(({ s }) => (
                  <td key={s!.id}>{s!.pose.trolley.toFixed(1)} m</td>
                ))}
              </tr>
              <tr>
                <td>起升</td>
                {compared.map(({ s }) => (
                  <td key={s!.id}>{s!.pose.hoist.toFixed(1)} m</td>
                ))}
              </tr>
              <tr>
                <td>回转</td>
                {compared.map(({ s }) => (
                  <td key={s!.id}>{s!.pose.rotation.toFixed(0)}°</td>
                ))}
              </tr>
              <tr>
                <td>吊具</td>
                {compared.map(({ s }) => (
                  <td key={s!.id}>{s!.pose.spreader} 尺</td>
                ))}
              </tr>
              <tr>
                <td>最小间距</td>
                {compared.map(({ s }) => (
                  <td
                    key={s!.id}
                    style={{ color: s!.result?.ok ? '#5ee08a' : '#ff6b5e' }}
                  >
                    {s!.result ? s!.result.minDistance.toFixed(2) : '—'} m
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </>
      )}

      <button className="export-btn" onClick={props.onExport}>
        导出 JSON 姿态文件 (班前交底)
      </button>
    </div>
  );
}
