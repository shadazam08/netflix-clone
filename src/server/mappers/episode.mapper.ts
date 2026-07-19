import type {
  Episode,
} from "@/generated/prisma/client";

import type {
  EpisodeResponseDto,
} from "@/server/dto";

export class EpisodeMapper {
  static toDto(
    episode: Episode
  ): EpisodeResponseDto {
    return {
      id: episode.id,
      seasonId: episode.seasonId,
      episodeNumber: episode.episodeNo,
      title: episode.title,
      duration: episode.duration,
      createdAt: episode.createdAt,
      updatedAt: episode.updatedAt,
    };
  }

  static toDtoList(
    episodes: Episode[]
  ): EpisodeResponseDto[] {
    return episodes.map((episode) =>
      this.toDto(episode)
    );
  }
}