// 视觉与自动档位验证：截图 + 模拟相机缩放观察 activeTier 变化
import { writeFileSync } from 'node:fs'
const base = 'http://localhost:9222'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getTarget() {
  try {
    const res = await fetch(`${base}/json/new?http://localhost:5180/`, { method: 'PUT' })
    if (res.ok) return await res.json()
  } catch { /* fall through */ }
  const list = await (await fetch(`${base}/json`)).json()
  return list.find((t) => t.type === 'page')
}

async function main() {
  const target = await getTarget()
  const ws = new WebSocket(target.webSocketDebuggerUrl)
  let id = 0
  const pending = new Map()
  const exceptions = []
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
    } else if (msg.method === 'Runtime.exceptionThrown') {
      exceptions.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text)
    }
  })
  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const mid = ++id
    pending.set(mid, { resolve, reject })
    ws.send(JSON.stringify({ id: mid, method, params }))
  })
  await send('Runtime.enable')
  await send('Page.enable')
  const evalJs = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
    return r.result?.value
  }

  await sleep(8000)
  const { deviceMetrics } = { deviceMetrics: { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false } }
  await send('Emulation.setDeviceMetricsOverride', deviceMetrics)
  await sleep(1500)

  // 自动档位：初始距离
  const tierFar = await evalJs(`document.querySelector('.panel-header span').textContent`)
  // 滚轮放大（向相机靠近模型）
  const rect = await evalJs(`(() => { const c = document.querySelector('.viewport-canvas canvas').getBoundingClientRect(); return {x:c.x+c.width/2,y:c.y+c.height/2} })()`)
  for (let i = 0; i < 12; i++) {
    await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: rect.x, y: rect.y, deltaY: -120, deltaX: 0 })
    await sleep(180)
  }
  await sleep(1200)
  const tierNear = await evalJs(`document.querySelector('.panel-header span').textContent`)
  console.log('TIER FAR:', tierFar, '| TIER NEAR (after zoom-in):', tierNear)

  // 放一个标注点并截图
  await evalJs(`[...document.querySelectorAll('.viewport-toolbar button')].find(b => b.textContent.includes('表面点选标注')).click()`)
  await sleep(200)
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: rect.x, y: rect.y, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: rect.x, y: rect.y, button: 'left', clickCount: 1 })
  await sleep(600)

  const shot1 = await send('Page.captureScreenshot', { format: 'png' })
  writeFileSync('D:/ccfb/runs/1000159/workspace/scripts/shot-annotated.png', Buffer.from(shot1.data, 'base64'))

  // 切到 1 档与 8 档截图对比纹理
  await evalJs(`document.querySelectorAll('.tier-dot')[0].click()`)
  await sleep(700)
  const shot2 = await send('Page.captureScreenshot', { format: 'png' })
  writeFileSync('D:/ccfb/runs/1000159/workspace/scripts/shot-tier1.png', Buffer.from(shot2.data, 'base64'))

  await evalJs(`document.querySelectorAll('.tier-dot')[7].click()`)
  await sleep(700)
  const shot3 = await send('Page.captureScreenshot', { format: 'png' })
  writeFileSync('D:/ccfb/runs/1000159/workspace/scripts/shot-tier8.png', Buffer.from(shot3.data, 'base64'))

  // 关闭漫反射，只看法线
  await evalJs(`document.querySelectorAll('.switch-row input[type=checkbox]')[0].click()`)
  await sleep(500)
  const shot4 = await send('Page.captureScreenshot', { format: 'png' })
  writeFileSync('D:/ccfb/runs/1000159/workspace/scripts/shot-normal-only.png', Buffer.from(shot4.data, 'base64'))

  console.log('SCREENSHOTS WRITTEN')
  console.log('EXCEPTIONS:', exceptions.length)
  if (exceptions.length) console.log(exceptions.slice(0, 3).join('\n'))
  ws.close()
  try { await fetch(`${base}/json/close/${target.id}`, { method: 'PUT' }) } catch { /* ignore */ }
  process.exit(exceptions.length ? 1 : 0)
}
main().catch((e) => { console.error('HARNESS ERROR:', e); process.exit(2) })
