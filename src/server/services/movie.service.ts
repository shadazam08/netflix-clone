import type { CreateMovieDto, MovieDetailsDto, UpdateMovieDto } from "@/server/dto";

import { AppError } from "@/server/lib";
import { MovieMapper } from "@/server/mappers";
import { MOVIE_MESSAGES } from "@/server/auth";

import { ContentType } from "@/generated/prisma/client";

import { ContentRepository, MovieRepository, prisma } from "@/server/repositories";

export class MovieService {
  async findAll(): Promise<MovieDetailsDto[]> {
    const movieRepository = new MovieRepository();

    const movies = await movieRepository.findAll();

    return MovieMapper.toDetailsDtoList(movies);
  }

  async findById(id: string): Promise<MovieDetailsDto> {
    const movieRepository = new MovieRepository();

    const movie = await movieRepository.findById(id);

    if (!movie) {
      throw new AppError(MOVIE_MESSAGES.NOT_FOUND, 404);
    }

    return MovieMapper.toDetailsDto(movie);
  }

  async create(dto: CreateMovieDto): Promise<MovieDetailsDto> {
    const slugRepository = new ContentRepository();

    const slugExists = await slugRepository.findBySlug(dto.slug);

    if (slugExists) {
      throw new AppError(MOVIE_MESSAGES.SLUG_EXISTS, 409);
    }

    const movie = await prisma.$transaction(async (tx) => {
      const contentRepository = new ContentRepository(tx);
      const movieRepository = new MovieRepository(tx);

      const content = await contentRepository.create({
        type: ContentType.MOVIE,

        title: dto.title,
        slug: dto.slug,
        description: dto.description,

        overview: dto.overview,
        tagline: dto.tagline,

        status: dto.status,
        visibility: dto.visibility,

        certification: dto.certification,

        releaseDate: dto.releaseDate,
        releaseYear: dto.releaseYear,
        duration: dto.duration,

        isFeatured: dto.isFeatured,
        isTrending: dto.isTrending,

        posterUrl: dto.posterUrl,
        bannerUrl: dto.bannerUrl,
        logoUrl: dto.logoUrl,
        thumbnailUrl: dto.thumbnailUrl,

        country: dto.countryId
          ? {
              connect: {
                id: dto.countryId,
              },
            }
          : undefined,

        studio: dto.studioId
          ? {
              connect: {
                id: dto.studioId,
              },
            }
          : undefined,
      });

      return movieRepository.create({
        content: {
          connect: {
            id: content.id,
          },
        },
      });
    });

    return MovieMapper.toDetailsDto(movie);
  }
  async update(id: string, dto: UpdateMovieDto): Promise<MovieDetailsDto> {
    const movieRepository = new MovieRepository();

    const existingMovie = await movieRepository.findById(id);

    if (!existingMovie) {
      throw new AppError(MOVIE_MESSAGES.NOT_FOUND, 404);
    }

    if (dto.slug && dto.slug !== existingMovie.content.slug) {
      const contentRepository = new ContentRepository();

      const slugExists = await contentRepository.findBySlug(dto.slug);

      if (slugExists && slugExists.id !== existingMovie.contentId) {
        throw new AppError(MOVIE_MESSAGES.SLUG_EXISTS, 409);
      }
    }

    const movie = await prisma.$transaction(async (tx) => {
      const contentRepository = new ContentRepository(tx);

      const movieRepository = new MovieRepository(tx);

      await contentRepository.update(existingMovie.contentId, {
        title: dto.title,

        slug: dto.slug,

        description: dto.description,

        overview: dto.overview,

        tagline: dto.tagline,

        status: dto.status,

        visibility: dto.visibility,

        certification: dto.certification,

        releaseDate: dto.releaseDate,

        releaseYear: dto.releaseYear,

        duration: dto.duration,

        isFeatured: dto.isFeatured,

        isTrending: dto.isTrending,

        posterUrl: dto.posterUrl,

        bannerUrl: dto.bannerUrl,

        logoUrl: dto.logoUrl,

        thumbnailUrl: dto.thumbnailUrl,

        country: dto.countryId
          ? {
              connect: {
                id: dto.countryId,
              },
            }
          : undefined,

        studio: dto.studioId
          ? {
              connect: {
                id: dto.studioId,
              },
            }
          : undefined,
      });

      return movieRepository.findById(id);
    });

    if (!movie) {
      throw new AppError(MOVIE_MESSAGES.NOT_FOUND, 404);
    }

    return MovieMapper.toDetailsDto(movie);
  }

  async delete(id: string): Promise<void> {
    const movieRepository = new MovieRepository();

    const movie = await movieRepository.findById(id);

    if (!movie) {
      throw new AppError(MOVIE_MESSAGES.NOT_FOUND, 404);
    }

    await prisma.$transaction(async (tx) => {
      const movieRepository = new MovieRepository(tx);

      const contentRepository = new ContentRepository(tx);

      await movieRepository.delete(id);

      await contentRepository.delete(movie.contentId);
    });
  }
}

export const movieService = new MovieService();
