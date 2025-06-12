'use client';

import { useState, useEffect } from 'react';

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Alterado para null para estado inicial incerto

    useEffect(() => {
        console.log("[useAuth] useEffect executando. Verificando status de autenticação...");
        const checkAuthStatusInternal = async () => {
            try {
                const storedUserId = sessionStorage.getItem('userId');
                const storedUsername = sessionStorage.getItem('username');
                console.log("[useAuth] Valores do sessionStorage para enviar no body:", { storedUserId, storedUsername });

                const response = await fetch('http://localhost:5000/api/users/authcheck', {
                    method: 'POST',
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ userId: storedUserId, username: storedUsername })
                });
                const data = await response.json();
                console.log("[useAuth] Resposta de POST /api/users/authcheck:", { status: response.status, ok: response.ok, data });

                if (response.ok && data.isAuthenticated) {
                    console.log("[useAuth] Usuário autenticado. Definindo estado e sessionStorage.");
                    setIsAuthenticated(true);
                    // Apenas defina no sessionStorage se os dados vierem da API e forem diferentes
                    // ou se o sessionStorage estiver vazio, para evitar escritas desnecessárias.
                    if (data.userId && sessionStorage.getItem('userId') !== String(data.userId)) {
                        sessionStorage.setItem('userId', String(data.userId));
                    }
                    if (data.username && sessionStorage.getItem('username') !== String(data.username)) {
                        sessionStorage.setItem('username', String(data.username));
                    }
                } else {
                    console.warn("[useAuth] Usuário NÃO autenticado ou resposta não OK via POST. Limpando estado e sessionStorage.");
                    setIsAuthenticated(false);
                    sessionStorage.removeItem('userId');
                    sessionStorage.removeItem('username');
                }
            } catch (err) {
                console.error("[useAuth] Erro CRÍTICO ao verificar autenticação:", err);
                setIsAuthenticated(false);
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('username');
            }
        };

        // Verifica o sessionStorage antes de chamar a API para uma experiência de usuário mais rápida
        // const storedUserId = sessionStorage.getItem('userId'); // This line is now inside checkAuthStatusInternal
        if (sessionStorage.getItem('userId')) { // Check directly
            console.log("[useAuth] userId encontrado no sessionStorage na montagem, considerando autenticado inicialmente:", sessionStorage.getItem('userId'));
            setIsAuthenticated(true); // Otimisticamente define como true
        }

        checkAuthStatusInternal(); // Sempre verifica com o backend para confirmar

    }, []); // Executa uma vez na montagem do componente

    // A lógica de logout (chamada à API, limpeza do sessionStorage)
    // deve ser tratada pelo componente que utiliza este hook.
    // Após realizar o logout, o componente chamaria setIsAuthenticated(false).
    // Exemplo de como um componente faria o logout:
    // const handleLogout = async () => {
    //   try {
    //     await fetch('/api/users/logout', { method: 'POST' });
    //     sessionStorage.removeItem('userId');
    //     sessionStorage.removeItem('username');
    //     setIsAuthenticated(false); // Obtido do useAuth()
    //     // router.push('/auth');
    //   } catch (error) {
    //     console.error('Falha no logout', error);
    //   }
    // };

    return { isAuthenticated, setIsAuthenticated };
}
