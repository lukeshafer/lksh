// @ts-check
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
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
	output: 'hybrid',
	adapter: vercel(),
	integrations: [prefetch(), solidJs(), tailwind(), mdx()],
})
