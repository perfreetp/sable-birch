import { computed, reactive, shallowRef, triggerRef } from 'vue'
import {
  DOMAIN,
  GRID,
  TerrainField,
  bakeFrame,
  cloudBaseAt,
  frameTimestamp,
  makeSampler,
  skyCondition,
} from './lib/weather.ts'
import { VolumeCache, volumeCache } from './lib/volumeCache.ts'
import { buildSection, collectSamples, legGeometry, routeLength } from './lib/section.ts'
import { DENSITY_LEVELS } from './lib/types.ts'
import type {
  BasemapId,
  CacheStatus,
  FrameVolume,
  Leg,
  Section,
  SectionSamplePoint,
  Waypoint,
} from './lib/types.ts'
import { makeVolumeTexture } from './lib/scene/weatherScene.ts'
import { drawSection } from './lib/sectionCanvas.ts'
import type { WeatherScene } from './lib/scene/weatherScene.ts'

export type ModuleId = 'route' | 'volume' | 'section'

let wpCounter = 0
function makeId(): string {
  wpCounter += 1
  return `wp${wpCounter}`
}

function defaultWaypoints(): Waypoint[] {
  return [
    { id: makeId(), name: '青浦起降场', x: -5200, z: 3400, altMin: 900, altMax: 1350 },
    { id: makeId(), name: '淀山湖走廊', x: -2200, z: 2600, altMin: 900, altMax: 1350 },
    { id: makeId(), name: '松江枢纽', x: 100, z: 1200, altMin: 950, altMax: 1400 },
    { id: makeId(), name: '临港终点', x: 2600, z: -200, altMin: 1000, altMax: 1500 },
  ]
}

export interface AppState {
  module: ModuleId
  frame: number
  playing: boolean
  speed: number
  tier: number
  basemap: BasemapId
  showVolume: boolean
  showCloudBase: boolean
  showRoute: boolean
  showSection: boolean
  highlightRoute: boolean
  fogStrength: number
  waypoints: Waypoint[]
  selectedId: string | null
  loading: boolean
  fps: number
  cache: CacheStatus
  preload: { active: boolean; done: number; total: number }
  sectionOptions: {
    showVisibility: boolean
    showMsa: boolean
    showBand: boolean
    showCloudBase: boolean
    showGrid: boolean
  }
}

export const state = reactive<AppState>({
  module: 'volume',
  frame: 0,
  playing: false,
  speed: 1,
  tier: 1,
  basemap: 'relief',
  showVolume: true,
  showCloudBase: true,
  showRoute: true,
  showSection: true,
  highlightRoute: true,
  fogStrength: 0.55,
  waypoints: defaultWaypoints(),
  selectedId: null,
  loading: false,
  fps: 0,
  cache: { frames: [], bytes: 0, totalFrames: GRID.frames },
  preload: { active: false, done: 0, total: GRID.frames },
  sectionOptions: {
    showVisibility: true,
    showMsa: true,
    showBand: true,
    showCloudBase: true,
    showGrid: true,
  },
})

state.selectedId = state.waypoints[0].id

export const terrain = new TerrainField()

const frameVolumes = new Map<number, FrameVolume>()
const frameStats = new Map<number, { maxDensity: number; cloudCover: number; minCloudBase: number }>()

export const sectionRef = shallowRef<Section | null>(null)
export const legsRef = shallowRef<Leg[]>([])
export const activeVolume = shallowRef<FrameVolume | null>(null)

let scene: WeatherScene | null = null
let loadingToken = 0
let playTimer = 0
let preloading = false

export const legs = computed<Leg[]>(() => {
  void state.waypoints.map((w) => `${w.id}${w.x}${w.z}${w.altMin}${w.altMax}`)
  return legGeometry(state.waypoints)
})

