import type {
  Movie,
} from "@/generated/prisma/client";

import type {
  MovieResponseDto,
} from "@/server/dto";

export class MovieMapper {
  static toDto(
    movie: Movie
  ): MovieResponseDto {
    return {
      id: movie.id,
      contentId: movie.contentId,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  static toDtoList(
    movies: Movie[]
  ): MovieResponseDto[] {
    return movies.map((movie) =>
      this.toDto(movie)
    );
  }
}