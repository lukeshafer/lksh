import { createSignal, onMount, ParentProps } from "solid-js";

type Props = {
	length: number;
	moveDist: number;
	gap: number;
} & ParentProps;

const ProjectCarousel = ({ children, length, moveDist, gap }: Props) => {
	const [index, setIndex] = createSignal(0);
	let carousel: HTMLDivElement;
	let checkKeyboard = false;

	const move = (dir: "left" | "right") => {
		if (dir === "right" && index() < length - 1) setIndex(index() + 1);
		else if (dir === "left" && index() > 0) setIndex(index() - 1);
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			checkKeyboard = entry.isIntersecting;
		});
	});

	onMount(() => {
		observer.observe(carousel);
		window.addEventListener("keydown", (event) => {
			if (checkKeyboard) {
				switch (event.key) {
					case "ArrowLeft":
						move("left");
						break;
					case "ArrowRight":
						move("right");
				}
			}
		});
	});

	return (
		<div class="relative" ref={carousel!}>
			<div class="w-full">
				<div
					class="flex w-min flex-1 items-center justify-center gap-12 self-start overflow-hidden pl-[calc(50%-12rem)] transition-transform"
					style={`transform: translateX(${
						-index() * moveDist
					}rem); gap: ${gap}rem`}
				>
					{children}
				</div>
			</div>
			<button
				class="absolute top-0 left-0 h-full p-4 text-4xl transition-colors duration-300 hover:bg-gray-700/50"
				onClick={() => move("left")}
			>
				{"<"}
			</button>
			<button
				class="absolute top-0 right-0 h-full p-4 text-4xl transition-colors duration-300 hover:bg-gray-700/50"
				onClick={() => move("right")}
			>
				{">"}
			</button>
		</div>
	);
};

export default ProjectCarousel;
