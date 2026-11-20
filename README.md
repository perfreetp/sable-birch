# 堆场箱区堆叠与翻箱可视化工具

基于 **TypeScript + Vue 3 + Babylon.js** 的集装箱堆场三维可视化与翻箱作业仿真。
箱区按 **贝位（Bay）/ 排（Row）/ 层（Tier）** 生成网格，每个箱体用 GPU 实例化（Thin Instance）渲染，
支持点击拾取、翻箱路径规划、抬升重排动画与状态文件导入导出，数据持久化在浏览器 localStorage。

## 功能模块

### 1. 箱区网格
- 可配置贝位数（2–30，偶数）、排数（1–12）、最大层高（1–10），随机生成合法箱区
- 20 尺箱占 1 个贝位（橙色），40 尺箱占连续 2 个贝位（蓝色），尺寸与颜色双重区分
- 层高 ≥ 5（tier ≥ 4）的箱体以 0.45 透明度半透明显示
- 地面网格线 + 贝位/排坐标标签，实时统计在港箱量、占用率、各尺寸箱数

### 2. 翻箱操作
- 点击任意箱体查看箱号、尺寸、贝/排/层坐标、所在栈高度与上方压箱清单
- 选中目标箱后计算翻箱路径：自顶向下识别全部压箱（含跨贝位 40 尺相邻栈），
  为每个压箱搜索最近合法空槽，压箱禁止落回目标箱所在列
- 翻箱动画分三段：垂直抬升到安全高度 → 水平平移 → 垂直落位
- HUD 实时显示当前移动箱数、剩余步数、移动箱号与进度条，可中途中止
- 状态颜色：选中（黄）、目标箱（红）、压箱（紫）、移动中（青绿）

### 3. 状态导出
- 一键导出 JSON 状态文件（网格配置 + 全部箱位记录 + 时间戳）
- 支持导入状态文件恢复箱区，含格式校验
- 所有变更自动写入 localStorage（键 `container-yard-state-v1`），刷新不丢失

### 视图
透视图 / 俯视图 / 侧视图三种相机，切换带平滑过渡动画；左键旋转、滚轮缩放、右键平移。

## 技术要点

- **实例化渲染**：20 尺与 40 尺各一个 Box 网格，全部箱体通过 `thinInstanceSetBuffer`
  写入矩阵/颜色缓冲，单次绘制调用渲染数百个箱；手动刷新包围盒并启用
  `thinInstanceEnablePicking` 以支持射线拾取
- **数据/渲染分层**：`engine/yard.ts` 为纯数据模型（占用索引、栈查询、合法性校验、翻箱规划），
  不依赖浏览器与 Babylon，可独立单测；`engine/scene.ts` 负责 Babylon 场景与动画
- **状态管理**：模块级 ref + `reactive` 双导出（`storeRaw` 供脚本逻辑、`store` 供模板解包）

## 目录结构

```
src/
  types.ts                 类型定义
  engine/
    layout.ts              世界坐标布局常量与几何换算
    yard.ts                箱区数据模型、占用索引、翻箱规划、持久化
    scene.ts               Babylon 场景：实例化渲染、拾取、相机、抬升动画
  store/yardStore.ts       响应式状态与动作
  components/
    YardCanvas.vue         3D 画布与翻箱播放编排、HUD
    GridPanel.vue          模块 1：箱区网格
    ReshufflePanel.vue     模块 2：翻箱操作
    StatePanel.vue         模块 3：状态导出
  App.vue                  布局、视图切换、图例
```

## 运行

```bash
npm install
npm run dev        # 开发服务器
npm run build      # 类型检查 + 生产构建
npm run preview    # 预览构建产物
```

## 测试

```bash
# 核心数据模型与翻箱逻辑（Node，无浏览器依赖）
npx esbuild scripts/smoke.ts --bundle --platform=node --format=esm \
  --alias:@=./src --outfile=scripts/smoke.mjs && node scripts/smoke.mjs

# 无头浏览器端到端检查（需系统 Chrome，先启动 npm run dev）
node scripts/browser-check.mjs http://127.0.0.1:5173/
node scripts/e2e-check.mjs   http://127.0.0.1:5173/
```
