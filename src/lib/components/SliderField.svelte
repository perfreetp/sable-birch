<script lang="ts">
  interface Props {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    oninput: (v: number) => void;
  }
  let { label, value, min, max, step = 0.01, unit = '', oninput }: Props = $props();
</script>

<label class="field">
  <span class="lbl">
    {label}
    <em>{unit}</em>
  </span>
  <div class="row">
    <input
      type="range"
      {min}
      {max}
      {step}
      bind:value
      oninput={(e) => oninput(Number(e.currentTarget.value))}
    />
    <input
      class="num"
      type="number"
      {min}
      {max}
      {step}
      bind:value
      oninput={(e) => oninput(Number(e.currentTarget.value))}
    />
  </div>
</label>

<style>
  .field {
    display: block;
    margin-bottom: 12px;
  }
  .lbl {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #9fc0d6;
    margin-bottom: 4px;
  }
  .lbl em {
    color: #5d7d94;
    font-style: normal;
    font-size: 11px;
  }
  .row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  input[type='range'] {
    flex: 1;
    accent-color: #38a3c6;
  }
  .num {
    width: 84px;
    background: #0c141c;
    border: 1px solid #2c4255;
    color: #e8edf2;
    border-radius: 5px;
    padding: 4px 6px;
    font-size: 12px;
  }
</style>
