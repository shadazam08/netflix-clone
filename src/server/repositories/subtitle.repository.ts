import { Prisma, Subtitle } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type SubtitleModel = Subtitle;

export class SubtitleRepository extends BaseRepository {
  async findAll(): Promise<SubtitleModel[]> {
    return this.db.subtitle.findMany({
      include: {
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<SubtitleModel | null> {
    return this.db.subtitle.findUnique({
      where: {
        id,
      },
      include: {
        content: true,
      },
    });
  }

  async create(data: Prisma.SubtitleCreateInput): Promise<SubtitleModel> {
    return this.db.subtitle.create({
      data,
      include: {
        content: true,
      },
    });
  }

  async update(id: string, data: Prisma.SubtitleUpdateInput): Promise<SubtitleModel> {
    return this.db.subtitle.update({
      where: {
        id,
      },
      data,
      include: {
        content: true,
      },
    });
  }

  async delete(id: string): Promise<SubtitleModel> {
    return this.db.subtitle.delete({
      where: {
        id,
      },
    });
  }
}
