import { Prisma } from "@/generated/prisma/client";

import { WatchHistoryResponseDto } from "@/server/dto";

type WatchHistoryWithRelations =
  Prisma.WatchHistoryGetPayload<{
    include: {
      profile: true;
      content: true;
      episode: true;
    };
  }>;

export class WatchHistoryMapper {
  static toDto(
    watchHistory: WatchHistoryWithRelations
  ): WatchHistoryResponseDto {
    return {
      id: watchHistory.id,
      profileId: watchHistory.profileId,
      contentId: watchHistory.contentId,
      episodeId: watchHistory.episodeId,
      watchedSeconds:
        watchHistory.watchedSeconds,
      completed:
        watchHistory.completed,
      createdAt:
        watchHistory.createdAt,
      updatedAt:
        watchHistory.updatedAt,
    };
  }

  static toDtoList(
    watchHistories: WatchHistoryWithRelations[]
  ): WatchHistoryResponseDto[] {
    return watchHistories.map(
      (watchHistory) =>
        this.toDto(
          watchHistory
        )
    );
  }
}