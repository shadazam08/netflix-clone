export interface ContentResponseDto {
  id: string;
  title: string;
  slug: string;
  description: string;

  type: string;
  status: string;
  visibility: string;

  certification: string;

  releaseDate: Date | null;
  duration: number | null;

  isFeatured: boolean;
  isTrending: boolean;

  poster: string | null;
  banner: string | null;
}

export interface CreateContentDto {
  title: string;
  slug: string;
  description: string;

  type: "MOVIE" | "TV_SHOW";
  visibility: "PUBLIC" | "PREMIUM";

  certification: "U" | "UA7" | "UA13" | "UA16" | "A";

  releaseDate?: Date;
  duration?: number;
}

export type UpdateContentDto = Partial<CreateContentDto>