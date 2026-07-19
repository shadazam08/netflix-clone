// src/server/repositories/review.repository.ts

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/server/db/prisma";

export class ReviewRepository {
  async findAll() {
    return prisma.review.findMany({
      include: {
        profile: true,
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.review.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        content: true,
      },
    });
  }

  async create(data: Prisma.ReviewCreateInput) {
    return prisma.review.create({
      data,
      include: {
        profile: true,
        content: true,
      },
    });
  }

  async update(id: string, data: Prisma.ReviewUpdateInput) {
    return prisma.review.update({
      where: {
        id,
      },
      data,
      include: {
        profile: true,
        content: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
