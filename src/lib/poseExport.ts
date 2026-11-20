import * as THREE from 'three';
import { store, toast } from './store.ts';
import { buildBinarySTL, buildOBJ, downloadBlob, downloadText, downloadZip } from './exporters.ts';
import type { MergeReport } from './types.ts';

/** 位姿清单（拼合位姿列表） */
export function buildPoseManifest() {
  const s = store.getState();
  return {
    format: 'pottery-shard-pose-manifest',
    version: 1,
    units: 'mm',
    exportedAt: new Date().toISOString(),
    coordinateSystem: {
      description: '右手坐标系，Y 轴向上；position 为残片局部原点在世界坐标中的位置，rotation 为 XYZ 顺序欧拉角（度）',
    },
    precision: {
      translationStepMM: 1,
      rotationStepDeg: 0.5,
      normalMicroAdjustRangeMM: [0, 20],
    },
    shards: s.order
      .map(id => {
        const inst = s.instances[id];
        const src = s.shards.find(x => x.id === id);
        if (!inst || !src) return null;
        return {
          id,
          name: inst.name,
          file: `${src.name}.stl`,
          visible: inst.visible,
          opacity: inst.opacity,
          pose: {
            position: inst.pose.position.map(v => round(v, 3)),
            rotation: inst.pose.rotation.map(v => round(v, 3)),
            matrix4: matrixToRowMajor(inst.pose),
          },
          mergedInto: inst.mergedInto,
        };
      })
      .filter(Boolean),
    alignments: s.alignment ? [s.alignment] : [],
    merges: s.reports.map(r => ({
      id: r.id,
      createdAt: new Date(r.createdAt).toISOString(),
      mergedIds: r.mergedIds,
      triangleCount: r.triangleCount,
      volume: r.volume,
      components: r.components,
      seamGap: r.gap ? {
        sampleCount: r.gap.sampleCount,
        min: round(r.gap.min, 4),
        mean: round(r.gap.mean, 4),
        median: round(r.gap.median, 4),
        p90: round(r.gap.p90, 4),
        p99: round(r.gap.p99, 4),
        max: round(r.gap.max, 4),
        threshold: r.gap.threshold,
        overThreshold: r.gap.overThreshold,
        histogram: r.gap.histogram,
      } : null,
    })),
  };
}

function matrixToRowMajor(pose: { position: number[]; rotation: number[] }) {
  const e = new THREE.Euler(
    (pose.rotation[0] * Math.PI) / 180,
    (pose.rotation[1] * Math.PI) / 180,
    (pose.rotation[2] * Math.PI) / 180,
    'XYZ',
  );
  const m = new THREE.Matrix4().compose(
    new THREE.Vector3(pose.position[0], pose.position[1], pose.position[2]),
    new THREE.Quaternion().setFromEuler(e),
    new THREE.Vector3(1, 1, 1),
  );
  const out: number[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) out.push(round(m.elements[c * 4 + r], 6));
  }
  return out;
}

function round(v: number, digits: number) {
  const p = 10 ** digits;
  return Math.round(v * p) / p;
}

/** 导出合并结果：单一网格文件 + 位姿清单 */
export function exportMerge(format: 'stl' | 'obj' | 'zip' = 'zip') {
  const s = store.getState();
  const report = s.reports.find(r => r.id === s.activeReport) ?? s.reports[0];
  const geometry = s.mergedGeometry
    ?? (report ? (report as MergeReport & { geometry?: THREE.BufferGeometry }).geometry : undefined);
  if (!report || !geometry) {
    toast('还没有可导出的合并结果，请先执行合并', 'error');
    return;
  }

  const pos = geometry.attributes.position.array as Float32Array;
  const indexAttr = geometry.index;
  const index = indexAttr
    ? Uint32Array.from(indexAttr.array as Uint32Array)
    : new Uint32Array(pos.length / 3).map((_, i) => i);

  const stamp = new Date().toISOString().slice(0, 10);
  const manifest = buildPoseManifest();
  const manifestText = JSON.stringify(manifest, null, 2);

  if (format === 'obj') {
    downloadText(`merged-seams-${stamp}.obj`, buildOBJ(pos, index, 'merged_shards'), 'text/plain');
    downloadText(`pose-manifest-${stamp}.json`, manifestText);
    toast('已导出 OBJ 网格与位姿清单', 'ok');
    return;
  }

  const stl = buildBinarySTL(pos, index, 'pottery shard merge result');
  if (format === 'stl') {
    downloadBlob(`merged-seams-${stamp}.stl`, new Blob([stl as unknown as BlobPart], { type: 'model/stl' }));
    downloadText(`pose-manifest-${stamp}.json`, manifestText);
    toast('已导出 STL 网格与位姿清单', 'ok');
    return;
  }

  // ZIP: 合并网格 (STL + OBJ) + 位姿清单 + 缝隙报告
  const gapReport = report.gap
    ? JSON.stringify({ ...report.gap, samples: [`（${report.gap.samples.length} 个显示采样已省略）`] }, null, 2)
    : '{}';
  downloadZip(`virtual-restoration-${stamp}.zip`, {
    'merged.stl': stl,
    'merged.obj': buildOBJ(pos, index, 'merged_shards'),
    'pose-manifest.json': manifestText,
    'seam-gap-report.json': gapReport,
    'README.txt': [
      '陶俑残片虚拟复原 — 合并结果导出',
      `导出时间：${new Date().toLocaleString('zh-CN')}`,
      '',
      `合并残片：${report.mergedIds.join(', ')}`,
      `三角形数：${report.triangleCount}`,
      `连通体数量：${report.components}`,
      `实体体积：${round(report.volume, 2)} mm³`,
      '',
      '文件说明：',
      '  merged.stl          合并后的单一网格（二进制 STL，世界坐标）',
      '  merged.obj          同一网格的 OBJ 版本',
      '  pose-manifest.json  每片残片的拼合位姿（位置/欧拉角/矩阵）与精度设置',
      '  seam-gap-report.json 拼缝缝隙宽度统计与直方图',
    ].join('\n'),
  });
  toast('已导出 ZIP（合并网格 + 位姿清单 + 缝隙报告）', 'ok');
}

/** 只导出位姿清单 */
export function exportPoses() {
  const stamp = new Date().toISOString().slice(0, 10);
  downloadText(`pose-manifest-${stamp}.json`, JSON.stringify(buildPoseManifest(), null, 2));
  toast('已导出拼合位姿清单', 'ok');
}

/** 复制位姿清单到剪贴板 */
export async function copyPoseManifest() {
  try {
    await navigator.clipboard.writeText(JSON.stringify(buildPoseManifest(), null, 2));
    toast('位姿清单已复制到剪贴板', 'ok');
  } catch {
    toast('复制失败：浏览器拒绝了剪贴板访问', 'error');
  }
}
