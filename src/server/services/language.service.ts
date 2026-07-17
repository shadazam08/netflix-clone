import { LanguageCode } from "@/generated/prisma/client";

import { CreateLanguageDto, LanguageResponseDto, UpdateLanguageDto } from "@/server/dto";
import { LanguageMapper } from "@/server/mappers";
import { LanguageRepository } from "@/server/repositories";
import { LANGUAGE_MESSAGES } from "@/server/auth";

export class LanguageService {
  private readonly languages = new LanguageRepository();

  async getAll(): Promise<LanguageResponseDto[]> {
    const languages = await this.languages.findAll();

    return LanguageMapper.toDtoList(languages);
  }

  async getById(id: string): Promise<LanguageResponseDto> {
    const language = await this.languages.findById(id);

    if (!language) {
      throw new Error(LANGUAGE_MESSAGES.NOT_FOUND);
    }

    return LanguageMapper.toDto(language);
  }

  async create(dto: CreateLanguageDto): Promise<LanguageResponseDto> {
    const existing = await this.languages.findByCode(dto.code);

    if (existing) {
      throw new Error(LANGUAGE_MESSAGES.CODE_ALREADY_EXISTS);
    }

    const language = await this.languages.create({
      name: dto.name,
      code: dto.code,
    });

    return LanguageMapper.toDto(language);
  }

  async update(id: string, dto: UpdateLanguageDto): Promise<LanguageResponseDto> {
    await this.getById(id);

    if (dto.code) {
      const existing = await this.languages.findByCode(dto.code as LanguageCode);

      if (existing && existing.id !== id) {
        throw new Error(LANGUAGE_MESSAGES.CODE_ALREADY_EXISTS);
      }
    }

    const language = await this.languages.update(id, dto);

    return LanguageMapper.toDto(language);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);

    await this.languages.delete(id);
  }
}
