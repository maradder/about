<script lang="ts">
	import type { SkillsSectionProps } from '$lib/types/portfolio';

	type Props = SkillsSectionProps;

	let { heading, categories }: Props = $props();

	function getCategoryIcon(categoryName: string) {
		const name = categoryName.toLowerCase();
		if (name.includes('frontend') || name.includes('front-end')) {
			return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
			</svg>`;
		}
		if (name.includes('backend') || name.includes('back-end')) {
			return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/>
			</svg>`;
		}
		if (name.includes('database') || name.includes('data')) {
			return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
			</svg>`;
		}
		if (name.includes('tools') || name.includes('devops')) {
			return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
			</svg>`;
		}
		return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
		</svg>`;
	}

	function getProficiencyLevel(proficiency: string): number {
		switch (proficiency) {
			case 'Expert':
				return 100;
			case 'Advanced':
				return 80;
			case 'Intermediate':
				return 60;
			default:
				return 40;
		}
	}
</script>

<section id="skills" class="bg-gray-50 py-20 dark:bg-gray-800" data-testid="skills-section">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
				{heading}
			</h2>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each categories as category}
				<div
					class="group rounded-lg border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:scale-105 hover:border-gray-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-900/20 dark:hover:border-gray-700 dark:hover:shadow-gray-900/30"
					data-testid="skill-category"
				>
					<div class="mb-4 flex items-center">
						<div
							class="mr-3 text-green-600 transition-colors duration-300 group-hover:text-green-700 dark:text-green-400 dark:group-hover:text-green-300"
						>
							{@html getCategoryIcon(category.name)}
						</div>
						<h3
							class="group-hover:text-primary-700 dark:group-hover:text-primary-300 text-xl font-semibold text-gray-900 transition-colors duration-300 dark:text-white"
							data-testid="skill-category-title"
						>
							{category.name}
						</h3>
					</div>
					<div class="space-y-4">
						{#each category.skills as skill}
							<div
								class="group/skill rounded-lg p-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
								data-testid="skill-item"
							>
								<div class="mb-2 flex items-center justify-between">
									<span
										class="group-hover/skill:text-primary-600 dark:group-hover/skill:text-primary-400 font-medium text-gray-700 transition-colors duration-200 dark:text-gray-300"
										>{skill.name}</span
									>
									<span
										class="rounded-full px-3 py-1 text-xs font-medium {skill.proficiency ===
										'Expert'
											? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
											: skill.proficiency === 'Advanced'
												? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
												: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}"
										data-testid="skill-proficiency"
									>
										{skill.proficiency}
									</span>
								</div>
								<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
									<div
										class="h-2 rounded-full transition-all duration-500 {skill.proficiency ===
										'Expert'
											? 'bg-green-500 dark:bg-green-400'
											: skill.proficiency === 'Advanced'
												? 'bg-blue-500 dark:bg-blue-400'
												: 'bg-gray-400 dark:bg-gray-500'}"
										style="width: {getProficiencyLevel(skill.proficiency)}%"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
