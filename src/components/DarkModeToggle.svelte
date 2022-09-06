<script lang="ts">
	import { onMount } from 'svelte';

	let isDarkEnabled = false;
	let loaded = false;

	$: ariaLabel = isDarkEnabled ? 'Disable' : 'Enable';
	$: if (loaded) document.body.classList.toggle('darkmode', isDarkEnabled);

	onMount(() => {
		loaded = true;
		isDarkEnabled = matchMedia('(prefers-color-scheme: dark)').matches;
	});
</script>

<input
	type="checkbox"
	name="dark-mode"
	id="dark-mode"
	aria-label="{ariaLabel} dark mode"
	bind:checked={isDarkEnabled} />
<label for="dark-mode" tabindex="0">Toggle dark mode</label>

<style>
	input {
		height: 0;
		width: 0;
		visibility: hidden;
	}

	label {
		cursor: pointer;
		text-indent: -9999px;
		--size: 2rem;
		width: calc(1.8 * var(--size));
		height: var(--size);
		background: var(--light-gray);
		display: block;
		border-radius: var(--size);
		position: absolute;
		left: 1rem;
	}

	label::after {
		content: 'l';
		position: absolute;

		--pad: calc(var(--size) * 0.1);
		top: var(--pad);
		left: var(--pad);

		--circle: calc(var(--size) - var(--pad) * 2);
		width: var(--circle);
		height: var(--circle);
		background-color: var(--yellow);
		background-image: url('/sun-svgrepo-com.svg');
		background-repeat: no-repeat;
		background-size: auto 80%;
		background-position: left 0.15rem center;
		border-radius: var(--circle);
		transition: 0.2s;
	}

	input:checked + label {
		background: var(--dark-gray);
	}

	input:checked + label::after {
		left: calc(100% - var(--pad));
		transform: translateX(-100%);
		background-color: var(--light-gray);
		background-image: url('/moon-svgrepo-com.svg');
		background-position: right center;
	}

	label:focus-visible {
		outline: 4px solid var(--highlight);
	}

	label:focus-visible:after,
	label:active:after {
		width: calc(var(--size) * 1.1);
	}
</style>
