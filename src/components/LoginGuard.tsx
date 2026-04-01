"use client";

import React from "react";
import { useAuth } from "./AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user && pathname !== "/login") {
            router.push("/login");
        }
    }, [user, loading, pathname, router]);

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
        return null;
    }

    return <>{children}</>;
}
