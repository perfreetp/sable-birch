import type { GalleryConfig } from './types';
import { generateMuseumPanorama } from './panoTexture';

/**
 * 展厅数据。全景图为程序化生成的等距柱状投影图(equirectangular),
 * 替换为真实全景图时把 panorama 改为图片 URL 即可。
 */
export const exhibits: GalleryConfig['exhibits'] = [
  {
    id: 'bronze-ding',
    name: '青铜鼎',
    era: '商代晚期',
    description: '礼器,三足两耳,腹饰饕餮纹,为青铜铸造工艺巅峰之作。',
    hotspot: { yaw: -120, pitch: -8 },
    model: { type: 'procedural', shape: 'ding' }
  },
  {
    id: 'celadon-vase',
    name: '青瓷莲花尊',
    era: '南北朝',
    description: '釉色青润,器身堆塑莲瓣,体现早期青瓷的高超水准。',
    hotspot: { yaw: -55, pitch: -6 },
    model: { type: 'procedural', shape: 'vase' }
  },
  {
    id: 'stone-buddha',
    name: '石雕佛坐像',
    era: '北魏',
    description: '面相清癯,衣纹流畅,为北朝佛教造像典型样式。',
    hotspot: { yaw: 0, pitch: -4 },
    model: { type: 'procedural', shape: 'buddha' }
  },
  {
    id: 'jade-bi',
    name: '谷纹玉璧',
    era: '战国',
    description: '和田青玉,满饰谷纹,系礼天重器。',
    hotspot: { yaw: 60, pitch: -8 },
    model: { type: 'procedural', shape: 'jade' }
  },
  {
    id: 'bronze-sword',
    name: '错金铜剑',
    era: '春秋',
    description: '剑身错金铭文,历经两千余年仍锋利如初。',
    hotspot: { yaw: 135, pitch: -6 },
    model: { type: 'procedural', shape: 'sword' }
  }
];

/** 预设漫游路径点(沿展厅主参观动线) */
export const path: GalleryConfig['path'] = [
  { yaw: -150, pitch: 0, zoom: 45 },
  { yaw: -95, pitch: -2, zoom: 50 },
  { yaw: -30, pitch: 0, zoom: 48 },
  { yaw: 30, pitch: -2, zoom: 52 },
  { yaw: 95, pitch: 0, zoom: 48 },
  { yaw: 160, pitch: -2, zoom: 45 }
];

export function createGalleryConfig(): GalleryConfig {
  return {
    title: '古代文明展厅',
    panorama: generateMuseumPanorama(exhibits),
    exhibits,
    path
  };
}
