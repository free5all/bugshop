import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, locals }) => {
    // Ensure the user is authenticated
    if (!locals.user || !locals.session) {
        return new Response(JSON.stringify({ user: null, session: null }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    const url = new URL(request.url);
    const q = url.searchParams.get("q") ?? "";

    // If the query is empty, return an empty response
    if (!q) {
        return new Response(JSON.stringify([]), {
            headers: { "Content-Type": "application/json" }
        });
    }

    // Perform the autocomplete logic here
    // For example, you might query a database or an external API
    // For demonstration, we'll return a static list of suggestions of various species of insects
    // In a real application, you would replace this with actual data fetching logic
    const suggestions = [
        "Ant",
        "Beetle",
        "Butterfly",
        "Cockroach",
        "Dragonfly",
        "Grasshopper",
        "Ladybug",
        "Moth",
        "Praying Mantis",
        "Termite"
    ].filter((item) => item.toLowerCase().includes(q.toLowerCase()));

    return new Response(JSON.stringify(suggestions), {
        headers: { "Content-Type": "application/json" }
    });
};