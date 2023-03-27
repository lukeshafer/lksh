---
title: Writing Your Own Reactive Signal Library
pubDate: Mar 15 2023
description: >-
  The surprisingly simple construct powering SolidJS and other signal-based
  libraries!
---

Lately, the frontend space has been exploding with a newfound admiration for _fine-grained reactivity_, a style of building reactive user interfaces by using three primary primitives: signals, effects, and memos. Recently, we’ve seen frameworks like [Angular](https://github.com/angular/angular/discussions/49090), [Preact](https://preactjs.com/guide/v10/signals/), and [Qwik](https://qwik.builder.io/docs/components/state/) add signals to their existing frameworks. And of course, [SolidJS](https://www.solidjs.com/), my framework of choice, and creator Ryan Carniato, have led the recent popularity in signals for frontend frameworks.

## What is a signal?

The name “signal” isn’t particularly descriptive, so it can be a bit confusing at first as to what benefits they offer, and how they differ from things like [RxJS Observables](https://rxjs.dev/guide/observable). SolidJS offers a solid (heh) definition:

> Signals are event emitters that hold a list of subscriptions. They notify their subscribers whenever their value changes.

-- <cite>SolidJS Docs</cite>

Don’t worry if that doesn’t make complete sense — we’re going to learn by writing our own!

## Why create your own signals?

If all of these libraries already offer signal primitives, why should we write our own? Well, in truth, it’s mainly as a learning experience! I wouldn’t necessarily advise using what we write over a framework like Solid, which contains more advanced optimizations for different edge cases. Rather, this practice is going to help you better understand how Solid, and reactivity in general, works.

## The Basics

For our basic reactive system, we’re going to create two primitives: `createSignal` and `createEffect`. There is a third important primitive to reactivity, the memo (aka `createMemo`), but it’s not necessary for our basic demo.

`createSignal` will be used to read and set a reactive value, and `createEffect` will be used to run side effects whenever that value changes.

Let’s go ahead and create the shell of `createSignal` in JavaScript:

```jsx
function createSignal(initialValue) {
	let value = initialValue

	const read = () => value
	const write = (newValue) => (value = newValue)

	return [read, write]
}

// example usage
const [count, setCount] = createSignal(0)
```

To break this down:

1. We save our initial signal value in the `value` variable.
2. We create an accessor function, `read`, which just returns the current value of the signal in a [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).
3. We create a setter function, which takes a new value and replaces the existing one.
4. We return a tuple with the two functions

So far, this isn’t any more useful than just declaring a mutable variable with `let`. What’s “reactive” about this? Well, it’s not! By themselves, signals are no more than glorified variables. It’s only when we start using other primitives, like effects, that we see their real power.

Remember, a signal holds “a list of subscriptions.” Those subscriptions come from `createEffect`, which takes a callback function as an input and sets it as a global listener, to be read by signals. Let’s take a look:

```jsx
let currentListener = undefined

function createEffect(callback) {
	currentListener = callback
	callback()
	currentListener = undefined
}

// example usage
createEffect(() => {
	console.log(someSignal())
})
```

Here, we set `currentListener` to the effect callback, and then we call the callback function. This is where the magic happens — by calling the callback, any signals used in that callback will be called as well. Next, we need to go back to our `createSignal` function and tweak it to add `currentListener` to a list of subscribers, and call any subscribers on change:

```jsx
function createSignal(initialValue) {
	let value = initialValue

	// a set of callback functions, from createEffect
	const subscribers = new Set()

	const read = () => {
		if (currentListener !== undefined) {
			// before returning, track the current listener
			subscribers.add(currentListener)
		}
		return value
	}
	const write = (newValue) => {
		value = newValue
		// after setting the value, run any subscriber, aka effect, functions
		subscribers.forEach((fn) => fn())
	}

	return [read, write]
}
```

Now, by tracking the subscribers in their own closure, any usage of a signal inside an effect _automatically_ tracks it, and re-runs that effect anytime the value changes!

Believe it or not, _that’s it._ There are a lot of ways this code can be improved and optimized for the end user, but it IS reactive, and can be used right away! Here’s a complete snippet for your usage:

```jsx
let currentListener = undefined

function createSignal(initialValue) {
	let value = initialValue

	const subscribers = new Set()

	const read = () => {
		if (currentListener !== undefined) {
			subscribers.add(currentListener)
		}
		return value
	}
	const write = (newValue) => {
		value = newValue
		subscribers.forEach((fn) => fn())
	}

	return [read, write]
}

function createEffect(callback) {
	currentListener = callback
	callback()
	currentListener = undefined
}
```

## Using your Signals

Now that we’ve created basic reactive primitives, let’s put them to use! We can create a simple counter using our signals, all in plain JavaScript:

```jsx
const [count, setCount] = createSignal(0)

const button = document.createElement('button')
createEffect(() => {
	button.innerText = count()
})
button.addEventListener('click', () => {
	setCount(count() + 1)
})

document.body.append(button)
```

[https://codepen.io/lukeshafer/pen/MWqJaQw](https://codepen.io/lukeshafer/pen/MWqJaQw)

<iframe src="https://codepen.io/lukeshafer/embed/MWqJaQw />

In this example, instead of writing to `button.innerText` directly, we update our count signal using `setCount()`. Then we use an effect to set `button.innerText` to the `count` signal’s value.

Now, instead of tying the action of clicking to the visible count value, we get to track the count as its own value. This means other actions or functions could update `count`, or use it’s value, and the value will _always_ synchronize in the DOM. This save you the trouble of needing to remember every place you used it, and it offers very little runtime overhead on top of the typical vanilla method, especially compared to a virtual DOM.

One issue with this code, though, is it’s still pretty verbose. On top of the already wordy API for updating the DOM imperatively, we now need to wrap any DOM interactions that use signals with effects, leading to a lot of repeated boilerplate. It’s fine for smaller, simpler interactivity, but as soon as you’re working with multiple signals in multiple DOM locations, you’re going to get wordy _very quickly._

Now, let’s re-introduce SolidJS, and how it takes a few simple rules to make a powerful framework. Let’s see what our above code looks like in Solid:

```jsx
export function Counter() {
	const [count, setCount] = createSignal(0);

	return <button onClick={() => setCount(count() + 1)}>{count()}</button>
}

// with comments describing how it maps to our previous code
export function Counter() {
	// everything before we start updating the DOM is the same
	const [count, setCount] = createSignal(0);

	// const button = document.createElement("button")
	return <button

	{/* button.addEventListener("click", () => {
	  *   setCount(count() + 1);
	  * });*/}
		onClick={() => setCount(count() + 1)}>

	{/* createEffect(() => {
		*   button.innerText = count();
    * });*/}
		{count()}

	// document.body.append(button)
	</button>
}
```

As you can see, any call to a signal in the JSX results in that expression being wrapped in a `createEffect` automatically. This specific behavior is the main reason Solid uses a compiler. This means that any usage of a signal in JSX is automatically reactive, and the DOM will update on its own when that signal is updated.

Of note — the code we wrote isn't _exactly_ what the Solid compiler outputs, as it uses template elements and a few other optimizations to lead to the best possible performance. Still, the compiler's output is still readable, and I highly recommend messing with [the Solid playground](https://playground.solidjs.com) to get a better feel for how it transforms your code, as it's very valuable to understand what you're shipping to your users!
