<script lang="ts">
	import { page } from '$app/state';
	import SearchBox from './SearchBox.svelte';

	let active = $state(false);
	let query = $state('');
</script>

<header class="sticky flex items-center justify-between gap-8 bg-gray-800 p-4 text-white">
	<a href="/"><span class="text-lg font-semibold">ArthropodShop</span></a>

	<input
		type="text"
		id="searchBox"
		placeholder="Search species, sellers, users, etc..."
		bind:value={query}
		onfocusin={() => {
			active = true;
		}}
		onfocusout={() => {
			active = false;
		}}
		class="z-5 max-w-172 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm"
	/>

	{#if active}
		<SearchBox {query} />
	{/if}

	{#if page.data.user}
		<div class="flex items-center gap-4">
			{#if page.data.shops && page.data.shops.length > 0}
				<a
					href="/my-shops"
					class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
				>
					My Shops ({page.data.shops.length})
				</a>
			{:else}
				<a
					href="/shop/new"
					class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
				>
					Create Shop
				</a>
			{/if}
			<span class="text-sm"
				>Welcome,
				<a href={`/profile/${page.data.user.slug}`} class="font-medium hover:underline">
					{page.data.user.username}
				</a>
				!</span
			>
			<form action="/auth/sign-out?/signOut" method="post">
				<button
					type="submit"
					class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
				>
					Sign Out
				</button>
			</form>
		</div>
	{:else}
		<div class="flex gap-4">
			<a href="/auth/sign-up">Sign Up</a>
			<a href="/auth/sign-in">Sign In</a>
		</div>
	{/if}
</header>
