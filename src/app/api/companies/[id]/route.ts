import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const body = await req.json();
        const updated = await prisma.company.update({
            where: { id },
            data: {
                name: body.name,
                type: body.type,
                classification: body.classification,
                address: body.address,
                city: body.city,
                country: body.country || "UAE",
                phone: body.phone,
                email: body.email,
                website: body.website,
                notes: body.notes,
            },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT COMPANY ERROR:", error);
        return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        await prisma.company.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE COMPANY ERROR:", error);
        return NextResponse.json({ error: "Failed to delete company" }, { status: 500 });
    }
}
