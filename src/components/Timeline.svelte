<script lang="ts">
  import {
    currentTime,
    duration,
    formatClock,
    playing,
    speed,
    SPEEDS
  } from '../lib/stores'

  export let onSeek: (t: number) => void

  let dragging = false

  function togglePlay(): void {
    if ($currentTime >= $duration) {
      onSeek(0)
    }
    playing.update((v) => !v)
  }

  function cycleSpeed(): void {
    const idx = SPEEDS.indexOf($speed)
    speed.set(SPEEDS[(idx + 1) % SPEEDS.length])
  }

  function handleInput(e: Event): void {
    dragging = true
    const v = Number((e.target as HTMLInputElement).value)
    currentTime.set(v)
  }

  function handleChange(e: Event): void {
    const v = Number((e.target as HTMLInputElement).value)
    onSeek(v)
    dragging = false
  }

  $: progress = $duration > 0 ? ($currentTime / $duration) * 100 : 0
  $: atEnd = $currentTime >= $duration - 0.05
</script>

<div class="timeline">
  <div class="left">
    <button class="play-btn" on:click={togglePlay} title={$playing ? '暂停' : '播放'}>
      {#if $playing}
        <svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>
      {:else}
        <svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
      {/if}
    </button>
    <button class="speed-btn" on:click={cycleSpeed} title="切换倍速">
      {$speed}×
    </button>
    <div class="clock">
      <span class="now">{formatClock($currentTime)}</span>
      <span class="sep">/</span>
      <span class="total">{formatClock($duration)}</span>
    </div>
    {#if atEnd && !$playing}
      <span class="ended">推演结束</span>
    {/if}
  </div>

  <div class="slider-wrap">
    <input
      type="range"
      min="0"
      max={$duration}
      step="0.1"
      value={$currentTime}
      on:input={handleInput}
      on:change={handleChange}
      style="--fill: {progress}%"
      aria-label="推演时间轴"
    />
    {#if dragging}
      <span class="hint">松开后全部航迹同步重算</span>
    {/if}
  </div>
</div>

<style>
  .timeline {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 10px 18px;
    background: linear-gradient(180deg, #131f33, #0e1726);
    border-top: 1px solid #22364f;
  }
  .left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .play-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: #2f7cf6;
    color: #fff;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: background 0.15s;
  }
  .play-btn:hover {
    background: #4a90ff;
  }
  .speed-btn {
    min-width: 52px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #33507a;
    background: #16263d;
    color: #9fd0ff;
    font-weight: 700;
    cursor: pointer;
  }
  .speed-btn:hover {
    border-color: #4a90ff;
  }
  .clock {
    font-variant-numeric: tabular-nums;
    font-size: 14px;
    color: #cfe3f5;
  }
  .clock .now {
    color: #fff;
    font-weight: 700;
  }
  .clock .sep {
    margin: 0 4px;
    color: #5d7691;
  }
  .clock .total {
    color: #8aa6c0;
  }
  .ended {
    font-size: 12px;
    color: #ffd54f;
    border: 1px solid #6b5a28;
    border-radius: 10px;
    padding: 2px 8px;
  }
  .slider-wrap {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }
  input[type='range'] {
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      #2f7cf6 0%,
      #2f7cf6 var(--fill, 0%),
      #243952 var(--fill, 0%),
      #243952 100%
    );
    outline: none;
    cursor: pointer;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid #2f7cf6;
    box-shadow: 0 0 8px rgba(47, 124, 246, 0.7);
  }
  input[type='range']::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid #2f7cf6;
  }
  .hint {
    position: absolute;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 11px;
    color: #ffd54f;
    white-space: nowrap;
    background: #0e1726;
    padding: 1px 8px;
    border-radius: 8px;
  }
</style>
