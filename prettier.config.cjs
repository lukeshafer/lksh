/** @type {import("@types/prettier").Config} */
module.exports = {
	plugins: [
		require.resolve('prettier-plugin-astro'),
		require.resolve('prettier-plugin-tailwindcss'),
	],
	pluginSearchDirs: false,
	useTabs: true,
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
	singleQuote: true,
	trailingComma: 'es5',
	tabWidth: 2,
	useTabs: true,
	printWidth: 80,
	bracketSameLine: true,
	semi: false,
}
