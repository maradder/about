<script lang="ts">
	import { onMount } from 'svelte';
	import type { Project } from '$lib/types/portfolio';

	type Props = {
		projects: Project[];
	};

	let { projects }: Props = $props();

	let carouselContainer: HTMLDivElement;
	let cardsContainer = $state<HTMLDivElement>();
	let currentIndex = $state(0);
	let realIndex = $state(0); // Track the real position in original array
	let isDragging = false;
	let startX = 0;
	let currentX = 0;
	let translateX = 0;
	let cardWidth = $state(400);
	let isLoaded = $state(false);

	// Create extended array with duplicates for infinite scroll
	const extendedProjects = $derived([
		...projects, // Original projects
		...projects, // First duplicate set
		...projects // Second duplicate set
	]);

	onMount(() => {
		updateDimensions();
		// Small delay to ensure dimensions are calculated
		setTimeout(() => {
			isLoaded = true;
		}, 100);
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	});

	function updateDimensions() {
		if (!carouselContainer) return;

		const containerWidth = carouselContainer.clientWidth;
		const gap = 24; // 1.5rem gap

		// Calculate card width based on screen size
		if (containerWidth >= 1024) {
			// Desktop: show 2.5 cards
			cardWidth = (containerWidth - gap * 2) / 2.5;
		} else if (containerWidth >= 768) {
			// Tablet: show 1.5 cards
			cardWidth = (containerWidth - gap) / 1.5;
		} else {
			// Mobile: show 1.1 cards
			cardWidth = (containerWidth - gap * 0.5) / 1.1;
		}

		// Ensure minimum card width
		if (cardWidth < 350) {
			cardWidth = 350;
		}

		// Start at the middle set (first duplicate) for seamless scrolling
		if (currentIndex === 0 && isLoaded) {
			currentIndex = projects.length;
			realIndex = 0;
		}

		if (isLoaded) {
			goToSlide(currentIndex, false);
		}
	}

	function goToSlide(index: number, animate = true) {
		currentIndex = index;
		realIndex = index % projects.length;

		const gap = 24;
		translateX = -(currentIndex * (cardWidth + gap));

		if (cardsContainer) {
			if (animate) {
				cardsContainer.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
			} else {
				cardsContainer.style.transition = 'none';
			}

			cardsContainer.style.transform = `translateX(${translateX}px)`;
		}

		// Check if we need to reset position for infinite scroll
		if (animate) {
			setTimeout(() => {
				checkAndResetPosition();
			}, 300); // After transition completes
		}
	}

	function checkAndResetPosition() {
		// If we're at the end of the third set, jump back to the middle set
		if (currentIndex >= projects.length * 2) {
			currentIndex = currentIndex - projects.length;
			realIndex = currentIndex % projects.length;
			updatePosition(false);
		}
		// If we're at the beginning of the first set, jump to the middle set
		else if (currentIndex < projects.length) {
			currentIndex = currentIndex + projects.length;
			realIndex = currentIndex % projects.length;
			updatePosition(false);
		}
	}

	function updatePosition(animate = true) {
		const gap = 24;
		translateX = -(currentIndex * (cardWidth + gap));

		if (cardsContainer) {
			if (animate) {
				cardsContainer.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
			} else {
				cardsContainer.style.transition = 'none';
			}

			cardsContainer.style.transform = `translateX(${translateX}px)`;
		}
	}

	function nextSlide() {
		goToSlide(currentIndex + 1);
	}

	function prevSlide() {
		goToSlide(currentIndex - 1);
	}

	// Touch events for mobile
	function handleTouchStart(e: TouchEvent) {
		isDragging = true;
		startX = e.touches[0].clientX;
		if (cardsContainer) {
			cardsContainer.style.transition = 'none';
		}
	}

	function handleTouchMove(e: TouchEvent) {
		if (!isDragging || !cardsContainer) return;
		e.preventDefault();

		currentX = e.touches[0].clientX;
		const deltaX = currentX - startX;
		const newTranslateX = translateX + deltaX;

		cardsContainer.style.transform = `translateX(${newTranslateX}px)`;
	}

	function handleTouchEnd() {
		if (!isDragging) return;
		isDragging = false;

		const deltaX = currentX - startX;
		const threshold = cardWidth * 0.3;

		if (Math.abs(deltaX) > threshold) {
			if (deltaX > 0) {
				prevSlide();
			} else {
				nextSlide();
			}
		} else {
			updatePosition();
		}
	}

	// Mouse events for desktop
	function handleMouseDown(e: MouseEvent) {
		isDragging = true;
		startX = e.clientX;
		if (cardsContainer) {
			cardsContainer.style.transition = 'none';
			cardsContainer.style.cursor = 'grabbing';
		}

		// Prevent text selection during drag
		e.preventDefault();
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging || !cardsContainer) return;
		e.preventDefault();

		currentX = e.clientX;
		const deltaX = currentX - startX;
		const newTranslateX = translateX + deltaX;

		cardsContainer.style.transform = `translateX(${newTranslateX}px)`;
	}

	function handleMouseUp() {
		if (!isDragging) return;
		isDragging = false;

		const deltaX = currentX - startX;
		const threshold = cardWidth * 0.3;

		if (cardsContainer) {
			cardsContainer.style.cursor = 'grab';
		}

		if (Math.abs(deltaX) > threshold) {
			if (deltaX > 0) {
				prevSlide();
			} else {
				nextSlide();
			}
		} else {
			updatePosition();
		}
	}

	// Global mouse events
	onMount(() => {
		function handleGlobalMouseMove(e: MouseEvent) {
			handleMouseMove(e);
		}

		function handleGlobalMouseUp() {
			handleMouseUp();
		}

		document.addEventListener('mousemove', handleGlobalMouseMove);
		document.addEventListener('mouseup', handleGlobalMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleGlobalMouseMove);
			document.removeEventListener('mouseup', handleGlobalMouseUp);
		};
	});

	function getStatusColor(status: string) {
		switch (status) {
			case 'Live':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
			case 'In Development':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
			case 'Concept':
				return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
		}
	}
