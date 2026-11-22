// 引擎冒烟测试：node --import tsx 风格运行（先编译为 esbuild 可直接处理的 TS）
// 用法：npx tsx scripts/smoke.ts
import { runSimulation } from '../src/lib/sim/engine';
import { DEFAULT_SHIPS, DEFAULT_BERTHS, DEFAULT_INPUT, buildDefaultLines } from '../src/lib/defaults';

const ship = DEFAULT_SHIPS[0];
const berth = DEFAULT_BERTHS[0];
const lines = buildDefaultLines(ship, berth);

const result = runSimulation({ ship, berth, input: DEFAULT_INPUT, lines });

const s0 = result.samples[0];
const sEnd = result.samples[result.samples.length - 1];
const allFinite = result.samples.every(
  (s) => [s.x, s.z, s.yaw, s.roll, s.pitch, s.heave, s.u, s.v, s.r].every(Number.isFinite)
);

console.log('采样点数:', result.samples.length);
console.log('仿真时长(s):', result.duration.toFixed(1));
console.log('初始:', { x: s0.x.toFixed(2), z: s0.z.toFixed(2), yaw: s0.yaw.toFixed(3) });
console.log('末态:', {
  x: sEnd.x.toFixed(2),
  z: sEnd.z.toFixed(2),
  yaw: sEnd.yaw.toFixed(4),
  roll: sEnd.roll.toFixed(4),
  pitch: sEnd.pitch.toFixed(4)
});
console.log('结果:', JSON.stringify(result.final, null, 2));
console.log('缆绳汇总:');
for (const l of result.lineSummary) {
  console.log(`  ${l.label}: 峰值 ${l.maxTension.toFixed(1)} kN, 终值 ${l.finalTension.toFixed(1)} kN, 报警 ${l.alarmCount}`);
}
console.log('全部有限:', allFinite);

const failures: string[] = [];
if (!allFinite) failures.push('存在 NaN/Infinity');
if (sEnd.z > DEFAULT_INPUT.initialOffshoreDist + 1) failures.push('船未向岸移动');
if (result.final.maxFenderForce <= 0) failures.push('未产生护舷反力');
if (result.final.lineAttachTime < 0) failures.push('未触发挂缆');
if (result.lineSummary.every((l) => l.maxTension <= 0)) failures.push('缆绳无张力');

if (failures.length) {
  console.error('失败:', failures);
  process.exit(1);
}
console.log('OK');
