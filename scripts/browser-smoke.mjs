import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'

const require = createRequire('C:/Users/Administrator/AppData/Local/Temp/pw/')
const { chromium } = require('playwright')

const BASE = 'http://127.0.0.1:4173'
const SHOTS = new URL('./shots/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
mkdirSync(SHOTS, { recursive: true })

const errors = []
const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Users/Administrator/AppData/Local/ms-playwright/chromium-1255/chrome-win64/chrome.exe',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
})
const page = await browser.newPage({ viewport: { width: 1600, height: 950 } })
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`)
})

function assert(cond, msg) {
  if (!cond) throw new Error('断言失败: ' + msg)
}

// 1. 页面装载
await page.goto(BASE, { waitUntil: 'domcontentloaded' })
await page.waitForSelector('canvas', { timeout: 15000 })
await page.waitForTimeout(1500) // 等待 troika 首帧文字渲染
const acCount = await page.locator('.stat .num').first().textContent()
assert(acCount.trim() === '10', `飞行器数量应为 10，实际 ${acCount}`)
await page.screenshot({ path: `${SHOTS}/01-initial.png` })

// 2. 播放推进
await page.click('.play-btn')
await page.waitForTimeout(1200)
const clock1 = await page.locator('.clock .now').textContent()
await page.waitForTimeout(1000)
const clock2 = await page.locator('.clock .now').textContent()
assert(clock1 !== clock2, `播放后时钟应推进: ${clock1} -> ${clock2}`)
const hud = await page.locator('.hud-value.live').count()
assert(hud === 1, '播放状态 HUD 应显示播放中')
await page.screenshot({ path: `${SHOTS}/02-playing.png` })

// 3. 暂停
await page.click('.play-btn')
const paused = await page.locator('.hud-value.live').count()
assert(paused === 0, '暂停后 live 标识应消失')

// 4. 倍速三档循环 1x -> 2x -> 4x -> 1x
const speedBtn = page.locator('.speed-btn')
assert((await speedBtn.textContent()).trim() === '1×', '初始倍速应为 1×')
await speedBtn.click()
assert((await speedBtn.textContent()).trim() === '2×', '应切换到 2×')
await speedBtn.click()
assert((await speedBtn.textContent()).trim() === '4×', '应切换到 4×')
await speedBtn.click()
assert((await speedBtn.textContent()).trim() === '1×', '应回到 1×')

// 5. 拖动到 t=40s：UAM-01/02 冲突对必然触发
await page.$eval('input[type=range]', (el) => {
  el.value = '40'
  el.dispatchEvent(new Event('input', { bubbles: true }))
  el.dispatchEvent(new Event('change', { bubbles: true }))
})
await page.waitForTimeout(600)
const activeConflicts = await page.locator('.stat .num.warn').textContent()
assert(Number(activeConflicts.trim()) >= 1, `t=40s 应至少有 1 个活动冲突，实际 ${activeConflicts}`)
const dangerRows = await page.locator('.row.danger').count()
assert(dangerRows >= 2, `冲突双方列表行应标红，实际 ${dangerRows} 行`)
await page.screenshot({ path: `${SHOTS}/03-conflict-t40.png` })

// 6. 冲突记录页签（先拖过 t=62s 让第二对冲突进入重扫范围）
await page.$eval('input[type=range]', (el) => {
  el.value = '70'
  el.dispatchEvent(new Event('input', { bubbles: true }))
  el.dispatchEvent(new Event('change', { bubbles: true }))
})
await page.waitForTimeout(500)
await page.locator('.tabs button', { hasText: '冲突记录' }).click()
await page.waitForTimeout(200)
const conflictCards = await page.locator('.conflict').count()
assert(conflictCards >= 2, `冲突记录至少 2 条（设计的两对），实际 ${conflictCards}`)
const allPairs = await page.locator('.conflict .pair').allTextContents()
assert(
  allPairs.some((p) => p.includes('UAM-01') && p.includes('UAM-02')),
  `应包含 UAM-01↔UAM-02，实际: ${allPairs.join(' | ')}`
)
assert(allPairs.some((p) => p.includes('UAM-03') && p.includes('UAM-04')), '应包含 UAM-03↔UAM-04')
await page.screenshot({ path: `${SHOTS}/04-conflict-list.png` })

// 7. 回到飞行器列表，点击行选中并聚焦相机
await page.locator('.tabs button', { hasText: '飞行器列表' }).click()
await page.locator('.row', { hasText: 'UAM-01' }).first().click()
await page.waitForTimeout(900) // 相机补间 0.7s
const selected = await page.locator('.row.selected').count()
assert(selected === 1, '应有 1 行被选中')
await page.screenshot({ path: `${SHOTS}/05-focused.png` })

// 8. 拖到结束：推演结束标识
const duration = await page.$eval('input[type=range]', (el) => Number(el.max))
await page.$eval('input[type=range]', (el) => {
  el.value = String(Number(el.max))
  el.dispatchEvent(new Event('input', { bubbles: true }))
  el.dispatchEvent(new Event('change', { bubbles: true }))
})
await page.waitForTimeout(400)
const ended = await page.locator('.ended').count()
assert(ended === 1, '到达时长末尾应显示推演结束')
await page.screenshot({ path: `${SHOTS}/06-end.png` })

// 9. 导出 CSV（验证真实下载）
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.locator('button', { hasText: '导出冲突 CSV' }).click()
])
const csvName = download.suggestedFilename()
assert(csvName.startsWith('uam_冲突记录_') && csvName.endsWith('.csv'), `CSV 文件名异常: ${csvName}`)
await download.saveAs(`${SHOTS}/${csvName}`)

// 10. 导出 JSON
const [dl2] = await Promise.all([
  page.waitForEvent('download'),
  page.locator('button', { hasText: '导出推演结果' }).click()
])
const jsonName = dl2.suggestedFilename()
assert(jsonName.endsWith('.json'), `JSON 文件名异常: ${jsonName}`)
await dl2.saveAs(`${SHOTS}/${jsonName}`)

// 11. 拖回 0 再播放，确认重扫后状态干净
await page.$eval('input[type=range]', (el) => {
  el.value = '0'
  el.dispatchEvent(new Event('input', { bubbles: true }))
  el.dispatchEvent(new Event('change', { bubbles: true }))
})
await page.waitForTimeout(400)
const totalAfterReset = await page.locator('.stat .num').nth(2).textContent()
assert(Number(totalAfterReset.trim()) === 0, `拖回起点后累计冲突应清零，实际 ${totalAfterReset}`)

await browser.close()

if (errors.length) {
  console.error('浏览器错误:\n' + errors.join('\n'))
  process.exit(1)
}
console.log(`\n浏览器冒烟全部通过 ✔  时长=${duration.toFixed(1)}s`)
console.log(`下载文件: ${csvName}, ${jsonName}`)
console.log(`截图目录: ${SHOTS}`)
