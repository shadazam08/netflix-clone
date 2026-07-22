import { PrismaClient, Prisma } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export abstract class BaseRepository {
  protected readonly db: PrismaClient | Prisma.TransactionClient;

  constructor(db: PrismaClient | Prisma.TransactionClient = prisma) {
    this.db = db;
  }
}

export { prisma };