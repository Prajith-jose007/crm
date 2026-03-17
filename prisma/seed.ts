import { prisma } from "../src/lib/prisma";

async function main() {
    console.log("Seeding exhaustive data...");

    // 1. Users
    const users = await Promise.all([
        prisma.user.upsert({ where: { code: "AJWA" }, update: {}, create: { name: "Ajwa", code: "AJWA", role: "SALES_EXECUTIVE", color: "#2E8B57" } }),
        prisma.user.upsert({ where: { code: "BILAL" }, update: {}, create: { name: "Bilal", code: "BILAL", role: "SALES_MANAGER", color: "#C0572B" } }),
        prisma.user.upsert({ where: { code: "PRAJITH" }, update: {}, create: { name: "Prajith", code: "PRAJITH", role: "SALES_EXECUTIVE", color: "#3A6EA5" } }),
        prisma.user.upsert({ where: { code: "NAWAZ" }, update: {}, create: { name: "Nawaz", code: "NAWAZ", role: "SALES_EXECUTIVE", color: "#8A6B00" } }),
    ]);

    // 2. Companies
    const companyRayna = await prisma.company.create({ data: { name: "RAYNA TOURS LLC", type: "DMC", classification: "HS", country: "UAE" } });
    const companyGulf = await prisma.company.create({ data: { name: "GULF VENTURES LLC", type: "DMC", classification: "HS", country: "UAE" } });
    const companyOcean = await prisma.company.create({ data: { name: "OCEAN LINK COMMERCIAL BROKERS", type: "AGENCY", classification: "S", country: "UAE" } });

    // 3. Contacts
    const contactShyam = await prisma.contact.create({
        data: {
            firstName: "SHYAM",
            lastName: "BANSAL",
            title: "HEAD OF PRODUCTS & PARTNERSHIP",
            companyId: companyRayna.id,
            email: "SHYAM@RAINATOURS.COM",
            responsibility: "DECISION_MAKER",
        },
    });

    // 4. Opportunities
    const oppsData = [
        { clientName: "OCEAN LINK COMMERCIAL BROKERS", yacht: "DESERT ROSE", eventTopic: "CORPORATE EVENT", ownerId: users[0].id, priority: "HOT", phase: "IDENTIFICATION", status: "OPEN", estimatedValue: 31447, mev: 3145, closeMonth: "February", closeYear: 2026 },
        { clientName: "GULF VENTURES LLC", yacht: "APOLLO", eventTopic: "ANNUAL PARTY", ownerId: users[1].id, priority: "HOT", phase: "PROPOSAL", status: "OPEN", estimatedValue: 72000, mev: 36000, closeMonth: "March", closeYear: 2026 },
        { clientName: "RAYNA TOURS LLC", yacht: "LOTUS", eventTopic: "DINNER CRUISE", ownerId: users[2].id, priority: "WARM", phase: "QUALIFICATION", status: "OPEN", estimatedValue: 45000, mev: 9000, closeMonth: "April", closeYear: 2026 },
        { clientName: "PRIVATE CLIENT", yacht: "VIRGO", eventTopic: "BIRTHDAY PARTY", ownerId: users[3].id, priority: "COLD", phase: "IDENTIFICATION", status: "OPEN", estimatedValue: 12000, mev: 1200, closeMonth: "February", closeYear: 2026 },
        { clientName: "TECH SOLUTIONS", yacht: "DESERT ROSE", eventTopic: "TEAM BUILDING", ownerId: users[0].id, priority: "HOT", phase: "COMMITMENT", status: "CLOSE_WON", estimatedValue: 55000, mev: 55000, closeMonth: "January", closeYear: 2026 },
    ];

    for (const o of oppsData) {
        await prisma.opportunity.create({ data: o as any });
    }

    // 5. Visits
    await prisma.visitReport.create({
        data: {
            companyId: companyRayna.id,
            contactId: contactShyam.id,
            visitDate: new Date(),
            ownerId: users[0].id,
            objective: "PROPOSAL REVIEW",
            summary: "Discussed the upcoming Lotus charter. The client is happy with the rate.",
            outcome: "Waiting for confirmation",
            sentiment: "POSITIVE",
            budget: 45000,
        },
    });

    console.log("Seeding finished!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
