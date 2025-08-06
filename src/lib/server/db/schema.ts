import * as p from 'drizzle-orm/pg-core';

export const role = p.pgEnum('role', ['user', 'admin', 'moderator']);

export const users = p.pgTable('users', {
	id: p.uuid('id').primaryKey(),
	username: p.text().notNull().unique(),
	email: p.text().notNull().unique(),
	passwordHash: p.text('password_hash').notNull(),
	displayName: p.text('display_name'),
	profileImageUrl: p.text('profile_image_url'),
	location: p.text(),
	about: p.text(),
	role: role().notNull().default('user'),
	slug: p.text().notNull().unique()
});

export const sessions = p.pgTable('sessions', {
	id: p.text('id').primaryKey(),
	userId: p.uuid('user_id').notNull().references(() => users.id),
	expiresAt: p.timestamp('expires_at', { mode: 'date' }).notNull()
});

export const shops = p.pgTable('shops', {
	id: p.uuid('id').primaryKey(),
	ownerId: p.uuid('owner_id').notNull().references(() => users.id),
	name: p.text().notNull(),
	description: p.text().notNull(),
	slug: p.text().notNull().unique(),
});

export const sex = p.pgEnum('sex', ['male', 'female', 'unsexed', 'unknown']);

export const listings = p.pgTable('listings', {
	id: p.uuid('id').primaryKey(),
	shopId: p.uuid('shop_id').notNull().references(() => shops.id),
	title: p.text().notNull(),
	description: p.text().notNull(),
	priceCents: p.integer('price_cents').notNull(),
	createdAt: p.timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
	speciesName: p.text('species_name').notNull(),
	quantity: p.integer().notNull(),
	imageUrls: p.text('image_urls').array().notNull(),
	careLevel: p.text('care_level').notNull(),
	sex: sex().notNull().default('unknown'),
	slug: p.text().notNull().unique()
});

export const carts = p.pgTable('carts', {
	id: p.uuid('id').primaryKey(),
	userId: p.uuid('user_id').notNull().unique().references(() => users.id),
	createdAt: p.timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
});

export const cartItems = p.pgTable('cart_items', {
	id: p.uuid('id').primaryKey(),
	cartId: p.uuid('cart_id').notNull().references(() => carts.id),
	listingId: p.uuid('listing_id').notNull().references(() => listings.id),
	quantity: p.integer().notNull(),
	addedAt: p.timestamp('added_at', { mode: 'date' }).notNull().defaultNow()
});

export type CartItem = typeof cartItems.$inferSelect;

export type Cart = typeof carts.$inferSelect;

export type Listing = typeof listings.$inferSelect;

export type Shop = typeof shops.$inferSelect;

export type Session = typeof sessions.$inferSelect;

export type User = typeof users.$inferSelect;
