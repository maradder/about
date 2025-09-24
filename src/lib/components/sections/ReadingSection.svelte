<script lang="ts">
	import type { ReadingSectionProps, Book } from '$lib/types/portfolio';
	import BookCoverHover from '$lib/components/ui/BookCoverHover.svelte';

	type Props = ReadingSectionProps;

	let { heading, subtitle, books }: Props = $props();

	// Hover state management
	let hoveredBook = $state<Book | null>(null);
	let mousePosition = $state({ x: 0, y: 0 });
	let hoverTimeout: ReturnType<typeof setTimeout> | null = $state(null);
	let showCover = $state(false);

	// Return all books in a single group
	function getAllBooksInSingleGroup() {
		if (!books || !Array.isArray(books)) {
			return {};
		}

		return {
			'All Books': books
		};
	}

	// Generate star rating display
	function getStarRating(rating: number = 0): string {
		return '★'.repeat(rating) + '☆'.repeat(5 - rating);
	}

	// Handle mouse events for book hover
	function handleMouseEnter(book: Book, event: MouseEvent) {
		// Clear any existing timeout
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
		}

		// Update mouse position
		mousePosition = {
			x: event.clientX,
			y: event.clientY
		};

		hoveredBook = book;

		// Set timeout for showing cover
		hoverTimeout = setTimeout(() => {
			showCover = true;
		}, 300);
	}

	function handleMouseLeave() {
		// Clear timeout
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}

		hoveredBook = null;
		showCover = false;
	}

	function handleMouseMove(event: MouseEvent) {
		if (hoveredBook) {
			mousePosition = {
				x: event.clientX,
				y: event.clientY
			};
		}
	}
</script>

<section id="reading" class="bg-gray-50 py-20 dark:bg-gray-900" data-testid="reading-section">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
				{heading}
			</h2>
			{#if subtitle}
				<p class="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
					{subtitle}
				</p>
			{/if}
		</div>

		<!-- Books Grid -->
		{#if books && books.length > 0}
			<div class="space-y-12">
				<!-- Books by Category -->
				{#each Object.entries(getAllBooksInSingleGroup()) as [, categoryBooks]}
					<div class="category-section">
						<!-- Remove category heading since we're showing all books together -->

						<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{#each categoryBooks as book}
								<div
									class="book-card cursor-pointer rounded-lg border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:border-gray-200 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/20 dark:hover:border-gray-600 dark:hover:shadow-gray-900/30"
									role="button"
									tabindex="0"
									onmouseenter={(e) => handleMouseEnter(book, e)}
									onmouseleave={handleMouseLeave}
									onmousemove={handleMouseMove}
								>
									<div>
										<!-- Book Title & Author -->
										<div class="mb-4">
											<h4
												class="mb-2 text-lg leading-tight font-semibold text-gray-900 dark:text-white"
											>
												{book.title}
											</h4>
											<p class="text-sm font-medium text-gray-600 dark:text-gray-400">
												by {book.author}
											</p>
										</div>

										<!-- Rating -->
										{#if book.rating}
											<div class="mb-3">
												<span
													class="text-sm text-yellow-400"
													aria-label="Rating: {book.rating} out of 5 stars"
												>
													{getStarRating(book.rating)}
												</span>
											</div>
										{/if}

										<!-- Description -->
										{#if book.description}
											<p class="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
												{book.description}
											</p>
										{/if}

										<!-- Book Category and Action Button -->
										<div class="flex items-center justify-between">
											<div
												class="inline-flex items-center text-sm text-gray-500 dark:text-gray-400"
											>
												{book.category || 'General'}
											</div>
											{#if book.amazonLink}
												<a
													href={book.amazonLink}
													target="_blank"
													rel="noopener noreferrer"
													class="inline-flex items-center text-sm font-medium text-green-600 transition-colors duration-200 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
												>
													View on Amazon
													<svg
														class="ml-1 h-4 w-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
														/>
													</svg>
												</a>
											{/if}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="py-12 text-center">
				<p class="text-gray-500 dark:text-gray-400">No books available to display.</p>
			</div>
		{/if}

		<!-- Footer Note -->
		<div class="mt-16 text-center">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				These books have significantly influenced my approach to software architecture, system
				design, and development practices.
			</p>
		</div>

		<!-- Book Cover Hover -->
		{#if hoveredBook && showCover}
			<BookCoverHover book={hoveredBook} x={mousePosition.x} y={mousePosition.y} visible={true} />
		{/if}
	</div>
</section>

<style>
	.book-card:hover {
		transform: translateY(-2px);
	}

	.category-section {
		scroll-margin-top: 100px;
	}

	/* Ensure smooth transitions */
	.book-card {
		transition: all 0.3s ease;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.book-card {
			transition: none;
		}

		.book-card:hover {
			transform: none;
		}
	}
</style>
