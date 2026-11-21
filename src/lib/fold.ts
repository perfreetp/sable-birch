import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Vector3, Quaternion, Matrix } from "@babylonjs/core/Maths/math";
import {
  SHAPES,
  sharedEdge,
  sub,
  angleOf,
  localToWorld,
  dot,
  type ShapeKind,
  type Pose,
  type V2,
} from "./geometry";
import type { TileVisual } from "./tiles";
import type { SceneCtx } from "./scene";

export interface TileState {
  id: string;
  kind: ShapeKind;
  pose: Pose;
  visual: TileVisual;
}

export interface HingeNode {
  tileId: string;
  parent: string | null;
  edgeInTile: number; // 该片上与父片贴合的边索引
  edgeInParent: number;
  hinge: TransformNode; // 位于公共边中点，局部 X 轴沿公共边
  /** 折叠角度（0=平铺，上限 120°） */
  angle: number;
  /** 抬升方向符号：保证正角度总是把片向上折 */
  liftSign: number;
}

export interface FoldState {
  rootId: string;
  nodes: Map<string, HingeNode>;
  foldRoot: TransformNode;
}

export const MAX_FOLD = (120 * Math.PI) / 180;

interface FlatTile {
  id: string;
  kind: ShapeKind;
  pose: Pose;
}

function edgeMid(kind: ShapeKind, edgeIdx: number, pose: Pose): V2 {
  const e = SHAPES[kind].edges[edgeIdx];
  const a = localToWorld(e.a, pose);
  const b = localToWorld(e.b, pose);
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function edgeDir(kind: ShapeKind, edgeIdx: number, pose: Pose): V2 {
  const e = SHAPES[kind].edges[edgeIdx];
  const a = localToWorld(e.a, pose);
  const b = localToWorld(e.b, pose);
  return sub(b, a);
}

/** 从世界矩阵提取绕 Y 轴偏航角 */
function yawFromWorld(m: Matrix): number {
  const q = Quaternion.FromRotationMatrix(m);
  const e = q.toEulerAngles();
  return e.y;
}

/** BFS 沿共边关系构建铰链树，根为被选中的片 */
export function buildFold(ctx: SceneCtx, tiles: TileState[], rootId: string): FoldState | null {
  const flat: FlatTile[] = tiles.map((t) => ({ id: t.id, kind: t.kind, pose: t.pose }));
  const byId = new Map(flat.map((t) => [t.id, t]));
  if (!byId.has(rootId)) return null;

  // 共边邻接表
  const adj = new Map<string, { id: string; edges: [number, number] }[]>();
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      const a = flat[i];
      const b = flat[j];
      const se = sharedEdge(a.kind, a.pose, b.kind, b.pose);
      if (!se) continue;
      if (!adj.has(a.id)) adj.set(a.id, []);
      if (!adj.has(b.id)) adj.set(b.id, []);
      adj.get(a.id)!.push({ id: b.id, edges: se });
      adj.get(b.id)!.push({ id: a.id, edges: [se[1], se[0]] });
    }
  }

  const foldRoot = new TransformNode(`foldRoot-${rootId}`, ctx.scene);
  const nodes = new Map<string, HingeNode>();
  const rootTile = byId.get(rootId)!;

  // 根铰链放在根片中心，朝向与根片一致
  const rootHinge = new TransformNode(`hinge-${rootId}`, ctx.scene);
  rootHinge.parent = foldRoot;
  rootHinge.position = new Vector3(rootTile.pose.p.x, 0, rootTile.pose.p.y);
  rootHinge.rotation = new Vector3(0, -rootTile.pose.r, 0);
  nodes.set(rootId, {
    tileId: rootId,
    parent: null,
    edgeInTile: -1,
    edgeInParent: -1,
    hinge: rootHinge,
    angle: 0,
    liftSign: 1,
  });

  const queue = [rootId];
  while (queue.length) {
    const curId = queue.shift()!;
    const cur = byId.get(curId)!;
    for (const nb of adj.get(curId) ?? []) {
      if (nodes.has(nb.id)) continue;
      const child = byId.get(nb.id)!;
      const mid2 = edgeMid(cur.kind, nb.edges[1], cur.pose);
      const dir2 = edgeDir(cur.kind, nb.edges[1], cur.pose);

      const hinge = new TransformNode(`hinge-${child.id}`, ctx.scene);
      const parentNode = nodes.get(curId)!;
      hinge.parent = parentNode.hinge;

      // 在父铰链当前世界系里定位铰链（此刻还没有任何折叠角）
      const parentInv = parentNode.hinge.getWorldMatrix().clone().invert();
      hinge.position = Vector3.TransformCoordinates(new Vector3(mid2.x, 0, mid2.y), parentInv);
      hinge.rotationQuaternion = null;
      hinge.rotation = new Vector3(0, -angleOf(dir2) - yawFromWorld(parentNode.hinge.getWorldMatrix()), 0);
      hinge.computeWorldMatrix(true);

      // 子片改挂铰链，保持原世界位姿
      const childVisual = tiles.find((t) => t.id === child.id)!.visual;
      const rootNode = childVisual.root;
      const hingeInv = hinge.getWorldMatrix().clone().invert();
      rootNode.parent = hinge;
      rootNode.position = Vector3.TransformCoordinates(
        new Vector3(child.pose.p.x, 0, child.pose.p.y),
        hingeInv
      );
      const localYaw = -child.pose.r - yawFromWorld(hinge.getWorldMatrix());
      rootNode.rotation = new Vector3(0, localYaw, 0);

      // 正折叠角必须把片向上抬：根据子片中心在铰链局部系中位于 +Z 还是 -Z 决定符号
      const centerLocal = Vector3.TransformCoordinates(
        new Vector3(child.pose.p.x, 0, child.pose.p.y),
        hinge.getWorldMatrix().clone().invert()
      );
      const liftSign = centerLocal.z >= 0 ? 1 : -1;

      nodes.set(child.id, {
        tileId: child.id,
        parent: curId,
        edgeInTile: nb.edges[0],
        edgeInParent: nb.edges[1],
        hinge,
        angle: 0,
        liftSign,
      });
      queue.push(child.id);
    }
  }

  // 根片挂入根铰链（局部归零即可，因为铰链位姿=根片位姿）
  const rootVisual = tiles.find((t) => t.id === rootId)!.visual;
  rootVisual.root.parent = rootHinge;
  rootVisual.root.position = Vector3.Zero();
  rootVisual.root.rotation = Vector3.Zero();

  return { rootId, nodes, foldRoot };
}

/** 调整某条铰链的折角（夹紧到 0~120°），返回实际角度 */
export function setHingeAngle(node: HingeNode, angle: number): number {
  const clamped = Math.max(0, Math.min(MAX_FOLD, angle));
  node.angle = clamped;
  // 局部 X 轴沿公共边，绕 X 旋转即折叠；用抬升符号保证向上折
  node.hinge.rotation.x = clamped * node.liftSign;
  return clamped;
}

/** 收起折叠树：所有片回到场景根并恢复平面位姿 */
export function releaseFold(state: FoldState, tiles: TileState[]): void {
  for (const t of tiles) {
    t.visual.root.parent = null;
    t.visual.setPose(t.pose, 0);
  }
  state.foldRoot.dispose();
}
