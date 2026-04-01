"use client";

import React from "react";
import { useAuth } from "./AuthProvider";
import { usePathname } from "next/navigation";

export default function LoginGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#0f172a" }}>
                <p style={{ color: "#fff" }}>Loading...</p>
            </div>
        );
    }

    if (pathname === "/login") {
        return <>{children}</>;
    }

    if (!user) {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return null;
    }

    return <>{children}</>;
}
