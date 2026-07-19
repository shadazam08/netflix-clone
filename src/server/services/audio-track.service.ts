import {
  AUDIO_TRACK_MESSAGES,
} from "@/server/auth";

import {
  AppError,
} from "@/server/lib";

import {
  AudioTrackMapper,
} from "@/server/mappers";

import {
  AudioTrackRepository,
  ContentRepository,
} from "@/server/repositories";

import type {
  CreateAudioTrackDto,
  UpdateAudioTrackDto,
} from "@/server/dto";

export class AudioTrackService {
  private readonly repository =
    new AudioTrackRepository();

  private readonly contentRepository =
    new ContentRepository();

  async findAll() {
    const audioTracks =
      await this.repository.findAll();

    return AudioTrackMapper.toDtoList(
      audioTracks
    );
  }

  async findById(id: string) {
    const audioTrack =
      await this.repository.findById(
        id
      );

    if (!audioTrack) {
      throw new AppError(
        AUDIO_TRACK_MESSAGES.NOT_FOUND,
        404
      );
    }

    return AudioTrackMapper.toDto(
      audioTrack
    );
  }

  async create(
    dto: CreateAudioTrackDto
  ) {
    const content =
      await this.contentRepository.findById(
        dto.contentId
      );

    if (!content) {
      throw new AppError(
        AUDIO_TRACK_MESSAGES.CONTENT_NOT_FOUND,
        404
      );
    }

    const audioTrack =
      await this.repository.create({
        language: dto.language,
        type: dto.type,
        url: dto.url,
        content: {
          connect: {
            id: dto.contentId,
          },
        },
      });

    return AudioTrackMapper.toDto(
      audioTrack
    );
  }

  async update(
    id: string,
    dto: UpdateAudioTrackDto
  ) {
    const existing =
      await this.repository.findById(
        id
      );

    if (!existing) {
      throw new AppError(
        AUDIO_TRACK_MESSAGES.NOT_FOUND,
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
          AUDIO_TRACK_MESSAGES.CONTENT_NOT_FOUND,
          404
        );
      }
    }

    const audioTrack =
      await this.repository.update(id, {
        language: dto.language,
        type: dto.type,
        url: dto.url,
        ...(dto.contentId && {
          content: {
            connect: {
              id: dto.contentId,
            },
          },
        }),
      });

    return AudioTrackMapper.toDto(
      audioTrack
    );
  }

  async delete(id: string) {
    const existing =
      await this.repository.findById(
        id
      );

    if (!existing) {
      throw new AppError(
        AUDIO_TRACK_MESSAGES.NOT_FOUND,
        404
      );
    }

    await this.repository.delete(id);
  }
}