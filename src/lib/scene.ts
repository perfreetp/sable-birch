import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3, Color4 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent";
import "@babylonjs/core/Layers/effectLayerSceneComponent";
import "@babylonjs/core/Culling/ray";
import "@babylonjs/core/Events/pointerEvents";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { IDisposable } from "@babylonjs/core/scene";
import { V2 } from "./geometry";

export interface Tween {
  t: number;
  duration: number;
  ease: (k: number) => number;
  step: (k: number) => void;
  done?: () => void;
}

export interface SceneCtx {
  engine: Engine;
  scene: Scene;
  canvas: HTMLCanvasElement;
  camera: ArcRotateCamera;
  ground: Mesh;
  lights: DirectionalLight[];
  lightHandles: Mesh[];
  shadowGens: ShadowGenerator[];
  glow: GlowLayer;
  tweens: Tween[];
  addTween: (t: Tween) => void;
  /** 屏幕坐标 -> 台面 y=0 交点 */
  screenToGround: (clientX: number, clientY: number) => V2 | null;
  pickMesh: (x: number, y: number) => AbstractMesh | null;
  moveLight: (index: number, ground: V2) => void;
  setCameraFlat: (animated: boolean) => void;
  setCameraFold: (animated: boolean) => void;
  dispose: () => void;
}

const LIGHT_HEIGHT = 6.5;
const HANDLE_COLORS = [
  new Color3(1.0, 0.85, 0.35),
  new Color3(0.55, 0.8, 1.0),
];

function easeInOut(k: number): number {
  return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
}

