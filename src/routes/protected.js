// Import Express and authentication middleware
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

// Create router
const router = express.Router();

// Protected endpoint
router.get("/", authenticateToken, (req, res) => {

    res.status(200).json({
        message: "Welcome! You successfully accessed protected information.",
        user: req.user
    });

});

// Export router
module.exports = router;