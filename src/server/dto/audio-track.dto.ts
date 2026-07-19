import type { AudioType, LanguageCode } from "@/generated/prisma/client";

export interface AudioTrackResponseDto {
  id: string;
  contentId: string;
  language: LanguageCode;
  type: AudioType;
  url: string;
  createdAt: Date;
}

export interface CreateAudioTrackDto {
  contentId: string;
  language: LanguageCode;
  type: AudioType;
  url: string;
}

export type UpdateAudioTrackDto = Partial<CreateAudioTrackDto>;
