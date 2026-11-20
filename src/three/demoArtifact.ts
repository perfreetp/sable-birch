/**
 * 程序化生成一件「馆藏青铜壶」演示模型，
 * 自带漫反射与法线两套高分辨率程序化纹理（Canvas 生成、含多级 mipmap），
 * 使应用在没有外部扫描件时也能完整演示纹理档位 / 通道 / 标注等功能。
 */
import * as THREE from 'three'

export interface DemoArtifact {
  group: THREE.Group
  /** 模型中使用到的全部纹理（用于档位/通道统一控制） */
  textures: THREE.Texture[]
  materials: THREE.MeshStandardMaterial[]
  /** 模型包围盒（世界单位） */
  box: THREE.Box3
}

/** 生成 1024px 青铜漫反射纹理：铜绿锈斑 + 饕餮纹风格环带 + 噪点 */
function makeBronzeDiffuse(size = 1024): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(size, size)
  const data = img.data

  // 基础青铜色 + 分块噪声，模拟锈蚀不均
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const n1 = Math.random()
      const n2 = Math.sin(x * 0.05) * Math.cos(y * 0.04)
      const pat = bandPattern(x, y, size)
      const r = 92 + n1 * 34 + n2 * 14 + pat * 40
      const g = 74 + n1 * 26 + n2 * 10 + pat * 26
      const b = 42 + n1 * 18 + pat * 12
      // 铜绿锈点
      const verdigris = Math.random() < 0.018
      data[i] = verdigris ? 58 + Math.random() * 30 : r
      data[i + 1] = verdigris ? 110 + Math.random() * 40 : g
      data[i + 2] = verdigris ? 92 + Math.random() * 34 : b
      data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)

  // 饕餮/云雷纹风格的环带装饰（深色几何纹）
  ctx.strokeStyle = 'rgba(38, 28, 16, 0.85)'
  ctx.lineWidth = size * 0.006
  const bands = [0.18, 0.34, 0.62, 0.8]
  for (const by of bands) {
    const cy = by * size
    ctx.beginPath()
    ctx.moveTo(0, cy - size * 0.03)
    ctx.lineTo(size, cy - size * 0.03)
    ctx.moveTo(0, cy + size * 0.03)
    ctx.lineTo(size, cy + size * 0.03)
    ctx.stroke()
    const step = size / 16
    for (let k = 0; k < 16; k++) {
      const x0 = k * step
      ctx.strokeRect(x0 + step * 0.18, cy - step * 0.32, step * 0.64, step * 0.64)
      ctx.beginPath()
      ctx.arc(x0 + step / 2, cy, step * 0.16, 0, Math.PI * 2)
      ctx.stroke()
      // 回旋云纹
      ctx.beginPath()
      ctx.arc(x0 + step / 2, cy, step * 0.3, Math.PI * 0.2, Math.PI * 1.5)
      ctx.stroke()
    }
  }
  return canvas
}

/** 环带纹权重：在装饰带范围内返回 0-1 */
function bandPattern(x: number, y: number, size: number): number {
  const bands = [0.18, 0.34, 0.62, 0.8]
  let w = 0
  for (const b of bands) {
    const d = Math.abs(y / size - b)
    if (d < 0.045) w = Math.max(w, 1 - d / 0.045)
  }
  return w
}

/** 由漫反射高度信息生成法线纹理（Sobel 梯度） */
function makeNormalFromHeight(height: HTMLCanvasElement, strength = 2.2): HTMLCanvasElement {
  const size = height.width
  const srcCtx = height.getContext('2d')!
  const src = srcCtx.getImageData(0, 0, size, size).data
  const out = document.createElement('canvas')
  out.width = out.height = size
  const ctx = out.getContext('2d')!
  const img = ctx.createImageData(size, size)
  const lumAt = (x: number, y: number): number => {
    const xx = (x + size) % size
    const yy = (y + size) % size
    const i = (yy * size + xx) * 4
    return (src[i] * 0.3 + src[i + 1] * 0.59 + src[i + 2] * 0.11) / 255
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = lumAt(x + 1, y) - lumAt(x - 1, y)
      const dy = lumAt(x, y + 1) - lumAt(x, y - 1)
      const nx = -dx * strength
      const ny = -dy * strength
      const nz = 1
      const inv = 1 / Math.hypot(nx, ny, nz)
      const i = (y * size + x) * 4
      img.data[i] = (nx * inv * 0.5 + 0.5) * 255
      img.data[i + 1] = (ny * inv * 0.5 + 0.5) * 255
      img.data[i + 2] = (nz * inv * 0.5 + 0.5) * 255
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return out
}

function textureFromCanvas(canvas: HTMLCanvasElement, srgb: boolean): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, 1)
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.anisotropy = 8
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

