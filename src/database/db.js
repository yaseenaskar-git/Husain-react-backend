const Database = require("better-sqlite3");
const path = require("path");

// Create or connect to the database
const db = new Database(
    path.join(__dirname, "users.db")
);

// Create users table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
    );
`);

module.exports = db;