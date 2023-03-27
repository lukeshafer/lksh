---
title: 'SolidJS vs. Svelte: Two modern takes on a faster frontend'
pubDate: Feb 26 2023
description: "Let's compare two newer, fast, and powerful frameworks."
published: true
---

For the last several years, frontend web developers have been burdened with a choice: what UI framework, if any, do you use? There are more options than ever before; do you pick React, the popular option with a large ecosystem? Or Vue, a lighter alternative? What about plain JS, maybe with some web components?

With so many options available, I want to focus on **my two favorites: Solid and Svelte**. I’ll dive into the pros and cons of each framework, their philosophies, and their similarities and differences. At the end I'll tell you which one I prefer — though I genuinely love both of them.

## The Elevator Pitch

### Svelte

Svelte, [as creator Rich Harris describes](https://gist.github.com/Rich-Harris/0f910048478c2a6505d1c32185b61934), is a language for building reactive user interfaces. It takes a bit of an idealistic approach by taking HTML, CSS, and JavaScript, and **extending them with new features**, all wrapped in a .svelte file. The Svelte compiler then takes those files and generates client-side JavaScript to produce the application you wrote. It takes care of reactivity and updating the DOM through, for lack of a better term, _magic_ (i.e. _compilation_).

Here’s a quick example of a simple counter in Svelte:

```html
<script>
	let count = 0;
</script>

<button on:click={() => count = count + 1}>{count}</button>
```

_You can mess with Svelte more in the [Svelte REPL](https://svelte.dev/repl/)!_

## Solid

Solid is a library for building UIs in JavaScript using “**fine-grained reactivity**,” [as creator Ryan Carniato calls it.](https://www.youtube.com/watch?v=b9e7VXs_A4s) It mostly stays out of your way, giving you methods to build signals and effects: reactive primitives for writing functions that automatically re-run when a value changes. Like Svelte, it uses a compiler, but the job of that compiler is simple — transform JSX templates into DOM manipulations, and wrap any use of signals in effects to create reactive elements.

Here’s a simple counter in Solid:

```jsx
import { createSignal } from 'solid-js'

export function Counter() {
	const [count, setCount] = createSignal(0)

	return (
		<button type="button" onClick={() => setCount((c) => c + 1)}>
			{count()}
		</button>
	)
}
```

_You can mess around with Solid in the [Solid Playground](https://playground.solidjs.com/)!_

As an aside - Solid is often introduced as a “better/more modern React.” Though I understand this notion, **I fundamentally disagree with it**. Though Solid, at a first glance, looks like modern React in the way it uses JSX and functional, stateful primitives (createSignal vs useState, createEffect vs useEffect), those similarities are surface deep. As soon as you start using them, you quickly learn that the two are _very_ different, in many ways we’ll discuss shortly. As such, I think it's unhelpful to compare them unless talking about specific implementation details.

## Philosophies

If you’re at all familiar with writing web apps, you’ll quickly find that both Svelte and Solid hold strong opinions about what a UI library should do, and what it shouldn’t. They share the belief that performance and bundle sizes are critical to building a better web, though their implementations are very different.

### Svelte

When I first wrote Svelte code, my immediate thought was “oh, THIS is how the web should just work.” Variables are automatically reactive, JS can be used in HTML templates, and CSS is automatically scoped to the component. Svelte extends the existing languages we know, and easily supports transpiled languages like TypeScript and Sass/scss. It’s what I’d consider a very _idealistic_ approach, imagining a world where building websites is simpler for the author.

Svelte also cares deeply about the amount of code you write – specifically, about reducing it. Take a look at the various examples on [Component Party](https://component-party.dev) and you’ll immediately find that Svelte code tends to be shorter and more concise than other frameworks — relying on the “magic” of the compiler to handle complexity and boilerplate. It requires you to put a lot of trust in the compiler, but the results tend to be a cleaner, simpler, and easier to manage codebase.

### Solid

Solid is designed with a clear goal — be as performant as possible, using fine-grained reactivity. It focuses on using simple primitives to wire data together based on when values change. Using signals, effects, and memos, you can build a highly performant application. And unlike React, where hooks are just ways to interact with the VDOM and rendering system, signals are the whole thing. All of Solid works on the basis of these three primitives — which are actually functions you can write yourself pretty easily and without a library!

Unlike Svelte, Solid works directly in JavaScript. Though it uses a compiler, that compiler exists only to transform JSX into DOM manipulations. You can even use Solid just as a library of reactive utilities, writing the DOM interactions yourself with them! Though there’s not much reason to, as Solid boasts itself as one of the fastest JS frameworks, outperforming Svelte, Vue, Preact, React, and more [in the JS Framework Benchmark](https://krausest.github.io/js-framework-benchmark/2023/table_chrome_110.0.5481.77.html).

## Pros and Cons

### Svelte

**Pros:**

- Easy to learn, especially for newcomers to JS frameworks
- By using a compiler, best practices can be baked into the framework instead of dependent on the author
- Built in scoping for CSS
- Easy to use with transpiled languages like TypeScript and Sass
- No library shipped to the client — just the compiled JS

**Cons:**

- Requires you to trust the compiler
- Limited online resources and help compared to older frameworks like React and Vue
- By using a custom language, it breaks certain rules of JavaScript
- Reactive state is tied directly to components by default, unless using [Stores](https://svelte.dev/docs#run-time-svelte-store) to share state
- Because of its custom language, developer tooling, like autocomplete and language servers, is all custom to the framework, leading to challenges with some text editors (though it’s great with VS Code!)

### Solid

**Pros:**

- Extremely performant
- Uses a functional approach to make components easy to author and compose
- Component functions only run once to setup the DOM, and only reactive functions ever re-run
- Components are strictly an authoring benefit, and do not affect runtime whatsoever
- Signals contain state directly, and can be freely passed between components and functions ([just don’t destructure props](https://www.solidjs.com/tutorial/props_defaults))
- JSX already works great with most developer tooling and editors

**Cons:**

- You have to adjust your mental model for reactivity, which is challenging, especially if coming from React
- Limited resources for support — fewer even than Svelte
- No built-in tools for handling CSS — you’re on your own
- As mentioned above, you have to take care when destructuring objects to avoid breaking reactivity ([there’s an ESLint plugin to warn you](https://www.npmjs.com/package/eslint-plugin-solid))
- Ships a (small) library to the client (though per-component sizes are smaller than Svelte)

## Both are amazing

I’m a big fan of both of these frameworks. Though they take very different approaches to creating applications, both are dedicated to their visions, and I believe both are guiding web development toward a brighter future. Here are a few things I love about BOTH frameworks:

- They work great with [TypeScript](https://www.typescriptlang.org/), my default for everything these days
- While offering a good experience for the developer, their foremost goal is to create great user experiences, and ship less unnecessary code
- They have amazing interactive tutorials and guides on their websites ([Svelte](https://svelte.dev), [Solid](https://solidjs.com))
- Both work great with [Astro](https://astro.build/), my meta-framework of choice 😎
- No virtual DOM, reducing JS overhead

## Which do I prefer?

I’ve tried to keep this post _relatively_ unbiased, at least in terms of my preferences between these two frameworks. But, if I’m starting a new project, I’m not choosing both, right? So which would I choose?

If, today, I was starting a project that needs a UI framework for JS, I would choose **SolidJS**. I have fallen in love with its model of reactivity and its functional approach. I’ve grown to really like using JSX, despite its flaws, because I know JavaScript and I know exactly how it will behave. I’m also a sucker for putting a bunch of components into a single file, which isn't possible with Svelte's single-file components. Solid’s model of running functions only once, and state being tied directly to signals, fits perfectly with how I like to compose my applications. I feel like I understand exactly how the code I write will run on the client.

Still, Svelte is, I believe, a phenomenal tool. In fact, if not for Svelte being so approachable, I probably would not be where I am today. It's ease of use allowed me to build up my confidence and knowledge. Svelte feels _very_ natural to write, especially if you’re coming primarily from HTML and CSS previously, and it taught me how to author more advanced applications using components.

## Getting started with Svelte and Solid

Hopefully now, you’re excited to start a project with one of these frameworks. But maybe you’re wondering how to start a project? If you’re unsure which one to use, or even if you are sure, I highly recommend [Astro](https://astro.build/), a tool for building websites with minimal client-side JavaScript and built-in server-side rendering. Astro is great because it has official integrations with a bunch of frameworks, including Svelte and Solid, along with React, Vue, Lit, and a few more. You can even build a site mixing and matching components from different frameworks, so it’s a great chance to learn about the authoring experience without needing a different project for each framework.

Svelte and Solid also have official _meta-frameworks,_ which bundle their respective libraries wit routing, server-side rendering, api endpoints, and more. Svelte has [SvelteKit](http://kit.svelte.dev/), and Solid has [SolidStart](https://start.solidjs.com) (though you should know that SolidStart recently entered beta as of writing this post, and just last week announced some major changes, including that they’re going to use Astro as a base! So unless you’re just messing around or learning, I’d suggest Astro for the time being, unless you’re reading this in the future when SolidStart is at 1.0). Both of these tools, like the frameworks they're built with, differ wildly in terms of philosophy and could warrant their own blog post themselves!
