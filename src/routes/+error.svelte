<script lang="ts">
    import { page } from '$app/state';
</script>

<div class="flex flex-col items-center justify-center flex-1">
    <h1 class="text-2xl font-bold text-red-600 mb-4">Error {page.status}</h1>
    <p class="text-gray-700">{page.error?.message || 'An unexpected error occurred.'}</p>

    <span class="mt-4 text-sm text-gray-500 itelic">
        TODO: Insert overturned_feigning_death_beetle.jpg here
    </span>
</div>