export const routeKm = computed(() => routeLength(legs.value) / 1000)
export const tierInfo = computed(() => DENSITY_LEVELS[state.tier])
export const frameDate = computed(() => frameTimestamp(state.frame))
export const frameTimeLabel = computed(() => {
  const d = frameDate.value
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}Z`
})
export const cacheFullBytes = VolumeCache.fullSequenceBytes()

export function attachScene(s: WeatherScene): void {
  scene = s
  s.onStats = (fps) => {
    state.fps = Math.round(fps)
  }
  s.setSectionProvider(() => sectionRef.value)
  s.setWaypoints(state.waypoints)
  s.setSelected(state.selectedId)
  s.applyOptions(sceneOptions())
  void applyFrame(state.frame, true)
}

export function detachScene(): void {
  scene = null
}

export function getScene(): WeatherScene | null {
  return scene
}

function sceneOptions() {
  return {
    basemap: state.basemap,
    threshold: tierInfo.value.threshold,
    tier: state.tier,
    opacity: tierInfo.value.opacity,
    showVolume: state.showVolume,
    showCloudBase: state.showCloudBase,
    showRoute: state.showRoute,
    showSection: state.showSection,
    highlightRoute: state.highlightRoute,
    fogStrength: state.fogStrength,
  }
}

let lastRouteSignature = ''
export function syncSceneOptions(): void {
  scene?.applyOptions(sceneOptions())
  // Only rebuild route geometry when the polyline actually changed.
  const signature = state.waypoints
    .map((w) => `${w.id}:${w.x}:${w.z}:${w.altMin}:${w.altMax}`)
    .join('|')
  if (signature !== lastRouteSignature) {
    lastRouteSignature = signature
    scene?.setWaypoints(state.waypoints)
  }
  scene?.setSelected(state.selectedId)
}

export function setBasemap(id: BasemapId): void {
  state.basemap = id
  syncSceneOptions()
}

export function setTier(t: number): void {
  state.tier = Math.max(0, Math.min(2, t))
  syncSceneOptions()
}

async function getFrameVolume(frame: number): Promise<FrameVolume> {
  const mem = frameVolumes.get(frame)
  if (mem) return mem
  const cached = await volumeCache.readFrame(frame)
  if (cached) {
    frameVolumes.set(frame, cached)
    await refreshCacheStatus()
    return cached
  }
  const { volume, stats } = bakeFrame(frame)
  frameVolumes.set(frame, volume)
  frameStats.set(frame, stats)
  await volumeCache.writeFrame(volume, stats)
  await refreshCacheStatus()
  return volume
}

export async function applyFrame(frame: number, force = false): Promise<void> {
  const clamped = Math.max(0, Math.min(GRID.frames - 1, Math.round(frame)))
  if (!force && clamped === state.frame && activeVolume.value) return
  const token = ++loadingToken
  state.frame = clamped
  state.loading = !frameVolumes.has(clamped)
  try {
    const vol = await getFrameVolume(clamped)
    if (token !== loadingToken) return
    activeVolume.value = vol
    triggerRef(activeVolume)
    scene?.setCloudBase(vol.cloudBase, densityProbe(clamped))
    if (scene) scene.setVolumeTexture(makeVolumeTexture(vol.chunks))
    rebuildSection()
    // Prefetch the next frame so playback stays smooth.
    const next = Math.min(GRID.frames - 1, clamped + 1)
    if (next !== clamped) void getFrameVolume(next)
  } finally {
    if (token === loadingToken) state.loading = false
  }
}

/** Rebuilds the 3D curtain from the current section (module-independent). */
function syncSectionCurtain(): void {
  if (!scene) return
  const sec = sectionRef.value
  if (!sec) {
    scene.setSectionCurtain(null, null)
    return
  }
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 288
  const o = state.sectionOptions
  drawSection(canvas, sec, {
    mode: 'curtain',
    showVisibility: o.showVisibility,
    showMsa: o.showMsa,
    showBand: false,
    showCloudBase: o.showCloudBase,
    showGrid: false,
    width: 1024,
    height: 288,
    dpr: 1,
  })
  scene.setSectionCurtain(sec, scene.sectionTextureFromCanvas(canvas))
}

export function rebuildSection(): void {
  const vol = activeVolume.value
  if (!vol || state.waypoints.length < 2) {
    sectionRef.value = null
    triggerRef(sectionRef)
    return
  }
  const s = buildSection(state.waypoints, legs.value, vol, terrain, state.frame)
  sectionRef.value = s
  triggerRef(sectionRef)
  legsRef.value = legs.value
  triggerRef(legsRef)
  syncSectionCurtain()
}

/** Re-draws the curtain when section overlay options change. */
export function refreshSectionStyles(): void {
  syncSectionCurtain()
}

export function setFrame(frame: number): void {
  if (frame === state.frame) return
  void applyFrame(frame)
}

export function stepFrame(delta: number): void {
  const next = (state.frame + delta + GRID.frames) % GRID.frames
  void applyFrame(next)
}

export function togglePlay(): void {
  state.playing = !state.playing
  if (state.playing) {
    playTimer = window.setInterval(() => {
      void applyFrame((state.frame + 1) % GRID.frames)
    }, 1100 / state.speed)
  } else {
    window.clearInterval(playTimer)
  }
}

export function setSpeed(v: number): void {
  state.speed = v
  if (state.playing) {
    togglePlay()
    togglePlay()
  }
}

export function updateWaypoint(id: string, patch: Partial<Waypoint>): void {
  const wp = state.waypoints.find((w) => w.id === id)
  if (!wp) return
  Object.assign(wp, patch)
  // Keep the altitude band ordered and clear of the ground.
  if (wp.altMin > wp.altMax) {
    const t = wp.altMin
    wp.altMin = wp.altMax
    wp.altMax = t
  }
  onRouteChanged()
}

export function addWaypoint(): void {
  const last = state.waypoints[state.waypoints.length - 1]
  const prev = state.waypoints[state.waypoints.length - 2]
  let x = 0
  let z = 0
  if (last && prev) {
    x = last.x + (last.x - prev.x)
    z = last.z + (last.z - prev.z)
  } else if (last) {
    x = last.x + 1200
    z = last.z
  }
  x = Math.max(-DOMAIN.halfX + 300, Math.min(DOMAIN.halfX - 300, x))
  z = Math.max(-DOMAIN.halfZ + 300, Math.min(DOMAIN.halfZ - 300, z))
  const wp: Waypoint = {
    id: makeId(),
    name: `航路点 ${state.waypoints.length + 1}`,
    x: Math.round(x),
    z: Math.round(z),
    altMin: last?.altMin ?? 900,
    altMax: last?.altMax ?? 1350,
  }
  state.waypoints.push(wp)
  state.selectedId = wp.id
  onRouteChanged()
}

export function removeWaypoint(id: string): void {
  if (state.waypoints.length <= 2) return
  const idx = state.waypoints.findIndex((w) => w.id === id)
  if (idx < 0) return
  state.waypoints.splice(idx, 1)
  if (state.selectedId === id) {
    state.selectedId = state.waypoints[Math.max(0, idx - 1)]?.id ?? null
  }
  onRouteChanged()
}

export function moveWaypoint(id: string, dir: -1 | 1): void {
  const idx = state.waypoints.findIndex((w) => w.id === id)
  const to = idx + dir
  if (idx < 0 || to < 0 || to >= state.waypoints.length) return
  const [wp] = state.waypoints.splice(idx, 1)
  state.waypoints.splice(to, 0, wp)
  onRouteChanged()
}

export function reorderWaypoints(fromId: string, toId: string): void {
  const fromIdx = state.waypoints.findIndex((w) => w.id === fromId)
  const toIdx = state.waypoints.findIndex((w) => w.id === toId)
  if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return
  const [wp] = state.waypoints.splice(fromIdx, 1)
  state.waypoints.splice(toIdx, 0, wp)
  onRouteChanged()
}

export function selectWaypoint(id: string | null): void {
  state.selectedId = id
  scene?.setSelected(id)
}

export function onRouteChanged(): void {
  scene?.setWaypoints(state.waypoints)
  lastRouteSignature = state.waypoints
    .map((w) => `${w.id}:${w.x}:${w.z}:${w.altMin}:${w.altMax}`)
    .join('|')
  scene?.setSelected(state.selectedId)
  rebuildSection()
}

export function setModule(m: ModuleId): void {
  state.module = m
}

/** Fast density probe used by the cloud-base surface shading. */
let probeCache: ((x: number, y: number, z: number) => number) | null = null
let probeFrame = -1
function densityProbe(frame: number): (x: number, y: number, z: number) => number {
  if (probeFrame !== frame || !probeCache) {
    const vol = activeVolume.value
    if (!vol) return () => 0
    const sample = makeSampler(vol)
    probeCache = (x, y, z) => sample(x, y, z).density
    probeFrame = frame
  }
  return probeCache
}

export function resetView(): void {
  scene?.resetView()
}

export function focusRoute(): void {
  scene?.focusRoute()
}

export function randomizeRoute(): void {
  const names = ['青浦起降场', '淀山湖走廊', '松江枢纽', '临港终点', '川沙中转', '崇明北岸']
  const pts = [
    [-5200, 3400],
    [-2200, 2600],
    [100, 1200],
    [2600, -200],
    [-3400, -2600],
    [4200, 3000],
  ]
  state.waypoints = pts.map((p, i) => ({
    id: makeId(),
    name: names[i],
    x: p[0],
    z: p[1],
    altMin: 900 + (i % 2) * 50,
    altMax: 1350 + (i % 3) * 60,
  }))
  state.selectedId = state.waypoints[0].id
  onRouteChanged()
}

export async function refreshCacheStatus(): Promise<void> {
  const metas = await volumeCache.listFrames()
  const usage = await volumeCache.usage()
  state.cache = {
    frames: metas.map((m) => m.frame),
    bytes: usage.bytes,
    totalFrames: GRID.frames,
  }
}

export async function preloadAll(): Promise<void> {
  if (preloading) return
  preloading = true
  state.preload.active = true
  state.preload.done = state.cache.frames.length
  try {
    for (let f = 0; f < GRID.frames; f++) {
      if (frameVolumes.has(f) || state.cache.frames.includes(f)) {
        state.preload.done = Math.max(state.preload.done, f + 1)
        continue
      }
      await getFrameVolume(f)
      state.preload.done = f + 1
    }
  } finally {
    preloading = false
    state.preload.active = false
    await refreshCacheStatus()
  }
}

export async function clearCache(): Promise<void> {
  await volumeCache.clear()
  frameVolumes.clear()
  frameStats.clear()
  await refreshCacheStatus()
}

export function clearInMemoryCache(): void {
  frameVolumes.clear()
  frameStats.clear()
}

export function datasetSummary(): {
  time: string
  coverage: number
  minBase: number
  condition: string
  maxDensity: number
} {
  const vol = activeVolume.value
  if (!vol) return { time: frameTimeLabel.value, coverage: 0, minBase: NaN, condition: '载入中', maxDensity: 0 }
  let covered = 0
  let minBase = Infinity
  for (const v of vol.cloudBase) {
    if (!Number.isNaN(v)) {
      covered++
      if (v < minBase) minBase = v
    }
  }
  const total = vol.cloudBase.length
  const stats = frameStats.get(vol.frame)
  let maxD = stats?.maxDensity ?? 0
  if (!stats) {
    maxD = 0
    for (const ch of vol.chunks) {
      for (let i = 0; i < ch.length; i += 4) {
        const d = ch[i] / 255
        if (d > maxD) maxD = d
      }
    }
  }
  return {
    time: frameTimeLabel.value,
    coverage: covered / total,
    minBase: Number.isFinite(minBase) ? minBase : NaN,
    condition: skyCondition(covered / total),
    maxDensity: maxD,
  }
}

export interface ExportPayload {
  meta: Record<string, unknown>
  legs: Array<{
    leg: Leg
    status: string
    minVisibility: number
    maxDensity: number
    profile: Array<Record<string, unknown>>
    samples: SectionSamplePoint[]
  }>
}

export function buildExportPayload(): ExportPayload | null {
  const sec = sectionRef.value
  const vol = activeVolume.value
  if (!sec || !vol) return null
  const date = frameDate.value
  const samples = collectSamples(state.waypoints, legs.value, vol, terrain, state.frame)
  const meta = {
    product: 'Aeroscope 低空航路气象剖面',
    generatedAt: new Date().toISOString(),
    analysisEpoch: date.toISOString(),
    frame: state.frame,
    framesTotal: GRID.frames,
    frameStepMinutes: GRID.frameStepMinutes,
    densityTier: `${DENSITY_LEVELS[state.tier].name} (${DENSITY_LEVELS[state.tier].label})`,
    densityThreshold: DENSITY_LEVELS[state.tier].threshold,
    domain: {
      halfExtentM: DOMAIN.halfX,
      topM: DOMAIN.top,
      grid: [GRID.nx, GRID.ny, GRID.nz],
      originLat: DOMAIN.originLat,
      originLon: DOMAIN.originLon,
    },
    route: {
      lengthM: Math.round(routeLength(legs.value)),
      waypoints: state.waypoints.map((w) => ({ ...w })),
    },
    section: {
      cols: sec.cols,
      rows: sec.rows,
      sMax: sec.sMax,
      altMax: sec.altMax,
      minVisibility: Math.round(sec.stats.minVisibility),
      meanVisibility: Math.round(sec.stats.meanVisibility),
      maxDensity: Number(sec.stats.maxDensity.toFixed(4)),
    },
  }
  const outLegs = legs.value.map((leg) => {
    const span = sec.legSpans[leg.index]
    const c0 = Math.max(0, Math.floor((leg.s0 / Math.max(1e-6, sec.sMax)) * (sec.cols - 1)))
    const c1 = Math.min(sec.cols - 1, Math.ceil((leg.s1 / Math.max(1e-6, sec.sMax)) * (sec.cols - 1)))
    const profile: Array<Record<string, unknown>> = []
    const step = Math.max(1, Math.floor((c1 - c0) / 64))
    for (let c = c0; c <= c1; c += step) {
      const lo = sec.bandBottom[c]
      const hi = sec.bandTop[c]
      let minVis = Infinity
      let maxDen = 0
      for (let r = 0; r < sec.rows; r++) {
        const alt = r * sec.rowStep
        if (alt < lo || alt > hi) continue
        const i = c + sec.cols * r
        if (sec.density[i] < 0) continue
        minVis = Math.min(minVis, sec.visibility[i])
        maxDen = Math.max(maxDen, sec.density[i])
      }
      profile.push({
        distance: Number(((c / (sec.cols - 1)) * sec.sMax).toFixed(1)),
        bandBottom: Math.round(lo),
        bandTop: Math.round(hi),
        terrain: Math.round(sec.terrain[c]),
        msa: Math.round(sec.msa[c]),
        cloudBase: Number.isNaN(sec.cloudBase[c]) ? null : Math.round(sec.cloudBase[c]),
        minVisibility: Number.isFinite(minVis) ? Math.round(minVis) : null,
        maxDensity: Number(maxDen.toFixed(3)),
      })
    }
    return {
      leg: { ...leg },
      status: span?.status ?? 'clear',
      minVisibility: Math.round(span?.minVisibility ?? 26000),
      maxDensity: Number((span?.maxDensity ?? 0).toFixed(3)),
      profile,
      samples: samples.filter((s) => s.legIndex === leg.index),
    }
  })
  return { meta, legs: outLegs }
}

export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

export function exportJson(): void {
  const payload = buildExportPayload()
  if (!payload) return
  const stamp = frameDate.value.toISOString().replace(/[:.]/g, '-').slice(0, 19)
  downloadBlob(
    `aeroscope-section-${stamp}.json`,
    new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }),
  )
}

export function exportCsv(): void {
  const payload = buildExportPayload()
  if (!payload) return
  const header = [
    'leg_index',
    'leg_label',
    'distance_m',
    'lon',
    'lat',
    'altitude_m',
    'density',
    'precip',
    'visibility_m',
    'cloud_base_m',
    'msa_m',
  ]
  const lines = [header.join(',')]
  for (const leg of payload.legs) {
    for (const s of leg.samples) {
      lines.push(
        [
          s.legIndex,
          `"${s.legLabel}"`,
          s.distance,
          s.lon,
          s.lat,
          s.altitude,
          s.density,
          s.precip,
          s.visibility,
          s.cloudBase,
          s.msa,
        ].join(','),
      )
    }
  }
  const stamp = frameDate.value.toISOString().replace(/[:.]/g, '-').slice(0, 19)
  // BOM keeps Excel happy with the Chinese leg labels.
  downloadBlob(
    `aeroscope-visibility-${stamp}.csv`,
    new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' }),
  )
}

export function exportSectionPng(canvas: HTMLCanvasElement | null): void {
  if (!canvas) return
  canvas.toBlob((blob) => {
    if (!blob) return
    const stamp = frameDate.value.toISOString().replace(/[:.]/g, '-').slice(0, 19)
    downloadBlob(`aeroscope-section-${stamp}.png`, blob)
  }, 'image/png')
}

/** Latitude/longitude footprint of the analysed domain. */
export const domainLabel = computed(() => {
  const lat = DOMAIN.originLat
  const lon = DOMAIN.originLon
  return `${lat.toFixed(3)}°N ${lon.toFixed(3)}°E · ${(DOMAIN.halfX * 2) / 1000} km × ${(DOMAIN.halfZ * 2) / 1000} km`
})

export function cloudBaseAtRoute(): number {
  const vol = activeVolume.value
  if (!vol) return NaN
  const t = state.frame / (GRID.frames - 1)
  let min = Infinity
  for (const w of state.waypoints) {
    const v = cloudBaseAt(w.x, w.z, t)
    if (!Number.isNaN(v)) min = Math.min(min, v)
  }
  return Number.isFinite(min) ? min : NaN
}

export function disposePlayback(): void {
  window.clearInterval(playTimer)
  state.playing = false
}
