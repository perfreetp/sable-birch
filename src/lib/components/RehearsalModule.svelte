<script lang="ts">
  import {
    input,
    playbackRunning,
    playbackSpeed,
    playbackTime,
    runSim,
    simResult,
    simRunning,
    simError,
    selectedShip
  } from '../store';
  import AttitudeChart from './AttitudeChart.svelte';
  import { rad2deg } from '../sim/math';

  const ATT_CHANNELS = [
    { key: 'roll', label: '横倾', color: '#38a3c6', axis: 'deg' as const },
    { key: 'pitch', label: '纵倾', color: '#e6a23c', axis: 'deg' as const },
    { key: 'yaw', label: '首向角', color: '#9b7ddb', axis: 'deg' as const }
  ];
  const MOTION_CHANNELS = [
    { key: 'x', label: '沿壁位置', color: '#52c49a', axis: 'm' as const },
    { key: 'z', label: '离岸距离', color: '#e06a7d', axis: 'm' as const },
    { key: 'heave', label: '升沉', color: '#d8d8a8', axis: 'm' as const }
  ];
  const FORCE_CHANNELS = [
    { key: 'fender', label: '护舷总反力', color: '#ff7a45', axis: 'kn' as const },
    { key: 'u', label: '纵向速度', color: '#6ab0f3', axis: 'mps' as const },
    { key: 'v', label: '横向速度', color: '#c084fc', axis: 'mps' as const }
  ];

  async function start(): Promise<void> {
    try {
      await runSim();
    } catch {
      /* 错误已写入 store */
    }
  }

  function seek(e: Event): void {
    const v = Number((e.target as HTMLInputElement).value);
    playbackTime.set(v);
  }

  function jump(pct: number): void {
    const r = $simResult;
    if (r) playbackTime.set(r.duration * pct);
  }

  const fmt = (v: number, d = 2): string => v.toFixed(d);
</script>

<section class="module">
  <header>
    <h2>靠泊预演</h2>
    <div class="runbar">
      <button class="primary" onclick={start} disabled={$simRunning}>
        {$simRunning ? '解算中…' : '开始靠泊仿真'}
      </button>
      {#if $simResult}
        <button onclick={() => playbackRunning.set(!$playbackRunning)}>
          {$playbackRunning ? '暂停' : '播放'}
        </button>
        <button onclick={() => jump(0)}>回到起点</button>
        <label class="speed">
          倍速
          <select bind:value={$playbackSpeed}>
            <option value={0.25}>0.25×</option>
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
            <option value={4}>4×</option>
          </select>
        </label>
      {/if}
    </div>
  </header>

  <div class="body">
    {#if $simError}
      <p class="error">仿真失败：{$simError}</p>
    {/if}

    {#if !$simResult}
      <div class="empty">
        <p>当前工况：{$selectedShip.name}</p>
        <ul>
          <li>靠泊角度 {$input.berthAngleDeg}° · 法向速度 {$input.approachSpeed} m/s</li>
          <li>横风 {$input.crossWind} m/s · 横流 {$input.crossCurrent} m/s</li>
          <li>初始离岸 {$input.initialOffshoreDist} m</li>
        </ul>
        <p class="hint">点击「开始靠泊仿真」，引擎将积分船体接近、护舷碰撞偏转与挂缆全过程。</p>
      </div>
    {:else}
      <div class="timeline">
        <span class="t">{fmt($playbackTime, 1)}s / {fmt($simResult.duration, 1)}s</span>
        <!-- svelte-ignore component_name_lowercase -->
        <input
          type="range"
          min={0}
          max={$simResult.duration}
          step={0.1}
          value={$playbackTime}
          oninput={seek}
        />
      </div>

      <div class="kpis">
        <div><span>沿壁位置偏差</span><strong>{fmt($simResult.final.alongDeviation, 2)} m</strong></div>
        <div><span>最终离岸距离</span><strong>{fmt($simResult.final.offshoreDistance, 2)} m</strong></div>
        <div><span>首向角偏差</span><strong>{fmt($simResult.final.yawErrorDeg, 2)}°</strong></div>
        <div><span>最终横倾</span><strong>{fmt($simResult.final.rollDeg, 2)}°</strong></div>
        <div><span>最终纵倾</span><strong>{fmt($simResult.final.pitchDeg, 2)}°</strong></div>
        <div><span>最大护舷反力</span><strong>{fmt($simResult.final.maxFenderForce, 1)} kN</strong></div>
        <div><span>挂缆时刻</span>
          <strong>{$simResult.final.lineAttachTime < 0 ? '—' : fmt($simResult.final.lineAttachTime, 1) + ' s'}</strong>
        </div>
      </div>

      <AttitudeChart title="姿态曲线（横倾/纵倾/首向角）" samples={$simResult.samples} cursorTime={$playbackTime}
        channels={ATT_CHANNELS} height={170} />
      <AttitudeChart title="运动曲线（位置/升沉）" samples={$simResult.samples} cursorTime={$playbackTime}
        channels={MOTION_CHANNELS} height={170} />
      <AttitudeChart title="受力与速度" samples={$simResult.samples} cursorTime={$playbackTime}
        channels={FORCE_CHANNELS} height={170} />
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
  }
  h2 { margin: 0 0 10px; font-size: 15px; color: #e8edf2; }
  .runbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  button {
    background: transparent;
    border: 1px solid #2c4255;
    color: #cfe0ee;
    border-radius: 6px;
    padding: 8px 14px;
    font-size: 12px;
    cursor: pointer;
  }
  button.primary { background: #1d6a86; border-color: #38a3c6; color: #fff; }
  button:disabled { opacity: 0.5; cursor: wait; }
  .speed { font-size: 11px; color: #7d92a6; display: flex; align-items: center; gap: 6px; }
  .speed select {
    background: #0c141c; border: 1px solid #2c4255; color: #e8edf2;
    border-radius: 5px; padding: 5px;
  }
  .body { padding: 14px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 12px; }
  .empty { color: #9fc0d6; font-size: 13px; line-height: 1.8; }
  .empty ul { padding-left: 18px; margin: 8px 0; }
  .hint { color: #5d7d94; font-size: 12px; }
  .error { color: #ff8a8a; font-size: 12px; }
  .timeline { display: flex; align-items: center; gap: 10px; }
  .timeline input { flex: 1; accent-color: #38a3c6; }
  .t { font-size: 12px; color: #9fc0d6; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
    gap: 8px;
  }
  .kpis div {
    background: #101d28;
    border: 1px solid #1e2d3a;
    border-radius: 8px;
    padding: 8px 10px;
  }
  .kpis span { display: block; font-size: 10px; color: #7d92a6; margin-bottom: 4px; }
  .kpis strong { font-size: 15px; color: #e8edf2; font-variant-numeric: tabular-nums; }
</style>
