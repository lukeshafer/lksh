import { defineConfig } from 'astro/config';
import prefetch from "@astrojs/prefetch";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [prefetch(), svelte(), sitemap(), image()]
});