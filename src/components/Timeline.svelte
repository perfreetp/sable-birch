<script lang="ts">
  import { simTime, playing, playSpeed, params, stats } from '../lib/stores';

  function fmt(s: number): string {
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${m}:${ss.toString().padStart(2, '0')}`;
  }

  function togglePlay() {
    if (!$playing && $simTime >= $params.duration) simTime.set(0);
    playing.update((v) => !v);
  }
</script>

<div class="timeline">
  <button class="play" on:click={togglePlay} title={$playing ? '暂停' : '播放'}>
    {$playing ? '⏸' : '▶'}
  </button>
  <span class="time">{fmt($simTime)} / {fmt($params.duration)}</span>
  <input
    class="scrub"
    type="range"
    min="0"
    max={$params.duration}
    step="0.1"
    bind:value={$simTime}
    title="拖动回看任意时刻"
  />
  <select bind:value={$playSpeed} title="播放速度">
    <option value={0.5}>0.5×</option>
    <option value={1}>1×</option>
    <option value={2}>2×</option>
    <option value={4}>4×</option>
  </select>
  <div class="stats">
    <span>雾体半径 <b>{$stats.radius.toFixed(1)} m</b></span>
    <span>影响轮廓 <b>{$stats.contourRadius.toFixed(1)} m</b></span>
    <span class:hot={$stats.affectedBuildings > 0}>
      超限楼栋 <b>{$stats.affectedBuildings}</b>
    </span>
    <span class:hot={$stats.affectedPipes > 0}>
      超限管段 <b>{$stats.affectedPipes}</b>
    </span>
  </div>
</div>

<style>
  .timeline {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    background: rgba(13, 19, 30, 0.88);
    border: 1px solid #2a3a52;
    border-radius: 10px;
    backdrop-filter: blur(6px);
    color: #cfd8e3;
    font-size: 13px;
  }
  .play {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ff9933;
    background: #3a2a1a;
    color: #ffcc88;
    font-size: 16px;
    cursor: pointer;
    flex: none;
  }
  .time {
    font-family: monospace;
    white-space: nowrap;
    color: #8fa0b8;
  }
  .scrub {
    flex: 1;
    min-width: 120px;
    accent-color: #ff6633;
  }
  select {
    background: #1d2735;
    color: #dfe7f0;
    border: 1px solid #33415a;
    border-radius: 6px;
    padding: 5px;
  }
  .stats {
    display: flex;
    gap: 14px;
    white-space: nowrap;
    color: #8fa0b8;
    font-size: 12px;
  }
  .stats b {
    color: #dfe7f0;
  }
  .stats .hot b {
    color: #ff6633;
  }
  @media (max-width: 900px) {
    .stats {
      display: none;
    }
  }
</style>
