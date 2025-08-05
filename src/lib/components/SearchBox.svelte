<script lang="ts">
    const { query } = $props();

    let results = $state<any[]>([]);

    import { onDestroy } from 'svelte';

    let timeout: ReturnType<typeof setTimeout> | null = null;
    let abortController: AbortController | null = null;

    $effect(() => {
        if (query !== undefined) {
        if (timeout) clearTimeout(timeout);
        if (abortController) abortController.abort();

        timeout = setTimeout(async () => {
            abortController = new AbortController();
            try {
                const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}`, {
                    signal: abortController.signal
                });
                if (res.ok) {
                    results = await res.json();
                } else {
                    results = [];
                }
            } catch {
                results = [];
            }
        }, 500);
    }})

    onDestroy(() => {
        if (timeout) clearTimeout(timeout);
        if (abortController) abortController.abort();
    });
</script>

<div class="fixed inset-0 z-4 bg-black/30 flex items-start justify-center">
    <div class="mt-32 bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {#if results.length > 0}
            <ul class="divide-y divide-gray-200">
                {#each results as result}
                    <li class="py-2 px-2 hover:bg-blue-50 cursor-pointer text-gray-800">
                        <strong>{result}</strong>
                    </li>
                {/each}
            </ul>
        {:else}
            <div class="text-gray-400 text-center py-4">No results found.</div>
        {/if}
    </div>
</div>