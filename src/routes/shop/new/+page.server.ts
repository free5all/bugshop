import { usernameToSlug } from '$lib/server/slug';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    // Ensure the user is authenticated
    if (!event.locals.user || !event.locals.session) {
        return redirect(302, '/auth/sign-in');
    }
}

export const actions: Actions = {
    createShop: async (event) => {
        // Ensure the user is authenticated
        if (!event.locals.user || !event.locals.session) {
            return redirect(302, '/auth/sign-in');
        }

        const formData = await event.request.formData();
        const name = formData.get('name')?.toString().trim();
        const description = formData.get('description')?.toString().trim();

        if (!name || !description) {
            return { error: 'Name and description are required.' };
        }

        const slug = usernameToSlug(name);

        // Check if a shop with the same slug already exists
        const existingShop = await db.select().from(table.shops).where(eq(table.shops.slug, slug)).then(results => results[0]);
        if (existingShop) {
            return { error: 'A shop with this name already exists.' };
        }

        // Create the new shop
        await db.insert(table.shops).values({
            id: crypto.randomUUID(),
            ownerId: event.locals.user.id,
            name,
            description,
            slug
        });

        // Redirect to the new shop page
        return redirect(303, '/shop/' + slug);
    }
};