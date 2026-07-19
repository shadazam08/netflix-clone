import { TV_SHOW_MESSAGES } from "@/server/auth";

import { AppError } from "@/server/lib";

import { TvShowMapper } from "@/server/mappers";

import { ContentRepository, TvShowRepository } from "@/server/repositories";

import type { CreateTvShowDto, UpdateTvShowDto } from "@/server/dto";

export class TvShowService {
  private readonly repository = new TvShowRepository();

  private readonly contentRepository = new ContentRepository();

  async findAll() {
    const tvShows = await this.repository.findAll();

    return TvShowMapper.toDtoList(tvShows);
  }

  async findById(id: string) {
    const tvShow = await this.repository.findById(id);

    if (!tvShow) {
      throw new AppError(TV_SHOW_MESSAGES.NOT_FOUND, 404);
    }

    return TvShowMapper.toDto(tvShow);
  }

  async create(dto: CreateTvShowDto) {
    const content = await this.contentRepository.findById(dto.contentId);

    if (!content) {
      throw new AppError(TV_SHOW_MESSAGES.CONTENT_NOT_FOUND, 404);
    }

    const existing = await this.repository.findByContentId(dto.contentId);

    if (existing) {
      throw new AppError(TV_SHOW_MESSAGES.CONTENT_ALREADY_ASSIGNED, 409);
    }

    const tvShow = await this.repository.create({
      content: {
        connect: {
          id: dto.contentId,
        },
      },
    });

    return TvShowMapper.toDto(tvShow);
  }

  async update(id: string, dto: UpdateTvShowDto) {
    const tvShow = await this.repository.findById(id);

    if (!tvShow) {
      throw new AppError(TV_SHOW_MESSAGES.NOT_FOUND, 404);
    }

    let data = {};

    if (dto.contentId && dto.contentId !== tvShow.contentId) {
      const content = await this.contentRepository.findById(dto.contentId);

      if (!content) {
        throw new AppError(TV_SHOW_MESSAGES.CONTENT_NOT_FOUND, 404);
      }

      const existing = await this.repository.findByContentId(dto.contentId);

      if (existing && existing.id !== tvShow.id) {
        throw new AppError(TV_SHOW_MESSAGES.CONTENT_ALREADY_ASSIGNED, 409);
      }

      data = {
        content: {
          connect: {
            id: dto.contentId,
          },
        },
      };
    }

    const updated = await this.repository.update(id, data);

    return TvShowMapper.toDto(updated);
  }

  async delete(id: string) {
    const tvShow = await this.repository.findById(id);

    if (!tvShow) {
      throw new AppError(TV_SHOW_MESSAGES.NOT_FOUND, 404);
    }

    await this.repository.delete(id);
  }
}
