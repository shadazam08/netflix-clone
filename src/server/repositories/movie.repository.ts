import { Prisma, type Movie } from "@/generated/prisma/client";
import { BaseRepository } from "./base.repository";

export type MovieModel = Movie;

export class MovieRepository extends BaseRepository {
  async findAll(): Promise<MovieModel[]> {
    return this.db.movie.findMany({
      include: {
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<MovieModel | null> {
    return this.db.movie.findUnique({
      where: {
        id,
      },
      include: {
        content: true,
      },
    });
  }

  async findByContentId(contentId: string): Promise<MovieModel | null> {
    return this.db.movie.findUnique({
      where: {
        contentId,
      },
      include: {
        content: true,
      },
    });
  }

  async create(data: Prisma.MovieCreateInput): Promise<MovieModel> {
    return this.db.movie.create({
      data,
      include: {
        content: true,
      },
    });
  }

  async update(id: string, data: Prisma.MovieUpdateInput): Promise<MovieModel> {
    return this.db.movie.update({
      where: {
        id,
      },
      data,
      include: {
        content: true,
      },
    });
  }

  async delete(id: string): Promise<MovieModel> {
    return this.db.movie.delete({
      where: {
        id,
      },
    });
  }
}
