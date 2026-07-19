import { Prisma } from "@/generated/prisma/client";

import { AppError } from "@/server/lib";

import { WATCH_HISTORY_MESSAGES } from "@/server/auth";

import { WatchHistoryRepository, ProfileRepository, ContentRepository, EpisodeRepository } from "@/server/repositories";

import { WatchHistoryMapper } from "@/server/mappers";

import { CreateWatchHistoryDto, UpdateWatchHistoryDto } from "@/server/dto";

export class WatchHistoryService {
  private readonly watchHistoryRepository = new WatchHistoryRepository();

  private readonly profileRepository = new ProfileRepository();

  private readonly contentRepository = new ContentRepository();

  private readonly episodeRepository = new EpisodeRepository();

  async findAll() {
    const watchHistory = await this.watchHistoryRepository.findAll();

    return WatchHistoryMapper.toDtoList(watchHistory);
  }

  async findById(id: string) {
    const watchHistory = await this.watchHistoryRepository.findById(id);

    if (!watchHistory) {
      throw new AppError(WATCH_HISTORY_MESSAGES.NOT_FOUND, 404);
    }

    return WatchHistoryMapper.toDto(watchHistory);
  }

  async create(dto: CreateWatchHistoryDto) {
    const profile = await this.profileRepository.findById(dto.profileId);

    if (!profile) {
      throw new AppError(WATCH_HISTORY_MESSAGES.PROFILE_NOT_FOUND, 404);
    }

    const content = await this.contentRepository.findById(dto.contentId);

    if (!content) {
      throw new AppError(WATCH_HISTORY_MESSAGES.CONTENT_NOT_FOUND, 404);
    }

    if (dto.episodeId) {
      const episode = await this.episodeRepository.findById(dto.episodeId);

      if (!episode) {
        throw new AppError(WATCH_HISTORY_MESSAGES.EPISODE_NOT_FOUND, 404);
      }
    }

    const watchHistory = await this.watchHistoryRepository.create({
      watchedSeconds: dto.watchedSeconds,
      completed: dto.completed,

      profile: {
        connect: {
          id: dto.profileId,
        },
      },

      content: {
        connect: {
          id: dto.contentId,
        },
      },

      ...(dto.episodeId && {
        episode: {
          connect: {
            id: dto.episodeId,
          },
        },
      }),
    });

    return WatchHistoryMapper.toDto(watchHistory);
  }

  async update(id: string, dto: UpdateWatchHistoryDto) {
    await this.findById(id);

    if (dto.episodeId) {
      const episode = await this.episodeRepository.findById(dto.episodeId);

      if (!episode) {
        throw new AppError(WATCH_HISTORY_MESSAGES.EPISODE_NOT_FOUND, 404);
      }
    }

    const data: Prisma.WatchHistoryUpdateInput = {
      ...(dto.watchedSeconds !== undefined && {
        watchedSeconds: dto.watchedSeconds,
      }),

      ...(dto.completed !== undefined && {
        completed: dto.completed,
      }),

      ...(dto.episodeId !== undefined && {
        episode: {
          connect: {
            id: dto.episodeId,
          },
        },
      }),
    };

    const watchHistory = await this.watchHistoryRepository.update(id, data);

    return WatchHistoryMapper.toDto(watchHistory);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.watchHistoryRepository.delete(id);
  }
}
