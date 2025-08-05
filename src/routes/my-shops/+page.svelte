<script lang="ts">
    const { data } = $props();

    const shops = data.shops;
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">My Shops</h1>
    {#if shops && shops.length > 0}
        <ul class="space-y-4">
            {#each shops as shop}
                <li class="p-4 bg-white rounded shadow hover:shadow-lg transition">
                    <a href={`/shop/${shop.slug}`} class="text-blue-600 hover:underline">
                        {shop.name}
                    </a>
                    <p class="text-gray-600">{shop.description}</p>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-gray-500">You have no shops yet. <a href="/shop/create" class="text-blue-600 hover:underline">Create one now!</a></p>
    {/if}
</div>