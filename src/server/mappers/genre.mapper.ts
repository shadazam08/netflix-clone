import type { GenreResponseDto } from "@/server/dto";
import type { GenreModel } from "@/server/repositories";

export class GenreMapper {
  static toResponse(
    genre: GenreModel
  ): GenreResponseDto {
    return {
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
    };
  }

  static toResponseList(
    genres: GenreModel[]
  ): GenreResponseDto[] {
    return genres.map((genre) =>
      this.toResponse(genre)
    );
  }
}