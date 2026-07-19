import type { Season } from "@/generated/prisma/client";

import type { SeasonResponseDto } from "@/server/dto";

export class SeasonMapper {
  static toDto(season: Season): SeasonResponseDto {
    return {
      id: season.id,
      tvShowId: season.tvShowId,
      seasonNumber: season.seasonNo,
      title: season.title,
      createdAt: season.createdAt,
      updatedAt: season.updatedAt,
    };
  }

  static toDtoList(seasons: Season[]): SeasonResponseDto[] {
    return seasons.map((season) => this.toDto(season));
  }
}
