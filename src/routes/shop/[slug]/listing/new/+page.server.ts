import { usernameToSlug } from '$lib/server/slug';
import type { Actions, PageServerLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    // Ensure the user is authenticated
    if (!event.locals.user || !event.locals.session) {
        return redirect(302, '/auth/sign-in');
    }

    const { params } = event;
    const { slug } = params;

    // Get the shop by slug
    const shop = await db.select()
        .from(table.shops)
        .where(eq(table.shops.slug, slug))
        .then(results => results[0]);

    if (!shop) {
        return error(404, 'Shop not found');
    }

    // Check if the user owns this shop
    if (shop.ownerId !== event.locals.user.id) {
        return error(403, 'You do not have permission to create listings for this shop');
    }

    return { shop };
};

export const actions: Actions = {
    createListing: async (event) => {
        // Ensure the user is authenticated
        if (!event.locals.user || !event.locals.session) {
            return redirect(302, '/auth/sign-in');
        }

        const { params } = event;
        const { slug } = params;

        // Get the shop by slug
        const shop = await db.select()
            .from(table.shops)
            .where(eq(table.shops.slug, slug))
            .then(results => results[0]);

        if (!shop) {
            return error(404, 'Shop not found');
        }

        // Check if the user owns this shop
        if (shop.ownerId !== event.locals.user.id) {
            return error(403, 'You do not have permission to create listings for this shop');
        }

        const formData = await event.request.formData();
        const title = formData.get('title')?.toString().trim();
        const description = formData.get('description')?.toString().trim();
        const price = formData.get('price')?.toString().trim();
        const speciesName = formData.get('speciesName')?.toString().trim();
        const quantity = formData.get('quantity')?.toString().trim();
        const careLevel = formData.get('careLevel')?.toString().trim();
        const sex = formData.get('sex')?.toString().trim();

        // Validate required fields
        if (!title || !description || !price || !speciesName || !quantity || !careLevel || !sex) {
            return { error: 'All fields are required.' };
        }

        // Validate price is a valid number
        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber) || priceNumber < 0) {
            return { error: 'Price must be a valid positive number.' };
        }

        // Convert price to cents
        const priceCents = Math.round(priceNumber * 100);

        // Validate quantity is a valid positive integer
        const quantityNumber = parseInt(quantity);
        if (isNaN(quantityNumber) || quantityNumber < 1) {
            return { error: 'Quantity must be a positive integer.' };
        }

        // Validate sex enum
        const validSexValues = ['male', 'female', 'unsexed', 'unknown'];
        if (!validSexValues.includes(sex)) {
            return { error: 'Invalid sex value.' };
        }

        // Generate unique slug for the listing
        const listingSlug = usernameToSlug(title);

        // Check if a listing with the same slug already exists
        const existingListing = await db.select()
            .from(table.listings)
            .where(eq(table.listings.slug, listingSlug))
            .then(results => results[0]);

        if (existingListing) {
            return { error: 'A listing with this title already exists. Please choose a different title.' };
        }

        // Create the new listing
        const newListing = await db.insert(table.listings).values({
            id: crypto.randomUUID(),
            shopId: shop.id,
            title,
            description,
            priceCents,
            speciesName,
            quantity: quantityNumber,
            careLevel,
            sex: sex as 'male' | 'female' | 'unsexed' | 'unknown',
            imageUrls: JSON.stringify([]), // Store as JSON string for SQLite
            slug: listingSlug
        }).returning().then(results => results[0]);

        // Redirect to the new listing page
        return redirect(303, `/shop/${shop.slug}/listing/${newListing.slug}`);
    }
};