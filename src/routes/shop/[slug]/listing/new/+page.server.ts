import { redirect, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types'; // Adjust the import path as necessary

export const load: PageServerLoad = async (event) => {
    // Ensure the user is authenticated
    if (!event.locals.user || !event.locals.session) {
        throw redirect(302, '/auth/sign-in');
    }

    // Get shop by slug
    const shopSlug = event.params.slug;
    const shop = await db.select().from(table.shops).where(eq(table.shops.slug, shopSlug)).then(r => r[0]);
    if (!shop) {
        throw redirect(302, '/my-shops');
    }
    // Only allow shop owner to create listings
    if (shop.ownerId !== event.locals.user.id) {
        throw redirect(302, '/shop/' + shopSlug);
    }
    return { shop };
};

export const actions: Actions = {
    createListing: async (event) => {
        if (!event.locals.user || !event.locals.session) {
            throw redirect(302, '/auth/sign-in');
        }
        const shopSlug = event.params.slug;
        const shop = await db.select().from(table.shops).where(eq(table.shops.slug, shopSlug)).then(r => r[0]);
        if (!shop) {
            throw redirect(302, '/my-shops');
        }
        if (shop.ownerId !== event.locals.user.id) {
            throw redirect(302, '/shop/' + shopSlug);
        }
        const formData = await event.request.formData();
        const title = formData.get('title')?.toString().trim();
        const description = formData.get('description')?.toString().trim();
        const priceCents = parseInt(formData.get('priceCents')?.toString() || '0', 10);
        const speciesName = formData.get('speciesName')?.toString().trim();
        const quantity = parseInt(formData.get('quantity')?.toString() || '0', 10);
        const careLevel = formData.get('careLevel')?.toString().trim();
        const sexRaw = formData.get('sex')?.toString().trim();
        const validSexes = ['male', 'female', 'unsexed', 'unknown'] as const;
        const sex = validSexes.includes(sexRaw as any) ? sexRaw as typeof validSexes[number] : undefined;
        const imageUrls = formData.getAll('imageUrls').map(v => v.toString().trim()).filter(Boolean);
        if (!title || !description || !speciesName || !careLevel || !sex || !imageUrls.length || !priceCents || !quantity) {
            return fail(400, { error: 'All fields are required.' });
        }
        // Generate slug for listing
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        // Check for existing listing with same slug in this shop
        const existing = await db.select().from(table.listings).where(eq(table.listings.slug, slug)).then(r => r[0]);
        if (existing) {
            return fail(400, { error: 'A listing with this title already exists.' });
        }
        await db.insert(table.listings).values({
            id: crypto.randomUUID(),
            shopId: shop.id,
            title,
            description,
            priceCents,
            speciesName,
            quantity,
            careLevel,
            sex,
            imageUrls,
            slug
        });

        throw redirect(303, `/shop/${shopSlug}/listing/${slug}`);
    }
};
