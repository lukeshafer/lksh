import { onMount } from "solid-js";
// @ts-ignore
import Typewriter from "typewriter-effect/dist/core";

export const Language = () => {
	let span: HTMLSpanElement | undefined;

	onMount(() => {
		const typewriter = new Typewriter(span, {
			loop: true,
			delay: 75,
		});

		typewriter
			.typeString("JavaScript")
			.pauseFor(500)
			.deleteAll("natural")
			.typeString("TypeScript")
			.pauseFor(600)
			.deleteChars(4)
			.deleteAll("natural")
			.typeString("Full Stack")
			.pauseFor(600)
			.deleteAll("natural")
			.typeString("cool 😎")
			.pauseFor(300)
			.deleteAll(1)
			.typeString("Web")
			.pauseFor(700)
			.deleteAll("natural")
			.start();
	});

	return (
		<span
			ref={span!}
			class="inline-block min-h-[1.5em] w-36 whitespace-nowrap rounded-xl bg-gray-200 py-1 px-3 font-mono text-xl dark:bg-gray-700"
		></span>
	);
};