export function createScene(canvas: HTMLCanvasElement): SceneCtx {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true, // 导出截图需要
    stencil: true,
    antialias: true,
  });
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.965, 0.955, 0.93, 1);

  // 相机：默认近乎垂直俯视
  const camera = new ArcRotateCamera("cam", -Math.PI / 2, 0.06, 17, new Vector3(0, 0, 0), scene);
  camera.minZ = 0.1;
  camera.lowerRadiusLimit = 7;
  camera.upperRadiusLimit = 34;
  camera.lowerBetaLimit = 0.03;
  camera.upperBetaLimit = Math.PI / 2.05;
  camera.pinchPrecision = 100;
  camera.wheelPrecision = 20;
  camera.panningSensibility = 90;
  // 双击复位由应用自己处理（回平铺视角），关掉相机自带的双击缩放
  camera.useInputToRestoreState = false;
  camera.detachControl();
  camera.attachControl(canvas, true);

  // 环境补光
  const hemi = new HemisphericLight("hemi", new Vector3(0.2, 1, 0.3), scene);
  hemi.intensity = 0.65;
  hemi.groundColor = new Color3(0.85, 0.82, 0.78);

  // 台面
  const ground = MeshBuilder.CreateCylinder(
    "table",
    { height: 0.5, diameter: 26, tessellation: 64 },
    scene
  );
  ground.position.y = -0.26;
  const groundMat = new StandardMaterial("tableMat", scene);
  groundMat.diffuseColor = new Color3(0.93, 0.9, 0.84);
  groundMat.specularColor = new Color3(0.08, 0.08, 0.08);
  ground.material = groundMat;

  // 台面内圈装饰
  const ring = MeshBuilder.CreateTorus("ring", { diameter: 22, thickness: 0.06, tessellation: 96 }, scene);
  ring.position.y = 0.01;
  const ringMat = new StandardMaterial("ringMat", scene);
  ringMat.emissiveColor = new Color3(0.78, 0.74, 0.66);
  ringMat.diffuseColor = new Color3(0.78, 0.74, 0.66);
  ring.material = ringMat;

  const glow = new GlowLayer("glow", scene);
  glow.intensity = 0.9;

  // 两盏可拖动方向光
  const lights: DirectionalLight[] = [];
  const lightHandles: Mesh[] = [];
  const shadowGens: ShadowGenerator[] = [];
  const startPoints: V2[] = [
    { x: -5.5, y: -4.5 },
    { x: 5.5, y: 4.5 },
  ];

  for (let i = 0; i < 2; i++) {
    const light = new DirectionalLight(`dir${i}`, new Vector3(0.5, -1, 0.4), scene);
    light.intensity = 0.85;
    light.diffuse = HANDLE_COLORS[i].scale(1.05);
    const sg = new ShadowGenerator(1024, light);
    sg.useBlurExponentialShadowMap = true;
    sg.blurKernel = 16;
    sg.darkness = 0.32;
    lights.push(light);
    shadowGens.push(sg);

    const handle = MeshBuilder.CreateSphere(`lightHandle${i}`, { diameter: 0.85, segments: 16 }, scene);
    const hm = new StandardMaterial(`lightHandleMat${i}`, scene);
    hm.emissiveColor = HANDLE_COLORS[i];
    hm.diffuseColor = HANDLE_COLORS[i];
    handle.material = hm;
    handle.metadata = { kind: "lightHandle", index: i };
    lightHandles.push(handle);
  }

  const ctx: SceneCtx = {
    engine,
    scene,
    canvas,
    camera,
    ground,
    lights,
    lightHandles,
    shadowGens,
    glow,
    tweens: [],
    addTween(t) {
      ctx.tweens.push(t);
    },
    screenToGround(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const ray = scene.createPickingRay(x, y, null, camera);
      // 与台面平面 y = 0 求交
      const t = -ray.origin.y / ray.direction.y;
      if (!isFinite(t) || t <= 0) return null;
      return { x: ray.origin.x + ray.direction.x * t, y: ray.origin.z + ray.direction.z * t };
    },
    pickMesh(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const pick = scene.pick(clientX - rect.left, clientY - rect.top, (m) => m.isPickable && m !== ground);
      return pick?.hit ? pick.pickedMesh : null;
    },
    moveLight(index, g) {
      const light = lights[index];
      const handle = lightHandles[index];
      handle.position.set(g.x, 0.9, g.y);
      light.position.set(g.x, LIGHT_HEIGHT, g.y);
      light.direction = new Vector3(-g.x, -LIGHT_HEIGHT, -g.y);
    },
    setCameraFlat(animated) {
      const to = { alpha: -Math.PI / 2, beta: 0.06, radius: 17, tx: 0, ty: 0, tz: 0 };
      applyCamera(ctx, to, animated);
    },
    setCameraFold(animated) {
      const to = { alpha: -Math.PI / 2, beta: 0.85, radius: 21, tx: 0, ty: 0.6, tz: 0 };
      applyCamera(ctx, to, animated);
    },
    dispose() {
      engine.stopRenderLoop();
      scene.dispose();
      engine.dispose();
    },
  };

  startPoints.forEach((p, i) => ctx.moveLight(i, p));

  // 补间驱动
  scene.onBeforeRenderObservable.add(() => {
    const dt = engine.getDeltaTime() / 1000;
    for (let i = ctx.tweens.length - 1; i >= 0; i--) {
      const tw = ctx.tweens[i];
      tw.t += dt;
      const k = Math.min(1, tw.t / tw.duration);
      tw.step(tw.ease(k));
      if (k >= 1) {
        ctx.tweens.splice(i, 1);
        tw.done?.();
      }
    }
  });

  engine.runRenderLoop(() => scene.render());

  const onResize = () => engine.resize();
  window.addEventListener("resize", onResize);
  const oldDispose = ctx.dispose;
  ctx.dispose = () => {
    window.removeEventListener("resize", onResize);
    oldDispose();
  };

  return ctx;
}

function applyCamera(
  ctx: SceneCtx,
  to: { alpha: number; beta: number; radius: number; tx: number; ty: number; tz: number },
  animated: boolean
) {
  const { camera } = ctx;
  if (!animated) {
    camera.alpha = to.alpha;
    camera.beta = to.beta;
    camera.radius = to.radius;
    camera.setTarget(new Vector3(to.tx, to.ty, to.tz));
    return;
  }
  const from = {
    alpha: camera.alpha,
    beta: camera.beta,
    radius: camera.radius,
    tx: camera.target.x,
    ty: camera.target.y,
    tz: camera.target.z,
  };
  ctx.addTween({
    t: 0,
    duration: 0.55,
    ease: easeInOut,
    step(k) {
      camera.alpha = from.alpha + (to.alpha - from.alpha) * k;
      camera.beta = from.beta + (to.beta - from.beta) * k;
      camera.radius = from.radius + (to.radius - from.radius) * k;
      camera.setTarget(
        new Vector3(
          from.tx + (to.tx - from.tx) * k,
          from.ty + (to.ty - from.ty) * k,
          from.tz + (to.tz - from.tz) * k
        )
      );
    },
  });
}

export function makeTween(ctx: SceneCtx, duration: number, step: (k: number) => void, done?: () => void): void {
  ctx.addTween({ t: 0, duration, ease: easeInOut, step, done });
}

export type { IDisposable };
