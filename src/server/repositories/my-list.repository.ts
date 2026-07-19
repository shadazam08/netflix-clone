import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class MyListRepository {
  async findAll() {
    return prisma.myList.findMany({
      include: {
        profile: true,
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(
    profileId: string,
    contentId: string
  ) {
    return prisma.myList.findUnique({
      where: {
        profileId_contentId: {
          profileId,
          contentId,
        },
      },
      include: {
        profile: true,
        content: true,
      },
    });
  }

  async create(
    data: Prisma.MyListCreateInput
  ) {
    return prisma.myList.create({
      data,
      include: {
        profile: true,
        content: true,
      },
    });
  }

  async delete(
    profileId: string,
    contentId: string
  ) {
    return prisma.myList.delete({
      where: {
        profileId_contentId: {
          profileId,
          contentId,
        },
      },
    });
  }
}