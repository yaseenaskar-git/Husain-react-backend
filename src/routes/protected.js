// Import Express and authentication middleware
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");
// Create router
const router = express.Router();

// Protected endpoint
router.get("/", authenticateToken, (req, res) => {

    res.status(200).json({
        message: "Welcome! You successfully accessed protected information.",
        user: req.user
    });

});

// Admin-only endpoint
router.get(
    "/admin",
    authenticateToken,
    authorizeRole("admin"),
    (req, res) => {

        res.status(200).json({
            message: "Welcome, administrator!",
            user: req.user
        });

    }
);

// Export router
module.exports = router;