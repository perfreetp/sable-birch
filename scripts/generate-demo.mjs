// 生成演示用陶俑残片：中空陶俑实体 → Voronoi 分割 → 每片独立水密实体 → STL
// 运行: node scripts/generate-demo.mjs
import * as THREE from 'three';
import Module from 'manifold-3d';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { revolveClosed } from './revolve.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'public', 'demo');
fs.mkdirSync(OUT, { recursive: true });

const wasm = await Module();
wasm.setup();
const { Manifold, Mesh } = wasm;

/* ---------- 确定性随机 ---------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20240517);

/* ---------- 3D 值噪声 ---------- */
function hash3(x, y, z) {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
  return h - Math.floor(h);
}
const smooth = t => t * t * (3 - 2 * t);
function valueNoise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = smooth(x - xi), yf = smooth(y - yi), zf = smooth(z - zi);
  const c = (a, b, d) => hash3(xi + a, yi + b, zi + d);
  const x00 = c(0, 0, 0) * (1 - xf) + c(1, 0, 0) * xf;
  const x10 = c(0, 1, 0) * (1 - xf) + c(1, 1, 0) * xf;
  const x01 = c(0, 0, 1) * (1 - xf) + c(1, 0, 1) * xf;
  const x11 = c(0, 1, 1) * (1 - xf) + c(1, 1, 1) * xf;
  const y0 = x00 * (1 - yf) + x10 * yf;
  const y1 = x01 * (1 - yf) + x11 * yf;
  return (y0 * (1 - zf) + y1 * zf) * 2 - 1;
}
const surfaceNoise = (x, y, z) =>
  valueNoise(x / 30, y / 30, z / 30) * 0.8 + valueNoise(x / 11, y / 11, z / 11) * 0.22;

/* ---------- 外轮廓 ---------- */
const CONTROL = [
  [0, 0], [2, 24], [6, 40], [14, 47], [28, 50], [50, 52], [74, 55.5],
  [100, 58.5], [124, 56.5], [146, 50], [162, 47.5], [180, 51], [200, 57],
  [214, 56], [224, 48], [232, 35], [237, 20], [240, 0],
];
function resampleProfile(ctrl, step = 1.6) {
  const curve = new THREE.CatmullRomCurve3(
    ctrl.map(([y, r]) => new THREE.Vector3(r, y, 0)), false, 'centripetal', 0.5,
  );
  const n = Math.max(24, Math.round(curve.getLength() / step));
  const out = [];
  for (let i = 0; i <= n; i++) {
    const p = curve.getPoint(i / n);
    out.push([Math.max(0, p.x), Math.max(0, p.y)]);
  }
  return out;
}
const OUTER = resampleProfile(CONTROL);
const H = OUTER[OUTER.length - 1][1];

function radialProfileAt(profile, y) {
  for (let i = 0; i < profile.length - 1; i++) {
    const [r0, y0] = profile[i], [r1, y1] = profile[i + 1];
    if (y >= y0 && y <= y1) {
      const t = (y - y0) / Math.max(1e-9, y1 - y0);
      return r0 + (r1 - r0) * t;
    }
  }
  return 0;
}

/* ---------- 陶俑壳体：外实体 − 内实体（内实体在顶部穿出 → 形成开口） ---------- */
const WALL = 6.5;
const OUTER_TOP = H;
const INNER_BASE = 22;

function buildInnerProfile() {
  // 内腔：底部圆盘起步，内壁 = 外壁内缩 WALL，上部保持最小半径并从顶部穿出
  const pts = [[0, INNER_BASE], [Math.max(6, radialProfileAt(OUTER, INNER_BASE) - WALL), INNER_BASE]];
  for (let y = INNER_BASE + 4; y <= OUTER_TOP - 18; y += 4) {
    const r = Math.max(10, radialProfileAt(OUTER, y) - WALL);
    pts.push([r, y]);
  }
  const rTop = Math.max(radialProfileAt(OUTER, OUTER_TOP - 18) - WALL, 34);
  pts.push([rTop, OUTER_TOP - 12], [rTop + 2, OUTER_TOP + 12], [rTop * 0.72, OUTER_TOP + 26], [0, OUTER_TOP + 32]);
  return pts;
}

