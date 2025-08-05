<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<main class="flex flex-col min-h-screen bg-gray-100">
	<Header />

	<div class="flex-1 container mx-auto p-4 flex flex-col">
		{@render children()}
	</div>

	<Footer />
</main>
