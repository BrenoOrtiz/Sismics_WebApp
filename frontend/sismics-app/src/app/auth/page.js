"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";
import NavBar from "@/components/nav";

export default function AuthPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleModeToggle = () => {
        setIsLoginMode(!isLoginMode);
        setError("");
        setUsername("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Usuário e senha são obrigatórios.");
            return;
        }

        if (!isLoginMode && password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setLoading(true);

        const endpoint = isLoginMode ? "/users/login" : "/users/create";
        const apiUrl = `http://localhost:5000/api${endpoint}`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                        `Erro ao ${isLoginMode ? "logar" : "registrar"}.`
                );
            } else {
                if (isLoginMode) {
                   
                    sessionStorage.setItem("userId", data.userId);
                    sessionStorage.setItem("username", data.username);
                    router.push("/"); // Redireciona para a página inicial após login
                } else {
                    setError("Usuário registrado com sucesso! Faça o login.");
                    setIsLoginMode(true);
                    setUsername("");
                    setPassword("");
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Falha na comunicação com o servidor. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <NavBar />
            <div className={styles.authForm}>
                <h2>{isLoginMode ? "Login" : "Registrar"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading
                            ? "Carregando..."
                            : isLoginMode
                            ? "Entrar"
                            : "Criar Conta"}
                    </button>
                </form>
                <p className={styles.toggleMode}>
                    {isLoginMode ? "Não tem uma conta?" : "Já tem uma conta?"}
                    <button
                        type="button"
                        onClick={handleModeToggle}
                        disabled={loading}
                        className={styles.toggleButton}
                    >
                        {isLoginMode ? "Registre-se" : "Faça Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
