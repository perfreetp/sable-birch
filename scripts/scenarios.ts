import { runSimulation } from '../src/lib/sim/engine';
import { DEFAULT_SHIPS, DEFAULT_BERTHS, DEFAULT_INPUT, buildDefaultLines } from '../src/lib/defaults';
import type { BerthInput } from '../src/lib/types';

const ship = DEFAULT_SHIPS[0];
const berth = DEFAULT_BERTHS[0];
const lines = buildDefaultLines(ship, berth);

const scenarios: [string, Partial<BerthInput>][] = [
  ['基准工况', {}],
  ['大角度 20°', { berthAngleDeg: 20, approachSpeed: 0.2 }],
  ['高速 0.4m/s', { approachSpeed: 0.4, berthAngleDeg: 5 }],
  ['强风 22m/s', { crossWind: 22, crossCurrent: 1.0 }],
  ['零角度平行', { berthAngleDeg: 0.5, approachSpeed: 0.1 }],
  ['远距 55m', { initialOffshoreDist: 55 }]
];

for (const [name, patch] of scenarios) {
  const input = { ...DEFAULT_INPUT, ...patch };
  const r = runSimulation({ ship, berth, input, lines });
  const ok = r.samples.every((s) =>
    [s.x, s.z, s.yaw, s.roll, s.pitch, s.heave, s.u, s.v, s.r].every(Number.isFinite)
  );
  const maxT = Math.max(...r.lineSummary.map((l) => l.maxTension));
  const alarms = r.lineSummary.reduce((a, l) => a + l.alarmCount, 0);
  console.log(
    `${name.padEnd(12)} 时长=${r.duration.toFixed(0).padStart(4)}s 间隙=${r.final.offshoreDistance.toFixed(2).padStart(5)}m` +
    ` 偏角=${r.final.yawErrorDeg.toFixed(2).padStart(6)}° 横倾=${r.final.rollDeg.toFixed(2).padStart(6)}°` +
    ` 最大护舷力=${r.final.maxFenderForce.toFixed(0).padStart(6)}kN 缆绳峰值=${maxT.toFixed(0).padStart(6)}kN 报警=${alarms} ${ok ? '✓' : '✗'}`
  );
}
