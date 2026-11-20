import { computeTrajectory, DEFAULT_LAUNCH_PARAMS } from '../src/lib/trajectory'
import { exportTrajectoryJSON, importTrajectoryJSON, fmtTime } from '../src/lib/io'

// Node 环境没有 DOM，模拟 Blob/URL 做数据往返
const r = computeTrajectory(DEFAULT_LAUNCH_PARAMS)
const json = JSON.stringify(r)
const roundtrip = JSON.parse(json) as typeof r

console.log('JSON size (KB):', (json.length / 1024).toFixed(1))
console.log('schemaVersion:', roundtrip.schemaVersion)
console.log('samples match:', roundtrip.samples.length === r.samples.length)
console.log('events match:', roundtrip.events.length === r.events.length)
console.log('duration:', fmtTime(roundtrip.duration), 'insertion alt km:', (roundtrip.insertionAltitude / 1000).toFixed(1))
// 校验关键字段完整
const s0 = roundtrip.samples[0]
const requiredSample = ['t', 'x', 'y', 'z', 'vx', 'vy', 'vz', 'altitude', 'speed', 'flightPathAngle', 'phase']
console.log('sample fields ok:', requiredSample.every((k) => k in s0))
const e0 = roundtrip.events[0]
const requiredEvent = ['kind', 't', 'position', 'velocity', 'speed', 'altitude', 'impact', 'impactZone', 'orbital', 'perigeeKm', 'color']
console.log('event fields ok:', requiredEvent.every((k) => k in e0))
console.log('params preserved:', roundtrip.params.longitude === DEFAULT_LAUNCH_PARAMS.longitude)
