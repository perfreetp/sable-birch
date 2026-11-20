/** 点云加载、体素抽稀与示例数据生成 */

/** 解析点云文件,返回 xyz 交错的 Float32Array */
export function parsePointFile(name: string, buf: ArrayBuffer): Float32Array {
  const lower = name.toLowerCase()
  if (lower.endsWith('.ply')) return parsePLY(buf)
  return parseXYZText(buf)
}

/** 解析 xyz / txt / csv 文本点云:每行至少 3 个数值(x y z [r g b ...]) */
function parseXYZText(buf: ArrayBuffer): Float32Array {
  const text = new TextDecoder('utf-8').decode(buf)
  const out: number[] = []
  const lines = text.split(/\r?\n/)
  for (const line of lines) {
    const s = line.trim()
    if (!s || s.startsWith('#') || s.startsWith('//')) continue
    const parts = s.split(/[,;\s]+/)
    if (parts.length < 3) continue
    const x = Number(parts[0])
    const y = Number(parts[1])
    const z = Number(parts[2])
    if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
      out.push(x, y, z)
    }
  }
  if (out.length === 0) throw new Error('未能从文件中解析出任何点(需要每行至少 x y z 三个数值)')
  return new Float32Array(out)
}

const PLY_TYPE_SIZE: Record<string, number> = {
  char: 1, uchar: 1, int8: 1, uint8: 1,
  short: 2, ushort: 2, int16: 2, uint16: 2,
  int: 4, uint: 4, int32: 4, uint32: 4, float: 4, float32: 4,
  double: 8, float64: 8,
}

/** 解析 PLY(ascii 与 binary_little_endian),提取顶点 x/y/z */
function parsePLY(buf: ArrayBuffer): Float32Array {
  const headLen = Math.min(buf.byteLength, 8192)
  const headText = new TextDecoder('utf-8').decode(new Uint8Array(buf, 0, headLen))
  if (!headText.startsWith('ply')) throw new Error('不是有效的 PLY 文件')
  const endTag = 'end_header'
  const endIdx = headText.indexOf(endTag)
  if (endIdx < 0) throw new Error('PLY 头不完整')
  // 头结束于 end_header 所在行的换行符之后
  let dataStart = endIdx + endTag.length
  const bytes = new Uint8Array(buf)
  while (dataStart < buf.byteLength && (bytes[dataStart] === 13 || bytes[dataStart] === 10)) dataStart++

  const header = headText.slice(0, endIdx).split(/\r?\n/)
  let format = 'ascii'
  let vertexCount = 0
  let inVertex = false
  const props: { name: string; type: string }[] = []
  for (const line of header) {
    const t = line.trim()
    if (t.startsWith('format')) format = t.split(/\s+/)[1]
    else if (t.startsWith('element')) {
      const p = t.split(/\s+/)
      inVertex = p[1] === 'vertex'
      if (inVertex) vertexCount = parseInt(p[2], 10)
    } else if (t.startsWith('property') && inVertex) {
      const p = t.split(/\s+/)
      if (p[1] === 'list') throw new Error('暂不支持含 list 属性的 PLY 顶点')
      props.push({ name: p[2], type: p[1] })
    }
  }
  const ix = props.findIndex(p => p.name === 'x')
  const iy = props.findIndex(p => p.name === 'y')
  const iz = props.findIndex(p => p.name === 'z')
  if (ix < 0 || iy < 0 || iz < 0) throw new Error('PLY 顶点缺少 x/y/z 属性')

  const out = new Float32Array(vertexCount * 3)

  if (format === 'ascii') {
    const text = new TextDecoder('utf-8').decode(new Uint8Array(buf, dataStart))
    const tokens = text.split(/\s+/)
    const stride = props.length
    for (let i = 0; i < vertexCount; i++) {
      const base = i * stride
      out[i * 3] = Number(tokens[base + ix])
      out[i * 3 + 1] = Number(tokens[base + iy])
      out[i * 3 + 2] = Number(tokens[base + iz])
    }
  } else if (format === 'binary_little_endian') {
    const view = new DataView(buf, dataStart)
    const stride = props.reduce((s, p) => s + (PLY_TYPE_SIZE[p.type] ?? 4), 0)
    const offsets: number[] = []
    let off = 0
    for (const p of props) { offsets.push(off); off += PLY_TYPE_SIZE[p.type] ?? 4 }
    const read = (vIdx: number, pIdx: number): number => {
      const o = vIdx * stride + offsets[pIdx]
      switch (props[pIdx].type) {
        case 'float': case 'float32': return view.getFloat32(o, true)
        case 'double': case 'float64': return view.getFloat64(o, true)
        case 'char': case 'int8': return view.getInt8(o)
        case 'uchar': case 'uint8': return view.getUint8(o)
        case 'short': case 'int16': return view.getInt16(o, true)
        case 'ushort': case 'uint16': return view.getUint16(o, true)
        case 'int': case 'int32': return view.getInt32(o, true)
        case 'uint': case 'uint32': return view.getUint32(o, true)
        default: return view.getFloat32(o, true)
      }
    }
    for (let i = 0; i < vertexCount; i++) {
      out[i * 3] = read(i, ix)
      out[i * 3 + 1] = read(i, iy)
      out[i * 3 + 2] = read(i, iz)
    }
  } else {
    throw new Error(`不支持的 PLY 格式: ${format}`)
  }
  return out
}

