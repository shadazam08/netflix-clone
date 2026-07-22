import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

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

  const superAdminRole = await prisma.role.findUnique({
    where: {
      name: "SUPER_ADMIN",
    },
  });

  if (!superAdminRole) {
    throw new Error("SUPER_ADMIN role not found.");
  }

  const password = await bcrypt.hash("Admin@123", 12);

  await prisma.user.upsert({
    where: {
      email: "admin@netflix.com",
    },

    update: {
      firstName: "Super",
      lastName: "Admin",
      roleId: superAdminRole.id,
      password,
      status: "ACTIVE",
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },

    create: {
      firstName: "Super",
      lastName: "Admin",
      email: "admin@netflix.com",
      password,
      roleId: superAdminRole.id,
      status: "ACTIVE",
      emailVerified: true,
      emailVerifiedAt: new Date(),

      profiles: {
        create: {
          name: "Super Admin",
          type: "ADULT",
          isPrimary: true,
          isLocked: false,
        },
      },
    },
  });

  console.log("✅ Super Admin created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
