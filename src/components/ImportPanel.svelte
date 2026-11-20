<script>
  import { viewer } from '../lib/viewer.js';
  import { exportLivery, importLivery } from '../lib/livery.js';
  import { meshList, modelName, ZONES, setStatus } from '../lib/store.js';

  let gltfInput;
  let liveryInput;

  function onGLTF(e) {
    const file = e.target.files[0];
    if (file) viewer.loadGLTF(file);
    e.target.value = '';
  }

  function onLivery(e) {
    const file = e.target.files[0];
    if (file) importLivery(file, viewer);
    e.target.value = '';
  }
</script>

<div class="panel">
  <section>
    <h3>机体模型</h3>
    <div class="current">当前:{$modelName || '未加载'}</div>
    <button class="btn" on:click={() => viewer.loadDefaultModel()}>
      加载内置演示模型
    </button>
    <button class="btn" on:click={() => gltfInput.click()}>
      导入 glTF / GLB 模型…
    </button>
    <input
      bind:this={gltfInput}
      type="file"
      accept=".glb,.gltf"
      hidden
      on:change={onGLTF}
    />
    <p class="note">
      导入后按部件名称自动分区(fuselage/wing/door 等关键词),也可在下方手动调整。
    </p>
  </section>

  <section>
    <h3>涂装文件</h3>
    <button class="btn primary" on:click={() => exportLivery(viewer)}>
      导出涂装文件(遮罩 + 材质)
    </button>
    <button class="btn" on:click={() => liveryInput.click()}>
      导入涂装文件…
    </button>
    <input
      bind:this={liveryInput}
      type="file"
      accept=".json"
      hidden
      on:change={onLivery}
    />
    <p class="note">导入涂装文件可还原全部漆面遮罩、部件分区与材质参数。</p>
  </section>

  <section>
    <h3>部件分区({$meshList.length})</h3>
    <div class="mesh-list">
      {#each $meshList as m}
        <div class="mesh-row">
          <span class="mesh-name" title={m.name}>{m.name}</span>
          {#if m.paintable}
            <select
              value={m.zone}
              on:change={(e) => viewer.setZone(m.name, e.currentTarget.value)}
            >
              {#each ZONES as z}
                <option value={z.id}>{z.label}</option>
              {/each}
            </select>
          {:else}
            <span class="fixed">固定材质</span>
          {/if}
        </div>
      {/each}
    </div>
  </section>
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
  .current {
    font-size: 13px;
    color: #dfe6ee;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .btn {
    background: #1c232d;
    border: 1px solid #323c49;
    color: #cfd8e2;
    font-size: 13px;
    padding: 8px 10px;
    border-radius: 7px;
    cursor: pointer;
    text-align: center;
  }
  .btn:hover {
    background: #242d39;
  }
  .btn.primary {
    background: #2f6fed;
    border-color: #2f6fed;
    color: #fff;
  }
  .btn.primary:hover {
    background: #3d7bf0;
  }
  .note {
    margin: 0;
    font-size: 12px;
    color: #6d7885;
    line-height: 1.5;
  }
  .mesh-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 260px;
    overflow-y: auto;
  }
  .mesh-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #151b23;
    border: 1px solid #232c37;
    border-radius: 6px;
    padding: 5px 8px;
  }
  .mesh-name {
    font-size: 12px;
    color: #b8c2cd;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  select {
    background: #1c232d;
    color: #cfd8e2;
    border: 1px solid #323c49;
    border-radius: 5px;
    font-size: 12px;
    padding: 3px 6px;
  }
  .fixed {
    font-size: 11px;
    color: #5d6874;
  }
</style>
