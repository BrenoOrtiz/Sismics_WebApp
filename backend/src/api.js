const express = require("express");
const router = express.Router();
const { getDb } = require("./db");

router.get("/test", (req, res) => {
    res.json({ message: "Backend is working! (from api.js)" });
});


router.get("/earthquake/data", async (req, res) => {
    const db = getDb();
    if (!db) {
        return res.status(503).json({
            error: "Database unavailable.",
        });
    }
    try {
        const [rows] = await db.execute("SELECT * FROM earthquakes");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching earthquake data:", err);
        res.status(500).json({ error: "Failed to fetch earthquake data" });
    }
});


module.exports = router;
