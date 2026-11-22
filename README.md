# 列车驾驶视景合成工具

基于 TypeScript + 原生 Web Components + three.js + postprocessing 的多图层列车驾驶视景合成工具。

## 功能

- **三图层视景**：远景（天空/山峦）、中景（树林/建筑/跨线桥）、近景（钢轨/接触网/护栏），程序化生成
- **图层控制**：每层独立的不透明度（0–1）与混合模式（正常 / 叠加 / 滤色），拖拽调整图层顺序
- **postprocessing 合成通道**：三层各自渲染到 RenderTarget，由自定义 Effect 在合成通道中按顺序混合
- **雾效**：0–1 滑条控制，远/中/近景按距离差异化衰减
- **昼夜与色温**：昼夜切换，环境光色温 2000–8000K 可调
- **相机**：俯仰 -30°–30°，偏航 -60°–60°，实时预览
- **持久化**：所有合成参数自动保存到 localStorage；可导出 JSON 预设分享，导入后完整还原合成状态与相机角度

## 运行

```bash
npm install
npm run dev
```

构建：`npm run build`，类型检查已包含在构建中。

## 预设 JSON 格式

```json
{
  "layers": [
    { "id": "far",  "opacity": 1, "blendMode": "normal" },
    { "id": "mid",  "opacity": 1, "blendMode": "normal" },
    { "id": "near", "opacity": 1, "blendMode": "normal" }
  ],
  "fog": 0.35,
  "night": false,
  "colorTemp": 5500,
  "pitch": 0,
  "yaw": 0
}
```

`layers` 数组顺序即合成顺序（首位 = 最底层）。
