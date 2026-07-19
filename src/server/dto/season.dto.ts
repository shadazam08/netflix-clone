export interface SeasonResponseDto {
  id: string;
  tvShowId: string;
  seasonNumber: number;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSeasonDto {
  tvShowId: string;
  seasonNumber: number;
  title?: string | null;
}

export type UpdateSeasonDto =
  Partial<CreateSeasonDto>;