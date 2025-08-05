<script lang="ts">
    const { data } = $props();

    const listing = data.listing;
    const shop = data.shop; // Assuming you have shop info in your data
</script>

<div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
    <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
            {#if listing.imageUrls && listing.imageUrls.length > 0}
                <img
                    src={listing.imageUrls[0]}
                    alt={listing.title}
                    class="w-full h-72 object-cover rounded-lg border"
                />
                {#if listing.imageUrls.length > 1}
                    <div class="flex gap-2 mt-2">
                        {#each listing.imageUrls.slice(1) as url}
                            <img src={url} alt="Additional image" class="w-16 h-16 object-cover rounded border" />
                        {/each}
                    </div>
                {/if}
            {:else}
                <div class="w-full h-72 bg-gray-200 flex items-center justify-center rounded-lg">
                    <span class="text-gray-500">No image available</span>
                </div>
            {/if}
        </div>
        <div class="md:w-1/2 flex flex-col justify-between">
            <div>
                <h1 class="text-3xl font-bold mb-2">{listing.title}</h1>
                <p class="text-gray-600 mb-4">{listing.speciesName}</p>
                <p class="text-lg font-semibold text-green-700 mb-2">${(listing.priceCents / 100).toFixed(2)}</p>
                <p class="mb-4">{listing.description}</p>
                <div class="flex flex-wrap gap-4 mb-4">
                    <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">Care: {listing.careLevel}</span>
                    <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm capitalize">Sex: {listing.sex}</span>
                    <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm">Qty: {listing.quantity}</span>
                </div>
                {#if shop}
                    <div class="mb-4">
                        <a
                            href={`/shop/${shop.slug}`}
                            class="text-blue-600 hover:underline font-medium"
                        >
                            View all listings from {shop.name}
                        </a>
                    </div>
                {/if}
            </div>
            <div>
                <button class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
    <div class="mt-6 text-sm text-gray-400">
        Listed on {new Date(listing.createdAt).toLocaleDateString()}
    </div>
</div>