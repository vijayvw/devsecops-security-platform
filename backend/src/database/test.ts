import { prisma } from "./index.js";

async function main() {
  await prisma.$connect();

  console.log("✅ Connected to PostgreSQL");

  await prisma.$disconnect();
}

main().catch(console.error);
