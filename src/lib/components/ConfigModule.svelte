<script lang="ts">
  import { ships, berths, selectedShipId, selectedBerthId, input, lines, persist, rebuildDefaultLines, snapshot, replaceState } from '../store';
  import { downloadBundle, parseBundle } from '../storage';
  import { deriveHydro } from '../sim/hydro';
  import SliderField from './SliderField.svelte';
  import type { BerthInput, ShipType } from '../types';

  type TabKey = 'ship' | 'berth' | 'env' | 'io';
  let tab = $state<TabKey>('ship');
  const TABS: [TabKey, string][] = [
    ['ship', '船型'],
    ['berth', '泊位'],
    ['env', '环境工况'],
    ['io', '存储分享']
  ];
  let importMsg = $state('');
  let fileInput = $state<HTMLInputElement>();

  const ship = $derived($ships.find((s) => s.id === $selectedShipId)!);
  const berth = $derived($berths.find((b) => b.id === $selectedBerthId)!);
  const hydro = $derived(deriveHydro(ship));

  function patchShip(p: Partial<ShipType>): void {
    ships.update((arr) => arr.map((s) => (s.id === ship.id ? { ...s, ...p } : s)));
  }
  function patchBerth(p: Record<string, unknown>): void {
    berths.update((arr) =>
      arr.map((b) => (b.id === berth.id ? ({ ...b, ...p } as typeof b) : b))
    );
  }
  function patchFender(p: Record<string, unknown>): void {
    berths.update((arr) =>
      arr.map((b) =>
        b.id === berth.id ? { ...b, fender: { ...b.fender, ...p } } : b
      )
    );
  }
  function patchInput(p: Partial<BerthInput>): void {
    input.update((v) => ({ ...v, ...p }));
  }

  async function onImport(e: Event): Promise<void> {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    try {
      const bundle = parseBundle(await f.text());
      replaceState({
        ships: bundle.ships,
        berths: bundle.berths,
        selectedShipId: bundle.selectedShipId,
        selectedBerthId: bundle.selectedBerthId,
        input: bundle.input,
        lines: bundle.lines
      });
      importMsg = `已导入：${f.name}`;
    } catch (err) {
      importMsg = `导入失败：${err instanceof Error ? err.message : err}`;
    }
  }

  function copyShare(): void {
    const text = JSON.stringify({
      app: 'berth-attitude-sim',
      version: 1,
      exportedAt: new Date().toISOString(),
      ...snapshot()
    }, null, 2);
    navigator.clipboard?.writeText(text).then(
      () => (importMsg = '配置 JSON 已复制到剪贴板'),
      () => (importMsg = '复制失败，请改用导出文件')
    );
  }
</script>

