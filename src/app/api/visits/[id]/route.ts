import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const body = await req.json();
        const updated = await prisma.visitReport.update({
            where: { id },
            data: {
                companyId: parseInt(body.companyId),
                contactId: body.contactId ? parseInt(body.contactId) : null,
                visitDate: new Date(body.visitDate),
                visitType: body.visitType || "IN_PERSON",
                ownerId: body.ownerId ? parseInt(body.ownerId) : null,
                attendees: body.attendees,
                objective: body.objective,
                summary: body.summary,
                outcome: body.outcome,
                nextSteps: body.nextSteps,
                followupDate: body.followupDate ? new Date(body.followupDate) : null,
                sentiment: body.sentiment || "NEUTRAL",
                budget: body.budget ? parseFloat(body.budget) : null,
                competitor: body.competitor,
                opportunityId: body.opportunityId ? parseInt(body.opportunityId) : null,
            },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT VISIT ERROR:", error);
        return NextResponse.json({ error: "Failed to update visit" }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        await prisma.visitReport.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE VISIT ERROR:", error);
        return NextResponse.json({ error: "Failed to delete visit" }, { status: 500 });
    }
}
