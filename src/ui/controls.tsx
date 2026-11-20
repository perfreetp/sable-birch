import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';

interface NumberFieldProps {
  label: string;
  value: number;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
  onInput: (v: number) => void;
  disabled?: boolean;
}

/** 带标签的数字输入框 */
export function NumberField(props: NumberFieldProps) {
  return (
    <label class="field">
      <span class="field-label">{props.label}</span>
      <span class="field-control">
        <input
          type="number"
          class="input"
          value={props.value}
          step={props.step ?? 1}
          min={props.min}
          max={props.max}
          disabled={props.disabled}
          onInput={(e) => {
            const v = Number((e.target as HTMLInputElement).value);
            if (Number.isFinite(v)) props.onInput(v);
          }}
        />
        {props.suffix && <span class="field-suffix">{props.suffix}</span>}
      </span>
    </label>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onInput: (v: string) => void;
}

export function TextField(props: TextFieldProps) {
  return (
    <label class="field">
      <span class="field-label">{props.label}</span>
      <input
        type="text"
        class="input"
        value={props.value}
        onInput={(e) => props.onInput((e.target as HTMLInputElement).value)}
      />
    </label>
  );
}

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onInput: (v: number) => void;
  disabled?: boolean;
}

export function SliderField(props: SliderFieldProps) {
  return (
    <label class="field">
      <span class="field-label">
        {props.label}
        <span class="slider-value">
          {props.value}
          {props.suffix ?? ''}
        </span>
      </span>
      <input
        type="range"
        class="slider"
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        disabled={props.disabled}
        onInput={(e) => props.onInput(Number((e.target as HTMLInputElement).value))}
      />
    </label>
  );
}

export function Section(props: { title: string; children: JSX.Element; extra?: JSX.Element }) {
  return (
    <section class="section">
      <header class="section-header">
        <h3>{props.title}</h3>
        {props.extra}
      </header>
      <div class="section-body">{props.children}</div>
    </section>
  );
}

export function Toggle(props: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  const [local] = splitProps(props, ['label']);
  return (
    <label class="toggle" classList={{ disabled: props.disabled }}>
      <input
        type="checkbox"
        checked={props.checked}
        disabled={props.disabled}
        onChange={(e) => props.onChange((e.target as HTMLInputElement).checked)}
      />
      <span class="toggle-track"><span class="toggle-thumb" /></span>
      {local.label && <span class="toggle-label">{local.label}</span>}
    </label>
  );
}

export function Button(props: {
  children: JSX.Element;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'danger' | 'ghost';
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      class={`btn btn-${props.variant ?? 'default'}`}
      disabled={props.disabled}
      title={props.title}
      onClick={() => props.onClick?.()}
    >
      {props.children}
    </button>
  );
}

/** 百分比文本（0~1 -> 12.3%） */
export function pct(v: number): string {
  return `${(v * 100).toFixed(1)}%`;
}
