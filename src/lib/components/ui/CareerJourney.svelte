<script lang="ts">
	import { onMount } from 'svelte';
	import { portfolioDataWithCurrentJob } from '$lib/stores/portfolio';
	import JobPreviewCard from './JobPreviewCard.svelte';

	let mounted = $state(false);
	let hoveredJob = $state<string | null>(null);
	let mousePosition = $state({ x: 0, y: 0 });
	let hoverTimeout: ReturnType<typeof setTimeout> | null = $state(null);
	let showPreview = $state(false);
	let clickedJob = $state<string | null>(null);
	let isMobile = $state(false);
	let refreshKey = $state(0); // Force reactivity on resize
	let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
	let isTransitioning = $state(false); // Only fade during resize transitions
	let isLoading = $state(true); // Loading state for spinner

	// Get portfolio data reactively
	let data = $derived($portfolioDataWithCurrentJob);

	// Convert experience data to milestones
	// Include refreshKey to force recalculation on resize
	let milestones = $derived(
		(() => {
			// Use refreshKey to trigger recalculation (even though not directly used)
			refreshKey;
			const positions = data.experience.positions;

			// Sort positions chronologically by start date
			const sortedPositions = [...positions].sort((a, b) => {
				const dateA = new Date(a.startDate + '-01');
				const dateB = new Date(b.startDate + '-01');
				return dateA.getTime() - dateB.getTime();
			});

			// Calculate positioning
			const baseY = [40, 70, 70, 40, 20]; // Pattern: high, low, low, high, highest

			// Use current isMobile state for consistent calculations
			const totalWidth = isMobile ? 700 : 900;
			const padding = isMobile ? 50 : 60;
			const availableWidth = totalWidth - padding * 2;
			const spacingX =
				sortedPositions.length > 1 ? availableWidth / (sortedPositions.length - 1) : 0;
			const startX = padding;

			return sortedPositions.map((position, index) => {
				// Extract year from startDate or endDate for display
				const startYear = position.startDate.split('-')[0];
				const endYear = position.isCurrent ? 'Present' : position.endDate.split('-')[0];
				const displayYear = position.isCurrent ? startYear : endYear;

				// Calculate X position - evenly distributed across available width
				const x = startX + index * spacingX;

				// Calculate Y position with same company logic
				let y = baseY[index % baseY.length];
				if (index > 0) {
					const previousPosition = sortedPositions[index - 1];
					if (position.company === previousPosition.company) {
						// Same company, keep same Y as previous
						const previousY = baseY[(index - 1) % baseY.length];
						y = previousY;
					}
				}

				return {
					id: position.title.toLowerCase().replace(/\s+/g, '-'),
					title: position.title,
					company: position.company,
					year: displayYear,
					x,
					y,
					completed: !position.isCurrent,
					current: position.isCurrent,
					position: position // Include full position data for preview
				};
			});
		})()
	);

	// Handle mouse events
	function handleMouseEnter(milestone: any, event: MouseEvent) {
		// Clear any existing timeout
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
		}

		// Update mouse position immediately
		updateMousePosition(event);

		// Set the hovered job immediately for visual feedback
		hoveredJob = milestone.id;

		// Set timeout for showing preview card
		hoverTimeout = setTimeout(() => {
			showPreview = true;
		}, 500); // 500ms delay - adjust as needed
	}

	function handleMouseLeave() {
		// Clear timeout
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}

		hoveredJob = null;
		showPreview = false;
	}

	function handleClick(milestone: any, event: Event) {
		if (isMobile) {
			event.preventDefault();
			event.stopPropagation(); // Prevent event from bubbling up
			clickedJob = clickedJob === milestone.id ? null : milestone.id;
		}
	}

	function handleKeydown(milestone: any, event: KeyboardEvent) {
		if (isMobile && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			clickedJob = clickedJob === milestone.id ? null : milestone.id;
		} else if (event.key === 'Escape') {
			// Allow escape key to close on any device
			clickedJob = null;
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (hoveredJob) {
			updateMousePosition(event);
		}
	}

	function updateMousePosition(event: MouseEvent) {
		mousePosition = {
			x: event.clientX,
			y: event.clientY
		};
	}

	onMount(() => {
		mounted = true;

		// Show spinner initially, then reveal content after brief delay
		const loadingTimer = setTimeout(() => {
			isLoading = false;
		}, 800); // 800ms loading time (300ms + 500ms extension)

		// Check if mobile on mount and listen for resize
		const handleResize = () => {
			// Clear existing timeout
			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}

			// Debounce resize handling to prevent excessive recalculations
			resizeTimeout = setTimeout(() => {
				const wasMobile = isMobile;
				isMobile = window.innerWidth < 768;

				// Force refresh of milestones when crossing mobile/desktop breakpoint
				if (wasMobile !== isMobile) {
					refreshKey = refreshKey + 1;
					// Close any open cards when switching between mobile/desktop
					clickedJob = null;
					hoveredJob = null;
					showPreview = false;
					// Show loading during layout recalculation
					isLoading = true;
					setTimeout(() => {
						isLoading = false;
					}, 200);
				}
				resizeTimeout = null;
			}, 150); // 150ms debounce
		};
		handleResize();
		window.addEventListener('resize', handleResize);

		// Add click-outside listener for mobile
		const handleClickOutside = (event: MouseEvent) => {
			if (isMobile && clickedJob) {
				// Check if click is outside the career journey component
				const careerJourneyElement = document.querySelector('[data-testid="career-journey"]');
				if (careerJourneyElement && !careerJourneyElement.contains(event.target as Node)) {
					clickedJob = null;
				}
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('click', handleClickOutside);
			// Clear any pending resize timeout
			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}
			// Clear loading timer
			clearTimeout(loadingTimer);
		};
	});
