<script lang="ts">
    const { data } = $props();

    const cartItems = data.cartItems; // Assuming you have cart items in your data
</script>

<section class="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
    <!-- Cart summary and checkout form go here -->
    <div class="mb-8">
        {#if cartItems && cartItems.length > 0}
            <ul class="divide-y divide-gray-200 mb-4">
                {#each cartItems as cartItem}
                    <li class="py-4 flex items-center justify-between">
                        <div>
                            <p class="font-medium text-gray-900">{cartItem?.listing?.title ?? 'Unknown item'}</p>
                            <p class="text-sm text-gray-500">Qty: {cartItem?.item.quantity ?? 0}</p>
                        </div>
                        <div class="text-gray-700 font-semibold">
                            ${((cartItem?.listing?.priceCents ?? 0) / 100 * (cartItem?.item.quantity ?? 0)).toFixed(2)}
                        </div>
                    </li>
                {/each}
            </ul>
            <div class="flex justify-between items-center font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span>
                    ${cartItems.reduce((sum, cartItem) => sum + ((cartItem?.listing?.priceCents ?? 0) / 100 * (cartItem?.item.quantity ?? 0)), 0).toFixed(2)}
                </span>
            </div>
        {:else}
            <p class="text-gray-600">Your cart is empty.</p>
        {/if}
    </div>
    <div>
        <!-- TODO: Add Stripe payment form or redirect button here -->
        <a
            href={data.stripeUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold inline-block text-center"
            aria-disabled={!(cartItems && cartItems.length > 0)}
            style="pointer-events: {cartItems && cartItems.length > 0 ? 'auto' : 'none'}; opacity: {cartItems && cartItems.length > 0 ? 1 : 0.5};"
        >
            Proceed to Payment (Stripe integration goes here)
        </a>
    </div>
    <!-- TODO: Handle payment success/failure and show appropriate messages -->
</section>
