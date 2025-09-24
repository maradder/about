<script lang="ts">
	import type { HeroSectionProps } from '$lib/types/portfolio';
	import AnimatedCTAButton from '$lib/components/ui/AnimatedCTAButton.svelte';
	import CareerJourney from '$lib/components/ui/CareerJourney.svelte';

	type Props = HeroSectionProps;

	let { name, title, subtitle, tagline, ctaText, ctaLink, backgroundImage, profileImage }: Props =
		$props();
</script>

<section
	id="hero"
	class="from-primary-50 to-secondary-100 relative flex min-h-screen items-center justify-center bg-gradient-to-br dark:from-gray-900 dark:to-gray-800"
	role="banner"
	aria-labelledby="hero-name"
	data-testid="hero-section"
	style={backgroundImage ? `background-image: url(${backgroundImage})` : ''}
>
	{#if backgroundImage}
		<div class="bg-opacity-30 absolute inset-0 bg-black"></div>
	{/if}

	<div class="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
		<div class="space-y-6 sm:space-y-8">
			{#if profileImage}
				<div class="animate-fade-in flex justify-center">
					<img
						src={profileImage}
						alt="Professional headshot of {name}"
						class="h-32 w-32 rounded-full border-4 border-white object-cover shadow-2xl sm:h-40 sm:w-40"
						data-testid="hero-profile-image"
					/>
				</div>
			{/if}

			<div class="animate-slide-in-up space-y-4">
				<h1
					id="hero-name"
					class="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-white {backgroundImage
						? 'text-white'
						: ''}"
					data-testid="hero-name"
				>
					{name}
				</h1>

				<h2
					class="text-lg font-medium text-gray-700 sm:text-xl md:text-2xl lg:text-3xl dark:text-gray-300 {backgroundImage
						? 'text-gray-200'
						: ''}"
					data-testid="hero-title"
				>
					{title}
				</h2>

				<h3
					class="text-primary-600 text-base font-semibold sm:text-lg md:text-xl lg:text-2xl dark:text-white {backgroundImage
						? 'text-primary-300'
						: ''}"
					data-testid="hero-subtitle"
				>
					{subtitle}
				</h3>

				{#if tagline}
					<p
						class="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg dark:text-gray-400 {backgroundImage
							? 'text-gray-300'
							: ''}"
						data-testid="hero-tagline"
					>
						{tagline}
					</p>
				{/if}
			</div>

			<!-- Career Journey Visualization -->
			<div class="animate-slide-in-up pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-10" style="animation-delay: 0.4s;">
				<CareerJourney />
			</div>

			<div class="animate-slide-in-up pt-4 sm:pt-6" style="animation-delay: 0.6s;">
				<AnimatedCTAButton href={ctaLink} text={ctaText} variant="terminal" />
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="animate-bounce-gentle absolute bottom-8 left-1/2 -translate-x-1/2 transform"
		aria-label="Scroll down to view more content"
	>
		<div
			class="flex h-10 w-6 justify-center rounded-full border-2 border-gray-400 dark:border-gray-500 {backgroundImage
				? 'border-gray-300'
				: ''}"
		>
			<div
				class="mt-2 h-3 w-1 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500 {backgroundImage
					? 'bg-gray-300'
					: ''}"
			></div>
		</div>
	</div>
</section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slide-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes bounce-gentle {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.8s ease-out;
	}

	.animate-slide-in-up {
		animation: slide-in-up 0.8s ease-out;
	}

	.animate-bounce-gentle {
		animation: bounce-gentle 2s infinite;
	}
</style>
