import * as THREE from 'three';
import { Viewer } from './viewer.ts';
import type { Pose } from './types.ts';
import { useStore, store, selectShard, setPose as setPoseStore, toast } from './store.ts';
import { approxDistance, closestDistanceBetween } from './distance.ts';
import { planeNormal } from './kabsch.ts';
import type { AlignmentTriple } from './types.ts';
import { matrixFromPose, poseFromObject } from './transform.ts';
import { rigidTransformFromCorrespondences } from './kabsch.ts';

/**
 * 视图控制器：把 zustand 状态与 three.js Viewer 连接起来。
 * React 组件只调用控制器暴露的方法，不再直接操作场景。
 */
export interface PickSlot {
  role: 'fixed' | 'moving';
  index: number;
}

/** 全局唯一的活动控制器（供面板直接调用） */
let activeController: SceneController | null = null;
export function getActiveController() {
  return activeController;
}
export function showMerged(visible: boolean) {
  activeController?.showMerged(visible);
}

export class SceneController {
  viewer: Viewer;
  private unsub: () => void;
  private poseApplying = false;
  private probeTimer: number | null = null;
  private lastHighlight: { selected: string | null; compare: string | null; hover: string | null } = {
    selected: null, compare: null, hover: null,
  };
  private renderedIds = new Set<string>();
  private pickPoints: { fixed: THREE.Vector3[]; moving: THREE.Vector3[] } = { fixed: [], moving: [] };
  private pickSlot: PickSlot | null = null;
  private lastMergedReportId: string | null = null;
  private lastProblemKey = '';
  private lastProbeKey = '';

  constructor(container: HTMLElement) {
    this.viewer = new Viewer(container, {
      onPoseChange: (id, pose) => {
        if (this.poseApplying) return;
        setPoseStore(id, pose, 'drag');
        this.scheduleProbe(id);
      },
      onPickShard: (id) => {
        if (this.pickSlot) return;
        selectShard(id);
      },
      onPickPoint: (id, point, normal) => this.handlePickPoint(id, point, normal),
      onHover: (id) => {
        if (store.getState().hovered !== id) store.setState({ hovered: id });
      },
      onDistanceProbe: () => {},
    });
    activeController = this;
    this.unsub = useStore.subscribe((s) => this.sync(s));
    this.sync(useStore.getState());
  }

  /* ---------------- 状态同步 ---------------- */

