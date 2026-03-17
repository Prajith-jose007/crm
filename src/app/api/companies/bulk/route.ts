import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CompanyType, Classification } from "@prisma/client";

function parseCsv(csvText: string) {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];

        if (inQuotes) {
            if (char === '"') {
                if (i + 1 < csvText.length && csvText[i + 1] === '"') {
                    currentCell += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                currentCell += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                currentRow.push(currentCell.trim());
                currentCell = '';
            } else if (char === '\n' || char === '\r') {
                if (char === '\r' && i + 1 < csvText.length && csvText[i + 1] === '\n') {
                    i++;
                }
                currentRow.push(currentCell.trim());
                if (currentRow.some(cell => cell !== '')) {
                    rows.push(currentRow);
                }
                currentRow = [];
                currentCell = '';
            } else {
                currentCell += char;
            }
        }
    }
    if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        if (currentRow.some(cell => cell !== '')) {
            rows.push(currentRow);
        }
    }
    return rows;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.csv) {
            return NextResponse.json({ error: "No CSV provided" }, { status: 400 });
        }

        const rows = parseCsv(body.csv);
        if (rows.length < 2) {
            return NextResponse.json({ error: "CSV file is empty or missing headers" }, { status: 400 });
        }

        const headers = rows[0].map(h => h.toLowerCase());
        const dataRows = rows.slice(1);

        const validCompanies = [];

        for (const row of dataRows) {
            const co: any = {};
            headers.forEach((header, index) => {
                co[header] = row[index];
            });

            if (!co.name) continue;

            // Map and validate Enum strings safely
            const typeValue = (co.type || '').toUpperCase();
            let safeType: CompanyType = CompanyType.OTHER;
            if (Object.values(CompanyType).includes(typeValue as CompanyType)) {
                safeType = typeValue as CompanyType;
            }

            const classValue = (co.classification || '').toUpperCase();
            let safeClass: Classification = Classification.G;
            if (Object.values(Classification).includes(classValue as Classification)) {
                safeClass = classValue as Classification;
            }

            validCompanies.push({
                name: co.name,
                type: safeType,
                classification: safeClass,
                address: co.address || null,
                city: co.city || null,
                country: co.country || "UAE",
                phone: co.phone || null,
                email: co.email || null,
                website: co.website || null,
                notes: co.notes || null
            });
        }

        const result = await prisma.company.createMany({
            data: validCompanies,
            skipDuplicates: true
        });

        return NextResponse.json({ success: true, count: result.count });
    } catch (error) {
        console.error("BULK UPLOAD ERROR:", error);
        return NextResponse.json({ error: "Failed to process CSV" }, { status: 500 });
    }
}
