import * as THREE from 'three';
import { parseSTL, weldGeometry, geometryVolume } from './stl.ts';
import { normalizeGeometry, sampleSurfacePoints } from './geometry.ts';
import { registerShards, store, toast } from './store.ts';
import type { Pose, ShardSource } from './types.ts';

const PALETTE = [
  '#c88a5e', '#bf7f55', '#d19a6b', '#b4744e', '#c98f66',
  '#a96848', '#d5a274', '#c07c52', '#b9865f', '#cc9269', '#a97a58', '#8f6a4c',
];

interface DemoManifest {
  name: string;
  shards: {
    file: string;
    name: string;
    color: string;
    triangleCount: number;
    volume: number;
    truePose: Pose;
    explodedPose: Pose;
  }[];
}

export interface LoadOptions {
  /** 是否用散开的初始摆放（false = 直接摆到复原位） */
  exploded: boolean;
}

let demoCache: DemoManifest | null = null;

export async function loadDemoScene(opts: LoadOptions = { exploded: true }) {
  const res = await fetch('/demo/manifest.json');
  if (!res.ok) throw new Error(`无法读取示例清单（HTTP ${res.status}）`);
  const manifest: DemoManifest = await res.json();
  demoCache = manifest;

  const sources: ShardSource[] = [];
  const poses: Record<string, Pose> = {};

  for (let i = 0; i < manifest.shards.length; i++) {
    const entry = manifest.shards[i];
    const id = `demo-${String(i + 1).padStart(2, '0')}`;
    const buf = await (await fetch(`/demo/${entry.file}`)).arrayBuffer();
    const { geometry } = parseSTL(buf);
    const welded = weldGeometry(geometry, 1e-4);
    geometry.dispose();

    const source: ShardSource = {
      id,
      name: entry.name,
      color: entry.color,
      geometry: welded,
      triangleCount: welded.index ? welded.index.count / 3 : welded.attributes.position.count / 3,
      volume: geometryVolume(welded),
      diagonal: boundingDiagonal(welded),
      samplePoints: sampleSurfacePoints(welded, 700),
    };
    sources.push(source);
    poses[id] = opts.exploded ? entry.explodedPose : entry.truePose;
  }

  // 用新数据整体替换
  clearAll();
  registerShards(sources, poses);
  store.setState({ shards: sources });
  return poses;
}

export function demoPoses(mode: 'true' | 'exploded'): Record<string, Pose> {
  const out: Record<string, Pose> = {};
  if (!demoCache) return out;
  demoCache.shards.forEach((s, i) => {
    const id = `demo-${String(i + 1).padStart(2, '0')}`;
    out[id] = mode === 'true' ? s.truePose : s.explodedPose;
  });
  return out;
}

export function hasDemoLoaded() {
  return store.getState().order.some(id => id.startsWith('demo-'));
}

function boundingDiagonal(g: THREE.BufferGeometry) {
  g.computeBoundingBox();
  const size = new THREE.Vector3();
  g.boundingBox!.getSize(size);
  return size.length();
}

export function clearAll() {
  const st = store.getState();
  for (const s of st.shards) s.geometry.dispose();
  store.setState({
    shards: [], instances: {}, order: [], selected: null, compareId: null,
    neighborPair: null, liveDistance: null, reports: [], activeReport: null,
    mergedGeometry: null, problems: {}, alignment: null, alignmentStatus: '',
  });
}

/** 导入用户文件（STL / OBJ） */
export async function importFiles(files: File[], options: { normalize: boolean; exploded: boolean }) {
  if (!files.length) return;
  const existing = store.getState().shards.length;
  const sources: ShardSource[] = [];
  const poses: Record<string, Pose> = {};

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split('.').pop()?.toLowerCase();
    let geometry: THREE.BufferGeometry;
    try {
      if (ext === 'stl') {
        const buf = await file.arrayBuffer();
        geometry = parseSTL(buf).geometry;
      } else if (ext === 'obj') {
        geometry = parseOBJ(await file.text());
      } else {
        toast(`不支持的文件类型：${file.name}`, 'error');
        continue;
      }
    } catch (err) {
      toast(`读取 ${file.name} 失败：${err instanceof Error ? err.message : String(err)}`, 'error');
      continue;
    }

    let welded = weldGeometry(geometry, 1e-4);
    geometry.dispose();
    if (welded.index) {
      // 统一为三角形
      if (welded.index.count % 3 !== 0) {
        toast(`${file.name} 含非三角形面，已忽略多余部分`, 'info');
      }
    }

    if (options.normalize) {
      normalizeGeometry(welded, 110);
    }

    const idx = ++importCounter;
    const id = `import-${Date.now()}-${idx}`;
    sources.push({
      id,
      name: file.name.replace(/\.(stl|obj)$/i, ''),
      color: PALETTE[(existing + sources.length) % PALETTE.length],
      geometry: welded,
      triangleCount: welded.index ? welded.index.count / 3 : welded.attributes.position.count / 3,
      volume: geometryVolume(welded),
      diagonal: boundingDiagonal(welded),
      samplePoints: sampleSurfacePoints(welded, 700),
    });
    // 导入的残片按散开方式摆放（螺旋分布），避免互相重叠
    const k = existing + sources.length - 1;
    const angle = k * 2.399963229728653;
    const radius = options.exploded ? 55 + 14 * Math.sqrt(k) : 0;
    poses[id] = {
      position: [Math.cos(angle) * radius, 60 + (k % 3) * 24, Math.sin(angle) * radius],
      rotation: [0, (k * 37) % 360, 0],
    };
  }

  if (sources.length) {
    registerShards(sources, poses);
    toast(`已导入 ${sources.length} 片残片`, 'ok');
  }
}

let importCounter = 0;

function parseOBJ(text: string): THREE.BufferGeometry {
  const positions: number[] = [];
  const verts: number[][] = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('v ')) {
      const p = t.slice(2).trim().split(/\s+/).map(Number);
      if (p.length >= 3) verts.push(p);
    } else if (t.startsWith('f ')) {
      const parts = t.slice(2).trim().split(/\s+/);
      const ids = parts.map(p => parseInt(p.split('/')[0], 10)).filter(n => !Number.isNaN(n));
      for (let i = 1; i + 1 < ids.length; i++) {
        for (const id of [ids[0], ids[i], ids[i + 1]]) {
          const v = verts[id - 1] ?? verts[verts.length + id];
          if (!v) continue;
          positions.push(v[0], v[1], v[2]);
        }
      }
    }
  }
  if (positions.length < 9) throw new Error('OBJ 中没有可用三角形');
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.computeVertexNormals();
  return g;
}
