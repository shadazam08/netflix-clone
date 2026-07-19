import { Prisma } from "@/generated/prisma/client";

import { ContinueWatchingResponseDto } from "@/server/dto";

type ContinueWatchingWithRelations =
  Prisma.ContinueWatchingGetPayload<{
    include: {
      profile: true;
      content: true;
      episode: true;
    };
  }>;

export class ContinueWatchingMapper {
  static toDto(
    continueWatching: ContinueWatchingWithRelations
  ): ContinueWatchingResponseDto {
    return {
      profileId:
        continueWatching.profileId,
      contentId:
        continueWatching.contentId,
      episodeId:
        continueWatching.episodeId,
      currentSecond:
        continueWatching.currentSecond,
      updatedAt:
        continueWatching.updatedAt,
    };
  }

  static toDtoList(
    continueWatchingList: ContinueWatchingWithRelations[]
  ): ContinueWatchingResponseDto[] {
    return continueWatchingList.map(
      (continueWatching) =>
        this.toDto(
          continueWatching
        )
    );
  }
}