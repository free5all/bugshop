<script lang="ts">
    const { listingId }: { listingId: string } = $props();

    let disabled = $state(false);

    function onclick(e: MouseEvent) {
        e.preventDefault();
        disabled = true;

        fetch(`/api/cart/add/${listingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                disabled = false;
                throw new Error('Failed to add item to cart');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message || data.error);
            disabled = false;
        });
    }
</script>

<button
    class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
    {onclick}
    {disabled}
>
    Add to Cart
</button>