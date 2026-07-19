import type { VideoQuality } from "@/generated/prisma/client";

export interface VideoSourceResponseDto {
  id: string;
  contentId: string;
  episodeId: string | null;
  quality: VideoQuality;
  url: string;
  mimeType: string;
  fileSize: bigint | null;
  duration: number;
  bitrate: number | null;
  codec: string | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVideoSourceDto {
  contentId: string;
  episodeId?: string | null;
  quality: VideoQuality;
  url: string;
  mimeType: string;
  fileSize?: bigint | null;
  duration: number;
  bitrate?: number | null;
  codec?: string | null;
  isDefault?: boolean;
}

export type UpdateVideoSourceDto = Partial<CreateVideoSourceDto>;
