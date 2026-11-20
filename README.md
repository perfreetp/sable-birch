# 城市建筑遮挡评估工具

面向**空域规划**岗位的视线遮挡分析工具：导入城市建筑体块，在地面布置观察点，设定飞行高度带后，
逐条计算「观察点 → 空域采样点」的视线是否被建筑遮挡，并按遮挡程度对采样点三维着色。

技术栈：**SolidJS + three.js + three-mesh-bvh + TypeScript + Vite**

---

## 快速开始

```bash
npm install
npm run dev        # 开发服务器 http://127.0.0.1:5173
```

其他命令：

```bash
npm run build      # 生产构建（输出 dist/）
npm run preview    # 预览生产构建
npm run typecheck  # TypeScript 类型检查
npm test           # 核心算法冒烟测试（Node 环境，无需浏览器）
```

打开后点击顶栏 **「加载示例城市」** 即可体验完整流程（自动生成 113 栋建筑 + 1 个观察点并完成首次计算）。

---

## 三大功能模块

左侧栏按作业流程组织为 3 个模块，顶部 1/2/3 切换：

### ① 观察点设置
- 观察点列表：新增 / 删除 / 导入 / 导出 / 单独启停
- 编辑面板：名称、地面坐标 X/Z、眼高、**朝向角**（0=正北，顺时针）、水平视场角、垂直上仰/下俯角
- 3D 视图中可直接**拖拽橙色球体**改变观察点位置，黄色锥体表示朝向，金色线框为视场锥
- 观察点配置持久化到浏览器 `localStorage`，支持 JSON 文件导入导出

### ② 遮挡计算
- 空域采样范围（矩形地面投影，可调四角坐标，可一键贴合建筑范围）
- **采样间距 3 档**：稀疏 50 m / 标准 25 m / 精细 10 m，实时预估采样点数量
- 飞行高度带：默认 0–300 m 均分 5 层，可自定义上下限后重新均分
- 计算控制：支持「参数变化自动重算」（拖拽观察点、改视场角后实时更新）与手动计算
- 进度条 + 状态指示；采样点超 30 万上限时自动稀疏化并提示

### ③ 分层查看
- 5 个高度带**单独开关**，控制 3D 场景中对应采样点层的显示/隐藏
- 分层遮挡率表格：视场内样本数、平均遮挡程度、遮挡率（带进度条）
- 整体合计：总样本、整体遮挡率、完全遮挡率
- **结果导出**：
  - `occlusion_report_*.json`：分层遮挡率 + 全部采样点结果 + 观察点配置
  - `occlusion_samples_*.csv`：逐采样点明细（含层、坐标、遮挡比、命中数、分级），带 UTF-8 BOM 可直接用 Excel 打开

---

## 遮挡评估原理

1. **建筑建模**：每栋建筑由底面多边形（`footprint`，支持孔洞）+ 高度（`height`）经
   `ExtrudeGeometry` 挤出为闭合体块；全部建筑合并为单一几何体。
2. **BVH 加速**：在合并几何体上构建 `three-mesh-bvh` 的 `MeshBVH` 层次包围盒，
   将射线求交从 O(n) 三角面遍历降为 O(log n)。
3. **空域采样**：在矩形空域内按水平网格布点，每层取层高中点作为采样高度。
4. **视场锥剔除**：先按观察点的水平/垂直张角判断采样点是否在视场内，视场外点不发射射线（渲染为冷灰色）。
5. **逐条视线求交**：对视场内采样点，从观察点眼位发射射线，`raycastFirst(ray, side, 0, dist)`
   仅统计到达目标**之前**命中建筑的视线。
6. **遮挡程度**：多观察点时 `occlusion = 被遮挡观察点数 / 有效观察点数`，取值 0~1：
   - 0 = 可见（绿） → 0~1 渐变 → 1 = 完全遮挡（红），中间为部分遮挡（黄）

> 旋转、缩放视角只改变相机，不改变计算结果；观察点位置/朝向、视场角、采样参数变化会触发自动重算并实时刷新着色。

---

## 数据文件格式

### 建筑体块 JSON

坐标系：地面为 z=0 平面，**y 轴为高度方向**（文件中用 `footprint` 的 x/z 描述底面，单位米）。

