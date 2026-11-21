import type { Pose, ShapeKind } from "./geometry";

export interface BuildEvent {
  seq: number;
  type: "add" | "move" | "delete";
  tileId: string;
  kind: ShapeKind;
  pose?: Pose; // add/move 后的位姿
  prevPose?: Pose; // move 前的位姿
}

export interface Snapshot {
  tiles: { id: string; kind: ShapeKind; pose: Pose }[];
}

/** 由事件流计算某一步之后的台面快照（seq 为 -1 表示空台面） */
export function snapshotAt(events: BuildEvent[], uptoSeq: number): Snapshot {
  const map = new Map<string, { id: string; kind: ShapeKind; pose: Pose }>();
  for (const e of events) {
    if (e.seq > uptoSeq) break;
    if (e.type === "add") {
      map.set(e.tileId, { id: e.tileId, kind: e.kind, pose: e.pose! });
    } else if (e.type === "move") {
      const t = map.get(e.tileId);
      if (t) t.pose = e.pose!;
    } else if (e.type === "delete") {
      map.delete(e.tileId);
    }
  }
  return { tiles: [...map.values()] };
}

/** 最终快照 */
export function finalSnapshot(events: BuildEvent[]): Snapshot {
  return snapshotAt(events, events.length ? events[events.length - 1].seq : -1);
}

export class History {
  events: BuildEvent[] = [];
  private seq = 0;

  add(tileId: string, kind: ShapeKind, pose: Pose): BuildEvent {
    const ev: BuildEvent = { seq: this.seq++, type: "add", tileId, kind, pose };
    this.events.push(ev);
    return ev;
  }

  move(tileId: string, kind: ShapeKind, prev: Pose, next: Pose): BuildEvent {
    const ev: BuildEvent = {
      seq: this.seq++,
      type: "move",
      tileId,
      kind,
      pose: next,
      prevPose: prev,
    };
    this.events.push(ev);
    return ev;
  }

  delete(tileId: string, kind: ShapeKind): BuildEvent {
    const ev: BuildEvent = { seq: this.seq++, type: "delete", tileId, kind };
    this.events.push(ev);
    return ev;
  }

  /** 撤销最后一个事件，返回被撤销的事件 */
  pop(): BuildEvent | undefined {
    return this.events.pop();
  }

  get length(): number {
    return this.events.length;
  }

  clear(): void {
    this.events = [];
    this.seq = 0;
  }

  labelOf(ev: BuildEvent): string {
    if (ev.type === "add") return `放上${kindName(ev.kind)}`;
    if (ev.type === "move") return `移动${kindName(ev.kind)}`;
    return `拿走${kindName(ev.kind)}`;
  }
}

export function kindName(k: ShapeKind): string {
  return { square: "正方形", triangle: "三角形", hexagon: "六边形", sector: "扇形" }[k];
}
