<script lang="ts">
    import type { PageProps } from "./$types"

    const { data, params }: PageProps = $props();
    
    params.slug = params.slug.toLowerCase();

    const profileUser = data.profileUser;

</script>

{#if profileUser}
    <section class="max-w-xl mx-auto my-8 p-8 rounded-xl bg-white shadow-md">
        <div class="flex items-center gap-6">
            {#if profileUser.profileImageUrl}
                <img src={profileUser.profileImageUrl} alt="Profile image of {profileUser.displayName || profileUser.username}" class="w-24 h-24 rounded-full object-cover bg-gray-200" />
            {:else}
                <div class="w-24 h-24 rounded-full flex items-center justify-center bg-gray-300"></div>
            {/if}
            <div>
                <h1 class="text-3xl font-bold m-0">{profileUser.displayName || profileUser.username}</h1>
                <p class="text-gray-500 mt-1 mb-0">@{profileUser.username}</p>
                {#if profileUser.location}
                    <p class="text-gray-700 text-base">{profileUser.location}</p>
                {/if}
            </div>
        </div>
        {#if profileUser.about}
            <div class="mt-8">
                <h2 class="mb-2 text-xl font-semibold">About</h2>
                <p class="text-gray-800">{profileUser.about}</p>
            </div>
        {/if}
        <div class="mt-6 text-gray-600 text-sm">
            <span>Role: {profileUser.role}</span>
        </div>
    </section>
{:else}
    <p>User not found.</p>
{/if}
