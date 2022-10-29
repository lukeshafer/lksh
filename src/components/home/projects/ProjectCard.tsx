import type { Accessor } from "solid-js";
import type { Project } from "./ProjectCarousel";

interface CardProps {
	project: Project;
	index: number;
	curIndex: Accessor<number>;
	width: number;
}

const ProjectCard = ({ project, index, curIndex, width }: CardProps) => {
	return (
		<div
			class={`h-60 overflow-clip bg-gray-800 bg-cover transition-all dark:bg-gray-200`}
			style={`width: ${width}rem; background-image: url('${project.image
				}'); opacity: ${index === curIndex() ? "1" : "0.5"}`}
		>
			<div class="flex h-full w-full items-end justify-center bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/80 p-4 text-center align-text-bottom">
				<h3 class="font-subheading text-4xl font-medium text-white shadow-black drop-shadow">
					{project.name}
				</h3>
			</div>
		</div>
	);
};

export default ProjectCard;
