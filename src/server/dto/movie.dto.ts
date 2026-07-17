export interface MovieResponseDto {
  id: string;
  contentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMovieDto {
  contentId: string;
}

export type UpdateMovieDto =
  Partial<CreateMovieDto>;