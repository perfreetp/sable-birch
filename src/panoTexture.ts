import type { Exhibit } from './types';

/**
 * 程序化生成一张等距柱状投影(equirectangular)展厅全景图。
 * 天花板 / 墙面 / 地板三段式布局,并在每个展品热点的方位上
 * 绘制展柜与铭牌,使热点与画面内容对齐。
 */
export function generateMuseumPanorama(exhibits: Exhibit[]): string {
  const W = 2048;
  const H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const yawToX = (yaw: number) => ((yaw + 180) / 360) * W;
  const pitchToY = (pitch: number) => ((90 - pitch) / 180) * H;

  // --- 天花板 ---
  const ceil = ctx.createLinearGradient(0, 0, 0, H * 0.42);
  ceil.addColorStop(0, '#1a1d26');
  ceil.addColorStop(1, '#3a3f4e');
  ctx.fillStyle = ceil;
  ctx.fillRect(0, 0, W, H * 0.42);

  // 顶灯带
  ctx.fillStyle = 'rgba(255, 236, 190, 0.85)';
  for (let i = 0; i < 12; i++) {
    const x = (i / 12) * W + W / 24;
    ctx.beginPath();
    ctx.ellipse(x, H * 0.1, 46, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- 墙面 ---
  const wall = ctx.createLinearGradient(0, H * 0.3, 0, H * 0.62);
  wall.addColorStop(0, '#8a7f6a');
  wall.addColorStop(0.5, '#a89a80');
  wall.addColorStop(1, '#7d7260');
  ctx.fillStyle = wall;
  ctx.fillRect(0, H * 0.3, W, H * 0.32);

  // 墙柱
  ctx.fillStyle = 'rgba(60, 52, 40, 0.55)';
  for (let d = -180; d < 180; d += 36) {
    const x = yawToX(d);
    ctx.fillRect(x - 8, H * 0.3, 16, H * 0.32);
  }
  // 墙裙
  ctx.fillStyle = '#4c4438';
  ctx.fillRect(0, H * 0.58, W, H * 0.04);

  // --- 地板 ---
  const floor = ctx.createLinearGradient(0, H * 0.62, 0, H);
  floor.addColorStop(0, '#5d5648');
  floor.addColorStop(1, '#2e2a22');
  ctx.fillStyle = floor;
  ctx.fillRect(0, H * 0.62, W, H * 0.38);

  // 地板反光条带
  ctx.strokeStyle = 'rgba(255, 240, 210, 0.10)';
  ctx.lineWidth = 2;
  for (let d = -180; d < 180; d += 15) {
    const x = yawToX(d);
    ctx.beginPath();
    ctx.moveTo(x, H * 0.62);
    ctx.lineTo(x + (x - W / 2) * 0.6, H);
    ctx.stroke();
  }

  // --- 展柜与铭牌 ---
  for (const ex of exhibits) {
    const x = yawToX(ex.hotspot.yaw);
    const y = pitchToY(ex.hotspot.pitch);
    const cw = 150; // 展柜宽
    const ch = 190; // 展柜高

    // 背板壁龛
    ctx.fillStyle = '#3d3830';
    ctx.fillRect(x - cw / 2 - 18, y - ch / 2 - 30, cw + 36, ch + 60);

    // 玻璃展柜
    const caseGrad = ctx.createLinearGradient(x, y - ch / 2, x, y + ch / 2);
    caseGrad.addColorStop(0, 'rgba(210, 225, 235, 0.30)');
    caseGrad.addColorStop(1, 'rgba(140, 160, 175, 0.16)');
    ctx.fillStyle = caseGrad;
    ctx.fillRect(x - cw / 2, y - ch / 2, cw, ch);
    ctx.strokeStyle = 'rgba(230, 240, 250, 0.8)';
    ctx.lineWidth = 3;
    ctx.strokeRect(x - cw / 2, y - ch / 2, cw, ch);

    // 展台
    ctx.fillStyle = '#6b6152';
    ctx.fillRect(x - cw / 2 + 14, y + ch / 2 - 46, cw - 28, 40);

    // 展品剪影
    ctx.fillStyle = '#241f18';
    ctx.beginPath();
    ctx.ellipse(x, y + ch / 2 - 58, 30, 36, 0, 0, Math.PI * 2);
    ctx.fill();

    // 射灯光斑
    const spot = ctx.createRadialGradient(x, y - 40, 4, x, y - 40, 90);
    spot.addColorStop(0, 'rgba(255, 244, 214, 0.5)');
    spot.addColorStop(1, 'rgba(255, 244, 214, 0)');
    ctx.fillStyle = spot;
    ctx.fillRect(x - 90, y - 130, 180, 180);

    // 铭牌
    ctx.fillStyle = '#efe6d2';
    ctx.fillRect(x - 60, y + ch / 2 + 12, 120, 30);
    ctx.fillStyle = '#2c2620';
    ctx.font = 'bold 18px "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ex.name, x, y + ch / 2 + 27, 112);
  }

  // 展厅标题墙
  ctx.fillStyle = 'rgba(240, 232, 210, 0.9)';
  ctx.font = 'bold 44px "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('古 代 文 明 展 厅', W / 2, H * 0.36);

  return canvas.toDataURL('image/jpeg', 0.88);
}
