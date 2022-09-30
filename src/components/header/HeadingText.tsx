import { createSignal, onMount } from 'solid-js';
import { Language } from './Language';

export const HeadingText = () => {
	let thisEl: HTMLDivElement | undefined;
	const [isVisible, setVisible] = createSignal(true);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				setVisible(entry.isIntersecting);
			});
		},
		{ threshold: 0.5, rootMargin: '-25% 0px 0px 0px' }
	);

	onMount(() => {
		observer.observe(thisEl!);
	});

	return (
		<div
			ref={thisEl!}
			id="heading"
			classList={{ '-translate-y-12 opacity-0 blur': !isVisible() }}
			class="transition-all duration-300 pt-[35vh] pb-28 pl-[max(0px,calc(8vw-2rem))]">
			<h1 class={`font-display text-5xl font-normal top-0`}>
				Hi, I'm{' '}
				<span class="text-sky-600 dark:text-sky-300 inline-block">
					Luke Shafer
				</span>
			</h1>
			<p class="font-subheading text-2xl font-light">
				I'm a <Language /> Developer
			</p>
		</div>
	);
};
