import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const body = await req.json();
        const updated = await prisma.user.update({
            where: { id },
            data: {
                name: body.name,
                code: body.code,
                role: body.role || "SALES_EXECUTIVE",
                color: body.color || "#3A6EA5",
            },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT USER ERROR:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE USER ERROR:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
