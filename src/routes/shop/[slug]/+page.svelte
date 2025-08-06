<script lang="ts">
    const { data } = $props();
</script>

{#if data.shop}
    <section class="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
        <div class="flex justify-between items-start mb-4">
            <h1 class="text-3xl font-bold text-gray-800">{data.shop.shops?.name ?? 'Shop'}</h1>
            {#if data.isOwner}
                <a
                    href="/shop/{data.shop.shops?.slug}/listing/new"
                    class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Create New Listing
                </a>
            {/if}
        </div>
        {#if data.shop.shops?.description}
            <p class="mb-6 text-gray-600">{data.shop.shops.description}</p>
        {/if}
        {#if data.shop.users}
            <div class="owner bg-gray-50 rounded-lg p-6 flex items-center gap-6">
                <div>
                    <h2 class="text-xl font-semibold mb-2 text-gray-700">Owner</h2>
                    <p class="flex items-center gap-4">
                        <strong class="text-lg text-gray-800">{data.shop.users.displayName ?? data.shop.users.username}</strong>
                        {#if data.shop.users.profileImageUrl}
                            <img src="{data.shop.users.profileImageUrl}" alt="Profile" class="rounded-full border border-gray-300" width="64" height="64" />
                        {/if}
                    </p>
                    {#if data.shop.users.location}
                        <p class="mt-2 text-gray-500">Location: {data.shop.users.location}</p>
                    {/if}
                    {#if data.shop.users.about}
                        <p class="mt-2 text-gray-500">About: {data.shop.users.about}</p>
                    {/if}
                </div>
            </div>
        {/if}

        {#if data.thisShopsListings && data.thisShopsListings.length > 0}
            <div class="mt-8">
                <h2 class="text-2xl font-semibold mb-4">Listings</h2>
                <ul class="space-y-4">
                    {#each data.thisShopsListings as listing}
                        <li class="p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                            <a href={`${data.shop.shops?.slug}/listing/${listing.slug}`} class="block hover:underline">
                                <h3 class="text-lg font-bold text-gray-800">{listing.title}</h3>
                                <p class="text-gray-600">{listing.description}</p>
                                <p class="mt-2 text-gray-700">Price: ${(listing.priceCents/100).toFixed(2)}</p>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        {:else}
            <p class="mt-6 text-gray-500">No listings available in this shop.</p>
        {/if}

    </section>
{:else}
    <p class="text-center text-gray-500 mt-10">Shop not found.</p>
{/if}