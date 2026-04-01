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
        <div className="login-container">
            <div className="login-background">
                {/* We'll use the generated image here if it's accessible. 
                    Since we don't know the exact path relative to public, we'll use a placeholder or style background */}
                <div className="overlay"></div>
            </div>
            
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-section">
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3h18v18H3z" rx="2" />
                            <path d="M3 9h18M9 21V9" />
                        </svg>
                        <h1>SITRIX CRM</h1>
                    </div>
                    <p>Enterprise Yacht Sales Management</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label>User Code</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="e.g. SITRIX"
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className="login-btn">
                        {loading ? "Signing in..." : "Access Dashboard"}
                    </button>

                    {error && <div className="error-msg">Invalid User Code or Password</div>}
                </form>

                <div className="login-footer">
                    <p>&copy; 2026 SITRIX CRM. All rights reserved.</p>
                </div>
            </div>

            <style jsx>{`
                .login-container {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    font-family: 'Inter', sans-serif;
                }

                .login-background {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    z-index: -1;
                }

                .login-background .overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(58, 110, 165, 0.15) 0%, transparent 70%);
                }

                .login-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 40px;
                    border-radius: 24px;
                    width: 100%;
                    max-width: 420px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    animation: slideUp 0.6s ease-out;
                    z-index: 10;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 32px;
                }

                .logo-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 8px;
                    color: #fff;
                }

                .logo-section h1 {
                    font-size: 24px;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                    margin: 0;
                }

                .login-header p {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 14px;
                    margin: 0;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .input-group label {
                    font-size: 12px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.7);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .input-group input {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 12px 16px;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 15px;
                    transition: all 0.2s;
                    outline: none;
                }

                .input-group input:focus {
                    border-color: #3A6EA5;
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 0 0 4px rgba(58, 110, 165, 0.2);
                }

                .login-btn {
                    margin-top: 10px;
                    background: #3A6EA5;
                    color: #fff;
                    padding: 14px;
                    border-radius: 12px;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 16px;
                }

                .login-btn:hover {
                    background: #4a7eb5;
                    transform: translateY(-1px);
                    box-shadow: 0 10px 15px -3px rgba(58, 110, 165, 0.4);
                }

                .login-btn:active {
                    transform: translateY(0);
                }

                .login-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .error-msg {
                    color: #ff4d4d;
                    font-size: 13px;
                    text-align: center;
                    background: rgba(255, 77, 77, 0.1);
                    padding: 10px;
                    border-radius: 8px;
                    margin-top: 12px;
                }

                .login-footer {
                    margin-top: 32px;
                    text-align: center;
                }

                .login-footer p {
                    font-size: 11px;
                    color: rgba(255, 255, 255, 0.3);
                    margin: 0;
                }
            `}</style>
        </div>
    );
}
