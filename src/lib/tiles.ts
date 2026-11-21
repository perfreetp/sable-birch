import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/polygonMesh";
import "@babylonjs/core/Meshes/mesh.vertexData";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
import {
  SHAPES,
  type Pose,
  type ShapeKind,
  type Edge,
  localToWorld,
  rotVec,
  R,
} from "./geometry";
import type { SceneCtx } from "./scene";

export interface TileVisual {
  id: string;
  kind: ShapeKind;
  root: TransformNode;
  parts: Mesh[]; // 主体网格（用于阴影/拾取）
  edgeTubes: Mesh[]; // 每条边一条辉光管
  handle: Mesh;
  handleRod: Mesh;
  frontMat: StandardMaterial;
  backMat: StandardMaterial;
  rimMat: StandardMaterial;
  /** 重叠告警时切换的红色材质 */
  warnMat: StandardMaterial;
  setPose: (pose: Pose, liftY?: number) => void;
  setWarn: (on: boolean) => void;
  setHighlight: (edgeIndices: number[], color: Color3) => void;
  setSelected: (on: boolean) => void;
  dispose: () => void;
}

const TILE_THICK = 0.16;

function toV3Path(verts: { x: number; y: number }[]): Vector3[] {
  return verts.map((p) => new Vector3(p.x, 0, p.y));
}

function c3(c: { r: number; g: number; b: number }, k = 1): Color3 {
  return new Color3(
    Math.min(1, c.r * k),
    Math.min(1, c.g * k),
    Math.min(1, c.b * k)
  );
}

