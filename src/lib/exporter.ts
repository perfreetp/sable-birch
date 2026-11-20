import type { GalleryConfig, GalleryExport } from '../types';

/** 导出演播配置:全景引用 + 热点坐标 + 展品模型列表 + 路径点 */
export function buildExport(config: GalleryConfig): GalleryExport {
  return {
    version: 1,
    title: config.title,
    panorama: config.panorama.startsWith('data:')
      ? 'generated://equirect-museum-hall' // 程序化全景以引用代替内嵌数据
      : config.panorama,
    exportedAt: new Date().toISOString(),
    hotspots: config.exhibits.map((ex) => ({
      id: ex.id,
      name: ex.name,
      yaw: ex.hotspot.yaw,
      pitch: ex.hotspot.pitch
    })),
    models: config.exhibits.map((ex) => ({
      id: ex.id,
      name: ex.name,
      ...ex.model
    })),
    path: config.path
  };
}

export function downloadExport(config: GalleryConfig): void {
  const data = buildExport(config);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gallery-config.json';
  a.click();
  URL.revokeObjectURL(url);
}
