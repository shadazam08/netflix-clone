import { GENRE_MESSAGES } from "@/server/auth";
import type {
  CreateGenreDto,
  UpdateGenreDto,
} from "@/server/dto";
import { AppError } from "@/server/lib";
import { GenreRepository } from "@/server/repositories";

export class GenreService {
  private readonly genres = new GenreRepository();

  async getAll() {
    return this.genres.findAll();
  }

  async getById(id: string) {
    const genre = await this.genres.findById(id);

    if (!genre) {
      throw new AppError(
        GENRE_MESSAGES.NOT_FOUND,
        404
      );
    }

    return genre;
  }

  async create(data: CreateGenreDto) {
    const existing = await this.genres.findBySlug(
      data.slug
    );

    if (existing) {
      throw new AppError(
        GENRE_MESSAGES.SLUG_EXISTS,
        409
      );
    }

    return this.genres.create(data);
  }

  async update(
    id: string,
    data: UpdateGenreDto
  ) {
    const existing = await this.getById(id);

    if (
      data.slug &&
      data.slug !== existing.slug
    ) {
      const slugExists =
        await this.genres.findBySlug(
          data.slug
        );

      if (slugExists) {
        throw new AppError(
          GENRE_MESSAGES.SLUG_EXISTS,
          409
        );
      }
    }

    return this.genres.update(id, data);
  }

  async delete(id: string) {
    await this.getById(id);

    return this.genres.delete(id);
  }
}