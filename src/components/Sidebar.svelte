<script lang="ts">
  import {
    activeConflictCount,
    conflictList,
    formatClock,
    horizontalThreshold,
    selectedId,
    summaries,
    totalConflictCount,
    verticalThreshold
  } from '../lib/stores'

  export let onFocus: (id: string) => void
  export let onThresholds: (h: number, v: number) => void

  type Tab = 'aircraft' | 'conflicts'
  let tab: Tab = 'aircraft'

  function pick(id: string): void {
    selectedId.set(id)
    onFocus(id)
  }

  function applyH(e: Event): void {
    const v = Number((e.target as HTMLInputElement).value)
    if (Number.isFinite(v) && v > 0) onThresholds(v, $verticalThreshold)
  }
  function applyV(e: Event): void {
    const v = Number((e.target as HTMLInputElement).value)
    if (Number.isFinite(v) && v > 0) onThresholds($horizontalThreshold, v)
  }
</script>

<aside class="sidebar">
  <div class="stats">
    <div class="stat">
      <span class="num">{$summaries.length}</span>
      <span class="label">飞行器</span>
    </div>
    <div class="stat">
      <span class="num warn">{$activeConflictCount}</span>
      <span class="label">活动冲突</span>
    </div>
    <div class="stat">
      <span class="num">{$totalConflictCount}</span>
      <span class="label">累计冲突</span>
    </div>
  </div>

  <div class="thresholds">
    <label>
      水平间隔阈值
      <input type="number" min="10" step="5" value={$horizontalThreshold} on:change={applyH} />
      <em>m</em>
    </label>
    <label>
      垂直间隔阈值
      <input type="number" min="5" step="5" value={$verticalThreshold} on:change={applyV} />
      <em>m</em>
    </label>
  </div>

  <div class="tabs">
    <button class:active={tab === 'aircraft'} on:click={() => (tab = 'aircraft')}>
      飞行器列表
    </button>
    <button class:active={tab === 'conflicts'} on:click={() => (tab = 'conflicts')}>
      冲突记录
    </button>
  </div>

  {#if tab === 'aircraft'}
    <div class="list">
      {#each $summaries as ac (ac.id)}
        <button
          class="row"
          class:selected={ac.id === $selectedId}
          class:danger={ac.inConflictNow}
          on:click={() => pick(ac.id)}
        >
          <div class="row-main">
            <span class="ident">
              <i class="dot" class:off={!ac.active} class:warn={ac.inConflictNow}></i>
              {ac.id}
            </span>
            <span class="meta">
              ALT {Math.round(ac.altitude)} m · GS {ac.groundSpeed.toFixed(1)} m/s
            </span>
          </div>
          {#if ac.conflictTotal > 0}
            <span class="badge" class:warn={ac.inConflictNow}>{ac.conflictTotal}</span>
          {/if}
        </button>
      {/each}
    </div>
  {:else}
    <div class="list">
      {#if $conflictList.length === 0}
        <p class="empty">暂无冲突记录，间隔均满足安全阈值。</p>
      {/if}
      {#each $conflictList as c, i (c.key)}
        <div class="conflict" class:active={c.active}>
          <div class="conflict-head">
            <span class="conflict-index">#{i + 1}</span>
            <span class="pair">{c.aircraftA} ↔ {c.aircraftB}</span>
            <span class="state">{c.active ? '进行中' : '已结束'}</span>
          </div>
          <div class="conflict-body">
            <span>{formatClock(c.startTime)} → {formatClock(c.endTime)}</span>
            <span>持续 {(c.endTime - c.startTime).toFixed(1)} s</span>
            <span>最小水平间隔 <b>{c.minHorizontal.toFixed(1)} m</b></span>
            <span>垂直间隔 {c.verticalAtMinH.toFixed(1)} m</span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</aside>

<style>
  .sidebar {
    width: 320px;
    flex-shrink: 0;
    background: #0e1726;
    border-left: 1px solid #22364f;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .stats {
    display: flex;
    padding: 14px 12px;
    gap: 8px;
    border-bottom: 1px solid #1c2d44;
  }
  .stat {
    flex: 1;
    background: #132136;
    border-radius: 10px;
    padding: 10px 6px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .num {
    font-size: 22px;
    font-weight: 800;
    color: #e8f3ff;
    font-variant-numeric: tabular-nums;
  }
  .num.warn {
    color: #ff6b62;
  }
  .label {
    font-size: 11px;
    color: #7d96b0;
  }
  .thresholds {
    display: flex;
    gap: 10px;
    padding: 12px;
    border-bottom: 1px solid #1c2d44;
  }
  .thresholds label {
    flex: 1;
    font-size: 11px;
    color: #8aa6c0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .thresholds input {
    width: 100%;
    background: #132136;
    border: 1px solid #2a4362;
    border-radius: 6px;
    color: #e8f3ff;
    padding: 5px 8px;
    font-size: 13px;
  }
  .thresholds em {
    font-style: normal;
    font-size: 10px;
    color: #5d7691;
    margin-top: -20px;
    margin-left: auto;
    margin-right: 8px;
    pointer-events: none;
  }
  .tabs {
    display: flex;
    padding: 8px 12px 0;
    gap: 6px;
  }
  .tabs button {
    flex: 1;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: #7d96b0;
    padding: 8px 4px;
    cursor: pointer;
    font-size: 13px;
  }
  .tabs button.active {
    color: #9fd0ff;
    border-bottom-color: #2f7cf6;
  }
  .list {
    flex: 1;
    overflow-y: auto;
    padding: 8px 12px 16px;
  }
  .row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #132136;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 10px 12px;
    margin-bottom: 7px;
    cursor: pointer;
    text-align: left;
    color: inherit;
  }
  .row:hover {
    border-color: #2f5d96;
  }
  .row.selected {
    border-color: #ffd54f;
    background: #1d2c2a;
  }
  .row.danger {
    border-color: #7a2e2a;
    background: #2a1a20;
  }
  .row-main {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .ident {
    font-weight: 700;
    color: #e8f3ff;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4fc3f7;
    flex-shrink: 0;
  }
  .dot.off {
    background: #54687a;
  }
  .dot.warn {
    background: #ff5252;
    box-shadow: 0 0 8px #ff5252;
  }
  .meta {
    font-size: 11px;
    color: #7d96b0;
    font-variant-numeric: tabular-nums;
  }
  .badge {
    min-width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #2a4362;
    color: #cfe3f5;
    font-size: 12px;
    font-weight: 700;
    display: grid;
    place-items: center;
    padding: 0 6px;
  }
  .badge.warn {
    background: #c0392b;
    color: #fff;
  }
  .empty {
    color: #5d7691;
    font-size: 12px;
    text-align: center;
    padding: 30px 10px;
  }
  .conflict {
    background: #132136;
    border: 1px solid #243952;
    border-left: 3px solid #7a8ca0;
    border-radius: 8px;
    padding: 9px 11px;
    margin-bottom: 8px;
  }
  .conflict.active {
    border-left-color: #ff5252;
    background: #241820;
  }
  .conflict-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .conflict-index {
    font-size: 11px;
    color: #5d7691;
  }
  .pair {
    font-weight: 700;
    font-size: 13px;
    color: #e8f3ff;
    flex: 1;
  }
  .state {
    font-size: 11px;
    border-radius: 9px;
    padding: 1px 8px;
    background: #2a4362;
    color: #9fd0ff;
  }
  .conflict.active .state {
    background: #c0392b;
    color: #fff;
  }
  .conflict-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 11px;
    color: #8aa6c0;
    font-variant-numeric: tabular-nums;
  }
  .conflict-body b {
    color: #ff9c95;
  }
</style>
