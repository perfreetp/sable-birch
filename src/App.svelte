<script lang="ts">
  import Viewport from './lib/components/Viewport.svelte';
  import ConfigModule from './lib/components/ConfigModule.svelte';
  import RehearsalModule from './lib/components/RehearsalModule.svelte';
  import MooringModule from './lib/components/MooringModule.svelte';
  import { simResult, playbackTime, playbackRunning, selectedShip, selectedBerth } from './lib/store';

  type ModuleKey = 'config' | 'rehearsal' | 'mooring';
  let active = $state<ModuleKey>('config');

  const tabs: { key: ModuleKey; label: string; icon: string }[] = [
    { key: 'config', label: '参数设定', icon: '⚙' },
    { key: 'rehearsal', label: '靠泊预演', icon: '▶' },
    { key: 'mooring', label: '缆绳受力', icon: '➰' }
  ];

  const status = $derived.by(() => {
    const r = $simResult;
    if (!r) return '未运行仿真';
    const t = $playbackTime;
    return `${$playbackRunning ? '回放中' : '已暂停'} · t=${t.toFixed(1)}s / ${r.duration.toFixed(1)}s`;
  });
</script>

<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <div class="logo">⚓</div>
      <div>
        <h1>船舶靠泊姿态模拟</h1>
        <p>Berth Attitude Simulator</p>
      </div>
    </div>
    <nav>
      {#each tabs as tab}
        <button class:on={active === tab.key} onclick={() => (active = tab.key)}>
          <span class="icon">{tab.icon}</span>
          {tab.label}
        </button>
      {/each}
    </nav>
    <div class="meta">
      <p><span>当前船型</span>{$selectedShip.name}</p>
      <p><span>当前泊位</span>{$selectedBerth.name}</p>
      <p class="status">{status}</p>
    </div>
  </aside>

  <main class="main">
    <div class="canvas-pane">
      <Viewport />
    </div>
    <div class="panel-pane">
      {#key active}
        {#if active === 'config'}
          <ConfigModule />
        {:else if active === 'rehearsal'}
          <RehearsalModule />
        {:else}
          <MooringModule />
        {/if}
      {/key}
    </div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #080e14;
    color: #e8edf2;
    font-family: system-ui, -apple-system, 'Segoe UI', 'Microsoft YaHei', sans-serif;
  }
  :global(*) {
    box-sizing: border-box;
  }
  :global(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }
  :global(::-webkit-scrollbar-thumb) {
    background: #2c4255;
    border-radius: 4px;
  }
  .app {
    display: grid;
    grid-template-columns: 232px 1fr;
    height: 100vh;
    overflow: hidden;
  }
  .sidebar {
    background: #0b131b;
    border-right: 1px solid #1e2d3a;
    display: flex;
    flex-direction: column;
    padding: 18px 14px;
  }
  .brand {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 26px;
  }
  .logo {
    font-size: 30px;
    line-height: 1;
  }
  h1 {
    font-size: 15px;
    margin: 0 0 2px;
  }
  .brand p {
    margin: 0;
    font-size: 10px;
    color: #5d7d94;
    letter-spacing: 0.5px;
  }
  nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  nav button {
    display: flex;
    align-items: center;
    gap: 10px;
    background: none;
    border: 1px solid transparent;
    color: #9fc0d6;
    padding: 11px 12px;
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    text-align: left;
  }
  nav button:hover {
    background: #101d28;
  }
  nav button.on {
    background: #143242;
    border-color: #2c5d75;
    color: #7fd0ec;
  }
  .icon {
    width: 18px;
    text-align: center;
  }
  .meta {
    margin-top: auto;
    font-size: 11px;
    color: #7d92a6;
    border-top: 1px solid #1e2d3a;
    padding-top: 14px;
  }
  .meta p {
    margin: 6px 0;
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }
  .meta span {
    color: #5d7d94;
    flex-shrink: 0;
  }
  .meta .status {
    color: #7fd0ec;
    display: block;
    margin-top: 10px;
    font-variant-numeric: tabular-nums;
  }
  .main {
    display: grid;
    grid-template-rows: minmax(0, 1fr) clamp(300px, 42vh, 480px);
    min-width: 0;
  }
  .canvas-pane {
    position: relative;
    min-height: 0;
  }
  .panel-pane {
    border-top: 1px solid #1e2d3a;
    padding: 10px;
    min-height: 0;
  }
  .panel-pane > :global(*) {
    height: 100%;
  }

  @media (max-width: 1100px) {
    .app {
      grid-template-columns: 190px 1fr;
    }
  }
</style>
