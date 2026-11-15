// Import required packages
const bcrypt = require("bcrypt");
const db = require("./db");
require("dotenv").config();

// Retrieve test user credentials
const email = process.env.SEED_EMAIL;
const password = process.env.SEED_PASSWORD;

// Validate environment variables
if (!email || !password) {
    console.error("Missing test user credentials in .env");
    process.exit(1);
}

// Check whether user already exists
const existingUser = db.prepare(
    "SELECT id FROM users WHERE email = ?"
).get(email);

if (existingUser) {
    console.log("Test user already exists.");
    process.exit(0);
}

// Hash password
const passwordHash = bcrypt.hashSync(password, 12);

// Insert new user
const insertUser = db.prepare(`
    INSERT INTO users (email, password_hash, role)
    VALUES (?, ?, ?)
`);

insertUser.run(email, passwordHash, "user");

console.log("Test user created successfully!");