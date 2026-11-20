<script lang="ts">
  import type { Exhibit } from '../types';
  import { activeExhibit, controller, panoReady } from '../stores';

  export let exhibits: Exhibit[];
  export let title: string;
</script>

<aside class="sidebar">
  <header>
    <h1>{title}</h1>
    <span class="count">{exhibits.length} 件展品</span>
  </header>

  <ul class="exhibit-list">
    {#each exhibits as ex (ex.id)}
      <li>
        <button
          class:active={$activeExhibit?.id === ex.id}
          disabled={!$panoReady}
          on:click={() => controller.goToExhibit(ex)}
        >
          <span class="name">{ex.name}</span>
          <span class="era">{ex.era}</span>
        </button>
      </li>
    {/each}
  </ul>

  <footer>点击条目跳转至对应展柜并展开模型</footer>
</aside>

<style>
  .sidebar {
    width: 240px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #171a22, #12141b);
    border-right: 1px solid rgba(255, 214, 130, 0.18);
    color: #e6e0d0;
    z-index: 10;
  }
  header {
    padding: 18px 16px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }
  header h1 {
    margin: 0;
    font-size: 17px;
    color: #f2e7c8;
    letter-spacing: 2px;
  }
  .count {
    font-size: 12px;
    color: #8f8875;
  }
  .exhibit-list {
    flex: 1;
    overflow-y: auto;
    margin: 0;
    padding: 8px;
    list-style: none;
  }
  .exhibit-list button {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 12px;
    margin-bottom: 6px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid transparent;
    border-radius: 8px;
    color: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .exhibit-list button:hover:not(:disabled) {
    background: rgba(255, 214, 130, 0.1);
  }
  .exhibit-list button.active {
    border-color: rgba(255, 214, 130, 0.6);
    background: rgba(255, 214, 130, 0.14);
  }
  .exhibit-list button:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .name { font-size: 14px; }
  .era { font-size: 11px; color: #9a927c; }
  footer {
    padding: 10px 14px;
    font-size: 11px;
    color: #6f6a5a;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
</style>