function makeVesselGeometry(profile, segments = 110) {
  const geo = revolveClosed(profile, segments);
  geo.scale(1.1, 1, 0.88);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const r = Math.hypot(v.x, v.z);
    if (r > 1.5) {
      const n = surfaceNoise(v.x, v.y, v.z);
      const k = 1 + n * 0.011;
      pos.setX(i, v.x * k);
      pos.setZ(i, v.z * k);
      pos.setY(i, v.y + n * 0.55);
    }
  }
  geo.computeVertexNormals();
  return geo;
}

function geometryToManifold(geo) {
  const posArr = geo.attributes.position.array;
  const idx = geo.index.array;
  const mesh = new Mesh({
    numProp: 3,
    vertProperties: new Float32Array(posArr),
    triVerts: Uint32Array.from(idx),
  });
  mesh.merge();
  return new Manifold(mesh);
}

console.log('构建陶俑壳体 ...');
const outerMan = geometryToManifold(makeVesselGeometry(OUTER));
const innerMan = geometryToManifold(makeVesselGeometry(buildInnerProfile()));
const shell = Manifold.difference(outerMan, innerMan);
outerMan.delete();
innerMan.delete();
const shellParts = shell.decompose();
const shellVol = shell.volume();
for (const p of shellParts) p.delete();
console.log('  shell', shell.status(), 'vol', shellVol.toFixed(0), 'tri', shell.numTri(), 'parts', shellParts.length);
if (shell.status() !== 'NoError' || shellParts.length !== 1) throw new Error('壳体构建失败');

/* ---------- Voronoi 分割 ---------- */
const SEEDS_ANGLE_HEIGHT = [
  [16, 38], [57, 196], [88, 104], [127, 218], [151, 34],
  [196, 152], [233, 206], [266, 78], [307, 168], [341, 58],
];
const bodyBox = shell.boundingBox();
const centerY = (bodyBox.min[1] + bodyBox.max[1]) / 2;

const seeds = SEEDS_ANGLE_HEIGHT.map(([deg, y]) => {
  const a = (deg * Math.PI) / 180;
  const rOuter = radialProfileAt(OUTER, y);
  const r = Math.max(8, rOuter - 1);
  return [Math.cos(a) * r * 1.1, y, Math.sin(a) * r * 0.88];
});



function voronoiCell(i) {
  let cell = Manifold.cube([560, 460, 460], true).translate([0, centerY, 0]);
  const si = seeds[i];
  for (let j = 0; j < seeds.length; j++) {
    if (j === i) continue;
    const sj = seeds[j];
    const n = [si[0] - sj[0], si[1] - sj[1], si[2] - sj[2]];
    const len = Math.hypot(n[0], n[1], n[2]);
    if (len < 1e-6) continue;
    n[0] /= len; n[1] /= len; n[2] /= len;
    const mid = [(si[0] + sj[0]) / 2, (si[1] + sj[1]) / 2, (si[2] + sj[2]) / 2];
    const offset = n[0] * mid[0] + n[1] * mid[1] + n[2] * mid[2];
    cell = cell.trimByPlane(n, offset);
  }
  return cell;
}

const pieces = [];
for (let i = 0; i < seeds.length; i++) {
  const cell = voronoiCell(i);
  const part = Manifold.intersection(shell, cell);
  cell.delete();
  if (part.status() !== 'NoError') { part.delete(); continue; }
  const comps = part.decompose().filter(c => c.volume() > 400);
  part.delete();
  for (const c of comps) {
    const b = c.boundingBox();
    const dim = [b.max[0] - b.min[0], b.max[1] - b.min[1], b.max[2] - b.min[2]];
    if (Math.min(...dim) < 7) { c.delete(); continue; }
    pieces.push(c);
  }
}
console.log('得到残片', pieces.length);
if (pieces.length < 4) throw new Error('残片数量不足');

/* ---------- 写二进制 STL ---------- */
const PALETTE = [
  '#c88a5e', '#bf7f55', '#d19a6b', '#b4744e', '#c98f66',
  '#a96848', '#d5a274', '#c07c52', '#b9865f', '#cc9269', '#a97a58',
];

