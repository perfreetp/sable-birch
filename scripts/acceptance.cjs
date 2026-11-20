// 最终验收：完整用户流程 + 关键渲染断言 + 截图
const { spawn } = require('node:child_process')
const http = require('node:http')
const fs = require('node:fs')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9230
const getJSON = (p) => new Promise((res, rej) => http.get(`http://127.0.0.1:${PORT}${p}`, (r) => {
  let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res(JSON.parse(d)))
}).on('error', rej))
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox', '--enable-unsafe-swiftshader',
    '--window-size=1600,1000', `--remote-debugging-port=${PORT}`, '--user-data-dir=/tmp/cdp-final', 'about:blank'])
  await sleep(2500)
  const page = (await getJSON('/json')).find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 0; const pending = new Map(); const errs = []
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data)
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) }
    if (m.method === 'Runtime.exceptionThrown') errs.push(m.params.exceptionDetails.text)
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errs.push(m.params.args.map(a => a.value).join(' '))
  }
  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) => new Promise((r) => { const mid = ++id; pending.set(mid, r); ws.send(JSON.stringify({ id: mid, method, params })) })
  await send('Runtime.enable'); await send('Page.enable')
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/' })
  await sleep(2000)
  const evalJs = async (e) => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result.value

  const checks = []
  checks.push(['首页参数面板', await evalJs(`!!document.querySelector('.launch-panel')`)])
  // 三个预设发射场
  checks.push(['预设发射场数量', (await evalJs(`document.querySelectorAll('.presets .chip').length`)) === 3])
  await evalJs(`document.querySelector('.btn.primary').click()`)
  await sleep(4000)
  checks.push(['3D视口渲染', await evalJs(`!!document.querySelector('.viewport canvas')`)])
  checks.push(['三个分离事件卡片', (await evalJs(`document.querySelectorAll('.event-card').length`)) === 3])
  checks.push(['经纬网格/图例', (await evalJs(`document.querySelectorAll('.legend-row').length`)) >= 8])
  checks.push(['发射场标注', (await evalJs(`[...document.querySelectorAll('.scene-label')].some(e=>e.textContent.includes('发射场'))`))])
  // 回放控制
  checks.push(['五档倍速', (await evalJs(`document.querySelectorAll('.speed-group .chip').length`)) === 5])
  await evalJs(`document.querySelector('.icon-btn').click()`); await sleep(600)
  const playing = await evalJs(`document.querySelector('.icon-btn').textContent.includes('⏸')`)
  checks.push(['播放控制', playing]); await evalJs(`document.querySelector('.icon-btn').click()`)
  // 时间轴拖动
  await evalJs(`(()=>{const tl=document.querySelector('.timeline');const s=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;s.call(tl,tl.max*0.5);tl.dispatchEvent(new Event('input',{bubbles:true}));})()`)
  await sleep(600)
  checks.push(['时间轴拖动', (await evalJs(`document.querySelector('.clock').textContent`)) !== 'T+00:00'])
  // 相机跟随
  await evalJs(`[...document.querySelectorAll('.chip')].find(c=>c.textContent.includes('相机跟随')).click()`)
  checks.push(['相机跟随模式', await evalJs(`[...document.querySelectorAll('.chip')].some(c=>c.textContent.includes('跟随中'))`)])
  // 导出按钮存在
  checks.push(['JSON导出按钮', await evalJs(`!![...document.querySelectorAll('.btn')].find(b=>b.textContent.includes('导出 JSON'))`)])
  // 读数
  checks.push(['实时读数面板', await evalJs(`document.querySelectorAll('.readout').length`) >= 5])
  await send('Page.captureScreenshot', { format: 'png' }).then((s) => fs.writeFileSync('./scripts/final-scene.png', Buffer.from(s.data, 'base64')))

  console.log('===== 需求验收结果 =====')
  let pass = 0
  for (const [name, ok] of checks) { console.log(`${ok ? '✓' : '✗'} ${name}`); if (ok) pass++ }
  console.log(`\n通过 ${pass}/${checks.length}，运行时错误: ${errs.length ? errs.slice(0, 3) : '无'}`)
  ws.close(); chrome.kill(); process.exit(pass === checks.length && !errs.length ? 0 : 1)
}
main().catch((e) => { console.error(e); process.exit(1) })
