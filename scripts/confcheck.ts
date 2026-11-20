import { Simulation } from '../src/lib/simulation'
import { generateSampleScenario } from '../src/lib/sampleData'

const sim = new Simulation(generateSampleScenario())
for (let t = 0; t <= sim.duration; t += 0.1) sim.evaluate(Math.round(t * 10) / 10)
const list = sim.getConflictList()
console.log('总冲突数:', list.length)
for (const c of list) {
  console.log(
    ' ', c.aircraftA, '↔', c.aircraftB,
    `${c.startTime.toFixed(1)}s → ${c.endTime.toFixed(1)}s`,
    `minH=${c.minHorizontal.toFixed(1)}m`, `dv=${c.verticalAtMinH.toFixed(1)}m`
  )
}