function writeBinarySTL(file, positions, index, header) {
  const triCount = index.length / 3;
  const buf = Buffer.alloc(84 + 50 * triCount);
  buf.write(header.slice(0, 79), 0, 80, 'ascii');
  buf.writeUInt32LE(triCount, 80);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const ab = new THREE.Vector3(), ac = new THREE.Vector3(), n = new THREE.Vector3();
  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const i0 = index[t * 3] * 3, i1 = index[t * 3 + 1] * 3, i2 = index[t * 3 + 2] * 3;
    a.fromArray(positions, i0); b.fromArray(positions, i1); c.fromArray(positions, i2);
    ab.subVectors(b, a); ac.subVectors(c, a); n.crossVectors(ab, ac).normalize();
    buf.writeFloatLE(n.x, o); buf.writeFloatLE(n.y, o + 4); buf.writeFloatLE(n.z, o + 8); o += 12;
    for (const p of [a, b, c]) {
      buf.writeFloatLE(p.x, o); buf.writeFloatLE(p.y, o + 4); buf.writeFloatLE(p.z, o + 8); o += 12;
    }
    buf.writeUInt16LE(0, o); o += 2;
  }
  fs.writeFileSync(file, buf);
}

pieces.sort((p, q) => p.volume() - q.volume());
const manifestShards = [];
pieces.forEach((piece, i) => {
  const mesh = piece.getMesh();
  const pos = Float32Array.from(mesh.vertProperties);
  const tri = Uint32Array.from(mesh.triVerts);

  // 质心（面积加权）
  let cx = 0, cy = 0, cz = 0, wsum = 0;
  for (let t = 0; t < tri.length; t += 3) {
    const ia = tri[t] * 3, ib = tri[t + 1] * 3, ic = tri[t + 2] * 3;
    const ax = pos[ia], ay = pos[ia + 1], az = pos[ia + 2];
    const bx = pos[ib], by = pos[ib + 1], bz = pos[ib + 2];
    const qx = pos[ic], qy = pos[ic + 1], qz = pos[ic + 2];
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const vx = qx - ax, vy = qy - ay, vz = qz - az;
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const w = Math.hypot(nx, ny, nz) * 0.5;
    cx += ((ax + bx + qx) / 3) * w;
    cy += ((ay + by + qy) / 3) * w;
    cz += ((az + bz + qz) / 3) * w;
    wsum += w;
  }
  cx /= wsum; cy /= wsum; cz /= wsum;
  const local = new Float32Array(pos.length);
  for (let k = 0; k < pos.length; k += 3) {
    local[k] = pos[k] - cx;
    local[k + 1] = pos[k + 1] - cy;
    local[k + 2] = pos[k + 2] - cz;
  }
  const file = `shard-${String(i + 1).padStart(2, '0')}.stl`;
  writeBinarySTL(path.join(OUT, file), local, tri, 'Pottery shard - virtual reassembly demo');

  // 散开姿态：质心沿躯干中轴方向外推
  const dx = cx, dz = cz, dy = cy - 120;
  const dl = Math.hypot(dx, dy, dz) || 1;
  const dist = 90 + 45 * Math.abs(Math.sin(i * 2.1 + 0.7));
  const exploded = [cx + (dx / dl) * dist, cy + (dy / dl) * dist * 0.5 + 8, cz + (dz / dl) * dist];
  const rr = () => rng() * 2 - 1;

  manifestShards.push({
    file,
    name: `残片 ${String(i + 1).padStart(2, '0')}`,
    color: PALETTE[i % PALETTE.length],
    triangleCount: tri.length / 3,
    volume: +piece.volume().toFixed(0),
    truePose: { position: [cx, cy, cz], rotation: [0, 0, 0] },
    explodedPose: {
      position: exploded.map(v => +v.toFixed(2)),
      rotation: [+(rr() * 12).toFixed(1), +(rr() * 24).toFixed(1), +(rr() * 12).toFixed(1)],
    },
  });
  piece.delete();
});

const manifest = {
  name: '陶俑躯干 · 虚拟复原示例',
  units: 'mm',
  description: '程序化生成的中空陶俑躯干，按 Voronoi 分割为多片，每片均为水密实体网格，可直接进行实体布尔合并。',
  shards: manifestShards,
};
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('已写出', manifestShards.length, '片 →', OUT);
