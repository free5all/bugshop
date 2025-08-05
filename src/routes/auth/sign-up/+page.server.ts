import type { Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';
import type { User } from '$lib/server/db/schema';
import { verify } from '@node-rs/argon2';
import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';

export const actions: Actions = {
    signUp: async (e) => {
        const formData = await e.request.formData();
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');

        if (!email || typeof email !== 'string' || email.length < 3 || email.length > 255) {
            return { error: 'Invalid email' };
        }
        if (!username || typeof username !== 'string' || username.length < 3 || username.length > 31) {
            return { error: 'Invalid username' };
        }
        if (!password || typeof password !== 'string' || password.length < 6 || password.length > 255) {
            return { error: 'Invalid password' };
        }
        if (password !== passwordConfirm) {
            return { error: 'Passwords do not match' };
        }
        
        let existingUser: User | undefined;

        const resultsForEmail = await db.select().from(table.users).where(
            eq(table.users.email, email.toLowerCase())
        );

        if (resultsForEmail.length > 0) {
            existingUser = resultsForEmail[0];
        } else {
            const resultsForUsername = await db.select().from(table.users).where(
                eq(table.users.username, username.toLowerCase())
            );
            if (resultsForUsername.length > 0) {
                existingUser = resultsForUsername[0];
            }
        }

        if (existingUser) {
            return { error: 'User already exists with this email or username' };
        }

        const userId = generateUserId();
        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        try {
            await db.insert(table.users).values({
                id: userId,
                email: email.toLowerCase(),
                username: username.toLowerCase(),
                passwordHash: passwordHash
            });

            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, userId);
            auth.setSessionTokenCookie(e, sessionToken, session.expiresAt);
        } catch (error) {
            console.error('Error creating user:', error);
            return { error: 'Failed to create user' };
        }

        return redirect(302, '/');
    }
}

function generateUserId() {
	// Generate a UUID v4 using the Web Crypto API
	const bytes = crypto.getRandomValues(new Uint8Array(16));
	// Per RFC 4122 section 4.4
	bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
	bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

	const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
	return (
		hex.slice(0, 8) + '-' +
		hex.slice(8, 12) + '-' +
		hex.slice(12, 16) + '-' +
		hex.slice(16, 20) + '-' +
		hex.slice(20)
	);
}
