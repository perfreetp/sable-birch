# 文物高精纹理查看器

基于 **TypeScript + Vue 3 + three.js + potree-core** 的馆藏文物扫描件浏览器端细节检视与标注工具。
内置一件程序化生成的「馆藏青铜壶」演示模型，无需外部数据即可体验全部功能。

## 功能清单

| 需求 | 实现方式 |
| --- | --- |
| 多级纹理按视距自动切换，1–8 档 | 点云侧映射 potree `pointBudget` + `minNodePixelSize`；网格侧用 mipmap bias + 各向异性过滤。每帧按相机-模型距离自动选档，也可手动锁定 |
| 表面点选生成标注，锚定模型局部坐标 | 射线拾取（网格 `Raycaster` / 点云 `Potree.pick`），世界坐标经 `worldToLocal` 与逆四元数变换为模型根局部坐标与法线；Sprite 作为模型子节点，任意变换仍贴合表面 |
| 标注随视角旋转始终贴合表面 | Sprite 始终面向相机，按距离反推世界尺寸保持恒定屏幕像素；HTML 标签每帧投影定位，含遮挡半透明处理 |
| 材质切换对比漫反射与法线通道 | 网格断开 `map` / `normalMap`；点云切换 `RGB` / `NORMAL` / `DEPTH` 着色。两通道可单独关闭（至少保留一个） |
| 环境光强度 0–2 调节 | `AmbientLight.intensity` 滑块，联动直射光补偿避免过曝；点云映射为 RGB 亮度/伽马 |
| 框选局部放大并重算纹理层级 | 屏幕矩形四角反投影与模型求交，取交点中心为新轨道目标并推进相机；距离缩短后自动档位重算（LOD 提升） |
| 多角度书签保存相机位姿与档位 | 保存 position/target/up/fov + 当前档位与自动模式，平滑飞行恢复 |
| 导出/导入工程恢复全部状态 | JSON 含模型引用、标注点集（局部坐标+法线）、书签位姿、视图参数，带格式与完整性校验 |
| 左视口 / 右双通道+标注面板 / 顶部档位+书签栏 | CSS Grid 三栏布局，深色专业界面 |

## 快速开始

```bash
npm install
npm run dev        # 开发服务器，默认 http://localhost:5180
npm run build      # 类型检查 + 生产构建到 dist/
npm run preview    # 预览生产构建
npm run typecheck  # 仅类型检查
```

启动后自动加载内置青铜壶演示模型。

## 导入自有数据

### glTF 网格（.glb / .gltf）
顶栏「导入模型」选择单个 `.glb` 文件。模型自动居中并归一化到统一尺寸，纹理档位通过 mipmap 采样控制。

### potree 点云（多级 LOD）
1. 用 [PotreeConverter](https://github.com/potree/PotreeConverter) 把扫描点云转换为八叉树目录（含 `metadata.json`、`octree.bin` 与 hierarchy/data 子目录）。
2. 视口左上角「导入点云目录」，选择整个转换输出目录。
3. 应用通过自定义 `RequestManager` 把目录内文件映射为 blob URL，potree 按需加载八叉树节点；档位 1–8 对应从 2 万到 600 万点预算与逐级加深的节点细分。

> 也可调用 `ViewerEngine.loadPotreeUrl(metadataUrl)` 加载部署在 HTTP 服务上的点云。

## 工程文件格式（.json）

```jsonc
{
  "format": "artifact-viewer-project",
  "version": 1,
  "model": { "kind": "demo|gltf|potree", "name": "...", "rootName": "..." },
  "annotations": [
    { "id": "...", "title": "...", "note": "...", "color": "#ffb020",
      "position": { "x": 0, "y": 0, "z": 0 },          // 模型根局部坐标
      "normal":   { "x": 0, "y": 1, "z": 0 },
      "createdAt": 0 }
  ],
  "bookmarks": [
    { "id": "...", "name": "...", "tier": 7, "autoTier": false,
      "pose": { "position": {...}, "target": {...}, "up": {...}, "fov": 45 } }
  ],
  "view": { "tier": 4, "autoTier": true, "channelDiffuse": true, "channelNormal": true, "ambient": 1.0 },
  "exportedAt": 0
}
```

重新导入工程时：演示模型直接恢复；外部 glTF/点云因浏览器沙箱无法持久化文件句柄，会提示重新选择源文件，之后标注与书签按模型引用自动对齐。

## 架构

```
src/
├── components/
│   ├── TopBar.vue          # 顶部：8 档位、自动开关、书签、导入导出
│   ├── Viewport.vue        # 左视口：引擎生命周期、文件导入、交互联动
│   ├── TexturePanel.vue    # 右上：通道开关、环境光、档位说明
│   └── AnnotationPanel.vue # 右下：标注列表与书签管理
├── three/
│   ├── viewerEngine.ts     # 核心引擎：渲染循环、LOD、点选、框选、位姿
│   ├── potreeAdapter.ts    # potree-core 封装：加载/LOD/点选/材质/本地 blob 映射
│   ├── annotationMarker.ts # Sprite 锚点 + 屏幕标签（局部坐标、恒定屏幕尺寸、遮挡）
│   └── demoArtifact.ts     # 程序化青铜壶（LatheGeometry + Canvas 漫反射/法线纹理）
├── stores/viewer.ts        # Pinia 全局状态
├── services/projectIO.ts   # 工程导入导出、potree 目录解析
└── types.ts                # 共享类型与工程格式定义
```

关键设计：
- **引擎与 UI 解耦**：`ViewerEngine` 不依赖 Vue，通过回调与 store 通信；组件用 watcher 单向同步状态，marker 生命周期由单一 watcher 管理，避免重复创建。
- **标注锚定**：位置与法线存模型根局部坐标，Sprite 挂在模型根下，模型平移/缩放/旋转后标记自动跟随。
- **档位双轨**：点云用 potree 原生八叉树 LOD；网格用 GPU mipmap bias 模拟多级纹理，两者对 UI 暴露统一的 1–8 档接口。

## 测试

`scripts/` 下为基于 Chrome DevTools Protocol 的无头冒烟测试（需本机 Chrome）：

```bash
# 1. 启动 dev server
npm run dev
# 2. 另开终端，启动带远程调试的无头 Chrome 后运行
node scripts/smoke-test.mjs      # 交互冒烟：档位/通道/点选/书签/框选
node scripts/roundtrip-test.mjs  # 导出 JSON 结构与重新解析校验
node scripts/visual-test.mjs     # 自动档位随缩放变化 + 截图
```

已验证项：8 档切换、视距自动选档（远 5 档→放大 7 档）、表面点选生成局部坐标标注、书签存取、框选放大、通道单开、工程导出往返，全部 0 运行时异常。
