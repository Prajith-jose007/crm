"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const isManagerOrAdmin = user?.role === "ADMIN" || user?.role === "SALES_MANAGER";

    const navItems = [
        { label: "Dashboard", path: "/" },
        { label: "Opportunities", path: "/opportunities" },
        { label: "Visit Reports", path: "/visits" },
    ];

    if (isManagerOrAdmin) {
        navItems.push(
            { label: "Contacts", path: "/contacts" },
            { label: "Companies", path: "/companies" },
            { label: "Users", path: "/users" }
        );
    }

    return (
        <header id="topbar">
            <div className="topbar-logo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3z" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                </svg>
                FleetSell CRM
            </div>
            <div className="topbar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        style={{ textDecoration: 'none' }}
                    >
                        <button
                            className={`topbar-btn ${pathname === item.path ? "active" : ""}`}
                        >
                            {item.label}
                        </button>
                    </Link>
                ))}
            </div>
            <div className="topbar-right">
                <div id="user-chip" style={{ cursor: 'default' }}>
                    <div className="user-avatar" style={{ background: user?.color || '#3A6EA5' }}>
                        {user ? user.code.substring(0, 2) : 'AL'}
                    </div>
                    <span id="chip-name">{user ? user.name : 'All Users'}</span>
                </div>
            </div>
        </header>
    );
}
