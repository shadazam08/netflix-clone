// src/server/repositories/homepage-content.repository.ts

import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class HomepageContentRepository {
  async findAll() {
    return prisma.homepageContent.findMany({
      include: {
        section: true,
        content: true,
      },
      orderBy: [
        {
          sectionId: "asc",
        },
        {
          displayOrder: "asc",
        },
      ],
    });
  }

  async findById(sectionId: string, contentId: string) {
    return prisma.homepageContent.findUnique({
      where: {
        sectionId_contentId: {
          sectionId,
          contentId,
        },
      },
      include: {
        section: true,
        content: true,
      },
    });
  }

  async create(data: Prisma.HomepageContentCreateInput) {
    return prisma.homepageContent.create({
      data,
      include: {
        section: true,
        content: true,
      },
    });
  }

  async update(sectionId: string, contentId: string, data: Prisma.HomepageContentUpdateInput) {
    return prisma.homepageContent.update({
      where: {
        sectionId_contentId: {
          sectionId,
          contentId,
        },
      },
      data,
      include: {
        section: true,
        content: true,
      },
    });
  }

  async delete(sectionId: string, contentId: string) {
    return prisma.homepageContent.delete({
      where: {
        sectionId_contentId: {
          sectionId,
          contentId,
        },
      },
    });
  }
}
