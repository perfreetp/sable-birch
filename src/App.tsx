import { useEffect, useMemo, useRef, useState } from 'react';
import { SceneManager } from './SceneManager';
import { generateYard } from './yard';
import {
  Pose,
  ClearanceResult,
  ContainerInfo,
  HelperViewMode,
  SavedPose,
  DEFAULT_POSE,
  DEFAULT_THRESHOLD,
} from './types';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneManager | null>(null);

  const [pose, setPose] = useState<Pose>(DEFAULT_POSE);
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [clearance, setClearance] = useState<ClearanceResult | null>(null);
  const [selectedContainer, setSelectedContainer] =
    useState<ContainerInfo | null>(null);
  const [helperMode, setHelperMode] = useState<HelperViewMode>('none');
  const [saved, setSaved] = useState<(SavedPose | null)[]>([null, null, null]);

  const cells = useMemo(() => generateYard(), []);

  // 供回调读取最新状态
  const poseRef = useRef(pose);
  poseRef.current = pose;
  const clearanceRef = useRef(clearance);
  clearanceRef.current = clearance;
  const thresholdRef = useRef(threshold);
  thresholdRef.current = threshold;

  useEffect(() => {
    if (!mountRef.current) return;
    const mgr = new SceneManager(mountRef.current, cells, DEFAULT_POSE, DEFAULT_THRESHOLD, {
      onClearance: (r) => setClearance(r),
      onPoseChange: (p) => setPose(p),
      onContainerClick: (info) => setSelectedContainer(info),
      onHelperModeChange: (m) => setHelperMode(m),
    });
    sceneRef.current = mgr;
    return () => {
      mgr.dispose();
      sceneRef.current = null;
    };
  }, [cells]);

  // 面板滑杆 -> 场景
  const applyPose = (p: Pose) => {
    setPose(p);
    sceneRef.current?.setPose(p);
  };

  const applyThreshold = (t: number) => {
    setThreshold(t);
    sceneRef.current?.setThreshold(t);
  };

  const savePose = (slot: number) => {
    const p = poseRef.current;
    const r = clearanceRef.current;
    setSaved((prev) => {
      const next = [...prev];
      next[slot] = {
        id: Date.now(),
        name: `姿态 ${slot + 1}`,
        savedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
        pose: { ...p },
        result: r ? { ...r } : null,
      };
      return next;
    });
  };

  const replayPose = (slot: number) => {
    const s = saved[slot];
    if (!s) return;
    sceneRef.current?.animateTo(s.pose);
  };

  const deletePose = (slot: number) => {
    setSaved((prev) => {
      const next = [...prev];
      next[slot] = null;
      return next;
    });
  };

  const exportJson = () => {
    const poses = saved.filter((s): s is SavedPose => s != null);
    const payload = {
      tool: '场桥吊装包络预演',
      version: 1,
      exportedAt: new Date().toISOString(),
      threshold: thresholdRef.current,
      currentPose: poseRef.current,
      currentClearance: clearanceRef.current,
      savedPoses: poses,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `吊装预演姿态_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <LeftPanel
        pose={pose}
        clearance={clearance}
        threshold={threshold}
        containerCount={cells.length}
        selectedContainer={selectedContainer}
        helperMode={helperMode}
        onPoseChange={applyPose}
        onThresholdChange={applyThreshold}
      />
      <div className="viewport" ref={mountRef} />
      <RightPanel
        saved={saved}
        currentPose={pose}
        currentClearance={clearance}
        onSave={savePose}
        onReplay={replayPose}
        onDelete={deletePose}
        onExport={exportJson}
      />
    </div>
  );
}
