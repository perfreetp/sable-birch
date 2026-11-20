import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * 解析二进制 / ASCII STL 为 BufferGeometry（非索引，位置属性）。
 * 返回 { geometry, triangleCount }。
 */
export function parseSTL(buffer: ArrayBuffer): { geometry: THREE.BufferGeometry; triangleCount: number } {
  const view = new DataView(buffer);

  // 判断二进制：ASCII STL 以 "solid" 开头且其后 80 字节内有 "facet"；二进制则按长度校验
  const headText = new TextDecoder('ascii').decode(new Uint8Array(buffer, 0, Math.min(buffer.byteLength, 400)));
  const looksAscii = /^\s*solid/i.test(headText) && /facet/i.test(headText);

  if (looksAscii && buffer.byteLength < 84) {
    return parseAsciiSTL(headText);
  }

  if (buffer.byteLength >= 84) {
    const triCount = view.getUint32(80, true);
    const expected = 84 + triCount * 50;
    if (expected === buffer.byteLength && !(/^\s*solid/i.test(headText) && /facet/i.test(headText) && triCount === 0)) {
      return parseBinarySTL(view, triCount);
    }
  }

  if (looksAscii) {
    return parseAsciiSTL(new TextDecoder('utf-8').decode(new Uint8Array(buffer)));
  }
  throw new Error('无法识别的 STL 文件格式');
}

function parseBinarySTL(view: DataView, triCount: number) {
  if (triCount <= 0) throw new Error('STL 中没有任何三角形');
  const positions = new Float32Array(triCount * 9);
  let off = 84;
  for (let t = 0; t < triCount; t++) {
    off += 12; // 法向（忽略，后续重算）
    for (let v = 0; v < 9; v++) {
      positions[t * 9 + v] = view.getFloat32(off, true);
      off += 4;
    }
    off += 2; // 属性字节
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return { geometry, triangleCount: triCount };
}

function parseAsciiSTL(text: string) {
  const positions: number[] = [];
  const re = /vertex\s+([-+0-9.eE]+)\s+([-+0-9.eE]+)\s+([-+0-9.eE]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    positions.push(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]));
  }
  if (positions.length < 9 || positions.length % 9 !== 0) throw new Error('ASCII STL 解析失败');
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return { geometry, triangleCount: positions.length / 9 };
}

/**
 * 焊接重合顶点，得到索引网格。STL 的每个三角形顶点都是独立的，
 * 距离/相交/布尔运算都要求拓扑相连，因此必须焊接。
 */
export function weldGeometry(geometry: THREE.BufferGeometry, tolerance = 1e-4): THREE.BufferGeometry {
  const g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
  const merged = mergeVertices(g, tolerance);
  merged.computeVertexNormals();
  merged.computeBoundingBox();
  merged.computeBoundingSphere();
  return merged;
}

/** 几何体外壳有向体积（mm³） */
export function geometryVolume(geometry: THREE.BufferGeometry): number {
  const pos = geometry.attributes.position;
  const index = geometry.index;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  let vol = 0;
  const triCount = index ? index.count / 3 : pos.count / 3;
  for (let t = 0; t < triCount; t++) {
    const i0 = index ? index.getX(t * 3) : t * 3;
    const i1 = index ? index.getX(t * 3 + 1) : t * 3 + 1;
    const i2 = index ? index.getX(t * 3 + 2) : t * 3 + 2;
    a.fromBufferAttribute(pos, i0);
    b.fromBufferAttribute(pos, i1);
    c.fromBufferAttribute(pos, i2);
    vol += a.dot(b.clone().cross(c)) / 6;
  }
  return Math.abs(vol);
}

/** 三角面边长统计（用于估算网格尺度） */
export function geometryEdgeLengthStats(geometry: THREE.BufferGeometry): { min: number; median: number; max: number } {
  const pos = geometry.attributes.position;
  const index = geometry.index;
  const triCount = index ? index.count / 3 : pos.count / 3;
  const lengths: number[] = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  for (let t = 0; t < Math.min(triCount, 8000); t++) {
    const i0 = index ? index.getX(t * 3) : t * 3;
    const i1 = index ? index.getX(t * 3 + 1) : t * 3 + 1;
    a.fromBufferAttribute(pos, i0);
    b.fromBufferAttribute(pos, i1);
    lengths.push(a.distanceTo(b));
  }
  lengths.sort((x, y) => x - y);
  return {
    min: lengths[0] ?? 0,
    median: lengths[Math.floor(lengths.length / 2)] ?? 0,
    max: lengths[lengths.length - 1] ?? 0,
  };
}
