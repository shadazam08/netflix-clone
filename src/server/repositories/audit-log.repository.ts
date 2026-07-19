import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class AuditLogRepository {
  async findAll() {
    return prisma.auditLog.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.auditLog.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  async create(data: Prisma.AuditLogCreateInput) {
    return prisma.auditLog.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(id: string, data: Prisma.AuditLogUpdateInput) {
    return prisma.auditLog.update({
      where: {
        id,
      },
      data,
      include: {
        user: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.auditLog.delete({
      where: {
        id,
      },
    });
  }
}
