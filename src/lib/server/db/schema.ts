import * as p from 'drizzle-orm/pg-core';

export const users = p.pgTable('users', {
	id: p.serial('id').primaryKey(),
	username: p.text().notNull().unique(),
	email: p.text().notNull().unique()
});

export const sessions = p.pgTable('sessions', {
	id: p.text('id').primaryKey(),
	userId: p.integer('user_id').notNull().references(() => users.id),
	expiresAt: p.timestamp('expires_at', { mode: 'date' }).notNull()
});

export type Session = typeof sessions.$inferSelect;

export type User = typeof users.$inferSelect;
