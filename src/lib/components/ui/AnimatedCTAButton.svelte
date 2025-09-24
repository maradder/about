<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		href: string;
		text?: string;
		variant?: 'terminal' | 'cloud' | 'circuit';
	};

	let { href, text = 'View My Work', variant = 'terminal' }: Props = $props();

	// Terminal state
	let isHovered = $state(false);
	let isClicked = $state(false);
	let isExecuting = $state(false);
	let commandTyped = $state('');
	let showSuggestions = $state(false);
	let cursorVisible = $state(true);
	let mounted = $state(false);
	let hoverTimeout: number | undefined;

	const baseCommand = 'view_portfolio';
	const suggestions = [
		{ command: 'view_projects', href: '#projects' },
		{ command: 'view_experience', href: '#experience' },
		{ command: 'view_skills', href: '#skills' },
		{ command: 'view_reading', href: '#reading' },
		{ command: 'view_contact', href: '#contact' }
	];
	let selectedSuggestion = $state(0);

	onMount(() => {
		mounted = true;
		startCursorBlink();
		typeCommand();

		// Cleanup timeouts on component unmount
		return () => {
			if (hoverTimeout) {
				clearTimeout(hoverTimeout);
			}
		};
	});

	function startCursorBlink() {
		setInterval(() => {
			if (!isExecuting && !showSuggestions) {
				cursorVisible = !cursorVisible;
			}
		}, 800); // Slower blink rate
	}

	function typeCommand() {
		let i = 0;
		const interval = setInterval(() => {
			if (i < baseCommand.length) {
				commandTyped = baseCommand.slice(0, i + 1);
				i++;
			} else {
				clearInterval(interval);
			}
		}, 100);
	}

	function handleMouseEnter() {
		isHovered = true;
		// Clear any existing timeout
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
		}
		hoverTimeout = setTimeout(() => {
			if (isHovered) {
				showSuggestions = true;
			}
		}, 300) as any;
	}

	function handleMouseLeave() {
		// Delay hiding to allow moving to suggestions
		hoverTimeout = setTimeout(() => {
			isHovered = false;
			showSuggestions = false;
			selectedSuggestion = 0;
		}, 150) as any;
	}

	function handleSuggestionsEnter() {
		// Cancel the hide timeout when entering suggestions
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
		}
		isHovered = true;
	}

	function handleSuggestionsLeave() {
		// Hide suggestions when leaving the suggestions area
		isHovered = false;
		showSuggestions = false;
		selectedSuggestion = 0;
	}

	function handleClick(e: MouseEvent) {
		e.preventDefault();
		if (isExecuting) return;

		isClicked = true;
		isExecuting = true;

		// Simulate command execution
		setTimeout(() => {
			// Navigate to the href
			window.location.hash = href.replace('#', '');

			// Reset states after navigation
			setTimeout(() => {
				isExecuting = false;
				isClicked = false;
			}, 500);
		}, 1500);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (showSuggestions) {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				selectedSuggestion = (selectedSuggestion + 1) % suggestions.length;
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				selectedSuggestion =
					selectedSuggestion === 0 ? suggestions.length - 1 : selectedSuggestion - 1;
			} else if (e.key === 'Enter') {
				e.preventDefault();
				// Navigate to the selected suggestion
				const selected = suggestions[selectedSuggestion];
				navigateToSection(selected.href);
			} else if (e.key === 'Escape') {
				e.preventDefault();
				showSuggestions = false;
				selectedSuggestion = 0;
			}
		} else if (e.key === 'Enter' || e.key === ' ') {
			handleClick(e as any);
		}
	}

	function navigateToSection(targetHref: string) {
		isClicked = true;
		isExecuting = true;
		showSuggestions = false;

		// Simulate command execution
		setTimeout(() => {
			// Navigate to the target section
			window.location.hash = targetHref.replace('#', '');

			// Reset states after navigation
			setTimeout(() => {
				isExecuting = false;
				isClicked = false;
			}, 500);
		}, 1500);
	}

	function handleSuggestionClick(suggestion: any) {
		navigateToSection(suggestion.href);
	}
</script>

