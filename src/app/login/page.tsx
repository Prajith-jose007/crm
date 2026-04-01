"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
            position: 'relative', width: '100%', height: '100vh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', overflow: 'hidden', fontFamily: 'Inter, sans-serif', background: '#0f172a', color: '#fff'
        }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', zIndex: -1 }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(58, 110, 165, 0.15) 0%, transparent 70%)' }}></div>
            </div>

            <div style={{
                background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', zIndex: 10
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px', color: '#fff' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3h18v18H3z" rx="2" />
                            <path d="M3 9h18M9 21V9" />
                        </svg>
                        <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', margin: 0 }}>SITRIX CRM</h1>
                    </div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', margin: 0 }}>Enterprise Yacht Sales Management</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase' }}>User Code</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="e.g. SITRIX"
                            required
                            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px', color: '#fff', fontSize: '15px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase' }}>Password</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="••••••••"
                            required
                            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px', color: '#fff', fontSize: '15px' }}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={{
                        marginTop: '10px', background: '#3A6EA5', color: '#fff', padding: '14px', borderRadius: '12px', fontWeight: '700',
                        border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px', opacity: loading ? 0.6 : 1
                    }}>
                        {loading ? "Signing in..." : "Access Dashboard"}
                    </button>

                    {error && <div style={{ color: '#ff4d4d', fontSize: '13px', textAlign: 'center', background: 'rgba(255, 77, 77, 0.1)', padding: '10px', borderRadius: '8px', marginTop: '12px' }}>
                        Invalid User Code or Password
                    </div>}
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.3)', margin: 0 }}>&copy; 2026 SITRIX CRM. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
