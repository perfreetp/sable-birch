import { TrajectoryResult } from '../lib/types'
import { fmtKm, fmtSpeed, fmtTime } from '../lib/io'
import { SPEEDS, PlaySpeed } from '../hooks/usePlayback'

interface Props {
  result: TrajectoryResult
  time: number
  playing: boolean
  speed: PlaySpeed
  follow: boolean
  onToggle: () => void
  onSeek: (t: number) => void
  onSpeed: (s: PlaySpeed) => void
  onFollow: (on: boolean) => void
  onExport: () => void
  onBack: () => void
}

export function PlaybackBar({
  result, time, playing, speed, follow,
  onToggle, onSeek, onSpeed, onFollow, onExport, onBack,
}: Props) {
  const pct = (time / result.duration) * 100
  return (
    <div className="panel playback-bar">
      <div className="pb-row">
        <button className="btn small" onClick={onBack}>← 参数面板</button>
        <button className="btn icon-btn" onClick={onToggle} title={playing ? '暂停' : '播放'}>
          {playing ? '⏸' : '▶'}
        </button>
        <span className="clock">{fmtTime(time)}</span>
        <div className="timeline-wrap">
          <input
            className="timeline"
            type="range"
            min={0}
            max={result.duration}
            step={0.1}
            value={time}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            style={{ ['--pct' as string]: `${pct}%` }}
          />
          <div className="event-ticks">
            {result.events.map((ev) => (
              <span
                key={ev.kind}
                className="tick"
                style={{ left: `${(ev.t / result.duration) * 100}%`, background: ev.color }}
                title={`${ev.label} @ ${fmtTime(ev.t)}`}
              />
            ))}
          </div>
        </div>
        <span className="clock dim">{fmtTime(result.duration)}</span>

        <div className="speed-group">
          {SPEEDS.map((s) => (
            <button
              key={s}
              className={`chip ${speed === s ? 'active' : ''}`}
              onClick={() => onSpeed(s)}
            >
              {s}×
            </button>
          ))}
        </div>

        <button className={`chip ${follow ? 'active' : ''}`} onClick={() => onFollow(!follow)}>
          {follow ? '🎯 跟随中' : '相机跟随'}
        </button>
        <button className="btn small ghost" onClick={onExport}>导出 JSON</button>
      </div>

      <div className="pb-phases">
        {result.phases.map((ph) => {
          const active = time >= ph.t0 && time <= ph.t1
          return (
            <div
              key={ph.id}
              className={`phase-seg ${active ? 'active' : ''}`}
              style={{ left: `${(ph.t0 / result.duration) * 100}%`, width: `${((ph.t1 - ph.t0) / result.duration) * 100}%` }}
              title={`${ph.label} ${fmtTime(ph.t0)} – ${fmtTime(ph.t1)}`}
            >
              {ph.label}
            </div>
          )
        })}
      </div>

      <div className="pb-readout">
        <Readout label="当前高度" value={fmtKm(sampleAt(result, time).altitude)} />
        <Readout label="当前速度" value={fmtSpeed(sampleAt(result, time).speed)} />
        <Readout label="弹道角" value={`${sampleAt(result, time).flightPathAngle.toFixed(1)}°`} />
        <Readout label="入轨高度" value={fmtKm(result.insertionAltitude)} />
        <Readout label="入轨速度" value={fmtSpeed(result.insertionSpeed)} />
      </div>
    </div>
  )
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="readout">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function sampleAt(result: TrajectoryResult, t: number) {
  const arr = result.samples
  let lo = 0, hi = arr.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (arr[mid].t < t) lo = mid + 1
    else hi = mid
  }
  return arr[lo]
}
