import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                _count: {
                    select: {
                        opportunities: true,
                        visitReports: true,
                    },
                },
                opportunities: {
                    select: {
                        status: true,
                        estimatedValue: true,
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });
        const safeUsers = users.map(user => {
            const { password, ...safeUser } = user as any;
            return safeUser;
        });
        return NextResponse.json(safeUsers);
    } catch (error) {
        console.error("GET USERS ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                code: body.code,
                role: body.role || "SALES_EXECUTIVE",
                color: body.color || "#3A6EA5",
            },
        });
        return NextResponse.json(newUser);
    } catch (error) {
        console.error("POST USER ERROR:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
