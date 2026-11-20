# TS+Svelte+Three.js 供热管道泄漏扩散推演渲染工具

基于 **TypeScript + Svelte + three.js** 的供热管道泄漏扩散推演与三维渲染工具。

## 运行

```bash
npm install
npm run dev      # 开发服务器 http://localhost:5173
npm run build    # 生产构建 (dist/)
npm run preview  # 预览构建产物
npm run check    # svelte-check 类型检查
```

## 功能

- **三维街区与管廊场景**: 程序化生成的街区楼栋、十字主干道、半透明综合管廊舱体与分段热力管道; 点击"放置泄漏点"后在场景中点击地面/管线即可设定泄漏位置。
- **泄漏参数**: 泄漏强度 3 档 (低/中/高, 决定源强与最大扩散半径)、初始扩散半径、浓度阈值、推演时长 (60/120/180 s)。
- **体积雾推演**: 播放时以泄漏点为中心生成半透明体积雾, 半径按分段曲线膨胀 (快速膨胀 → 线性扩散 → 指数趋稳), 雾体边缘用 FBM 噪声做扰动, 菲涅尔柔和过渡。
- **地面热区**: 地面叠加热区贴图, 颜色按浓度分级 (绿→黄→红), 边缘同样带噪声扰动。
- **风场**: 风向角 0~360° 可旋转、风速可调; 风驱动雾体偏移方向与地面热区重心, 场景中有风向箭头指示。
- **时间轴**: 可拖动回看任意时刻的雾体形态与影响范围轮廓线 (红色等值线), 支持 0.5×/1×/2×/4× 倍速播放。
- **超限高亮**: 浓度超过阈值的楼栋显示发光描边 (Edges 轮廓 + 自发光), 管段逐段发光。
- **后处理**: UnrealBloom 辉光 + Bokeh 景深 (自动聚焦泄漏点), 可分别开关。
- **视角**: OrbitControls 环绕 (可自动旋转)、"俯冲至泄漏点"飞行动画、一键复位。
- **持久化与分享**: 推演参数与场景快照自动存入 localStorage; 可导出 JSON 推演文件分享, 他人导入即可复现场景。

## 目录结构

```
src/
  lib/
    stores.ts           # Svelte store: 参数/时间/快照等全局状态
    simulation.ts       # 推演数学模型: 分段半径曲线/风偏移/浓度场/轮廓半径
    persistence.ts      # localStorage 持久化 + 推演文件导入导出
    scene/
      SceneManager.ts   # 渲染循环、后处理、相机动画、拾取、超限高亮
      cityBuilder.ts    # 街区/道路/管廊/管道程序化建模
      fogMaterial.ts    # 体积雾与地面热区 GLSL 着色器
  components/
    ControlPanel.svelte # 左侧参数面板
    Timeline.svelte     # 底部时间轴与实时统计
    SnapshotPanel.svelte# 右侧快照与导入导出
  App.svelte / main.ts
```
