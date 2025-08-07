import { integer, pgTable, primaryKey, text, timestamp, uuid, decimal, varchar, sql } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text("image"),
});

export const accounts = pgTable("account", {
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
}, account => [
    {
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId]
        })
    }
]);

export const sessions = pgTable("session", {
    sessionToken: text("session_token").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verification_token", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
}, verificationToken => [
    {
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token]
        })
    }
]);

export const authenticators = pgTable("authenticator", {
    credentialID: text("credential_id").notNull().unique(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("provider_account_id").notNull(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credential_device_type").notNull(),
    credentialBackedUp: integer("credential_backed_up").notNull(),
    transports: text("transports"),
}, authenticator => [
    {
        compositePk: primaryKey({
            columns: [authenticator.credentialID, authenticator.userId]
        })
    }
]);

// Storefronts table
export const storefronts = pgTable("storefront", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    ownerId: text("owner_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    stripeAccountId: text("stripe_account_id"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().default(sql`NOW()`),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().default(sql`NOW()`),
});

// Many-to-many relationship between users and storefronts
export const userStorefronts = pgTable("user_storefront", {
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    storefrontId: text("storefront_id")
        .notNull()
        .references(() => storefronts.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 50 }).notNull().default("employee"), // owner, manager, employee
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
}, userStorefront => [
    {
        compoundKey: primaryKey({
            columns: [userStorefront.userId, userStorefront.storefrontId]
        })
    }
]);

// Products/Listings table
export const products = pgTable("product", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    storefrontId: text("storefront_id")
        .notNull()
        .references(() => storefronts.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    quantity: integer("quantity").notNull().default(1),
    images: text("images"), // JSON array of image URLs
    status: varchar("status", { length: 50 }).notNull().default("available"), // available, sold, on_hold
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Shopping cart items
export const cartItems = pgTable("cart_item", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    productId: text("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    storefrontId: text("storefront_id")
        .notNull()
        .references(() => storefronts.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// Orders table
export const orders = pgTable("order", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    storefrontId: text("storefront_id")
        .notNull()
        .references(() => storefronts.id, { onDelete: "cascade" }),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, paid, shipped, completed, cancelled
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Order items table
export const orderItems = pgTable("order_item", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    orderId: text("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    productId: text("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Price at time of order
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    storefronts: many(userStorefronts),
    cartItems: many(cartItems),
    orders: many(orders),
}));

export const storefrontsRelations = relations(storefronts, ({ one, many }) => ({
    owner: one(users, {
        fields: [storefronts.ownerId],
        references: [users.id],
    }),
    userStorefronts: many(userStorefronts),
    products: many(products),
    cartItems: many(cartItems),
    orders: many(orders),
}));

export const userStorefrontsRelations = relations(userStorefronts, ({ one }) => ({
    user: one(users, {
        fields: [userStorefronts.userId],
        references: [users.id],
    }),
    storefront: one(storefronts, {
        fields: [userStorefronts.storefrontId],
        references: [storefronts.id],
    }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
    storefront: one(storefronts, {
        fields: [products.storefrontId],
        references: [storefronts.id],
    }),
    cartItems: many(cartItems),
    orderItems: many(orderItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
    user: one(users, {
        fields: [cartItems.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [cartItems.productId],
        references: [products.id],
    }),
    storefront: one(storefronts, {
        fields: [cartItems.storefrontId],
        references: [storefronts.id],
    }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    storefront: one(storefronts, {
        fields: [orders.storefrontId],
        references: [storefronts.id],
    }),
    orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id],
    }),
}));
