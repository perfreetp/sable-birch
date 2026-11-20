# eVTOL 涂装材质预览工具

基于 **Svelte + three.js + three-mesh-bvh** 的 eVTOL 机体涂装/材质预览工具。

## 运行

```bash
npm install
npm run dev      # 开发
npm run build    # 构建
npm run preview  # 预览构建产物
```

## 功能模块

### 1. 模型导入
- 内置程序化 eVTOL 演示机体(机身 / 机翼 / 舱门 / 旋翼 / 滑橇)
- 支持导入 glTF / GLB,按部件名关键词自动分区,可手动调整
- 涂装文件(`.json`)导出 / 导入:包含分色遮罩、部件分区、材质参数,下次导入可还原全部漆面

### 2. 分区绘制
- 三个分区:机身、机翼、舱门,笔刷仅作用于当前选中分区
- 射线拾取(three-mesh-bvh 加速)+ BVH shapecast 球形笔刷,精确定位落点
- 笔刷半径 3 档(细 / 中 / 粗),支持橡皮擦与分区清除
- 顶点色分色遮罩:未涂区域显示底漆,涂抹区域显示金属漆颜色

### 3. 材质调校
- 三层材质:底漆(颜色)、金属漆(金属度 / 粗糙度各 5 档)、清漆(厚度 + 光泽独立调节)
- 两套环境光照:室内机库 / 户外夕阳,实时查看漆面反射变化
- 显示模式:实体 / 线框 / 法线
- 材质配置自动保存到浏览器 localStorage

## 技术要点

- `three-mesh-bvh`:`computeBoundsTree` / `acceleratedRaycast` 加速射线拾取,`shapecast` 做球形笔刷顶点收集
- `MeshPhysicalMaterial`:clearcoat / clearcoatRoughness 实现清漆层
- PMREM 程序化环境贴图(RoomEnvironment + 自定义夕阳场景),无外部 HDR 依赖
- 涂装文件:遮罩与顶点色量化 base64 编码,按部件名 + 顶点数校验还原
