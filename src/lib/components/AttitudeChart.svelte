<script lang="ts">
  import { onMount } from 'svelte';
  import type { SimSample } from '../types';
  import { rad2deg } from '../sim/math';

  interface Props {
    samples: SimSample[];
    cursorTime: number;
    channels: { key: string; label: string; color: string; axis: 'deg' | 'm' | 'mps' | 'kn' }[];
    title: string;
    height?: number;
  }

  let { samples, cursorTime, channels, title, height = 180 }: Props = $props();

  let canvas: HTMLCanvasElement;
  let hoverIdx = $state<number | null>(null);

  type Pt = { t: number; v: number };

  function series(key: string): Pt[] {
    return samples.map((s) => {
      const v =
        key === 'roll' ? rad2deg(s.roll)
        : key === 'pitch' ? rad2deg(s.pitch)
        : key === 'yaw' ? rad2deg(s.yaw)
        : key === 'heave' ? s.heave
        : key === 'x' ? s.x
        : key === 'z' ? s.z
        : key === 'u' ? s.u
        : key === 'v' ? s.v
        : key === 'fender' ? s.totalFenderForce
        : 0;
      return { t: s.t, v };
    });
  }

  function draw(): void {
    if (!canvas || samples.length === 0) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const padL = 46;
    const padR = 12;
    const padT = 28;
    const padB = 24;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const tMax = samples[samples.length - 1].t || 1;

    // 背景
    ctx.fillStyle = '#101922';
    ctx.fillRect(0, 0, w, h);

    // 计算所有通道范围
    let vMin = Infinity;
    let vMax = -Infinity;
    for (const ch of channels) {
      for (const p of series(ch.key)) {
        if (p.v < vMin) vMin = p.v;
        if (p.v > vMax) vMax = p.v;
      }
    }
    if (!isFinite(vMin)) { vMin = -1; vMax = 1; }
    if (vMin === vMax) { vMin -= 1; vMax += 1; }
    const pad = (vMax - vMin) * 0.12;
    vMin -= pad;
    vMax += pad;
    if (channels.every((c) => c.axis === 'deg') || channels.some((c) => c.key === 'roll')) {
      vMin = Math.min(vMin, vMax > 0 ? -vMax : vMin);
      vMax = Math.max(vMax, -vMin);
    }

    const X = (t: number): number => padL + (t / tMax) * plotW;
    const Y = (v: number): number => padT + (1 - (v - vMin) / (vMax - vMin)) * plotH;

    // 网格
    ctx.strokeStyle = '#1e2d3a';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#7d92a6';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    const gridN = 4;
    for (let i = 0; i <= gridN; i++) {
      const v = vMin + ((vMax - vMin) * i) / gridN;
      const y = Y(v);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      ctx.fillText(v.toFixed(1), padL - 6, y + 3);
    }
    ctx.textAlign = 'center';
    const tN = 6;
    for (let i = 0; i <= tN; i++) {
      const t = (tMax * i) / tN;
      const x = X(t);
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, padT + plotH);
      ctx.stroke();
      ctx.fillText(`${t.toFixed(0)}s`, x, h - 8);
    }
    // 零轴
    if (vMin < 0 && vMax > 0) {
      ctx.strokeStyle = '#3a4d5e';
      ctx.beginPath();
      ctx.moveTo(padL, Y(0));
      ctx.lineTo(w - padR, Y(0));
      ctx.stroke();
    }

    // 曲线
    for (const ch of channels) {
      const data = series(ch.key);
      ctx.strokeStyle = ch.color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      data.forEach((p, i) => {
        const x = X(p.t);
        const y = Y(p.v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // 图例
    ctx.textAlign = 'left';
    ctx.font = '11px system-ui';
    let lx = padL + 4;
    for (const ch of channels) {
      ctx.fillStyle = ch.color;
      ctx.fillRect(lx, 8, 14, 3);
      ctx.fillText(ch.label, lx + 18, 12);
      lx += ctx.measureText(ch.label).width + 34;
    }

    // 回放游标
    const cx = X(Math.min(cursorTime, tMax));
    ctx.strokeStyle = '#e8edf2';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, padT);
    ctx.lineTo(cx, padT + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    // hover 提示
    const hidx = hoverIdx;
    if (hidx !== null && samples[hidx]) {
      const s = samples[hidx];
      const hx = X(s.t);
      ctx.strokeStyle = '#9fc4dc';
      ctx.beginPath();
      ctx.moveTo(hx, padT);
      ctx.lineTo(hx, padT + plotH);
      ctx.stroke();
      ctx.fillStyle = '#0c141c';
      const lines = channels.map((ch) => {
        const p = series(ch.key)[hidx];
        return `${ch.label}: ${p.v.toFixed(2)} ${ch.axis === 'deg' ? '°' : ch.axis === 'mps' ? 'm/s' : ch.axis === 'kn' ? 'kN' : 'm'}`;
      });
      const boxW = 132;
      const boxH = 14 * lines.length + 18;
      const bx = Math.min(w - boxW - 4, hx + 8);
      ctx.fillRect(bx, padT + 4, boxW, boxH);
      ctx.strokeStyle = '#3a4d5e';
      ctx.strokeRect(bx, padT + 4, boxW, boxH);
      ctx.fillStyle = '#cfe0ee';
      ctx.textAlign = 'left';
      ctx.fillText(`t = ${s.t.toFixed(1)}s`, bx + 8, padT + 16);
      lines.forEach((ln, i) => ctx.fillText(ln, bx + 8, padT + 30 + i * 14));
    }
  }

  function onMove(e: MouseEvent): void {
    const rect = canvas.getBoundingClientRect();
    const tMax = samples[samples.length - 1]?.t ?? 1;
    const padL = 46;
    const plotW = rect.width - padL - 12;
    const t = ((e.clientX - rect.left - padL) / plotW) * tMax;
    let best = 0;
    let bd = Infinity;
    samples.forEach((s, i) => {
      const d = Math.abs(s.t - t);
      if (d < bd) { bd = d; best = i; }
    });
    hoverIdx = best;
    draw();
  }

  onMount(() => {
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  });

  $effect(() => {
    void cursorTime;
    void samples;
    void channels;
    draw();
  });
</script>

<div class="chart" style="height:{height}px">
  <div class="title">{title}</div>
  <canvas
    bind:this={canvas}
    onmousemove={onMove}
    onmouseleave={() => { hoverIdx = null; draw(); }}
  ></canvas>
</div>

<style>
  .chart {
    position: relative;
    background: #101922;
    border-radius: 8px;
    overflow: hidden;
  }
  .title {
    position: absolute;
    right: 12px;
    top: 6px;
    font-size: 12px;
    color: #9fc4dc;
    pointer-events: none;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
    cursor: crosshair;
  }
</style>
