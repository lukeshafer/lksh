import { createSignal, For, onMount } from "solid-js";
import ProjectCard from "./ProjectCard";

const WIDTH = 24;
const GAP = 3;

export interface Project {
	name: string;
	image: string;
	link: string;
}

const projectList: Project[] = [
	{
		name: "Fridge Magnets",
		image: "/assets/fridgemagnets.png",
		link: "https://github.com/lukeshafer/fridgemagnets",
	},
	{
		name: "Fridge Magnets",
		image: "/assets/fridgemagnets.png",
		link: "https://github.com/lukeshafer/fridgemagnets",
	},
];

const move = (dir: "left" | "right") => {
	if (dir === "right" && index() < projectList.length - 1)
		setIndex(index() + 1);
	else if (dir === "left" && index() > 0) setIndex(index() - 1);
};

const [index, setIndex] = createSignal(0);

const CarouselButton = ({ dir }: { dir: "left" | "right" }) => {
	return (
		<button
			class="absolute top-0 left-0 h-full p-4 text-4xl transition-colors duration-300 hover:bg-gray-700/50"
			classList={{ "left-0": dir === "left", "right-0": dir === "right" }}
			onClick={() => move(dir)}
		>
			{dir === "left" ? "<" : ">"}
		</button>
	);
};

const ProjectCarousel = () => {
	let carousel: HTMLDivElement | null;
	let checkKeyboard = false;
	const moveDist = GAP + WIDTH;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			checkKeyboard = entry.isIntersecting;
		});
	});

	onMount(() => {
		observer.observe(carousel!);
		window.addEventListener("keydown", (event) => {
			if (checkKeyboard) {
				if (event.key === "ArrowLeft") move("left");
				else if (event.key === "ArrowRight") move("right");
			}
		});
	});

	return (
		<div class="relative" ref={carousel!}>
			<div class="w-full">
				<div
					class="flex w-min flex-1 items-center justify-center gap-12 self-start overflow-hidden pl-[calc(50%-12rem)] transition-transform"
					style={`transform: translateX(${-index() * moveDist
						}rem); gap: ${GAP}rem`}
				>
					<For each={projectList}>
						{(project, cardIndex) => (
							<ProjectCard
								project={project}
								index={cardIndex()}
								curIndex={index}
								width={WIDTH}
							/>
						)}
					</For>
				</div>
			</div>
			<CarouselButton dir="left" />
			<CarouselButton dir="right" />
		</div>
	);
};

export default ProjectCarousel;
