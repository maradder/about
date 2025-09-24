<script lang="ts">
	import { portfolioDataWithCurrentJob } from '$lib/stores/portfolio';
	import { assets } from '$app/paths';
	import type { NavigationProps } from '$lib/types/portfolio';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	type Props = Pick<NavigationProps, 'brand'>;

	let { brand }: Props = $props();

	// Use the reactive portfolio data which updates when active section changes
	let data = $derived($portfolioDataWithCurrentJob);

	// Modal state
	let showProfileModal = $state(false);
	// Mobile menu state
	let showMobileMenu = $state(false);

	function openProfileModal(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		showProfileModal = true;
	}

	function closeProfileModal() {
		showProfileModal = false;
	}

	function handleModalKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeProfileModal();
		}
	}

	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}

	function closeMobileMenu() {
		showMobileMenu = false;
	}
</script>

<nav
	class="fixed top-0 right-0 left-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95"
	aria-label="Main navigation"
	data-testid="navigation"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Brand -->
			<div class="flex-shrink-0">
				<div class="flex items-center space-x-3">
					<button
						onclick={openProfileModal}
						class="h-10 w-10 cursor-pointer overflow-hidden rounded-full border-2 border-gray-200 transition-colors hover:border-green-400 dark:border-gray-600 dark:hover:border-green-300"
						aria-label="View larger profile picture"
						data-testid="profile-image-button"
					>
						<img src="{assets}/images/profile.png" alt="Marcus Radder" class="h-full w-full object-cover" />
					</button>
					<a
						href="#hero"
						class="text-2xl font-bold text-gray-900 transition-colors hover:text-green-400 dark:text-white dark:hover:text-green-300"
						data-testid="nav-brand"
					>
						{brand}
					</a>
				</div>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden items-center space-x-6 md:flex">
				<div class="flex space-x-8" role="menubar" aria-label="Main menu">
					{#each data.navigation.menuItems as item}
						<a
							href={item.anchor}
							class="px-3 py-2 text-sm font-medium transition-colors hover:text-green-400 dark:hover:text-green-300 {item.isActive
								? 'border-b-2 border-green-400 text-green-400 dark:border-green-300 dark:text-green-300'
								: 'text-gray-700 dark:text-gray-300'}"
							role="menuitem"
							aria-current={item.isActive ? 'page' : undefined}
							data-testid="nav-menu-item"
						>
							{item.label}
						</a>
					{/each}
				</div>
				<ThemeToggle />
			</div>

			<!-- Mobile menu -->
			<div class="flex items-center space-x-4 md:hidden">
				<ThemeToggle />
				<button
					type="button"
					onclick={toggleMobileMenu}
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-inset dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200 dark:focus:ring-green-300"
					data-testid="nav-hamburger"
					aria-expanded={showMobileMenu}
					aria-label="Toggle navigation menu"
				>
					<span class="sr-only">{showMobileMenu ? 'Close main menu' : 'Open main menu'}</span>
					{#if showMobileMenu}
						<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{:else}
						<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu panel -->
	{#if showMobileMenu}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute left-0 right-0 top-full z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm md:hidden dark:border-gray-700 dark:bg-gray-900/95"
			data-testid="mobile-menu"
		>
			<div class="space-y-1 px-4 py-4">
				{#each data.navigation.menuItems as item}
					<a
						href={item.anchor}
						onclick={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-green-400 dark:hover:bg-gray-800 dark:hover:text-green-300 {item.isActive
							? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
							: 'text-gray-700 dark:text-gray-300'}"
						role="menuitem"
						aria-current={item.isActive ? 'page' : undefined}
						data-testid="mobile-menu-item"
					>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>

<!-- Profile Picture Modal -->
{#if showProfileModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
		onclick={closeProfileModal}
		onkeydown={handleModalKeydown}
		data-testid="profile-modal-overlay"
	>
		<div class="relative mx-4 max-w-lg" onclick={(e) => e.stopPropagation()}>
			<!-- Close button -->
			<button
				onclick={closeProfileModal}
				class="absolute -top-12 right-0 z-10 text-white transition-colors hover:text-gray-300"
				aria-label="Close profile picture"
				data-testid="profile-modal-close"
			>
				<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<!-- Large profile image -->
			<div class="overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-gray-800">
				<img
					src="{assets}/images/profile.png"
					alt="Marcus Radder"
					class="h-auto w-full max-w-md object-cover"
					data-testid="profile-modal-image"
				/>
				<div class="p-4 text-center">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Marcus Radder</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Systems Architect & Software Engineer
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
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
</style>
