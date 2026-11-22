import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  onwarn: (warning, handler) => {
    // 多行 <input> 被误判为组件名的误报
    if (warning.code === 'component_name_lowercase') return;
    handler?.(warning);
  }
};
