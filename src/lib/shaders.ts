/** GLSL used by the volume renderer and the post-processing stack. */

export const DENSITY_SCALE = 1 / 520

/**
 * Ray/marching core shared by the volume material and the screen-space
 * volumetric fog effect. Requires:
 *   uniform sampler2D uCloudBaseTex;  (128x128 R32F, metres, 0 = clear)
 */
export const volumeCommon = /* glsl */ `
float hash12(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float ign(vec2 p){
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}
`

/** Palettes for the three density threshold tiers. */
export const paletteGLSL = /* glsl */ `
// Cloud albedo ramps. Each tier tints the same white body differently, so the
// three density thresholds read as three optical views of one storm.
vec3 albedoCool(float t){ // 稀薄: cool stratiform, blue-grey
  vec3 a = vec3(0.30, 0.38, 0.47);
  vec3 b = vec3(0.66, 0.74, 0.82);
  vec3 c = vec3(0.92, 0.96, 1.00);
  return t < 0.6 ? mix(a, b, t / 0.6) : mix(b, c, (t - 0.6) / 0.4);
}
vec3 albedoStorm(float t){ // 标准: neutral cumulonimbus with teal shadows
  vec3 a = vec3(0.22, 0.33, 0.38);
  vec3 b = vec3(0.55, 0.68, 0.72);
  vec3 c = vec3(0.86, 0.92, 0.95);
  vec3 d = vec3(1.00, 0.97, 0.93);
  if (t < 0.36) return mix(a, b, t / 0.36);
  if (t < 0.72) return mix(b, c, (t - 0.36) / 0.36);
  return mix(c, d, (t - 0.72) / 0.28);
}
vec3 albedoHot(float t){ // 致密: warm hazard ramp, amber cores
  vec3 a = vec3(0.30, 0.20, 0.26);
  vec3 b = vec3(0.72, 0.45, 0.36);
  vec3 c = vec3(0.95, 0.76, 0.52);
  vec3 d = vec3(1.00, 0.95, 0.86);
  if (t < 0.4) return mix(a, b, t / 0.4);
  if (t < 0.76) return mix(b, c, (t - 0.4) / 0.36);
  return mix(c, d, (t - 0.76) / 0.24);
}
vec3 paletteFor(float t, float tier){
  t = clamp(t, 0.0, 1.0);
  if (tier < 0.5) return albedoCool(t);
  if (tier < 1.5) return albedoStorm(t);
  return albedoHot(t);
}
`

/**
 * Screen-space volumetric fog used as a post effect: reconstructs the ray per
 * pixel, marches the same chunked cloud field on top of the rasterised scene,
 * and composites in front of it. Blended with BlendFunction.NORMAL over the copy.
 */
export const fogEffectShader = /* glsl */ `
uniform sampler2D uVolume;
uniform sampler2D uCloudBase;
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamFwd;
uniform vec2 uTanHalf;
uniform float uAspect;
uniform vec3 uBoxMin;
uniform vec3 uBoxMax;
uniform float uThreshold;
uniform float uOpacity;
uniform float uTier;
uniform float uDensityScale;
uniform float uSteps;
uniform float uTerrainHeight;
uniform float uTime;
uniform float uFogStrength;

${volumeCommon}

#include <packing>

float readLinearDepth(const in vec2 uv){
  float d = readDepth(uv);
  float viewZ = perspectiveDepthToViewZ(d, cameraNear, cameraFar);
  return -viewZ;
}

vec2 boxHit(vec3 ro, vec3 rd, vec3 bmin, vec3 bmax){
  vec3 inv = 1.0 / rd;
  vec3 t0 = (bmin - ro) * inv;
  vec3 t1 = (bmax - ro) * inv;
  vec3 tmin = min(t0, t1);
  vec3 tmax = max(t0, t1);
  return vec2(max(max(tmin.x, tmin.y), tmin.z), min(min(tmax.x, tmax.y), tmax.z));
}

float sampleDensity(vec3 p){
  if (any(lessThan(p, uBoxMin)) || any(greaterThan(p, uBoxMax))) return 0.0;
  vec3 uvw = (p - uBoxMin) / (uBoxMax - uBoxMin);
  return texture2D(uVolume, uvw).r;
}

float cloudBaseAt(vec3 p){
  vec2 uvc = (p.xz - uBoxMin.xz) / (uBoxMax.xz - uBoxMin.xz);
  return texture2D(uCloudBase, uvc).r;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
  float viewZ = readLinearDepth(uv);
  vec2 ndc = uv * 2.0 - 1.0;
  vec3 rd = normalize(uCamFwd + uCamRight * ndc.x * uTanHalf.x * uAspect + uCamUp * ndc.y * uTanHalf.y);
  vec3 ro = uCamPos;
  vec2 hit = boxHit(ro, rd, uBoxMin, uBoxMax);
  float tStart = max(hit.x, 0.0);
  float tEnd = hit.y;
  if (tEnd <= tStart) { outputColor = inputColor; return; }
  tEnd = min(tEnd, viewZ + 60.0);

  float span = tEnd - tStart;
  int steps = int(clamp(uSteps, 24.0, 192.0));
  float dt = span / float(steps);
  float jitter = ign(gl_FragCoord.xy + uTime * 37.0) * dt;

  vec3 acc = vec3(0.0);
  float trans = 1.0;
  float t = tStart + jitter;
  float densScale = uDensityScale;
  for (int i = 0; i < 192; i++) {
    if (i >= steps || trans < 0.012) break;
    vec3 p = ro + rd * t;
    float raw = sampleDensity(p);
    float den = max(0.0, raw - uThreshold);
    if (den > 0.002) {
      float ground = uTerrainHeight;
      float gy = (p.y - uBoxMin.y) / (uBoxMax.y - uBoxMin.y);
      float base = cloudBaseAt(p);
      // Fade the column up from the analysed cloud base so the deck reads as a lid.
      float baseFade = base > 1.0 ? smoothstep(0.0, 1.0, clamp((p.y - base) / 320.0, 0.0, 1.0)) : 1.0;
      float d = den * baseFade * densScale;
      if (d > 0.00002) {
        float shade = 0.55 + 0.45 * smoothstep(0.0, 1.0, gy);
        shade *= 0.72 + 0.5 * hash12(floor(p.xz * 0.02) + floor(p.y * 0.02));
        vec3 col = paletteFor(clamp(den / max(0.001, 1.0 - uThreshold), 0.0, 1.0), uTier) * shade;
        float a = 1.0 - exp(-d * dt);
        acc += col * a * trans;
        trans *= 1.0 - a;
      }
    }
    t += dt;
  }
  float fog = (1.0 - trans) * uFogStrength * uOpacity;
  vec3 fogCol = acc / max(0.0001, 1.0 - trans) * uOpacity;
  outputColor = vec4(mix(inputColor.rgb, fogCol, clamp(fog + 0.0, 0.0, 0.92)), inputColor.a);
  outputColor.rgb += acc * (1.0 - uFogStrength) * uOpacity;
}
`

/** Colour-mapping / grade effect: vignette + filmic grade for the render layer. */
export const gradeShader = /* glsl */ `
uniform float uTime;
uniform float uVignette;
uniform float uGrain;
uniform vec3 uTint;

float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
  vec3 c = inputColor.rgb;
  c = mix(c, c * uTint, 0.35);
  float vig = smoothstep(0.92, 0.28, length(uv - 0.5));
  c *= mix(1.0, vig, uVignette);
  c += (h21(uv * 1024.0 + uTime) - 0.5) * uGrain;
  outputColor = vec4(c, inputColor.a);
}
`
