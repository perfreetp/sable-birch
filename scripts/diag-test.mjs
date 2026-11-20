// 诊断：查询 sprite 实际尺寸与场景中所有对象
const base = 'http://localhost:9222'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function getTarget() {
  try {
    const res = await fetch(`${base}/json/new?http://localhost:5180/`, { method: 'PUT' })
    if (res.ok) return await res.json()
  } catch { /* fall through */ }
  return (await (await fetch(`${base}/json`)).json()).find((t) => t.type === 'page')
}
async function main() {
  const target = await getTarget()
  const ws = new WebSocket(target.webSocketDebuggerUrl)
  let id = 0
  const pending = new Map()
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
    }
  })
  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const mid = ++id
    pending.set(mid, { resolve, reject })
    ws.send(JSON.stringify({ id: mid, method, params }))
  })
  await send('Runtime.enable')
  const evalJs = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value
  await sleep(7000)

  // 放一个标注
  await evalJs(`[...document.querySelectorAll('.viewport-toolbar button')].find(b => b.textContent.includes('表面点选标注')).click()`)
  await sleep(150)
  const rect = await evalJs(`(() => { const c = document.querySelector('.viewport-canvas canvas').getBoundingClientRect(); return {x:c.x+c.width/2,y:c.y+c.height/2} })()`)
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: rect.x, y: rect.y, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: rect.x, y: rect.y, button: 'left', clickCount: 1 })
  await sleep(500)

  const info = await evalJs(`(() => {
    const eng = window.__viewerEngine
    const out = { sprites: [], modelChildren: [] }
    if (eng) {
      eng.scene.traverse((o) => {
        if (o.isSprite) {
          out.sprites.push({
            name: o.name,
            scale: [o.scale.x, o.scale.y, o.scale.z].map(v => +v.toFixed(4)),
            pos: [o.position.x, o.position.y, o.position.z].map(v => +v.toFixed(3)),
            visible: o.visible,
            parent: o.parent?.name || o.parent?.type,
            matSize: o.material?.size,
          })
        }
      })
      out.camPos = eng.camera.position.toArray().map(v => +v.toFixed(3))
      out.fov = eng.camera.fov
      out.containerH = eng.container.clientHeight
    }
    return out
  })()`)
  console.log('SCENE:', JSON.stringify(info, null, 2))
  ws.close()
  try { await fetch(`${base}/json/close/${target.id}`, { method: 'PUT' }) } catch { /* ignore */ }
}
main().catch((e) => { console.error(e); process.exit(2) })
