import { LanguageCode } from "@/generated/prisma/client";

export interface LanguageResponseDto {
  id: string;
  name: string;
  code: LanguageCode;
}

export interface CreateLanguageDto {
  name: string;
  code: LanguageCode;
}

export type UpdateLanguageDto =
  Partial<CreateLanguageDto>;