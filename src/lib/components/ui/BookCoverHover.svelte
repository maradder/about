<script lang="ts">
	import type { Book } from '$lib/types/portfolio';

	type Props = {
		book: Book;
		x: number;
		y: number;
		visible: boolean;
	};

	let { book, x, y, visible }: Props = $props();

	// State for image loading
	let imageError = $state(false);

	function handleImageError() {
		imageError = true;
	}

	function handleImageLoad() {
		imageError = false;
	}
</script>

{#if visible}
	<div
		class="pointer-events-none fixed z-[9999]"
		style="left: {x + 20}px; top: {y - 50}px;"
		data-testid="book-cover-hover"
	>
		<div
			class="book-cover-container rounded-lg border border-gray-200 bg-white p-3 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
		>
			<!-- Arrow pointing left -->
			<div class="absolute top-1/2 -left-2 -translate-y-1/2 transform">
				<div
					class="h-0 w-0 border-t-8 border-r-8 border-b-8 border-t-transparent border-r-white border-b-transparent dark:border-r-gray-800"
				></div>
			</div>

			<!-- Book cover image or placeholder -->
			{#if imageError || !book.coverImage}
				<!-- Simple Sad Robot ASCII Placeholder -->
				<div
					class="flex h-48 w-32 flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-100 text-gray-600 shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
				>
					<pre class="mb-3 text-center font-mono text-lg leading-tight select-none">{` ┌─────┐
 │ ◕   ◕ │
 │   ∩   │
 └─────┘
   │ │ │
   ╰─╯─╰`}</pre>
					<p class="px-2 text-center text-xs leading-tight font-medium">No cover found</p>
					<p class="mt-1 text-xs text-gray-500 dark:text-gray-500">beep boop :(</p>
				</div>
			{:else}
				<img
					src={book.coverImage}
					alt="Cover of {book.title}"
					class="book-cover-image h-48 w-32 rounded object-cover shadow-lg"
					loading="lazy"
					onerror={handleImageError}
					onload={handleImageLoad}
				/>
			{/if}

			<!-- Book title below cover -->
			<div class="mt-2 max-w-32 text-center">
				<p class="text-xs leading-tight font-medium text-gray-900 dark:text-white">
					{book.title}
				</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.book-cover-container {
		animation: fadeInScale 0.2s ease-out;
	}

	.book-cover-image {
		transition: transform 0.2s ease-out;
	}

	.book-cover-image:hover {
		transform: scale(1.05);
	}

	@keyframes fadeInScale {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.book-cover-container {
			animation: none;
		}

		.book-cover-image {
			transition: none;
		}

		.book-cover-image:hover {
			transform: none;
		}
	}
</style>
