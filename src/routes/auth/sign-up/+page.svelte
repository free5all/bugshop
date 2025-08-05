<script lang="ts">
    const { form } = $props();
</script>

<div class="my-auto flex flex-col items-center justify-center container">

    {#if form?.error}
        <p class="text-red-500 mb-4">{form.error}</p>
    {/if}

    <div class="p-8 rounded shadow-md w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form action="?/signUp" method="POST" class="space-y-4">
            <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="username">Username</label>
                <input
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="username"
                    name="username"
                    autocomplete="username"
                    required
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="email">Email</label>
                <input
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    id="email"
                    name="email"
                    autocomplete="email"
                    required
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="password">Password</label>
                <input
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    id="password"
                    name="password"
                    autocomplete="new-password"
                    required
                />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="passwordConfirm">Confirm Password</label>
                <input
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    autocomplete="new-password"
                    required
                />
            </div>
            <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Sign Up
            </button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <a href="/auth/sign-in" class="text-blue-600 hover:underline">Sign in</a>
        </p>
    </div>
</div>