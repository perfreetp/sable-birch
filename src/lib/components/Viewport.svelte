<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { SceneManager } from '../three/sceneManager';
  import {
    selectedShip,
    selectedBerth,
    simResult,
    playbackTime,
    playbackRunning,
    playbackSpeed,
    input
  } from '../store';
  import type { SimResult } from '../types';
  import { deg2rad } from '../sim/math';

  let host: HTMLDivElement;
  let scene: SceneManager;
  let follow = $state(true);
  let loadedKey = '';

  onMount(() => {
    scene = new SceneManager(host);
    scene.setFollow(true);
    rebuild();

    const unsubResult = simResult.subscribe((r) => {
      if (r) scene.setFrame({ sample: r.samples[0], time: 0 });
    });
    const unsubTime = playbackTime.subscribe((t) => {
      const r = get(simResult);
      if (!r) return;
      scene.setFrame({ sample: sampleAt(r, t), time: t });
    });

    let last = performance.now();
    let raf = 0;
    const tick = (now: number): void => {
      const dt = (now - last) / 1000;
      last = now;
      const r = get(simResult);
      if (get(playbackRunning) && r) {
        let t = get(playbackTime) + dt * get(playbackSpeed);
        if (t >= r.duration) {
          t = r.duration;
          playbackRunning.set(false);
        }
        playbackTime.set(t);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      unsubResult();
      unsubTime();
    };
  });

  onDestroy(() => scene?.dispose());

  function sampleAt(r: SimResult, t: number) {
    const dt = r.samples[1]?.t ?? 0.1;
    const idx = Math.max(0, Math.min(r.samples.length - 1, Math.round(t / dt)));
    return r.samples[idx];
  }

  function rebuild(): void {
    const ship = get(selectedShip);
    const berth = get(selectedBerth);
    const thr = get(input).tensionThreshold;
    const key = ship.id + berth.id + thr;
    if (key !== loadedKey) {
      scene.loadScene(ship, berth, thr);
      loadedKey = key;
    }
    if (!get(simResult)) {
      const p = get(input);
      scene.showPreview(ship, berth, deg2rad(p.berthAngleDeg), {
        x: p.initialAlongPos,
        z: p.initialOffshoreDist
      });
    }
  }

  // 船型/泊位/阈值变化时重建场景；重新仿真后恢复预览
  $effect(() => {
    void $selectedShip;
    void $selectedBerth;
    void $input.tensionThreshold;
    if (scene) rebuild();
  });
  $effect(() => {
    void $simResult;
    if (scene && !$simResult) rebuild();
  });

  function toggleFollow(): void {
    follow = !follow;
    scene.setFollow(follow);
  }
</script>

<div class="viewport">
  <div bind:this={host} class="host"></div>
  <div class="toolbar">
    <button class:on={follow} onclick={toggleFollow}>跟随视角</button>
    <button onclick={() => scene.resetView()}>复位视角</button>
  </div>
</div>

<style>
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 320px;
  }
  .host {
    width: 100%;
    height: 100%;
  }
  .toolbar {
    position: absolute;
    right: 12px;
    top: 12px;
    display: flex;
    gap: 8px;
  }
  button {
    background: rgba(12, 20, 28, 0.78);
    color: #cfe0ee;
    border: 1px solid #2c4255;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
  }
  button.on {
    background: #1d6a86;
    border-color: #38a3c6;
  }
  button:hover {
    border-color: #5a89a8;
  }
</style>
