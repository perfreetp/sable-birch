import type { ManifoldToplevel } from 'manifold-3d';

let promise: Promise<ManifoldToplevel> | null = null;

function wasmUrl() {
  const origin = typeof globalThis.location !== 'undefined' ? globalThis.location.origin : '';
  return new URL('/manifold.wasm', origin || 'http://localhost').href;
}

/** 主线程与 Worker 通用的 manifold 加载器 */
export function loadManifold(): Promise<ManifoldToplevel> {
  if (!promise) {
    promise = (async () => {
      const mod = await import('manifold-3d');
      const wasm = await mod.default({ locateFile: () => wasmUrl() });
      wasm.setup();
      return wasm;
    })();
  }
  return promise;
}
