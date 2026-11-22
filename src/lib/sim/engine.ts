// 靠泊动力学引擎：3DOF 平面操纵(纵移/横移/首摇) + 横摇/纵摇/升沉
// 坐标系：世界 x 沿岸壁(指向船首初始方向)，z 离岸为正，岸壁面 z=0，y 向上
import type {
  BerthConfig,
  BerthInput,
  FenderContact,
  LineState,
  MooringLine,
  ShipType,
  SimResult,
  SimSample,
  Vec3
} from '../types';
import { bodyToWorld, clamp, deg2rad, rad2deg } from './math';
import { deriveHydro, fenderPositions, halfBreadthAt, type ShipHydro } from './hydro';

const RHO_AIR = 1.225;
const RHO_WATER = 1025;
const G = 9.81;
const DT = 0.02;
const SUBSTEPS = 4;
const SAMPLE_DT = 0.1;
const MAX_T = 300;

interface SimState {
  x: number;
  z: number;
  yaw: number;
  u: number; // 体系纵向速度
  v: number; // 体系横向速度
  r: number; // 首摇角速度
  roll: number;
  rollRate: number;
  pitch: number;
  pitchRate: number;
  heave: number;
  heaveRate: number;
}

interface LineRuntime extends MooringLine {
  attached: boolean;
  restLength: number;
  attachLength: number;
  ea: number; // 轴向刚度 EA (N)
  maxTension: number;
  maxUtil: number;
  alarmCount: number;
  /** 本采样窗口内是否超阈值（窗口在采样点结算） */
  alarmsInWindow: boolean;
}

/** 体系点 -> 世界系（含 yaw/roll/pitch，小角度），平移含升沉 */
export function transformPoint(
  p: Vec3,
  s: { x: number; z: number; yaw: number; roll: number; pitch: number; heave: number }
): Vec3 {
  const { roll: phi, pitch: theta, yaw: psi } = s;
  // R_z(pitch)
  const x1 = p.x - theta * p.y;
  const y1 = theta * p.x + p.y;
  const z1 = p.z;
  // R_x(roll)
  const x2 = x1;
  const y2 = y1 - phi * z1;
  const z2 = phi * y1 + z1;
  // R_y(yaw)
  const c = Math.cos(psi);
  const sn = Math.sin(psi);
  return {
    x: c * x2 + sn * z2 + s.x,
    y: y2 + s.heave,
    z: -sn * x2 + c * z2 + s.z
  };
}

export interface EngineOptions {
  ship: ShipType;
  berth: BerthConfig;
  input: BerthInput;
  lines: MooringLine[];
}

