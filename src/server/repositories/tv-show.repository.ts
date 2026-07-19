import { Prisma, type TvShow } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type TvShowModel = TvShow;

export class TvShowRepository extends BaseRepository {
  async findAll(): Promise<TvShowModel[]> {
    return this.db.tvShow.findMany({
      include: {
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<TvShowModel | null> {
    return this.db.tvShow.findUnique({
      where: {
        id,
      },
      include: {
        content: true,
      },
    });
  }

  async findByContentId(contentId: string): Promise<TvShowModel | null> {
    return this.db.tvShow.findUnique({
      where: {
        contentId,
      },
      include: {
        content: true,
      },
    });
  }

  async create(data: Prisma.TvShowCreateInput): Promise<TvShowModel> {
    return this.db.tvShow.create({
      data,
      include: {
        content: true,
      },
    });
  }

  async update(id: string, data: Prisma.TvShowUpdateInput): Promise<TvShowModel> {
    return this.db.tvShow.update({
      where: {
        id,
      },
      data,
      include: {
        content: true,
      },
    });
  }

  async delete(id: string): Promise<TvShowModel> {
    return this.db.tvShow.delete({
      where: {
        id,
      },
    });
  }
}
