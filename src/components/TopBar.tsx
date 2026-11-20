import { useRef } from 'react';
import { useStore, toast } from '../lib/store.ts';
import { importFiles, loadDemoScene, demoPoses, hasDemoLoaded } from '../lib/loadDemo.ts';
import { pushPoses as pushUndo } from '../lib/history.ts';
import { resetPoses } from '../lib/store.ts';
import { exportMerge } from '../lib/poseExport.ts';

interface Props {
  onMerge: () => void;
}

export function TopBar({ onMerge }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const mergeRunning = useStore(s => s.mergeStatus.running);
  const shardCount = useStore(s => s.order.length);

  const handleImport = async (files: FileList | null) => {
    if (!files?.length) return;
    const list = Array.from(files);
    await importFiles(list, { normalize: true, exploded: true });
  };

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">陶</div>
        <span>陶俑残片拼合</span>
        <span className="brand-sub">虚拟复原工作台</span>
      </div>

      <div className="topbar-spacer" />

      <div className="topbar-group">
        <button className="btn" onClick={() => fileRef.current?.click()} title="导入 STL / OBJ 残片网格">
          导入残片
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".stl,.obj"
          style={{ display: 'none' }}
          onChange={e => {
            void handleImport(e.target.files);
            e.target.value = '';
          }}
        />
        <button className="btn ghost" onClick={() => void loadDemoScene({ exploded: true })}>
          载入示例
        </button>
        {hasDemoLoaded() && (
          <button
            className="btn ghost"
            title="把示例残片摆到程序化生成的正确位姿（用于核对复原精度）"
            onClick={() => {
              pushUndo();
              resetPoses(demoPoses('true'));
              toast('已按示例的原始位姿摆放，可作为复原结果对照', 'ok');
            }}
          >
            对照原位
          </button>
        )}
      </div>

      <div className="topbar-group" style={{ marginLeft: 8 }}>
        <button
          className="btn primary"
          onClick={onMerge}
          disabled={mergeRunning || shardCount < 2}
          title="对当前显示的残片执行实体布尔并集"
        >
          {mergeRunning ? '合并中…' : '实体合并'}
        </button>
        <button
          className="btn"
          onClick={() => exportMerge('zip')}
          title="导出合并网格 + 位姿清单 + 缝隙报告"
        >
          导出结果
        </button>
      </div>
    </header>
  );
}
