export interface SeasonResponseDto {
  id: string;
  tvShowId: string;
  seasonNumber: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSeasonDto {
  tvShowId: string;
  seasonNumber: number;
  title?: string;
}

export type UpdateSeasonDto =
  Partial<CreateSeasonDto>;