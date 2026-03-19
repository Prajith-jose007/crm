import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const visits = await prisma.visitReport.findMany({
            include: {
                company: { select: { name: true } },
                contact: { select: { firstName: true, lastName: true } },
                owner: { select: { name: true, code: true } },
            },
            orderBy: {
                visitDate: "desc",
            },
        });
        return NextResponse.json(visits);
    } catch (error) {
        console.error("GET VISITS ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch visit reports" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newVisit = await prisma.visitReport.create({
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
        return NextResponse.json(newVisit);
    } catch (error) {
        console.error("POST VISIT ERROR:", error);
        return NextResponse.json({ error: "Failed to create visit report" }, { status: 500 });
    }
}
