import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class WatchHistoryRepository {
  async findAll() {
    return prisma.watchHistory.findMany({
      include: {
        profile: true,
        content: true,
        episode: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async findById(
    id: string
  ) {
    return prisma.watchHistory.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        content: true,
        episode: true,
      },
    });
  }

  async create(
    data: Prisma.WatchHistoryCreateInput
  ) {
    return prisma.watchHistory.create({
      data,
      include: {
        profile: true,
        content: true,
        episode: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.WatchHistoryUpdateInput
  ) {
    return prisma.watchHistory.update({
      where: {
        id,
      },
      data,
      include: {
        profile: true,
        content: true,
        episode: true,
      },
    });
  }

  async delete(
    id: string
  ) {
    return prisma.watchHistory.delete({
      where: {
        id,
      },
    });
  }
}