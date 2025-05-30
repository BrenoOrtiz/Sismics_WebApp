
require("dotenv").config();
const mysql = require("mysql2/promise");

let db;

async function initializeDatabase() {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        console.log("Connected to MySQL database");
    } catch (err) {
        console.error("Error connecting to database:", err);
        process.exit(1); 
    }
}

// Function to get the database connection instance
function getDb() {
    if (!db) {
        console.error(
            "Database has not been initialized. Call initializeDatabase first."
        );
        
    }
    return db;
}

module.exports = { initializeDatabase, getDb };
