import Database from 'better-sqlite3';

const db = new Database('local.db');

// Enable foreign keys
db.pragma('foreign_keys = OFF');

// Create test user if not exists
const userId = 'test-user-123';
const shopId = 'test-shop-123';

try {
    // Insert test user
    db.prepare(`
        INSERT OR IGNORE INTO users (id, username, email, password_hash, role, slug)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, 'testuser123', 'test@example.com', 'hashedpassword', 'user', 'testuser123');

    // Insert test shop
    db.prepare(`
        INSERT OR IGNORE INTO shops (id, owner_id, name, description, slug)
        VALUES (?, ?, ?, ?, ?)
    `).run(shopId, userId, 'Test Arthropod Shop', 'A test shop for selling various arthropods including spiders, beetles, and other fascinating creatures', 'test-arthropod-shop');

    console.log('Test data created successfully');
} catch (error) {
    console.error('Error creating test data:', error);
}

db.close();