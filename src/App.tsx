import { createSignal, onCleanup, onMount, Show, For } from "solid-js";
import { createScene } from "./lib/scene";
import { Controller } from "./lib/controller";
import { ReplayPlayer } from "./lib/replay";
import { TEMPLATES } from "./lib/templates";
import { SHAPE_ORDER, SHAPES, type ShapeKind } from "./lib/geometry";
import { buildCard, downloadCanvas } from "./lib/export-card";
import type { UIState } from "./lib/controller";

function ShapeSvg(props: { kind: ShapeKind; size?: number }) {
  const s = props.size ?? 56;
  const def = SHAPES[props.kind];
  const scale = s / 5.2;
  const pts = def.verts.map((v) => `${s / 2 + v.x * scale},${s / 2 + v.y * scale}`).join(" ");
  const color = `rgb(${Math.round(def.front.r * 255)},${Math.round(def.front.g * 255)},${Math.round(
    def.front.b * 255
  )})`;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <polygon points={pts} fill={color} fill-opacity="0.82" stroke="rgba(50,50,80,.45)" stroke-width="2" />
    </svg>
  );
}

export default function App() {
  let canvasRef: HTMLCanvasElement | undefined;
  let controller: Controller;
  let replay: ReplayPlayer;
  const [ui, setUi] = createSignal<UIState | null>(null);

  onMount(() => {
    const ctx = createScene(canvasRef!);
    controller = new Controller(ctx);
    replay = new ReplayPlayer(controller, ctx);
    setUi(controller.getState());
    const unsub = controller.subscribe(() => setUi({ ...controller.getState() }));
    onCleanup(() => {
      unsub();
      replay.dispose();
      controller.dispose();
      ctx.dispose();
    });
  });

  const beginDrag = (kind: ShapeKind) => (ev: PointerEvent) => {
    ev.preventDefault();
    controller.beginLibraryDrag(kind, ev);
  };

  const doExport = () => {
    const counts = { square: 0, triangle: 0, hexagon: 0, sector: 0 } as Record<ShapeKind, number>;
    for (const t of controller.tiles.values()) counts[t.kind]++;
    const title = controller.getTemplateName() ?? "我的磁力作品";
    const card = buildCard({
      title,
      shot: controller.exportCard(title),
      tileCounts: counts,
      events: controller.getEvents().map((e) => ({ type: e.type, kind: e.kind })),
    });
    downloadCanvas(card, `磁力片搭法卡-${Date.now()}.png`);
  };

  const startReplay = () => {
    if (!controller.getEvents().length) {
      controller.patch({ toast: "还没有搭过，先拼几片吧～" });
      return;
    }
    replay.start();
  };

  const mode = () => ui()?.mode ?? "build";

  return (
    <div class="app">
      <aside class="dock">
        <div class="brand">
          <span class="brand-emoji">🧲</span>
          <span>磁力片乐园</span>
        </div>

        <div class="dock-section">
          <div class="dock-title">磁力片（拖到台面）</div>
          <div class="shape-grid">
            <For each={SHAPE_ORDER}>
              {(kind) => (
                <button
                  class="shape-btn"
                  classList={{ pulse: ui()?.templateNextKind === kind }}
                  onPointerDown={beginDrag(kind)}
                  disabled={mode() !== "build"}
                >
                  <ShapeSvg kind={kind} />
                  <span>{SHAPES[kind].name}</span>
                </button>
              )}
            </For>
          </div>
        </div>

        <div class="dock-section">
          <div class="dock-title">跟我拼模板</div>
          <div class="tpl-list">
            <For each={TEMPLATES}>
              {(tpl) => (
                <button
                  class="tpl-btn"
                  classList={{ active: ui()?.templateId === tpl.id }}
                  onClick={() =>
                    controller.setTemplate(ui()?.templateId === tpl.id ? null : tpl.id)
                  }
                  disabled={mode() !== "build"}
                >
                  <span class="tpl-emoji">{tpl.emoji}</span>
                  <span>{tpl.name}</span>
                  <Show when={ui()?.templateId === tpl.id}>
                    <span class="tpl-progress">
                      {ui()!.templateStep}/{tpl.steps.length}
                    </span>
                  </Show>
                </button>
              )}
            </For>
          </div>
        </div>

        <div class="dock-section history">
          <div class="dock-title">搭法记录（最近 8 步）</div>
          <Show
            when={(ui()?.eventLabels.length ?? 0) > 0}
            fallback={<div class="history-empty">还没有记录哦</div>}
          >
            <ol class="history-list">
              <For each={ui()!.eventLabels}>
                {(label, i) => <li classList={{ latest: i() === ui()!.eventLabels.length - 1 }}>{label}</li>}
              </For>
            </ol>
          </Show>
        </div>
      </aside>

      <main class="stage">
        <canvas ref={canvasRef} class="babylon-canvas" touch-action="none"></canvas>

        <header class="topbar">
          <Show when={mode() === "build"}>
            <button class="tool" onClick={() => controller.enterFold()} disabled={(ui()?.tileCount ?? 0) < 2}>
              📐 立起来
            </button>
            <button class="tool" onClick={() => controller.undo()} disabled={!ui()?.historyCount}>
              ↩️ 撤销
            </button>
            <button
              class="tool danger"
              onClick={() => controller.deleteSelected()}
              disabled={!ui()?.selectedId}
            >
              🗑️ 拿走
            </button>
            <button class="tool" onClick={startReplay} disabled={!ui()?.historyCount}>
              ⏪ 回放
            </button>
            <button class="tool" onClick={doExport} disabled={!ui()?.tileCount}>
              🖼️ 搭法卡
            </button>
            <button class="tool" onClick={() => controller.clearAll()} disabled={!ui()?.tileCount}>
              ♻️ 清空
            </button>
          </Show>

          <Show when={mode() === "fold"}>
            <div class="fold-hud">
              当前折角：<b>{ui()?.foldAngleDeg ?? 0}°</b>
              <span class="fold-limit">（超过 120° 会停住）</span>
            </div>
            <button class="tool" onClick={() => controller.exitFold()}>🧱 回到平铺</button>
            <button class="tool" onClick={doExport}>
              🖼️ 搭法卡
            </button>
          </Show>

          <Show when={mode() === "replay"}>
            <button class="tool" onClick={() => replay.stepBackward()}>⏮ 上一步</button>
            <button class="tool" onClick={() => replay.stepForward()}>下一步 ⏭</button>
            <Show
              when={!ui()?.replayPlaying}
              fallback={
                <button class="tool primary" onClick={() => replay.pause()}>⏸ 暂停</button>
              }
            >
              <button class="tool primary" onClick={() => replay.playForward()}>▶ 正放</button>
              <button class="tool primary" onClick={() => replay.playBackward()}>◀ 倒放</button>
            </Show>
            <button class="tool" onClick={() => replay.exit()}>✅ 退出回放</button>
          </Show>
        </header>

        <Show when={ui()?.mode === "replay"}>
          <div class="replay-banner">
            回放中 {ui()!.replayIndex} / {ui()!.replayCount} 步
          </div>
        </Show>

        <div class="toast">{ui()?.toast}</div>

        <div class="hint">
          👆 拖动拼搭 · 橙色小球转 15° · 双指旋转看背面 · 双击回平铺 · 拖动彩球移动灯光
        </div>
      </main>
    </div>
  );
}