export function createTile(ctx: SceneCtx, id: string, kind: ShapeKind): TileVisual {
  const scene = ctx.scene;
  const def = SHAPES[kind];
  const root = new TransformNode(`tile-${id}`, scene);

  // ---- 材质：半透明塑料，正反面异色 ----
  const frontMat = new StandardMaterial(`front-${id}`, scene);
  frontMat.diffuseColor = c3(def.front);
  frontMat.specularColor = new Color3(0.5, 0.5, 0.5);
  frontMat.specularPower = 96;
  frontMat.alpha = 0.72;
  frontMat.emissiveColor = c3(def.front, 0.12);

  const backMat = new StandardMaterial(`back-${id}`, scene);
  backMat.diffuseColor = c3(def.back);
  backMat.specularColor = new Color3(0.5, 0.5, 0.5);
  backMat.specularPower = 96;
  backMat.alpha = 0.72;
  backMat.emissiveColor = c3(def.back, 0.12);
  // 背面朝下也能看到
  backMat.backFaceCulling = false;

  const rimMat = new StandardMaterial(`rim-${id}`, scene);
  rimMat.diffuseColor = c3(def.front, 0.55);
  rimMat.specularColor = new Color3(0.4, 0.4, 0.4);
  rimMat.alpha = 0.9;

  const warnMat = new StandardMaterial(`warn-${id}`, scene);
  warnMat.diffuseColor = new Color3(1.0, 0.22, 0.22);
  warnMat.emissiveColor = new Color3(0.55, 0.05, 0.05);
  warnMat.alpha = 0.78;
  warnMat.backFaceCulling = false;

  const path = toV3Path(def.verts);

  // 侧壁（挤出）：沿局部 +Z 挤出，随后 -90° X 旋转让厚度落到 Y
  const rim = MeshBuilder.ExtrudePolygon(
    `rim-${id}`,
    { shape: path, depth: TILE_THICK, sideOrientation: Mesh.DOUBLESIDE },
    scene
  );
  rim.rotation.x = -Math.PI / 2;
  rim.position.y = TILE_THICK / 2;
  rim.material = rimMat;

  // 顶面（朝上 +Y）
  const top = MeshBuilder.CreatePolygon(
    `top-${id}`,
    { shape: path, sideOrientation: Mesh.DOUBLESIDE },
    scene
  );
  top.rotation.x = -Math.PI / 2;
  top.position.y = TILE_THICK + 0.002;
  top.material = frontMat;

  // 底面（朝下 -Y），用反向旋转并关闭背面剔除
  const bottom = MeshBuilder.CreatePolygon(
    `bottom-${id}`,
    { shape: path, sideOrientation: Mesh.DOUBLESIDE },
    scene
  );
  bottom.rotation.x = Math.PI / 2;
  bottom.position.y = -0.002;
  bottom.material = backMat;

  const parts: Mesh[] = [rim, top, bottom];
  for (const m of parts) {
    m.parent = root;
    m.metadata = { kind: "tile", tileId: id };
    m.isPickable = true;
    for (const sg of ctx.shadowGens) sg.addShadowCaster(m);
  }

  // ---- 每条边一根辉光管（默认隐藏）----
  const edgeTubes: Mesh[] = def.edges.map((e, idx) => {
    const pts = edgeTubePoints(e);
    const tube = MeshBuilder.CreateTube(
      `edge-${id}-${idx}`,
      { path: pts, radius: 0.055, tessellation: 8, updatable: false },
      scene
    );
    const mat = new StandardMaterial(`edgeMat-${id}-${idx}`, scene);
    mat.emissiveColor = new Color3(0.2, 0.95, 0.85);
    mat.diffuseColor = mat.emissiveColor;
    mat.alpha = 0.95;
    tube.material = mat;
    tube.parent = root;
    tube.isPickable = false;
    tube.setEnabled(false);
    return tube;
  });

  // ---- 旋转手柄 ----
  const handle = MeshBuilder.CreateSphere(`handle-${id}`, { diameter: 0.5, segments: 16 }, scene);
  const handleMat = new StandardMaterial(`handleMat-${id}`, scene);
  handleMat.emissiveColor = new Color3(1.0, 0.72, 0.2);
  handleMat.diffuseColor = handleMat.emissiveColor;
  handle.material = handleMat;
  handle.parent = root;
  handle.position.set(R * 1.55, TILE_THICK + 0.45, 0);
  handle.metadata = { kind: "rotateHandle", tileId: id };
  handle.isPickable = true;
  handle.setEnabled(false);

  const handleRod = MeshBuilder.CreateCylinder(
    `rod-${id}`,
    { height: R * 1.3, diameter: 0.07, tessellation: 8 },
    scene
  );
  const rodMat = new StandardMaterial(`rodMat-${id}`, scene);
  rodMat.emissiveColor = new Color3(1.0, 0.85, 0.45);
  rodMat.diffuseColor = rodMat.emissiveColor;
  handleRod.material = rodMat;
  handleRod.parent = root;
  handleRod.rotation.z = -Math.PI / 2;
  handleRod.position.set(R * 0.72, TILE_THICK + 0.45, 0);
  handleRod.isPickable = false;
  handleRod.setEnabled(false);

  const baseMats: (StandardMaterial | null)[] = [rimMat, frontMat, backMat];
  let warning = false;
  let selected = false;

  const visual: TileVisual = {
    id,
    kind,
    root,
    parts,
    edgeTubes,
    handle,
    handleRod,
    frontMat,
    backMat,
    rimMat,
    warnMat,
    setPose(pose, liftY = 0) {
      root.position.set(pose.p.x, liftY, pose.p.y);
      root.rotation.y = -pose.r;
    },
    setWarn(on) {
      if (on === warning) return;
      warning = on;
      parts.forEach((m, i) => {
        m.material = on ? warnMat : baseMats[i]!;
      });
    },
    setHighlight(edgeIndices, color) {
      edgeTubes.forEach((tube, i) => {
        const show = edgeIndices.includes(i);
        tube.setEnabled(show);
        if (show) {
          const mat = tube.material as StandardMaterial;
          mat.emissiveColor = color;
          mat.diffuseColor = color;
        }
      });
    },
    setSelected(on) {
      selected = on;
      handle.setEnabled(on);
      handleRod.setEnabled(on);
    },
    dispose() {
      [...edgeTubes, ...parts, handle, handleRod].forEach((m) => m.dispose());
      [frontMat, backMat, rimMat, warnMat, handleMat, rodMat].forEach((m) => m.dispose());
      root.dispose();
    },
  };
  void selected;
  return visual;
}

