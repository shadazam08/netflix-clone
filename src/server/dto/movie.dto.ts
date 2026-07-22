import type { Certification, ContentStatus, ContentVisibility } from "@/generated/prisma/client";

export interface MovieResponseDto {
  id: string;
  contentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieDetailsDto {
  id: string;
  contentId: string;

  title: string;
  slug: string;

  description: string;
  overview: string | null;
  tagline: string | null;

  status: ContentStatus;
  visibility: ContentVisibility;
  certification: Certification;

  releaseDate: Date | null;
  releaseYear: number | null;
  duration: number | null;

  isFeatured: boolean;
  isTrending: boolean;

  posterUrl: string | null;
  bannerUrl: string | null;
  logoUrl: string | null;
  thumbnailUrl: string | null;

  countryId: string | null;
  studioId: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMovieDto {
  title: string;
  slug: string;

  description: string;
  overview?: string | null;
  tagline?: string | null;

  status: ContentStatus;
  visibility: ContentVisibility;
  certification: Certification;

  releaseDate?: Date | null;
  releaseYear?: number | null;
  duration?: number | null;

  isFeatured: boolean;
  isTrending: boolean;

  posterUrl?: string | null;
  bannerUrl?: string | null;
  logoUrl?: string | null;
  thumbnailUrl?: string | null;

  countryId?: string | null;
  studioId?: string | null;
}

export type UpdateMovieDto = Partial<CreateMovieDto>;