/** 体素抽稀:每个体素保留一个均值点 */
export function voxelDownsample(pts: Float32Array, voxel: number): Float32Array {
  const map = new Map<string, [number, number, number, number]>()
  const inv = 1 / voxel
  for (let i = 0; i < pts.length; i += 3) {
    const key = `${Math.floor(pts[i] * inv)},${Math.floor(pts[i + 1] * inv)},${Math.floor(pts[i + 2] * inv)}`
    const cell = map.get(key)
    if (cell) {
      cell[0] += pts[i]; cell[1] += pts[i + 1]; cell[2] += pts[i + 2]; cell[3]++
    } else {
      map.set(key, [pts[i], pts[i + 1], pts[i + 2], 1])
    }
  }
  const out = new Float32Array(map.size * 3)
  let k = 0
  for (const c of map.values()) {
    out[k++] = c[0] / c[3]
    out[k++] = c[1] / c[3]
    out[k++] = c[2] / c[3]
  }
  return out
}

/** 生成示例遗址点云:缓坡台地 + 中央土丘(台基) + 两条灰沟 + 两个方形坑 */
export function generateSampleSite(): Float32Array {
  // 可复现的伪随机
  let seed = 20261121
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }
  const W = 70, D = 50, step = 0.18
  const pts: number[] = []
  for (let x = 0; x <= W; x += step) {
    for (let y = 0; y <= D; y += step) {
      const jx = x + (rand() - 0.5) * step * 0.8
      const jy = y + (rand() - 0.5) * step * 0.8
      // 缓坡
      let h = 10 + 0.03 * jx + 0.015 * jy
      // 中央台基(土丘)
      h += 2.6 * Math.exp(-((jx - 36) ** 2 + (jy - 26) ** 2) / (2 * 7.5 ** 2))
      // 次要隆起
      h += 1.1 * Math.exp(-((jx - 14) ** 2 + (jy - 38) ** 2) / (2 * 4 ** 2))
      // 灰沟一(斜向)
      const d1 = Math.abs(jy - (12 + 0.25 * jx))
      h -= 0.7 * Math.exp(-(d1 * d1) / (2 * 0.9 ** 2))
      // 灰沟二(近南北向)
      const d2 = Math.abs(jx - 58)
      h -= 0.5 * Math.exp(-(d2 * d2) / (2 * 0.7 ** 2))
      // 方形坑(探方遗迹)
      if (jx > 47 && jx < 55 && jy > 32 && jy < 40) h -= 0.8
      if (jx > 18 && jx < 23 && jy > 8 && jy < 13) h -= 0.55
      // 噪声
      h += (rand() - 0.5) * 0.07
      pts.push(jx, jy, h)
    }
  }
  return new Float32Array(pts)
}
