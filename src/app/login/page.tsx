"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [code, setCode] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        const success = await login(code.toUpperCase(), pass);
        if (success) {
            router.push("/");
        } else {
            setError(true);
        }
        setLoading(false);
    };

    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", height: "100vh", backgroundColor: "#0f172a",
            color: "#fff", fontFamily: "sans-serif"
        }}>
            <form onSubmit={handleLogin} style={{
                background: "#1e293b", padding: "40px", borderRadius: "8px",
                display: "flex", flexDirection: "column", gap: "20px", width: "400px"
            }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>SITRIX CRM LOGIN</h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label>User Code</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="ENTER CODE"
                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="PASSWORD"
                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }}
                    />
                </div>

                <button type="submit" disabled={loading} style={{
                    padding: "12px", background: "#3A6EA5", color: "#fff",
                    border: "none", borderRadius: "4px", cursor: "pointer"
                }}>
                    {loading ? "CHECKING..." : "ENTER DASHBOARD"}
                </button>

                {error && <p style={{ color: "#ff4d4d", textAlign: "center" }}>Invalid Code or Password</p>}
            </form>
        </div>
    );
}
