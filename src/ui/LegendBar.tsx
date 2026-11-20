import { useStore } from '../store/context';

/** 视口底部图例：遮挡程度配色 + 状态指示 */
export function LegendBar() {
  const store = useStore();
  return (
    <div class="legend-bar">
      <div class="legend-group">
        <span class="legend-title">遮挡程度</span>
        <span class="legend-item"><i class="swatch" style={{ background: '#26bf33' }} />可见</span>
        <span class="legend-item"><i class="swatch" style={{ background: '#ffc107' }} />部分遮挡</span>
        <span class="legend-item"><i class="swatch" style={{ background: '#e53935' }} />完全遮挡</span>
        <span class="legend-item"><i class="swatch" style={{ background: '#5b6b7a' }} />视场外</span>
      </div>
      <div class="legend-group">
        <span
          class="status-pill"
          classList={{
            'status-idle': store.state.status === 'idle',
            'status-computing': store.state.status === 'computing',
            'status-done': store.state.status === 'done',
            'status-error': store.state.status === 'error'
          }}
        >
          {store.state.status === 'idle' && '待计算'}
          {store.state.status === 'computing' && `计算中 ${Math.round(store.state.progress * 100)}%`}
          {store.state.status === 'done' &&
            `完成 · ${store.state.samples.length.toLocaleString()} 采样点`}
          {store.state.status === 'error' && '计算出错'}
        </span>
      </div>
    </div>
  );
}
