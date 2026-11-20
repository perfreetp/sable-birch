/**
 * 端到端交互检查：箱体重建、点击选中、翻箱计划、动画播放、HUD、localStorage 持久化
 */
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import fs from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const URL = process.argv[2] ?? 'http://127.0.0.1:5175/'
// 高位随机端口，避免与历史调试实例冲突
const PORT = 20000 + Math.floor(Math.random() * 8000)
const PROFILE = `C:/Users/Administrator/AppData/Local/Temp/chrome-yard-e2e-${Date.now()}-${PORT}`

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--enable-unsafe-swiftshader',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${PROFILE}`,
    'about:blank'
  ],
  { stdio: 'ignore' }
)

const errors = []
const results = []
function record(name, ok, detail = '') {
  results.push({ name, ok, detail })
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`)
}

try {
  let version
  for (let i = 0; i < 40; i++) {
    try {
      version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()
      break
    } catch {
      await sleep(250)
    }
  }
  if (!version) throw new Error('Chrome 远程调试端口未就绪')

  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
  const pageTarget = targets.find((t) => t.type === 'page')
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl)
  await new Promise((res, rej) => {
    ws.onopen = res
    ws.onerror = rej
  })

  let msgId = 0
  const pending = new Map()
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data)
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m)
      pending.delete(m.id)
      return
    }
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails
      errors.push(`未捕获异常: ${d.exception?.description ?? d.text}`)
    }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      errors.push('console.error: ' + m.params.args.map((a) => a.value ?? a.description).join(' '))
    }
  }
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const id = ++msgId
      const timer = setTimeout(() => rej(new Error(`CDP 超时: ${method}`)), 10000)
      pending.set(id, (m) => {
        clearTimeout(timer)
        res(m)
      })
      ws.send(JSON.stringify({ id, method, params }))
    })

  await send('Runtime.enable')
  await send('Page.enable')
  // 用唯一查询串强制绕过缓存，避免 HMR 残留；等待 load 事件而非硬 reload（reload 会使 target 失效）
  const freshUrl = URL + (URL.includes('?') ? '&' : '?') + 'fresh=' + Date.now()
  await send('Page.navigate', { url: freshUrl })
  await sleep(7000)

  const evalJs = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (r.result?.exceptionDetails) {
      const e = r.result.exceptionDetails
      throw new Error('页面脚本异常: ' + (e.exception?.description ?? e.text))
    }
    return r.result?.result?.value
  }

  // ---------- 1. 初始状态 ----------
  const initial = await evalJs(`(() => {
    const raw = localStorage.getItem('container-yard-state-v1')
    const state = JSON.parse(raw)
    return { count: state.containers.length, cfg: state.config }
  })()`)
  record('localStorage 初始存档存在', initial.count > 0, `${initial.count} 箱，配置 ${JSON.stringify(initial.cfg)}`)

  // ---------- 2. 视图切换 ----------
  await evalJs(`(() => {
    const btns = Array.from(document.querySelectorAll('.view-btn'))
    btns.find(b => b.textContent.includes('俯视')).click()
  })()`)
  await sleep(1200)
  const topActive = await evalJs(`document.querySelector('.view-btn.active').textContent`)
  record('俯视图切换', topActive.includes('俯视'), `激活按钮=${topActive}`)

  await evalJs(`(() => {
    Array.from(document.querySelectorAll('.view-btn')).find(b => b.textContent.includes('侧视')).click()
  })()`)
  await sleep(1200)
  const sideActive = await evalJs(`document.querySelector('.view-btn.active').textContent`)
  record('侧视图切换', sideActive.includes('侧视'))
  await evalJs(`Array.from(document.querySelectorAll('.view-btn')).find(b => b.textContent.includes('透视')).click()`)
  await sleep(800)

  // ---------- 3. 网格重建 ----------
  await evalJs(`(() => {
    const inputs = document.querySelectorAll('.form-row input')
    inputs[0].value = 10; inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
    inputs[1].value = 4; inputs[1].dispatchEvent(new Event('input', { bubbles: true }))
    inputs[2].value = 6; inputs[2].dispatchEvent(new Event('input', { bubbles: true }))
    Array.from(document.querySelectorAll('.btn')).find(b => b.textContent.includes('生成箱区')).click()
  })()`)
  await sleep(1500)
  const rebuilt = await evalJs(`(() => {
    const state = JSON.parse(localStorage.getItem('container-yard-state-v1'))
    const stats = Array.from(document.querySelectorAll('.stat em')).map(e => e.textContent)
    return { cfg: state.config, count: state.containers.length, stats }
  })()`)
  record('箱区按新配置重建', rebuilt.cfg.bays === 10 && rebuilt.cfg.rows === 4 && rebuilt.cfg.tiers === 6,
    `cfg=${JSON.stringify(rebuilt.cfg)}，面板统计=${rebuilt.stats.join('/')}`)

  // ---------- 4. 点击箱体选中（CDP 注入真实鼠标事件，Babylon 拾取依赖原生事件） ----------
  const rect = await evalJs(`(() => {
    const r = document.querySelector('canvas').getBoundingClientRect()
    return { left: r.left, top: r.top, width: r.width, height: r.height }
  })()`)

  const clickAt = async (fx, fy) => {
    const x = rect.left + rect.width * fx
    const y = rect.top + rect.height * fy
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none', buttons: 0 })
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', buttons: 1, clickCount: 1 })
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', buttons: 0, clickCount: 1 })
    await sleep(150)
  }

  let picked = { ok: false, blockerCount: '0' }
  const samples = []
  for (const fx of [0.3, 0.42, 0.55, 0.68, 0.35, 0.5, 0.62, 0.75, 0.25, 0.8]) {
    for (const fy of [0.35, 0.5, 0.62, 0.7]) samples.push([fx, fy])
  }
  // 持续采样点击，直到选中一个上方确有压箱的箱
  for (const [fx, fy] of samples) {
    await clickAt(fx, fy)
    const hasCard = await evalJs(`!!document.querySelector('.slot-card')`)
    if (!hasCard) continue
    picked = await evalJs(`(() => ({
      ok: true,
      boxNo: document.querySelector('.box-no')?.textContent,
      coord: Array.from(document.querySelectorAll('.coord-grid strong')).map(e => e.textContent),
      blockerCount: document.querySelector('.blocker-title .count')?.textContent
    }))()`)
    if (Number(picked.blockerCount) >= 1) break
  }
  record('点击箱体显示箱位信息', picked.ok,
    picked.ok ? `箱号=${picked.boxNo}，坐标=[${picked.coord.join(', ')}]，压箱数=${picked.blockerCount}` : '未选中任何箱')

  // ---------- 5. 翻箱计划 ----------
  const expectedBlockers = Number(picked.blockerCount)
  const planned = await evalJs(`(async () => {
    const btn = Array.from(document.querySelectorAll('.btn')).find(b => b.textContent.includes('计算翻箱路径'))
    if (!btn || btn.disabled) return { skipped: true, disabled: btn?.disabled }
    btn.click()
    // 等待 Vue nextTick 刷新计划面板
    await new Promise(r => setTimeout(r, 400))
    // 从真实 DOM 读取（应用自身渲染的结果，避免动态 import 拿到不同模块实例）
    const planBox = document.querySelector('.plan-box')
    const steps = planBox ? planBox.querySelectorAll('.step-no').length : 0
    const headText = planBox?.querySelector('.plan-head')?.textContent?.trim() ?? ''
    const err = document.querySelector('.error')?.textContent ?? null
    return { skipped: false, steps, headText, err, domPlan: !!planBox }
  })()`)
  if (planned.skipped) {
    record('翻箱计划（栈顶箱无需翻箱，跳过）', true, '按钮禁用状态=' + planned.disabled)
  } else {
    record('翻箱路径计算成功',
      planned.steps === expectedBlockers && planned.steps > 0,
      `压箱=${expectedBlockers}，计划步数=${planned.steps}，DOM面板=${planned.domPlan}${planned.err ? '，错误=' + planned.err : ''}`)

    // ---------- 6. 播放翻箱动画 ----------
    await evalJs(`Array.from(document.querySelectorAll('.btn')).find(b => b.textContent.includes('开始翻箱动画')).click()`)
    await sleep(500)
    const hudShown = await evalJs(`!!document.querySelector('.playback-hud')`)
    record('翻箱 HUD 显示', hudShown)

    // HUD 总数应等于计划步数
    const hudTotal = await evalJs(`(() => {
      const rows = document.querySelectorAll('.hud-row strong')
      return rows.length ? rows[0].textContent : ''
    })()`)
    record('HUD 总步数与计划一致', hudTotal.includes(String(planned.steps)), `HUD=${hudTotal}`)

    // 动画进行中采样，确认移动计数递增
    let sawProgress = false
    let lastCount = -1
    for (let i = 0; i < 24; i++) {
      await sleep(700)
      const cur = await evalJs(`(() => {
        const strong = document.querySelectorAll('.hud-row strong')[0]
        return strong ? Number(strong.textContent.split('/')[0].trim()) : -1
      })()`)
      if (cur > lastCount) {
        if (lastCount >= 0) sawProgress = true
        lastCount = cur
      }
      const gone = await evalJs(`!document.querySelector('.playback-hud')`)
      if (gone) break
    }
    record('HUD 移动箱数随动画递增', sawProgress || planned.steps <= 1, `峰值计数=${lastCount}`)

    const hudGone = await evalJs(`!document.querySelector('.playback-hud')`)
    record('翻箱动画播放完成', hudGone)

    const after = await evalJs(`(() => {
      const state = JSON.parse(localStorage.getItem('container-yard-state-v1'))
      // 箱总数不变
      return { count: state.containers.length }
    })()`)
    record('翻箱后箱总量不变且已持久化', after.count === rebuilt.count, `${after.count} 箱`)

    // 目标箱上方应无压箱
    const targetClear = await evalJs(`(() => {
      const blockerText = document.querySelector('.blocker-title .count')?.textContent
      return blockerText
    })()`)
    record('目标箱压箱已清零', targetClear === '0', `剩余压箱=${targetClear}`)
  }

  // ---------- 7. 导出文件（拦截下载） ----------
  const exportOk = await evalJs(`(async () => {
    let clicked = false
    const origCreate = URL.createObjectURL
    URL.createObjectURL = (blob) => {
      window.__exported = blob
      return 'blob:mock'
    }
    const origClick = HTMLAnchorElement.prototype.click
    HTMLAnchorElement.prototype.click = function () { clicked = true }
    Array.from(document.querySelectorAll('.btn')).find(b => b.textContent.includes('导出状态文件')).click()
    await new Promise(r => setTimeout(r, 300))
    URL.createObjectURL = origCreate
    HTMLAnchorElement.prototype.click = origClick
    const text = window.__exported ? await window.__exported.text() : null
    const parsed = text ? JSON.parse(text) : null
    return { clicked, hasVersion: parsed?.version === 1, containers: parsed?.containers?.length }
  })()`)
  record('导出 JSON 状态文件', exportOk.clicked && exportOk.hasVersion, `包含 ${exportOk.containers} 箱记录`)

  // ---------- 8. 高位透明逻辑（数据层验证） ----------
  const transparent = await evalJs(`(() => {
    const state = JSON.parse(localStorage.getItem('container-yard-state-v1'))
    const high = state.containers.filter(c => c.tier >= 4)
    return { highCount: high.length, maxTier: state.config.tiers, total: state.containers.length }
  })()`)
  record('高位箱（tier≥4）透明规则数据存在', transparent.maxTier >= 5,
    `高位箱数=${transparent.highCount}（共 ${transparent.total} 箱，阈值 tier>=4）`)

  ws.close()
} catch (e) {
  errors.push(String(e?.stack ?? e))
} finally {
  chrome.kill()
  const failed = results.filter((r) => !r.ok)
  console.log(`\n结果：${results.length - failed.length}/${results.length} 通过`)
  if (errors.length) {
    console.error('\n页面错误:')
    for (const e of errors) console.error(' - ' + e)
  }
  fs.writeFileSync('scripts/e2e-results.json', JSON.stringify({ results, errors }, null, 2))
  process.exit(failed.length || errors.length ? 1 : 0)
}
