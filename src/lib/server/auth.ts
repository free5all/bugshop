import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(table.sessions).values(session);
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [result] = await db
		.select({
			user: { id: table.users.id, username: table.users.username, slug: table.users.slug },
			session: table.sessions,
			cart: table.carts
		})
		.from(table.sessions)
		.innerJoin(table.users, eq(table.sessions.userId, table.users.id))
		.leftJoin(table.carts, eq(table.carts.userId, table.users.id))
		.where(eq(table.sessions.id, sessionId));

	let shops = null;
	let cartItems = null;
	if (result) {
		shops = await db
			.select()
			.from(table.shops)
			.where(eq(table.shops.ownerId, result.user.id));

		if (result.cart) {
		cartItems = await db
			.select({
				item: table.cartItems,
				listing: table.listings
			})
			.from(table.cartItems)
			.where(eq(table.cartItems.cartId, result.cart.id))
			.leftJoin(table.listings, eq(table.cartItems.listingId, table.listings.id));
		}
	}

	if (!result) {
		return { session: null, user: null, shops: null, cart: null, cartItems: null };
	}
	const { session, user, cart } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.sessions).where(eq(table.sessions.id, session.id));
		return { session: null, user: null, shops: null, cart: null, cartItems: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.sessions)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.sessions.id, session.id));
	}

	return { session, user, shops, cart, cartItems };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.sessions).where(eq(table.sessions.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}
