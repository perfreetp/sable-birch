import * as THREE from 'three';
import { EffectComposer, RenderPass, EffectPass, Effect } from 'postprocessing';
import { buildLayerScenes, type LayerScene } from './scenes';
import { kelvinToColor } from './kelvin';
import { store, type BlendMode, type LayerId } from './state';

const BLEND_INDEX: Record<BlendMode, number> = { normal: 0, overlay: 1, screen: 2 };

/**
 * 三图层合成 Effect：按槽位 0..2（底→顶）依次混合。
 * 图层顺序变化时只需重新指定每个槽位的纹理 / 不透明度 / 混合模式，无需重建着色器。
 */
const FRAGMENT = /* glsl */ `
  uniform sampler2D layer0;
  uniform float opacity0;
  uniform int blend0;
  uniform sampler2D layer1;
  uniform float opacity1;
  uniform int blend1;
  uniform sampler2D layer2;
  uniform float opacity2;
  uniform int blend2;

  vec3 blendWith(int mode, vec3 dst, vec3 src) {
    if (mode == 1) {
      // 叠加 Overlay
      return mix(2.0 * dst * src, 1.0 - 2.0 * (1.0 - dst) * (1.0 - src), step(0.5, dst));
    }
    if (mode == 2) {
      // 滤色 Screen
      return 1.0 - (1.0 - dst) * (1.0 - src);
    }
    return src; // 正常 Normal
  }

  vec4 applyLayer(vec4 acc, sampler2D tex, float opacity, int mode, vec2 uv) {
    vec4 c = texture2D(tex, uv);
    float a = clamp(c.a * opacity, 0.0, 1.0);
    vec3 blended = blendWith(mode, acc.rgb, c.rgb);
    acc.rgb = mix(acc.rgb, blended, a);
    acc.a = a + acc.a * (1.0 - a);
    return acc;
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 acc = vec4(0.0);
    acc = applyLayer(acc, layer0, opacity0, blend0, uv);
    acc = applyLayer(acc, layer1, opacity1, blend1, uv);
    acc = applyLayer(acc, layer2, opacity2, blend2, uv);
    outputColor = vec4(acc.rgb, 1.0);
  }
`;

class CompositeEffect extends Effect {
  constructor() {
    const uniforms = new Map<string, THREE.Uniform>();
    for (let i = 0; i < 3; i++) {
      uniforms.set(`layer${i}`, new THREE.Uniform<THREE.Texture | null>(null));
      uniforms.set(`opacity${i}`, new THREE.Uniform(1));
      uniforms.set(`blend${i}`, new THREE.Uniform(0));
    }
    super('CompositeEffect', FRAGMENT, { uniforms });
  }

  setSlot(slot: number, texture: THREE.Texture, opacity: number, blend: BlendMode): void {
    const u = this.uniforms;
    (u.get(`layer${slot}`) as THREE.Uniform).value = texture;
    (u.get(`opacity${slot}`) as THREE.Uniform).value = opacity;
    (u.get(`blend${slot}`) as THREE.Uniform).value = BLEND_INDEX[blend];
  }
}

export class Compositor {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private layers: Record<LayerId, LayerScene>;
  private targets: Record<LayerId, THREE.WebGLRenderTarget>;
  private composer: EffectComposer;
  private compositeEffect: CompositeEffect;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    this.renderer.setClearColor(0x000000, 0); // 中景/近景透明底，便于图层混合
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 9000);
    this.camera.position.set(0, 3.5, 0);
    this.camera.rotation.order = 'YXZ';

    this.layers = buildLayerScenes();

    const mkTarget = () =>
      new THREE.WebGLRenderTarget(1, 1, {
        format: THREE.RGBAFormat,
        samples: 4,
      });
    this.targets = { far: mkTarget(), mid: mkTarget(), near: mkTarget() };

    // postprocessing 合成通道：空场景 RenderPass 提供输入缓冲，EffectPass 完成三图层混合
    this.compositeEffect = new CompositeEffect();
    const baseScene = new THREE.Scene();
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(baseScene, this.camera));
    this.composer.addPass(new EffectPass(this.camera, this.compositeEffect));

    this.resize();
    window.addEventListener('resize', () => this.resize());
    store.subscribe(() => this.applyState());
    this.applyState();

    this.renderer.setAnimationLoop(() => this.render());
  }

  private resize(): void {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const dpr = this.renderer.getPixelRatio();
    for (const t of Object.values(this.targets)) {
      t.setSize(Math.round(w * dpr), Math.round(h * dpr));
    }
  }

  /** 把 store 中的状态同步到合成器：图层顺序/透明度/混合、雾、昼夜色温、相机 */
  private applyState(): void {
    const s = store.get();

    // 图层：数组顺序即合成顺序（底 → 顶）
    s.layers.forEach((layer, slot) => {
      this.compositeEffect.setSlot(
        slot,
        this.targets[layer.id].texture,
        layer.opacity,
        layer.blendMode,
      );
    });

    // 雾效与昼夜色温
    const lightColor = kelvinToColor(s.colorTemp);
    const sky = s.night
      ? new THREE.Color(0x0a1020).lerp(lightColor, 0.08)
      : new THREE.Color(0x87b5d6).lerp(lightColor, 0.18);
    const fogColor = sky.clone().lerp(new THREE.Color(0xffffff), s.night ? 0.05 : 0.35);
    for (const layer of Object.values(this.layers)) {
      layer.applyFog(s.fog, fogColor);
      layer.applyEnvironment(sky, lightColor, s.night);
    }

    // 相机俯仰 / 偏航
    this.camera.rotation.set(
      THREE.MathUtils.degToRad(s.pitch),
      THREE.MathUtils.degToRad(s.yaw),
      0,
    );
  }

  private render(): void {
    for (const id of ['far', 'mid', 'near'] as LayerId[]) {
      this.renderer.setRenderTarget(this.targets[id]);
      this.renderer.render(this.layers[id].scene, this.camera);
    }
    this.renderer.setRenderTarget(null);
    this.composer.render();
  }
}
