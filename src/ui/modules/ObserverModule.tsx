import { For, Show } from 'solid-js';
import { useStore } from '../../store/context';
import { Button, NumberField, Section, SliderField, TextField, Toggle } from '../controls';
import { exportObservers } from '../../lib/export';
import { parseObservers, readFileAsText } from '../../lib/importer';

export function ObserverModule() {
  const store = useStore();

  const selected = () =>
    store.state.observers.find((o) => o.id === store.state.selectedObserverId) ?? null;

  const importObservers = async (file: File | undefined) => {
    if (!file) return;
    try {
      const text = await readFileAsText(file);
      const observers = parseObservers(text);
      store.replaceObservers(observers);
      store.selectObserver(observers[0]?.id ?? null);
    } catch (err) {
      alert(`观察点配置导入失败：${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div class="module">
      <Section
        title="观察点列表"
        extra={
          <div class="row-actions">
            <Button variant="primary" onClick={() => store.addObserver()}>
              + 新增
            </Button>
            <Button
              onClick={() => exportObservers(store.state.observers)}
              disabled={!store.state.observers.length}
            >
              导出
            </Button>
            <label class="btn">
              导入
              <input
                type="file"
                accept=".json,application/json"
                style={{ display: 'none' }}
                onChange={(e) => {
                  void importObservers(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        }
      >
        <Show
          when={store.state.observers.length}
          fallback={<p class="empty-tip">暂无观察点，点击“新增”在空域中心放置，或直接在 3D 视图中查看橙色标记后拖拽定位。</p>}
        >
          <ul class="observer-list">
            <For each={store.state.observers}>
              {(o) => (
                <li
                  class="observer-item"
                  classList={{
                    selected: o.id === store.state.selectedObserverId,
                    disabled: !o.enabled
                  }}
                  onClick={() => store.selectObserver(o.id)}
                >
                  <Toggle
                    checked={o.enabled}
                    onChange={(v) => store.updateObserver(o.id, { enabled: v })}
                  />
                  <span class="observer-name">{o.name}</span>
                  <span class="observer-meta">
                    ({o.x.toFixed(0)}, {o.z.toFixed(0)}) · {o.yaw}°
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => store.removeObserver(o.id)}
                    title="删除观察点"
                  >
                    ✕
                  </Button>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Section>

      <Show when={selected()}>
        {(o) => (
          <Section title={`编辑 · ${o().name}`}>
            <div class="form-grid">
              <TextField
                label="名称"
                value={o().name}
                onInput={(v) => store.updateObserver(o().id, { name: v }, { skipRecompute: true })}
              />
              <NumberField
                label="X 坐标"
                suffix="m"
                step={0.5}
                value={o().x}
                onInput={(v) => store.updateObserver(o().id, { x: v })}
              />
              <NumberField
                label="Z 坐标"
                suffix="m"
                step={0.5}
                value={o().z}
                onInput={(v) => store.updateObserver(o().id, { z: v })}
              />
              <NumberField
                label="眼高"
                suffix="m"
                step={0.1}
                min={0.5}
                value={o().eyeHeight}
                onInput={(v) => store.updateObserver(o().id, { eyeHeight: Math.max(0.5, v) })}
              />
            </div>

            <div class="form-grid single">
              <SliderField
                label="朝向角（0=正北，顺时针）"
                suffix="°"
                min={0}
                max={359}
                value={o().yaw}
                onInput={(v) => store.updateObserver(o().id, { yaw: v })}
              />
              <SliderField
                label="水平视场角"
                suffix="°"
                min={10}
                max={360}
                value={o().fov}
                onInput={(v) => store.updateObserver(o().id, { fov: v })}
              />
              <div class="dual-range">
                <SliderField
                  label="垂直上仰角"
                  suffix="°"
                  min={0}
                  max={90}
                  value={o().pitchUp}
                  onInput={(v) => store.updateObserver(o().id, { pitchUp: v })}
                />
                <SliderField
                  label="垂直下俯角"
                  suffix="°"
                  min={-90}
                  max={0}
                  value={o().pitchDown}
                  onInput={(v) => store.updateObserver(o().id, { pitchDown: v })}
                />
              </div>
            </div>
            <p class="field-hint">提示：也可直接在 3D 视图中拖拽橙色球体改变观察点位置。</p>
          </Section>
        )}
      </Show>
    </div>
  );
}
