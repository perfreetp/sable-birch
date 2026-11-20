import type * as THREE from 'three';

export type Vec3 = [number, number, number];

/** 残片的原始几何数据（加载后不变） */
export interface ShardSource {
  id: string;
  name: string;
  color: string;
  /** 焊接后的索引几何，位于「残片局部坐标系」 */
  geometry: THREE.BufferGeometry;
  triangleCount: number;
  volume: number;
  /** 包围盒对角线长度，用于尺度相关阈值 */
  diagonal: number;
  /** 最近距离采样点（局部坐标），用于相邻片快速距离评估 */
  samplePoints: Float32Array;
}

export interface Pose {
  position: Vec3;
  /** 欧拉角 XYZ，单位：度 */
  rotation: Vec3;
}

export interface ShardInstance {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  opacity: number;
  pose: Pose;
  /** 是否已被并入合并结果 */
  mergedInto: string | null;
}

/** 三点点选对齐的一次记录 */
export interface AlignmentTriple {
  /** 固定片 */
  fixedId: string;
  /** 移动片 */
  movingId: string;
  fixedPoints: Vec3[];
  movingPoints: Vec3[];
  /** 沿法向微调量 mm */
  normalOffset: number;
}

export interface BreakFacePair {
  a: string;
  b: string;
  distance: number;
}

export interface GapBin {
  /** 区间下界（含） */
  from: number;
  /** 区间上界（不含） */
  to: number;
  count: number;
}

export interface SeamSample {
  point: Vec3;
  distance: number;
}

export interface MergeReport {
  id: string;
  createdAt: number;
  mergedIds: string[];
  triangleCount: number;
  vertexCount: number;
  volume: number;
  /** 合并结果的局部几何（可能是多个连通部件） */
  components: number;
  gap: {
    sampleCount: number;
    min: number;
    max: number;
    mean: number;
    median: number;
    p90: number;
    p99: number;
    /** 大于阈值的缝隙采样数 */
    overThreshold: number;
    threshold: number;
    histogram: GapBin[];
    samples: SeamSample[];
  } | null;
  selfIntersection: {
    checked: boolean;
    badTriangleCount: number;
    /** 问题三角形在合并几何中的索引列表（抽样上限） */
    badTriangles: number[];
  };
}

export interface IssueMeshData {
  positions: Float32Array;
  triangleCount: number;
}

export interface ShardProblem {
  /** 该残片在合并前自交检查中检出的问题面数量 */
  count: number;
  /** 问题面几何（世界坐标） */
  geometry: THREE.BufferGeometry | null;
  /** 扫描是否已完成 */
  scanned: boolean;
}
