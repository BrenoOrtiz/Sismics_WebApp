
const express = require("express");
const router = express.Router();
const { getDb } = require("./db"); // Import the getDb function

// Example API endpoint (previously /api/test)
router.get("/test", (req, res) => {
    res.json({ message: "Backend is working! (from api.js)" });
});

// Example endpoint to get data from database (previously /api/data)
router.get("/data", async (req, res) => {
    const db = getDb();
    if (!db) {
        // This case should ideally be prevented by ensuring initializeDatabase completes before requests are handled
        return res
            .status(503)
            .json({
                error: "Database service unavailable. Please try again later.",
            });
    }
    try {
        // Replace 'your_table_name' with your actual table name
        const [rows] = await db.execute("SELECT * FROM your_table_name");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Add more of your API routes here
// e.g., router.post('/users', async (req, res) => { ... });

module.exports = router;
