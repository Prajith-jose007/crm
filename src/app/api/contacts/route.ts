import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const contacts = await prisma.contact.findMany({
            include: {
                company: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                firstName: "asc",
            },
        });
        return NextResponse.json(contacts);
    } catch (error) {
        console.error("GET CONTACTS ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newContact = await prisma.contact.create({
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
        return NextResponse.json(newContact);
    } catch (error) {
        console.error("POST CONTACT ERROR:", error);
        return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
    }
}
