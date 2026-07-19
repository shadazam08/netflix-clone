import {
  VIDEO_SOURCE_MESSAGES,
} from "@/server/auth";

import {
  AppError,
} from "@/server/lib";

import {
  VideoSourceMapper,
} from "@/server/mappers";

import {
  ContentRepository,
  EpisodeRepository,
  VideoSourceRepository,
} from "@/server/repositories";

import type {
  CreateVideoSourceDto,
  UpdateVideoSourceDto,
} from "@/server/dto";

export class VideoSourceService {
  private readonly repository =
    new VideoSourceRepository();

  private readonly contentRepository =
    new ContentRepository();

  private readonly episodeRepository =
    new EpisodeRepository();

  async findAll() {
    const items =
      await this.repository.findAll();

    return VideoSourceMapper.toDtoList(
      items
    );
  }

  async findById(id: string) {
    const item =
      await this.repository.findById(id);

    if (!item) {
      throw new AppError(
        VIDEO_SOURCE_MESSAGES.NOT_FOUND,
        404
      );
    }

    return VideoSourceMapper.toDto(
      item
    );
  }

  async create(
    dto: CreateVideoSourceDto
  ) {
    const content =
      await this.contentRepository.findById(
        dto.contentId
      );

    if (!content) {
      throw new AppError(
        VIDEO_SOURCE_MESSAGES.CONTENT_NOT_FOUND,
        404
      );
    }

    if (dto.episodeId) {
      const episode =
        await this.episodeRepository.findById(
          dto.episodeId
        );

      if (!episode) {
        throw new AppError(
          VIDEO_SOURCE_MESSAGES.EPISODE_NOT_FOUND,
          404
        );
      }
    }

    if (dto.isDefault) {
      if (dto.episodeId) {
        await this.repository.clearDefaultForEpisode(
          dto.episodeId
        );
      } else {
        await this.repository.clearDefaultForContent(
          dto.contentId
        );
      }
    }

    const item =
      await this.repository.create({
        quality: dto.quality,
        url: dto.url,
        mimeType: dto.mimeType,
        fileSize: dto.fileSize,
        duration: dto.duration,
        bitrate: dto.bitrate,
        codec: dto.codec,
        isDefault:
          dto.isDefault ?? false,
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

    return VideoSourceMapper.toDto(
      item
    );
  }

  async update(
    id: string,
    dto: UpdateVideoSourceDto
  ) {
    const existing =
      await this.repository.findById(id);

    if (!existing) {
      throw new AppError(
        VIDEO_SOURCE_MESSAGES.NOT_FOUND,
        404
      );
    }

    if (dto.contentId) {
      const content =
        await this.contentRepository.findById(
          dto.contentId
        );

      if (!content) {
        throw new AppError(
          VIDEO_SOURCE_MESSAGES.CONTENT_NOT_FOUND,
          404
        );
      }
    }

    if (dto.episodeId) {
      const episode =
        await this.episodeRepository.findById(
          dto.episodeId
        );

      if (!episode) {
        throw new AppError(
          VIDEO_SOURCE_MESSAGES.EPISODE_NOT_FOUND,
          404
        );
      }
    }

    if (dto.isDefault) {
      if (dto.episodeId) {
        await this.repository.clearDefaultForEpisode(
          dto.episodeId
        );
      } else {
        await this.repository.clearDefaultForContent(
          dto.contentId ??
            existing.contentId
        );
      }
    }

    const updated =
      await this.repository.update(id, {
        quality: dto.quality,
        url: dto.url,
        mimeType: dto.mimeType,
        fileSize: dto.fileSize,
        duration: dto.duration,
        bitrate: dto.bitrate,
        codec: dto.codec,
        isDefault: dto.isDefault,
        ...(dto.contentId && {
          content: {
            connect: {
              id: dto.contentId,
            },
          },
        }),
        ...(dto.episodeId && {
          episode: {
            connect: {
              id: dto.episodeId,
            },
          },
        }),
      });

    return VideoSourceMapper.toDto(
      updated
    );
  }

  async delete(id: string) {
    const existing =
      await this.repository.findById(id);

    if (!existing) {
      throw new AppError(
        VIDEO_SOURCE_MESSAGES.NOT_FOUND,
        404
      );
    }

    await this.repository.delete(id);
  }
}