// Import required packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

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

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});