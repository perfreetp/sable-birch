import { For, Show } from 'solid-js';
import { useStore } from '../../store/context';
import { Button, NumberField, Section, Toggle, pct } from '../controls';
import { exportResultsCSV, exportResultsJSON } from '../../lib/export';
import { SAMPLING_PRESETS } from '../../lib/sampling';
import { LAYER_COLORS } from '../../lib/export';

export function LayerModule() {
  const store = useStore();

  const statOf = (layerId: number) => store.state.stats.find((s) => s.layerId === layerId);

  const resplit = (form: { min: number; max: number }) => {
    store.resplitLayers(form.min, form.max);
  };

  let minAlt = 0;
  let maxAlt = 300;

  return (
    <div class="module">
      <Section title="高度带设置（5 层）">
        <div class="resplit-row">
          <NumberField
            label="高度下限"
            suffix="m"
            step={10}
            value={minAlt}
            onInput={(v) => (minAlt = v)}
          />
          <NumberField
            label="高度上限"
            suffix="m"
            step={10}
            value={maxAlt}
            onInput={(v) => (maxAlt = v)}
          />
          <Button variant="primary" onClick={() => resplit({ min: minAlt, max: maxAlt })}>
            重新均分 5 层
          </Button>
          <Button variant="ghost" onClick={() => store.resetLayers()}>
            恢复默认
          </Button>
        </div>
      </Section>

      <Section
        title="分层遮挡率"
        extra={
          <div class="row-actions">
            <Button
              variant="primary"
              disabled={!store.state.samples.length}
              onClick={() =>
                exportResultsJSON(
                  store.state.layers,
                  store.state.stats,
                  store.state.samples,
                  store.state.observers,
                  SAMPLING_PRESETS[store.state.spacing].label
                )
              }
            >
              导出 JSON 报告
            </Button>
            <Button
              disabled={!store.state.samples.length}
              onClick={() => exportResultsCSV(store.state.layers, store.state.samples)}
            >
              导出采样点 CSV
            </Button>
          </div>
        }
      >
        <Show
          when={store.state.stats.length}
          fallback={<p class="empty-tip">尚无计算结果，请在“遮挡计算”模块执行计算。</p>}
        >
          <table class="layer-table">
            <thead>
              <tr>
                <th>显示</th>
                <th>层</th>
                <th>高度范围 (m)</th>
                <th>视场内样本</th>
                <th>平均遮挡</th>
                <th>遮挡率</th>
              </tr>
            </thead>
            <tbody>
              <For each={store.state.layers}>
                {(layer) => {
                  const s = () => statOf(layer.id);
                  return (
                    <tr classList={{ 'row-off': !layer.visible }}>
                      <td>
                        <Toggle
                          checked={layer.visible}
                          onChange={(v) => store.setLayerVisible(layer.id, v)}
                        />
                      </td>
                      <td>
                        <span
                          class="layer-dot"
                          style={{ background: `#${LAYER_COLORS[layer.id % LAYER_COLORS.length].toString(16).padStart(6, '0')}` }}
                        />
                        {layer.name}
                      </td>
                      <td>
                        {layer.low} – {layer.high}
                      </td>
                      <td>{s()?.inFovSamples ?? 0} / {s()?.totalSamples ?? 0}</td>
                      <td>{s() ? pct(s()!.avgOcclusion) : '—'}</td>
                      <td>
                        <div class="rate-cell">
                          <div class="rate-bar">
                            <div
                              class="rate-fill"
                              style={{
                                width: s() ? `${s()!.occlusionRate * 100}%` : '0%',
                                background: rateColor(s()?.occlusionRate ?? 0)
                              }}
                            />
                          </div>
                          <span>{s() ? pct(s()!.occlusionRate) : '—'}</span>
                        </div>
                      </td>
                    </tr>
                  );
                }}
              </For>
            </tbody>
          </table>
          <Show when={store.state.stats.length}>
            <div class="overall-row">
              <span>
                合计视场内样本 <b>{store.overall().inFovSamples.toLocaleString()}</b> /{' '}
                {store.overall().totalSamples.toLocaleString()}
              </span>
              <span>
                整体遮挡率 <b style={{ color: rateColor(store.overall().occlusionRate) }}>
                  {pct(store.overall().occlusionRate)}
                </b>
              </span>
              <span>完全遮挡率 {pct(store.overall().fullOcclusionRate)}</span>
            </div>
          </Show>
        </Show>
      </Section>
    </div>
  );
}

function rateColor(rate: number): string {
  if (rate < 0.25) return '#4caf50';
  if (rate < 0.5) return '#c0ca33';
  if (rate < 0.75) return '#fb8c00';
  return '#e53935';
}
