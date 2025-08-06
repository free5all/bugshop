import type { RequestHandler } from "./$types";
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, params, locals }) => {
    const user = locals.user; // Assuming user is set in locals from session
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const listingId = params.listingId;

    // Validate listingId
    if (!listingId) {
        return new Response(JSON.stringify({ error: 'Listing ID is required' }), { status: 400 });
    }

    // Does the user already have a cart?
    const existingCart = await db.select()
        .from(table.carts)
        .where(eq(table.carts.userId, user.id))
        .then(results => results[0]);

    let cartId;
    if (existingCart) {
        cartId = existingCart.id;
    }
    else {
        // Create a new cart for the user
        const newCart = await db.insert(table.carts).values({
            id: crypto.randomUUID(),
            userId: user.id,
            createdAt: new Date()
        }).returning().then(results => results[0]);
        cartId = newCart.id;
    }

    // Check if the listing exists
    const listing = await db.select()
        .from(table.listings)
        .where(eq(table.listings.id, listingId))
        .then(results => results[0]);

    if (!listing) {
        return new Response(JSON.stringify({ error: 'Listing not found' }), { status: 404 });
    }
    
    // We don't allow users to add their own listings to their cart
    const shop = await db.select()
        .from(table.shops)
        .where(eq(table.shops.id, listing.shopId))
        .then(results => results[0]);

    if (shop?.ownerId === user.id) {
        return new Response(JSON.stringify({ error: 'Cannot add your own listing to cart' }), { status: 400 });
    }

    // Check if the item is already in the cart
    const existingCartItem = await db.select()
        .from(table.cartItems)
        .where(and(eq(table.cartItems.cartId, cartId), eq(table.cartItems.listingId, listing.id)))
        .then(results => results[0]);

    if (existingCartItem) {
        // Get the current quantity and ensure it doesn't exceed the listing's available quantity
        if (existingCartItem.quantity >= listing.quantity) {
            return new Response(JSON.stringify({ error: 'Cannot add more than available quantity' }), { status: 400 });
        }

        // Update the quantity of the existing item
        const updatedItem = await db.update(table.cartItems)
            .set({ quantity: existingCartItem.quantity + 1 })
            .where(eq(table.cartItems.id, existingCartItem.id))
            .returning()
            .then(results => results[0]);

        return new Response(JSON.stringify({ message: 'Item quantity updated', item: updatedItem }), { status: 200 });
    }

    // Add the item to the cart
    const newCartItem = await db.insert(table.cartItems).values({
        id: crypto.randomUUID(),
        cartId: cartId,
        listingId: listing.id,
        quantity: 1,
        addedAt: new Date()
    }).returning().then(results => results[0]);

    return new Response(JSON.stringify({ message: 'Item added to cart', item: newCartItem }), { status: 201 });
}