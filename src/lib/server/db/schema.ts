import * as p from 'drizzle-orm/sqlite-core';

export const users = p.sqliteTable('users', {
	id: p.text('id').primaryKey(),
	username: p.text().notNull().unique(),
	email: p.text().notNull().unique(),
	passwordHash: p.text('password_hash').notNull(),
	displayName: p.text('display_name'),
	profileImageUrl: p.text('profile_image_url'),
	location: p.text(),
	about: p.text(),
	role: p.text().notNull().default('user'),
	slug: p.text().notNull().unique()
});

export const sessions = p.sqliteTable('sessions', {
	id: p.text('id').primaryKey(),
	userId: p.text('user_id').notNull().references(() => users.id),
	expiresAt: p.integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const shops = p.sqliteTable('shops', {
	id: p.text('id').primaryKey(),
	ownerId: p.text('owner_id').notNull().references(() => users.id),
	name: p.text().notNull(),
	description: p.text().notNull(),
	slug: p.text().notNull().unique(),
});

export const listings = p.sqliteTable('listings', {
	id: p.text('id').primaryKey(),
	shopId: p.text('shop_id').notNull().references(() => shops.id),
	title: p.text().notNull(),
	description: p.text().notNull(),
	priceCents: p.integer('price_cents').notNull(),
	createdAt: p.integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
	speciesName: p.text('species_name').notNull(),
	quantity: p.integer().notNull(),
	imageUrls: p.text('image_urls').notNull().default('[]'),
	careLevel: p.text('care_level').notNull(),
	sex: p.text().notNull().default('unknown'),
	slug: p.text().notNull().unique()
});

export const carts = p.sqliteTable('carts', {
	id: p.text('id').primaryKey(),
	userId: p.text('user_id').notNull().unique().references(() => users.id),
	createdAt: p.integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

export const cartItems = p.sqliteTable('cart_items', {
	id: p.text('id').primaryKey(),
	cartId: p.text('cart_id').notNull().references(() => carts.id),
	listingId: p.text('listing_id').notNull().references(() => listings.id),
	quantity: p.integer().notNull(),
	addedAt: p.integer('added_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

export type CartItem = typeof cartItems.$inferSelect;

export type Cart = typeof carts.$inferSelect;

export type Listing = typeof listings.$inferSelect;

export type Shop = typeof shops.$inferSelect;

export type Session = typeof sessions.$inferSelect;

export type User = typeof users.$inferSelect;
