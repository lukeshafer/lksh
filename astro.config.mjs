import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import image from '@astrojs/image';
import tokencss from '@tokencss/astro';

import prefetch from '@astrojs/prefetch';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel(),
	integrations: [image(), tokencss(), prefetch()],
});
