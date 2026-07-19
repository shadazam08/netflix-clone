import { SUBTITLE_MESSAGES } from "@/server/auth";

import { AppError } from "@/server/lib";

import { SubtitleMapper } from "@/server/mappers";

import { ContentRepository, SubtitleRepository } from "@/server/repositories";

import type { CreateSubtitleDto, UpdateSubtitleDto } from "@/server/dto";

export class SubtitleService {
  private readonly repository = new SubtitleRepository();

  private readonly contentRepository = new ContentRepository();

  async findAll() {
    const subtitles = await this.repository.findAll();

    return SubtitleMapper.toDtoList(subtitles);
  }

  async findById(id: string) {
    const subtitle = await this.repository.findById(id);

    if (!subtitle) {
      throw new AppError(SUBTITLE_MESSAGES.NOT_FOUND, 404);
    }

    return SubtitleMapper.toDto(subtitle);
  }

  async create(dto: CreateSubtitleDto) {
    const content = await this.contentRepository.findById(dto.contentId);

    if (!content) {
      throw new AppError(SUBTITLE_MESSAGES.CONTENT_NOT_FOUND, 404);
    }

    const subtitle = await this.repository.create({
      language: dto.language,
      format: dto.format,
      url: dto.url,
      content: {
        connect: {
          id: dto.contentId,
        },
      },
    });

    return SubtitleMapper.toDto(subtitle);
  }

  async update(id: string, dto: UpdateSubtitleDto) {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new AppError(SUBTITLE_MESSAGES.NOT_FOUND, 404);
    }

    if (dto.contentId) {
      const content = await this.contentRepository.findById(dto.contentId);

      if (!content) {
        throw new AppError(SUBTITLE_MESSAGES.CONTENT_NOT_FOUND, 404);
      }
    }

    const subtitle = await this.repository.update(id, {
      language: dto.language,
      format: dto.format,
      url: dto.url,
      ...(dto.contentId && {
        content: {
          connect: {
            id: dto.contentId,
          },
        },
      }),
    });

    return SubtitleMapper.toDto(subtitle);
  }

  async delete(id: string) {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new AppError(SUBTITLE_MESSAGES.NOT_FOUND, 404);
    }

    await this.repository.delete(id);
  }
}
