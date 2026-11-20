import { useEffect, useMemo, useRef, useState } from 'react'
import { EarthScene } from '../three/scene'
import { TrajectoryResult } from '../lib/types'
import { fmtKm, fmtSpeed, fmtTime } from '../lib/io'

interface Props {
  result: TrajectoryResult
  time: number
  follow: boolean
  onFollowChange: (on: boolean) => void
}

interface PopupPos { x: number; y: number; visible: boolean }

export function Viewport({ result, time, follow, onFollowChange }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<EarthScene | null>(null)
  const [popupPos, setPopupPos] = useState<(PopupPos | null)[]>(result.events.map(() => null))
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({})

  // 初始化场景
  useEffect(() => {
    if (!mountRef.current) return
    const scene = new EarthScene(mountRef.current)
    sceneRef.current = scene
    scene.setResult(result)
    return () => {
      scene.dispose()
      sceneRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 数据变化（导入 JSON）
  useEffect(() => {
    sceneRef.current?.setResult(result)
    setDismissed({})
  }, [result])

  // 时间推进
  useEffect(() => {
    sceneRef.current?.setPlayback(time)
  }, [time])

  // 跟随模式
  useEffect(() => {
    sceneRef.current?.setFollow(follow)
  }, [follow])

  // 弹窗屏幕坐标跟踪
  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const s = sceneRef.current
      if (!s) return
      setPopupPos(result.events.map((ev, i) => {
        const w = s.eventWorldPosition(i)
        if (!w) return null
        return s.toScreen(w)
      }))
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [result])

  const activeEvents = useMemo(
    () => result.events.filter((ev) => time >= ev.t - 0.05),
    [result, time],
  )

  const flyTo = (i: number) => {
    sceneRef.current?.focusEvent(i)
    onFollowChange(false)
  }

  return (
    <div className="viewport">
      <div ref={mountRef} className="scene-mount" />

      {/* 图例 */}
      <div className="legend panel-inner">
        <h4>图例</h4>
        <div className="legend-row"><span className="dot" style={{ background: '#22d3ee' }} />低空</div>
        <div className="legend-row"><span className="dot" style={{ background: '#a3e635' }} />中空</div>
        <div className="legend-row"><span className="dot" style={{ background: '#f97316' }} />卡门线附近</div>
        <div className="legend-row"><span className="dot" style={{ background: '#f43f5e' }} />卡门线以上</div>
        <div className="legend-divider" />
        {result.events.map((ev) => (
          <div className="legend-row" key={ev.kind}>
            <span className="dot" style={{ background: ev.color }} />{ev.label}
          </div>
        ))}
        <div className="legend-divider" />
        <div className="legend-row shell">◌ 100km 卡门线球壳</div>
      </div>

      {/* 事件列表 */}
      <div className="event-list panel-inner">
        <h4>分离事件 / 残骸落区</h4>
        {result.events.map((ev, i) => {
          const reached = time >= ev.t - 0.05
          return (
            <button
              key={ev.kind}
              className={`event-card ${reached ? '' : 'locked'}`}
              disabled={!reached}
              onClick={() => flyTo(i)}
              style={{ borderColor: ev.color }}
            >
              <header>
                <i style={{ background: ev.color }} />
                <strong>{ev.label}</strong>
                <span>{fmtTime(ev.t)}</span>
              </header>
              <p>
                速度 <b>{fmtSpeed(ev.speed)}</b> · 高度 <b>{fmtKm(ev.altitude)}</b>
              </p>
              {ev.orbital ? (
                <p className="impact">🛰 留轨级 · 近地点 {ev.perigeeKm.toFixed(0)} km（不立即再入）</p>
              ) : (
                <p className="impact">
                  落点 ({ev.impact.lon.toFixed(2)}°, {ev.impact.lat.toFixed(2)}°) ·
                  航程 {ev.impact.rangeKm.toFixed(0)} km · 坠落 {fmtTime(ev.impact.flightTime)}
                </p>
              )}
            </button>
          )
        })}
      </div>

      {/* 分离点读数弹窗（到达分离时刻弹出，按事件索引错位避免重叠） */}
      {activeEvents.map((ev) => {
        const i = result.events.indexOf(ev)
        const pos = popupPos[i]
        if (!pos || !pos.visible || dismissed[ev.kind]) return null
        // 每个事件弹窗错位（水平+垂直双向），并限制在视口内
        const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x))
        const offset = i - (activeEvents.length - 1) / 2
        const staggerX = offset * 260
        const staggerY = offset * 40
        const left = clamp(pos.x + staggerX, 130, window.innerWidth - 130)
        const top = clamp(pos.y + staggerY, 200, window.innerHeight - 170)
        return (
          <div
            key={ev.kind}
            className="event-popup"
            style={{ left, top, borderColor: ev.color }}
          >
            <button className="popup-close" onClick={() => setDismissed((d) => ({ ...d, [ev.kind]: true }))}>×</button>
            <h5 style={{ color: ev.color }}>{ev.label}</h5>
            <div className="popup-grid">
              <span>时刻</span><b>{fmtTime(ev.t)}</b>
              <span>速度</span><b>{fmtSpeed(ev.speed)}</b>
              <span>高度</span><b>{fmtKm(ev.altitude)}</b>
              {ev.orbital ? (
                <>
                  <span>状态</span><b>留轨 · 近地点 {ev.perigeeKm.toFixed(0)}km</b>
                </>
              ) : (
                <>
                  <span>落点</span><b>{ev.impact.lon.toFixed(2)}°, {ev.impact.lat.toFixed(2)}°</b>
                </>
              )}
            </div>
          </div>
        )
      })}

      <div className="hint-badge">鼠标拖拽环绕 · 滚轮缩放 · 右键平移</div>
    </div>
  )
}
