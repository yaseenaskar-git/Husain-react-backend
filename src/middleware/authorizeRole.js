// Authorization middleware
const authorizeRole = (requiredRole) => {

    return (req, res, next) => {

        // Check user's role
        if (req.user.role !== requiredRole) {
            return res.status(403).json({
                message: "Access forbidden. Insufficient permissions."
            });
        }

        // Allow access
        next();
    };
};

// Export middleware
module.exports = authorizeRole;