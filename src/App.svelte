<script lang="ts">
  import { onMount } from 'svelte';
  import { SceneManager } from './lib/scene/SceneManager';
  import { sceneApi, params, leakPosition, snapshots, placingLeak } from './lib/stores';
  import { loadPersisted, persistAll } from './lib/persistence';
  import ControlPanel from './components/ControlPanel.svelte';
  import Timeline from './components/Timeline.svelte';
  import SnapshotPanel from './components/SnapshotPanel.svelte';

  let container: HTMLDivElement;

  onMount(() => {
    const saved = loadPersisted();
    if (saved) {
      if (saved.params) params.set(saved.params);
      if (saved.leak) leakPosition.set(saved.leak);
      if (saved.snapshots) snapshots.set(saved.snapshots);
    }
    const mgr = new SceneManager(container);
    sceneApi.set(mgr);
    const unsubs = [
      params.subscribe(() => persistAll()),
      leakPosition.subscribe(() => persistAll()),
      snapshots.subscribe(() => persistAll()),
    ];
    return () => {
      unsubs.forEach((u) => u());
      sceneApi.set(null);
      mgr.dispose();
    };
  });
</script>

<div class="app">
  <header>
    <span class="stack">TS · Svelte · Three.js</span>
    <h1>供热管道泄漏扩散推演渲染工具</h1>
    {#if $placingLeak}
      <span class="placing">放置模式: 点击地面或管廊设置泄漏点</span>
    {/if}
  </header>
  <div class="main">
    <aside class="left"><ControlPanel /></aside>
    <div class="viewport" bind:this={container}>
      <div class="timeline-dock"><Timeline /></div>
    </div>
    <aside class="right"><SnapshotPanel /></aside>
  </div>
</div>

<style>
  :global(html, body, #app) {
    margin: 0;
    height: 100%;
    background: #0b101a;
    font-family: 'Segoe UI', 'Microsoft YaHei', system-ui, sans-serif;
    overflow: hidden;
  }
  .app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  header {
    display: flex;
    align-items: baseline;
    gap: 14px;
    padding: 10px 18px;
    background: #0e1522;
    border-bottom: 1px solid #22304a;
    flex: none;
  }
  header h1 {
    margin: 0;
    font-size: 17px;
    color: #e8eef6;
    font-weight: 600;
  }
  .stack {
    font-size: 11px;
    color: #ff9933;
    border: 1px solid #6b4a22;
    border-radius: 4px;
    padding: 2px 8px;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }
  .placing {
    color: #ffcc88;
    font-size: 12px;
    animation: blink 1.2s ease-in-out infinite;
  }
  @keyframes blink {
    50% {
      opacity: 0.4;
    }
  }
  .main {
    flex: 1;
    display: flex;
    min-height: 0;
  }
  aside {
    width: 268px;
    flex: none;
    overflow-y: auto;
    background: #0e1522;
  }
  aside.left {
    border-right: 1px solid #22304a;
  }
  aside.right {
    border-left: 1px solid #22304a;
  }
  .viewport {
    flex: 1;
    position: relative;
    min-width: 0;
  }
  .viewport :global(canvas) {
    display: block;
  }
  .timeline-dock {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 14px;
  }
  @media (max-width: 1100px) {
    aside {
      width: 220px;
    }
  }
</style>
