import { useState } from 'react'
import { LaunchParams } from '../lib/types'
import { DEFAULT_LAUNCH_PARAMS } from '../lib/trajectory'

interface Props {
  initial: LaunchParams
  onGenerate: (p: LaunchParams) => void
  onImport: (file: File) => void
  computing: boolean
}

interface FieldSpec {
  key: keyof LaunchParams
  label: string
  unit: string
  min: number
  max: number
  step: number
  hint: string
}

const FIELDS: FieldSpec[] = [
  { key: 'longitude', label: '发射点经度', unit: '°', min: -180, max: 180, step: 0.01, hint: '东经为正' },
  { key: 'latitude', label: '发射点纬度', unit: '°', min: -90, max: 90, step: 0.01, hint: '北纬为正' },
  { key: 'azimuth', label: '发射方位角', unit: '°', min: 0, max: 360, step: 0.5, hint: '正北 0°，顺时针' },
  { key: 'targetOrbitAltitudeKm', label: '入轨高度', unit: 'km', min: 300, max: 1500, step: 10, hint: '目标轨道高度' },
  { key: 'thrustToWeight', label: '推重比 T/W₀', unit: '', min: 1.2, max: 2.0, step: 0.05, hint: '起飞推力 / 起飞重量' },
]

const PRESETS: { name: string; params: LaunchParams }[] = [
  { name: '文昌 · 近地轨道', params: { ...DEFAULT_LAUNCH_PARAMS } },
  { name: '酒泉 · 东风着陆场方向', params: { ...DEFAULT_LAUNCH_PARAMS, longitude: 100.29, latitude: 40.96, azimuth: 110, siteName: '酒泉卫星发射中心' } },
  { name: '肯尼迪航天中心', params: { ...DEFAULT_LAUNCH_PARAMS, longitude: -80.60, latitude: 28.57, azimuth: 95, siteName: '肯尼迪航天中心 (KSC)' } },
]

export function LaunchPanel({ initial, onGenerate, onImport, computing }: Props) {
  const [form, setForm] = useState<LaunchParams>(initial)
  const [error, setError] = useState<string | null>(null)

  const update = (key: keyof LaunchParams, raw: string) => {
    setForm((f) => ({ ...f, [key]: parseFloat(raw) }))
  }

  const submit = () => {
    for (const spec of FIELDS) {
      const val = form[spec.key] as number
      if (Number.isNaN(val)) return setError(`「${spec.label}」必须是数字`)
      if (val < spec.min || val > spec.max) return setError(`「${spec.label}」需在 ${spec.min} ~ ${spec.max} 之间`)
    }
    if (!form.siteName.trim()) return setError('请填写发射场名称')
    setError(null)
    onGenerate({ ...form })
  }

  return (
    <div className="panel launch-panel">
      <div className="panel-head">
        <h1>🚀 火箭发射弹道三维可视化</h1>
        <p className="sub">WGS84 椭球 · 三级飞行弹道 · 残骸落区投影 · 轨迹回放</p>
      </div>

      <div className="presets">
        {PRESETS.map((p) => (
          <button key={p.name} className="chip" onClick={() => setForm(p.params)} title={p.name}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="form-grid">
        <label className="field field-wide">
          <span className="field-label">发射场名称</span>
          <input
            value={form.siteName}
            onChange={(e) => setForm((f) => ({ ...f, siteName: e.target.value }))}
            placeholder="例如：文昌航天发射场"
          />
        </label>
        {FIELDS.map((spec) => (
          <label className="field" key={spec.key}>
            <span className="field-label">
              {spec.label}
              <em>{spec.hint}</em>
            </span>
            <div className="num-input">
              <input
                type="number"
                value={form[spec.key] as number}
                min={spec.min}
                max={spec.max}
                step={spec.step}
                onChange={(e) => update(spec.key, e.target.value)}
              />
              <i>{spec.unit}</i>
            </div>
            <input
              className="range"
              type="range"
              min={spec.min}
              max={spec.max}
              step={spec.step}
              value={form[spec.key] as number}
              onChange={(e) => update(spec.key, e.target.value)}
            />
          </label>
        ))}
      </div>

      {error && <div className="form-error">⚠ {error}</div>}

      <div className="actions">
        <button className="btn primary" onClick={submit} disabled={computing}>
          {computing ? '弹道解算中…' : '生成三级飞行弹道'}
        </button>
        <label className="btn ghost file-btn">
          导入轨迹 JSON
          <input
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onImport(f)
              e.target.value = ''
            }}
          />
        </label>
      </div>

      <div className="model-note">
        <h3>计算模型说明</h3>
        <ul>
          <li>ECEF 地固系 RK4 积分，含中心引力、地球自转（离心/科氏力）与指数大气阻力</li>
          <li>程序俯仰重力转弯，二级关机时间二分搜索匹配目标入轨高度</li>
          <li>残骸落点按分离时刻速度矢量自由落体投影至 WGS84 椭球面，含 ±2°/±3% 扰动散布</li>
        </ul>
      </div>
    </div>
  )
}
