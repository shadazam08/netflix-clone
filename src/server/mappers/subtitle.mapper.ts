import type {
  Subtitle,
} from "@/generated/prisma/client";

import type {
  SubtitleResponseDto,
} from "@/server/dto";

export class SubtitleMapper {
  static toDto(
    subtitle: Subtitle
  ): SubtitleResponseDto {
    return {
      id: subtitle.id,
      contentId: subtitle.contentId,
      language: subtitle.language,
      format: subtitle.format,
      url: subtitle.url,
      createdAt: subtitle.createdAt,
    };
  }

  static toDtoList(
    subtitles: Subtitle[]
  ): SubtitleResponseDto[] {
    return subtitles.map((subtitle) =>
      this.toDto(subtitle)
    );
  }
}