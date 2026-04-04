"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    // Hide Navbar on login page
    if (pathname === "/login") return null;

    const isManagerOrAdmin = user?.role === "ADMIN" || user?.role === "SALES_MANAGER";

    const navItems = [
        { label: "Dashboard", path: "/" },
        { label: "Opportunities", path: "/opportunities" },
        { label: "Visit Reports", path: "/visits" },
    ];

    navItems.push(
        { label: "Contacts", path: "/contacts" },
        { label: "Companies", path: "/companies" },
        { label: "Users", path: "/users" }
    );

    return (
        <header id="topbar">
            <div className="topbar-logo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3z" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                </svg>
                SITRIX CRM
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
                <div id="user-chip" style={{ cursor: 'pointer' }} onClick={() => {
                    if (window.confirm("Are you sure you want to log out?")) {
                        logout();
                    }
                }}>
                    <div className="user-avatar" style={{ background: user?.color || '#3A6EA5' }}>
                        {user ? user.code.substring(0, 2) : 'AL'}
                    </div>
                    <span id="chip-name">{user ? user.name.split(' ')[0] : 'ALL USERS'}</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        style={{ marginLeft: '8px', opacity: 0.7 }}
                    >
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                </div>
            </div>
        </header>
    );
}
