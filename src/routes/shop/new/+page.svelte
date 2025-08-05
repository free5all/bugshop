<script lang="ts">
    const { form } = $props();
</script>

<h1 class="text-2xl font-bold mb-6">Create a New Shop</h1>
<form class="space-y-6 max-w-md mx-auto bg-white p-8 rounded shadow" action="?/createShop" method="POST">
    {#if form?.error}
        <p class="text-red-500 mb-4">{form.error}</p>
    {/if}
    <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
        <input
            id="name"
            name="name"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
    <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
            id="description"
            name="description"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
    </div>
    <button
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
    >
        Create Shop
    </button>
</form>
