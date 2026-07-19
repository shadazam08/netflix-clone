import { Prisma, type Season } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type SeasonModel = Season;

export class SeasonRepository extends BaseRepository {
  async findAll(): Promise<SeasonModel[]> {
    return this.db.season.findMany({
      include: {
        tvShow: {
          include: {
            content: true,
          },
        },
      },
      orderBy: [
        {
          tvShow: {
            createdAt: "desc",
          },
        },
        {
          seasonNo: "asc",
        },
      ],
    });
  }

  async findById(id: string): Promise<SeasonModel | null> {
    return this.db.season.findUnique({
      where: {
        id,
      },
      include: {
        tvShow: {
          include: {
            content: true,
          },
        },
      },
    });
  }

  async findByTvShowAndSeasonNumber(tvShowId: string, seasonNo: number): Promise<SeasonModel | null> {
    return this.db.season.findFirst({
      where: {
        tvShowId,
        seasonNo,
      },
      include: {
        tvShow: {
          include: {
            content: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.SeasonCreateInput): Promise<SeasonModel> {
    return this.db.season.create({
      data,
      include: {
        tvShow: {
          include: {
            content: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.SeasonUpdateInput): Promise<SeasonModel> {
    return this.db.season.update({
      where: {
        id,
      },
      data,
      include: {
        tvShow: {
          include: {
            content: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<SeasonModel> {
    return this.db.season.delete({
      where: {
        id,
      },
    });
  }
}
