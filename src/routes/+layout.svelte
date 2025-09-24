<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import BackToTopButton from '$lib/components/ui/BackToTopButton.svelte';

	// Import theme store to initialize it
	import '$lib/stores/theme';

	let { children } = $props();

	// Ensure theme is applied on mount
	onMount(() => {
		// Theme store initializes automatically on import
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<!-- Back to Top Button -->
<BackToTopButton />
