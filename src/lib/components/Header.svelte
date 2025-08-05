<script lang="ts">
    import { page } from '$app/state';
    import SearchBox from './SearchBox.svelte';

    let active = $state(false);
    let query = $state('');
</script>

<header class="flex items-center justify-between p-4 bg-gray-800 text-white gap-8 sticky">
    <a href="/"><span class="text-lg font-semibold">ArthropodShop</span></a>

    <input type="text" id="searchBox" placeholder="Search species, sellers, users, etc..." bind:value={query} onfocusin={() => {active = true}} onfocusout={() => {active = false}} class="flex-1 z-5 max-w-172 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm text-black" />

    {#if active}
        <SearchBox query={query}/>
    {/if}

    {#if page.data.user}
        <div class="flex items-center gap-4">
            <span class="text-sm">Welcome, {page.data.user.username}!</span>
            <form action="/auth/sign-out?/signOut" method="post">
                <button type="submit" class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
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