{#if mounted}
	<div class="relative inline-block">
		<!-- Terminal Button -->
		<button
			onclick={handleClick}
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
			onkeydown={handleKeyDown}
			class="group relative overflow-hidden rounded-lg border-2 border-gray-600 bg-gray-900 px-6 py-4 font-mono text-sm transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none dark:border-gray-400 dark:bg-gray-800 dark:hover:border-green-300 dark:focus:ring-green-300"
			style="min-width: 180px; min-height: 56px;"
			aria-label="Navigate to projects section"
			disabled={isExecuting}
			data-testid="animated-cta-button"
		>
			<!-- Terminal Content -->
			<div class="flex items-center space-x-2">
				<!-- Prompt Symbol -->
				<span class="text-green-400 dark:text-green-300">$</span>

				<!-- Command Text -->
				<span class="text-gray-100 dark:text-gray-200">
					{commandTyped}
					<!-- Fixed-width cursor container to prevent layout shift -->
					<span class="inline-block w-2 text-center">
						{#if cursorVisible && !isExecuting}
							<span class="text-green-400 dark:text-green-300">|</span>
						{/if}
					</span>
				</span>

				<!-- Execution State -->
				{#if isExecuting}
					<div class="flex items-center space-x-1">
						<div class="flex space-x-1">
							{#each Array(3) as _, i}
								<div
									class="h-1 w-1 animate-pulse rounded-full bg-green-400 dark:bg-green-300"
									style="animation-delay: {i * 0.2}s"
								></div>
							{/each}
						</div>
						<span class="text-xs text-green-400 dark:text-green-300">executing...</span>
					</div>
				{/if}
			</div>

			<!-- Hover Effects -->
			<div
				class="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			></div>

			<!-- Scan Line Effect -->
			{#if isHovered && !isExecuting}
				<div class="absolute inset-0 overflow-hidden">
					<div
						class="absolute inset-x-0 h-px animate-pulse bg-gradient-to-r from-transparent via-green-400 to-transparent"
					></div>
				</div>
			{/if}
		</button>

		<!-- Autocomplete Suggestions -->
		{#if showSuggestions && !isExecuting}
			<div
				class="animate-in slide-in-from-top-2 absolute top-full left-0 z-[9999] mt-2 max-h-64 w-48 overflow-y-auto rounded-lg border border-gray-600 bg-gray-900 py-2 shadow-xl duration-200 dark:border-gray-400 dark:bg-gray-800"
				role="listbox"
				aria-label="Command suggestions"
				tabindex="-1"
				onmouseenter={handleSuggestionsEnter}
				onmouseleave={handleSuggestionsLeave}
				data-testid="autocomplete-suggestions"
			>
				{#each suggestions as suggestion, index}
					<button
						onclick={() => handleSuggestionClick(suggestion)}
						class="w-full px-4 py-2 text-left font-mono text-sm transition-colors {index ===
						selectedSuggestion
							? 'bg-green-400/20 text-green-400 dark:text-green-300'
							: 'text-gray-300 hover:bg-gray-800 hover:text-green-400 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-green-300'}"
						role="option"
						aria-selected={index === selectedSuggestion}
						data-testid="suggestion-option"
					>
						<span class="text-green-400 dark:text-green-300">$</span>
						{suggestion.command}
					</button>
				{/each}

				<!-- Suggestion Footer -->
				<div
					class="border-t border-gray-700 px-4 py-2 text-xs text-gray-500 dark:border-gray-600 dark:text-gray-400"
				>
					Press ↑↓ to navigate, Enter to execute, Esc to close
				</div>
			</div>
		{/if}

		<!-- Success Message -->
		{#if isClicked && isExecuting}
			<div class="absolute top-full left-0 mt-2 w-full">
				<div
					class="animate-in slide-in-from-top-2 rounded-lg border border-green-400 bg-green-400/10 px-4 py-2 font-mono text-sm text-green-400 duration-200 dark:text-green-300"
				>
					<div class="flex items-center space-x-2">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						<span>Command executed successfully</span>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	/* Enhanced cursor animation */
	@keyframes cursor-blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}

	/* Scan line animation */
	@keyframes scan-line {
		0% {
			top: 0%;
			opacity: 1;
		}
		100% {
			top: 100%;
			opacity: 0;
		}
	}

	/* Loading dots animation */
	@keyframes loading-dot {
		0%,
		20% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.5);
			opacity: 0.7;
		}
		80%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* Ensure proper stacking and animations */
	.animate-in {
		animation-fill-mode: both;
	}

	.slide-in-from-top-2 {
		animation-name: slide-in-from-top;
	}

	@keyframes slide-in-from-top {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Disable animations for reduced motion */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
