# 🧲 磁力片乐园（MagTile Kids）

给 3–6 岁孩子在平板上玩的磁力片拼搭启蒙应用。SolidJS 负责界面，Babylon.js 负责 3D 渲染与交互。

## 启动

```bash
npm install
npm run dev        # 开发，默认 http://localhost:5173
npm run build      # 生产构建
npm run preview    # 预览生产包
```

几何逻辑的无浏览器测试：

```bash
npx esbuild src/smoke.ts --bundle --platform=node --format=esm --outfile=.smoke/smoke.mjs \
  && node .smoke/smoke.mjs
```

## 孩子可以做什么

| 玩法 | 实现位置 |
| --- | --- |
| 左侧片库：正方形 / 三角形 / 六边形 / 扇形，拖到台面 | `src/lib/controller.ts` `beginLibraryDrag` |
| 靠近已有边自动吸附贴合，整条边亮起青色提示 | `geometry.ts` `findSnap` + `tiles.ts` 边辉光管 |
| 选中后拖橙色手柄，按 15° 步进对齐 | `geometry.ts` `quantizeAngle` |
| 两片相交时变红并左右抖动，松手弹回 | `controller.ts` `setWarn` + `frame()` |
| 断开原来的贴合边时黄色描边 | `controller.ts` `flashDetachYellow` |
| 点「立起来」沿公共边折成 3D，显示当前折角，120° 限位 | `fold.ts` `buildFold` / `setHingeAngle` |
| 半透明塑料材质，翻面是另一种颜色 | `tiles.ts` front/back 双面材质 |
| 两盏灯（彩色小球）可拖动，影子跟随 | `scene.ts` 双 DirectionalLight + ShadowGenerator |
| 单指/双指旋转模型看背面，双击回平铺视角 | ArcRotateCamera + `handleDoubleTap` |
| 点一片单独拿起再放回 | `beginTileDrag` |
| 每一步留痕、撤销、正放/倒放回放 | `history.ts` + `replay.ts` |
| 拼完导出搭法卡片 PNG（3D 截图 + 用料统计） | `export-card.ts` |
| 模板跟拼（房子 / 六边花 / 盒子 / 圆圆饼），黄色幽灵片提示下一片位置 | `templates.ts` + `createGhost` |

## 代码结构

```
src/
  index.tsx              入口（含 earcut 全局注入）
  App.tsx                SolidJS 界面：片库、工具栏、模板、回放控制
  styles.css             儿童友好的大按钮/高对比样式
  lib/
    geometry.ts          片形、2D 位姿、双候选边吸附、SAT 重叠、15°量化
    scene.ts             Babylon 引擎/相机/台面/双灯阴影/补间
    tiles.ts             塑料片网格（顶/底异色）、辉光边、旋转手柄、幽灵片
    fold.ts              公共边铰链树、120° 夹紧、向上折叠符号
    history.ts           事件流与任意时刻快照
    replay.ts            正放/倒放/单步回放
    templates.ts         四个内置模板的自动位姿求解
    export-card.ts       搭法卡片 Canvas 合成与下载
    controller.ts        指针交互总控
    smoke.ts             几何单元冒烟测试
```

## 关键设计说明

- **吸附有两个候选解**：同一条边可以同向或反向贴合，用「候选解不得与目标片重叠」筛出落在外侧的解，避免三角屋顶折进墙体内部。
- **折叠铰链树**：BFS 沿共边关系把每片挂到父片的铰链 TransformNode 下，铰链位于公共边中点、局部 X 轴沿公共边，绕 X 旋转即折叠；`liftSign` 保证正角度总是向上抬。
- **历史是事件流而非状态栈**：回放时用 `snapshotAt(events, seq)` 重放，倒放只需递减 seq。
- **Babylon 按需引入**：阴影、Ray、多边形三角化等副作用模块（`shadowGeneratorSceneComponent`、`Culling/ray`、`polygonMesh`、earcut）需显式导入，否则 ES Module 打包后运行时报错。
