# 虚拟展厅漫游器 (Virtual Gallery Roamer)

基于 **TypeScript + Svelte 5 + three.js + photo-sphere-viewer** 的博物馆线上展厅漫游应用。

## 功能

- **全景浏览**:加载等距柱状投影全景图,鼠标拖拽环视、滚轮缩放,俯仰角限制在 ±60°
- **展柜热点**:HTML 热点标记随视角做球面投影、屏幕尺寸恒定,带脉冲动画与铭牌
- **展品 3D 模型**:点击热点在当前位置展开,半透明背景叠加于全景之上,可绕模型旋转/缩放(OrbitControls),Esc 或关闭按钮返回全景
- **路径漫游**:沿预设路径点平滑移动(ease-in-out 插值),三档速度(慢/中/快),移动中热点按与视角的角距离渐隐
- **展品清单侧栏**:点击条目平滑跳转至对应展柜并自动展开模型
- **配置导出**:一键导出 JSON,包含全景引用、热点坐标(yaw/pitch)、展品模型列表与路径点

## 界面布局

```
┌──────────┬─────────────────────────────┐
│          │                             │
│  展品清单 │        全景视口              │
│  (侧栏)  │   (photo-sphere-viewer)     │
│          │                             │
├──────────┴─────────────────────────────┤
│        底部路径控制条(播放/速度/导出)   │
└─────────────────────────────────────────┘
```

## 运行

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 生产构建
npm run check    # 类型检查
```

## 接入真实数据

- **全景图**:把 `src/data.ts` 中 `createGalleryConfig()` 的 `panorama` 换成真实全景图 URL(演示版为 `src/panoTexture.ts` 程序化生成的展厅图)
- **展品模型**:`model` 字段改为 `{ type: 'gltf', url: '/models/xxx.glb' }` 即走 GLTFLoader 加载;`{ type: 'procedural', shape }` 使用内置程序化模型
- **热点/路径**:直接编辑 `src/data.ts` 中的 `exhibits` 与 `path` 数组(角度制)

## 导出文件格式

```json
{
  "version": 1,
  "title": "古代文明展厅",
  "panorama": "generated://equirect-museum-hall",
  "exportedAt": "…",
  "hotspots": [{ "id": "bronze-ding", "name": "青铜鼎", "yaw": -120, "pitch": -8 }],
  "models": [{ "id": "bronze-ding", "name": "青铜鼎", "type": "procedural", "shape": "ding" }],
  "path": [{ "yaw": -150, "pitch": 0, "zoom": 45 }]
}
```
