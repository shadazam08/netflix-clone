import { Prisma } from "@/generated/prisma/client";

import { PlaybackProgressResponseDto } from "@/server/dto";

type PlaybackProgressWithRelations = Prisma.PlaybackProgressGetPayload<{
  include: {
    profile: true;
    content: true;
    episode: true;
  };
}>;

export class PlaybackProgressMapper {
  static toDto(playbackProgress: PlaybackProgressWithRelations): PlaybackProgressResponseDto {
    return {
      id: playbackProgress.id,
      profileId: playbackProgress.profileId,
      contentId: playbackProgress.contentId,
      episodeId: playbackProgress.episodeId,
      watchedSeconds: playbackProgress.watchedSeconds,
      completed: playbackProgress.completed,
      lastPlayedAt: playbackProgress.lastPlayedAt,
      createdAt: playbackProgress.createdAt,
      updatedAt: playbackProgress.updatedAt,
    };
  }

  static toDtoList(playbackProgressList: PlaybackProgressWithRelations[]): PlaybackProgressResponseDto[] {
    return playbackProgressList.map((playbackProgress) => this.toDto(playbackProgress));
  }
}
