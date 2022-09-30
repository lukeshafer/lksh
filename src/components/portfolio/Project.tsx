import { createSignal, JSXElement, onMount } from 'solid-js';
import type { projects } from '../../data/projects';
import { FaSolidLink, FaBrandsGitAlt } from 'solid-icons/fa';

const Tag = ({ children }: { children: JSXElement }) => {
	return (
		<li class={`font-mono text-xs py-1 px-2 bg-gray-300 dark:bg-gray-600`}>
			{children}
		</li>
	);
};

export const Project = (p: typeof projects[number]) => {
	let thisEl: HTMLLIElement | undefined;
	const [visible, setVisible] = createSignal(false);
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				setVisible(entry.isIntersecting);
			});
		},
		{ threshold: 0.5, rootMargin: '-18% 0px' }
	);

	onMount(() => {
		observer.observe(thisEl!);
	});

	return (
		<li
			ref={thisEl!}
			classList={{ 'opacity-10 blur-sm': !visible() }}
			class="snap-center flex flex-wrap items-center gap-x-6 gap-y-2 transition-all duration-500">
			<h3 class="text-4xl font-display font-light">{p.name}</h3>
			<time
				datetime={p.year}
				class="font-subheading opacity-70 text-3xl text-sky-600 dark:text-sky-300">
				{p.year}
			</time>
			{p.url ? (
				<a
					class="text-gray-300 dark:text-gray-600 hover:text-gray-900 hover:dark:text-gray-50"
					href={p.url}>
					<FaSolidLink size={24} class="text-inherit" />
					<span class="visibly-hidden">Website</span>
				</a>
			) : (
				''
			)}
			{p.repo ? (
				<a
					class="text-gray-300 dark:text-gray-600 hover:text-gray-900 hover:dark:text-gray-50"
					href={p.repo}>
					<FaBrandsGitAlt size={24} class="text-inherit" />
					<span class="visibly-hidden">GitHub</span>
				</a>
			) : (
				''
			)}
			<ul class="w-full flex flex-wrap gap-y-1 gap-x-2">
				<li class="font-mono text-xs py-1 px-2 bg-sky-600 dark:bg-sky-300 text-gray-50 dark:text-gray-900">
					{p.category}
				</li>
				{p.tags.map((t) => (
					<Tag>{t}</Tag>
				))}
			</ul>
		</li>
	);
};
