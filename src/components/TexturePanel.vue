<script setup lang="ts">
import { computed } from 'vue'
import { useViewerStore } from '@/stores/viewer'

const store = useViewerStore()

const ambientPct = computed(() => Math.round(store.ambient * 50))
const tierQualityName = computed(() => {
  const names = ['极粗', '很粗', '较粗', '标准', '较精', '精细', '高精', '极精']
  return names[store.activeTier - 1]
})
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      纹理通道
      <span style="font-weight: 400; text-transform: none; color: var(--accent)">
        当前 {{ store.activeTier }}/8 档 · {{ tierQualityName }}
      </span>
    </div>
    <div class="panel-body">
      <div class="section-label">通道开关（可单独关闭观察细节）</div>

      <div class="switch-row">
        <div class="name">
          <span><i class="channel-dot" style="background: #d9a441"></i>漫反射 Diffuse</span>
          <small>基础颜色 / 锈蚀纹理</small>
        </div>
        <input type="checkbox" v-model="store.channelDiffuse" :disabled="!store.channelNormal" />
      </div>

      <div class="switch-row">
        <div class="name">
          <span><i class="channel-dot" style="background: #5aa7e8"></i>法线 Normal</span>
          <small>表面凹凸 / 雕刻细节</small>
        </div>
        <input type="checkbox" v-model="store.channelNormal" :disabled="!store.channelDiffuse" />
      </div>

      <p v-if="!store.channelDiffuse || !store.channelNormal" style="color: var(--fg-2); font-size: 11px; line-height: 1.6">
        至少保留一个通道开启。关闭漫反射后仅观察法线起伏，关闭法线后观察无凹凸光照的平面纹理。
      </p>

      <div class="section-label">环境光强度（0 - 2）</div>
      <div class="switch-row" style="cursor: default">
        <div class="name">
          <span>Ambient Light</span>
          <small>控制整体基础照明</small>
        </div>
        <span class="value-badge">{{ store.ambient.toFixed(2) }}</span>
      </div>
      <input type="range" min="0" max="2" step="0.01" v-model.number="store.ambient" />
      <div style="display: flex; justify-content: space-between; color: var(--fg-2); font-size: 10px">
        <span>0 · 暗部</span><span>1 · 标准</span><span>2 · 高亮</span>
      </div>

      <div class="section-label">纹理档位说明</div>
      <div style="color: var(--fg-2); font-size: 11px; line-height: 1.7">
        <p style="margin: 0 0 6px">
          档位 1-8 对应多级纹理的采样层级：低档强制采样粗 mipmap / 少量点，高档加载最深层节点与全分辨率纹理。
        </p>
        <p style="margin: 0">
          开启「随视距自动」后，引擎按相机到模型距离实时切换；框选放大局部区域时距离缩短，层级自动提升并重算。
        </p>
      </div>

      <div class="section-label">模型信息</div>
      <div style="color: var(--fg-1); font-size: 11px; line-height: 1.8; word-break: break-all">
        <template v-if="store.modelRef">
          <div>类型：{{ { gltf: 'glTF 网格', potree: 'potree 点云', demo: '内置演示' }[store.modelRef.kind] }}</div>
          <div>名称：{{ store.modelRef.name }}</div>
        </template>
        <div v-else style="color: var(--fg-2)">尚未加载模型</div>
      </div>
    </div>
  </section>
</template>
