import { store, nudgePose, setShardProp, toast } from './store.ts';
import type { SceneController } from './sceneController.ts';

/** 全局键盘交互：工具切换、微调、相机视角 */
export function setupKeyboard(getController: () => SceneController | null) {
  const onKey = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    const s = store.getState();
    const selected = s.selected;
    const step = e.shiftKey ? 10 : 1;

    switch (e.key.toLowerCase()) {
      case 'q':
        store.setState({ tool: 'select' });
        break;
      case 'w':
        store.setState({ tool: 'move' });
        break;
      case 'e':
        store.setState({ tool: 'rotate' });
        break;
      case 'r':
        getController()?.frameAll();
        break;
      case 'f':
        if (selected) getController()?.frameShard(selected);
        break;
      case 'h':
        if (selected) setShardProp(selected, 'visible', !s.instances[selected]?.visible);
        break;
      case 'escape':
        getController()?.cancelPicking();
        break;
      case 'arrowleft':
      case 'arrowright':
      case 'arrowup':
      case 'arrowdown': {
        if (!selected) return;
        e.preventDefault();
        const sign = e.key === 'arrowleft' || e.key === 'arrowdown' ? -1 : 1;
        if (s.tool === 'rotate') {
          const axis = s.rotateAxis;
          const d = [0, 0, 0];
          d[{ x: 0, y: 1, z: 2 }[axis]] = sign * step * 0.5;
          nudgePose(selected, { rotation: d as [number, number, number] });
        } else {
          const d = [0, 0, 0];
          d[e.key === 'arrowleft' || e.key === 'arrowright' ? 0 : 1] = sign * step;
          nudgePose(selected, { position: d as [number, number, number] });
        }
        break;
      }
      case '1': store.setState({ rotateAxis: 'x' }); break;
      case '2': store.setState({ rotateAxis: 'y' }); break;
      case '3': store.setState({ rotateAxis: 'z' }); break;
      default:
        return;
    }
    if (e.key === 'Escape') return;
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}

export function flashHint(text: string) {
  toast(text, 'info');
}
