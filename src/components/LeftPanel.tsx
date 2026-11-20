import { Pose, ClearanceResult, ContainerInfo, HelperViewMode, AXIS_LIMITS } from '../types';

interface Props {
  pose: Pose;
  clearance: ClearanceResult | null;
  threshold: number;
  containerCount: number;
  selectedContainer: ContainerInfo | null;
  helperMode: HelperViewMode;
  onPoseChange: (p: Pose) => void;
  onThresholdChange: (t: number) => void;
}

const AXES: Array<{
  key: 'gantry' | 'trolley' | 'hoist' | 'rotation';
  label: string;
  unit: string;
  step: number;
  digits: number;
}> = [
  { key: 'gantry', label: '大车行走', unit: 'm', step: 0.1, digits: 1 },
  { key: 'trolley', label: '小车横移', unit: 'm', step: 0.1, digits: 1 },
  { key: 'hoist', label: '起升高度', unit: 'm', step: 0.1, digits: 1 },
  { key: 'rotation', label: '吊具回转', unit: '°', step: 1, digits: 0 },
];

const HELPER_LABEL: Record<HelperViewMode, string> = {
  none: '关闭',
  top: '俯视投影',
  side: '侧视投影',
};

export function LeftPanel(props: Props) {
  const { pose, clearance, threshold } = props;
  const margin = clearance ? clearance.minDistance - threshold : null;

  return (
    <div className="panel left-panel">
      <h2>姿态控制</h2>

      <div className="spreader-toggle">
        <span>吊具规格</span>
        <div className="seg">
          {([20, 40] as const).map((s) => (
            <button
              key={s}
              className={pose.spreader === s ? 'active' : ''}
              onClick={() => props.onPoseChange({ ...pose, spreader: s })}
            >
              {s} 尺
            </button>
          ))}
        </div>
      </div>

      {AXES.map((axis) => {
        const [min, max] = AXIS_LIMITS[axis.key];
        return (
          <div className="axis" key={axis.key}>
            <div className="axis-head">
              <span>{axis.label}</span>
              <span className="axis-value">
                {pose[axis.key].toFixed(axis.digits)} {axis.unit}
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={axis.step}
              value={pose[axis.key]}
              onChange={(e) =>
                props.onPoseChange({
                  ...pose,
                  [axis.key]: Number(e.target.value),
                })
              }
            />
          </div>
        );
      })}

      <h2>净空检测</h2>
      <div className="threshold-row">
        <span>净空阈值 (m)</span>
        <input
          type="number"
          min={0.1}
          max={2}
          step={0.05}
          value={threshold}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (Number.isFinite(v) && v >= 0.05 && v <= 5)
              props.onThresholdChange(v);
          }}
        />
      </div>

      {clearance && (
        <div className={`clearance-box ${clearance.ok ? 'ok' : 'bad'}`}>
          <div className="clearance-status">
            {clearance.ok ? '✓ 净空满足' : '✗ 净空不足'}
          </div>
          <div className="clearance-row">
            <span>最小间距</span>
            <b>{clearance.minDistance.toFixed(2)} m</b>
          </div>
          <div className="clearance-row">
            <span>净空余量</span>
            <b style={{ color: margin != null && margin < 0 ? '#ff6b5e' : '#5ee08a' }}>
              {margin != null ? `${margin >= 0 ? '+' : ''}${margin.toFixed(2)} m` : '—'}
            </b>
          </div>
          <div className="clearance-row">
            <span>侵入面数</span>
            <b>{clearance.hitTriangles}</b>
          </div>
        </div>
      )}

      <h2>辅助线</h2>
      <div className="info-row">
        <span>投影模式 (点吊具切换)</span>
        <b>{HELPER_LABEL[props.helperMode]}</b>
      </div>

      <h2>箱信息</h2>
      {props.selectedContainer ? (
        <div className="container-info">
          <div className="info-row">
            <span>箱号</span>
            <b>{props.selectedContainer.boxId}</b>
          </div>
          <div className="info-row">
            <span>位置</span>
            <b>
              {props.selectedContainer.block}区 {props.selectedContainer.bay}贝{' '}
              {props.selectedContainer.row}排
            </b>
          </div>
          <div className="info-row">
            <span>堆存层高</span>
            <b>第 {props.selectedContainer.tier} 层</b>
          </div>
          <div className="info-row">
            <span>箱型</span>
            <b>{props.selectedContainer.size} 尺</b>
          </div>
        </div>
      ) : (
        <div className="hint">点击场景中的箱体查看箱号与层高</div>
      )}

      <div className="hint footer-hint">
        在场箱量 {props.containerCount} / 2000
        <br />
        拖拽: 吊具=起升 · Shift+吊具=回转
        <br />
        小车=横移 · 大梁/支腿=大车
      </div>
    </div>
  );
}
