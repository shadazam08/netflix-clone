import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles = [
    {
      name: "SUPER_ADMIN",
      description: "System Super Administrator",
    },
    {
      name: "ADMIN",
      description: "Application Administrator",
    },
    {
      name: "USER",
      description: "Application User",
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {},
      create: role,
    });
  }

  console.log("✅ Roles seeded successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });