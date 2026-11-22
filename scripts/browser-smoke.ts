// 浏览器端到端冒烟：打开页面 → 跑仿真 → 切换三模块 → 截图与控制台错误收集
import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'http://127.0.0.1:5174/';
const SHOTS = 'scripts/shots';

const errors: string[] = [];
const warnings: string[] = [];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    '--no-sandbox',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--disable-gpu-sandbox',
    '--window-size=1600,1000'
  ],
  defaultViewport: { width: 1600, height: 1000 }
});

try {
  const page = await browser.newPage();
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error') errors.push(text);
    else if (msg.type() === 'warning' && !text.includes('favicon')) warnings.push(text);
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  await page.goto(URL, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: `${SHOTS}/01-config.png` });

  // 检查 canvas 是否有实际渲染（非全黑）
  const canvasInfo = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    if (!c) return { found: false };
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    return { found: true, w: c.width, h: c.height, gl: !!gl };
  });
  console.log('canvas:', JSON.stringify(canvasInfo));

  // 切到靠泊预演并启动仿真
  const navButtons = await page.$$('aside nav button');
  await navButtons[1].click();
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: `${SHOTS}/02-rehearsal-empty.png` });

  const runBtn = await page.waitForSelector('button.primary', { timeout: 5000 });
  await runBtn.click();
  // 等待结果 KPI 出现
  await page.waitForFunction(
    () => document.body.innerText.includes('最大护舷反力'),
    { timeout: 30000 }
  );
  await page.waitForSelector('.kpis', { timeout: 30000 });
  await new Promise((r) => setTimeout(r, 3000));
  await page.screenshot({ path: `${SHOTS}/03-rehearsal-running.png` });

  const kpiText = await page.$eval('.kpis', (el) => el.textContent);
  console.log('KPI:', kpiText?.replace(/\s+/g, ' ').trim().slice(0, 300));

  // 拖到回放末尾
  await page.evaluate(() => {
    const range = document.querySelector('.timeline input[type=range]');
    if (range) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!;
      setter.call(range, range.max);
      range.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: `${SHOTS}/04-rehearsal-end.png` });

  // 切到缆绳受力模块
  await navButtons[2].click();
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${SHOTS}/05-mooring.png` });
  const tableRows = await page.$$eval('tbody tr', (rows) => rows.length);
  console.log('缆绳行数:', tableRows);

  // 展开缆绳配置
  const expandBtn = await page.$('.module header button');
  await expandBtn?.click();
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: `${SHOTS}/06-mooring-config.png` });

  // 回参数设定，切到存储分享
  await navButtons[0].click();
  await new Promise((r) => setTimeout(r, 400));
  const tabBtns = await page.$$('.module nav button');
  await tabBtns[3].click();
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: `${SHOTS}/07-storage.png` });

  console.log('控制台错误数:', errors.length);
  errors.slice(0, 10).forEach((e) => console.log('ERR:', e.slice(0, 300)));
  console.log('控制台警告数:', warnings.length);
  warnings.slice(0, 5).forEach((w) => console.log('WARN:', w.slice(0, 200)));
} finally {
  await browser.close();
}
