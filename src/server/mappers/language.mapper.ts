import type { Language } from "@/generated/prisma/client";

import type { LanguageResponseDto } from "@/server/dto";

export class LanguageMapper {
  static toDto(
    language: Language
  ): LanguageResponseDto {
    return {
      id: language.id,
      name: language.name,
      code: language.code,
    };
  }

  static toDtoList(
    languages: Language[]
  ): LanguageResponseDto[] {
    return languages.map((language) =>
      this.toDto(language)
    );
  }
}