export function runSimulation(opts: EngineOptions): SimResult {
  const { ship, berth, input, lines } = opts;
  const hydro = deriveHydro(ship);
  const fenders = fenderPositions(berth);
  const hG = hydro.GM !== undefined ? ship.depth * 0.65 - ship.draft : 0; // 重心距水面高度近似

  const psi0 = deg2rad(input.berthAngleDeg);
  const state: SimState = {
    x: input.initialAlongPos,
    z: input.initialOffshoreDist,
    yaw: psi0,
    u: Math.cos(psi0) * input.alongSpeed + Math.sin(psi0) * input.approachSpeed,
    v: Math.sin(psi0) * input.alongSpeed - Math.cos(psi0) * input.approachSpeed,
    r: 0,
    roll: 0,
    rollRate: 0,
    pitch: 0,
    pitchRate: 0,
    heave: 0,
    heaveRate: 0
  };

  const rtLines: LineRuntime[] = lines.map((l) => {
    const area = Math.PI * (l.diameter / 2000) ** 2;
    return {
      ...l,
      attached: false,
      restLength: 1,
      attachLength: 0,
      ea: l.elasticModulus * 1e6 * area,
      maxTension: 0,
      maxUtil: 0,
      alarmCount: 0,
      alarmsInWindow: false
    };
  });

  let attachTime = -1;
  let maxFenderForce = 0;
  let settleTimer = 0;
  const samples: SimSample[] = [];
  let nextSample = 0;
  let t = 0;

  const waveFreq = 0.9 + input.crossCurrent * 0.4;
  const waveAmp = 0.08 * (input.crossWind / 10) ** 2;

  while (t < MAX_T) {
    for (let sub = 0; sub < SUBSTEPS; sub++) {
      step(state, DT / SUBSTEPS, t);
      t += DT / SUBSTEPS;
    }
    if (t + 1e-9 >= nextSample) {
      samples.push(makeSample(t, state));
      nextSample += SAMPLE_DT;
    }
    // 完成判定：挂缆后低速稳定
    if (attachTime > 0 && t - attachTime > 6) {
      const speed = Math.hypot(state.u, state.v);
      if (speed < 0.025 && Math.abs(state.r) < 0.002) {
        settleTimer += DT;
        if (settleTimer > 3) break;
      } else {
        settleTimer = 0;
      }
    }
  }

  // 主循环按固定 0.1s 采样，采样点处重算接触与缆绳状态
  const finalSamples = samples;

  const last = finalSamples[finalSamples.length - 1];
  // 船舯到壁距离减去船宽之半，即左舷船壳到岸壁面的间隙
  const hullGap = Math.max(0, last.z - ship.beam / 2 - berth.fender.protrusion);
  const result: SimResult = {
    samples: finalSamples,
    duration: t,
    final: {
      alongDeviation: last.x,
      offshoreDistance: hullGap,
      yawErrorDeg: rad2deg(last.yaw),
      rollDeg: rad2deg(last.roll),
      pitchDeg: rad2deg(last.pitch),
      maxFenderForce,
      lineAttachTime: attachTime
    },
    lineSummary: rtLines.map((l) => ({
      id: l.id,
      label: l.label,
      maxTension: l.maxTension,
      finalTension: last.lines.find((x) => x.id === l.id)?.tension ?? 0,
      maxUtilization: l.maxUtil,
      alarmCount: l.alarmCount
    })),
    configHash: ''
  };
  return result;

  // ---------------- 内部实现 ----------------

  function step(s: SimState, dt: number, time: number): void {
    const m = hydro.mass;
    // 附加质量
    const m11 = m * 1.05;
    const m22 = m * 1.85;
    const m66 = hydro.Izz * 1.25;

    // 世界系合力/力矩累加器
    let Fx = 0;
    let Fz = 0;
    let My = 0; // 首摇
    let Mx = 0; // 横摇
    let Mz = 0; // 纵摇

    // --- 风（横风，吹向岸壁 = -z） ---
    const Cw = 1.05;
    const windForceZ =
      -0.5 * RHO_AIR * Cw * hydro.windArea * input.crossWind * Math.abs(input.crossWind);
    Fz += windForceZ;
    Mx += (hydro.windAreaCentroid - hG) * windForceZ;

    // --- 流（横流，流向岸壁 = -z），按相对速度的水下侧投影阻力 ---
    const curWorld = { x: 0, z: -input.crossCurrent };
    const wdotx = Math.cos(s.yaw) * s.u + Math.sin(s.yaw) * s.v;
    const wdotz = -Math.sin(s.yaw) * s.u + Math.cos(s.yaw) * s.v;
    const relx = wdotx - curWorld.x;
    const relz = wdotz - curWorld.z;
    const CdCur = 1.1;
    const sideArea = ship.length * ship.draft;
    Fx += -0.5 * RHO_WATER * CdCur * sideArea * 0.35 * relx * Math.abs(relx);
    Fz += -0.5 * RHO_WATER * CdCur * sideArea * relz * Math.abs(relz);

    // --- 体系水动力阻尼（MMG 类经验系数，含附加质量效应） ---
    const surgeDrag =
      -m * 0.018 * s.u -
      0.5 * RHO_WATER * 0.18 * (ship.beam * ship.draft) * s.u * Math.abs(s.u);
    const swayDrag =
      -m * 0.012 * s.v -
      0.5 * RHO_WATER * 0.42 * sideArea * s.v * Math.abs(s.v);
    const yawDrag =
      -hydro.Izz * 0.04 * s.r -
      0.5 * RHO_WATER * 0.35 * ship.draft * ((ship.length ** 4) / 64) * s.r * Math.abs(s.r);
    // 体系 -> 世界
    Fx += Math.cos(s.yaw) * surgeDrag + Math.sin(s.yaw) * swayDrag;
    Fz += -Math.sin(s.yaw) * surgeDrag + Math.cos(s.yaw) * swayDrag;
    My += yawDrag;

    // --- 波浪激励（横摇/纵摇/升沉） ---
    const rollWave =
      m * G * hydro.GM * 0.025 * (input.crossWind / 10) * Math.sin(waveFreq * time);
    const pitchWave =
      m * G * 20 * 0.012 * (input.crossCurrent / 0.5) * Math.sin(waveFreq * 1.3 * time + 1);
    Mx += rollWave;
    Mz += pitchWave;

    // --- 护舷接触 ---
    const contacts = computeContacts(s, time);
    for (const c of contacts) {
      const fn = c.normalForce * 1000;
      const ff = c.frictionForce * 1000;
      Fz += fn; // 法向朝 +z（离岸）
      Fx += ff;
      const rx = c.point.x - s.x;
      const rz = c.point.z - s.z;
      My += rz * ff - rx * fn;
      Mx += (berth.fender.mountHeight - hG) * fn;
      if (fn / 1000 > maxFenderForce) maxFenderForce = fn / 1000;
    }

    // --- 挂缆判定：首次护舷接触 ---
    if (attachTime < 0 && contacts.some((c) => c.penetration > 0.02)) {
      attachTime = time;
      for (const l of rtLines) {
        const a = transformPoint(l.chock, s);
        l.attachLength = Math.hypot(a.x - l.bollard.x, a.y - l.bollard.y, a.z - l.bollard.z);
        const eps0 = (l.pretension * 1000) / l.ea;
        l.restLength = l.attachLength / (1 + eps0);
        l.attached = true;
      }
    }

    // --- 缆绳张力（含绞车软预张力，避免系泊后完全松弛） ---
    for (const l of rtLines) {
      if (!l.attached) continue;
      const a = transformPoint(l.chock, s);
      const b = l.bollard;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dz = b.z - a.z;
      const Lc = Math.hypot(dx, dy, dz);
      const strain = (Lc - l.restLength) / l.restLength;
      const tensionN = lineTensionN(l, Lc);
      const tension = tensionN / 1000;
      if (tension > l.maxTension) l.maxTension = tension;
      const util = tension / l.breakingStrength;
      if (util > l.maxUtil) l.maxUtil = util;
      if (tension > input.tensionThreshold) l.alarmsInWindow = true;
      const nx = dx / (Lc || 1);
      const ny = dy / (Lc || 1);
      const nz = dz / (Lc || 1);
      Fx += tensionN * nx;
      Fz += tensionN * nz;
      const rx = a.x - s.x;
      const rz = a.z - s.z;
      My += rz * tensionN * nx - rx * tensionN * nz;
      Mx += (a.y - hG) * tensionN * nz;
      Mz += -(a.y - hG) * tensionN * nx * 0.5;
      void ny;
    }

    // --- 平面运动积分 ---
    const axbWorld = Fx / m;
    const azbWorld = Fz / m;
    // 世界加速度 -> 体系
    const au = Math.cos(s.yaw) * axbWorld - Math.sin(s.yaw) * azbWorld;
    const av = Math.sin(s.yaw) * axbWorld + Math.cos(s.yaw) * azbWorld;
    s.u += au * dt * (m / m11);
    s.v += av * dt * (m / m22);
    s.r += (My / m66) * dt;
    s.x += (Math.cos(s.yaw) * s.u + Math.sin(s.yaw) * s.v) * dt;
    s.z += (-Math.sin(s.yaw) * s.u + Math.cos(s.yaw) * s.v) * dt;
    s.yaw += s.r * dt;

    // 穿透位置修正 + 法向速度抑制
    projectPenetration(s);

    // --- 横摇 ---
    const kRoll = m * G * hydro.GM;
    const cRoll = 2 * 0.1 * Math.sqrt(hydro.Ixx * kRoll);
    const rollAcc = (Mx - kRoll * s.roll - cRoll * s.rollRate) / hydro.Ixx;
    s.rollRate += rollAcc * dt;
    s.roll += s.rollRate * dt;
    s.roll = clamp(s.roll, deg2rad(-15), deg2rad(15));

    // --- 纵摇 ---
    const GML = 40;
    const kPitch = m * G * GML;
    const cPitch = 2 * 0.15 * Math.sqrt(hydro.Iyy * kPitch);
    const pitchAcc = (Mz - kPitch * s.pitch - cPitch * s.pitchRate) / hydro.Iyy;
    s.pitchRate += pitchAcc * dt;
    s.pitch += s.pitchRate * dt;
    s.pitch = clamp(s.pitch, deg2rad(-8), deg2rad(8));

    // --- 升沉 ---
    const kHeave = RHO_WATER * G * hydro.waterplaneArea;
    const cHeave = 2 * 0.18 * Math.sqrt(m * kHeave);
    const fWave = kHeave * waveAmp * Math.sin(waveFreq * time);
    const heaveAcc = (fWave - kHeave * s.heave - cHeave * s.heaveRate) / m;
    s.heaveRate += heaveAcc * dt;
    s.heave += s.heaveRate * dt;
  }

  function computeContacts(s: SimState, time: number): FenderContact[] {
    const out: FenderContact[] = [];
    const protrusion = berth.fender.protrusion;
    const wdotx = Math.cos(s.yaw) * s.u + Math.sin(s.yaw) * s.v;
    const wdotz = -Math.sin(s.yaw) * s.u + Math.cos(s.yaw) * s.v;
    fenders.forEach((fx, i) => {
      // 护舷中心世界系 -> 船体系
      const dx = fx - s.x;
      const dz = 0 - s.z;
      const xb = Math.cos(s.yaw) * dx - Math.sin(s.yaw) * dz;
      if (Math.abs(xb) > ship.length / 2) return;
      const hb = halfBreadthAt(hydro, xb);
      // 该站左舷船壳点世界坐标
      const portWorld = bodyToWorld({ x: xb, y: 0, z: -hb }, s.x, s.z, s.yaw);
      // 沿岸壁方向距离判定
      if (Math.abs(portWorld.x - fx) > berth.fender.halfLength + hb * Math.abs(Math.sin(s.yaw))) {
        // 允许斜交时端部接触
        if (Math.abs(portWorld.x - fx) > berth.fender.halfLength + 1.5) return;
      }
      const pen = protrusion - portWorld.z;
      if (pen <= 0) return;
      // 压入速度（法向）
      const penRate = -wdotz;
      // 非线性护舷：大变形时刚度渐进饱和，避免单点硬接触力发散
      const penN = pen / protrusion;
      const softPen = protrusion * Math.tanh(penN * 1.6) / Math.tanh(1.6);
      const fn = Math.min(
        berth.fender.stiffness * 6,
        Math.max(
          0,
          berth.fender.stiffness * softPen + berth.fender.damping * Math.max(0, penRate)
        )
      );
      // 接触点切向相对速度
      const tangentVel = wdotx - s.r * (0 - s.z);
      const ff = -clamp(berth.fender.friction * fn, -fn, fn) * Math.sign(tangentVel || 1);
      void time;
      out.push({
        index: i,
        point: { x: portWorld.x, y: berth.fender.mountHeight, z: portWorld.z },
        normalForce: fn / 1000,
        frictionForce: ff / 1000,
        penetration: pen
      });
    });
    return out;
  }

  function projectPenetration(s: SimState): void {
    let maxPen = 0;
    for (const fx of fenders) {
      const dx = fx - s.x;
      const dz = -s.z;
      const xb = Math.cos(s.yaw) * dx - Math.sin(s.yaw) * dz;
      if (Math.abs(xb) > ship.length / 2) continue;
      const hb = halfBreadthAt(hydro, xb);
      const portWorld = bodyToWorld({ x: xb, y: 0, z: -hb }, s.x, s.z, s.yaw);
      const pen = berth.fender.protrusion - portWorld.z;
      if (pen > maxPen) maxPen = pen;
    }
    if (maxPen > 0.12) {
      s.z += maxPen - 0.12;
      // 抑制向岸法向速度（护舷非弹性碰撞，恢复系数约 0.3）
      const wdotz = -Math.sin(s.yaw) * s.u + Math.cos(s.yaw) * s.v;
      if (wdotz < 0) {
        const dvz = -wdotz * 0.65;
        s.u += -Math.sin(s.yaw) * dvz;
        s.v += Math.cos(s.yaw) * dvz;
      }
    }
  }

  /** 缆绳当前张力（N），与受力积分使用同一绞车模型 */
  function lineTensionN(l: LineRuntime, Lc: number): number {
    const strain = (Lc - l.restLength) / l.restLength;
    // 双斜率：破断应变 4% 以上刚度折减 35%（缆绳悬垂/材料软化）
    const epsBreak = 0.04;
    let elasticTension: number;
    if (strain <= 0) elasticTension = 0;
    else if (strain <= epsBreak) elasticTension = l.ea * strain;
    else elasticTension = l.ea * epsBreak + l.ea * 0.35 * (strain - epsBreak);
    // 自动绞车：松弛时仍维持接近预张力的恒拉力，把船拉回泊位
    const slack = Math.max(0, (l.attachLength - Lc) / l.attachLength);
    const winchTension = l.attached ? l.pretension * 1000 * Math.exp(-slack * 0.8) : 0;
    return Math.max(elasticTension, winchTension);
  }

  function makeSample(time: number, s: SimState): SimSample {
    const contacts = computeContacts(s, time);
    const lineStates: LineState[] = rtLines.map((l) => {
      // 结算本采样窗口的报警
      if (l.alarmsInWindow) {
        l.alarmCount++;
        l.alarmsInWindow = false;
      }
      if (!l.attached) {
        const a = transformPoint(l.chock, s);
        return {
          id: l.id,
          label: l.label,
          attached: false,
          tension: 0,
          strain: 0,
          length: 0,
          restLength: l.restLength,
          utilization: 0,
          alarm: false,
          endA: a,
          endB: l.bollard
        };
      }
      const a = transformPoint(l.chock, s);
      const b = l.bollard;
      const Lc = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
      const strain = (Lc - l.restLength) / l.restLength;
      const tension = lineTensionN(l, Lc) / 1000;
      const util = tension / l.breakingStrength;
      return {
        id: l.id,
        label: l.label,
        attached: true,
        tension,
        strain,
        length: Lc,
        restLength: l.restLength,
        utilization: util,
        alarm: tension > input.tensionThreshold,
        endA: a,
        endB: b
      };
    });
    const totalF = contacts.reduce((acc, c) => acc + c.normalForce, 0);
    return {
      t: time,
      x: s.x,
      z: s.z,
      yaw: s.yaw,
      roll: s.roll,
      pitch: s.pitch,
      heave: s.heave,
      u: s.u,
      v: s.v,
      r: s.r,
      rollRate: s.rollRate,
      pitchRate: s.pitchRate,
      lines: lineStates,
      contacts,
      totalFenderForce: totalF,
      windMoment: (hydro.windAreaCentroid - hG) *
        (-0.5 * RHO_AIR * 1.05 * hydro.windArea * input.crossWind * Math.abs(input.crossWind)) / 1000
    };
  }

}