</script>

<div class="relative" data-testid="projects-carousel">
	<!-- Carousel container -->
	<div bind:this={carouselContainer} class="overflow-hidden" data-testid="carousel-container">
		{#if !isLoaded}
			<!-- Loading skeleton -->
			<div
				class="flex gap-6 select-none"
				style="width: fit-content;"
				data-testid="skeleton-container"
			>
				{#each Array(3) as _, index}
					<div
						class="flex-shrink-0 animate-pulse rounded-lg border border-gray-300 bg-gray-200 p-6 dark:border-gray-600 dark:bg-gray-700"
						style="width: 400px; min-width: 400px;"
						data-testid="skeleton-card"
					>
						<!-- Title skeleton -->
						<div class="mb-4 flex flex-wrap items-start justify-between">
							<div>
								<div class="mb-2 h-6 w-48 rounded bg-gray-300 dark:bg-gray-600"></div>
								<div class="mb-4 h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
							</div>
							<div class="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-600"></div>
						</div>

						<!-- Technologies skeleton -->
						<div class="mb-4 space-y-2">
							<div class="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
							<div class="flex flex-wrap gap-1">
								{#each Array(4) as _}
									<div class="h-6 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
								{/each}
							</div>
						</div>

						<!-- Features skeleton -->
						<div class="mb-4 space-y-2">
							<div class="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
							{#each Array(3) as _}
								<div class="flex items-start space-x-2">
									<div
										class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-600"
									></div>
									<div class="h-4 flex-1 rounded bg-gray-300 dark:bg-gray-600"></div>
								</div>
							{/each}
						</div>

						<!-- Buttons skeleton -->
						<div class="flex space-x-3">
							<div class="h-10 flex-1 rounded bg-gray-300 dark:bg-gray-600"></div>
							<div class="h-10 flex-1 rounded bg-gray-300 dark:bg-gray-600"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div
				bind:this={cardsContainer}
				class="flex cursor-grab gap-6 select-none"
				style="width: fit-content;"
				role="region"
				aria-label="Projects carousel"
				aria-live="polite"
				aria-atomic="false"
				ontouchstart={handleTouchStart}
				ontouchmove={handleTouchMove}
				ontouchend={handleTouchEnd}
				onmousedown={handleMouseDown}
				data-testid="cards-container"
			>
				{#each extendedProjects as project}
					<div
						class="flex-shrink-0 rounded-lg border border-gray-100 bg-white shadow-md transition-all duration-300 hover:border-gray-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-900/20 dark:hover:border-gray-700 dark:hover:shadow-gray-900/30"
						style="width: {cardWidth}px; height: 420px;"
						role="listitem"
						data-testid="project-card"
					>
						<div class="flex h-full flex-col p-6">
							<!-- Header section with title, description, and status -->
							<div class="mb-4 flex flex-wrap items-start justify-between">
								<div class="flex-1 pr-4">
									<h3
										class="mb-2 text-xl font-semibold text-gray-900 dark:text-white"
										data-testid="project-title"
									>
										{project.name}
									</h3>
									<p
										class="text-sm leading-relaxed text-gray-600 dark:text-gray-300"
										data-testid="project-description"
									>
										{project.description}
									</p>
								</div>
								<span
									class="rounded-full px-3 py-1 text-sm font-medium {getStatusColor(
										project.status
									)}"
									data-testid="project-status"
								>
									{project.status}
								</span>
							</div>

							<!-- Middle section that grows to fill available space -->
							<div class="mb-6 flex-1 space-y-4">
								<div data-testid="project-technologies">
									<h4 class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Technologies
									</h4>
									<div class="flex flex-wrap gap-1">
										{#each project.technologies.slice(0, 6) as tech}
											<span
												class="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
											>
												{tech}
											</span>
										{/each}
										{#if project.technologies.length > 6}
											<span
												class="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400"
											>
												+{project.technologies.length - 6} more
											</span>
										{/if}
									</div>
								</div>

								<div data-testid="project-features">
									<h4 class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Key Features
									</h4>
									<ul
										class="space-y-1 text-sm text-gray-600 dark:text-gray-300"
										role="list"
										aria-label="Key features for {project.name}"
									>
										{#each project.features.slice(0, 3) as feature}
											<li class="flex items-start space-x-2" role="listitem">
												<div class="bg-primary-500 mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
												<span>{feature}</span>
											</li>
										{/each}
										{#if project.features.length > 3}
											<li class="flex items-start space-x-2 text-gray-500 dark:text-gray-400">
												<div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
												<span>+{project.features.length - 3} additional features</span>
											</li>
										{/if}
									</ul>
								</div>
							</div>

							<!-- Footer section pinned to bottom -->
							<div class="mt-auto flex space-x-3">
								{#if project.demoUrl}
									<a
										href={project.demoUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="bg-primary-600 hover:bg-primary-700 flex-1 rounded px-4 py-2 text-center text-sm font-medium text-white transition-colors"
										aria-label="View demo for {project.name}"
										data-testid="project-demo-link"
									>
										View Demo
									</a>
								{/if}
								{#if project.githubUrl}
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="flex-1 rounded border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
										aria-label="View source code for {project.name}"
										data-testid="project-github-link"
									>
										View Code
									</a>
								{/if}
								{#if !project.demoUrl && !project.githubUrl}
									<div
										class="flex-1 rounded border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-400 dark:border-gray-700 dark:text-gray-500"
									>
										Private Project
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if isLoaded}
		<!-- Navigation arrows for desktop -->
		<div class="hidden md:flex">
			<button
				onclick={prevSlide}
				class="absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-all duration-200 hover:border-gray-300 hover:shadow-xl md:-left-6 lg:-left-12 xl:-left-16 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700"
				aria-label="Previous project"
				data-testid="prev-button"
			>
				<svg
					class="h-6 w-6 text-gray-600 dark:text-gray-300"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<button
				onclick={nextSlide}
				class="absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-all duration-200 hover:border-gray-300 hover:shadow-xl md:-right-6 lg:-right-12 xl:-right-16 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700"
				aria-label="Next project"
				data-testid="next-button"
			>
				<svg
					class="h-6 w-6 text-gray-600 dark:text-gray-300"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<!-- Dot indicators -->
		<div class="mt-6 flex justify-center space-x-2" data-testid="carousel-indicators">
			{#each projects as _, index}
				<button
					onclick={() => goToSlide(projects.length + index)}
					class="h-2 w-2 rounded-full transition-all duration-200 {index === realIndex
						? 'bg-primary-600 scale-125'
						: 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'}"
					aria-label="Go to project {index + 1}"
					data-testid="carousel-dot"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* Smooth scrolling for webkit browsers */
	.cursor-grab:active {
		cursor: grabbing;
	}

	/* Prevent text selection during drag */
	.select-none {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
