const express = require("express");
const router = express.Router();
const { getDb } = require("./db");
const bcrypt = require("bcrypt");
const session = require("express-session");

router.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

router.get("/test", (req, res) => {
    res.json({ message: "Backend is working! (from api.js)" });
});

// Endpoint para criar um novo usuário
router.post("/users/create", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Username and password are required" });
    }

    const db = getDb();
    if (!db) {
        return res.status(503).json({ error: "Database unavailable." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );
        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId,
        });
    } catch (err) {
        console.error("Error creating user:", err);
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Username already exists" });
        }
        res.status(500).json({ error: "Failed to create user" });
    }
});

// Endpoint para autenticar um usuário
router.post("/users/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Username e Senha são obrigatórios" });
    }

    const db = getDb();
    if (!db) {
        return res.status(503).json({ error: "Database unavailable." });
    }

    try {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        if (rows.length === 0) {
            return res
                .status(401)
                .json({ error: "Username ou Senha inválidos" });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ error: "Username ou Senha inválidos" });
        }

        req.session.userId = user.id;
        req.session.username = user.username;
        res.json({
            message: "Login efetuado com sucesso",
            userId: user.id,
            username: user.username,
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Falha ao efetuar login" });
    }
});

// Endpoint para verificar se um usuário está autenticado
router.post("/users/authcheck", (req, res) => {
    const { userId, username } = req.body;

    console.log(
        "[API /authcheck] Verificando autenticação SOMENTE via req.body:",
        { userId, username }
    );

    if (userId) {
        console.log(
            "[API /authcheck] userId encontrado no body."
        );
        res.json({
            isAuthenticated: true,
            userId: userId,
            username: username || null, 
        });
    } else {
        console.log("[API /authcheck] Não autenticado (sem userId no body).");
        res.json({ isAuthenticated: false });
    }
});

// Endpoint para logout
router.post("/users/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to logout" });
        }
        res.clearCookie("connect.sid"); // 'connect.sid' é o nome padrão do cookie da sessão
        res.json({ message: "Logout successful" });
    });
});

module.exports = router;
