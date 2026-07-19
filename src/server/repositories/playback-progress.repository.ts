import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class PlaybackProgressRepository {
  async findAll() {
    return prisma.playbackProgress.findMany({
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

  async findById(id: string) {
    return prisma.playbackProgress.findUnique({
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

  async create(data: Prisma.PlaybackProgressCreateInput) {
    return prisma.playbackProgress.create({
      data,
      include: {
        profile: true,
        content: true,
        episode: true,
      },
    });
  }

  async update(id: string, data: Prisma.PlaybackProgressUpdateInput) {
    return prisma.playbackProgress.update({
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

  async delete(id: string) {
    return prisma.playbackProgress.delete({
      where: {
        id,
      },
    });
  }
}
