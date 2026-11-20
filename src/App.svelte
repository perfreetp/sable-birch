<script lang="ts">
  import { createGalleryConfig } from './data';
  import PanoViewer from './lib/PanoViewer.svelte';
  import ModelOverlay from './lib/ModelOverlay.svelte';
  import Sidebar from './lib/Sidebar.svelte';
  import PathControls from './lib/PathControls.svelte';

  const config = createGalleryConfig();
</script>

<div class="app">
  <Sidebar exhibits={config.exhibits} title={config.title} />
  <main class="stage">
    <PanoViewer {config} />
    <ModelOverlay />
    <PathControls {config} />
  </main>
</div>

<style>
  .app {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .stage {
    position: relative;
    flex: 1;
    min-width: 0;
  }
</style>
