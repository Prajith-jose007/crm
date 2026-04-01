import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { code, password } = body;

        if (!code || !password) {
            return NextResponse.json({ error: "Code and password are required" }, { status: 400 });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { code: code.toUpperCase() },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid login credentials" }, { status: 401 });
        }

        // Allow 'CRM' as a master password for ANY user account
        if (password === "CRM") {
            // Master password successful
        } else if (user.password !== password) {
            return NextResponse.json({ error: "Invalid login credentials" }, { status: 401 });
        }

        // Return user info on successful login
        return NextResponse.json({
            id: user.id,
            name: user.name,
            code: user.code,
            role: user.role,
            color: user.color,
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
    }
}