  private sync(s: ReturnType<typeof useStore.getState>) {
    // 残片增删
    const current = new Set(s.shards.map(x => x.id));
    for (const id of this.renderedIds) {
      if (!current.has(id) || s.instances[id]?.mergedInto) {
        this.viewer.removeShard(id);
        this.renderedIds.delete(id);
      }
    }
    for (const src of s.shards) {
      const inst = s.instances[src.id];
      if (!inst || inst.mergedInto) continue;
      if (!this.viewer.hasShard(src.id)) {
        this.viewer.addShard(src, inst.pose);
        this.renderedIds.add(src.id);
      }
    }
    // 位姿（仅当与视口不一致时回写，避免打断拖动）
    for (const src of s.shards) {
      const inst = s.instances[src.id];
      if (!inst || inst.mergedInto) continue;
      const vp = this.viewer.getPose(src.id);
      if (!vp) continue;
      const diff =
        vp.position.some((v, i) => Math.abs(v - inst.pose.position[i]) > 1e-3) ||
        vp.rotation.some((v, i) => Math.abs(v - inst.pose.rotation[i]) > 1e-3);
      if (diff) {
        this.poseApplying = true;
        this.viewer.setPose(src.id, inst.pose);
        this.poseApplying = false;
      }
    }

    // 显示属性
    for (const src of s.shards) {
      const inst = s.instances[src.id];
      if (!inst || inst.mergedInto) continue;
      this.viewer.setVisual(src.id, {
        visible: inst.visible,
        opacity: inst.opacity * s.globalOpacity,
        wireframe: s.wireframe,
        edges: s.showEdges,
        xray: s.displayMode === 'xray',
      });
    }

    // 高亮
    const hl = this.lastHighlight;
    if (hl.selected !== s.selected) {
      if (hl.selected) this.viewer.setHighlight(hl.selected, null);
      if (s.selected) this.viewer.setHighlight(s.selected, 'selected');
      hl.selected = s.selected;
    }
    if (hl.compare !== s.compareId) {
      if (hl.compare) this.viewer.setHighlight(hl.compare, null);
      if (s.compareId) this.viewer.setHighlight(s.compareId, 'compare');
      hl.compare = s.compareId;
    }

    // 变换控制器
    const tool = s.tool;
    const mode = tool === 'move' ? 'translate' : tool === 'rotate' ? 'rotate' : null;
    this.viewer.attachTransform(s.selected && mode ? s.selected : null, mode, s.rotateAxis);
    this.viewer.setSnaps(1, 0.5);
    // 点选模式的唯一来源是控制器的 pickSlot：进入点选后，手柄必须让位；
    // 退出点选后手柄由上面的 attachTransform 重新挂上。
    this.viewer.setPickPointMode(!!this.pickSlot);

    // 合并结果
    const activeReport = s.reports.find(r => r.id === s.activeReport) ?? s.reports[0] ?? null;
    const mergedGeo = activeReport
      ? (activeReport as unknown as { geometry?: THREE.BufferGeometry }).geometry ?? s.mergedGeometry
      : s.mergedGeometry;
    if (activeReport?.id !== this.lastMergedReportId) {
      this.viewer.showMerged(mergedGeo ?? null);
      this.lastMergedReportId = activeReport?.id ?? null;
    }
    this.viewer.setMergedVisible(!!activeReport && s.mergedVisible);

    // 自交问题面高亮（合并前逐片检查 + 合并结果）
    const problemGeos: THREE.BufferGeometry[] = [];
    if (s.highlightProblems) {
      for (const p of Object.values(s.problems)) {
        if (p.geometry) problemGeos.push(p.geometry);
      }
      if (s.mergedProblemGeometry) problemGeos.push(s.mergedProblemGeometry);
    }
    const problemKey = problemGeos.map(g => g.id).join(',');
    if (problemKey !== this.lastProblemKey) {
      this.viewer.showProblems(problemGeos);
      this.lastProblemKey = problemKey;
    }

    // 选中片的最近距离：选择变化或位姿变化时立即更新
    const selKey = `${s.selected}|${this.poseKey(s)}`;
    if (selKey !== this.lastProbeKey) {
      this.lastProbeKey = selKey;
      if (s.selected && s.instances[s.selected] && !s.instances[s.selected].mergedInto) {
        this.updateNeighborDistance(s.selected);
      } else {
        this.viewer.showDistancePair(null);
        if (store.getState().neighborPair) store.setState({ neighborPair: null, liveDistance: null });
      }
    }

    // 点选标记
    this.refreshPickMarkers();
    // 实时距离
    this.applyNeighborPair(s);
  }

  private poseKey(s: ReturnType<typeof useStore.getState>) {
    const ids = [s.selected, s.compareId].filter(Boolean) as string[];
    return ids
      .map(id => {
        const p = s.instances[id]?.pose;
        return p ? `${id}:${p.position.map(v => v.toFixed(1)).join(',')}:${p.rotation.map(v => v.toFixed(1)).join(',')}` : id;
      })
      .join('|');
  }

  showMerged(visible: boolean) {
    this.viewer.setMergedVisible(visible);
  }

  frameMerged() {
    this.viewer.frameMerged();
  }

  /* ---------------- 点选对齐 ---------------- */

  startPicking(slot: PickSlot) {
    this.pickSlot = slot;
    this.viewer.setPickPointMode(true);
    store.setState({ pickingSlot: { role: slot.role, index: slot.index } });
    toast(`请在三维视口中点选${slot.role === 'fixed' ? '固定片' : '移动片'}的第 ${slot.index + 1} 个断口对应点`);
  }

  cancelPicking() {
    this.pickSlot = null;
    this.viewer.setPickPointMode(false);
    store.setState({ pickingSlot: null });
  }

  getPickSlot() {
    return this.pickSlot;
  }

  private handlePickPoint(_id: string, point: THREE.Vector3, _normal: THREE.Vector3) {
    if (!this.pickSlot) return;
    const st = store.getState();
    const { role, index } = this.pickSlot;

    const arr = role === 'fixed' ? this.pickPoints.fixed : this.pickPoints.moving;
    while (arr.length <= index) arr.push(new THREE.Vector3());
    arr[index] = point.clone();

    this.pickSlot = index + 1 < 3 ? { role, index: index + 1 } : null;
    this.viewer.setPickPointMode(!!this.pickSlot);

    if (this.pickSlot) {
      store.setState({ pickingSlot: { role, index: this.pickSlot.index } });
      toast(`已记录${role === 'fixed' ? '固定片' : '移动片'}第 ${index + 1} 点，请继续点选第 ${index + 2} 点`, 'ok');
    } else {
      store.setState({ pickingSlot: null });
      // 两个角色都完成？如果只选了一个角色，自动切到另一角色
      const fixedDone = this.pickPoints.fixed.length === 3;
      const movingDone = this.pickPoints.moving.length === 3;
      if (fixedDone && movingDone) {
        this.commitAlignment(st.selected, st.compareId);
      } else if (fixedDone) {
        toast('固定片三点已完成，请点选移动片的三点', 'ok');
        this.startPicking({ role: 'moving', index: 0 });
      } else if (movingDone) {
        toast('移动片三点已完成，请点选固定片的三点', 'ok');
        this.startPicking({ role: 'fixed', index: 0 });
      }
    }
    this.refreshPickMarkers();
  }

