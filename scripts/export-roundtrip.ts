// 配置导出 -> 解析 往返一致性测试
import {
  DEFAULT_BERTHS,
  DEFAULT_INPUT,
  DEFAULT_SHIPS,
  buildDefaultLines
} from '../src/lib/defaults';
import { exportBundle, parseBundle } from '../src/lib/storage';
import type { PersistedState } from '../src/lib/storage';

const state: PersistedState = {
  ships: DEFAULT_SHIPS,
  berths: DEFAULT_BERTHS,
  input: DEFAULT_INPUT,
  lines: buildDefaultLines(DEFAULT_SHIPS[0], DEFAULT_BERTHS[0]),
  selectedShipId: DEFAULT_SHIPS[0].id,
  selectedBerthId: DEFAULT_BERTHS[0].id
};

const text = exportBundle(state);
const parsed = parseBundle(text);

const checks: [string, boolean][] = [
  ['app 标识', parsed.app === 'berth-attitude-sim'],
  ['船型数量', parsed.ships.length === DEFAULT_SHIPS.length],
  ['泊位数量', parsed.berths.length === DEFAULT_BERTHS.length],
  ['缆绳数量', parsed.lines.length === state.lines.length],
  ['工况角度', parsed.input.berthAngleDeg === DEFAULT_INPUT.berthAngleDeg],
  ['选中船型', parsed.selectedShipId === state.selectedShipId]
];

let ok = true;
for (const [name, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${name}`);
  if (!pass) ok = false;
}

// 错误文件应被拒绝
try {
  parseBundle(JSON.stringify({ app: 'other' }));
  console.log('✗ 错误文件未被拒绝');
  ok = false;
} catch {
  console.log('✓ 非法文件被拒绝');
}

if (!ok) process.exit(1);
console.log('OK');
