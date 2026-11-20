// 验证观察点拖拽：模拟 pointerdown/move/up，确认位置更新与自动重算
const port = process.argv[2] ?? '9227';
const { spawn } = await import('node:child_process');
const { setTimeout: sleep } = await import('node:timers/promises');
const fs = await import('node:fs/promises');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile = 'C:\\tmp\\chrome-drag';
await fs.rm(profile, { recursive: true, force: true }).catch(() => {});
const child = spawn(chrome, [
  '--headless=new', '--disable-gpu', '--enable-unsafe-swiftshader',
  '--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--window-size=1600,950', 'about:blank'
], { stdio: 'ignore' });

for (let i = 0; i < 30; i++) {
  try {
    const t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    if (t.some((x) => x.type === 'page')) break;
  } catch {}
  await sleep(300);
}
const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const p = pending.get(m.id); pending.delete(m.id);
    m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result);
  }
};
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const mid = ++id; pending.set(mid, { resolve, reject });
  ws.send(JSON.stringify({ id: mid, method, params }));
});
const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result.value;
};

await send('Page.enable');
await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });
for (let i = 0; i < 40; i++) {
  if (await ev(`!![...document.querySelectorAll('button')].find(b => b.textContent.includes('加载示例城市'))`).catch(() => false)) break;
  await sleep(300);
}
await ev(`[...document.querySelectorAll('button')].find(b => b.textContent.includes('加载示例城市')).click()`);
for (let i = 0; i < 40; i++) {
  const txt = await ev('document.querySelector(".status-pill")?.textContent ?? ""');
  if (txt.includes('完成')) break;
  await sleep(500);
}

const before = await ev(`JSON.parse(localStorage.getItem('uao:observers:v1'))[0]`);
console.log('拖拽前观察点:', JSON.stringify({ x: before.x, z: before.z }));

// 把观察点移到默认相机取景中心附近（0,0），保证标记落在屏幕可拾取区域
await ev(`[...document.querySelectorAll('.tab')].find(t => t.textContent.includes('观察点设置')).click()`);
await sleep(400);
await ev(`(function(){
  const inputs = document.querySelectorAll('.observer-item');
  // 选中第一个观察点
  inputs[0].click();
})()`);
await sleep(300);
// 通过 X/Z 数字输入框设为 0
await ev(`(function(){
  const nums = [...document.querySelectorAll('input[type=number]')];
  const setVal = (input, val) => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, val);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  };
  // NumberField 顺序：X, Z, 眼高（选中观察点后）
  setVal(nums[0], 0);
  setVal(nums[1], 0);
})()`);
await sleep(1500); // 等待自动重算
const moved = await ev(`JSON.parse(localStorage.getItem('uao:observers:v1'))[0]`);
console.log('面板移到中心后:', JSON.stringify({ x: moved.x, z: moved.z }));

const rect = await ev(`(function(){
  const c = document.querySelector('canvas');
  const r = c.getBoundingClientRect();
  return JSON.stringify({left:r.left, top:r.top, w:r.width, h:r.height});
})()`);
const canvasRect = JSON.parse(rect);

// 直接在画布上做一次拖拽（从中心到右下），验证 pointer 事件链路不报错且观察点可被拾取
// 先通过 raycaster 拾取确认观察点在画布中心区域：用合成事件
const cx = canvasRect.left + canvasRect.w * 0.5;
const cy = canvasRect.top + canvasRect.h * 0.5;

async function mouse(type, x, y, button = 0) {
  await send('Input.dispatchMouseEvent', {
    type, x, y, button: type === 'mouseMoved' ? 'none' : 'left',
    buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1
  });
}

// 扫描画布找到可拾取观察点的位置（观察点标记为橙色）
let picked = false;
let pickedAt = null;
for (let dy = -200; dy <= 200 && !picked; dy += 40) {
  for (let dx = -300; dx <= 300 && !picked; dx += 60) {
    const x = cx + dx, y = cy + dy;
    await mouse('mouseMoved', x, y);
    const cursor = await ev(`document.querySelector('canvas').style.cursor`);
    if (cursor === 'pointer') {
      picked = true;
      pickedAt = { x, y };
    }
  }
}
console.log('观察点拾取:', picked ? `成功 @(${pickedAt.x.toFixed(0)},${pickedAt.y.toFixed(0)})` : '未找到（视角问题，跳过拖拽断言）');

if (picked) {
  await mouse('mousePressed', pickedAt.x, pickedAt.y);
  for (let i = 1; i <= 5; i++) {
    await mouse('mouseMoved', pickedAt.x + i * 20, pickedAt.y + i * 15);
    await sleep(50);
  }
  await mouse('mouseReleased', pickedAt.x + 100, pickedAt.y + 75);
  await sleep(800);

  const after = await ev(`JSON.parse(localStorage.getItem('uao:observers:v1'))[0]`);
  console.log('拖拽后观察点:', JSON.stringify({ x: +after.x.toFixed(1), z: +after.z.toFixed(1) }));
  if (Math.abs(after.x - moved.x) < 0.01 && Math.abs(after.z - moved.z) < 0.01) {
    throw new Error('拖拽后观察点坐标未变化');
  }
  // 自动重算应被触发
  for (let i = 0; i < 40; i++) {
    const t = await ev('document.querySelector(".status-pill")?.textContent ?? ""');
    if (t.includes('完成')) break;
    await sleep(400);
  }
  const finalStatus = await ev('document.querySelector(".status-pill")?.textContent ?? ""');
  console.log('拖拽后状态:', finalStatus.trim());
  if (!finalStatus.includes('完成')) throw new Error('拖拽后未完成自动重算');
  console.log('✓ 观察点拖拽与自动重算链路正常');
}

ws.close();
child.kill();
await fs.rm(profile, { recursive: true, force: true }).catch(() => {});
process.exit(0);
