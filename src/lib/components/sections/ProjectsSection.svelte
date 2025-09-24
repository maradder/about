<script lang="ts">
	import type { ProjectsSectionProps } from '$lib/types/portfolio';
	import ProjectsCarousel from '$lib/components/ui/ProjectsCarousel.svelte';

	type Props = ProjectsSectionProps;

	let { heading, projects }: Props = $props();
</script>

<section
	id="projects"
	class="bg-gray-50 py-20 dark:bg-gray-800"
	data-testid="projects-section"
	aria-labelledby="projects-heading"
>
	<div class="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
		<div class="mb-16 text-center">
			<h2
				id="projects-heading"
				class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white"
			>
				{heading}
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
				Swipe or drag to explore my featured projects
			</p>
		</div>

		<ProjectsCarousel {projects} />
	</div>
</section>