  resetPickPoints() {
    this.pickPoints = { fixed: [], moving: [] };
    this.pickSlot = null;
    this.viewer.setPickPointMode(false);
    store.setState({ pickingSlot: null, alignment: null, alignmentStatus: '' });
    this.refreshPickMarkers();
    this.viewer.setPointMarkers([]);
  }

  getPickPoints() {
    return this.pickPoints;
  }

  private refreshPickMarkers() {
    const markers: { position: THREE.Vector3; color: number }[] = [];
    for (const p of this.pickPoints.fixed) markers.push({ position: p, color: 0xffb347 });
    for (const p of this.pickPoints.moving) markers.push({ position: p, color: 0x4de0c0 });
    this.viewer.setPointMarkers(markers);
  }

  /** 用当前六个点计算并应用粗对齐 */
  applyAlignment(fixedId: string | null, movingId: string | null, normalOffsetMM: number) {
    if (!fixedId || !movingId) {
      toast('请先在左侧选择固定片与移动片', 'error');
      return;
    }
    if (this.pickPoints.fixed.length < 3 || this.pickPoints.moving.length < 3) {
      toast('需要两片各 3 个对应点', 'error');
      return;
    }
    this.commitAlignment(fixedId, movingId, normalOffsetMM);
  }

  private commitAlignment(fixedId: string | null, movingId: string | null, normalOffsetMM = 0) {
    if (!fixedId || !movingId) return;
    if (this.pickPoints.fixed.length < 3 || this.pickPoints.moving.length < 3) return;

    // 对应点当前都在世界坐标；求把 moving 世界点映射到 fixed 世界点的刚体变换，
    // 再左乘到移动片现有世界矩阵上。
    const { quaternion, translation, rmsd } = rigidTransformFromCorrespondences(
      this.pickPoints.fixed,
      this.pickPoints.moving,
    );

    const movingInst = store.getState().instances[movingId];
    if (!movingInst) return;
    const current = matrixFromPose(movingInst.pose);
    const delta = new THREE.Matrix4().compose(translation, quaternion, new THREE.Vector3(1, 1, 1));
    const next = delta.multiply(current);

    // 沿断口法向微调
    if (normalOffsetMM !== 0) {
      const normal = planeNormal(this.pickPoints.fixed);
      const dirWorld = normal.clone();
      // 让移动片朝固定片方向移动（-normal），偏移量取负号
      next.premultiply(new THREE.Matrix4().makeTranslation(
        -dirWorld.x * normalOffsetMM,
        -dirWorld.y * normalOffsetMM,
        -dirWorld.z * normalOffsetMM,
      ));
    }

    const dummy = new THREE.Object3D();
    next.decompose(dummy.position, dummy.quaternion, dummy.scale);
    const pose = poseFromObject(dummy);

    setPoseStore(movingId, pose, 'program');
    this.viewer.setPose(movingId, pose);

    const align: AlignmentTriple = {
      fixedId,
      movingId,
      fixedPoints: this.pickPoints.fixed.map(p => [p.x, p.y, p.z] as [number, number, number]),
      movingPoints: this.pickPoints.moving.map(p => [p.x, p.y, p.z] as [number, number, number]),
      normalOffset: normalOffsetMM,
    };
    store.setState({
      alignment: align,
      alignmentStatus: `已对齐：残差 RMSD ${rmsd.toFixed(2)} mm`,
    });
    toast(`粗对齐完成，RMSD ${rmsd.toFixed(2)} mm`, 'ok');
    this.refreshPickMarkers();
  }

  /** 沿法向微调：在已有对齐基础上平移移动片 */
  applyNormalOffset(mm: number) {
    const s = store.getState();
    const align = s.alignment;
    if (!align) { toast('请先完成三点点选粗对齐', 'error'); return; }
    const delta = mm - align.normalOffset;
    if (Math.abs(delta) < 1e-6) return;
    const normal = planeNormal(align.fixedPoints.map(p => new THREE.Vector3(...p)));
    const inst = s.instances[align.movingId];
    if (!inst) return;
    const pose: Pose = {
      position: inst.pose.position.map((v, i) => v - normal.getComponent(i) * delta) as [number, number, number],
      rotation: inst.pose.rotation,
    };
    setPoseStore(align.movingId, pose, 'input');
    store.setState({ alignment: { ...align, normalOffset: mm } });
  }

