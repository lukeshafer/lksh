//import type { IconTypes } from 'solid-icons'
type HEX = `#${string}`

export interface StackProps {
	name: string
	tag: string
	//SolidIcon: IconTypes
	c1: HEX
	c2: HEX
}

export const stackList = new Map<string, StackProps>([
	[
		'React',
		{
			name: 'simple-icons:react',
			//SolidIcon: (await import('solid-icons/si')).SiReact,
			tag: 'react',
			c1: '#7de0fc',
			c2: '#149eca',
		},
	],
	[
		'TypeScript',
		{
			name: 'simple-icons:typescript',
			//SolidIcon: (await import('solid-icons/si')).SiTypescript,
			tag: 'typescript',
			c1: '#3178c6',
			c2: '#235a97',
		},
	],
	[
		'Astro',
		{
			name: 'simple-icons:astro',
			//SolidIcon: (await import('solid-icons/si')).SiAstro,
			tag: 'react',
			c1: '#6820a4',
			c2: '#c026d3',
		},
	],
	[
		'PostCSS',
		{
			name: 'simple-icons:postcss',
			//SolidIcon: (await import('solid-icons/si')).SiPostcss,
			tag: 'postcss',
			c1: '#dd3a0a',
			c2: '#dd3735',
		},
	],
	[
		'Node.js',
		{
			name: 'simple-icons:nodedotjs',
			//SolidIcon: (await import('solid-icons/si')).SiNodedotjs,
			tag: 'nodejs',
			c1: '#77b65d',
			c2: '#3e863d',
		},
	],
	[
		'Svelte',
		{
			name: 'simple-icons:svelte',
			//SolidIcon: (await import('solid-icons/si')).SiSvelte,
			tag: 'svelte',
			c1: '#ff3e00',
			c2: '#c25d2e',
		},
	],
	[
		'TailwindCSS',
		{
			name: 'simple-icons:tailwindcss',
			//SolidIcon: (await import('solid-icons/si')).SiTailwindcss,
			tag: 'tailwindcss',
			c1: '#38bdf8',
			c2: '#f472b6',
		},
	],
	[
		'Next.js',
		{
			name: 'simple-icons:nextdotjs',
			//SolidIcon: (await import('solid-icons/si')).SiNextdotjs,
			tag: 'nextjs',
			c1: '#e3e1f6',
			c2: '#ebeae8',
		},
	],
	[
		'SolidJS',
		{
			name: 'simple-icons:solid',
			//SolidIcon: (await import('solid-icons/si')).SiSolid,
			tag: 'solidjs',
			c1: '#87bee6',
			c2: '#3966b1',
		},
	],
])
