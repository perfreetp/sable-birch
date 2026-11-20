<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { SceneManager } from '../lib/scene/SceneManager'
  import type { Simulation } from '../lib/simulation'
  import {
    activeConflictCount,
    conflictList,
    currentTime,
    duration,
    playing,
    selectedId,
    speed,
    summaries,
    totalConflictCount
  } from '../lib/stores'

  export let sim: Simulation
  /** 供父组件调用的聚焦回调句柄 */
  export let focusHandle: { focus: (id: string) => void } | null = null

  let container: HTMLDivElement
  let manager: SceneManager
  let raf = 0
  let lastWall = 0
  let uiAccum = 0

  onMount(() => {
    manager = new SceneManager(container)
    manager.loadSimulation(sim)
    focusHandle = {
      focus: (id: string) => manager.focusOn(id)
    }
    manager.onPick = (id) => selectedId.set(id)
    manager.onBackgroundClick = () => selectedId.set(null)

    duration.set(sim.duration)
    currentTime.set(0)
    pushUiState(true)

    lastWall = performance.now()
    const loop = (now: number) => {
      const wallDt = Math.min((now - lastWall) / 1000, 0.1)
      lastWall = now

      const isPlaying = $playing
      const spd = $speed
      let t = $currentTime

      if (isPlaying) {
        t += wallDt * spd
        if (t >= sim.duration) {
          t = sim.duration
          playing.set(false)
        }
        sim.evaluate(t)
        currentTime.set(t)
        manager.update(t, true)
      } else {
        manager.update(t, false)
      }

      // UI 状态 10Hz 节流刷新（避免每帧触发 Svelte 重渲染）
      uiAccum += wallDt
      if (uiAccum > 0.1) {
        uiAccum = 0
        pushUiState(false)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      manager.dispose()
    }
  })

  function pushUiState(force: boolean): void {
    summaries.set(sim.getSummaries())
    const list = sim.getConflictList()
    conflictList.set(list)
    totalConflictCount.set(list.length)
    activeConflictCount.set(list.filter((c) => c.active).length)
    if (force) currentTime.set(sim.time)
  }

  // 父组件更换场景（载入新文件）时重建
  export function reload(newSim: Simulation): void {
    sim = newSim
    manager.loadSimulation(sim)
    duration.set(sim.duration)
    currentTime.set(0)
    playing.set(false)
    selectedId.set(null)
    pushUiState(true)
  }
  export function seekTo(t: number): void {
    sim.scrubTo(t)
    currentTime.set(t)
    manager.handleScrub(t)
    pushUiState(true)
  }

  // 阈值调整后重建冲突
  export function applyThresholds(h: number, v: number): void {
    sim.setThresholds(h, v)
    manager.refresh(sim.time)
    pushUiState(true)
  }

  onDestroy(() => cancelAnimationFrame(raf))
</script>

<div class="viewer" bind:this={container}></div>

<style>
  .viewer {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .viewer :global(canvas) {
    display: block;
  }
</style>
