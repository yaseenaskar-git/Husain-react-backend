// Import JWT package
const jwt = require("jsonwebtoken");

// Authentication middleware
const authenticateToken = (req, res, next) => {

    // Retrieve authorization header
    const authHeader = req.headers["authorization"];

    // Extract token
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            message: "Access denied. Authentication required."
        });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        // Reject invalid or expired tokens
        if (err) {
            return res.status(401).json({
                message: "Invalid or expired token."
            });
        }

        // Attach authenticated user to request
        req.user = user;

        // Continue to requested endpoint
        next();
    });
};

// Export middleware
module.exports = authenticateToken;