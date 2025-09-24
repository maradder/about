<script lang="ts">
	import type { ExperienceSectionProps } from '$lib/types/portfolio';

	type Props = ExperienceSectionProps;

	let { heading, positions }: Props = $props();
</script>

<section id="experience" class="bg-white py-20" data-testid="experience-section">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
				{heading}
			</h2>
		</div>

		<div class="space-y-8" data-testid="experience-timeline">
			{#each positions as position}
				<div
					class="border-primary-200 relative border-l-2 pl-8 {position.isCurrent
						? 'border-primary-500'
						: ''}"
					data-testid="position-item"
				>
					<div class="bg-primary-500 absolute top-0 -left-2 h-4 w-4 rounded-full"></div>

					<div class="rounded-lg bg-gray-50 p-6">
						<div class="mb-4 flex flex-wrap items-start justify-between">
							<div>
								<h3 class="text-xl font-semibold text-gray-900" data-testid="position-title">
									{position.title}
								</h3>
								<p class="text-primary-600 text-lg" data-testid="position-company">
									{position.company}
								</p>
								<p class="text-gray-600" data-testid="position-location">
									{position.location}
								</p>
							</div>
							<span
								class="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-500"
								data-testid="position-dates"
							>
								{position.startDate} - {position.endDate}
							</span>
						</div>

						<ul class="mb-4 space-y-2">
							{#each position.achievements as achievement}
								<li class="flex items-start space-x-2" data-testid="position-achievement">
									<div class="bg-primary-500 mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
									<span class="text-gray-600">{achievement}</span>
								</li>
							{/each}
						</ul>

						<div class="flex flex-wrap gap-2" data-testid="position-tech">
							{#each position.technologies as tech}
								<span class="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
