import { createSignal, onMount } from 'solid-js';
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

export const Language = () => {
	let span: HTMLSpanElement | undefined;
	const languages = ['JavaScript', 'TypeScript', 'web', 'pretty neat'];
	const [text, setText] = createSignal(languages[0]);

	onMount(() => {
		const typewriter = new Typewriter(span, {
			loop: false,
			delay: 75,
		});

		typewriter
			.typeString('JavaScript')
			.pauseFor(500)
			.deleteAll('natural')
			.typeString('TypeScript')
			.pauseFor(300)
			.deleteChars(4)
			.deleteAll('natural')
			.typeString('Full Stack')
			.pauseFor(600)
			.deleteAll(0.6)
			.typeString('cool 😎')
			.pauseFor(800)
			.deleteAll('natural')
			.typeString('JavaScript')
			.start();
	});

	return (
		<span
			ref={span!}
			class="bg-gray-200 dark:bg-gray-700 py-1 px-3 w-36 h-full inline-block rounded-xl font-mono text-xl whitespace-nowrap"></span>
	);
};
