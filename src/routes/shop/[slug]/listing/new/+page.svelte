<script lang="ts">
    const { data, form } = $props();
    
    const shop = data.shop;
</script>

<div class="max-w-2xl mx-auto p-6">
    <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2">Create New Listing</h1>
        <p class="text-gray-600">Add a new listing to <strong>{shop.name}</strong></p>
    </div>

    <form class="space-y-6 bg-white p-8 rounded-lg shadow-md" action="?/createListing" method="POST">
        {#if form?.error}
            <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {form.error}
            </div>
        {/if}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
                    Listing Title *
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="e.g., Adult Female Tarantula"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label for="speciesName" class="block text-sm font-medium text-gray-700 mb-1">
                    Species Name *
                </label>
                <input
                    id="speciesName"
                    name="speciesName"
                    type="text"
                    required
                    placeholder="e.g., Brachypelma hamorii"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
                    Price (USD) *
                </label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="49.99"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">
                    Quantity Available *
                </label>
                <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    required
                    placeholder="1"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label for="sex" class="block text-sm font-medium text-gray-700 mb-1">
                    Sex *
                </label>
                <select
                    id="sex"
                    name="sex"
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select sex...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unsexed">Unsexed</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>

            <div>
                <label for="careLevel" class="block text-sm font-medium text-gray-700 mb-1">
                    Care Level *
                </label>
                <input
                    id="careLevel"
                    name="careLevel"
                    type="text"
                    required
                    placeholder="e.g., Beginner, Intermediate, Advanced"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div class="md:col-span-2">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    required
                    placeholder="Describe your listing in detail..."
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>
        </div>

        <div class="flex gap-4 pt-4">
            <button
                type="submit"
                class="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition"
            >
                Create Listing
            </button>
            <a
                href="/shop/{shop.slug}"
                class="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-md hover:bg-gray-400 transition text-center"
            >
                Cancel
            </a>
        </div>
    </form>
</div>