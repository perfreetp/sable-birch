<script lang="ts">
  import { snapshots } from '../lib/stores';
  import {
    saveSnapshot,
    removeSnapshot,
    applySnapshot,
    exportSimFile,
    importSimFile,
  } from '../lib/persistence';
  import { INTENSITY } from '../lib/simulation';

  let name = '';
  let fileInput: HTMLInputElement;
  let message = '';

  function save() {
    saveSnapshot(name);
    name = '';
  }

  async function onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      message = await importSimFile(file);
    } catch (err) {
      message = err instanceof Error ? err.message : '导入失败';
    }
    input.value = '';
  }

  function fmtTime(s: number): string {
    return `${Math.floor(s / 60)}:${Math.floor(s % 60)
      .toString()
      .padStart(2, '0')}`;
  }
</script>

<div class="panel">
  <h3>场景快照</h3>
  <div class="save-row">
    <input placeholder="快照名称" bind:value={name} />
    <button on:click={save}>保存</button>
  </div>

  {#if $snapshots.length === 0}
    <p class="empty">暂无快照。调整好参数与时刻后保存。</p>
  {:else}
    <ul>
      {#each $snapshots as s (s.id)}
        <li>
          <button class="name" on:click={() => applySnapshot(s)} title="点击应用此快照">
            <b>{s.name}</b>
            <span>
              t={fmtTime(s.simTime)} · {INTENSITY[s.params.intensity].label}档 · 风向
              {s.params.windAngle}°
            </span>
          </button>
          <button class="del" on:click={() => removeSnapshot(s.id)} title="删除">×</button>
        </li>
      {/each}
    </ul>
  {/if}

  <h3>推演文件</h3>
  <div class="io">
    <button on:click={exportSimFile}>导出推演文件</button>
    <button on:click={() => fileInput.click()}>导入推演文件</button>
    <input
      bind:this={fileInput}
      type="file"
      accept="application/json,.json"
      on:change={onFile}
      hidden
    />
  </div>
  {#if message}<p class="msg">{message}</p>{/if}
  <p class="hint">参数与快照自动保存在浏览器本地, 刷新不丢失。</p>
</div>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    font-size: 13px;
    color: #cfd8e3;
  }
  h3 {
    margin: 4px 0 0;
    font-size: 12px;
    letter-spacing: 0.12em;
    color: #7f8ea3;
  }
  .save-row {
    display: flex;
    gap: 8px;
  }
  .save-row input {
    flex: 1;
    min-width: 0;
    background: #141c29;
    border: 1px solid #33415a;
    border-radius: 6px;
    color: #dfe7f0;
    padding: 6px 8px;
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
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 260px;
    overflow-y: auto;
  }
  li {
    display: flex;
    gap: 6px;
  }
  .name {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    text-align: left;
  }
  .name span {
    font-size: 11px;
    color: #8fa0b8;
  }
  .del {
    flex: none;
    color: #ff8866;
  }
  .empty,
  .hint {
    color: #66788f;
    font-size: 12px;
    margin: 0;
  }
  .io {
    display: flex;
    gap: 8px;
  }
  .io button {
    flex: 1;
  }
  .msg {
    margin: 0;
    color: #7dd88f;
    font-size: 12px;
  }
</style>
