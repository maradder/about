<script lang="ts">
	import type { AboutSectionProps } from '$lib/types/portfolio';

	type Props = AboutSectionProps;

	let { heading, narrative, highlights }: Props = $props();
</script>

<section id="about" class="bg-white py-20" data-testid="about-section">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
				{heading}
			</h2>
		</div>

		<div class="mx-auto prose prose-lg" data-testid="about-narrative">
			{#each narrative.split('\n\n') as paragraph}
				<p class="mb-6 leading-relaxed text-gray-600">{@html paragraph}</p>
			{/each}
		</div>

		<div class="mt-12" data-testid="about-highlights">
			<h3 class="mb-6 text-center text-xl font-semibold text-gray-900">Key Highlights</h3>
			<div class="grid gap-4 md:grid-cols-2">
				{#each highlights as highlight}
					<div class="flex items-start space-x-3" data-testid="about-highlight-item">
						<div
							class="bg-primary-100 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
						>
							<svg
								class="text-primary-600 h-4 w-4 dark:text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<p class="text-gray-600">{highlight}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
