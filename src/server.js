// Import required packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./database/db");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

// Initialize Express application
const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Define server port
const PORT = process.env.PORT || 5000;

// Test route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "DontJustTrain backend is running!",
        status: "success"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

