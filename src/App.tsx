import { useCallback, useRef, useState } from 'react'
import { LaunchPanel } from './components/LaunchPanel'
import { PlaybackBar } from './components/PlaybackBar'
import { Viewport } from './components/Viewport'
import { computeTrajectory, DEFAULT_LAUNCH_PARAMS } from './lib/trajectory'
import { exportTrajectoryJSON, importTrajectoryJSON } from './lib/io'
import { LaunchParams, TrajectoryResult } from './lib/types'
import { usePlayback } from './hooks/usePlayback'

export default function App() {
  const [result, setResult] = useState<TrajectoryResult | null>(null)
  const [computing, setComputing] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [follow, setFollow] = useState(false)
  const toastTimer = useRef<number>()

  const notify = useCallback((msg: string) => {
    setToast(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3200)
  }, [])

  const handleGenerate = useCallback((params: LaunchParams) => {
    setComputing(true)
    // 让出一帧，保证按钮 loading 态先渲染（积分 + 落区计算量较大）
    requestAnimationFrame(() =>
      setTimeout(() => {
        try {
          const r = computeTrajectory(params)
          setResult(r)
          setFollow(false)
          notify(`弹道解算完成：${r.samples.length} 个采样点，飞行时长 ${r.duration.toFixed(0)}s`)
        } catch (e) {
          notify(`解算失败：${(e as Error).message}`)
        } finally {
          setComputing(false)
        }
      }, 30),
    )
  }, [notify])

  const handleImport = useCallback(async (file: File) => {
    try {
      const r = await importTrajectoryJSON(file)
      setResult(r)
      setFollow(false)
      notify(`已导入轨迹：${r.params.siteName}`)
    } catch (e) {
      notify(`导入失败：${(e as Error).message}`)
    }
  }, [notify])

  const playback = usePlayback(result?.duration ?? 1, () => {})

  // 数据切换时复位回放
  const prevResult = useRef<TrajectoryResult | null>(null)
  if (result && result !== prevResult.current) {
    prevResult.current = result
    playback.resetFor(result.duration)
  }

  if (!result) {
    return (
      <div className="home">
        <div className="home-bg" />
        <LaunchPanel
          initial={DEFAULT_LAUNCH_PARAMS}
          onGenerate={handleGenerate}
          onImport={handleImport}
          computing={computing}
        />
        {toast && <div className="toast">{toast}</div>}
      </div>
    )
  }

  return (
    <div className="workspace">
      <Viewport
        result={result}
        time={playback.time}
        follow={follow}
        onFollowChange={setFollow}
      />
      <PlaybackBar
        result={result}
        time={playback.time}
        playing={playback.playing}
        speed={playback.speed}
        follow={follow}
        onToggle={playback.toggle}
        onSeek={playback.seek}
        onSpeed={playback.setSpeed}
        onFollow={setFollow}
        onExport={() => {
          exportTrajectoryJSON(result)
          notify('轨迹 JSON 已导出')
        }}
        onBack={() => {
          setResult(null)
          setFollow(false)
        }}
      />
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
