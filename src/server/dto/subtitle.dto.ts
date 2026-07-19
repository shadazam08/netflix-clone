import type { LanguageCode, SubtitleFormat } from "@/generated/prisma/client";

export interface SubtitleResponseDto {
  id: string;
  contentId: string;
  language: LanguageCode;
  format: SubtitleFormat;
  url: string;
  createdAt: Date;
}

export interface CreateSubtitleDto {
  contentId: string;
  language: LanguageCode;
  format: SubtitleFormat;
  url: string;
}

export type UpdateSubtitleDto = Partial<CreateSubtitleDto>;
