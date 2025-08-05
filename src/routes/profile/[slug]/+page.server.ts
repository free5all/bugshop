import type { PageServerLoad } from "./$types";
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    const slug = event.params.slug.toLowerCase();

    const user = await db.select()
        .from(table.users)
        .where(eq(table.users.slug, slug))
        .then(results => results[0]);

    if (!user) {
        return { profileUser: null, error: 'User not found' };
    }

    return { profileUser: user, error: null };
};