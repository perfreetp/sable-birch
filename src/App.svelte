<script lang="ts">
  import { onMount } from 'svelte'
  import Toolbar from './components/Toolbar.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import Timeline from './components/Timeline.svelte'
  import Viewer3D from './components/Viewer3D.svelte'
  import { Simulation } from './lib/simulation'
  import { generateSampleScenario } from './lib/sampleData'
  import {
    currentTime,
    duration,
    horizontalThreshold,
    playing,
    scenarioName,
    showToast,
    speed,
    toast,
    verticalThreshold
  } from './lib/stores'
  import type { Scenario } from './lib/types'

  let sim: Simulation
  let viewer: Viewer3D
  let focusHandle: { focus: (id: string) => void } | null = null
  let ready = false

  onMount(() => {
    sim = new Simulation(generateSampleScenario())
    scenarioName.set(sim.scenario.name)
    horizontalThreshold.set(sim.hThreshold)
    verticalThreshold.set(sim.vThreshold)
    ready = true
  })

  function handleSeek(t: number): void {
    playing.set(false)
    // range 控件按 step 量化，接近末尾时吸附到精确时长
    const target = $duration - t < 0.25 ? $duration : t
    viewer.seekTo(target)
  }

  function handleLoad(scenario: Scenario): void {
    sim = new Simulation(scenario)
    scenarioName.set(scenario.name)
    horizontalThreshold.set(scenario.horizontalThreshold)
    verticalThreshold.set(scenario.verticalThreshold)
    speed.set(1)
    viewer.reload(sim)
  }

  function handleThresholds(h: number, v: number): void {
    horizontalThreshold.set(h)
    verticalThreshold.set(v)
    viewer.applyThresholds(h, v)
  }

  function handleFocus(id: string): void {
    focusHandle?.focus(id)
  }
</script>

<div class="app">
  <Toolbar
    getScenario={() => sim.scenario}
    getConflicts={() => sim.getConflictList()}
    getTime={() => $currentTime}
    getDuration={() => $duration}
    onLoad={handleLoad}
    onNotify={showToast}
  />

  <div class="workspace">
    <div class="stage">
      {#if ready}
        <Viewer3D bind:this={viewer} {sim} bind:focusHandle />
      {/if}

      <div class="hud">
        <div class="hud-item">
          <span class="hud-label">状态</span>
          <span class="hud-value" class:live={$playing}>{$playing ? '播放中' : '已暂停'}</span>
        </div>
        <div class="hud-item">
          <span class="hud-label">倍速</span>
          <span class="hud-value">{$speed}×</span>
        </div>
        <div class="hud-tip">左键旋转 · 右键平移 · 滚轮缩放 · 点击航模选中</div>
      </div>

      {#if $toast}
        <div class="toast {$toast.kind}">{$toast.msg}</div>
      {/if}
    </div>

    <Sidebar onFocus={handleFocus} onThresholds={handleThresholds} />
  </div>

  <Timeline onSeek={handleSeek} />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #0b1220;
  }
  .workspace {
    flex: 1;
    display: flex;
    min-height: 0;
  }
  .stage {
    flex: 1;
    position: relative;
    min-width: 0;
  }
  .hud {
    position: absolute;
    top: 14px;
    left: 14px;
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(10, 18, 32, 0.72);
    backdrop-filter: blur(6px);
    border: 1px solid #22364f;
    border-radius: 10px;
    padding: 8px 14px;
    pointer-events: none;
  }
  .hud-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .hud-label {
    font-size: 11px;
    color: #7d96b0;
  }
  .hud-value {
    font-size: 12.5px;
    font-weight: 700;
    color: #cfe3f5;
  }
  .hud-value.live {
    color: #4ade80;
  }
  .hud-tip {
    font-size: 11px;
    color: #5d7691;
    border-left: 1px solid #2a4362;
    padding-left: 14px;
  }
  .toast {
    position: absolute;
    top: 14px;
    right: 14px;
    max-width: 360px;
    background: rgba(19, 33, 54, 0.95);
    border: 1px solid #2f4d70;
    border-radius: 10px;
    padding: 10px 15px;
    font-size: 12.5px;
    color: #cfe3f5;
    animation: slide-in 0.2s ease-out;
  }
  .toast.warn {
    border-color: #c0392b;
    color: #ffb4ae;
  }
  .toast.ok {
    border-color: #2e7d4f;
    color: #a6e8bf;
  }
  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
