<script lang="ts">
  import {
    params,
    placingLeak,
    leakPosition,
    autoRotate,
    bloomOn,
    dofOn,
    diveTrigger,
    sceneApi,
  } from '../lib/stores';
  import { INTENSITY } from '../lib/simulation';
  import { resetParams } from '../lib/persistence';

  const levels = [1, 2, 3] as const;

  function dive() {
    diveTrigger.update((n) => n + 1);
  }
  function resetView() {
    $sceneApi?.resetView();
  }
</script>

<div class="panel">
  <section>
    <h3>泄漏点</h3>
    <button class:active={$placingLeak} on:click={() => placingLeak.set(!$placingLeak)}>
      {$placingLeak ? '点击场景放置…' : '放置泄漏点'}
    </button>
    <div class="coords">
      X {$leakPosition.x.toFixed(1)} · Y {$leakPosition.y.toFixed(1)} · Z {$leakPosition.z.toFixed(1)}
    </div>
  </section>

  <section>
    <h3>泄漏强度</h3>
    <div class="seg">
      {#each levels as lvl}
        <label class:checked={$params.intensity === lvl}>
          <input type="radio" bind:group={$params.intensity} value={lvl} />
          {INTENSITY[lvl].label}
        </label>
      {/each}
    </div>
    <label class="row">
      <span>初始扩散半径</span>
      <input type="range" min="4" max="20" step="0.5" bind:value={$params.initialRadius} />
      <em>{$params.initialRadius.toFixed(1)} m</em>
    </label>
  </section>

  <section>
    <h3>风场</h3>
    <label class="row">
      <span>风向角</span>
      <input type="range" min="0" max="360" step="1" bind:value={$params.windAngle} />
      <em>{$params.windAngle}°</em>
    </label>
    <label class="row">
      <span>风速</span>
      <input type="range" min="0" max="8" step="0.5" bind:value={$params.windSpeed} />
      <em>{$params.windSpeed.toFixed(1)} m/s</em>
    </label>
  </section>

  <section>
    <h3>判定与时长</h3>
    <label class="row">
      <span>浓度阈值</span>
      <input type="range" min="0.1" max="0.9" step="0.05" bind:value={$params.threshold} />
      <em>{$params.threshold.toFixed(2)}</em>
    </label>
    <label class="row">
      <span>推演时长</span>
      <select bind:value={$params.duration}>
        <option value={60}>60 s</option>
        <option value={120}>120 s</option>
        <option value={180}>180 s</option>
      </select>
    </label>
  </section>

  <section>
    <h3>视角</h3>
    <div class="btns">
      <button on:click={dive}>俯冲至泄漏点</button>
      <button on:click={resetView}>复位视角</button>
    </div>
    <label class="check"><input type="checkbox" bind:checked={$autoRotate} /> 自动环绕</label>
  </section>

  <section>
    <h3>后处理</h3>
    <label class="check"><input type="checkbox" bind:checked={$bloomOn} /> 辉光 (Bloom)</label>
    <label class="check"><input type="checkbox" bind:checked={$dofOn} /> 景深 (DOF)</label>
  </section>

  <button class="ghost" on:click={resetParams}>重置全部参数</button>
</div>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 14px;
    font-size: 13px;
    color: #cfd8e3;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  h3 {
    margin: 0;
    font-size: 12px;
    letter-spacing: 0.12em;
    color: #7f8ea3;
    text-transform: uppercase;
  }
  button {
    background: #1d2735;
    color: #dfe7f0;
    border: 1px solid #33415a;
    border-radius: 6px;
    padding: 7px 10px;
    cursor: pointer;
    font-size: 13px;
  }
  button:hover {
    background: #273449;
  }
  button.active {
    background: #7a2d1a;
    border-color: #ff6633;
  }
  button.ghost {
    background: transparent;
    color: #8fa0b8;
  }
  .btns {
    display: flex;
    gap: 8px;
  }
  .btns button {
    flex: 1;
  }
  .coords {
    font-family: monospace;
    font-size: 11px;
    color: #8fa0b8;
  }
  .seg {
    display: flex;
    gap: 6px;
  }
  .seg label {
    flex: 1;
    text-align: center;
    padding: 6px 0;
    border: 1px solid #33415a;
    border-radius: 6px;
    cursor: pointer;
  }
  .seg label.checked {
    background: #3a2a1a;
    border-color: #ff9933;
    color: #ffcc88;
  }
  .seg input {
    display: none;
  }
  .row {
    display: grid;
    grid-template-columns: 76px 1fr 56px;
    align-items: center;
    gap: 8px;
  }
  .row em {
    font-style: normal;
    text-align: right;
    color: #ffcc88;
    font-size: 12px;
  }
  .check {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  select {
    background: #1d2735;
    color: #dfe7f0;
    border: 1px solid #33415a;
    border-radius: 6px;
    padding: 5px;
    grid-column: 2 / 4;
  }
  input[type='range'] {
    accent-color: #ff9933;
  }
</style>
