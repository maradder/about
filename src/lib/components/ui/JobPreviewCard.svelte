<script lang="ts">
	import type { Position } from '$lib/types/portfolio';

	type Props = {
		position: Position;
		x: number;
		y: number;
		visible: boolean;
	};

	let { position, x, y, visible }: Props = $props();

	// Get a brief synopsis from the first achievement
	let synopsis = $derived(position.achievements[0] || 'No description available');

	// Truncate synopsis if too long
	let shortSynopsis = $derived(synopsis.length > 120 ? synopsis.slice(0, 120) + '...' : synopsis);
</script>

{#if visible}
	<div
		class="pointer-events-none fixed z-[9999] w-80 -translate-x-1/2 transform rounded-lg border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800"
		style="left: {x}px; top: {y + 10}px;"
		data-testid="job-preview-card"
	>
		<!-- Arrow pointing up -->
		<div class="absolute -top-2 left-1/2 -translate-x-1/2 transform">
			<div
				class="h-0 w-0 border-r-8 border-b-8 border-l-8 border-r-transparent border-b-white border-l-transparent dark:border-b-gray-800"
			></div>
		</div>

		<!-- Card content -->
		<div class="space-y-3">
			<!-- Header -->
			<div class="border-b border-gray-200 pb-2 dark:border-gray-600">
				<h3 class="text-sm font-semibold text-gray-900 dark:text-white">
					{position.title}
				</h3>
				<p class="font-mono text-xs text-gray-600 dark:text-gray-400">
					{position.company} • {position.location}
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-500">
					{position.startDate} - {position.isCurrent ? 'Present' : position.endDate}
				</p>
			</div>

			<!-- Synopsis -->
			<div>
				<p class="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
					{shortSynopsis}
				</p>
			</div>

			<!-- Technologies -->
			<div>
				<p class="mb-1 text-xs font-medium text-gray-600 dark:text-gray-400">Technologies:</p>
				<div class="flex flex-wrap gap-1">
					{#each position.technologies.slice(0, 6) as tech}
						<span
							class="inline-block rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
						>
							{tech}
						</span>
					{/each}
					{#if position.technologies.length > 6}
						<span class="inline-block px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
							+{position.technologies.length - 6} more
						</span>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
