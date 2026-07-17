import {
  MOVIE_MESSAGES,
} from "@/server/auth";

import {
  AppError,
} from "@/server/lib";

import {
  MovieMapper,
} from "@/server/mappers";

import {
  MovieRepository,
  ContentRepository,
} from "@/server/repositories";

import type {
  CreateMovieDto,
  UpdateMovieDto,
} from "@/server/dto";

export class MovieService {
  private readonly repository =
    new MovieRepository();

  private readonly contentRepository =
    new ContentRepository();

  async findAll() {
    const movies =
      await this.repository.findAll();

    return MovieMapper.toDtoList(
      movies
    );
  }

  async findById(id: string) {
    const movie =
      await this.repository.findById(id);

    if (!movie) {
      throw new AppError(
        MOVIE_MESSAGES.NOT_FOUND,
        404
      );
    }

    return MovieMapper.toDto(movie);
  }

  async create(
    dto: CreateMovieDto
  ) {
    const content =
      await this.contentRepository.findById(
        dto.contentId
      );

    if (!content) {
      throw new AppError(
        MOVIE_MESSAGES.CONTENT_NOT_FOUND,
        404
      );
    }

    const existing =
      await this.repository.findByContentId(
        dto.contentId
      );

    if (existing) {
      throw new AppError(
        MOVIE_MESSAGES.CONTENT_ALREADY_ASSIGNED,
        409
      );
    }

    const movie =
      await this.repository.create({
        content: {
          connect: {
            id: dto.contentId,
          },
        },
      });

    return MovieMapper.toDto(movie);
  }

  async update(
    id: string,
    dto: UpdateMovieDto
  ) {
    const movie =
      await this.repository.findById(id);

    if (!movie) {
      throw new AppError(
        MOVIE_MESSAGES.NOT_FOUND,
        404
      );
    }

    let data = {};

    if (
      dto.contentId &&
      dto.contentId !==
        movie.contentId
    ) {
      const content =
        await this.contentRepository.findById(
          dto.contentId
        );

      if (!content) {
        throw new AppError(
          MOVIE_MESSAGES.CONTENT_NOT_FOUND,
          404
        );
      }

      const existing =
        await this.repository.findByContentId(
          dto.contentId
        );

      if (
        existing &&
        existing.id !== movie.id
      ) {
        throw new AppError(
          MOVIE_MESSAGES.CONTENT_ALREADY_ASSIGNED,
          409
        );
      }

      data = {
        content: {
          connect: {
            id: dto.contentId,
          },
        },
      };
    }

    const updated =
      await this.repository.update(
        id,
        data
      );

    return MovieMapper.toDto(
      updated
    );
  }

  async delete(id: string) {
    const movie =
      await this.repository.findById(id);

    if (!movie) {
      throw new AppError(
        MOVIE_MESSAGES.NOT_FOUND,
        404
      );
    }

    await this.repository.delete(id);
  }
}