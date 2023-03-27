export const projects = [
	{
		name: 'Snaily Discord Bot',
		year: '2023',
		url: '',
		repo: 'https://github.com/lukeshafer/fridgemagnets',
		category: 'Bot',
		tags: ['TypeScript', 'Node.js', 'SST', 'AWS', 'Discord.js'],
		description: 'A Discord bot',
	},
	{
		name: 'Fridge Magnets',
		year: '2022',
		url: 'https://fridgemagnets.dev.lukeshafer.com',
		repo: 'https://github.com/lukeshafer/fridgemagnets',
		category: 'Game',
		tags: ['TypeScript', 'Node.js', 'Colyseus', 'SvelteKit', 'WebSockets'],
		description: 'A multiplayer game',
	},
	{
		name: 'Ono Turo-Turo',
		year: '2022',
		url: 'https://onoturoturo.com',
		repo: '',
		category: 'Website',
		tags: ['Svelte', 'Rollup', 'Netlify CMS'],
		description: 'A website',
	},
	{
		name: 'Toxic Man',
		year: '2021',
		url: '',
		repo: 'https://github.com/lukeshafer/toxicManBot',
		category: 'Bot',
		tags: ["I'm so sorry...", 'Node.js', 'TypeScript', 'Discord.js'],
		description: 'A Discord bot',
	},
] satisfies Project[]

interface Project {
	name: string
	year: string
	url: string
	repo: string
	category: string
	tags: string[]
	description: string
}
