import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class ContinueWatchingRepository {
  async findAll() {
    return prisma.continueWatching.findMany({
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
    profileId: string,
    contentId: string
  ) {
    return prisma.continueWatching.findUnique({
      where: {
        profileId_contentId: {
          profileId,
          contentId,
        },
      },
      include: {
        profile: true,
        content: true,
        episode: true,
      },
    });
  }

  async create(
    data: Prisma.ContinueWatchingCreateInput
  ) {
    return prisma.continueWatching.create({
      data,
      include: {
        profile: true,
        content: true,
        episode: true,
      },
    });
  }

  async update(
    profileId: string,
    contentId: string,
    data: Prisma.ContinueWatchingUpdateInput
  ) {
    return prisma.continueWatching.update({
      where: {
        profileId_contentId: {
          profileId,
          contentId,
        },
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
    profileId: string,
    contentId: string
  ) {
    return prisma.continueWatching.delete({
      where: {
        profileId_contentId: {
          profileId,
          contentId,
        },
      },
    });
  }
}