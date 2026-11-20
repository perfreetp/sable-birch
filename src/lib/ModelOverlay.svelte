<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { activeExhibit } from '../stores';
  import { buildProceduralModel, normalizeModel } from './models';

  let canvasWrap: HTMLDivElement;
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let modelGroup: THREE.Group | null = null;
  let rafId = 0;
  let loading = false;
  let loadError = '';

  $: exhibit = $activeExhibit;
  $: if (exhibit && renderer) loadModel(exhibit);

  function initScene() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 透明,叠加在全景之上
    canvasWrap.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
    camera.position.set(0, 0.6, 3);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xfff2dd, 1.6);
    key.position.set(2, 3, 2);
    const fill = new THREE.DirectionalLight(0xdde8ff, 0.7);
    fill.position.set(-2, 1, -2);
    scene.add(key, fill);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 1.2;
    controls.maxDistance = 6;
    controls.autoRotate = true;          // 缓慢自动旋转,交互后暂停
    controls.autoRotateSpeed = 1.2;
    controls.addEventListener('start', () => { controls.autoRotate = false; });

    resize();
    loop();
  }

  function resize() {
    if (!renderer || !canvasWrap) return;
    const w = canvasWrap.clientWidth || 1;
    const h = canvasWrap.clientHeight || 1;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function loop() {
    rafId = requestAnimationFrame(loop);
    controls?.update();
    if (renderer && scene && camera) renderer.render(scene, camera);
  }

  async function loadModel(ex: NonNullable<typeof $activeExhibit>) {
    loading = true;
    loadError = '';
    if (modelGroup) {
      scene.remove(modelGroup);
      modelGroup = null;
    }
    try {
      if (ex.model.type === 'gltf') {
        const gltf = await new GLTFLoader().loadAsync(ex.model.url);
        modelGroup = new THREE.Group();
        modelGroup.add(gltf.scene);
      } else {
        modelGroup = buildProceduralModel(ex.model.shape);
      }
      normalizeModel(modelGroup);
      scene.add(modelGroup);
      camera.position.set(0, 0.6, 3);
      controls.target.set(0, 0, 0);
      controls.autoRotate = true;
    } catch (err) {
      loadError = '模型加载失败:' + (err instanceof Error ? err.message : String(err));
    } finally {
      loading = false;
    }
  }

  function close() {
    activeExhibit.set(null); // 关闭后回到全景
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }

  onMount(() => {
    initScene();
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', onKeydown);
  });

  onDestroy(() => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('keydown', onKeydown);
    controls?.dispose();
    renderer?.dispose();
  });
</script>

{#if exhibit}
  <!-- 半透明背景叠加在全景之上 -->
  <div class="model-overlay">
    <div class="model-panel">
      <div class="model-header">
        <div>
          <h2>{exhibit.name}</h2>
          <span class="era">{exhibit.era}</span>
        </div>
        <button class="close-btn" on:click={close} title="关闭 (Esc)">✕</button>
      </div>

      <div class="model-canvas" bind:this={canvasWrap}>
        {#if loading}<div class="hint">模型加载中…</div>{/if}
        {#if loadError}<div class="hint error">{loadError}</div>{/if}
      </div>

      <div class="model-footer">
        <p>{exhibit.description}</p>
        <span class="tip">拖拽旋转 · 滚轮缩放 · Esc 关闭</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .model-overlay {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 半透明背景,全景隐约可见 */
    background: rgba(8, 10, 16, 0.55);
    backdrop-filter: blur(3px);
  }
  .model-panel {
    width: min(720px, 92%);
    height: min(560px, 88%);
    display: flex;
    flex-direction: column;
    background: rgba(18, 20, 28, 0.72);
    border: 1px solid rgba(255, 214, 130, 0.35);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
  }
  .model-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .model-header h2 {
    margin: 0;
    font-size: 18px;
    color: #f2e7c8;
  }
  .era {
    font-size: 12px;
    color: #b9ac8d;
  }
  .close-btn {
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #eee;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
  }
  .close-btn:hover { background: rgba(255, 255, 255, 0.12); }
  .model-canvas {
    position: relative;
    flex: 1;
    min-height: 0;
  }
  .model-canvas :global(canvas) {
    display: block;
  }
  .hint {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cfc6ae;
    font-size: 14px;
  }
  .hint.error { color: #ff9a8a; }
  .model-footer {
    padding: 10px 18px 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .model-footer p {
    margin: 0 0 6px;
    font-size: 13px;
    color: #d8d2c2;
    line-height: 1.6;
  }
  .tip {
    font-size: 11px;
    color: #8f8875;
  }
</style>
