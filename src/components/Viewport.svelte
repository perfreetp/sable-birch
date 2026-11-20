<script>
  import { onMount } from 'svelte';
  import { viewer } from '../lib/viewer.js';
  import {
    activeModule,
    envIndex,
    displayMode,
    modelName,
    statusMsg,
    ENVIRONMENTS,
    DISPLAY_MODES
  } from '../lib/store.js';

  let canvas;
  onMount(() => {
    viewer.init(canvas);
  });
</script>

<div class="viewport">
  <canvas bind:this={canvas}></canvas>

  <div class="overlay top-left">
    <div class="model-name">{$modelName}</div>
    {#if $activeModule === 'paint'}
      <div class="hint">左键涂抹漆面 · 右键/拖拽空白处旋转视角 · 滚轮缩放</div>
    {:else}
      <div class="hint">左键旋转 · 右键平移 · 滚轮缩放</div>
    {/if}
  </div>

  <div class="overlay top-right">
    <div class="seg">
      {#each ENVIRONMENTS as env}
        <button
          class:active={$envIndex === env.id}
          on:click={() => envIndex.set(env.id)}>{env.label}</button
        >
      {/each}
    </div>
    <div class="seg">
      {#each DISPLAY_MODES as dm}
        <button
          class:active={$displayMode === dm.id}
          on:click={() => displayMode.set(dm.id)}>{dm.label}</button
        >
      {/each}
    </div>
  </div>

  {#if $statusMsg}
    <div class="toast">{$statusMsg}</div>
  {/if}
</div>

<style>
  .viewport {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
    background: #0b0e12;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
    touch-action: none;
  }
  .overlay {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 6px;
    pointer-events: none;
  }
  .overlay > * {
    pointer-events: auto;
  }
  .top-left {
    top: 12px;
    left: 14px;
  }
  .top-right {
    top: 12px;
    right: 14px;
    align-items: flex-end;
  }
  .model-name {
    font-size: 13px;
    font-weight: 600;
    color: #dfe6ee;
    background: rgba(16, 20, 26, 0.75);
    padding: 5px 10px;
    border-radius: 6px;
  }
  .hint {
    font-size: 12px;
    color: #8b96a3;
    background: rgba(16, 20, 26, 0.6);
    padding: 4px 10px;
    border-radius: 6px;
  }
  .seg {
    display: flex;
    background: rgba(16, 20, 26, 0.8);
    border: 1px solid #2a313b;
    border-radius: 7px;
    overflow: hidden;
  }
  .seg button {
    background: transparent;
    border: none;
    color: #9aa6b2;
    font-size: 12px;
    padding: 6px 12px;
    cursor: pointer;
  }
  .seg button + button {
    border-left: 1px solid #2a313b;
  }
  .seg button.active {
    background: #2f6fed;
    color: #fff;
  }
  .toast {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(20, 26, 34, 0.92);
    border: 1px solid #344052;
    color: #d7e0ea;
    font-size: 13px;
    padding: 8px 16px;
    border-radius: 8px;
    white-space: nowrap;
  }
</style>
