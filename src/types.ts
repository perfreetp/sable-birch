/** 展品模型描述:程序化模型或外部 glTF */
export type ModelDef =
  | { type: 'procedural'; shape: 'ding' | 'vase' | 'buddha' | 'jade' | 'sword' }
  | { type: 'gltf'; url: string };

/** 展柜热点(角度制,便于配置与导出) */
export interface HotspotDef {
  /** 水平角,度,-180 ~ 180 */
  yaw: number;
  /** 俯仰角,度,-60 ~ 60 */
  pitch: number;
}

export interface Exhibit {
  id: string;
  name: string;
  era: string;
  description: string;
  hotspot: HotspotDef;
  model: ModelDef;
}

/** 漫游路径点:相机朝向 + 缩放级别(0-100) */
export interface PathPoint {
  yaw: number;
  pitch: number;
  zoom: number;
}

export interface GalleryConfig {
  title: string;
  panorama: string;
  exhibits: Exhibit[];
  path: PathPoint[];
}

/** 导出文件格式 */
export interface GalleryExport {
  version: 1;
  title: string;
  panorama: string;
  exportedAt: string;
  hotspots: Array<{ id: string; name: string; yaw: number; pitch: number }>;
  models: Array<{ id: string; name: string } & ModelDef>;
  path: PathPoint[];
}
