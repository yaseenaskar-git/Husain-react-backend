// Import required packages
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

// Create router
const router = express.Router();

// Login endpoint
router.post("/login", async (req, res) => {
    try {
        // Retrieve credentials
        const { email, password } = req.body;

        // Validate missing information
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        // Find user in database
        const user = db.prepare(
            "SELECT * FROM users WHERE email = ?"
        ).get(email);

        // Check whether user exists
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Compare submitted password with stored hash
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        // Reject incorrect password
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send successful response
        res.status(200).json({
            message: "Login successful!",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Internal server error."
        });
    }
});

// Export router
module.exports = router;