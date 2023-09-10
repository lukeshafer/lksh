---
title: 'I thought Tailwind was bad. I was wrong.'
pubDate: Oct 30 2022
description: I'm not proud of it. But I like Tailwind.
---

I’m not the first person to say it, but I was wrong about Tailwind. I thought it was just fluff and noise that clogged up HTML, made for people who don’t know CSS well enough to write it properly. Markup and style are separate for a reason, right? Unfortunately for my ego, I’ve eaten my words: I _really_ like Tailwind.

## What is TailwindCSS?

In case you don’t know, [TailwindCSS](HTTPS://tailwindcss.com) is a framework for writing CSS styles within your HTML. It does this by providing **Utility Classes**: pre-made classes that emulate CSS property assignments. For instance, let’s say you want a `<p>` tag to have green, bold text with a horizontal margin. To compare vanilla CSS with Tailwind:

```html
<!-- VANILLA CSS -->
<p>Hello CSS!</p>

<style>
	p {
		color: green;
		font-weight: bold;
		margin-right: 2rem;
		margin-left: 2rem;
	}
</style>

<!-- TAILWINDCSS -->
<p class="text-green-5 mx-8 font-bold">Hello Tailwind</p>
```

In the past, I’d look at this code see two main negatives to Tailwind:

1. Utility classes are hard to read.
2. If your classes get this granular, you might as well write CSS.

I still agree with the first point, if to a lesser extent than before. Code readability IS important, especially in large projects, and CSS is great at it. For instance, it lets you break up your properties based on their purpose — I usually split my layout properties, like `display`, `position`, and `padding`, apart from general appearance properties, like `color`, `font-family`, and `background`. Tailwind _does_ have a [Prettier plugin](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) and a [recommended ordering for classes](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted), but without Prettier it’s difficult to manually reorder classes after the fact.

That second point though, about class granularity - I was absolutely wrong. If you know what you’re making, and have strong CSS knowledge already, Tailwind makes your styling FAST. I don’t have good numbers, but I have a recent, if anecdotal example.

## My history with Tailwind

When working on my website [lukeshafer.com](https://lukeshafer.com), I started over and rewrote it MANY times. I use my personal websites to mess with and learn new tools, which leads to a lot of changes very quickly. With this site, I started with Tailwind, and built a few pages with it. Not recognizing its benefits, I decided that it wasn’t for me (yet, at least) and moved all my utility classes into properly scoped css in my [Astro](https://astro.build) components. [I even ranted about it on Twitter](https://twitter.com/lksh_dev/status/1571293300312739840?s=20&t=ovdHUo2JQWzhLES6Z8mAwQ). The transition took a few days (listen, I've got other stuff to do!), but eventually I made a pure CSS version of what I had made before.

Fast-forward a week, and I started seeing a lot of love for Tailwind on Twitter and YouTube, especially from self-proclaimed former skeptics. As a _current_ skeptic, I decided, _why not, I’ll give it one more shot_, so I took my CSS, which had grown significantly, and started converting back to Tailwind classes.

The switch back to Tailwind took **less than 2 hours**. Before the end of the day I was adding new features to the site. After that experience I knew: Tailwind is for me.

So why the sudden shift? What changed? I think going back and forth helped me take time to process what I HAD liked in my first experience. Thoughts kept popping into my head like _You know… this was a lot quicker in Tailwind._ As I sat with these feelings, the urge to come back grew, and I was able to recognize the benefits of the framework — for me, at least.

Now, I want to list three reasons why I think Tailwind is a great product, and why I think it’s a great tool for many developers.

But FIRST, I want to be clear — while Tailwind makes CSS easier, **it’s not good for beginners**. It makes heavy use of existing CSS vocabulary and concepts, and without at least a decent understanding of CSS, Tailwind’s benefits will be lost to you. I’ll write a post later on this topic, but trust me! If you’re new to CSS, do not start with Tailwind.

---

Okay, that’s enough ranting. Here are three quick reasons to try Tailwind if you haven’t already.

## Quickly identify a component’s appearance

When building an application, you will spend lots of time coming back to existing components. Often, you want to quickly grasp how they’re being styled. If you’re updating an element inside a container, you want to know if that container is using `flex`, `grid`, or something else!

With Tailwind, you just need to look at the component. You can see both the structural context of an element, and the stylistic context.

In typical CSS, if you starting in the markup, you have to identify the element’s name, class, and ID, and then you need to locate that selector in the CSS. Ideally, that CSS is nearby, or perhaps in the same file/folder with things like Svelte and CSS Modules. Or maybe everything is in a global stylesheet. Maybe the selectors are a bit unusual — you’re looking for a class like `.nav__button`, but the actual selector is `nav > button`. Maybe styles are split between different selectors for specificity reasons. You can check the styles in your browser dev tools — just hope that your build tool isn’t obfuscating your class names too much. Then just find whatever file it’s in!

Meanwhile, with Tailwind I can look at an element and see all its styles immediately. It may take me a moment to parse through the utility classes, especially if there are a lot, but ultimately it’s still faster than trying to find the right styles in your project. There very few styles cascade beyond their target, because most utility classes target the specific element they’re placed on.five

## Move quickly

I've mentioned this a bit already, but I want to emphasize: writing Tailwind is FAST. At first it's not, because you're still getting used to the syntax and the different class names. But once you're familiar with the class names, combined with the VSCode plugin or, if you're like me, the language server in Neovim, you can hammer out classes QUICKLY. Most of the class names are brief: instead of `margin-left: 1rem`, you say `ml-4`. Now that's just a few characters on one property, but when you are making a website or application, those add up!

There is a learning curve - especially around how Tailwind presents units. But once you get past those issues, you can fly through your front-end development.

## Configure your design system

Design is hard, and being consistent with that design is even harder for teams. CSS does very little to help you in this camp. Typically, I create a bunch of CSS variables for my colors and fonts, and that works well! But if I need to tweak a color slightly for a purpose — maybe it's too light, or I need to bring down the opacity — I have to create a new variable for that color. _Maybe_ I can get away with using a filter in some instances, but that's not always an option. Yes, you _can_ make CSS variables of just the color values, so you can do `rgba(var(--values), 0.5)`, but that's both verbose and confusing.

Tailwind, on the other hand, has a single config file for all of its settings. You can take your design system and plug it right in, so that you have to stick to a system without being bound to pre-made components. Or, for certain aspects, you can leave the Tailwind defaults, which are a great choice for personal projects where you want full control of your styles. By using Tailwind, front-end devs get nearly full CSS control, and designers get their system enforced.

---

Now, all this said, Tailwind isn't perfect, and I do plan to write a counterpoint to this post! In fact, just last week I was muttering to myself while working, frustrated with Tailwind. Overall though, I think it's a VERY powerful and useful tool, and I recommend any skeptic with an open mind to give it an honest shot! You may find yourself surprised, like I did!
