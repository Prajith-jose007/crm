import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const companies = await prisma.company.findMany({
            include: {
                _count: {
                    select: {
                        contacts: true,
                        visitReports: true,
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });
        return NextResponse.json(companies);
    } catch (error) {
        console.error("GET COMPANIES ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Validate name
        if (!body.name) {
            return NextResponse.json({ error: "Company name is required" }, { status: 400 });
        }

        // Check for duplicate name
        const existing = await prisma.company.findFirst({
            where: {
                name: {
                    equals: body.name,
                }
            }
        });

        if (existing) {
            return NextResponse.json({ error: "A company with this name already exists" }, { status: 400 });
        }

        const newCompany = await prisma.company.create({
            data: {
                name: body.name,
                type: body.type || "OTHER",
                classification: body.classification || "G",
                address: body.address,
                city: body.city,
                country: body.country || "UAE",
                phone: body.phone,
                email: body.email,
                website: body.website,
                notes: body.notes,
            },
        });
        return NextResponse.json(newCompany);
    } catch (error) {
        console.error("POST COMPANY ERROR:", error);
        return NextResponse.json({ error: "Failed to create company" }, { status: 500 });
    }
}
