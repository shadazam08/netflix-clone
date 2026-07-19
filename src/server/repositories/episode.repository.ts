import { Prisma, type Episode } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type EpisodeModel = Episode;

export class EpisodeRepository extends BaseRepository {
  async findAll(): Promise<EpisodeModel[]> {
    return this.db.episode.findMany({
      include: {
        season: {
          include: {
            tvShow: {
              include: {
                content: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          season: {
            createdAt: "desc",
          },
        },
        {
          episodeNo: "asc",
        },
      ],
    });
  }

  async findById(id: string): Promise<EpisodeModel | null> {
    return this.db.episode.findUnique({
      where: {
        id,
      },
      include: {
        season: {
          include: {
            tvShow: {
              include: {
                content: true,
              },
            },
          },
        },
      },
    });
  }

  async findBySeasonAndEpisodeNumber(seasonId: string, episodeNo: number): Promise<EpisodeModel | null> {
    return this.db.episode.findFirst({
      where: {
        seasonId,
        episodeNo,
      },
      include: {
        season: {
          include: {
            tvShow: {
              include: {
                content: true,
              },
            },
          },
        },
      },
    });
  }

  async create(data: Prisma.EpisodeCreateInput): Promise<EpisodeModel> {
    return this.db.episode.create({
      data,
      include: {
        season: {
          include: {
            tvShow: {
              include: {
                content: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.EpisodeUpdateInput): Promise<EpisodeModel> {
    return this.db.episode.update({
      where: {
        id,
      },
      data,
      include: {
        season: {
          include: {
            tvShow: {
              include: {
                content: true,
              },
            },
          },
        },
      },
    });
  }

  async delete(id: string): Promise<EpisodeModel> {
    return this.db.episode.delete({
      where: {
        id,
      },
    });
  }
}
