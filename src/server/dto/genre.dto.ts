export interface GenreResponseDto {
  id: string;
  name: string;
  slug: string;
}

export interface CreateGenreDto {
  name: string;
  slug: string;
}

export type UpdateGenreDto =
  Partial<CreateGenreDto>;