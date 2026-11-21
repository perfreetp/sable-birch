import { CHUNKS_PER_FRAME, FRAME_BYTES, GRID } from './weather.ts'
import type { FrameVolume } from './types.ts'

/**
 * Chunked volume cache in IndexedDB.
 *
 * Every 16^3 RGBA8 texture chunk of every frame is stored as its own record, so
 * frames stream in progressively instead of one giant blob per frame. Records carry
 * the analysed epoch so a regenerated dataset invalidates them cleanly.
 */

const DB_NAME = 'aeroscope-volume'
const DB_VERSION = 1
const STORE_CHUNKS = 'chunks'
const STORE_META = 'meta'
export const CACHE_EPOCH = '2026-11-21T06:00Z/v4'

export interface FrameMeta {
  frame: number
  minutes: number
  cloudBase: Float32Array
  stats: { maxDensity: number; cloudCover: number; minCloudBase: number }
  epoch: string
}

function call<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error ?? new Error('IndexedDB request failed'))
  })
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error ?? new Error('IndexedDB transaction failed'))
    tx.onabort = () => reject(tx.error ?? new Error('IndexedDB transaction aborted'))
  })
}

export class VolumeCache {
  private db: IDBDatabase | null = null
  private openPromise: Promise<IDBDatabase> | null = null
  available = true

  async open(): Promise<IDBDatabase | null> {
    if (this.db) return this.db
    if (this.openPromise) return this.openPromise
    if (typeof indexedDB === 'undefined') {
      this.available = false
      return null
    }
    this.openPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(STORE_CHUNKS)) {
          const store = db.createObjectStore(STORE_CHUNKS, { keyPath: 'key' })
          store.createIndex('frame', 'frame')
        }
        if (!db.objectStoreNames.contains(STORE_META)) {
          db.createObjectStore(STORE_META, { keyPath: 'frame' })
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'))
    })
      .then((db) => {
        this.db = db
        db.onversionchange = () => db.close()
        return db
      })
      .catch((err) => {
        // Private windows and blocked storage fall back to memory-only operation.
        this.available = false
        console.warn('[cache] IndexedDB unavailable, continuing without persistence:', err)
        throw err
      })
    return this.openPromise
  }

  async writeFrame(volume: FrameVolume, stats: FrameMeta['stats']): Promise<void> {
    if (!this.available) return
    const db = await this.open()
    if (!db) return
    const tx = db.transaction([STORE_CHUNKS, STORE_META], 'readwrite')
    const chunks = tx.objectStore(STORE_CHUNKS)
    for (let i = 0; i < volume.chunks.length; i++) {
      chunks.put({
        key: `${CACHE_EPOCH}:${volume.frame}:${i}`,
        frame: volume.frame,
        idx: i,
        epoch: CACHE_EPOCH,
        bytes: volume.chunks[i].buffer,
      })
    }
    tx.objectStore(STORE_META).put({
      frame: volume.frame,
      minutes: volume.minutes,
      cloudBase: volume.cloudBase,
      stats,
      epoch: CACHE_EPOCH,
    })
    await txDone(tx)
  }

  async readFrame(frame: number): Promise<FrameVolume | null> {
    if (!this.available) return null
    try {
      const db = await this.open()
      if (!db) return null
      const tx = db.transaction([STORE_CHUNKS, STORE_META], 'readonly')
      const metaReq = tx.objectStore(STORE_META).get(frame) as IDBRequest<FrameMeta | undefined>
      const meta = await call(metaReq)
      if (!meta || meta.epoch !== CACHE_EPOCH) return null
      const range = IDBKeyRange.bound(
        `${CACHE_EPOCH}:${frame}:`,
        `${CACHE_EPOCH}:${frame}:￿`,
      )
      const records = await call(
        tx.objectStore(STORE_CHUNKS).getAll(range) as IDBRequest<
          Array<{ idx: number; bytes: ArrayBuffer }>
        >,
      )
      if (records.length !== CHUNKS_PER_FRAME) return null
      const chunks: Uint8Array[] = new Array(CHUNKS_PER_FRAME)
      for (const rec of records) chunks[rec.idx] = new Uint8Array(rec.bytes)
      return { frame, chunks, cloudBase: new Float32Array(meta.cloudBase), minutes: meta.minutes }
    } catch (err) {
      console.warn('[cache] read failed:', err)
      return null
    }
  }

  async listFrames(): Promise<FrameMeta[]> {
    if (!this.available) return []
    try {
      const db = await this.open()
      if (!db) return []
      const tx = db.transaction(STORE_META, 'readonly')
      const all = await call(tx.objectStore(STORE_META).getAll() as IDBRequest<FrameMeta[]>)
      return all.filter((m) => m.epoch === CACHE_EPOCH).sort((a, b) => a.frame - b.frame)
    } catch (err) {
      console.warn('[cache] list failed:', err)
      return []
    }
  }

  async usage(): Promise<{ bytes: number; frames: number }> {
    if (!this.available) return { bytes: 0, frames: 0 }
    try {
      const db = await this.open()
      if (!db) return { bytes: 0, frames: 0 }
      const tx = db.transaction(STORE_CHUNKS, 'readonly')
      const all = await call(
        tx.objectStore(STORE_CHUNKS).getAll() as IDBRequest<Array<{ bytes: ArrayBuffer }>>,
      )
      let bytes = 0
      for (const rec of all) bytes += rec.bytes.byteLength
      return { bytes, frames: Math.round(all.length / CHUNKS_PER_FRAME) }
    } catch {
      return { bytes: 0, frames: 0 }
    }
  }

  async clear(): Promise<void> {
    if (!this.available) return
    try {
      const db = await this.open()
      if (!db) return
      const tx = db.transaction([STORE_CHUNKS, STORE_META], 'readwrite')
      tx.objectStore(STORE_CHUNKS).clear()
      tx.objectStore(STORE_META).clear()
      await txDone(tx)
    } catch (err) {
      console.warn('[cache] clear failed:', err)
    }
  }

  /** Keeps only frames inside the sliding window. */
  async trim(before: number, after: number): Promise<void> {
    if (!this.available) return
    try {
      const db = await this.open()
      if (!db) return
      const metas = await this.listFrames()
      const stale = metas.filter((m) => m.frame < before || m.frame > after)
      if (stale.length === 0) return
      const tx = db.transaction([STORE_CHUNKS, STORE_META], 'readwrite')
      const chunks = tx.objectStore(STORE_CHUNKS)
      const metaStore = tx.objectStore(STORE_META)
      for (const m of stale) {
        for (let i = 0; i < CHUNKS_PER_FRAME; i++) chunks.delete(`${CACHE_EPOCH}:${m.frame}:${i}`)
        metaStore.delete(m.frame)
      }
      await txDone(tx)
    } catch (err) {
      console.warn('[cache] trim failed:', err)
    }
  }

  /** Approximate raw texture footprint of the full sequence, for the UI. */
  static fullSequenceBytes(): number {
    return GRID.frames * FRAME_BYTES
  }
}

export const volumeCache = new VolumeCache()
