import { Prisma, type VideoSource } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type VideoSourceModel = VideoSource;

export class VideoSourceRepository extends BaseRepository {
  async findAll(): Promise<VideoSourceModel[]> {
    return this.db.videoSource.findMany({
      include: {
        content: true,
        episode: {
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
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<VideoSourceModel | null> {
    return this.db.videoSource.findUnique({
      where: {
        id,
      },
      include: {
        content: true,
        episode: {
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
        },
      },
    });
  }

  async findDefaultByContentId(contentId: string): Promise<VideoSourceModel | null> {
    return this.db.videoSource.findFirst({
      where: {
        contentId,
        isDefault: true,
      },
    });
  }

  async findDefaultByEpisodeId(episodeId: string): Promise<VideoSourceModel | null> {
    return this.db.videoSource.findFirst({
      where: {
        episodeId,
        isDefault: true,
      },
    });
  }

  async create(data: Prisma.VideoSourceCreateInput): Promise<VideoSourceModel> {
    return this.db.videoSource.create({
      data,
      include: {
        content: true,
        episode: true,
      },
    });
  }

  async update(id: string, data: Prisma.VideoSourceUpdateInput): Promise<VideoSourceModel> {
    return this.db.videoSource.update({
      where: {
        id,
      },
      data,
      include: {
        content: true,
        episode: true,
      },
    });
  }

  async delete(id: string): Promise<VideoSourceModel> {
    return this.db.videoSource.delete({
      where: {
        id,
      },
    });
  }

  async clearDefaultForContent(contentId: string) {
    return this.db.videoSource.updateMany({
      where: {
        contentId,
      },
      data: {
        isDefault: false,
      },
    });
  }

  async clearDefaultForEpisode(episodeId: string) {
    return this.db.videoSource.updateMany({
      where: {
        episodeId,
      },
      data: {
        isDefault: false,
      },
    });
  }
}
