"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: number;
    code: string;
    name: string;
    role: string;
    color: string;
}

interface AuthContextType {
    user: User | null;
    login: (code: string, pass: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => false,
    logout: () => { },
    loading: true,
});

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            let savedCode = localStorage.getItem("currentUser");
            if (!savedCode || savedCode === "null" || savedCode === "undefined") {
                savedCode = "BILAL";
                localStorage.setItem("currentUser", "BILAL");
            }

            try {
                const res = await fetch("/api/users");
                if (res.ok) {
                    const users: User[] = await res.json();
                    const loggedIn = users.find((u) => u.code === savedCode);
                    if (loggedIn) {
                        setUser(loggedIn);
                    } else {
                        // If BILAL not found, pick first user
                        if (users.length > 0) {
                            setUser(users[0]);
                            localStorage.setItem("currentUser", users[0].code);
                        }
                    }
                }
            } catch (err) {
                console.error("Auth init error", err);
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (code: string, pass: string) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, password: pass }),
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
                localStorage.setItem("currentUser", data.code);
                return true;
            }
        } catch (e) {
            console.error("Login Error", e);
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
