<script lang="ts">
	import { onMount } from 'svelte';

	export let size: number;
	export let speed: number;
	export let initialSpeed: number;
	export let minSpeed = 0.01 * speed;

	const animateTime = 10000;

	let h: number, w: number, x: number, y: number, dx: number, dy: number;

	let animate = false;

	onMount(() => {
		animate = false;
		x = Math.random() * w;
		y = Math.random() * h;
		dx = Math.random() * initialSpeed - initialSpeed / 2;
		dy = Math.random() * initialSpeed - initialSpeed / 2;

		animateDots();
	});

	function animateDots() {
		// if the deltas are below the speed, change it a random amount
		if (Math.abs(dx) < speed) dx += Math.random() * 0.1 * speed - 0.05 * speed;
		if (Math.abs(dy) < speed) dy += Math.random() * 0.1 * speed - 0.05 * speed;

		// if the deltas are above the minSpeed, decrease them slightly
		if (Math.abs(dx) > minSpeed) dx *= 0.994;
		if (Math.abs(dy) > minSpeed) dy *= 0.994;

		let animateX = false;
		let animateY = false;

		// if x is outside the bounds, wrap it to the other side. Else, move it by dx
		if (x < -size - 1) {
			animate = false;
			x = w + size;
		} else if (x > w + size + 1) {
			animate = false;
			x = -size;
		} else {
			animateX = true;
		}

		// Same with y
		if (y < -size - 1) {
			animate = false;
			y = h + size;
		} else if (y > h + size + 1) {
			animate = false;
			y = -size;
		} else {
			animateY = true;
		}

		if (animateX && animateY) {
			animate = true;
			x += 12 * dx;
			y += 12 * dy;
		}

		setTimeout(animateDots, animateTime * 1.1);
	}
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

<li
	style:transform="translate3d({x}px,{y}px,0)"
	style="--size: {size}px"
	style:transition={animate
		? `transform ${animateTime}ms cubic-bezier(0.75,0,0.25,1)`
		: 'none'} />

<style>
	li {
		--dot-color: 255, 240, 200;
		background-color: rgb(var(--dot-color));
		background: radial-gradient(
			circle,
			hsla(48, 50%, 72%, 0.7) 0%,
			hsla(43, 100%, 93%, 0.2) 40%,
			rgba(0, 0, 0, 0) 70%
		);
		width: var(--size);
		height: var(--size);

		position: absolute;
		top: calc(-0.5 * var(--size));
		left: calc(-0.5 * var(--size));
	}
</style>
