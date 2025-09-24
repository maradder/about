<script lang="ts">
	import { onMount } from 'svelte';
	import { portfolioDataWithCurrentJob } from '$lib/stores/portfolio';
	import JobPreviewCard from './JobPreviewCard.svelte';

	let mounted = $state(false);
	let hoveredJob = $state<string | null>(null);
	let mousePosition = $state({ x: 0, y: 0 });
	let hoverTimeout: ReturnType<typeof setTimeout> | null = $state(null);
	let showPreview = $state(false);

	// Get portfolio data reactively
	let data = $derived($portfolioDataWithCurrentJob);

	// Convert experience data to milestones
	let milestones = $derived(
		(() => {
			const positions = data.experience.positions;

			// Sort positions chronologically by start date
			const sortedPositions = [...positions].sort((a, b) => {
				const dateA = new Date(a.startDate + '-01');
				const dateB = new Date(b.startDate + '-01');
				return dateA.getTime() - dateB.getTime();
			});

			// Calculate positioning
			const baseY = [40, 70, 70, 40, 20]; // Pattern: high, low, low, high, highest

			// Responsive horizontal spacing calculation
			const totalWidth = 900; // Increased SVG width for more spacing
			const padding = 60; // Padding on each side
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
	});
</script>

{#if mounted}
	<div class="relative mx-auto mb-8 w-full max-w-4xl" data-testid="career-journey">
		<!-- SVG Container -->
		<svg
			viewBox="0 0 900 100"
			class="h-20 w-full sm:h-24 md:h-28"
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
						class="cursor-pointer transition-all duration-200 hover:brightness-110"
						role="button"
						tabindex="0"
						onmouseenter={(e) => handleMouseEnter(milestone, e)}
						onmouseleave={handleMouseLeave}
						onmousemove={handleMouseMove}
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
						class="cursor-pointer transition-all duration-200 hover:brightness-110"
						role="button"
						tabindex="0"
						onmouseenter={(e) => handleMouseEnter(milestone, e)}
						onmouseleave={handleMouseLeave}
						onmousemove={handleMouseMove}
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
				{/if}

				<!-- Year labels -->
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
			{/each}
		</svg>

		<!-- Position labels below - aligned with circles -->
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
						class="text-xs font-semibold text-gray-900 transition-colors duration-200 hover:text-green-600 dark:text-white dark:hover:text-green-400"
					>
						{milestone.title}
					</div>
					<div class="font-mono text-xs text-gray-600 dark:text-gray-400">
						{milestone.company}
					</div>
					<div class="mt-1 text-xs text-gray-500 dark:text-gray-400">
						{milestone.year}
					</div>
				</div>
			{/each}
		</div>

		<!-- Job Preview Cards -->
		{#each milestones as milestone}
			{#if hoveredJob === milestone.id && milestone.position && showPreview}
				<JobPreviewCard
					position={milestone.position}
					x={mousePosition.x}
					y={mousePosition.y}
					visible={true}
				/>
			{/if}
		{/each}
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
