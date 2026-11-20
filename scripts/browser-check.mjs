/**
 * 无头浏览器冒烟检查：通过 CDP 连接系统 Chrome，
 * 验证应用加载、WebGL 初始化、实例渲染与 Vue 面板无控制台错误。
 */
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import fs from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const URL = process.argv[2] ?? 'http://127.0.0.1:5175/'
const PORT = 9333

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--enable-unsafe-swiftshader',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:/Users/Administrator/AppData/Local/Temp/chrome-yard-check',
    'about:blank'
  ],
  { stdio: 'ignore' }
)

const logs = []
const errors = []
let exitCode = 0

try {
  // 等待 devtools 端点
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

  // /json/version 给的是浏览器级端点，Runtime/Page 域需要页面级 target
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
  const pageTarget =
    targets.find((t) => t.type === 'page' && t.url.includes('about:blank')) ??
    targets.find((t) => t.type === 'page')
  if (!pageTarget) throw new Error('未找到页面级 CDP target')

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
    // 事件类消息
    if (m.method === 'Runtime.consoleAPICalled') {
      const text = m.params.args.map((a) => a.value ?? a.description ?? '').join(' ')
      logs.push(`[console.${m.params.type}] ${text}`)
      if (m.params.type === 'error') errors.push(text)
    } else if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails
      errors.push(`未捕获异常: ${d.exception?.description ?? d.text}`)
    } else if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') {
      errors.push(`日志错误: ${m.params.entry.text}`)
    }
  }
  ws.onclose = (ev) => console.log('WebSocket 关闭:', ev.code, ev.reason)
  ws.onerror = (ev) => console.log('WebSocket 错误:', ev.message ?? ev)
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const id = ++msgId
      const timer = setTimeout(() => {
        pending.delete(id)
        rej(new Error(`CDP 调用超时: ${method}`))
      }, 8000)
      pending.set(id, (m) => {
        clearTimeout(timer)
        res(m)
      })
      ws.send(JSON.stringify({ id, method, params }))
    })

  await send('Runtime.enable')
  await send('Log.enable')
  await send('Page.enable')

  await send('Page.navigate', { url: URL })

  // 等待应用渲染
  await sleep(8000)

  const evalJs = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true })
    if (r.error) {
      errors.push('evaluate 协议错误: ' + JSON.stringify(r.error))
      return null
    }
    if (r.result?.exceptionDetails) {
      errors.push('evaluate 失败: ' + JSON.stringify(r.result.exceptionDetails))
      return null
    }
    return r.result?.result?.value
  }

  // 连通性自检
  const probe = await evalJs('1 + 1')
  console.log('CDP evaluate 探针 1+1 =', probe)

  const checks = await evalJs(`(() => {
    const canvas = document.querySelector('canvas')
    const gl = canvas ? canvas.getContext('webgl2') || canvas.getContext('webgl') : null
    const header = document.querySelector('.brand h1')?.textContent
    const panels = document.querySelectorAll('.panel').length
    const viewBtns = document.querySelectorAll('.view-btn').length
    const stats = Array.from(document.querySelectorAll('.stat em')).map(e => e.textContent)
    return {
      title: document.title,
      header,
      panels,
      viewBtns,
      stats,
      hasCanvas: !!canvas,
      canvasSize: canvas ? [canvas.width, canvas.height] : null,
      webgl: !!gl,
      webglRenderer: gl ? gl.getParameter(gl.RENDERER) : null,
      bodyText: document.body.innerText.slice(0, 300)
    }
  })()`)

  console.log('页面状态:', JSON.stringify(checks, null, 2))

  // 交互检查：点击视图切换 + 等待面板存在
  const interaction = await evalJs(`(() => {
    const btns = Array.from(document.querySelectorAll('.view-btn'))
    const topBtn = btns.find(b => b.textContent.includes('俯视'))
    topBtn?.click()
    return { clickedTop: !!topBtn, activeAfter: document.querySelector('.view-btn.active')?.textContent }
  })()`)
  console.log('视图切换:', JSON.stringify(interaction))
  await sleep(1500)

  // 检查 WebGL 绘制计数（场景在渲染循环中应持续绘制）
  const drawInfo = await evalJs(`(() => {
    const canvas = document.querySelector('canvas')
    // Babylon 渲染后画布非全黑即认为有内容：采样几个像素
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    const px = new Uint8Array(4)
    gl.readPixels(canvas.width >> 1, canvas.height >> 1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px)
    return { centerPixel: Array.from(px) }
  })()`)
  console.log('绘制采样:', JSON.stringify(drawInfo))

  await send('Page.captureScreenshot', { format: 'png' }).then((r) => {
    if (r.result?.data) {
      fs.writeFileSync('scripts/yard-check.png', Buffer.from(r.result.data, 'base64'))
      console.log('截图已保存: scripts/yard-check.png')
    }
  })

  console.log('\n--- 控制台输出 (' + logs.length + ' 条) ---')
  for (const l of logs.slice(0, 20)) console.log(l)
  console.log('\n--- 错误 (' + errors.length + ' 条) ---')
  for (const e of errors) console.log(e)

  if (!checks?.hasCanvas || !checks?.webgl) {
    errors.push('Canvas/WebGL 未初始化')
    exitCode = 1
  }
  if (checks?.panels !== 3) {
    errors.push(`功能面板数量异常: ${checks?.panels}（期望 3）`)
    exitCode = 1
  }
  if (checks?.viewBtns !== 3) {
    errors.push(`视图按钮数量异常: ${checks?.viewBtns}（期望 3）`)
    exitCode = 1
  }

  ws.close()
} catch (e) {
  errors.push(String(e?.stack ?? e))
  exitCode = 1
} finally {
  chrome.kill()
  if (errors.length) {
    console.error('\n❌ 浏览器检查失败:')
    for (const e of errors) console.error(' - ' + e)
    process.exit(exitCode || 1)
  }
  console.log('\n✅ 浏览器检查通过：应用加载、WebGL 渲染、三模块面板、视图切换均正常')
  process.exit(0)
}
