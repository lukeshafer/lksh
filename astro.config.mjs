import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import image from '@astrojs/image';
import tokencss from '@tokencss/astro';
import prefetch from '@astrojs/prefetch';
import solidJs from '@astrojs/solid-js';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	vite: {
		ssr: {
			external: ['svgo'],
		},
	},
	output: 'server',
	adapter: vercel(),
	integrations: [image(), tokencss(), prefetch(), solidJs(), tailwind()],
});
