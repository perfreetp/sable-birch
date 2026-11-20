// 无头浏览器冒烟测试：通过 CDP 连接 Chrome，加载应用并验证关键运行时行为
const base = 'http://localhost:9222'

async function getTarget() {
  // 优先新建；若端点拒绝则复用现有 page 标签并导航
  try {
    const res = await fetch(`${base}/json/new?http://localhost:5180/`, { method: 'PUT' })
    if (res.ok) return await res.json()
  } catch {
    /* fall through */
  }
  const list = await (await fetch(`${base}/json`)).json()
  const page = list.find((t) => t.type === 'page')
  if (!page) throw new Error('no debug target available')
  await fetch(`${base}/json/navigate/${page.id}?url=${encodeURIComponent('http://localhost:5180/')}`, { method: 'PUT' })
  return page
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const target = await getTarget()
  const ws = new WebSocket(target.webSocketDebuggerUrl)
  let id = 0
  const pending = new Map()
  const logs = []
  const exceptions = []
  const failures = []

  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) reject(new Error(JSON.stringify(msg.error)))
      else resolve(msg.result)
    } else if (msg.method === 'Runtime.consoleAPICalled') {
      const args = (msg.params.args || []).map((a) => a.value ?? a.description ?? a.type).join(' ')
      logs.push(`[${msg.params.type}] ${args}`)
    } else if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails
      exceptions.push(d.exception?.description || d.text)
    }
  })

  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const mid = ++id
      pending.set(mid, { resolve, reject })
      ws.send(JSON.stringify({ id: mid, method, params }))
    })

  await send('Runtime.enable')
  await send('Page.enable')
  await send('Log.enable')

  const evalJs = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) failures.push('eval: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text))
    return r.result?.value
  }

  // 等待应用挂载与演示模型加载
  await sleep(9000)

  const state = await evalJs(`(() => {
    const canvas = document.querySelector('.viewport-canvas canvas')
    const topbar = document.querySelector('.topbar')
    const panels = document.querySelectorAll('.panel').length
    const tierDots = document.querySelectorAll('.tier-dot').length
    const labels = document.querySelectorAll('.annotation-label').length
    const brand = document.querySelector('.brand')?.textContent || ''
    return {
      hasCanvas: !!canvas,
      canvasSize: canvas ? [canvas.width, canvas.height] : null,
      hasTopbar: !!topbar,
      panelCount: panels,
      tierDots,
      annotationLabels: labels,
      brand,
      glOk: canvas ? !!(canvas.getContext('webgl2') || canvas.getContext('webgl')) : false,
    }
  })()`)
  console.log('PAGE STATE:', JSON.stringify(state, null, 2))

  // 1. 档位切换
  await evalJs(`document.querySelectorAll('.tier-dot')[7].click()`)
  await sleep(300)
  const tier1 = await evalJs(`document.querySelector('.tier-control').innerText.replace(/\\s+/g, ' ')`)
  console.log('AFTER TIER 8 CLICK:', tier1)

  // 2. 关闭法线通道
  await evalJs(`(() => {
    const boxes = document.querySelectorAll('.switch-row input[type=checkbox]')
    boxes[1].click()
  })()`)
  await sleep(200)
  const channels = await evalJs(`document.querySelectorAll('.switch-row input[type=checkbox]').length`)
  console.log('channel checkboxes count:', channels)

  // 3. 进入点选模式并在画布中心点击（射线拾取演示模型）
  await evalJs(`(() => {
    const btns = [...document.querySelectorAll('.viewport-toolbar button')]
    btns.find(b => b.textContent.includes('表面点选标注')).click()
  })()`)
  await sleep(200)
  const rect = await evalJs(`(() => {
    const c = document.querySelector('.viewport-canvas canvas').getBoundingClientRect()
    return { x: c.x, y: c.y, w: c.width, h: c.height }
  })()`)
  // 尝试多个点击位置以提高命中概率
  const clickPoints = [
    [rect.x + rect.w * 0.5, rect.y + rect.h * 0.45],
    [rect.x + rect.w * 0.55, rect.y + rect.h * 0.55],
    [rect.x + rect.w * 0.45, rect.y + rect.h * 0.6],
  ]
  for (const [x, y] of clickPoints) {
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 })
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 })
    await sleep(350)
  }
  const annCount = await evalJs(`document.querySelectorAll('.list-item').length`)
  const annLabels = await evalJs(`document.querySelectorAll('.annotation-label').length`)
  console.log('annotation list items after picking:', annCount, '| screen labels:', annLabels)

  // 4. 保存书签
  await evalJs(`[...document.querySelectorAll('.topbar button')].find(b => b.textContent.includes('存书签')).click()`)
  await sleep(200)
  const bookmarkChips = await evalJs(`document.querySelectorAll('.bookmark-chip').length`)
  console.log('bookmark chips:', bookmarkChips)

  // 5. 框选模式
  await evalJs(`(() => {
    const btns = [...document.querySelectorAll('.viewport-toolbar button')]
    btns.find(b => b.textContent.includes('框选放大')).click()
  })()`)
  await sleep(200)
  const x0 = rect.x + rect.w * 0.35, y0 = rect.y + rect.h * 0.35
  const x1 = rect.x + rect.w * 0.65, y1 = rect.y + rect.h * 0.65
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: x0, y: y0, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: (x0 + x1) / 2, y: (y0 + y1) / 2 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: x1, y: y1, button: 'left', clickCount: 1 })
  await sleep(1200)
  const rectGone = await evalJs(`document.querySelector('.rect-zoom-overlay').hidden`)
  console.log('rect overlay hidden after zoom:', rectGone)

  // 6. 导出工程：拦截下载
  await send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: 'C:\\\\tmp\\\\artifact-downloads' })
  await evalJs(`[...document.querySelectorAll('.topbar button')].find(b => b.textContent.includes('导出工程')).click()`)
  await sleep(800)

  // 7. Pinia 状态快照
  const piniaState = await evalJs(`(() => {
    const text = document.body.innerText
    return {
      hasModelInfo: text.includes('内置演示'),
      tierText: (text.match(/当前\\s*\\d\\/8\\s*档/) || [])[0] || null,
    }
  })()`)
  console.log('STATE SNAPSHOT:', JSON.stringify(piniaState))

  console.log('\\n=== CONSOLE LOGS (' + logs.length + ') ===')
  console.log(logs.slice(0, 25).join('\\n'))
  console.log('\\n=== EXCEPTIONS (' + exceptions.length + ') ===')
  console.log(exceptions.slice(0, 15).join('\\n---\\n'))
  console.log('\\n=== EVAL FAILURES (' + failures.length + ') ===')
  console.log(failures.join('\\n'))

  const ok =
    state?.hasCanvas &&
    state.panelCount === 2 &&
    state.tierDots === 8 &&
    bookmarkChips >= 1 &&
    exceptions.length === 0 &&
    failures.length === 0
  console.log('\\nSMOKE TEST ' + (ok ? 'PASS ✅' : 'FAIL ❌'))
  ws.close()
  try {
    await fetch(`${base}/json/close/${target.id}`, { method: 'PUT' })
  } catch {
    /* ignore */
  }
  process.exit(ok ? 0 : 1)
}

main().catch((e) => {
  console.error('HARNESS ERROR:', e)
  process.exit(2)
})
