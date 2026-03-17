import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const body = await req.json();
        const updated = await prisma.contact.update({
            where: { id },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                title: body.title,
                companyId: body.companyId ? Number(body.companyId) : null,
                email: body.email,
                phone: body.phone,
                nationality: body.nationality,
                responsibility: body.responsibility || "NEUTRAL",
                notes: body.notes,
            },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT CONTACT ERROR:", error);
        return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        await prisma.contact.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE CONTACT ERROR:", error);
        return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
    }
}
