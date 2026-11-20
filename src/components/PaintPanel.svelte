<script>
  import { viewer } from '../lib/viewer.js';
  import {
    activeZone,
    paintColor,
    brushSize,
    eraseMode,
    meshList,
    ZONES,
    BRUSH_LABELS
  } from '../lib/store.js';

  const PRESETS = [
    '#c8102e',
    '#1c4f9c',
    '#f2a900',
    '#0e7a4f',
    '#e8e6e1',
    '#1a1a1c',
    '#7a2e8f',
    '#00a3b4'
  ];

  $: zoneCount = (id) => $meshList.filter((m) => m.zone === id).length;
</script>

<div class="panel">
  <section>
    <h3>选择分区</h3>
    <div class="zones">
      {#each ZONES as z}
        <button
          class="zone"
          class:active={$activeZone === z.id}
          style="--zc:{z.color}"
          on:click={() => activeZone.set(z.id)}
        >
          <span class="dot"></span>{z.label}
          <span class="count">{zoneCount(z.id)}</span>
        </button>
      {/each}
    </div>
    <p class="note">笔刷只会作用于当前选中的分区。</p>
  </section>

  <section>
    <h3>漆面颜色(分色遮罩)</h3>
    <div class="color-row">
      <input type="color" bind:value={$paintColor} />
      <span class="hex">{$paintColor}</span>
    </div>
    <div class="presets">
      {#each PRESETS as c}
        <button
          class="swatch"
          class:active={$paintColor === c}
          style="background:{c}"
          title={c}
          on:click={() => paintColor.set(c)}
        ></button>
      {/each}
    </div>
  </section>

  <section>
    <h3>笔刷</h3>
    <div class="seg">
      {#each BRUSH_LABELS as label, i}
        <button
          class:active={$brushSize === i}
          on:click={() => brushSize.set(i)}>{label}</button
        >
      {/each}
    </div>
    <label class="check">
      <input type="checkbox" bind:checked={$eraseMode} />
      橡皮擦(恢复底漆)
    </label>
  </section>

  <section>
    <button
      class="btn danger"
      on:click={() => viewer.clearZone($activeZone)}
    >
      清除当前分区漆面
    </button>
  </section>
</div>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  h3 {
    margin: 0;
    font-size: 13px;
    color: #7f8b99;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  .zones {
    display: flex;
    gap: 6px;
  }
  .zone {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: #1c232d;
    border: 1px solid #323c49;
    color: #cfd8e2;
    font-size: 13px;
    padding: 8px 4px;
    border-radius: 7px;
    cursor: pointer;
  }
  .zone .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--zc);
  }
  .zone .count {
    font-size: 11px;
    color: #6d7885;
  }
  .zone.active {
    border-color: var(--zc);
    background: #232d3a;
    color: #fff;
  }
  .color-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  input[type='color'] {
    width: 44px;
    height: 32px;
    border: 1px solid #323c49;
    border-radius: 6px;
    background: #1c232d;
    padding: 2px;
    cursor: pointer;
  }
  .hex {
    font-size: 13px;
    color: #9aa6b2;
    font-family: monospace;
  }
  .presets {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .swatch {
    width: 24px;
    height: 24px;
    border-radius: 5px;
    border: 2px solid transparent;
    cursor: pointer;
  }
  .swatch.active {
    border-color: #fff;
  }
  .seg {
    display: flex;
    background: #1c232d;
    border: 1px solid #323c49;
    border-radius: 7px;
    overflow: hidden;
  }
  .seg button {
    flex: 1;
    background: transparent;
    border: none;
    color: #9aa6b2;
    font-size: 13px;
    padding: 7px 0;
    cursor: pointer;
  }
  .seg button + button {
    border-left: 1px solid #323c49;
  }
  .seg button.active {
    background: #2f6fed;
    color: #fff;
  }
  .check {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #cfd8e2;
    cursor: pointer;
  }
  .btn {
    background: #1c232d;
    border: 1px solid #323c49;
    color: #cfd8e2;
    font-size: 13px;
    padding: 8px 10px;
    border-radius: 7px;
    cursor: pointer;
  }
  .btn.danger {
    border-color: #6e2f35;
    color: #e0858c;
  }
  .btn.danger:hover {
    background: #2a1c1f;
  }
  .note {
    margin: 0;
    font-size: 12px;
    color: #6d7885;
  }
</style>
