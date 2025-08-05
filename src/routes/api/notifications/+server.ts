import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, locals }) => {
    // Ensure the user is authenticated
    if (!locals.user || !locals.session) {
        return new Response(JSON.stringify({ user: null, session: null }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response(JSON.stringify([]), {
        headers: { "Content-Type": "application/json" }
    });
};