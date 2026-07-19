import type { TvShow } from "@/generated/prisma/client";

import type { TvShowResponseDto } from "@/server/dto";

export class TvShowMapper {
  static toDto(tvShow: TvShow): TvShowResponseDto {
    return {
      id: tvShow.id,
      contentId: tvShow.contentId,
      createdAt: tvShow.createdAt,
      updatedAt: tvShow.updatedAt,
    };
  }

  static toDtoList(tvShows: TvShow[]): TvShowResponseDto[] {
    return tvShows.map((tvShow) => this.toDto(tvShow));
  }
}
