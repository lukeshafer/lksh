import { Component, createMemo, createSignal } from 'solid-js';
import './Hamburger.css';

export const Hamburger: Component = () => {
	const [isNavOpen, setNavOpen] = createSignal(false);
	const memo = createMemo(() => (isNavOpen() ? 'Yes' : 'No'));
	return (
		<button
			onclick={() => setNavOpen(!isNavOpen())}
			tabindex="-1"
			class="bg-green w-8 h-7 flex flex-col gap-[7px] z-10 absolute top-1/2 right-1/2 md:hidden hover:cursor-pointer">
			<span class="bg-black dark:bg-white inline-block w-5 h-[5px] transition-transform duration-300 ease-out-cubic origin-center group-focus-within:rotate-[135deg] group-focus-within:translate-y-[6px]" />
			<span class="bg-black dark:bg-white inline-block w-5 h-[5px] transition-transform duration-300 ease-out-cubic origin-center group-focus-within:rotate-[225deg] group-focus-within:translate-y-[-6px]" />
			{/* {memo()} */}
		</button>
	);
};
