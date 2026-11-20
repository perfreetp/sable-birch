<script>
  import { activeModule, MODULES } from './lib/store.js';
  import Viewport from './components/Viewport.svelte';
  import ImportPanel from './components/ImportPanel.svelte';
  import PaintPanel from './components/PaintPanel.svelte';
  import MaterialPanel from './components/MaterialPanel.svelte';
</script>

<div class="app">
  <header>
    <div class="title">
      <span class="logo">✈</span>
      eVTOL 涂装材质预览工具
    </div>
    <nav>
      {#each MODULES as m, i}
        <button
          class:active={$activeModule === m.id}
          on:click={() => activeModule.set(m.id)}
        >
          <span class="num">{i + 1}</span>{m.label}
        </button>
      {/each}
    </nav>
  </header>

  <main>
    <aside>
      {#if $activeModule === 'import'}
        <ImportPanel />
      {:else if $activeModule === 'paint'}
        <PaintPanel />
      {:else}
        <MaterialPanel />
      {/if}
    </aside>
    <Viewport />
  </main>
</div>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(html, body, #app) {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
  :global(body) {
    font-family:
      'Segoe UI',
      'Microsoft YaHei',
      system-ui,
      sans-serif;
    background: #0b0e12;
    color: #dfe6ee;
  }
  .app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 52px;
    background: #10151c;
    border-bottom: 1px solid #232c37;
    flex-shrink: 0;
  }
  .title {
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .logo {
    color: #2f6fed;
    font-size: 18px;
  }
  nav {
    display: flex;
    gap: 6px;
  }
  nav button {
    display: flex;
    align-items: center;
    gap: 7px;
    background: transparent;
    border: 1px solid transparent;
    color: #9aa6b2;
    font-size: 13px;
    padding: 7px 14px;
    border-radius: 7px;
    cursor: pointer;
  }
  nav button .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #232c37;
    font-size: 11px;
  }
  nav button.active {
    background: #1a2330;
    border-color: #2f6fed;
    color: #fff;
  }
  nav button.active .num {
    background: #2f6fed;
  }
  main {
    display: flex;
    flex: 1;
    min-height: 0;
  }
  aside {
    width: 280px;
    flex-shrink: 0;
    background: #10151c;
    border-right: 1px solid #232c37;
    padding: 16px;
    overflow-y: auto;
  }
</style>
