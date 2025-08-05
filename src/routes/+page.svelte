<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	const featuredItems = $state<any[]>([]);
	const followedCreatorsNewListings = $state<any[]>([]);
	const recentListings = $state<any[]>([]);
	const storefronts = $state<any[]>([]);

	onMount(() => {
		// Placeholder featured items
		featuredItems.splice(
			0,
			featuredItems.length,
			...Array.from({ length: 3 }, () => ({
				species: faker.animal.insect(),
				image: 'https://static.photos/outdoor/640x360/' + faker.number.int({ min: 1, max: 100 }),
				title: faker.commerce.productName()
			}))
		);
		// Placeholder followed creators
		followedCreatorsNewListings.splice(
			0, followedCreatorsNewListings.length,
			...Array.from({ length: 5 }, () => ({
				name: faker.person.fullName(),
				image: faker.image.avatar(),
				location: faker.location.city(),
				newListings: Array.from({ length: 3 }, () => ({
					species: faker.animal.insect(),
					price: faker.commerce.price({ min: 5, max: 150 }),
					seller: faker.internet.username(),
					image: 'https://static.photos/outdoor/640x360/' + faker.number.int({ min: 1, max: 100 })
				}))
			})),
			{
				name: 'South Dixie BCC',
				image: 'https://randomuser.me/api/portraits/women/44.jpg',
				location: 'Shively, KY',
				newListings: [
					{
						species: 'Goliath Birdeater',
						price: '120.00',
						seller: 'janedoe',
						image: 'https://static.photos/outdoor/640x360/101'
					},
					{
						species: 'Blue Death Feigning Beetle',
						price: '35.00',
						seller: 'janedoe',
						image: 'https://static.photos/outdoor/640x360/102'
					},
					{
						species: 'Orchid Mantis',
						price: '75.00',
						seller: 'janedoe',
						image: 'https://static.photos/outdoor/640x360/103'
					}
				]
			}
		);

		// Placeholder listings
		recentListings.splice(
			0,
			recentListings.length,
			...Array.from({ length: 8 }, () => ({
				species: faker.animal.insect(),
				price: faker.commerce.price({ min: 5, max: 150 }),
				seller: faker.internet.username(),
				image: 'https://static.photos/outdoor/640x360/' + faker.number.int({ min: 1, max: 100 })
			}))
		);

		// Placeholder storefronts
		storefronts.splice(
			0,
			storefronts.length,
			...Array.from({ length: 6 }, () => ({
				name: faker.company.name(),
				logo: faker.image.avatar(),
				location: faker.location.state()
			}))
		);
	});
</script>

{#if page.data.user}
<section class="py-6">
	<h2 class="mb-4 text-xl font-bold">What's New in Your Feed</h2>
	{#if followedCreatorsNewListings.length > 0}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each followedCreatorsNewListings as creator}
				<div class="rounded-lg bg-white p-4 shadow">
					<img src={creator.image} alt={creator.name} class="mb-2 h-16 w-16 rounded-full" />
					<h3 class="text-md font-semibold">{creator.name}</h3>
					<p class="text-sm text-gray-500">{creator.location}</p>
					<h4 class="mt-2 text-sm font-bold">New Listings:</h4>
					<ul class="mt-1 space-y-1">
						{#each creator.newListings as listing}
							<li class="flex items-center justify-between">
								<span class="text-sm">{listing.species}</span>
								<span class="text-xs text-gray-600">${listing.price} by {listing.seller}</span>
								<img src={listing.image} alt={listing.species} class="ml-2 h-10 w-10 rounded" />
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-gray-500">No new listings from followed creators.</p>
	{/if}
</section>
{/if}

<section class="py-6">
	<h2 class="mb-4 text-xl font-bold">Trending Species</h2>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		{#each featuredItems as item}
			<div class="flex flex-col items-center rounded-lg bg-white p-4 shadow">
				<img src={item.image} alt={item.species} class="mb-2 h-40 w-full rounded-md object-cover" />
				<h3 class="text-lg font-semibold">{item.species}</h3>
				<p class="text-sm text-gray-500">{item.title}</p>
			</div>
		{/each}
	</div>
</section>

<section class="py-6">
	<h2 class="mb-4 text-xl font-bold">Recent Listings</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
		{#each recentListings as listing}
			<div class="rounded-lg bg-white p-3 shadow">
				<img
					src={listing.image}
					alt={listing.species}
					class="mb-2 h-32 w-full rounded object-cover"
				/>
				<h3 class="text-md font-semibold">{listing.species}</h3>
				<p class="text-sm text-gray-600">${listing.price}</p>
				<p class="text-xs text-gray-500">Sold by {listing.seller}</p>
			</div>
		{/each}
	</div>
</section>

<section class="py-6">
	<h2 class="mb-4 text-xl font-bold">Explore Storefronts</h2>
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
		{#each storefronts as store}
			<div class="flex flex-col items-center rounded-lg bg-white p-3 shadow">
				<img src={store.logo} alt={store.name} class="mb-2 h-16 w-16 rounded-full" />
				<h4 class="text-center text-sm font-medium">{store.name}</h4>
				<p class="text-xs text-gray-500">{store.location}</p>
			</div>
		{/each}
	</div>
</section>

{#if !page.data.user}
	<section class="py-6">
		<div class="rounded-lg bg-gray-200 p-6 text-center">
			<h3 class="mb-2 text-lg font-bold">Join the ArthropodShop Community</h3>
			<p class="mb-4 text-sm text-gray-700">
				Sign up to start buying, selling, and exploring unique species.
			</p>
			<a
				href="/auth/sign-up"
				class="rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-700">Get Started</a
			>
		</div>
	</section>
{/if}
