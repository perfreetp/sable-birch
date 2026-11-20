<script>
  import {
    material,
    envIndex,
    displayMode,
    METALNESS_STEPS,
    ROUGHNESS_STEPS,
    ENVIRONMENTS,
    DISPLAY_MODES
  } from '../lib/store.js';

  const DEFAULTS = {
    primer: '#8a8f94',
    metalness: 3,
    roughness: 1,
    clearcoat: 0.8,
    clearcoatGloss: 0.75
  };

  function set(key, value) {
    material.update((m) => ({ ...m, [key]: value }));
  }
</script>

<div class="panel">
  <section>
    <h3>① 底漆层</h3>
    <div class="row">
      <span class="label">底漆颜色</span>
      <input
        type="color"
        value={$material.primer}
        on:input={(e) => set('primer', e.currentTarget.value)}
      />
      <span class="val">{$material.primer}</span>
    </div>
    <p class="note">未涂漆区域显示为底漆,作为分色遮罩的底色。</p>
  </section>

  <section>
    <h3>② 金属漆层</h3>
    <span class="label">金属度({METALNESS_STEPS[$material.metalness].toFixed(2)})</span>
    <div class="seg">
      {#each METALNESS_STEPS as _, i}
        <button
          class:active={$material.metalness === i}
          on:click={() => set('metalness', i)}>{i + 1}</button
        >
      {/each}
    </div>
    <span class="label">粗糙度({ROUGHNESS_STEPS[$material.roughness].toFixed(2)})</span>
    <div class="seg">
      {#each ROUGHNESS_STEPS as _, i}
        <button
          class:active={$material.roughness === i}
          on:click={() => set('roughness', i)}>{i + 1}</button
        >
      {/each}
    </div>
  </section>

  <section>
    <h3>③ 清漆层</h3>
    <div class="row">
      <span class="label">厚度</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={$material.clearcoat}
        on:input={(e) => set('clearcoat', +e.currentTarget.value)}
      />
      <span class="val">{$material.clearcoat.toFixed(2)}</span>
    </div>
    <div class="row">
      <span class="label">光泽</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={$material.clearcoatGloss}
        on:input={(e) => set('clearcoatGloss', +e.currentTarget.value)}
      />
      <span class="val">{$material.clearcoatGloss.toFixed(2)}</span>
    </div>
  </section>

  <section>
    <h3>环境光照(查看反射变化)</h3>
    <div class="seg">
      {#each ENVIRONMENTS as env}
        <button
          class:active={$envIndex === env.id}
          on:click={() => envIndex.set(env.id)}>{env.label}</button
        >
      {/each}
    </div>
  </section>

  <section>
    <h3>显示模式</h3>
    <div class="seg">
      {#each DISPLAY_MODES as dm}
        <button
          class:active={$displayMode === dm.id}
          on:click={() => displayMode.set(dm.id)}>{dm.label}</button
        >
      {/each}
    </div>
  </section>

  <button class="btn" on:click={() => material.set({ ...DEFAULTS })}>
    重置材质参数
  </button>
  <p class="note">材质配置会自动保存到浏览器本地存储。</p>
</div>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  h3 {
    margin: 0;
    font-size: 13px;
    color: #7f8b99;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .label {
    font-size: 12px;
    color: #9aa6b2;
    min-width: 56px;
  }
  .val {
    font-size: 12px;
    color: #9aa6b2;
    font-family: monospace;
    min-width: 38px;
    text-align: right;
  }
  input[type='color'] {
    width: 44px;
    height: 30px;
    border: 1px solid #323c49;
    border-radius: 6px;
    background: #1c232d;
    padding: 2px;
    cursor: pointer;
  }
  input[type='range'] {
    flex: 1;
    accent-color: #2f6fed;
  }
  .seg {
    display: flex;
    background: #1c232d;
    border: 1px solid #323c49;
    border-radius: 7px;
    overflow: hidden;
  }
  .seg button {
    flex: 1;
    background: transparent;
    border: none;
    color: #9aa6b2;
    font-size: 13px;
    padding: 7px 0;
    cursor: pointer;
  }
  .seg button + button {
    border-left: 1px solid #323c49;
  }
  .seg button.active {
    background: #2f6fed;
    color: #fff;
  }
  .btn {
    background: #1c232d;
    border: 1px solid #323c49;
    color: #cfd8e2;
    font-size: 13px;
    padding: 8px 10px;
    border-radius: 7px;
    cursor: pointer;
  }
  .btn:hover {
    background: #242d39;
  }
  .note {
    margin: 0;
    font-size: 12px;
    color: #6d7885;
  }
</style>
