import { redirect, type Actions } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const actions: Actions = {
    signOut: async (event) => {
        // Invalidate the session
        if (event.locals.session) {
            await auth.invalidateSession(event.locals.session.id);
        }

        // Delete the session token cookie
        auth.deleteSessionTokenCookie(event);

        // Redirect to the home page
        return redirect(302, '/');
    }
};