import { Color3 } from "@babylonjs/core/Maths/math";
import {
  findSnap,
  overlapsAny,
  quantizeAngle,
  sharedEdge,
  dist,
  angleOf,
  type Pose,
  type ShapeKind,
  type V2,
} from "./geometry";
import { createTile, createGhost, ghostSetPose, type TileVisual, type GhostVisual } from "./tiles";
import { buildFold, releaseFold, setHingeAngle, MAX_FOLD, type TileState, type FoldState } from "./fold";
import { History, snapshotAt, kindName, type BuildEvent } from "./history";
import { TEMPLATES, matchesStep, type Template } from "./templates";
import { makeTween, type SceneCtx } from "./scene";

export type AppMode = "build" | "fold" | "replay";
type DragKind = "tile" | "rotate" | "light" | "hinge" | null;

export interface UIState {
  mode: AppMode;
  selectedId: string | null;
  templateId: string | null;
  templateStep: number;
  templateNextKind: ShapeKind | null;
  historyCount: number;
  replayIndex: number;
  replayCount: number;
  replayPlaying: boolean;
  foldAngleDeg: number | null;
  toast: string;
  tileCount: number;
  eventLabels: string[];
}

const CYAN = new Color3(0.2, 0.95, 0.85);
const YELLOW = new Color3(1.0, 0.82, 0.1);
const GREEN = new Color3(0.35, 1.0, 0.45);
const LIFT_Y = 0.55;
const TAP_MOVE_LIMIT = 12; // 像素
const TABLE_RADIUS = 11.5;

interface Attachment {
  otherId: string;
  myEdge: number;
  theirEdge: number;
}

export class Controller {
  private state: UIState = {
    mode: "build",
    selectedId: null,
    templateId: null,
    templateStep: 0,
    templateNextKind: null,
    historyCount: 0,
    replayIndex: 0,
    replayCount: 0,
    replayPlaying: false,
    foldAngleDeg: null,
    toast: "把左边的磁力片拖到台面上吧！",
    tileCount: 0,
    eventLabels: [],
  };
  private listeners = new Set<() => void>();
  private idCounter = 0;

  tiles = new Map<string, TileState>();
  history = new History();
  private ctx: SceneCtx;
  private fold: FoldState | null = null;
  private template: Template | null = null;
  private ghost: GhostVisual | null = null;

  private drag: DragKind = null;
  private dragTileId: string | null = null;
  private dragFromLibrary = false;
  private pointerStart = { x: 0, y: 0 };
  private startPose: Pose | null = null;
  private lastGround: V2 | null = null;
  private startAttachments: Attachment[] = [];
  private snapHint: { id: string; edges: [number, number] } | null = null;
  private lightIndex = -1;
  private hingeStartAngle = 0;
  private hingeStartY = 0;
  private lastTapTime = 0;
  private lastTapPos = { x: 0, y: 0 };
  private renderObserver: { remove: () => void };
  private warnIds = new Set<string>();
  private flashTimers: number[] = [];

  constructor(ctx: SceneCtx) {
    this.ctx = ctx;
    const obs = ctx.scene.onBeforeRenderObservable.add(() => this.frame());
    this.renderObserver = { remove: () => ctx.scene.onBeforeRenderObservable.remove(obs) };

    const c = ctx.canvas;
    c.addEventListener("pointerdown", this.onPointerDown);
    c.addEventListener("pointermove", this.onPointerMove);
    c.addEventListener("pointerup", this.onPointerUp);
    c.addEventListener("pointercancel", this.onPointerUp);
  }


  private safeCapture(pointerId: number) {
    try {
      this.ctx.canvas.setPointerCapture(pointerId);
    } catch {
      // 合成事件或指针已释放时忽略
    }
  }

