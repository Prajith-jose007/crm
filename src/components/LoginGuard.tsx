"use client";

import React, { useState } from "react";
import { useAuth } from "./AuthProvider";

export default function LoginGuard({ children }: { children: React.ReactNode }) {
    const { user, loading, login } = useAuth();
    const [code, setCode] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (user) {
        return <>{children}</>;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        const success = await login(code.toUpperCase(), pass);
        if (!success) {
            setError(true);
        }
    };

    return (
        <div style={{ backgroundColor: "#1e1e1e", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "sans-serif" }}>
            <div style={{ width: 360, background: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", color: "#333" }}>
                <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eee", paddingBottom: "12px" }}>Sign in to FleetSell CRM</h3>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", color: "#666", marginBottom: "6px" }}>User Code (e.g. AJWA)</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="AJWA"
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", textTransform: "uppercase", boxSizing: "border-box" }}
                        />
                    </div>
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", fontSize: "13px", color: "#666", marginBottom: "6px" }}>Password</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Password"
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }}
                        />
                    </div>
                    <button type="submit" style={{ width: "100%", padding: "12px", background: "#3A6EA5", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "600", cursor: "pointer", fontSize: "14px" }}>
                        Log In
                    </button>
                    {error && <p style={{ color: "#d9534f", fontSize: "13px", textAlign: "center", marginTop: "12px" }}>Invalid login credentials</p>}
                </form>
            </div>
        </div>
    );
}
