// @ts-check
import { defineConfig } from 'astro/config'
import prefetch from '@astrojs/prefetch'
import solidJs from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
	site: 'https://lukeshafer.com/',
	vite: {
		ssr: {
			external: ['svgo'],
		},
	},
	output: 'static',
	integrations: [prefetch(), solidJs(), tailwind(), mdx()],
})
