import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class NotificationRepository {
  async findAll() {
    return prisma.notification.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.notification.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  async create(
    data: Prisma.NotificationCreateInput
  ) {
    return prisma.notification.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.NotificationUpdateInput
  ) {
    return prisma.notification.update({
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
    return prisma.notification.delete({
      where: {
        id,
      },
    });
  }
}