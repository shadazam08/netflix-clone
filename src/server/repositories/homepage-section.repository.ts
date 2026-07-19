import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class HomepageSectionRepository {
  async findAll() {
    return prisma.homepageSection.findMany({
      include: {
        rows: {
          include: {
            content: true,
          },
        },
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.homepageSection.findUnique({
      where: {
        id,
      },
      include: {
        rows: {
          include: {
            content: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.homepageSection.findUnique({
      where: {
        slug,
      },
    });
  }

  async create(data: Prisma.HomepageSectionCreateInput) {
    return prisma.homepageSection.create({
      data,
      include: {
        rows: {
          include: {
            content: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.HomepageSectionUpdateInput) {
    return prisma.homepageSection.update({
      where: {
        id,
      },
      data,
      include: {
        rows: {
          include: {
            content: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.homepageSection.delete({
      where: {
        id,
      },
    });
  }
}
