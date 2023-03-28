// @ts-check
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import image from '@astrojs/image'
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
	output: 'server',
	adapter: vercel(),
	integrations: [
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
		}),
		prefetch(),
		solidJs(),
		tailwind(),
		mdx(),
	],
})
