import { store } from './store.ts';
import type { Pose } from './types.ts';

interface Snapshot {
  poses: Record<string, Pose>;
  label: string;
}

const stack: Snapshot[] = [];
const MAX = 60;

export function pushPoses(label = '位姿变更') {
  const s = store.getState();
  const poses: Record<string, Pose> = {};
  for (const id of s.order) {
    const inst = s.instances[id];
    if (inst) poses[id] = { position: [...inst.pose.position], rotation: [...inst.pose.rotation] };
  }
  stack.push({ poses, label });
  if (stack.length > MAX) stack.shift();
  notify();
}

export function undoPoses(): boolean {
  const snap = stack.pop();
  notify();
  if (!snap) return false;
  const s = store.getState();
  const instances = { ...s.instances };
  for (const [id, pose] of Object.entries(snap.poses)) {
    if (instances[id]) instances[id] = { ...instances[id], pose };
  }
  store.setState({ instances, problems: {} });
  return true;
}

export function undoDepth() {
  return stack.length;
}

export function clearHistory() {
  stack.length = 0;
  notify();
}

const listeners = new Set<(n: number) => void>();
function notify() {
  for (const l of listeners) l(stack.length);
}

export function subscribeHistory(fn: (n: number) => void) {
  listeners.add(fn);
  fn(stack.length);
  return () => listeners.delete(fn);
}