</script>

{#if mounted}
	<div class="relative mx-auto mb-8 w-full max-w-4xl" data-testid="career-journey">
		{#if isLoading}
			<!-- Loading Spinner -->
			<div class="flex h-20 items-center justify-center sm:h-24 md:h-28">
				<div class="flex items-center space-x-2">
					<!-- Spinning circle -->
					<div class="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-green-600 dark:border-gray-600 dark:border-t-green-400"></div>
					<span class="text-sm text-gray-600 dark:text-gray-400">Loading career timeline...</span>
				</div>
			</div>
		{:else}
			<!-- Career Journey Content -->
			<div
				class="transition-opacity duration-200 ease-out {isTransitioning ? 'opacity-50' : 'opacity-100'}"
			>
		<!-- SVG Container -->
		<svg
			viewBox="0 0 {isMobile ? '700' : '900'} 100"
			class="h-12 w-full sm:h-20 md:h-24 lg:h-28"
			xmlns="http://www.w3.org/2000/svg"
		>
			<!-- Background grid pattern -->
			<defs>
				<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
					<path
						d="M 20 0 L 0 0 0 20"
						fill="none"
						stroke="currentColor"
						stroke-width="0.5"
						class="text-gray-200 dark:text-gray-700"
						opacity="0.3"
					/>
				</pattern>

				<!-- Gradient for the main path -->
				<linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#6b7280;stop-opacity:1" />
					<stop offset="60%" style="stop-color:#374151;stop-opacity:1" />
					<stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
				</linearGradient>

				<!-- Glow effect -->
				<filter id="glow">
					<feGaussianBlur stdDeviation="3" result="coloredBlur" />
					<feMerge>
						<feMergeNode in="coloredBlur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			<!-- Grid background -->
			<rect width="100%" height="100%" fill="url(#grid)" opacity="0.1" />

			<!-- Main progression path - explicit 90-degree sweeping bends -->
			<path
				d={milestones.reduce((path, milestone, index) => {
					if (index === 0) {
						return `M ${milestone.x} ${milestone.y}`;
					}
					const prev = milestones[index - 1];
					const midX = (prev.x + milestone.x) / 2;

					if (prev.y === milestone.y) {
						// Same level, straight line
						return `${path} L ${milestone.x} ${milestone.y}`;
					} else {
						// Different levels, use curved transition
						return `${path} L ${midX} ${prev.y} Q ${midX + 20} ${prev.y} ${midX + 20} ${(prev.y + milestone.y) / 2} Q ${midX + 20} ${milestone.y} ${midX + 40} ${milestone.y} L ${milestone.x} ${milestone.y}`;
					}
				}, '')}
				fill="none"
				stroke="#10b981"
				stroke-width="2"
				opacity="0.8"
			/>

			<!-- Position circles -->
			{#each milestones as milestone}
				{#if milestone.completed}
					<!-- Completed position - filled green circle with checkmark -->
					<circle
						cx={milestone.x}
						cy={milestone.y}
						r="19.2"
						fill="#10b981"
						stroke="#22c55e"
						stroke-width="2"
						opacity="1"
						filter="drop-shadow(0 0 8px #10b981)"
						class="pointer-events-none"
					/>

					<!-- Checkmark -->
					<path
						d="M {milestone.x - 7.2} {milestone.y} L {milestone.x - 2.4} {milestone.y +
							4.8} L {milestone.x + 7.2} {milestone.y - 4.8}"
						fill="none"
						stroke="white"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="pointer-events-none"
					/>

					<!-- Larger invisible clickable area for completed position -->
					<circle
						cx={milestone.x}
						cy={milestone.y}
						r="30"
						fill="transparent"
						class="cursor-pointer transition-all duration-200 hover:brightness-110"
						role="button"
						tabindex="0"
						onmouseenter={(e) => !isMobile && handleMouseEnter(milestone, e)}
						onmouseleave={() => !isMobile && handleMouseLeave()}
						onmousemove={(e) => !isMobile && handleMouseMove(e)}
						onclick={(e) => handleClick(milestone, e)}
						onkeydown={(e) => handleKeydown(milestone, e)}
					/>
				{:else if milestone.current}
					<!-- Current position - outlined circle -->
					<circle
						cx={milestone.x}
						cy={milestone.y}
						r="19.2"
						fill="none"
						stroke="#10b981"
						stroke-width="3"
						opacity="1"
						filter="drop-shadow(0 0 12px #10b981)"
						class="pointer-events-none"
					/>

					<!-- Inner pulse ring for current position -->
					<circle
						cx={milestone.x}
						cy={milestone.y}
						r="14.4"
						fill="none"
						stroke="#10b981"
						stroke-width="1"
						opacity="0.6"
						class="pointer-events-none"
					/>

					<!-- Larger invisible clickable area for current position -->
					<circle
						cx={milestone.x}
						cy={milestone.y}
						r="30"
						fill="transparent"
						class="cursor-pointer transition-all duration-200 hover:brightness-110"
						role="button"
						tabindex="0"
						onmouseenter={(e) => !isMobile && handleMouseEnter(milestone, e)}
						onmouseleave={() => !isMobile && handleMouseLeave()}
						onmousemove={(e) => !isMobile && handleMouseMove(e)}
						onclick={(e) => handleClick(milestone, e)}
						onkeydown={(e) => handleKeydown(milestone, e)}
					/>
				{/if}

				<!-- Year labels -->
				{#if !isMobile}
					<text
						x={milestone.x}
						y={milestone.y - 32}
						text-anchor="middle"
						fill="#374151"
						font-size="14"
						font-family="monospace"
						class="dark:fill-gray-300"
					>
						{milestone.year}
					</text>
				{/if}
			{/each}
		</svg>

		<!-- Position labels below - only show on desktop -->
		{#if !isMobile}
			<div class="relative mt-6 h-20">
			{#each milestones as milestone}
				{@const svgWidth = 900}
				{@const leftPercentage = (milestone.x / svgWidth) * 100}
				<div
					class="absolute mx-1 w-32 cursor-pointer rounded-lg p-2 text-center opacity-100 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
					style="left: {leftPercentage}%; transform: translateX(-50%);"
					role="button"
					tabindex="0"
					onmouseenter={(e) => handleMouseEnter(milestone, e)}
					onmouseleave={handleMouseLeave}
					onmousemove={handleMouseMove}
				>
					<div
						class="text-xs font-semibold leading-tight text-gray-900 transition-colors duration-200 hover:text-green-600 dark:text-white dark:hover:text-green-400"
					>
						{milestone.title}
					</div>
					<div class="font-mono text-xs leading-tight text-gray-600 dark:text-gray-400">
						{milestone.company}
					</div>
					<div class="mt-1 text-xs text-gray-500 dark:text-gray-400">
						{milestone.year}
					</div>
				</div>
			{/each}
			</div>
		{/if}

		<!-- Job Preview Cards -->
		{#each milestones as milestone}
			{#if (hoveredJob === milestone.id && milestone.position && showPreview && !isMobile) || (clickedJob === milestone.id && milestone.position && isMobile)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={(e) => e.stopPropagation()}
					data-testid="job-preview-wrapper"
				>
					<JobPreviewCard
						position={milestone.position}
						x={isMobile ? (typeof window !== 'undefined' ? window.innerWidth / 2 : 200) : mousePosition.x}
						y={isMobile ? 150 : mousePosition.y}
						visible={true}
					/>
				</div>
			{/if}
		{/each}

		<!-- Mobile instruction text -->
		{#if isMobile}
			<div class="mt-2 text-center">
				<p class="text-xs text-gray-500 dark:text-gray-400">
					Tap circles to view position details • Tap outside to close
				</p>
			</div>
		{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	/* Hover effects for circles */
	circle:hover {
		filter: drop-shadow(0 0 8px currentColor);
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
	}
</style>
