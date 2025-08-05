import type { Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';
import type { User } from '$lib/server/db/schema';
import { verify } from '@node-rs/argon2';
import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
    signIn: async (e) => {
        const formData = await e.request.formData();
        const identifier = formData.get('identifier');
        const password = formData.get('password');

        if (!identifier || typeof identifier !== 'string' || identifier.length < 3 || identifier.length > 255) {
            return { error: 'Invalid identifier' };
        }

        if (!password || typeof password !== 'string' || password.length < 6 || password.length > 255) {
            return { error: 'Invalid password' };
        }
        
        let existingUser: User | undefined;

        const resultsForEmail = await db.select().from(table.users).where(
            eq(table.users.email, identifier.toLowerCase())
        );

        if (resultsForEmail.length > 0) {
            existingUser = resultsForEmail[0];
        } else {
            const resultsForUsername = await db.select().from(table.users).where(
                eq(table.users.username, identifier)
            );
            if (resultsForUsername.length > 0) {
                existingUser = resultsForUsername[0];
            }
        }

        if (!existingUser) {
            return { error: 'Incorrect identifier or password' };
        }

        const validPassword = await verify(existingUser.passwordHash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        if (!validPassword) {
            return { error: 'Incorrect identifier or password' };
        }

        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, existingUser.id);
        auth.setSessionTokenCookie(e, sessionToken, session.expiresAt);

        return redirect(302, '/');
    }
}