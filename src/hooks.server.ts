import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { sequence } from '@sveltejs/kit/hooks';

const lowercaseUrl: Handle = async ({ event, resolve }) => {
	const lowercase = event.url.pathname.toLowerCase();
	if (lowercase !== event.url.pathname) {
		return Response.redirect(new URL(lowercase, event.url), 301);
	}
	return resolve(event);
};

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user, shops, cart, cartItems } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.shops = shops;
	event.locals.cart = cart;
	event.locals.cartItems = cartItems;
	event.locals.session = session;
	return resolve(event);
};

export const handle: Handle = sequence(lowercaseUrl, handleAuth);
