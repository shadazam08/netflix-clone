import { Prisma, type Genre } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type GenreModel = Genre;

export class GenreRepository extends BaseRepository {
  async findAll(): Promise<GenreModel[]> {
    return this.db.genre.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string): Promise<GenreModel | null> {
    return this.db.genre.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<GenreModel | null> {
    return this.db.genre.findUnique({
      where: { slug },
    });
  }

  async create(data: Prisma.GenreCreateInput): Promise<GenreModel> {
    return this.db.genre.create({
      data,
    });
  }

  async update(id: string, data: Prisma.GenreUpdateInput): Promise<GenreModel> {
    return this.db.genre.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<GenreModel> {
    return this.db.genre.delete({
      where: { id },
    });
  }
}
