import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/server/db/prisma";

export class AnnouncementRepository {
  async findAll() {
    return prisma.announcement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.announcement.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.AnnouncementCreateInput) {
    return prisma.announcement.create({
      data,
    });
  }

  async update(id: string, data: Prisma.AnnouncementUpdateInput) {
    return prisma.announcement.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.announcement.delete({
      where: {
        id,
      },
    });
  }
}
