import {
  store,
  exportStateToFile,
  importStateFromJson,
  DEFAULT_STATE,
} from '../state';

/**
 * 控制面板：雾效强度、昼夜切换、色温、相机俯仰/偏航、
 * 预设的导出 / 导入 / 重置。
 */
export class ControlPanel extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="card">
        <h2>环境与相机</h2>

        <label class="field">
          <span>雾效强度 <output data-out="fog"></output></span>
          <input type="range" data-key="fog" min="0" max="1" step="0.01" />
        </label>

        <label class="field field-inline">
          <span>昼夜</span>
          <button type="button" class="toggle" data-role="night"></button>
        </label>

        <label class="field">
          <span>色温 <output data-out="colorTemp"></output></span>
          <input type="range" data-key="colorTemp" min="2000" max="8000" step="50" />
        </label>

        <label class="field">
          <span>相机俯仰 <output data-out="pitch"></output></span>
          <input type="range" data-key="pitch" min="-30" max="30" step="0.5" />
        </label>

        <label class="field">
          <span>相机偏航 <output data-out="yaw"></output></span>
          <input type="range" data-key="yaw" min="-60" max="60" step="0.5" />
        </label>
      </section>

      <section class="card">
        <h2>预设</h2>
        <div class="actions">
          <button type="button" data-role="export">导出 JSON</button>
          <button type="button" data-role="import">导入 JSON</button>
          <button type="button" data-role="reset">重置</button>
        </div>
        <input type="file" accept="application/json,.json" data-role="file" hidden />
        <p class="status" data-role="status"></p>
      </section>`;

    for (const input of this.querySelectorAll<HTMLInputElement>('input[type="range"]')) {
      input.addEventListener('input', () => {
        store.update({ [input.dataset.key!]: Number(input.value) });
      });
    }

    this.querySelector('[data-role="night"]')!.addEventListener('click', () => {
      store.update({ night: !store.get().night });
    });

    this.querySelector('[data-role="export"]')!.addEventListener('click', () => {
      exportStateToFile();
      this.flash('已导出预设文件');
    });

    const fileInput = this.querySelector<HTMLInputElement>('[data-role="file"]')!;
    this.querySelector('[data-role="import"]')!.addEventListener('click', () => {
      fileInput.click();
    });
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      fileInput.value = '';
      if (!file) return;
      const ok = importStateFromJson(await file.text());
      this.flash(ok ? '导入成功，已还原合成状态' : '导入失败：文件格式不正确', !ok);
    });

    this.querySelector('[data-role="reset"]')!.addEventListener('click', () => {
      store.replace(structuredClone(DEFAULT_STATE));
      this.flash('已重置为默认状态');
    });

    store.subscribe(() => this.sync());
    this.sync();
  }

  private sync() {
    const s = store.get();
    const set = (key: string, value: number) => {
      const input = this.querySelector<HTMLInputElement>(`input[data-key="${key}"]`)!;
      if (document.activeElement !== input) input.value = String(value);
    };
    set('fog', s.fog);
    set('colorTemp', s.colorTemp);
    set('pitch', s.pitch);
    set('yaw', s.yaw);

    this.querySelector('[data-out="fog"]')!.textContent = s.fog.toFixed(2);
    this.querySelector('[data-out="colorTemp"]')!.textContent = `${s.colorTemp} K`;
    this.querySelector('[data-out="pitch"]')!.textContent = `${s.pitch.toFixed(1)}°`;
    this.querySelector('[data-out="yaw"]')!.textContent = `${s.yaw.toFixed(1)}°`;

    const toggle = this.querySelector<HTMLButtonElement>('[data-role="night"]')!;
    toggle.textContent = s.night ? '🌙 夜晚' : '☀️ 白天';
    toggle.classList.toggle('active', s.night);
  }

  private flash(msg: string, isError = false) {
    const el = this.querySelector<HTMLElement>('[data-role="status"]')!;
    el.textContent = msg;
    el.classList.toggle('error', isError);
    window.setTimeout(() => {
      if (el.textContent === msg) el.textContent = '';
    }, 3000);
  }
}

customElements.define('tv-control-panel', ControlPanel);