<section class="module">
  <header>
    <h2>参数设定</h2>
    <nav>
      {#each TABS as item}
        {@const [key, label] = item}
        <button class:on={tab === key} onclick={() => (tab = key)}>{label}</button>
      {/each}
    </nav>
  </header>

  <div class="body">
    {#if tab === 'ship'}
      <label class="select">
        <span>选择船型</span>
        <select bind:value={$selectedShipId} onchange={(e) => selectedShipId.set(e.currentTarget.value)}>
          {#each $ships as s}
            <option value={s.id}>{s.name}</option>
          {/each}
        </select>
      </label>
      <SliderField label="船长 L" unit="m" value={ship.length} min={40} max={350} step={1}
        oninput={(v) => patchShip({ length: v })} />
      <SliderField label="船宽 B" unit="m" value={ship.beam} min={8} max={60} step={0.2}
        oninput={(v) => patchShip({ beam: v })} />
      <SliderField label="型深 D" unit="m" value={ship.depth} min={5} max={30} step={0.2}
        oninput={(v) => patchShip({ depth: v })} />
      <SliderField label="设计吃水 d" unit="m" value={ship.draft} min={2} max={20} step={0.1}
        oninput={(v) => patchShip({ draft: Math.min(v, ship.depth * 0.95) })} />
      <SliderField label="方形系数 Cb" value={ship.blockCoeff} min={0.45} max={0.9} step={0.01}
        oninput={(v) => patchShip({ blockCoeff: v })} />

      <div class="card">
        <h4>派生水动力参数</h4>
        <dl>
          <div><dt>排水量</dt><dd>{hydro.displacement.toFixed(0)} t</dd></div>
          <div><dt>排水体积</dt><dd>{hydro.volume.toFixed(0)} m³</dd></div>
          <div><dt>初稳心高 GM</dt><dd>{hydro.GM.toFixed(2)} m</dd></div>
          <div><dt>横摇周期</dt><dd>{hydro.rollPeriod.toFixed(1)} s</dd></div>
          <div><dt>纵摇周期</dt><dd>{hydro.pitchPeriod.toFixed(1)} s</dd></div>
          <div><dt>受风面积</dt><dd>{hydro.windArea.toFixed(0)} m²</dd></div>
        </dl>
      </div>
    {/if}

    {#if tab === 'berth'}
      <label class="select">
        <span>选择泊位</span>
        <select bind:value={$selectedBerthId} onchange={(e) => selectedBerthId.set(e.currentTarget.value)}>
          {#each $berths as b}
            <option value={b.id}>{b.name}</option>
          {/each}
        </select>
      </label>
      <SliderField label="泊位长度" unit="m" value={berth.quayLength} min={80} max={500} step={5}
        oninput={(v) => patchBerth({ quayLength: v })} />
      <SliderField label="岸壁高度" unit="m" value={berth.quayHeight} min={3} max={12} step={0.2}
        oninput={(v) => patchBerth({ quayHeight: v })} />
      <SliderField label="系缆桩数量" value={berth.bollardCount} min={4} max={10} step={1}
        oninput={(v) => patchBerth({ bollardCount: Math.round(v) })} />
      <SliderField label="桩距壁距离" unit="m" value={berth.bollardOffset} min={0.8} max={3} step={0.1}
        oninput={(v) => patchBerth({ bollardOffset: v })} />

      <div class="card">
        <h4>护舷参数</h4>
        <SliderField label="护舷数量" value={berth.fender.count} min={3} max={9} step={1}
          oninput={(v) => patchFender({ count: Math.round(v) })} />
        <SliderField label="凸出长度" unit="m" value={berth.fender.protrusion} min={0.6} max={2.5} step={0.1}
          oninput={(v) => patchFender({ protrusion: v })} />
        <SliderField label="单舷半长" unit="m" value={berth.fender.halfLength} min={1} max={4} step={0.1}
          oninput={(v) => patchFender({ halfLength: v })} />
        <SliderField label="等效刚度 ×10⁶" unit="N/m" value={berth.fender.stiffness / 1e6} min={0.3} max={4} step={0.05}
          oninput={(v) => patchFender({ stiffness: v * 1e6 })} />
        <SliderField label="阻尼 ×10⁵" unit="N·s/m" value={berth.fender.damping / 1e5} min={0.5} max={5} step={0.1}
          oninput={(v) => patchFender({ damping: v * 1e5 })} />
        <SliderField label="摩擦系数" value={berth.fender.friction} min={0.1} max={0.6} step={0.01}
          oninput={(v) => patchFender({ friction: v })} />
      </div>
      <button class="ghost" onclick={() => { rebuildDefaultLines(); importMsg = '已按当前船型/泊位重布 6 根缆绳'; }}>
        重新生成默认缆绳布置
      </button>
    {/if}

    {#if tab === 'env'}
      <SliderField label="靠泊角度" unit="°" value={$input.berthAngleDeg} min={0} max={25} step={0.5}
        oninput={(v) => patchInput({ berthAngleDeg: v })} />
      <SliderField label="法向靠泊速度" unit="m/s" value={$input.approachSpeed} min={0.02} max={0.5} step={0.01}
        oninput={(v) => patchInput({ approachSpeed: v })} />
      <SliderField label="沿壁速度" unit="m/s" value={$input.alongSpeed} min={-1} max={1.5} step={0.02}
        oninput={(v) => patchInput({ alongSpeed: v })} />
      <SliderField label="横风风速（吹岸）" unit="m/s" value={$input.crossWind} min={0} max={25} step={0.5}
        oninput={(v) => patchInput({ crossWind: v })} />
      <SliderField label="横流流速（向岸）" unit="m/s" value={$input.crossCurrent} min={0} max={1.5} step={0.02}
        oninput={(v) => patchInput({ crossCurrent: v })} />
      <SliderField label="初始沿壁位置" unit="m" value={$input.initialAlongPos} min={-60} max={60} step={1}
        oninput={(v) => patchInput({ initialAlongPos: v })} />
      <SliderField label="初始离岸距离" unit="m" value={$input.initialOffshoreDist} min={8} max={60} step={1}
        oninput={(v) => patchInput({ initialOffshoreDist: v })} />
      <SliderField label="缆绳张力报警阈值" unit="kN" value={$input.tensionThreshold} min={40} max={280} step={5}
        oninput={(v) => patchInput({ tensionThreshold: v })} />
    {/if}

    {#if tab === 'io'}
      <div class="card">
        <h4>本地持久化</h4>
        <p class="hint">所有配置修改后自动保存到浏览器 localStorage，共 {ship ? $ships.length : 0} 个船型、{$berths.length} 个泊位、{$lines.length} 根缆绳。</p>
        <button class="ghost" onclick={() => { persist(); importMsg = '已手动保存'; }}>立即保存</button>
      </div>
      <div class="card">
        <h4>导出 / 分享</h4>
        <button class="primary" onclick={() => downloadBundle(snapshot())}>导出配置文件 (.json)</button>
        <button class="ghost" onclick={copyShare}>复制配置 JSON</button>
      </div>
      <div class="card">
        <h4>导入配置</h4>
        <input bind:this={fileInput} type="file" accept="application/json,.json" onchange={onImport} />
      </div>
      {#if importMsg}
        <p class="msg">{importMsg}</p>
      {/if}
    {/if}
  </div>
</section>

<style>
  .module {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #0d161f;
    border: 1px solid #1e2d3a;
    border-radius: 10px;
    overflow: hidden;
  }
  header {
    padding: 12px 14px 0;
    border-bottom: 1px solid #1e2d3a;
  }
  h2 {
    margin: 0 0 10px;
    font-size: 15px;
    color: #e8edf2;
  }
  nav {
    display: flex;
    gap: 6px;
  }
  nav button {
    background: none;
    border: none;
    color: #7d92a6;
    padding: 8px 10px;
    font-size: 12px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }
  nav button.on {
    color: #7fd0ec;
    border-bottom-color: #38a3c6;
  }
  .body {
    padding: 14px;
    overflow-y: auto;
    flex: 1;
  }
  .select {
    display: block;
    margin-bottom: 14px;
    font-size: 12px;
    color: #9fc0d6;
  }
  .select select {
    display: block;
    width: 100%;
    margin-top: 5px;
    background: #0c141c;
    border: 1px solid #2c4255;
    color: #e8edf2;
    border-radius: 6px;
    padding: 7px;
  }
  .card {
    background: #101d28;
    border: 1px solid #1e2d3a;
    border-radius: 8px;
    padding: 10px 12px;
    margin: 12px 0;
  }
  .card h4 {
    margin: 0 0 8px;
    font-size: 12px;
    color: #7fd0ec;
  }
  dl div {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 3px 0;
    color: #c0d2e0;
  }
  dt { color: #7d92a6; }
  dd { margin: 0; font-variant-numeric: tabular-nums; }
  .hint { font-size: 11px; color: #7d92a6; line-height: 1.6; }
  .msg { font-size: 12px; color: #7fd0ec; }
  button.primary, button.ghost {
    width: 100%;
    margin-top: 8px;
    padding: 9px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
  }
  button.primary {
    background: #1d6a86;
    border: 1px solid #38a3c6;
    color: #fff;
  }
  button.ghost {
    background: transparent;
    border: 1px solid #2c4255;
    color: #cfe0ee;
  }
  input[type='file'] {
    color: #9fc0d6;
    font-size: 12px;
  }
</style>