```json
{
  "source": "可选来源标记",
  "buildings": [
    {
      "name": "建筑名（可选）",
      "footprint": [[x, z], [x, z], [x, z]],
      "holes": [[[x, z], [x, z], [x, z]]],
      "height": 60,
      "baseHeight": 0
    }
  ]
}
```

- `footprint`：底面外环顶点数组，至少 3 个点，按顺序首尾相接（无需重复首点）
- `holes`：可选，底面孔洞（如天井），每个孔洞为一个顶点环
- `height`：建筑高度（米，正数）；`baseHeight`：底部标高（默认 0）

模板见 `public/sample-buildings.template.json`。

### 观察点配置 JSON

```json
{
  "observers": [
    {
      "name": "南门观察点",
      "x": 60, "z": -40,
      "eyeHeight": 1.6,
      "yaw": 0,
      "fov": 90,
      "pitchUp": 60,
      "pitchDown": -10,
      "enabled": true
    }
  ]
}
```

- `yaw`：朝向角（度），0 = 正北（-Z 方向），顺时针递增
- `fov`：水平视场角；`pitchUp`/`pitchDown`：垂直视场上/下限（度，仰角为正）

模板见 `public/sample-observers.template.json`。

---

## 浏览器存储

建筑体块、观察点、高度层与显示设置均保存在 `localStorage`（键名前缀 `uao:`）：

| 键 | 内容 |
|---|---|
| `uao:buildings:v1` | 建筑体块 |
| `uao:observers:v1` | 观察点配置 |
| `uao:layers:v1` | 高度带分层 |
| `uao:settings:v1` | 显示模式、采样间距、空域范围 |

顶栏实时显示本地存储占用，提供「清空数据」。localStorage 通常有 5 MB 上限，
超大城市数据集建议通过文件导入而非依赖持久化（存储失败会提示但不影响当前会话计算）。

---

## 目录结构

```
src/
├── types.ts                 # 全局类型
├── lib/
│   ├── geometry.ts          # 建筑挤出、几何合并、BVH 构建
│   ├── sampling.ts          # 空域网格采样、5 层高度带
│   ├── occlusion.ts         # 视场锥判定 + 逐条 BVH 射线求交
│   ├── stats.ts             # 分层遮挡率统计
│   ├── export.ts            # 配色、JSON/CSV 导出
│   ├── importer.ts          # 文件解析与校验
│   ├── storage.ts           # localStorage 封装
│   ├── sampleCity.ts        # 内置示例城市生成
│   └── id.ts
├── three/
│   └── SceneEngine.ts       # three.js 场景：渲染、观察点拖拽、视锥、采样点着色
├── store/
│   ├── AppStore.ts          # SolidJS 响应式状态 + 计算编排
│   └── context.tsx
├── ui/
│   ├── App.tsx              # 布局与场景/状态联动
│   ├── TopBar.tsx           # 导入导出、实体/半透明切换
│   ├── LegendBar.tsx        # 图例与状态
│   ├── controls.tsx         # 表单原语
│   └── modules/
│       ├── ObserverModule.tsx   # 模块① 观察点设置
│       ├── ComputeModule.tsx    # 模块② 遮挡计算
│       └── LayerModule.tsx      # 模块③ 分层查看
└── styles/app.css
test/
├── smoke.ts / run-smoke.mjs     # 算法冒烟测试（几何/BVH/视场/采样/统计）
├── e2e-cdp.mjs                  # 无头 Chrome 端到端验证（CDP，无第三方依赖）
└── drag-check.mjs               # 观察点 3D 拖拽与自动重算验证
```

---

## 验证情况

- `npm run typecheck`：TypeScript 严格模式通过
- `npm test`：7 组核心算法断言全部通过（挤出坐标轴、BVH 遮挡/越顶/绕行、水平/垂直视场锥、采样上限保护、分层统计）
- `npm run build`：生产构建通过（gzip 后约 169 KB）
- 无头浏览器端到端（需本机 Chrome，通过 CDP 驱动，无第三方依赖；先 `npm run dev` 再运行）：
  - `node test/e2e-cdp.mjs`：示例城市 113 栋建筑、7220 采样点全流程，覆盖自动重算、5 层开关、
    实体/半透明、JSON/CSV 导出内容校验、刷新后存储恢复
  - `node test/drag-check.mjs`：观察点 3D 拖拽拾取、坐标持久化与拖拽后自动重算
  - 截图产物 `test/e2e-*.png` 已在 `.gitignore` 中忽略