  // ---------------- 状态订阅 ----------------
  getState(): UIState {
    return this.state;
  }
  subscribe(l: () => void): () => void {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
  /** 同步到给定快照（撤销/回放通用） */
  patch(p: Partial<UIState>) {
    this.state = { ...this.state, ...p };
    this.listeners.forEach((l) => l());
  }
  private toast(msg: string) {
    this.patch({ toast: msg });
  }
  private refreshHistory() {
    this.patch({
      historyCount: this.history.length,
      eventLabels: this.history.events.slice(-8).map((e) => this.history.labelOf(e)),
      tileCount: this.tiles.size,
    });
  }

  // ---------------- 片体管理 ----------------
  private newId(): string {
    return `tile-${this.idCounter++}`;
  }

  private addTile(id: string, kind: ShapeKind, pose: Pose, animate = false): TileState {
    const visual = createTile(this.ctx, id, kind);
    visual.setPose(pose, animate ? LIFT_Y : 0);
    const st: TileState = { id, kind, pose, visual };
    this.tiles.set(id, st);
    if (animate) {
      makeTween(
        this.ctx,
        0.3,
        (k) => visual.setPose(pose, LIFT_Y * (1 - k)),
        () => visual.setPose(pose, 0)
      );
    }
    return st;
  }

  private removeTile(id: string) {
    const t = this.tiles.get(id);
    if (!t) return;
    t.visual.dispose();
    this.tiles.delete(id);
  }

  /** 同步到给定快照（撤销/回放通用） */
  syncSnapshot(snap: { tiles: { id: string; kind: ShapeKind; pose: Pose }[] }, animate = true) {
    const want = new Map(snap.tiles.map((t) => [t.id, t]));
    // 多余的删掉
    for (const id of [...this.tiles.keys()]) {
      if (!want.has(id)) this.removeTile(id);
    }
    for (const w of want.values()) {
      const cur = this.tiles.get(w.id);
      if (!cur) {
        this.addTile(w.id, w.kind, w.pose, animate);
      } else if (cur.kind === w.kind) {
        if (animate) {
          const from = { ...cur.pose };
          makeTween(this.ctx, 0.35, (k) => {
            cur.visual.setPose({
              p: {
                x: from.p.x + (w.pose.p.x - from.p.x) * k,
                y: from.p.y + (w.pose.p.y - from.p.y) * k,
              },
              r: from.r + (w.pose.r - from.r) * k,
            });
          }, () => {
            cur.pose = w.pose;
            cur.visual.setPose(w.pose);
          });
        } else {
          cur.pose = w.pose;
          cur.visual.setPose(w.pose);
        }
      }
    }
    this.clearHighlights();
    this.patch({ selectedId: null, tileCount: this.tiles.size });
  }

  // ---------------- 模板 ----------------
  setTemplate(id: string | null) {
    this.template = id ? TEMPLATES.find((t) => t.id === id) ?? null : null;
    this.ghost?.dispose();
    this.ghost = null;
    if (this.template) {
      this.toast(`跟着「${this.template.name}」一起拼吧！`);
      this.patch({ templateId: id, templateStep: 0 });
      this.showGhostStep(0);
    } else {
      this.patch({ templateId: null, templateStep: 0, templateNextKind: null });
    }
  }

  private showGhostStep(stepIdx: number) {
    this.ghost?.dispose();
    this.ghost = null;
    if (!this.template || stepIdx >= this.template.steps.length) {
      this.patch({ templateNextKind: null });
      return;
    }
    const step = this.template.steps[stepIdx];
    this.ghost = createGhost(this.ctx, step.kind);
    ghostSetPose(this.ghost, step.pose);
    this.patch({ templateNextKind: step.kind });
  }

  private checkTemplateProgress(kind: ShapeKind, pose: Pose) {
    if (!this.template) return;
    const step = this.template.steps[this.state.templateStep];
    if (step && matchesStep(step, kind, pose)) {
      const next = this.state.templateStep + 1;
      this.patch({ templateStep: next });
      this.showGhostStep(next);
      if (next >= this.template.steps.length) {
        this.toast(`太棒了！「${this.template.name}」拼完啦 🎉`);
        this.template = null;
        this.patch({ templateId: null });
      } else {
        this.toast(`好棒！下一步：${kindName(this.template.steps[next].kind)}`);
      }
    }
  }

  // ---------------- 指针交互 ----------------
  private onPointerDown = (ev: PointerEvent) => {
    if (this.state.mode === "replay") return;
    const mesh = this.ctx.pickMesh(ev.clientX, ev.clientY);
    const meta = mesh?.metadata as { kind?: string; tileId?: string; index?: number } | undefined;

    // 双击检测
    const now = performance.now();
    if (
      now - this.lastTapTime < 350 &&
      Math.hypot(ev.clientX - this.lastTapPos.x, ev.clientY - this.lastTapPos.y) < 30
    ) {
      this.handleDoubleTap();
      this.lastTapTime = 0;
      return;
    }
    this.lastTapTime = now;
    this.lastTapPos = { x: ev.clientX, y: ev.clientY };

    if (!mesh) {
      // 点空白：取消选中（折叠/平移交给相机）
      if (this.state.mode === "build") this.select(null);
      return;
    }

    if (meta?.kind === "lightHandle") {
      this.drag = "light";
      this.lightIndex = meta.index!;
      this.ctx.camera.detachControl();
      this.safeCapture(ev.pointerId);
      return;
    }

    if (meta?.kind === "rotateHandle" && this.state.mode === "build") {
      const id = meta.tileId!;
      this.drag = "rotate";
      this.dragTileId = id;
      this.startPose = { ...this.tiles.get(id)!.pose };
      this.pointerStart = { x: ev.clientX, y: ev.clientY };
      this.ctx.camera.detachControl();
      this.safeCapture(ev.pointerId);
      return;
    }

    if (meta?.kind === "tile") {
      const id = meta.tileId!;
      if (this.state.mode === "fold" && this.fold) {
        const node = this.fold.nodes.get(id);
        if (node && node.parent) {
          this.drag = "hinge";
          this.dragTileId = id;
          this.hingeStartAngle = node.angle;
          this.hingeStartY = ev.clientY;
          this.ctx.camera.detachControl();
          this.safeCapture(ev.pointerId);
        }
        return;
      }
      if (this.state.mode === "build") this.beginTileDrag(id, ev);
    }
  };

  private beginTileDrag(id: string, ev: PointerEvent) {
    const t = this.tiles.get(id)!;
    this.drag = "tile";
    this.dragTileId = id;
    this.dragFromLibrary = false;
    this.startPose = { ...t.pose };
    this.pointerStart = { x: ev.clientX, y: ev.clientY };
    this.lastGround = this.ctx.screenToGround(ev.clientX, ev.clientY);
    this.startAttachments = this.computeAttachments(id);
    this.select(id);
    t.visual.setPose(t.pose, LIFT_Y);
    this.ctx.camera.detachControl();
    this.safeCapture(ev.pointerId);
  }

  /** 从左侧片库开始拖拽（DOM 指针事件转入） */
  beginLibraryDrag(kind: ShapeKind, ev: PointerEvent) {
    if (this.state.mode !== "build") return;
    const id = this.newId();
    const g = this.ctx.screenToGround(ev.clientX, ev.clientY) ?? { x: 0, y: 0 };
    const pose: Pose = { p: g, r: 0 };
    this.addTile(id, kind, pose);
    this.drag = "tile";
    this.dragTileId = id;
    this.dragFromLibrary = true;
    this.startPose = { p: { ...g }, r: 0 };
    this.pointerStart = { x: ev.clientX, y: ev.clientY };
    this.lastGround = g;
    this.startAttachments = [];
    this.select(id);
    this.tiles.get(id)!.visual.setPose(pose, LIFT_Y);
    this.ctx.camera.detachControl();

    const move = (e: PointerEvent) => this.onPointerMove(e);
    const up = (e: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      this.onPointerUp(e);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  }

  private onPointerMove = (ev: PointerEvent) => {
    if (!this.drag) return;

    if (this.drag === "light") {
      const g = this.ctx.screenToGround(ev.clientX, ev.clientY);
      if (g) this.ctx.moveLight(this.lightIndex, this.clampToTable(g));
      return;
    }

    if (this.drag === "hinge" && this.fold) {
      const node = this.fold.nodes.get(this.dragTileId!)!;
      const delta = (this.hingeStartY - ev.clientY) * 0.011;
      const ang = setHingeAngle(node, this.hingeStartAngle + delta);
      this.patch({ foldAngleDeg: Math.round((ang * 180) / Math.PI) });
      return;
    }

    if (this.drag === "rotate") {
      const t = this.tiles.get(this.dragTileId!)!;
      const g = this.ctx.screenToGround(ev.clientX, ev.clientY);
      if (!g) return;
      const ang = angleOf({ x: g.x - t.pose.p.x, y: g.y - t.pose.p.y });
      const r = quantizeAngle(ang);
      const candidate: Pose = { p: t.pose.p, r };
      if (overlapsAny(t.kind, candidate, this.otherTiles(t.id))) {
        t.visual.setWarn(true);
        this.warnIds.add(t.id);
        return;
      }
      t.visual.setWarn(false);
      this.warnIds.delete(t.id);
      t.pose = candidate;
      t.visual.setPose(candidate, LIFT_Y);
      this.updateDetachHighlight(t.id);
      return;
    }

    if (this.drag === "tile") {
      const t = this.tiles.get(this.dragTileId!)!;
      const g = this.ctx.screenToGround(ev.clientX, ev.clientY);
      if (!g) return;
      this.lastGround = g;
      const pose: Pose = { p: this.clampToTable(g), r: t.pose.r };
      const others = this.otherTiles(t.id);
      const snap = findSnap(t.kind, pose, others);

      if (snap) {
        t.pose = snap.pose;
        t.visual.setPose(snap.pose, LIFT_Y);
        this.snapHint = { id: snap.otherId, edges: snap.edges };
        this.showSnapHighlight(t.id, snap.otherId, snap.edges);
        t.visual.setWarn(false);
        this.warnIds.delete(t.id);
      } else {
        this.snapHint = null;
        t.pose = pose;
        t.visual.setPose(pose, LIFT_Y);
        const hit = overlapsAny(t.kind, pose, others);
        t.visual.setWarn(hit);
        if (hit) this.warnIds.add(t.id);
        else this.warnIds.delete(t.id);
        this.updateDetachHighlight(t.id);
      }
    }
  };

  private onPointerUp = (ev: PointerEvent) => {
    if (!this.drag) return;
    const kind = this.drag;
    const id = this.dragTileId;
    this.ctx.camera.attachControl(this.ctx.canvas, true);
    this.drag = null;
    this.dragTileId = null;
    this.lightIndex = -1;

    if (kind === "light" || kind === "hinge") {
      if (kind === "hinge") {
        // 停在当前角度，HUD 保留
      }
      return;
    }

    if (kind === "rotate") {
      const t = this.tiles.get(id!)!;
      t.visual.setWarn(false);
      this.warnIds.delete(t.id);
      t.visual.setPose(t.pose, 0);
      if (this.startPose && (this.startPose.r !== t.pose.r || dist(this.startPose.p, t.pose.p) > 0.01)) {
        this.history.move(t.id, t.kind, this.startPose, t.pose);
        this.afterCommit(t);
      }
      return;
    }

    if (kind === "tile") {
      const t = this.tiles.get(id!);
      if (!t) return;
      const others = this.otherTiles(t.id);
      const overlapping = overlapsAny(t.kind, t.pose, others);

      // 片库拖出且无效 -> 丢弃
      if (this.dragFromLibrary && (overlapping || !this.lastGround)) {
        t.visual.dispose();
        this.tiles.delete(t.id);
        this.dragFromLibrary = false;
        this.clearHighlights();
        this.patch({ selectedId: null, tileCount: this.tiles.size });
        this.toast("这里放不下，换个位置试试～");
        return;
      }

      if (overlapping && this.startPose) {
        // 弹回原位
        const back = this.startPose;
        makeTween(this.ctx, 0.25, (k) => {
          t.visual.setPose({
            p: {
              x: t.pose.p.x + (back.p.x - t.pose.p.x) * k,
              y: t.pose.p.y + (back.p.y - t.pose.p.y) * k,
            },
            r: t.pose.r + (back.r - t.pose.r) * k,
          }, LIFT_Y * (1 - k));
        }, () => {
          t.pose = back;
          t.visual.setWarn(false);
          t.visual.setPose(back);
        });
        this.warnIds.delete(t.id);
        this.dragFromLibrary = false;
        return;
      }

      t.visual.setWarn(false);
      this.warnIds.delete(t.id);
      t.visual.setPose(t.pose, 0);

      if (this.dragFromLibrary) {
        this.history.add(t.id, t.kind, t.pose);
        this.checkTemplateProgress(t.kind, t.pose);
        this.toast("吸住啦！磁力片贴好了 ✨");
      } else if (this.startPose && (dist(this.startPose.p, t.pose.p) > 0.05 || this.startPose.r !== t.pose.r)) {
        this.history.move(t.id, t.kind, this.startPose, t.pose);
        this.checkTemplateProgress(t.kind, t.pose);
      }
      this.dragFromLibrary = false;

      // 吸附绿色闪烁 / 断开黄色提示
      if (this.snapHint) {
        this.flashEdges(t.id, this.snapHint.id, this.snapHint.edges, GREEN);
        this.snapHint = null;
      } else if (this.startAttachments.length) {
        this.flashDetachYellow(t.id);
      }
      this.startAttachments = [];
      this.afterCommit(t);
    }
    void ev;
  };

  private afterCommit(t: TileState) {
    this.refreshHistory();
    this.select(t.id);
  }

  // ---------------- 高亮 ----------------
  private otherTiles(excludeId: string) {
    return [...this.tiles.values()].filter((x) => x.id !== excludeId).map((x) => ({ id: x.id, kind: x.kind, pose: x.pose }));
  }

  private computeAttachments(id: string): Attachment[] {
    const t = this.tiles.get(id)!;
    const out: Attachment[] = [];
    for (const o of this.tiles.values()) {
      if (o.id === id) continue;
      const se = sharedEdge(t.kind, t.pose, o.kind, o.pose);
      if (se) out.push({ otherId: o.id, myEdge: se[0], theirEdge: se[1] });
    }
    return out;
  }

  private showSnapHighlight(myId: string, otherId: string, edges: [number, number]) {
    this.clearHighlights();
    this.tiles.get(myId)?.visual.setHighlight([edges[0]], CYAN);
    this.tiles.get(otherId)?.visual.setHighlight([edges[1]], CYAN);
  }

  private updateDetachHighlight(id: string) {
    if (this.snapHint) return;
    this.clearHighlights();
    const t = this.tiles.get(id);
    if (!t) return;
    for (const a of this.startAttachments) {
      t.visual.setHighlight([a.myEdge], YELLOW);
      this.tiles.get(a.otherId)?.visual.setHighlight([a.theirEdge], YELLOW);
    }
  }

  private flashEdges(myId: string, otherId: string, edges: [number, number], color: Color3) {
    this.clearHighlights();
    this.tiles.get(myId)?.visual.setHighlight([edges[0]], color);
    this.tiles.get(otherId)?.visual.setHighlight([edges[1]], color);
    const timer = window.setTimeout(() => this.clearHighlights(), 700);
    this.flashTimers.push(timer);
  }

  private flashDetachYellow(id: string) {
    const t = this.tiles.get(id);
    if (!t) return;
    for (const a of this.startAttachments) {
      t.visual.setHighlight([a.myEdge], YELLOW);
      this.tiles.get(a.otherId)?.visual.setHighlight([a.theirEdge], YELLOW);
    }
    const timer = window.setTimeout(() => this.clearHighlights(), 1100);
    this.flashTimers.push(timer);
  }

  clearHighlights() {
    for (const t of this.tiles.values()) t.visual.setHighlight([], CYAN);
  }

  // ---------------- 选择 / 删除 / 撤销 ----------------
  select(id: string | null) {
    if (this.state.mode !== "build") id = null;
    for (const t of this.tiles.values()) t.visual.setSelected(t.id === id);
    this.patch({ selectedId: id });
  }

  deleteSelected() {
    const id = this.state.selectedId;
    if (!id || this.state.mode !== "build") return;
    const t = this.tiles.get(id);
    if (!t) return;
    this.history.delete(id, t.kind);
    this.removeTile(id);
    this.patch({ selectedId: null });
    this.refreshHistory();
    this.toast("拿走了一片磁力片");
  }

  undo() {
    if (this.state.mode !== "build" || !this.history.length) return;
    this.history.pop();
    const snap = snapshotAt(this.history.events, this.history.length ? this.history.events[this.history.length - 1].seq : -1);
    this.syncSnapshot(snap, true);
    this.refreshHistory();
    this.toast("倒回一步");
  }

  clearAll() {
    if (this.state.mode === "fold") this.exitFold();
    for (const id of [...this.tiles.keys()]) this.removeTile(id);
    this.history.clear();
    this.select(null);
    this.clearHighlights();
    this.refreshHistory();
    this.setTemplate(null);
    this.toast("台面清空啦");
  }

  // ---------------- 折叠 ----------------
  canFold(): boolean {
    if (this.tiles.size < 2) return false;
    const list = [...this.tiles.values()];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (sharedEdge(list[i].kind, list[i].pose, list[j].kind, list[j].pose)) return true;
      }
    }
    return false;
  }

