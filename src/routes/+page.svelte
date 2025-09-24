<script lang="ts">
	import { onMount } from 'svelte';
	import { portfolioDataWithCurrentJob, setActiveSection } from '$lib/stores/portfolio';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import ExperienceCarousel from '$lib/components/ui/ExperienceCarousel.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import ReadingSection from '$lib/components/sections/ReadingSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';
	import SkillsSection from '$lib/components/sections/SkillsSection.svelte';

	let data = $portfolioDataWithCurrentJob;

	// Simple intersection observer for section highlighting
	onMount(() => {
		const sections = document.querySelectorAll('section[data-testid]');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId =
							entry.target.getAttribute('data-testid')?.replace('-section', '') || 'hero';
						setActiveSection(sectionId);
					}
				});
			},
			{ threshold: 0.5 }
		);

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Marcus Radder - Systems Architect & Software Engineer</title>
	<meta
		name="description"
		content="Systems Architect with leadership experience building scalable cloud solutions. Specializing in Azure, Python, TypeScript, and technical team leadership."
	/>
	<meta
		name="keywords"
		content="Systems Architect, Software Engineer, Cloud, Azure, Python, TypeScript, Leadership"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Marcus Radder - Systems Architect" />
	<meta
		property="og:description"
		content="Systems Architect with leadership experience building scalable cloud solutions."
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Marcus Radder - Systems Architect" />
	<meta
		property="twitter:description"
		content="Systems Architect with leadership experience building scalable cloud solutions."
	/>
</svelte:head>

<!-- Skip Navigation Link for Accessibility -->
<a
	href="#main-content"
	class="bg-primary-600 sr-only z-50 rounded-md px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
	data-testid="skip-nav"
>
	Skip to main content
</a>

<!-- Navigation -->
<Navigation brand={data.navigation.brand} />

<!-- Main Content -->
<main id="main-content" data-testid="main-content">
	<!-- Hero Section -->
	<HeroSection {...data.hero} />

	<!-- About Section -->
	<section
		id="about"
		class="bg-white py-20 dark:bg-gray-900"
		data-testid="about-section"
		aria-labelledby="about-heading"
	>
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="mb-8 text-center sm:mb-12 lg:mb-16">
				<h2
					id="about-heading"
					class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl dark:text-white"
				>
					{data.about.heading}
				</h2>
			</div>

			<div class="mx-auto max-w-3xl text-center" data-testid="about-narrative">
				{#each data.about.narrative.split('\n\n') as paragraph}
					<p class="mb-4 text-sm leading-relaxed text-gray-600 sm:mb-6 sm:text-base lg:text-lg dark:text-gray-300">{@html paragraph}</p>
				{/each}
			</div>

			<div class="mt-8 sm:mt-12" data-testid="about-highlights">
				<h3 class="mb-6 text-center text-lg font-semibold text-gray-900 sm:mb-8 sm:text-xl dark:text-white">
					Key Highlights
				</h3>
				<div class="mx-auto max-w-3xl">
					<div class="grid gap-4 sm:gap-6 md:grid-cols-2">
						{#each data.about.highlights as highlight}
							<div
								class="flex flex-col items-center space-y-2 text-center p-2"
								data-testid="about-highlight-item"
							>
								<div
									class="bg-primary-100 dark:bg-primary-900 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
								>
									<svg
										class="text-primary-600 h-5 w-5 dark:text-white"
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
								<p class="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300">{highlight}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<SkillsSection {...data.skills} />

	<!-- Experience Section -->
	<section
		id="experience"
		class="bg-white py-20 dark:bg-gray-900"
		data-testid="experience-section"
		aria-labelledby="experience-heading"
	>
		<div class="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
			<div class="mb-8 text-center sm:mb-12 lg:mb-16">
				<h2
					id="experience-heading"
					class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl dark:text-white"
				>
					{data.experience.heading}
				</h2>
				<p class="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg dark:text-gray-300">
					Swipe or drag to explore my professional journey
				</p>
			</div>

			<ExperienceCarousel positions={data.experience.positions} />
		</div>
	</section>

	<!-- Projects Section -->
	<ProjectsSection {...data.projects} />

	<!-- Reading Section -->
	<ReadingSection {...data.reading} />

	<!-- Contact Section -->
	<ContactSection {...data.contact} />
</main>

<style>
	/* Smooth scrolling */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Screen reader only utility */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.focus\:not-sr-only:focus {
		position: static;
		width: auto;
		height: auto;
		padding: 0.5rem 1rem;
		margin: 0;
		overflow: visible;
		clip: auto;
		white-space: normal;
	}
</style>
