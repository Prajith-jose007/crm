import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const body = await req.json();
        const updated = await prisma.opportunity.update({
            where: { id },
            data: {
                clientName: body.clientName,
                yacht: body.yacht,
                guestName: body.guestName,
                eventTopic: body.eventTopic,
                ownerId: body.ownerId ? parseInt(body.ownerId) : null,
                priority: body.priority || "WARM",
                phase: body.phase || "IDENTIFICATION",
                status: body.status || "OPEN",
                estimatedValue: body.estimatedValue || 0,
                mev: body.mev || 0,
                probability: body.probability || 10,
                closeMonth: body.closeMonth,
                closeYear: body.closeYear ? parseInt(body.closeYear) : null,
                followupDate: body.followupDate ? new Date(body.followupDate) : null,
                notes: body.notes,
                contactId: body.contactId ? parseInt(body.contactId) : null,
            },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT OPP ERROR:", error);
        return NextResponse.json({ error: "Failed to update opportunity" }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        await prisma.opportunity.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE OPP ERROR:", error);
        return NextResponse.json({ error: "Failed to delete opportunity" }, { status: 500 });
    }
}
