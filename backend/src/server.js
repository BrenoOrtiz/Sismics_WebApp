require("dotenv").config(); // Ensure environment variables are loaded at the very start
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db"); // Import from db.js
const apiRouter = require("./api"); // Import the router from api.js

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000", 
        credentials: true,
    })
);
app.use(express.json());

// API routes
// All routes defined in api.js will be prefixed with /api
app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;

// Initialize database and then start the server
initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to initialize database and start server:", err);
        process.exit(1); // Exit if database initialization fails
    });
