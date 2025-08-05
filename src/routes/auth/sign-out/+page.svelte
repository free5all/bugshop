<script lang="ts">
    const { form } = $props();
</script>

<div class="my-auto flex flex-col items-center justify-center container">

    <div class="p-8 rounded shadow-md w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-6 text-center">Sign Out</h2>
        <form action="?/signOut" method="POST" class="space-y-4">
            <p>Are you sure you want to sign out?</p>
            <button
                type="submit"
                class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
                Sign Out
            </button>
            <a href="/" class="w-full text-center text-blue-600 hover:underline">
                Cancel
            </a>
        </form>
    </div>
</div>