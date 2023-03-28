const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			primary: colors.indigo,
			accent: colors.red,
			gray: colors.slate,
			black: colors.black,
			white: colors.white,
			error: colors.red,
		},
		fontFamily: {
			display: ['RalewayVariable', ...defaultTheme.fontFamily.sans],
			subheading: ['"Work SansVariable"', ...defaultTheme.fontFamily.sans],
			body: ['Khula', ...defaultTheme.fontFamily.sans],
			mono: ['"JetBrains MonoVariable"', ...defaultTheme.fontFamily.mono],
		},
		extend: {
			backgroundImage: {
				'radial-at-bl': 'radial-gradient(at 0% 100%, var(--tw-gradient-stops))',
			},
			transitionTimingFunction: {
				'out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
			},
			spacing: {
				grow: 'max(1rem, calc(16vw - 4rem))',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
