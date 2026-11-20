/**
 * 无头浏览器端到端验证（原生 CDP，无第三方依赖）：
 * 启动 Chrome -> 打开应用 -> 点击"加载示例城市" -> 新增观察点 ->
 * 等待遮挡计算完成 -> 校验统计/采样点 -> 截图（实体/半透明/分层）。
 */
import { spawn } from 'node:child_process';
import { rm, readdir, readFile, mkdir } from 'node:fs/promises';
import * as fs from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profileDir = 'C:\\tmp\\chrome-uao-e2e';
const port = 9222;

const child = spawn(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--enable-unsafe-swiftshader',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    '--window-size=1600,950',
    'about:blank'
  ],
  { stdio: 'ignore' }
);

async function getWsUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === 'page');
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      await sleep(300);
    }
  }
  throw new Error('Chrome 调试端口未就绪');
}

const wsUrl = await getWsUrl();
const ws = new WebSocket(wsUrl);
await new Promise((r, rej) => {
  ws.onopen = r;
  ws.onerror = rej;
});

let msgId = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};
function send(method, params = {}) {
  const id = ++msgId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const res = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (res.exceptionDetails) {
    throw new Error('页面异常: ' + JSON.stringify(res.exceptionDetails.exception?.description ?? res.exceptionDetails.text));
  }
  return res.result.value;
}

await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });
await waitFor(() => evaluate('document.title === "城市建筑遮挡评估工具" && document.querySelectorAll("canvas").length >= 1'), 15000);

// 0. 页面基础检查
const title = await evaluate('document.title');
assert(title === '城市建筑遮挡评估工具', `标题错误: ${title}`);
const canvasCount = await evaluate('document.querySelectorAll("canvas").length');
assert(canvasCount >= 1, 'WebGL canvas 未创建');
console.log('✓ 页面加载，canvas 数量:', canvasCount);

// 1. 加载示例城市
await evaluate(`[...document.querySelectorAll('button')].find(b => b.textContent.includes('加载示例城市')).click()`);
await sleep(1500);
const buildingInfo = await evaluate(`({
  storageKB: localStorage.getItem('uao:buildings:v1')?.length,
  buildingCount: JSON.parse(localStorage.getItem('uao:buildings:v1')).length
})`);
assert(buildingInfo.buildingCount > 50, `示例建筑数量异常: ${buildingInfo.buildingCount}`);
console.log('✓ 示例城市已加载并持久化，建筑数:', buildingInfo.buildingCount);

// 2. 新增观察点（加载示例城市时已自动创建 1 个）
const before = await evaluate('JSON.parse(localStorage.getItem("uao:observers:v1")).length');
await evaluate(`[...document.querySelectorAll('button')].find(b => b.textContent.trim() === '+ 新增').click()`);
await sleep(500);
const observerCount = await evaluate('JSON.parse(localStorage.getItem("uao:observers:v1")).length');
assert(observerCount === before + 1, '观察点未持久化');
console.log('✓ 观察点已新增并持久化，总数:', observerCount);

// 3. 等待自动计算完成（状态胶囊显示"完成"）
let done = false;
for (let i = 0; i < 40; i++) {
  const txt = await evaluate('document.querySelector(".status-pill")?.textContent ?? ""');
  if (txt.includes('完成')) {
    done = true;
    break;
  }
  await sleep(500);
}
assert(done, '遮挡计算未在超时内完成');
const statusText = await evaluate('document.querySelector(".status-pill").textContent');
console.log('✓ 遮挡计算完成，状态:', statusText.trim());

// 4. 切到分层查看，核对统计
await evaluate(`[...document.querySelectorAll('.tab')].find(t => t.textContent.includes('分层查看')).click()`);
await sleep(600);
const rows = await evaluate(`[...document.querySelectorAll('.layer-table tbody tr')].map(tr =>
  [...tr.querySelectorAll('td')].map(td => td.textContent.trim()))`);
assert(rows.length === 5, `分层表格行数错误: ${rows.length}`);
console.log('✓ 5 层统计行:');
for (const r of rows) console.log('   ', r.join(' | '));

const overall = await evaluate('document.querySelector(".overall-row")?.textContent');
assert(overall?.includes('整体遮挡率'), '缺少合计统计');
const samplePoints = await evaluate(`(function(){
  const m = document.querySelector('.status-pill').textContent.match(/([\\d,]+) 采样点/);
  return m ? Number(m[1].replace(/,/g,'')) : 0;
})()`);
assert(samplePoints > 0, '采样点数为 0');
console.log('✓ 采样点总数:', samplePoints.toLocaleString());

// 5. 截图：实体 + 全层
await shoot(path.join(here, 'e2e-solid.png'));
console.log('✓ 实体模式截图');

