import type { Pose, ShapeKind } from "./geometry";
import { History, snapshotAt, type BuildEvent } from "./history";
import { makeTween, type SceneCtx } from "./scene";
import type { Controller } from "./controller";

/**
 * 回放控制器：基于历史事件流，在任意 seq 位置重建台面快照。
 * 倒放时 seq 递减，孩子会看到自己"逆向拼搭"的全过程。
 */
export class ReplayPlayer {
  private history: History;
  private controller: Controller;
  private ctx: SceneCtx;
  /** 当前已呈现到的最后事件 seq；-1 表示空台面 */
  private cursor = -1;
  private timer: number | null = null;
  private direction: 1 | -1 = 1;
  playing = false;

  constructor(controller: Controller, ctx: SceneCtx) {
    this.controller = controller;
    this.ctx = ctx;
    this.history = controller.history;
  }

  get count(): number {
    return this.history.length;
  }
  get index(): number {
    return this.cursor;
  }

  start() {
    this.cursor = -1;
    this.controller.syncSnapshot(snapshotAt(this.history.events, -1), false);
    this.controller.patch({
      mode: "replay",
      replayIndex: 0,
      replayCount: this.count,
      replayPlaying: false,
      selectedId: null,
    });
  }

  private applyCursor() {
    const snap = snapshotAt(this.history.events, this.cursor);
    this.controller.syncSnapshot(snap, true);
    const ev = this.history.events.find((e) => e.seq === this.cursor);
    this.controller.patch({
      replayIndex: this.cursor + 1,
      replayCount: this.count,
      toast: ev ? this.history.labelOf(ev) : "空台面",
    });
  }

  playForward() {
    this.direction = 1;
    this.run();
  }

  playBackward() {
    this.direction = -1;
    this.run();
  }

  private run() {
    this.stopTimer();
    this.playing = true;
    this.controller.patch({ replayPlaying: true });
    const stepMs = 650;
    this.timer = window.setInterval(() => {
      let next: number;
      if (this.direction === 1) {
        const nextEv = this.history.events.find((e) => e.seq > this.cursor);
        if (!nextEv) {
          this.pause();
          return;
        }
        next = nextEv.seq;
      } else {
        const prevEv = [...this.history.events].reverse().find((e) => e.seq <= this.cursor);
        if (!prevEv) {
          this.pause();
          return;
        }
        // 倒放：跳过到前一个事件 seq
        const idx = this.history.events.indexOf(prevEv);
        next = idx === 0 ? -1 : this.history.events[idx - 1].seq;
      }
      this.cursor = next;
      this.applyCursor();
    }, stepMs);
  }

  pause() {
    this.stopTimer();
    this.playing = false;
    this.controller.patch({ replayPlaying: false });
  }

  stepForward() {
    this.pause();
    const next = this.history.events.find((e) => e.seq > this.cursor);
    if (next) {
      this.cursor = next.seq;
      this.applyCursor();
    }
  }

  stepBackward() {
    this.pause();
    const idx = this.history.events.findIndex((e) => e.seq === this.cursor);
    if (idx <= 0) {
      this.cursor = -1;
    } else {
      this.cursor = this.history.events[idx - 1].seq;
    }
    this.applyCursor();
  }

  private stopTimer() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /** 退出回放，恢复最终作品 */
  exit() {
    this.pause();
    const final = snapshotAt(
      this.history.events,
      this.history.length ? this.history.events[this.history.length - 1].seq : -1
    );
    this.controller.syncSnapshot(final, false);
    this.controller.patch({ mode: "build", replayPlaying: false, replayIndex: 0 });
  }

  dispose() {
    this.stopTimer();
  }
}

export type { BuildEvent, Pose, ShapeKind };
