import Database from 'better-sqlite3';

const db = new Database('local.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables for local development
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        display_name TEXT,
        profile_image_url TEXT,
        location TEXT,
        about TEXT,
        role TEXT NOT NULL DEFAULT 'user',
        slug TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        expires_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS shops (
        id TEXT PRIMARY KEY,
        owner_id TEXT NOT NULL REFERENCES users(id),
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS listings (
        id TEXT PRIMARY KEY,
        shop_id TEXT NOT NULL REFERENCES shops(id),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price_cents INTEGER NOT NULL,
        created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
        species_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        image_urls TEXT NOT NULL DEFAULT '[]',
        care_level TEXT NOT NULL,
        sex TEXT NOT NULL DEFAULT 'unknown',
        slug TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS carts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE REFERENCES users(id),
        created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );

    CREATE TABLE IF NOT EXISTS cart_items (
        id TEXT PRIMARY KEY,
        cart_id TEXT NOT NULL REFERENCES carts(id),
        listing_id TEXT NOT NULL REFERENCES listings(id),
        quantity INTEGER NOT NULL,
        added_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
`);

console.log('SQLite database initialized successfully');
db.close();