// 5b. 验证导出 JSON 报告与 CSV（下载到系统临时目录，避免触发 Vite 文件监听）
import os from 'node:os';
const downloadDir = path.join(os.tmpdir(), 'uao-e2e-downloads');
await fs.rm(downloadDir, { recursive: true, force: true });
await fs.mkdir(downloadDir, { recursive: true });
await send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadDir, eventsEnabled: true });

await evaluate(`[...document.querySelectorAll('button')].find(b => b.textContent.includes('导出 JSON 报告')).click()`);
await evaluate(`[...document.querySelectorAll('button')].find(b => b.textContent.includes('导出采样点 CSV')).click()`);
await waitForFiles(downloadDir, 2, 15000);

const dlFiles = (await fs.readdir(downloadDir)).filter((f) => !f.endsWith('.crdownload'));
const jsonFile = dlFiles.find((f) => f.endsWith('.json'));
const csvFile = dlFiles.find((f) => f.endsWith('.csv'));
assert(jsonFile && csvFile, `导出文件缺失: ${dlFiles.join(', ')}`);

const report = JSON.parse(await fs.readFile(path.join(downloadDir, jsonFile), 'utf8'));
assert(Array.isArray(report.layerStats) && report.layerStats.length === 5, 'JSON 报告应含 5 层统计');
assert(Array.isArray(report.samples) && report.samples.length === samplePoints, 'JSON 采样点数量不符');
assert(report.samples[0].occlusion !== undefined && 'layer_id' in report.samples[0] === false, '采样点字段结构异常');
assert(typeof report.layerStats[0].occlusionRate === 'number', '遮挡率字段缺失');
console.log('✓ JSON 报告：', jsonFile, `（${report.samples.length} 采样点，5 层统计）`);

const csv = await fs.readFile(path.join(downloadDir, csvFile), 'utf8');
const csvLines = csv.trim().split('\n');
assert(csvLines[0].startsWith('layer_id,layer_name,x_m'), 'CSV 表头不符: ' + csvLines[0]);
assert(csvLines.length === samplePoints + 1, `CSV 行数 ${csvLines.length} 与采样点数不符`);
console.log('✓ 采样点 CSV：', csvFile, `（${csvLines.length - 1} 行数据）`);
await fs.rm(downloadDir, { recursive: true, force: true });

// 6. 半透明
await evaluate(`[...document.querySelectorAll('.seg')].find(b => b.textContent === '半透明').click()`);
await sleep(800);
await shoot(path.join(here, 'e2e-transparent.png'));
console.log('✓ 半透明模式截图');
await evaluate(`[...document.querySelectorAll('.seg')].find(b => b.textContent === '实体').click()`);
await sleep(400);

// 7. 关闭 L1/L2/L5，仅显示 L3/L4
await evaluate(`(function(){
  const checks = [...document.querySelectorAll('.layer-table input[type=checkbox]')];
  [0,1,4].forEach(i => { if (checks[i].checked) checks[i].click(); });
})()`);
await sleep(700);
const hiddenLayers = await evaluate(`[...document.querySelectorAll('.layer-table tr.row-off')].length`);
assert(hiddenLayers === 3, `隐藏层数错误: ${hiddenLayers}`);
await shoot(path.join(here, 'e2e-layers.png'));
console.log('✓ 分层开关截图（L3/L4 可见）');

// 8. 刷新页面验证 localStorage 恢复（等待新文档就绪，避免读到导航中间态）
await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });
await waitFor(() => evaluate('document.title === "城市建筑遮挡评估工具"').catch(() => false), 15000);
const restored = await evaluate(`({
  buildings: JSON.parse(localStorage.getItem('uao:buildings:v1')).length,
  observers: JSON.parse(localStorage.getItem('uao:observers:v1')).length
})`);
assert(
  restored.buildings === buildingInfo.buildingCount && restored.observers === observerCount,
  '刷新后存储未恢复'
);
console.log('✓ 刷新后浏览器存储恢复正常（建筑', restored.buildings, '观察点', restored.observers, '）');

async function shoot(file) {
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  await import('node:fs/promises').then((fs) => fs.writeFile(file, Buffer.from(data, 'base64')));
}

function assert(cond, msg) {
  if (!cond) throw new Error('断言失败: ' + msg);
}

async function waitForFiles(dir, count, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const files = (await readdir(dir).catch(() => [])).filter((f) => !f.endsWith('.crdownload'));
    if (files.length >= count) return files;
    await sleep(300);
  }
  throw new Error('等待下载文件超时');
}

async function waitFor(predicate, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  let lastErr;
  while (Date.now() < deadline) {
    try {
      if (await predicate()) return;
    } catch (e) {
      lastErr = e;
    }
    await sleep(300);
  }
  throw new Error('条件等待超时' + (lastErr ? `: ${lastErr.message}` : ''));
}

ws.close();
child.kill();
await rm(profileDir, { recursive: true, force: true }).catch(() => {});
console.log('\n端到端验证全部通过 ✅');
process.exit(0);