  enterFold() {
    if (this.state.mode !== "build" || !this.canFold()) {
      this.toast("先把两片磁力片贴在一起，才能立起来哦");
      return;
    }
    const rootId = this.state.selectedId ?? this.tiles.keys().next().value!;
    const fold = buildFold(this.ctx, [...this.tiles.values()], rootId);
    if (!fold) return;
    this.fold = fold;
    this.select(null);
    this.clearHighlights();
    this.ctx.setCameraFold(true);
    this.patch({ mode: "fold", foldAngleDeg: 0 });
    this.toast("上下拖动磁力片，把它折起来！");
  }

  exitFold() {
    if (!this.fold) return;
    releaseFold(this.fold, [...this.tiles.values()]);
    this.fold = null;
    this.ctx.setCameraFlat(true);
    this.patch({ mode: "build", foldAngleDeg: null });
  }

  private handleDoubleTap() {
    if (this.state.mode === "fold") {
      this.exitFold();
      this.toast("回到平铺视角");
    } else if (this.state.mode === "build") {
      this.ctx.setCameraFlat(true);
      this.toast("回到平铺视角");
    }
  }

  // ---------------- 每帧：抖动 + 幽灵呼吸 ----------------
  private frame() {
    const time = performance.now() / 1000;
    for (const id of this.warnIds) {
      const t = this.tiles.get(id);
      if (!t) continue;
      const dx = Math.sin(time * 32) * 0.09;
      t.visual.root.position.x = t.pose.p.x + dx;
    }
    if (this.ghost) {
      const s = 1 + Math.sin(time * 4) * 0.025;
      this.ghost.root.scaling.set(s, 1, s);
    }
  }

  private clampToTable(g: V2): V2 {
    const d = Math.hypot(g.x, g.y);
    if (d <= TABLE_RADIUS) return g;
    return { x: (g.x / d) * TABLE_RADIUS, y: (g.y / d) * TABLE_RADIUS };
  }

  // ---------------- 导出 ----------------
  exportCard(title: string) {
    return this.ctx.canvas;
  }

  getEvents(): BuildEvent[] {
    return this.history.events;
  }

  getTemplateName(): string | null {
    return this.template?.name ?? null;
  }

  dispose() {
    const c = this.ctx.canvas;
    c.removeEventListener("pointerdown", this.onPointerDown);
    c.removeEventListener("pointermove", this.onPointerMove);
    c.removeEventListener("pointerup", this.onPointerUp);
    c.removeEventListener("pointercancel", this.onPointerUp);
    this.flashTimers.forEach((t) => clearTimeout(t));
    this.renderObserver.remove();
    this.ghost?.dispose();
    for (const id of [...this.tiles.keys()]) this.removeTile(id);
  }
}
