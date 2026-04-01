import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const yachts = await prisma.yacht.findMany({
            orderBy: { name: "asc" },
        });
        return NextResponse.json(yachts);
    } catch (error) {
        console.error("GET YACHTS ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch yachts" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const newYacht = await prisma.yacht.create({
            data: { name: name.toUpperCase() },
        });
        return NextResponse.json(newYacht);
    } catch (error) {
        console.error("POST YACHT ERROR:", error);
        return NextResponse.json({ error: "Failed to create yacht" }, { status: 500 });
    }
}
