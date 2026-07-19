import { Prisma } from "@/generated/prisma/client";

import { AppError } from "@/server/lib";

import { CONTINUE_WATCHING_MESSAGES } from "@/server/auth";

import {
  ContinueWatchingRepository,
  ProfileRepository,
  ContentRepository,
  EpisodeRepository,
} from "@/server/repositories";

import { ContinueWatchingMapper } from "@/server/mappers";

import { CreateContinueWatchingDto, UpdateContinueWatchingDto } from "@/server/dto";

export class ContinueWatchingService {
  private readonly continueWatchingRepository = new ContinueWatchingRepository();

  private readonly profileRepository = new ProfileRepository();

  private readonly contentRepository = new ContentRepository();

  private readonly episodeRepository = new EpisodeRepository();

  async findAll() {
    const continueWatching = await this.continueWatchingRepository.findAll();

    return ContinueWatchingMapper.toDtoList(continueWatching);
  }

  async findById(profileId: string, contentId: string) {
    const continueWatching = await this.continueWatchingRepository.findById(profileId, contentId);

    if (!continueWatching) {
      throw new AppError(CONTINUE_WATCHING_MESSAGES.NOT_FOUND, 404);
    }

    return ContinueWatchingMapper.toDto(continueWatching);
  }

  async create(dto: CreateContinueWatchingDto) {
    const profile = await this.profileRepository.findById(dto.profileId);

    if (!profile) {
      throw new AppError(CONTINUE_WATCHING_MESSAGES.PROFILE_NOT_FOUND, 404);
    }

    const content = await this.contentRepository.findById(dto.contentId);

    if (!content) {
      throw new AppError(CONTINUE_WATCHING_MESSAGES.CONTENT_NOT_FOUND, 404);
    }

    if (dto.episodeId) {
      const episode = await this.episodeRepository.findById(dto.episodeId);

      if (!episode) {
        throw new AppError(CONTINUE_WATCHING_MESSAGES.EPISODE_NOT_FOUND, 404);
      }
    }

    const existing = await this.continueWatchingRepository.findById(dto.profileId, dto.contentId);

    if (existing) {
      throw new AppError(CONTINUE_WATCHING_MESSAGES.ALREADY_EXISTS, 409);
    }

    const continueWatching = await this.continueWatchingRepository.create({
      currentSecond: dto.currentSecond,

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

    return ContinueWatchingMapper.toDto(continueWatching);
  }

  async update(profileId: string, contentId: string, dto: UpdateContinueWatchingDto) {
    await this.findById(profileId, contentId);

    if (dto.episodeId) {
      const episode = await this.episodeRepository.findById(dto.episodeId);

      if (!episode) {
        throw new AppError(CONTINUE_WATCHING_MESSAGES.EPISODE_NOT_FOUND, 404);
      }
    }

    const data: Prisma.ContinueWatchingUpdateInput = {
      ...(dto.currentSecond !== undefined && {
        currentSecond: dto.currentSecond,
      }),

      ...(dto.episodeId !== undefined && {
        episode: {
          connect: {
            id: dto.episodeId,
          },
        },
      }),
    };

    const continueWatching = await this.continueWatchingRepository.update(profileId, contentId, data);

    return ContinueWatchingMapper.toDto(continueWatching);
  }

  async delete(profileId: string, contentId: string) {
    await this.findById(profileId, contentId);

    await this.continueWatchingRepository.delete(profileId, contentId);
  }
}
