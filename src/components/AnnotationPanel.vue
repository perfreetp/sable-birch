<script setup lang="ts">
import { useViewerStore } from '@/stores/viewer'

const emit = defineEmits<{ (e: 'goto-bookmark', id: string): void }>()

const store = useViewerStore()

const colors = ['#ffb020', '#5aa7e8', '#6fcf97', '#e06a6a', '#c792ea', '#f0f0f0']

function fmtTime(ts: number): string {
  const d = new Date(ts)
  const pad = (n: number): string => String(n).padStart(2, '0')
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function fmtVec(v: { x: number; y: number; z: number }): string {
  return `(${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)})`
}

function focus(id: string): void {
  store.selectAnnotation(id)
  window.dispatchEvent(new CustomEvent('annotation-focus', { detail: id }))
}
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      标注列表
      <span style="font-weight: 400; text-transform: none; color: var(--fg-2)">
        {{ store.annotations.length }} 个锚点 · 局部坐标
      </span>
    </div>
    <div class="panel-body">
      <div v-if="store.annotations.length === 0" class="empty-list">
        暂无标注点<br />
        点击视口左上角「表面点选标注」，<br />
        在模型表面点击即可生成贴合表面的锚点
      </div>

      <div
        v-for="ann in store.annotations"
        :key="ann.id"
        class="list-item"
        :class="{ selected: store.selectedAnnotationId === ann.id }"
        @click="focus(ann.id)"
      >
        <div class="row">
          <i class="swatch" :style="{ background: ann.color }"></i>
          <input
            type="text"
            :value="ann.title"
            style="flex: 1"
            @click.stop
            @input="store.updateAnnotation(ann.id, { title: ($event.target as HTMLInputElement).value })"
          />
          <button class="danger icon-btn" title="删除标注" @click.stop="store.removeAnnotation(ann.id)">✕</button>
        </div>
        <textarea
          :value="ann.note"
          rows="2"
          placeholder="备注（可选）"
          style="margin-top: 7px; resize: vertical"
          @click.stop
          @input="store.updateAnnotation(ann.id, { note: ($event.target as HTMLTextAreaElement).value })"
        ></textarea>
        <div class="meta-text">
          局部位置 {{ fmtVec(ann.position) }}<br />
          法线 {{ fmtVec(ann.normal) }} · {{ fmtTime(ann.createdAt) }}
        </div>
        <div class="row" style="margin-top: 7px">
          <span style="color: var(--fg-2); font-size: 11px">标记颜色</span>
          <span
            v-for="c in colors"
            :key="c"
            class="swatch"
            :style="{ background: c, outline: ann.color === c ? '2px solid #fff' : 'none', cursor: 'pointer' }"
            @click.stop="store.updateAnnotation(ann.id, { color: c })"
          ></span>
        </div>
      </div>

      <div class="section-label">视角书签（{{ store.bookmarks.length }}）</div>
      <div v-if="store.bookmarks.length === 0" class="empty-list" style="padding: 10px">
        顶栏「存书签」可保存当前相机位姿与纹理档位
      </div>
      <div
        v-for="bm in store.bookmarks"
        :key="bm.id"
        class="list-item"
      >
        <div class="row">
          <span style="flex: 1">📍 {{ bm.name }}</span>
          <span class="value-badge" style="font-size: 11px">{{ bm.tier }} 档</span>
        </div>
        <input
          type="text"
          :value="bm.name"
          style="margin-top: 6px"
          @input="store.renameBookmark(bm.id, ($event.target as HTMLInputElement).value)"
        />
        <div class="row" style="margin-top: 7px">
          <button style="flex: 1" @click="emit('goto-bookmark', bm.id)">↺ 回到此位姿</button>
          <button class="danger icon-btn" @click="store.removeBookmark(bm.id)">✕</button>
        </div>
      </div>
    </div>
  </section>
</template>
