import type { VideoSource } from "@/generated/prisma/client";

import type { VideoSourceResponseDto } from "@/server/dto";

export class VideoSourceMapper {
  static toDto(videoSource: VideoSource): VideoSourceResponseDto {
    return {
      id: videoSource.id,
      contentId: videoSource.contentId,
      episodeId: videoSource.episodeId,
      quality: videoSource.quality,
      url: videoSource.url,
      mimeType: videoSource.mimeType,
      fileSize: videoSource.fileSize,
      duration: videoSource.duration,
      bitrate: videoSource.bitrate,
      codec: videoSource.codec,
      isDefault: videoSource.isDefault,
      createdAt: videoSource.createdAt,
      updatedAt: videoSource.updatedAt,
    };
  }

  static toDtoList(videoSources: VideoSource[]): VideoSourceResponseDto[] {
    return videoSources.map((videoSource) => this.toDto(videoSource));
  }
}
