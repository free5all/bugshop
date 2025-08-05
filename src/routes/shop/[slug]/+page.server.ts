import type { PageServerLoad } from "./$types";
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    const slug = event.params.slug.toLowerCase();

    // Fetch the shop data based on the slug
    const shop = await db.select()
        .from(table.shops)
        .where(eq(table.shops.slug, slug))
        .fullJoin(table.users, eq(table.shops.ownerId, table.users.id))
        .then(results => results[0]);

    if (!shop || !shop.shops) {
        return { shop: null, listings: null, error: 'Shop not found' };
    }

    const thisShopsListings = await db.select()
        .from(table.listings)
        .where(eq(table.listings.shopId, shop.shops?.id))
        .then(results => results);

    return { shop, thisShopsListings, error: null };
}