<script lang="ts">
  import type { GalleryConfig } from '../types';
  import { controller, moving, speedLevel, pathIndex, panoReady } from '../stores';
  import { downloadExport } from './exporter';

  export let config: GalleryConfig;

  const speeds = [
    { label: '慢', value: 0 },
    { label: '中', value: 1 },
    { label: '快', value: 2 }
  ] as const;
</script>

<div class="path-bar">
  <div class="group">
    <button on:click={() => controller.stepPrev()} disabled={!$panoReady} title="上一路径点">⏮</button>
    {#if $moving}
      <button class="play" on:click={() => controller.pause()} title="暂停漫游">⏸</button>
    {:else}
      <button class="play" on:click={() => controller.play()} disabled={!$panoReady} title="沿路径漫游">▶</button>
    {/if}
    <button on:click={() => controller.stepNext()} disabled={!$panoReady} title="下一路径点">⏭</button>
  </div>

  <div class="group progress">
    <span class="label">路径点</span>
    <div class="dots">
      {#each config.path as _, i}
        <span class="dot" class:current={$pathIndex === i}></span>
      {/each}
    </div>
    <span class="label">{$pathIndex + 1}/{config.path.length}</span>
  </div>

  <div class="group speeds">
    <span class="label">速度</span>
    {#each speeds as s}
      <button
        class:active={$speedLevel === s.value}
        on:click={() => speedLevel.set(s.value)}
      >{s.label}</button>
    {/each}
  </div>

  <div class="group right">
    <button class="export" on:click={() => downloadExport(config)} title="导出全景引用、热点坐标与模型列表">
      ⬇ 导出配置
    </button>
  </div>
</div>

<style>
  .path-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 10px 18px;
    background: rgba(14, 16, 22, 0.82);
    backdrop-filter: blur(6px);
    border-top: 1px solid rgba(255, 214, 130, 0.18);
    color: #ddd6c4;
  }
  .group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .group.right { margin-left: auto; }
  button {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: #e8e2d0;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.15s;
  }
  button:hover:not(:disabled) { background: rgba(255, 214, 130, 0.16); }
  button:disabled { opacity: 0.4; cursor: default; }
  button.play {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    font-size: 16px;
    border-color: rgba(255, 214, 130, 0.5);
  }
  button.active {
    background: rgba(255, 214, 130, 0.25);
    border-color: rgba(255, 214, 130, 0.7);
  }
  .label { font-size: 12px; color: #9a927c; }
  .dots { display: flex; gap: 6px; }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: background 0.2s, transform 0.2s;
  }
  .dot.current {
    background: #ffd682;
    transform: scale(1.3);
  }
  .export {
    border-color: rgba(255, 214, 130, 0.4);
  }
</style>
