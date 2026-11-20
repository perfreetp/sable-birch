import { computeTrajectory, DEFAULT_LAUNCH_PARAMS } from '../src/lib/trajectory'

for (const target of [200, 400, 700, 1000, 1200]) {
  const r = computeTrajectory({ ...DEFAULT_LAUNCH_PARAMS, targetOrbitAltitudeKm: target })
  const err = Math.abs(r.insertionAltitude / 1000 - target)
  const underground = r.samples.filter((s) => s.altitude < -1).length
  const monotonic = r.samples.every((s, i) => i === 0 || s.altitude >= r.samples[i - 1].altitude - 50)
  console.log(
    `target=${target}km got=${(r.insertionAltitude / 1000).toFixed(1)}km err=${err.toFixed(1)} ` +
    `v=${(r.insertionSpeed / 1000).toFixed(2)}km/s underground=${underground} monotonic=${monotonic} ` +
    `events=${r.events.map((e) => `${e.kind}:${e.orbital ? 'orbit' : 'fall'}`).join(',')}`,
  )
}
// 不同 TWR
for (const twr of [1.3, 1.6, 2.0]) {
  const r = computeTrajectory({ ...DEFAULT_LAUNCH_PARAMS, thrustToWeight: twr })
  console.log(`TWR=${twr} alt=${(r.insertionAltitude / 1000).toFixed(1)}km v=${(r.insertionSpeed / 1000).toFixed(2)} duration=${r.duration.toFixed(0)}s`)
}
