# 火箭发射弹道三维可视化系统

基于 **TypeScript + React + three.js + postprocessing** 的火箭发射弹道计算与三维可视化系统。从发射窗口参数出发，完成三级飞行弹道解算、WGS84 椭球地球重建、残骸落区投影与全流程轨迹回放。

## 功能总览

### 1. 发射参数面板（首页）
- 输入发射点经纬度、发射方位角、目标入轨高度、推重比 T/W₀、发射场名称
- 数字输入框 + 滑块联动，含范围校验与三个预设发射场（文昌 / 酒泉 / 肯尼迪）
- 支持导入已分享的轨迹 JSON

### 2. 弹道计算（`src/lib/trajectory.ts`）
- **ECEF 地固系 RK4 积分**：中心引力、地球自转（离心力 + 科氏力）、指数大气阻力
- **重力转弯程序制导**：垂直段 → 助推段缓倾 → 一级主转弯 → 二级压平入轨，推力沿速度方向降低转向损失
- **燃料耗尽驱动分级**：质量流由比冲 `ṁ = T/(Isp·g₀)` 决定，三级烧完即分离，物理自洽
- **俯仰缩放二分搜索**：自动匹配目标入轨高度（400–1200km 误差 < 2km）
- 入轨速度 ~7.7 km/s，符合 400km 圆轨道理论值 7.67 km/s
- **残骸落区**：按分离时刻速度矢量自由落体投影到 WGS84 椭球面，叠加方向 ±2° / 速度 ±3% 扰动，凸包生成散布区域；留轨级（近地点高于卡门线）自动标注不投影

### 3. 三维场景（`src/three/`）
- **WGS84 椭球地球**：长半轴 6378137m、扁率 1/298.257，程序化 FBM 着色器生成海陆/冰盖，无需贴图
- **经纬网格**：每 15° 经纬线，主/次两级明度
- **大气层**：30/70km 半透明球壳 + 100km 卡门线分层壳 + 160km 边缘辉光
- **弹道曲线**：Line2 高度渐变色带（青→黄绿→橙→红）+ Additive 发光轨迹管，贴合椭球曲率不穿地
- **三个分离事件点**：橙（助推器）/ 红（一级）/ 青（二级），脉动球 + 发光环，颜色区分
- 发射场光柱标注、星空背景、晨昏线光照

### 4. 后处理（postprocessing）
- `BloomEffect` 辉光
- 自定义 `DepthFogEffect` 深度雾（基于注入的线性深度，远处地球边缘隐入深空）

### 5. 轨迹回放
- 时间轴拖动定位、播放/暂停
- **0.5× / 1× / 2× / 4× / 8×** 五档倍速
- 相机**跟随箭体**或自由环绕（OrbitControls）
- 分离点自动弹出该段速度 / 高度 / 落点读数
- 阶段进度条（助推/一级/二级/滑行）+ 实时高度、速度、弹道角读数
- 火箭模型沿速度方向姿态对齐，带尾焰动画

### 6. 数据分享
- 一键导出完整轨迹 JSON（参数、采样点、事件、落区、时间）
- 首页可导入 JSON 还原场景，含 schema 校验

## 开发

```bash
npm install
npm run dev        # 开发服务器 http://127.0.0.1:5173
npm run build      # 类型检查 + 生产构建
npm run preview    # 预览构建产物
```

## 验证脚本（`scripts/`）

```bash
# 弹道物理烟雾测试（入轨高度/速度、穿地、落区）
npx esbuild scripts/smoke.ts --bundle --platform=node --format=esm --outfile=scripts/smoke.mjs && node scripts/smoke.mjs
# 多目标高度 / 多 TWR 收敛性
npx esbuild scripts/multitarget.ts --bundle --platform=node --format=esm --outfile=scripts/multitarget.mjs && node scripts/multitarget.mjs
# JSON 导出往返一致性
npx esbuild scripts/iotest.ts --bundle --platform=node --format=esm --outfile=scripts/iotest.mjs && node scripts/iotest.mjs
```

## 目录结构

```
src/
├── lib/
│   ├── geo.ts            # WGS84 常量、大地坐标↔ECEF、ENU 基向量
│   ├── types.ts          # 输入参数、采样点、分离事件等类型
│   ├── trajectory.ts     # 弹道积分、分级、落区、入轨搜索
│   └── io.ts             # JSON 导入导出、格式化
├── three/
│   ├── earth.ts          # 地球、网格、大气层、星空
│   ├── trajectoryRender.ts # 渐变弹道、标记、落区、火箭模型
│   ├── DepthFogEffect.ts # 自定义深度雾后处理
│   └── scene.ts          # 场景主控、相机、回放同步
├── hooks/usePlayback.ts  # 回放引擎（倍速、拖动、播放）
├── components/           # LaunchPanel / Viewport / PlaybackBar
└── App.tsx               # 页面装配
```

## 物理模型说明

- 坐标系：ECEF 地固直角系，旋转框架方程 `a = F/m − 2Ω×v − Ω×(Ω×r)`
- 大气：等温指数模型 `ρ = ρ₀·exp(−h/H)`，H=8500m
- 质量流：`ṁ = T/(Isp·g₀)`，Isp=380s；燃料预算耗尽即该级关机分离
- 理想 Δv 预算 ≈ 9.65 km/s，扣除重力/阻力/转向损失后入轨速度 ~7.7 km/s
- 残骸落点：二体重力 + 旋转系修正 + 气动阻力积分至椭球面交点
