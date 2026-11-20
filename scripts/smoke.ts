import { computeTrajectory, DEFAULT_LAUNCH_PARAMS } from '../src/lib/trajectory'
import { ecefToGeodetic } from '../src/lib/geo'

const r = computeTrajectory(DEFAULT_LAUNCH_PARAMS)
console.log('duration(s)      :', r.duration.toFixed(1))
console.log('samples          :', r.samples.length)
console.log('insertion alt(km):', (r.insertionAltitude / 1000).toFixed(2))
console.log('target alt (km)  :', DEFAULT_LAUNCH_PARAMS.targetOrbitAltitudeKm)
console.log('insertion v(m/s) :', r.insertionSpeed.toFixed(1))
console.log('min altitude (m) :', Math.min(...r.samples.map((s) => s.altitude)).toFixed(1))
console.log('phases           :', r.phases.map((p) => `${p.label}[${p.t0}-${p.t1.toFixed(0)}]`).join(' '))
console.log('\n--- events ---')
for (const ev of r.events) {
  console.log(
    `${ev.label} t=${ev.t.toFixed(0)}s alt=${(ev.altitude / 1000).toFixed(1)}km v=${(ev.speed / 1000).toFixed(2)}km/s ` +
    `impact=(${ev.impact.lon.toFixed(2)}, ${ev.impact.lat.toFixed(2)}) range=${ev.impact.rangeKm.toFixed(0)}km ` +
    `fall=${ev.impact.flightTime.toFixed(0)}s hullPts=${ev.impactZone.length}`,
  )
}
// 检查弹道是否穿地
const underground = r.samples.filter((s) => s.altitude < -1)
console.log('\nunderground pts  :', underground.length)
// 检查高度单调（动力段）
const powered = r.samples.filter((s) => s.phase !== 'coast')
let drops = 0
for (let i = 1; i < powered.length; i++) if (powered[i].altitude < powered[i - 1].altitude - 50) drops++
console.log('altitude drops   :', drops)
// 入轨点地理坐标
const last = r.samples[r.samples.length - 1]
const g = ecefToGeodetic({ x: last.x, y: last.y, z: last.z } as any)
console.log('insertion LLA    :', g.lon.toFixed(2), g.lat.toFixed(2), (g.h / 1000).toFixed(1))
console.log('final path angle :', last.flightPathAngle.toFixed(2), 'deg')
// 卡门线穿越时间
const karman = r.samples.find((s) => s.altitude >= 100_000)
console.log('Karman crossing  :', karman ? `t=${karman.t.toFixed(0)}s` : 'NEVER')
