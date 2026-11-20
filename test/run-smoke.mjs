// 用 esbuild 把 TS 测试打包为临时 ESM 再交给 Node 执行
import { build } from 'esbuild';
import { rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const outfile = path.join(here, '.smoke.bundle.mjs');

await build({
  entryPoints: [path.join(here, 'smoke.ts')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  outfile,
  logLevel: 'warning'
});

try {
  await import(pathToFileURL(outfile).href);
} finally {
  await rm(outfile, { force: true });
}
