export interface EpisodeResponseDto {
  id: string;
  seasonId: string;
  episodeNumber: number;
  title: string;
  duration: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEpisodeDto {
  seasonId: string;
  episodeNumber: number;
  title: string;
  duration?: number | null;
}

export type UpdateEpisodeDto =
  Partial<CreateEpisodeDto>;