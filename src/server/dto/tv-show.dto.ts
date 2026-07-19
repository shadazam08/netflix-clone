export interface TvShowResponseDto {
  id: string;
  contentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTvShowDto {
  contentId: string;
}

export type UpdateTvShowDto =
  Partial<CreateTvShowDto>;