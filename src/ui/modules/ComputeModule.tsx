import { Show } from 'solid-js';
import { useStore } from '../../store/context';
import { Button, NumberField, Section, Toggle } from '../controls';
import { SAMPLING_PRESETS, MAX_SAMPLES } from '../../lib/sampling';
import type { SamplingDensity } from '../../types';

const DENSITIES: SamplingDensity[] = ['coarse', 'medium', 'fine'];

export function ComputeModule() {
  const store = useStore();
  const r = () => store.state.region;

  const estimateCount = () => {
    const spacing = SAMPLING_PRESETS[store.state.spacing].spacing;
    const nx = Math.max(1, Math.floor((r().maxX - r().minX) / spacing) + 1);
    const nz = Math.max(1, Math.floor((r().maxZ - r().minZ) / spacing) + 1);
    return nx * nz * store.state.layers.length;
  };

  const fitBuildings = () => {
    const b = store.state.buildings;
    if (!b.length) return;
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    for (const building of b) {
      for (const [x, z] of building.footprint) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minZ = Math.min(minZ, z);
        maxZ = Math.max(maxZ, z);
      }
    }
    const pad = 40;
    store.setRegion({
      minX: Math.floor(minX - pad),
      maxX: Math.ceil(maxX + pad),
      minZ: Math.floor(minZ - pad),
      maxZ: Math.ceil(maxZ + pad)
    });
  };

  return (
    <div class="module">
      <Section
        title="空域采样范围"
        extra={
          <Button variant="ghost" onClick={fitBuildings} disabled={!store.state.buildings.length}>
            贴合建筑范围
          </Button>
        }
      >
        <div class="form-grid">
          <NumberField
            label="最小 X"
            suffix="m"
            step={10}
            value={r().minX}
            onInput={(v) => store.setRegion({ ...r(), minX: Math.min(v, r().maxX - 10) })}
          />
          <NumberField
            label="最大 X"
            suffix="m"
            step={10}
            value={r().maxX}
            onInput={(v) => store.setRegion({ ...r(), maxX: Math.max(v, r().minX + 10) })}
          />
          <NumberField
            label="最小 Z"
            suffix="m"
            step={10}
            value={r().minZ}
            onInput={(v) => store.setRegion({ ...r(), minZ: Math.min(v, r().maxZ - 10) })}
          />
          <NumberField
            label="最大 Z"
            suffix="m"
            step={10}
            value={r().maxZ}
            onInput={(v) => store.setRegion({ ...r(), maxZ: Math.max(v, r().minZ + 10) })}
          />
        </div>
        <p class="field-hint">矩形空域在地面（z=0）的投影范围，采样点按水平网格均匀布设。</p>
      </Section>

      <Section title="采样间距（3 档）">
        <div class="density-grid">
          {DENSITIES.map((key) => {
            const preset = SAMPLING_PRESETS[key];
            return (
              <button
                class="density-card"
                classList={{ active: store.state.spacing === key }}
                onClick={() => store.setSpacing(key)}
              >
                <span class="density-label">{preset.label}</span>
                <span class="density-spacing">{preset.spacing} m</span>
                <span class="density-desc">{preset.desc}</span>
              </button>
            );
          })}
        </div>
        <p class="field-hint">
          预计采样点 <b>{estimateCount().toLocaleString()}</b> 个
          {estimateCount() > MAX_SAMPLES && `（超过上限 ${MAX_SAMPLES.toLocaleString()}，将自动稀疏化并提示）`}
          ，每点对每个启用观察点执行一次 BVH 射线求交。
        </p>
      </Section>

      <Section title="计算控制">
        <div class="compute-controls">
          <Toggle
            checked={store.state.autoRecompute}
            onChange={(v) => store.setAutoRecompute(v)}
            label="参数变化自动重算"
          />
          <Button
            variant="primary"
            disabled={store.state.status === 'computing' || !store.state.buildings.length}
            onClick={() => void store.runCompute()}
          >
            {store.state.status === 'computing' ? '计算中…' : '立即计算'}
          </Button>
        </div>

        <Show when={store.state.buildings.length === 0}>
          <p class="warn-tip">尚未导入建筑体块，请先在顶栏导入 JSON 或加载示例城市。</p>
        </Show>

        <Show when={store.state.status === 'computing' || store.state.status === 'done'}>
          <div class="progress-wrap">
            <div class="progress-bar">
              <div
                class="progress-fill"
                classList={{ indeterminate: store.state.status === 'computing' && store.state.progress === 0 }}
                style={{ width: `${Math.round(store.state.progress * 100)}%` }}
              />
            </div>
            <span class="progress-text">
              {store.state.status === 'computing'
                ? `视线求交中 ${Math.round(store.state.progress * 100)}%`
                : '计算完成'}
            </span>
          </div>
        </Show>

        <Show when={store.state.truncated}>
          <p class="warn-tip">
            采样点超出 {MAX_SAMPLES.toLocaleString()} 上限，已自动降低网格密度。如需完整结果请调大间距或缩小空域范围。
          </p>
        </Show>
        <Show when={store.state.lastError}>
          <p class="error-tip">{store.state.lastError}</p>
        </Show>
      </Section>
    </div>
  );
}
