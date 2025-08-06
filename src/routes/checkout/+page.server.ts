import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { inArray } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import Stripe from 'stripe';

import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const load: PageServerLoad = async (event) => {
    const cartItems = event.locals.cartItems || [];

    // Fetch all listingIds from cartItems
    const listingIds = cartItems.map(({ item }) => item.listingId);

    // Fetch listings from the database using drizzle-orm
    const listings = listingIds.length
        ? await db.select().from(table.listings).where(inArray(table.listings.id, listingIds))
        : [];

    // Map listings by id for quick lookup
    const listingsById = Object.fromEntries(listings.map(l => [l.id, l]));

    // Attach listing to each cart item
    const cartItemsWithListing = cartItems.map(({ item }) => ({
        ...item,
        listing: listingsById[item.listingId] || null
    }));

    // If no cart items, return early
    if (cartItemsWithListing.length === 0) {
        return {
            cartItemsNew: [],
            stripeUrl: null
        };
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cartItemsWithListing.map(cartItem => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: cartItem.listing?.title || 'Unknown Item',
                    description: cartItem.listing?.description || 'No description available',
                },
                unit_amount: cartItem.listing?.priceCents || 0,
            },
            quantity: cartItem.quantity || 1,
        })),
        mode: 'payment',
        success_url: `${event.url.origin}/checkout/success`,
        cancel_url: `${event.url.origin}/checkout/cancel`,
    });

    return {
        cartItemsNew: cartItemsWithListing,
        stripeUrl: session.url,
    };
};
