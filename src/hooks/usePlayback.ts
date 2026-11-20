import { useCallback, useEffect, useRef, useState } from 'react'

export const SPEEDS = [0.5, 1, 2, 4, 8] as const
export type PlaySpeed = (typeof SPEEDS)[number]

export interface PlaybackState {
  time: number
  playing: boolean
  speed: PlaySpeed
}

/**
 * 回放引擎：requestAnimationFrame 驱动，
 * 支持播放/暂停、0.5–8 倍速、拖动定位、结束自动停。
 */
export function usePlayback(duration: number, onTick: (t: number) => void) {
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<PlaySpeed>(1)
  const rafRef = useRef(0)
  const lastRef = useRef(0)
  const timeRef = useRef(0)
  const speedRef = useRef(speed)
  const durationRef = useRef(duration)
  const tickRef = useRef(onTick)

  speedRef.current = speed
  durationRef.current = duration
  tickRef.current = onTick

  const applyTime = useCallback((t: number) => {
    const clamped = Math.max(0, Math.min(t, durationRef.current))
    timeRef.current = clamped
    setTime(clamped)
    tickRef.current(clamped)
  }, [])

  const playingRef = useRef(false)
  playingRef.current = playing

  useEffect(() => {
    const step = (now: number) => {
      rafRef.current = requestAnimationFrame(step)
      if (!playingRef.current) {
        lastRef.current = now
        return
      }
      if (lastRef.current === 0) {
        lastRef.current = now
        return
      }
      const dt = (now - lastRef.current) / 1000
      lastRef.current = now
      const next = timeRef.current + dt * speedRef.current
      if (next >= durationRef.current) {
        applyTime(durationRef.current)
        setPlaying(false)
        return
      }
      applyTime(next)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [applyTime])

  // 暂停时冻结 dt 基准，恢复不跳变
  useEffect(() => {
    lastRef.current = 0
  }, [playing])

  const play = useCallback(() => {
    if (timeRef.current >= durationRef.current - 1e-6) applyTime(0)
    setPlaying(true)
  }, [applyTime])
  const pause = useCallback(() => setPlaying(false), [])
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play])
  const seek = useCallback((t: number) => applyTime(t), [applyTime])
  const reset = useCallback(() => {
    setPlaying(false)
    applyTime(0)
  }, [applyTime])
  const cycleSpeed = useCallback(() => {
    setSpeed((s) => {
      const i = SPEEDS.indexOf(s)
      return SPEEDS[(i + 1) % SPEEDS.length]
    })
  }, [])

  // 数据切换（重新计算弹道）时复位
  const resetFor = useCallback((newDuration: number) => {
    setPlaying(false)
    durationRef.current = newDuration
    applyTime(0)
  }, [applyTime])

  return {
    time, playing, speed,
    play, pause, toggle, seek, reset, setSpeed, cycleSpeed, resetFor,
  }
}
