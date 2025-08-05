import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import {
    db
} from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
    const { params, fetch } = event;
    const { slug } = params;

    const listing = await db.select()
        .from(table.listings)
        .where(eq(table.listings.slug, slug))
        .then(results => results[0]);

    if (!listing) {
        return error(404, 'Listing not found');
    }

    const shop = await db.select()
        .from(table.shops)
        .where(eq(table.shops.id, listing.shopId))
        .then(results => results[0]);

    if (!shop) {
        return error(404, 'Shop not found');
    }

    return { listing, shop };
}