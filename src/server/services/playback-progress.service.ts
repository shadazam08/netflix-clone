import { Prisma } from "@/generated/prisma/client";

import {
  PlaybackProgressRepository,
  ProfileRepository,
  ContentRepository,
  EpisodeRepository,
} from "@/server/repositories";

import { PlaybackProgressMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { PLAYBACK_PROGRESS_MESSAGES } from "@/server/auth";

import { CreatePlaybackProgressInput, UpdatePlaybackProgressInput } from "@/server/validations";

export class PlaybackProgressService {
  private readonly playbackProgressRepository = new PlaybackProgressRepository();

  private readonly profileRepository = new ProfileRepository();

  private readonly contentRepository = new ContentRepository();

  private readonly episodeRepository = new EpisodeRepository();

  async findAll() {
    const playbackProgress = await this.playbackProgressRepository.findAll();

    return PlaybackProgressMapper.toDtoList(playbackProgress);
  }

  async findById(id: string) {
    const playbackProgress = await this.playbackProgressRepository.findById(id);

    if (!playbackProgress) {
      throw new AppError(PLAYBACK_PROGRESS_MESSAGES.NOT_FOUND, 404);
    }

    return PlaybackProgressMapper.toDto(playbackProgress);
  }

  async create(data: CreatePlaybackProgressInput) {
    const profile = await this.profileRepository.findById(data.profileId);

    if (!profile) {
      throw new AppError(PLAYBACK_PROGRESS_MESSAGES.PROFILE_NOT_FOUND, 404);
    }

    const content = await this.contentRepository.findById(data.contentId);

    if (!content) {
      throw new AppError(PLAYBACK_PROGRESS_MESSAGES.CONTENT_NOT_FOUND, 404);
    }

    if (data.episodeId) {
      const episode = await this.episodeRepository.findById(data.episodeId);

      if (!episode) {
        throw new AppError(PLAYBACK_PROGRESS_MESSAGES.EPISODE_NOT_FOUND, 404);
      }
    }

    const created = await this.playbackProgressRepository.create({
      profile: {
        connect: {
          id: data.profileId,
        },
      },
      content: {
        connect: {
          id: data.contentId,
        },
      },
      ...(data.episodeId && {
        episode: {
          connect: {
            id: data.episodeId,
          },
        },
      }),
      watchedSeconds: data.watchedSeconds,
      completed: data.completed,
      lastPlayedAt: data.lastPlayedAt,
    } satisfies Prisma.PlaybackProgressCreateInput);

    return PlaybackProgressMapper.toDto(created);
  }

  async update(id: string, data: UpdatePlaybackProgressInput) {
    await this.findById(id);

    const updateData: Prisma.PlaybackProgressUpdateInput = {};

    if (data.episodeId !== undefined) {
      const episode = await this.episodeRepository.findById(data.episodeId);

      if (!episode) {
        throw new AppError(PLAYBACK_PROGRESS_MESSAGES.EPISODE_NOT_FOUND, 404);
      }

      updateData.episode = {
        connect: {
          id: data.episodeId,
        },
      };
    }

    if (data.watchedSeconds !== undefined) {
      updateData.watchedSeconds = data.watchedSeconds;
    }

    if (data.completed !== undefined) {
      updateData.completed = data.completed;
    }

    if (data.lastPlayedAt !== undefined) {
      updateData.lastPlayedAt = data.lastPlayedAt;
    }

    const updated = await this.playbackProgressRepository.update(id, updateData);

    return PlaybackProgressMapper.toDto(updated);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.playbackProgressRepository.delete(id);
  }
}
