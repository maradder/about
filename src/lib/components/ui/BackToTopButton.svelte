<script lang="ts">
	import { onMount } from 'svelte';

	let isVisible = $state(false);
	let isScrolling = $state(false);
	let mounted = $state(false);
	let scrollTimeout: number | undefined;

	onMount(() => {
		mounted = true;
		handleScroll();
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}
		};
	});

	function handleScroll() {
		// Show button when scrolled down 300px or more
		const scrollY = window.scrollY;
		isVisible = scrollY > 300;

		// Add scrolling indicator
		isScrolling = true;

		// Clear existing timeout
		if (scrollTimeout) {
			clearTimeout(scrollTimeout);
		}

		// Set scrolling to false after scroll stops
		scrollTimeout = setTimeout(() => {
			isScrolling = false;
		}, 150) as any;
	}

	function scrollToTop() {
		isScrolling = true;

		// Smooth scroll to top
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});

		// Reset scrolling state after animation
		setTimeout(() => {
			isScrolling = false;
		}, 800);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			scrollToTop();
		}
	}
</script>

{#if mounted && isVisible}
	<button
		onclick={scrollToTop}
		onkeydown={handleKeyDown}
		class="group fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-600 bg-gray-900 font-mono text-green-400 shadow-lg transition-all duration-300 hover:border-green-400 hover:bg-gray-800 hover:shadow-xl hover:shadow-green-400/20 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none dark:border-gray-400 dark:bg-gray-800 dark:text-green-300 dark:hover:border-green-300 dark:hover:bg-gray-700 dark:focus:ring-green-300"
		style="backdrop-filter: blur(8px); transform: translateY({isScrolling ? '0' : '0'})"
		aria-label="Back to top"
		title="Back to top"
		data-testid="back-to-top-button"
	>
		<!-- Terminal prompt with up arrow -->
		<div class="flex flex-col items-center justify-center space-y-0.5">
			<!-- Command prompt -->
			<span class="text-xs leading-none">$</span>
			<!-- Up arrow -->
			<svg
				class="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"
				></path>
			</svg>
		</div>

		<!-- Hover glow effect -->
		<div
			class="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400/10 to-blue-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>

		<!-- Active pulse effect -->
		{#if isScrolling}
			<div class="absolute inset-0 animate-ping rounded-full border-2 border-green-400/50"></div>
		{/if}

		<!-- Scan line effect on hover -->
		<div
			class="absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		>
			<div
				class="absolute inset-x-0 top-0 h-px animate-pulse bg-gradient-to-r from-transparent via-green-400 to-transparent"
			></div>
		</div>
	</button>
{/if}

<style>
	/* Smooth entrance animation */
	button {
		animation: slide-in-from-bottom 0.3s ease-out;
	}

	@keyframes slide-in-from-bottom {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Pulse animation for scrolling indicator */
	@keyframes ping {
		75%,
		100% {
			transform: scale(1.1);
			opacity: 0;
		}
	}

	.animate-ping {
		animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}

		button {
			animation: none !important;
		}
	}
</style>
