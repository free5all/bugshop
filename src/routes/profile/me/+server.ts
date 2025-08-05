import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ request, locals }) => {
    // Ensure the user is authenticated
    if (!locals.user || !locals.session) {
        return redirect(302, '/auth/sign-in');
    }

    const slug = locals.user.slug.toLowerCase();

    return redirect(303, `/profile/${slug}`);
};