<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Viewer } from '@photo-sphere-viewer/core';
  import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
  import '@photo-sphere-viewer/core/index.css';
  import '@photo-sphere-viewer/markers-plugin/index.css';
  import type { Exhibit, GalleryConfig, PathPoint } from '../types';
  import { activeExhibit, moving, speedLevel, pathIndex, panoReady, controller } from '../stores';
  import { get } from 'svelte/store';

  export let config: GalleryConfig;

  let container: HTMLDivElement;
  let viewer: Viewer;
  let markers: MarkersPlugin | null = null;

  const DEG = Math.PI / 180;
  /** 三档速度:每段路径耗时(毫秒) */
  const SEGMENT_MS = [4200, 2600, 1500];

  const markerEls = new Map<string, HTMLElement>();
  let rafId = 0;
  let cancelled = false;
  let playing = false;

  const norm = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

  function easeInOut(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /** 平滑动画到指定视角(朝向 + 缩放) */
  function animateView(to: PathPoint, duration: number): Promise<void> {
    return new Promise((resolve) => {
      cancelAnimationFrame(rafId);
      const from = viewer.getPosition();
      const fromZoom = viewer.getZoomLevel();
      const dYaw = norm(to.yaw * DEG - from.yaw);
      const dPitch = to.pitch * DEG - from.pitch;
      const dZoom = to.zoom - fromZoom;
      const start = performance.now();

      const tick = (now: number) => {
        if (cancelled) { resolve(); return; }
        const t = Math.min(1, (now - start) / duration);
        const k = easeInOut(t);
        viewer.rotate({ yaw: from.yaw + dYaw * k, pitch: from.pitch + dPitch * k });
        viewer.zoom(fromZoom + dZoom * k);
        updateHotspotFade();
        if (t < 1) rafId = requestAnimationFrame(tick);
        else resolve();
      };
      rafId = requestAnimationFrame(tick);
    });
  }

  /** 移动中按角距离渐隐热点 */
  function updateHotspotFade() {
    if (!get(moving)) return;
    const pos = viewer.getPosition();
    for (const ex of config.exhibits) {
      const el = markerEls.get(ex.id);
      if (!el) continue;
      const dy = Math.abs(norm(ex.hotspot.yaw * DEG - pos.yaw)) / DEG;
      const dp = Math.abs(ex.hotspot.pitch - pos.pitch / DEG);
      const dist = Math.hypot(dy, dp);
      el.style.opacity = String(Math.min(1, Math.max(0.12, 1.15 - dist / 70)));
    }
  }

  function restoreHotspots() {
    for (const el of markerEls.values()) el.style.opacity = '1';
  }

  function stopAnimation() {
    cancelled = true;
    cancelAnimationFrame(rafId);
    // 让挂起的 animateView promise 在本帧后解除
    setTimeout(() => { cancelled = false; }, 0);
  }

  async function playLoop() {
    if (playing) return;
    playing = true;
    moving.set(true);
    let i = get(pathIndex);
    while (playing && i < config.path.length) {
      pathIndex.set(i);
      await animateView(config.path[i], SEGMENT_MS[get(speedLevel)]);
      i++;
    }
    playing = false;
    moving.set(false);
    restoreHotspots();
  }

  function pause() {
    playing = false;
    moving.set(false);
    stopAnimation();
    restoreHotspots();
  }

  async function stepTo(index: number) {
    pause();
    const i = Math.max(0, Math.min(config.path.length - 1, index));
    pathIndex.set(i);
    moving.set(true);
    await animateView(config.path[i], SEGMENT_MS[get(speedLevel)]);
    moving.set(false);
    restoreHotspots();
  }

  async function goToExhibit(ex: Exhibit) {
    pause();
    activeExhibit.set(null);
    moving.set(true);
    await animateView(
      { yaw: ex.hotspot.yaw, pitch: ex.hotspot.pitch, zoom: 62 },
      SEGMENT_MS[get(speedLevel)]
    );
    moving.set(false);
    restoreHotspots();
    activeExhibit.set(ex);
  }

  function makeMarkerElement(ex: Exhibit): HTMLElement {
    const el = document.createElement('div');
    el.className = 'exhibit-hotspot';
    el.innerHTML = `
      <span class="hotspot-ring"></span>
      <span class="hotspot-dot"></span>
      <span class="hotspot-label">${ex.name}</span>`;
    el.title = `${ex.name} · ${ex.era}`;
    markerEls.set(ex.id, el);
    return el;
  }

  onMount(() => {
    viewer = new Viewer({
      container,
      panorama: config.panorama,
      defaultYaw: config.path[0].yaw * DEG,
      defaultPitch: config.path[0].pitch * DEG,
      defaultZoomLvl: config.path[0].zoom,
      mousewheel: true,   // 滚轮缩放
      mousemove: true,    // 鼠标拖拽
      touchmoveTwoFingers: true,
      navbar: false,
      plugins: [MarkersPlugin]
    });

    // 俯仰限制在上下 60°(v5 无内建配置,在 position-updated 中钳制)
    const PITCH_LIMIT = 60 * DEG;
    viewer.addEventListener('position-updated', (e) => {
      const p = e.position.pitch;
      if (p > PITCH_LIMIT || p < -PITCH_LIMIT) {
        viewer.rotate({
          yaw: e.position.yaw,
          pitch: Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, p))
        });
      }
    });

    viewer.addEventListener('ready', () => {
      markers = (viewer.getPlugin(MarkersPlugin) as unknown as MarkersPlugin) ?? null;
      if (!markers) return;
      for (const ex of config.exhibits) {
        markers.addMarker({
          id: ex.id,
          // HTML 标记:球面投影定位、屏幕尺寸恒定
          element: makeMarkerElement(ex),
          position: { yaw: `${ex.hotspot.yaw}deg`, pitch: `${ex.hotspot.pitch}deg` },
          anchor: 'center center',
          scale: [1, 1],
          hideList: true
        });
      }
      markers.addEventListener('select-marker', (e) => {
        const ex = config.exhibits.find((x) => x.id === e.marker.id);
        if (ex) {
          pause();
          activeExhibit.set(ex); // 在当前位置展开模型
        }
      });
      panoReady.set(true);
    });

    // 注入控制器,供侧栏与底部控制条调用
    controller.goToExhibit = goToExhibit;
    controller.play = () => { activeExhibit.set(null); playLoop(); };
    controller.pause = pause;
    controller.stepNext = () => stepTo(get(pathIndex) + 1);
    controller.stepPrev = () => stepTo(get(pathIndex) - 1);
  });

  onDestroy(() => {
    pause();
    viewer?.destroy();
  });
</script>

<div class="pano-viewport" bind:this={container}></div>

<style>
  .pano-viewport {
    position: absolute;
    inset: 0;
    background: #101218;
  }
  :global(.exhibit-hotspot) {
    position: relative;
    width: 44px;
    height: 44px;
    cursor: pointer;
    transition: opacity 0.25s ease;
  }
  :global(.exhibit-hotspot .hotspot-ring) {
    position: absolute;
    inset: 6px;
    border: 2px solid rgba(255, 214, 130, 0.95);
    border-radius: 50%;
    animation: hotspot-pulse 2s infinite;
  }
  :global(.exhibit-hotspot .hotspot-dot) {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 10px;
    margin: -5px 0 0 -5px;
    background: #ffd682;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255, 214, 130, 0.9);
  }
  :global(.exhibit-hotspot .hotspot-label) {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 12px;
    color: #fff;
    background: rgba(20, 22, 30, 0.75);
    padding: 2px 8px;
    border-radius: 4px;
    pointer-events: none;
  }
  @keyframes hotspot-pulse {
    0%   { transform: scale(0.8); opacity: 1; }
    70%  { transform: scale(1.25); opacity: 0.3; }
    100% { transform: scale(0.8); opacity: 1; }
  }
</style>
