import { projects } from '../data/projects-new'
import { For, Show, createSignal } from 'solid-js'

type Project = typeof projects[number]

export default function Projects() {
	return (
		<ul class="grid justify-center gap-9">
			<For each={projects}>{(project) => <Project {...project} />}</For>
		</ul>
	)
}

function Project(props: Project) {
	const [open, setOpen] = createSignal(false)

	return (
		<li>
			<button
				onClick={() => setOpen((val) => !val)}
				class="flex w-full items-center justify-center 
				gap-8 bg-primary-200 p-10 text-center dark:bg-gray-900">
				<span aria-hidden="true" class="pt-2 text-4xl font-black">
					{'>'}
				</span>
				<div class="flex flex-1 justify-end gap-4">
					<h2 class="font-display text-4xl">{props.name}</h2>
					<p class="pt-2 text-3xl text-gray-600 dark:text-gray-400">
						{props.year}
					</p>
				</div>
			</button>
			<Show when={open()}>
				<div class="flex flex-col gap-4 p-10">
					<p class="text-xl">{props.description}</p>
				</div>
			</Show>
		</li>
	)
}
