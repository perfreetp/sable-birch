import { SHAPES, type ShapeKind } from "./geometry";

export interface CardEvent {
  type: "add" | "move" | "delete";
  kind?: ShapeKind;
}

export interface CardInput {
  title: string;
  shot: HTMLCanvasElement; // 3D 场景截图
  tileCounts: Record<ShapeKind, number>;
  events: CardEvent[];
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function shapeIcon(ctx: CanvasRenderingContext2D, kind: ShapeKind, cx: number, cy: number, s: number, color: string) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(60,60,80,0.55)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  const verts = SHAPES[kind].verts;
  const scale = s / 4; // 局部坐标范围约 ±2
  verts.forEach((v, i) => {
    const x = v.x * scale;
    const y = v.y * scale;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

const KIND_COLORS: Record<ShapeKind, string> = {
  square: "#5c9efa",
  triangle: "#6bd175",
  hexagon: "#b880f5",
  sector: "#ffc747",
};

export function buildCard(input: CardInput): HTMLCanvasElement {
  const W = 900;
  const H = 1200;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // 背景渐变
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#fff8ec");
  bg.addColorStop(1, "#eef4ff");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 标题
  ctx.fillStyle = "#3a3550";
  ctx.font = "bold 56px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🧲 磁力片搭法卡", W / 2, 96);
  ctx.font = "32px system-ui, sans-serif";
  ctx.fillStyle = "#7a7490";
  ctx.fillText(input.title, W / 2, 148);

  // 截图区
  const shotX = 60;
  const shotY = 190;
  const shotW = W - 120;
  const shotH = 620;
  roundRect(ctx, shotX, shotY, shotW, shotH, 32);
  ctx.save();
  ctx.clip();
  ctx.fillStyle = "#f5f1e8";
  ctx.fillRect(shotX, shotY, shotW, shotH);
  // 等比绘制截图
  const src = input.shot;
  const ratio = Math.min(shotW / src.width, shotH / src.height);
  const dw = src.width * ratio;
  const dh = src.height * ratio;
  ctx.drawImage(src, shotX + (shotW - dw) / 2, shotY + (shotH - dh) / 2, dw, dh);
  ctx.restore();
  ctx.strokeStyle = "rgba(120,110,140,0.35)";
  ctx.lineWidth = 4;
  roundRect(ctx, shotX, shotY, shotW, shotH, 32);
  ctx.stroke();

  // 材料统计
  const kinds = Object.keys(input.tileCounts) as ShapeKind[];
  const total = kinds.reduce((s, k) => s + input.tileCounts[k], 0);
  const panelY = 860;
  roundRect(ctx, 60, panelY, W - 120, 180, 28);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fill();
  ctx.strokeStyle = "rgba(120,110,140,0.25)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#3a3550";
  ctx.font = "bold 34px system-ui, sans-serif";
  ctx.fillText(`用了 ${total} 片磁力片`, 96, panelY + 58);

  const slot = (W - 192) / 4;
  kinds.forEach((k, i) => {
    const cx = 96 + slot * i + slot / 2;
    const cy = panelY + 122;
    shapeIcon(ctx, k, cx, cy - 8, 62, KIND_COLORS[k]);
    ctx.fillStyle = "#3a3550";
    ctx.font = "bold 30px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`× ${input.tileCounts[k]}`, cx, panelY + 160);
  });

  // 页脚
  ctx.fillStyle = "#9a94ab";
  ctx.font = "26px system-ui, sans-serif";
  ctx.textAlign = "center";
  const adds = input.events.filter((e) => e.type === "add").length;
  const moves = input.events.filter((e) => e.type === "move").length;
  const deletes = input.events.filter((e) => e.type === "delete").length;
  ctx.fillText(
    `共 ${input.events.length} 步 · 放上 ${adds} 次 · 移动 ${moves} 次 · 重做 ${deletes} 次`,
    W / 2,
    1110
  );
  const d = new Date();
  ctx.fillText(
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} · 磁力片乐园`,
    W / 2,
    1155
  );

  return canvas;
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
