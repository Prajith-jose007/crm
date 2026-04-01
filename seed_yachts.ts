import { prisma } from "./src/lib/prisma";

const INITIAL_YACHTS = [
    "LOTUS", "LOTUS ROYALE", "DESERT ROSE", "ORCHID", "ARABIAN PEARL", 
    "VIRGO", "OCEAN PEARL", "VENUS", "PLUTO", "APOLLO", "ATHENA", 
    "TITAN", "CALYPSO", "OCEAN EMPRESS", "AL MANSOUR", "MERCURY", 
    "DAFFODIL", "LADY T", "ATLAS", "EUROPA", "TOUR BOATS"
];

async function main() {
    for (const name of INITIAL_YACHTS) {
        await prisma.yacht.upsert({
            where: { name },
            update: {},
            create: { name }
        });
    }
    console.log("Seeded yachts.");
}

main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
    })
    .finally(async () => {
    await prisma.$disconnect();
    });
