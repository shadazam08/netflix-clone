import { AppError } from "@/server/lib";

import { STUDIO_MESSAGES } from "@/server/auth";

import { StudioMapper } from "@/server/mappers";

import type { CreateStudioDto, UpdateStudioDto } from "@/server/dto";

import { StudioRepository } from "@/server/repositories";

export class StudioService {
  private readonly repository = new StudioRepository();

  async findAll() {
    const studios = await this.repository.findAll();

    return StudioMapper.toDtoList(studios);
  }

  async findById(id: string) {
    const studio = await this.repository.findById(id);

    if (!studio) {
      throw new AppError(STUDIO_MESSAGES.NOT_FOUND, 404);
    }

    return StudioMapper.toDto(studio);
  }

  async create(dto: CreateStudioDto) {
    const existingName = await this.repository.findByName(dto.name);

    if (existingName) {
      throw new AppError(STUDIO_MESSAGES.NAME_EXISTS, 409);
    }

    const existingSlug = await this.repository.findBySlug(dto.slug);

    if (existingSlug) {
      throw new AppError(STUDIO_MESSAGES.SLUG_EXISTS, 409);
    }

    const studio = await this.repository.create(dto);

    return StudioMapper.toDto(studio);
  }

  async update(id: string, dto: UpdateStudioDto) {
    const studio = await this.repository.findById(id);

    if (!studio) {
      throw new AppError(STUDIO_MESSAGES.NOT_FOUND, 404);
    }

    if (dto.name && dto.name !== studio.name) {
      const existingName = await this.repository.findByName(dto.name);

      if (existingName) {
        throw new AppError(STUDIO_MESSAGES.NAME_EXISTS, 409);
      }
    }

    if (dto.slug && dto.slug !== studio.slug) {
      const existingSlug = await this.repository.findBySlug(dto.slug);

      if (existingSlug) {
        throw new AppError(STUDIO_MESSAGES.SLUG_EXISTS, 409);
      }
    }

    const updated = await this.repository.update(id, dto);

    return StudioMapper.toDto(updated);
  }

  async delete(id: string) {
    const studio = await this.repository.findById(id);

    if (!studio) {
      throw new AppError(STUDIO_MESSAGES.NOT_FOUND, 404);
    }

    await this.repository.delete(id);
  }
}
