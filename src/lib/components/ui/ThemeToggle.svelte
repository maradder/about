<script lang="ts">
	import { theme, resolvedTheme, setTheme, type Theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function handleThemeChange(newTheme: Theme) {
		setTheme(newTheme);
	}

	// Cycle through light -> dark -> system
	function cycleTheme() {
		const current = $theme;
		const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
		handleThemeChange(next);
	}

	function getThemeLabel(theme: Theme) {
		switch (theme) {
			case 'light':
				return 'Light mode';
			case 'dark':
				return 'Dark mode';
			case 'system':
				return 'System preference';
		}
	}
</script>

<!-- Show nothing during SSR, prevent hydration mismatch -->
{#if mounted}
	<div class="relative">
		<!-- Main toggle button -->
		<button
			type="button"
			on:click={cycleTheme}
			class="group focus:ring-primary-500 relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-600 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-white"
			aria-label="Toggle theme: {getThemeLabel($theme)}"
			title="Current: {getThemeLabel($theme)}"
		>
			<!-- Sun icon -->
			<svg
				class="absolute h-5 w-5 transition-all duration-300 {$theme === 'light'
					? 'scale-100 rotate-0 opacity-100'
					: 'scale-50 rotate-90 opacity-0'}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<circle cx="12" cy="12" r="5" />
				<path
					d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
				/>
			</svg>

			<!-- Moon icon -->
			<svg
				class="absolute h-5 w-5 transition-all duration-300 {$theme === 'dark'
					? 'scale-100 rotate-0 opacity-100'
					: 'scale-50 -rotate-90 opacity-0'}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
			</svg>

			<!-- System/Auto icon -->
			<svg
				class="absolute h-5 w-5 transition-all duration-300 {$theme === 'system'
					? 'scale-100 rotate-0 opacity-100'
					: 'scale-50 rotate-180 opacity-0'}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<rect x="2" y="4" width="20" height="16" rx="2" />
				<path d="M2 8h20" />
				<circle cx="8" cy="14" r="2" class={$resolvedTheme === 'dark' ? 'fill-current' : ''} />
			</svg>

			<!-- Ripple effect on click -->
			<span
				class="bg-primary-500/20 absolute inset-0 scale-0 rounded-full opacity-0 transition-all duration-300 group-active:scale-110 group-active:opacity-100"
			></span>
		</button>
	</div>
{/if}

<style>
	/* Ensure smooth icon transitions don't conflict with global theme transitions */
	svg {
		transition-property: transform, opacity, rotate;
		transition-duration: 300ms;
		transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}
</style>