  /* ---------------- 实时距离 ---------------- */

  private scheduleProbe(movingId: string) {
    if (this.probeTimer !== null) window.clearTimeout(this.probeTimer);
    this.probeTimer = window.setTimeout(() => this.updateNeighborDistance(movingId), 60);
  }

  updateNeighborDistance(movingId: string) {
    const s = store.getState();
    const moving = s.shards.find(x => x.id === movingId);
    const movingInst = s.instances[movingId];
    if (!moving || !movingInst) return;

    let best: { id: string; distance: number; pointA: THREE.Vector3; pointB: THREE.Vector3 } | null = null;
    for (const other of s.shards) {
      if (other.id === movingId) continue;
      const inst = s.instances[other.id];
      if (!inst || !inst.visible || inst.mergedInto) continue;
      const res = approxDistance(moving, movingInst.pose, other, inst.pose, 300);
      if (res && (!best || res.distance < best.distance)) {
        best = {
          id: other.id,
          distance: res.distance,
          pointA: res.pointFrom ?? new THREE.Vector3(),
          pointB: res.pointTo ?? new THREE.Vector3(),
        };
      }
    }
    if (best) {
      this.viewer.showDistancePair({ a: movingId, b: best.id, pointA: best.pointA, pointB: best.pointB });
      store.setState({
        neighborPair: {
          a: movingId, b: best.id, distance: best.distance,
          pointA: best.pointA.toArray() as [number, number, number],
          pointB: best.pointB.toArray() as [number, number, number],
        },
        liveDistance: best.distance,
      });
    } else {
      this.viewer.showDistancePair(null);
      store.setState({ neighborPair: null, liveDistance: null });
    }
  }

  private applyNeighborPair(s: ReturnType<typeof useStore.getState>) {
    if (!s.showNeighborDistance) {
      this.viewer.showDistancePair(null);
      return;
    }
    const pair = s.neighborPair;
    if (pair) {
      this.viewer.showDistancePair({
        a: pair.a,
        b: pair.b,
        pointA: new THREE.Vector3(...pair.pointA),
        pointB: new THREE.Vector3(...pair.pointB),
      });
    }
  }

  /**
   * 对当前选中片与其最近邻做一次精确距离计算：
   * 先用采样点近似找出最近的邻片，再用两网格之间的精确最近距离
   * （BVH closestPointToGeometry）复核并刷新视口连线。
   */
  measureExact() {
    const s = store.getState();
    if (!s.selected) { toast('请先选择一片残片', 'error'); return; }
    const sel = s.selected;
    const src = s.shards.find(x => x.id === sel);
    const inst = s.instances[sel];
    if (!src || !inst) return;

    // 近似找邻片
    let bestId: string | null = null;
    let best = Infinity;
    for (const other of s.shards) {
      if (other.id === sel) continue;
      const oi = s.instances[other.id];
      if (!oi || !oi.visible || oi.mergedInto) continue;
      const r = approxDistance(src, inst.pose, other, oi.pose, 300);
      if (r && r.distance < best) { best = r.distance; bestId = other.id; }
    }
    if (!bestId) { toast('附近没有其他残片', 'info'); return; }

    const otherSrc = s.shards.find(x => x.id === bestId)!;
    const otherInst = s.instances[bestId];
    const exact = closestDistanceBetween(src, inst.pose, otherSrc, otherInst.pose);
    if (!exact) { toast('精确距离计算失败', 'error'); return; }

    if (exact.pointA && exact.pointB) {
      this.viewer.showDistancePair({ a: sel, b: bestId, pointA: exact.pointA, pointB: exact.pointB });
    }
    store.setState({
      neighborPair: {
        a: sel, b: bestId, distance: exact.distance,
        pointA: (exact.pointA ?? new THREE.Vector3()).toArray() as [number, number, number],
        pointB: (exact.pointB ?? new THREE.Vector3()).toArray() as [number, number, number],
      },
      liveDistance: exact.distance,
    });
    toast(
      `精确最近距离 ${exact.distance.toFixed(3)} mm（${inst.name} ↔ ${otherInst.name}）`,
      'ok',
    );
  }

  /* ---------------- 相机 ---------------- */

  frameAll() { this.viewer.frameAll(); }
  frameShard(id: string) { this.viewer.frameShard(id); }
  setView(dir: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom' | 'iso') {
    this.viewer.setViewDirection(dir);
  }
  screenshot(): string { return this.viewer.screenshot(); }

  dispose() {
    if (activeController === this) activeController = null;
    this.unsub();
    this.viewer.dispose();
  }
}
