<script lang="ts">
	const { form, data } = $props();
    const shop = data.shop; // Assuming you have shop info in your data
</script>

<h1 class="text-2xl font-bold mb-6">Create a New Listing for {shop?.name}</h1>
<form class="space-y-6 max-w-md mx-auto bg-white p-8 rounded shadow" action="?/createListing" method="POST">
	{#if form?.error}
		<p class="text-red-500 mb-4">{form.error}</p>
	{/if}
	<div>
		<label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
		<input
			id="title"
			name="title"
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
	<div>
		<label for="speciesName" class="block text-sm font-medium text-gray-700 mb-1">Species Name</label>
		<input
			id="speciesName"
			name="speciesName"
			required
			class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	</div>
	<div>
		<label for="priceCents" class="block text-sm font-medium text-gray-700 mb-1">Price (in cents)</label>
		<input
			id="priceCents"
			name="priceCents"
			type="number"
			min="1"
			required
			class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	</div>
	<div>
		<label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
		<input
			id="quantity"
			name="quantity"
			type="number"
			min="1"
			required
			class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	</div>
	<div>
		<label for="careLevel" class="block text-sm font-medium text-gray-700 mb-1">Care Level</label>
		<input
			id="careLevel"
			name="careLevel"
			required
			class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	</div>
	<div>
		<label for="sex" class="block text-sm font-medium text-gray-700 mb-1">Sex</label>
		<select
			id="sex"
			name="sex"
			required
			class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			<option value="male">Male</option>
			<option value="female">Female</option>
			<option value="unsexed">Unsexed</option>
			<option value="unknown">Unknown</option>
		</select>
	</div>
	<div>
		<label for="imageUrls" class="block text-sm font-medium text-gray-700 mb-1">Image URLs (one per line)</label>
		<textarea
			id="imageUrls"
			name="imageUrls"
			required
			rows="3"
			class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		></textarea>
		<p class="text-xs text-gray-500 mt-1">Paste one image URL per line.</p>
	</div>
	<button
		type="submit"
		class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
	>
		Create Listing
	</button>
</form>
