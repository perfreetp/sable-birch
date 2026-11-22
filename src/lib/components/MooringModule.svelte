<script lang="ts">
  import { onMount } from 'svelte';
  import { lines, simResult, playbackTime, input, persist } from '../store';
  import { tensionColorHex } from '../three/colors';
  import type { LineState, SimSample } from '../types';

  let editing = $state<string | null>(null);
  let showCfg = $state(false);

  let liveSample = $state<SimSample | null>(null);
  $effect(() => {
    const r = $simResult;
    if (!r) {
      liveSample = null;
      return;
    }
    const dt = r.samples[1]?.t ?? 0.1;
    const idx = Math.max(0, Math.min(r.samples.length - 1, Math.round($playbackTime / dt)));
    liveSample = r.samples[idx];
  });

  const lineMap = $derived(new Map((liveSample?.lines ?? []).map((l: LineState) => [l.id, l])));

  // 自定义序列：AttitudeChart 只认固定 key，这里直接画独立 canvas 更稳妥，故下方使用内联 canvas 组件
  let chartCanvasEl = $state<HTMLCanvasElement>();
  function drawTensionChart(): void {
    const canvas = chartCanvasEl;
    const r = $simResult;
    if (!canvas || !r) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#101922';
    ctx.fillRect(0, 0, w, h);

    const padL = 44, padR = 12, padT = 30, padB = 24;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const tMax = r.duration || 1;
    const yMax = Math.max($input.tensionThreshold * 1.15, ...r.lineSummary.map((s) => s.maxTension), 10);
    const X = (t: number) => padL + (t / tMax) * plotW;
    const Y = (v: number) => padT + (1 - v / yMax) * plotH;

    ctx.strokeStyle = '#1e2d3a';
    ctx.fillStyle = '#7d92a6';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const v = (yMax * i) / 4;
      ctx.beginPath();
      ctx.moveTo(padL, Y(v));
      ctx.lineTo(w - padR, Y(v));
      ctx.stroke();
      ctx.fillText(v.toFixed(0), padL - 6, Y(v) + 3);
    }
    ctx.textAlign = 'center';
    for (let i = 0; i <= 6; i++) {
      ctx.fillText(`${((tMax * i) / 6).toFixed(0)}s`, X((tMax * i) / 6), h - 8);
    }
    // 阈值线
    ctx.strokeStyle = '#e74c3c';
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, Y($input.tensionThreshold));
    ctx.lineTo(w - padR, Y($input.tensionThreshold));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#e74c3c';
    ctx.textAlign = 'left';
    ctx.fillText(`阈值 ${$input.tensionThreshold} kN`, padL + 4, Y($input.tensionThreshold) - 4);

    r.lineSummary.forEach((sum, i) => {
      const line = $lines.find((l) => l.id === sum.id)!;
      const color = tensionColorHex(sum.maxUtilization);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      r.samples.forEach((s, j) => {
        const ls = s.lines.find((x) => x.id === sum.id);
        const tn = ls?.tension ?? 0;
        const x = X(s.t);
        const y = Y(tn);
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      void line;
      void i;
      ctx.stroke();
    });

    // 图例
    ctx.font = '10px system-ui';
    let lx = padL;
    r.lineSummary.forEach((sum) => {
      const color = tensionColorHex(sum.maxUtilization);
      ctx.fillStyle = color;
      ctx.fillRect(lx, 10, 12, 3);
      ctx.fillText(sum.label, lx + 15, 14);
      lx += ctx.measureText(sum.label).width + 30;
    });

    // 游标
    const cx = X(Math.min($playbackTime, tMax));
    ctx.strokeStyle = '#e8edf2';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, padT);
    ctx.lineTo(cx, padT + plotH);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  $effect(() => {
    void $simResult;
    void $playbackTime;
    void $input.tensionThreshold;
    void $lines;
    drawTensionChart();
  });

  onMount(() => {
    const ro = new ResizeObserver(() => drawTensionChart());
    if (chartCanvasEl) ro.observe(chartCanvasEl);
    return () => ro.disconnect();
  });

  function patchLine(id: string, p: Partial<(typeof $lines)[number]>): void {
    lines.update((arr) => arr.map((l) => (l.id === id ? { ...l, ...p } : l)));
    persist();
  }
  function patchChock(id: string, key: 'x' | 'y' | 'z', v: number): void {
    const l = $lines.find((x) => x.id === id)!;
    patchLine(id, { chock: { ...l.chock, [key]: v } });
  }
  function patchBollard(id: string, key: 'x' | 'y' | 'z', v: number): void {
    const l = $lines.find((x) => x.id === id)!;
    patchLine(id, { bollard: { ...l.bollard, [key]: v } });
  }

  function rowState(l: (typeof $lines)[number]): LineState | undefined {
    return lineMap.get(l.id) as LineState | undefined;
  }
</script>

<section class="module">
  <header>
    <h2>缆绳受力</h2>
    <div class="actions">
      <button class:on={showCfg} onclick={() => (showCfg = !showCfg)}>
        {showCfg ? '收起配置' : '缆绳布置配置'}
      </button>
    </div>
  </header>

  <div class="body">
    {#if !$simResult}
      <p class="hint">请先在「靠泊预演」模块运行仿真，此处将随回放同步显示各缆绳张力。</p>
    {:else}
      <div class="live">
        <table>
          <thead>
            <tr>
              <th>缆绳</th>
              <th>状态</th>
              <th>张力 (kN)</th>
              <th>应变</th>
              <th>利用率</th>
              <th>长度 (m)</th>
              <th>峰值 (kN)</th>
            </tr>
          </thead>
          <tbody>
            {#each $lines as l}
              {@const st = rowState(l)}
              {@const sum = $simResult.lineSummary.find((s) => s.id === l.id)!}
              <tr class:alarm={st?.alarm} class:off={!st?.attached}>
                <td>
                  <span class="dot" style={`background:${tensionColorHex(sum.maxUtilization)}`}></span>
                  {l.label}
                </td>
                <td>{st?.attached ? '已挂缆' : '未挂缆'}</td>
                <td class="num">{st ? st.tension.toFixed(1) : '—'}</td>
                <td class="num">{st ? (st.strain * 100).toFixed(2) + '%' : '—'}</td>
                <td class="num">
                  <div class="bar">
                    <div
                      style={`width:${Math.min(100, (sum.maxUtilization) * 100)}%;background:${tensionColorHex(sum.maxUtilization)}`}
                    ></div>
                    <span>{(sum.maxUtilization * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td class="num">{st?.attached ? st.length.toFixed(1) : '—'}</td>
                <td class="num" style={`color:${tensionColorHex(sum.maxUtilization)}`}>{sum.maxTension.toFixed(1)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="chart-wrap">
        <canvas bind:this={chartCanvasEl}></canvas>
      </div>

      <div class="summary card">
        <h4>靠泊完成最终结果</h4>
        {#each $simResult.lineSummary as s}
          <div class="sum-row">
            <span class="dot" style={`background:${tensionColorHex(s.maxUtilization)}`}></span>
            <span class="name">{s.label}</span>
            <span>终值 <b>{s.finalTension.toFixed(1)}</b> kN</span>
            <span>峰值 <b>{s.maxTension.toFixed(1)}</b> kN</span>
            <span class:alarm={s.alarmCount > 0}>报警 {s.alarmCount} 次</span>
          </div>
        {/each}
      </div>
    {/if}

    {#if showCfg}
      <div class="cfg">
        <h4>缆绳端点与材料（坐标单位 m）</h4>
        {#each $lines as l, i}
          <div class="line-cfg">
            <button class="expand" onclick={() => (editing = editing === l.id ? null : l.id)}>
              {i + 1}. {l.label}
              <small>Ø{l.diameter}mm · 破断 {l.breakingStrength}kN</small>
            </button>
            {#if editing === l.id}
              <!-- svelte-ignore component_name_lowercase -->
              <div class="grid">
                <label>
                  船端 x
                  <input type="number" step="0.5" value={l.chock.x} oninput={(e) => patchChock(l.id, 'x', Number(e.currentTarget.value))} />
                </label>
                <label>
                  船端 y
                  <input type="number" step="0.1" value={l.chock.y} oninput={(e) => patchChock(l.id, 'y', Number(e.currentTarget.value))} />
                </label>
                <label>
                  船端 z
                  <input type="number" step="0.5" value={l.chock.z} oninput={(e) => patchChock(l.id, 'z', Number(e.currentTarget.value))} />
                </label>
                <label>
                  岸端 x
                  <input type="number" step="0.5" value={l.bollard.x} oninput={(e) => patchBollard(l.id, 'x', Number(e.currentTarget.value))} />
                </label>
                <label>
                  岸端 y
                  <input type="number" step="0.1" value={l.bollard.y} oninput={(e) => patchBollard(l.id, 'y', Number(e.currentTarget.value))} />
                </label>
                <label>
                  岸端 z
                  <input type="number" step="0.1" value={l.bollard.z} oninput={(e) => patchBollard(l.id, 'z', Number(e.currentTarget.value))} />
                </label>
                <label>
                  直径 mm
                  <input type="number" step="1" value={l.diameter} oninput={(e) => patchLine(l.id, { diameter: Number(e.currentTarget.value) })} />
                </label>
                <label>
                  弹模 MPa
                  <input type="number" step="50" value={l.elasticModulus} oninput={(e) => patchLine(l.id, { elasticModulus: Number(e.currentTarget.value) })} />
                </label>
                <label>
                  破断 kN
                  <input type="number" step="5" value={l.breakingStrength} oninput={(e) => patchLine(l.id, { breakingStrength: Number(e.currentTarget.value) })} />
                </label>
                <label>
                  预张力 kN
                  <input type="number" step="1" value={l.pretension} oninput={(e) => patchLine(l.id, { pretension: Number(e.currentTarget.value) })} />
                </label>
              </div>
            {/if}
          </div>
        {/each}
      </div>
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
    padding: 12px 14px;
    border-bottom: 1px solid #1e2d3a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 { margin: 0; font-size: 15px; color: #e8edf2; }
  button {
    background: transparent;
    border: 1px solid #2c4255;
    color: #cfe0ee;
    border-radius: 6px;
    padding: 7px 12px;
    font-size: 12px;
    cursor: pointer;
  }
  button.on { background: #1d6a86; border-color: #38a3c6; }
  .body { padding: 14px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 12px; }
  .hint { color: #5d7d94; font-size: 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th {
    text-align: left;
    color: #7d92a6;
    font-weight: 500;
    padding: 6px 8px;
    border-bottom: 1px solid #1e2d3a;
    white-space: nowrap;
  }
  td { padding: 7px 8px; color: #cfe0ee; border-bottom: 1px solid #16222d; }
  td.num { font-variant-numeric: tabular-nums; }
  tr.alarm { animation: blink 0.7s infinite; }
  tr.off { opacity: 0.45; }
  @keyframes blink {
    0%, 100% { background: rgba(231, 76, 60, 0.08); }
    50% { background: rgba(231, 76, 60, 0.28); }
    0%, 100% { background: rgba(231, 76, 60, 0.08); }
  }
  .dot {
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    margin-right: 6px;
  }
  .bar { position: relative; width: 92px; height: 14px; background: #0c141c; border-radius: 7px; overflow: hidden; }
  .bar div { height: 100%; transition: width 0.2s; }
  .bar span {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #fff;
  }
  .chart-wrap {
    height: 210px;
    min-height: 210px;
    flex: 0 0 210px;
    background: #101922;
    border-radius: 8px;
    overflow: hidden;
  }
  .chart-wrap canvas { width: 100%; height: 100%; display: block; }
  .card {
    background: #101d28;
    border: 1px solid #1e2d3a;
    border-radius: 8px;
    padding: 10px 12px;
  }
  h4 { margin: 0 0 8px; font-size: 12px; color: #7fd0ec; }
  .sum-row { display: flex; gap: 14px; align-items: center; font-size: 12px; color: #9fc0d6; padding: 4px 0; flex-wrap: wrap; }
  .sum-row b { color: #e8edf2; }
  .sum-row .name { min-width: 64px; color: #cfe0ee; }
  .sum-row .alarm { color: #e74c3c; }
  .cfg { border-top: 1px solid #1e2d3a; padding-top: 10px; }
  .line-cfg { margin-bottom: 6px; }
  .expand {
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .expand small { color: #5d7d94; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
    padding: 10px 4px 4px;
  }
  .grid label { font-size: 11px; color: #7d92a6; }
  .grid input {
    display: block;
    width: 100%;
    margin-top: 3px;
    background: #0c141c;
    border: 1px solid #2c4255;
    color: #e8edf2;
    border-radius: 5px;
    padding: 5px 6px;
    font-size: 12px;
  }
</style>
