import { store, type LayerId, type BlendMode } from '../state';

const LAYER_NAMES: Record<LayerId, string> = {
  far: '远景',
  mid: '中景',
  near: '近景',
};

const BLEND_OPTIONS: { value: BlendMode; label: string }[] = [
  { value: 'normal', label: '正常' },
  { value: 'overlay', label: '叠加' },
  { value: 'screen', label: '滤色' },
];

/**
 * 图层面板：拖拽调整图层顺序（列表顶部 = 合成最顶层），
 * 每层独立的不透明度滑条与混合模式下拉框。
 */
export class LayerPanel extends HTMLElement {
  private list!: HTMLDivElement;
  private dragId: LayerId | null = null;
  private lastOrder = '';

  connectedCallback() {
    this.innerHTML = `
      <section class="card">
        <h2>视景图层 <span class="hint">（顶部为最上层，拖拽排序）</span></h2>
        <div class="layer-list"></div>
      </section>`;
    this.list = this.querySelector('.layer-list')!;
    store.subscribe(() => this.sync());
    this.sync();
  }

  /** 显示顺序：合成最顶层排在列表最上面 */
  private displayLayers() {
    return [...store.get().layers].reverse();
  }

  private sync() {
    const layers = this.displayLayers();
    const order = layers.map((l) => l.id).join(',');
    if (order !== this.lastOrder) {
      this.lastOrder = order;
      this.rebuild(layers);
    } else {
      // 只更新控件值，避免打断正在拖动的滑条
      for (const l of layers) {
        const row = this.list.querySelector<HTMLElement>(`[data-id="${l.id}"]`);
        if (!row) continue;
        const range = row.querySelector<HTMLInputElement>('input[type="range"]')!;
        const value = row.querySelector<HTMLElement>('.opacity-value')!;
        const select = row.querySelector<HTMLSelectElement>('select')!;
        if (document.activeElement !== range) range.value = String(l.opacity);
        value.textContent = l.opacity.toFixed(2);
        select.value = l.blendMode;
      }
    }
  }

  private rebuild(layers: ReturnType<LayerPanel['displayLayers']>) {
    this.list.innerHTML = '';
    for (const layer of layers) {
      const row = document.createElement('div');
      row.className = 'layer-row';
      row.dataset.id = layer.id;
      row.draggable = true;
      row.innerHTML = `
        <span class="drag-handle" title="拖拽调整顺序">⠿</span>
        <span class="layer-name">${LAYER_NAMES[layer.id]}</span>
        <input type="range" min="0" max="1" step="0.01" value="${layer.opacity}" />
        <span class="opacity-value">${layer.opacity.toFixed(2)}</span>
        <select>
          ${BLEND_OPTIONS.map(
            (o) =>
              `<option value="${o.value}"${o.value === layer.blendMode ? ' selected' : ''}>${o.label}</option>`,
          ).join('')}
        </select>`;

      row.querySelector<HTMLInputElement>('input[type="range"]')!.addEventListener(
        'input',
        (e) => {
          const opacity = Number((e.target as HTMLInputElement).value);
          this.updateLayer(layer.id, { opacity });
        },
      );
      row.querySelector('select')!.addEventListener('change', (e) => {
        this.updateLayer(layer.id, {
          blendMode: (e.target as HTMLSelectElement).value as BlendMode,
        });
      });

      row.addEventListener('dragstart', (e) => {
        this.dragId = layer.id;
        row.classList.add('dragging');
        e.dataTransfer!.effectAllowed = 'move';
      });
      row.addEventListener('dragend', () => {
        this.dragId = null;
        row.classList.remove('dragging');
        this.clearDropMarks();
      });
      row.addEventListener('dragover', (e) => {
        if (!this.dragId || this.dragId === layer.id) return;
        e.preventDefault();
        e.dataTransfer!.dropEffect = 'move';
        this.clearDropMarks();
        const rect = row.getBoundingClientRect();
        row.classList.add(e.clientY < rect.top + rect.height / 2 ? 'drop-above' : 'drop-below');
      });
      row.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!this.dragId || this.dragId === layer.id) return;
        const rect = row.getBoundingClientRect();
        const before = e.clientY < rect.top + rect.height / 2;
        this.reorder(this.dragId, layer.id, before);
      });

      this.list.appendChild(row);
    }
  }

  private updateLayer(id: LayerId, patch: Partial<{ opacity: number; blendMode: BlendMode }>) {
    store.setLayers(store.get().layers.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  /** 把 dragId 移动到 targetId 的上方/下方（显示顺序），再换算回合成顺序 */
  private reorder(dragId: LayerId, targetId: LayerId, before: boolean) {
    const display = this.displayLayers().map((l) => l.id);
    const from = display.indexOf(dragId);
    display.splice(from, 1);
    let to = display.indexOf(targetId);
    if (!before) to += 1;
    display.splice(to, 0, dragId);
    const compositeOrder = display.reverse(); // 显示顺序倒序 = 底→顶合成顺序
    const layers = compositeOrder.map(
      (id) => store.get().layers.find((l) => l.id === id)!,
    );
    store.setLayers(layers);
  }

  private clearDropMarks() {
    this.list
      .querySelectorAll('.drop-above, .drop-below')
      .forEach((el) => el.classList.remove('drop-above', 'drop-below'));
  }
}

customElements.define('tv-layer-panel', LayerPanel);