export function createDemoArtifact(): DemoArtifact {
  const group = new THREE.Group()
  group.name = 'demo-bronze-hu'

  // 壶身：旋转轮廓（壶口、颈、肩、腹、圈足）
  const profile: THREE.Vector2[] = []
  const pts: Array<[number, number]> = [
    [0.0, 0.0],
    [0.62, 0.0],
    [0.66, 0.12],
    [0.58, 0.28],
    [0.78, 0.55],
    [1.02, 0.95],
    [1.08, 1.35],
    [0.96, 1.7],
    [0.62, 1.95],
    [0.42, 2.1],
    [0.4, 2.32],
    [0.56, 2.38],
    [0.56, 2.5],
    [0.34, 2.5],
    [0.3, 2.36],
    [0.3, 0.0],
    [0.0, 0.0],
  ]
  for (const [x, y] of pts) profile.push(new THREE.Vector2(x, y))
  const bodyGeo = new THREE.LatheGeometry(profile, 128)
  bodyGeo.computeVertexNormals()

  const diffuseCanvas = makeBronzeDiffuse(1024)
  const normalCanvas = makeNormalFromHeight(diffuseCanvas)
  const diffuseTex = textureFromCanvas(diffuseCanvas, true)
  const normalTex = textureFromCanvas(normalCanvas, false)

  const bodyMat = new THREE.MeshStandardMaterial({
    map: diffuseTex,
    normalMap: normalTex,
    normalScale: new THREE.Vector2(1.1, 1.1),
    metalness: 0.45,
    roughness: 0.62,
    color: 0xffffff,
  })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.name = 'vessel-body'
  group.add(body)

  // 双耳（壶肩部的兽首环耳）
  const earMat = bodyMat.clone()
  const earGeo = new THREE.TorusGeometry(0.26, 0.07, 18, 48)
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(earGeo, earMat)
    ear.position.set(side * 1.02, 1.62, 0)
    ear.rotation.y = Math.PI / 2
    ear.name = side < 0 ? 'handle-l' : 'handle-r'
    group.add(ear)
  }

  // 圈足底环
  const ringGeo = new THREE.TorusGeometry(0.6, 0.05, 14, 96)
  const ring = new THREE.Mesh(ringGeo, earMat)
  ring.rotation.x = Math.PI / 2
  ring.position.y = 0.06
  group.add(ring)

  // 盖与盖钮
  const lidGeo = new THREE.CylinderGeometry(0.46, 0.5, 0.12, 64)
  const lid = new THREE.Mesh(lidGeo, earMat)
  lid.position.y = 2.56
  group.add(lid)
  const knobGeo = new THREE.SphereGeometry(0.14, 32, 16)
  const knob = new THREE.Mesh(knobGeo, earMat)
  knob.position.y = 2.72
  group.add(knob)

  group.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.castShadow = true
      o.receiveShadow = true
    }
  })

  const box = new THREE.Box3().setFromObject(group)
  const center = box.getCenter(new THREE.Vector3())
  group.position.sub(center) // 居中到原点，方便局部坐标标注

  const materials: THREE.MeshStandardMaterial[] = []
  const textures: THREE.Texture[] = []
  const collectTex = (t: THREE.Texture | null | undefined): void => {
    if (t instanceof THREE.Texture && !textures.includes(t)) textures.push(t)
  }
  group.traverse((o) => {
    if (o instanceof THREE.Mesh && o.material instanceof THREE.MeshStandardMaterial) {
      if (!materials.includes(o.material)) materials.push(o.material)
      collectTex(o.material.map)
      collectTex(o.material.normalMap)
      collectTex(o.material.roughnessMap)
      collectTex(o.material.metalnessMap)
    }
  })

  return { group, textures, materials, box: new THREE.Box3().setFromObject(group) }
}
