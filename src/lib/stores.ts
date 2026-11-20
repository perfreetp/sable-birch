import { writable } from 'svelte/store'
import type { AircraftSummary, ConflictRecord } from './types'

/** 倍速档位（3 档） */
export const SPEEDS = [1, 2, 4] as const
export type Speed = (typeof SPEEDS)[number]

export const playing = writable(false)
export const speed = writable<Speed>(1)
export const currentTime = writable(0)
export const duration = writable(1)
export const scenarioName = writable('')
export const horizontalThreshold = writable(80)
export const verticalThreshold = writable(30)
export const selectedId = writable<string | null>(null)
export const summaries = writable<AircraftSummary[]>([])
export const conflictList = writable<ConflictRecord[]>([])
export const activeConflictCount = writable(0)
export const totalConflictCount = writable(0)

/** 全局轻提示 */
export const toast = writable<{ msg: string; kind: 'info' | 'warn' | 'ok' } | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | undefined
export function showToast(msg: string, kind: 'info' | 'warn' | 'ok' = 'info'): void {
  toast.set({ msg, kind })
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.set(null), 3200)
}

export function formatClock(t: number): string {
  const m = Math.floor(t / 60)
  const s = t - m * 60
  return `${String(m).padStart(2, '0')}:${s.toFixed(1).padStart(4, '0')}`
}