/** 边的 3D 路径（直边两点，弧边采样），高度略高于片体 */
function edgeTubePoints(e: Edge): Vector3[] {
  const y = TILE_THICK + 0.06;
  if (e.straight) {
    return [new Vector3(e.a.x, y, e.a.y), new Vector3(e.b.x, y, e.b.y)];
  }
  const c = e.arc!.center;
  const a0 = Math.atan2(e.b.y - c.y, e.b.x - c.x);
  const a1 = Math.atan2(e.a.y - c.y, e.a.x - c.x);
  const N = 18;
  const pts: Vector3[] = [];
  for (let i = 0; i <= N; i++) {
    const a = a0 + ((a1 - a0) * i) / N;
    pts.push(
      new Vector3(
        c.x + e.arc!.radius * Math.cos(a),
        y,
        c.y + e.arc!.radius * Math.sin(a)
      )
    );
  }
  return pts;
}

/** 旋转手柄在台面上的世界位置（供控制器判断手柄拖动的极角） */
export function handleWorldPos(v: TileVisual): { x: number; y: number } {
  const p = v.handle.getAbsolutePosition();
  return { x: p.x, y: p.z };
}

/** 极角旋转时，手柄方向上的参考点（片中心 + 偏移） */
export function handleDirection(pose: Pose): { x: number; y: number } {
  const d = rotVec({ x: 1, y: 0 }, pose.r);
  return { x: pose.p.x + d.x * R * 1.55, y: pose.p.y + d.y * R * 1.55 };
}

/** 模板幽灵片（不可拾取的半透明轮廓 + 黄色描边） */
export interface GhostVisual {
  root: TransformNode;
  dispose: () => void;
}

export function createGhost(ctx: SceneCtx, kind: ShapeKind): GhostVisual {
  const scene = ctx.scene;
  const def = SHAPES[kind];
  const root = new TransformNode(`ghost-${kind}-${Math.floor(performance.now() * 1000) % 1e6}`, scene);
  const path = toV3Path(def.verts);

  const fillMat = new StandardMaterial(`ghostFill-${root.name}`, scene);
  fillMat.diffuseColor = new Color3(0.85, 0.85, 0.9);
  fillMat.alpha = 0.28;
  fillMat.emissiveColor = new Color3(0.6, 0.6, 0.65);
  fillMat.backFaceCulling = false;

  const fill = MeshBuilder.CreatePolygon(`ghostFill`, { shape: path, sideOrientation: Mesh.DOUBLESIDE }, scene);
  fill.rotation.x = -Math.PI / 2;
  fill.position.y = TILE_THICK + 0.01;
  fill.material = fillMat;
  fill.parent = root;
  fill.isPickable = false;

  const yellow = new Color3(1.0, 0.82, 0.1);
  const tubes = def.edges.map((e) => {
    const tube = MeshBuilder.CreateTube(
      `ghostEdge`,
      { path: edgeTubePoints(e), radius: 0.07, tessellation: 8 },
      scene
    );
    const mat = new StandardMaterial(`ghostEdgeMat`, scene);
    mat.emissiveColor = yellow;
    mat.diffuseColor = yellow;
    tube.material = mat;
    tube.parent = root;
    tube.isPickable = false;
    return tube;
  });

  return {
    root,
    dispose() {
      tubes.forEach((t) => {
        (t.material as StandardMaterial).dispose();
        t.dispose();
      });
      fillMat.dispose();
      fill.dispose();
      root.dispose();
    },
  };
}

export function ghostSetPose(g: GhostVisual, pose: Pose): void {
  g.root.position.set(pose.p.x, 0, pose.p.y);
  g.root.rotation.y = -pose.r;
}

/** 给外部用：手柄参考方向（世界 2D） */
export function poseAt(pose: Pose, local: { x: number; y: number }) {
  return localToWorld(local, pose);
}
