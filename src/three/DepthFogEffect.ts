import { Effect, EffectAttribute } from 'postprocessing'
import * as THREE from 'three'

/**
 * 自定义深度雾。
 * EffectAttribute.DEPTH 使 EffectPass 自动向 mainImage 注入
 * 线性深度参数 `depth`（视图空间距离，0=相机近平面，1=远平面归一化）。
 * 雾色与太空背景一致，远处地球边缘自然隐入深空。
 */
export class DepthFogEffect extends Effect {
  constructor(fogColor: THREE.Color, near: number, far: number) {
    super(
      'DepthFogEffect',
      /* glsl */ `
        uniform vec3 uFogColor;
        uniform float uFogNear;
        uniform float uFogFar;

        void mainImage(
          const vec4 inputColor,
          const vec2 uv,
          const float depth,
          out vec4 outputColor
        ) {
          // depth 为归一化 [0,1] 深度，用 near/far 还原视图距离
          float viewZ = cameraNear * cameraFar / ((cameraNear - cameraFar) * depth + cameraFar);
          float dist = -viewZ;
          float f = clamp((dist - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
          f = f * f * (3.0 - 2.0 * f); // smoothstep
          outputColor = vec4(mix(inputColor.rgb, uFogColor, f * 0.85), inputColor.a);
        }
      `,
      {
        attributes: EffectAttribute.DEPTH,
        uniforms: new Map<string, THREE.Uniform>([
          ['uFogColor', new THREE.Uniform(fogColor)],
          ['uFogNear', new THREE.Uniform(near)],
          ['uFogFar', new THREE.Uniform(far)],
        ]),
      },
    )
  }
}
