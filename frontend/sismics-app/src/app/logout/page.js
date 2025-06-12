"use client";

export default function LogoutPage() {

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('username');
                window.location.href = '/'; // Redireciona para a página inicial após logout
            } else {
                console.error("Erro ao fazer logout:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };
    handleLogout()

    return (
        <div className="logoutContainer">
            
        </div>
    );
 }