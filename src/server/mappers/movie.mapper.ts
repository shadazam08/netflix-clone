import type { Prisma } from "@/generated/prisma/client";

import type { MovieDetailsDto, MovieResponseDto } from "@/server/dto";

type MovieWithContent = Prisma.MovieGetPayload<{
  include: {
    content: true;
  };
}>;

export class MovieMapper {
  static toDto(movie: MovieWithContent): MovieResponseDto {
    return {
      id: movie.id,
      contentId: movie.contentId,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  static toDetailsDto(movie: MovieWithContent): MovieDetailsDto {
    return {
      id: movie.id,
      contentId: movie.contentId,

      title: movie.content.title,
      slug: movie.content.slug,

      description: movie.content.description,

      overview: movie.content.overview,

      tagline: movie.content.tagline,

      status: movie.content.status,

      visibility: movie.content.visibility,

      certification: movie.content.certification,

      releaseDate: movie.content.releaseDate,

      releaseYear: movie.content.releaseYear,

      duration: movie.content.duration,

      isFeatured: movie.content.isFeatured,

      isTrending: movie.content.isTrending,

      posterUrl: movie.content.posterUrl,

      bannerUrl: movie.content.bannerUrl,

      logoUrl: movie.content.logoUrl,

      thumbnailUrl: movie.content.thumbnailUrl,

      countryId: movie.content.countryId,

      studioId: movie.content.studioId,

      createdAt: movie.createdAt,

      updatedAt: movie.updatedAt,
    };
  }

  static toDtoList(movies: MovieWithContent[]): MovieResponseDto[] {
    return movies.map((movie) => this.toDto(movie));
  }

  static toDetailsDtoList(movies: MovieWithContent[]): MovieDetailsDto[] {
    return movies.map((movie) => this.toDetailsDto(movie));
  }
}
