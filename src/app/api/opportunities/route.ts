import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const opps = await prisma.opportunity.findMany({
            include: {
                owner: true,
                contact: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(opps);
    } catch (error) {
        console.error("GET ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newOpp = await prisma.opportunity.create({
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
        return NextResponse.json(newOpp);
    } catch (error) {
        console.error("POST ERROR:", error);
        return NextResponse.json({ error: "Failed to create opportunity" }, { status: 500 });
    }
}
