<script lang="ts">
  import { scenarioName } from '../lib/stores'
  import { exportConflictsCsv, exportJson } from '../lib/exportData'
  import { validateScenario } from '../lib/sampleData'
  import type { ConflictRecord, Scenario } from '../lib/types'

  export let getScenario: () => Scenario
  export let getConflicts: () => ConflictRecord[]
  export let getTime: () => number
  export let getDuration: () => number
  export let onLoad: (scenario: Scenario) => void
  export let onNotify: (msg: string, kind?: 'info' | 'warn' | 'ok') => void

  let fileInput: HTMLInputElement

  function triggerLoad(): void {
    fileInput.click()
  }

  async function handleFile(e: Event): Promise<void> {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      let raw: unknown
      try {
        raw = JSON.parse(text)
      } catch {
        throw new Error('JSON 解析失败，请检查文件格式')
      }
      // 兼容导出文件结构（payload.tracks）与原始场景结构
      const wrapped = raw as { tracks?: unknown }
      const candidate = Array.isArray(wrapped.tracks)
        ? { ...(raw as object), aircraft: wrapped.tracks }
        : raw
      const scenario = validateScenario(candidate)
      onLoad(scenario)
      onNotify(`已载入场景：${scenario.name}（${scenario.aircraft.length} 架飞行器）`, 'ok')
    } catch (err) {
      onNotify(`载入失败：${(err as Error).message}`, 'warn')
    } finally {
      input.value = ''
    }
  }

  function doExportJson(): void {
    const name = exportJson(getScenario(), getConflicts(), getTime(), getDuration())
    onNotify(`已导出 ${name}`, 'ok')
  }

  function doExportCsv(): void {
    const list = getConflicts()
    if (list.length === 0) {
      onNotify('当前没有冲突记录可导出', 'warn')
      return
    }
    const name = exportConflictsCsv(list)
    onNotify(`已导出 ${name}`, 'ok')
  }
</script>

<header class="toolbar">
  <div class="brand">
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z" fill="#4fc3f7"/>
    </svg>
    <div>
      <h1>城市空中交通航迹推演</h1>
      <span class="scenario">{$scenarioName}</span>
    </div>
  </div>

  <div class="actions">
    <button on:click={triggerLoad}>
      <svg viewBox="0 0 24 24" width="15" height="15"><path d="M5 20h14v-2H5v2zM12 3l-5 5h3v6h4V8h3l-5-5z" fill="currentColor"/></svg>
      载入航迹
    </button>
    <button on:click={doExportJson}>
      <svg viewBox="0 0 24 24" width="15" height="15"><path d="M5 4h10l4 4v12H5V4zm8 1.5V9h3.5L13 5.5zM8 13h8v2H8v-2zm0 4h8v2H8v-2z" fill="currentColor"/></svg>
      导出推演结果
    </button>
    <button on:click={doExportCsv}>
      <svg viewBox="0 0 24 24" width="15" height="15"><path d="M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h18v4H3v-4z" fill="currentColor"/></svg>
      导出冲突 CSV
    </button>
    <input
      bind:this={fileInput}
      type="file"
      accept=".json,application/json"
      hidden
      on:change={handleFile}
    />
  </div>
</header>

<style>
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px;
    background: linear-gradient(180deg, #15243b, #101c2e);
    border-bottom: 1px solid #22364f;
    flex-shrink: 0;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 11px;
    min-width: 0;
  }
  .brand h1 {
    font-size: 15px;
    margin: 0;
    color: #eaf4ff;
    letter-spacing: 0.5px;
  }
  .scenario {
    font-size: 11px;
    color: #6f8aa5;
  }
  .actions {
    display: flex;
    gap: 9px;
    flex-shrink: 0;
  }
  .actions button {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #1b2f49;
    border: 1px solid #2f4d70;
    color: #cfe3f5;
    border-radius: 8px;
    padding: 7px 13px;
    font-size: 12.5px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .actions button:hover {
    background: #244063;
    border-color: #4a90ff;
    color: #fff;
  }
</style>
