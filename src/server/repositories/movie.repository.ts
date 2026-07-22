import { Prisma } from "@/generated/prisma/client";
import { BaseRepository } from "./base.repository";

export type MovieWithContent = Prisma.MovieGetPayload<{
  include: {
    content: true;
  };
}>;

export class MovieRepository extends BaseRepository {
  constructor(db = undefined as ConstructorParameters<typeof BaseRepository>[0]) {
    super(db);
  }

  async findAll(): Promise<MovieWithContent[]> {
    return this.db.movie.findMany({
      include: {
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<MovieWithContent | null> {
    return this.db.movie.findUnique({
      where: {
        id,
      },
      include: {
        content: true,
      },
    });
  }

  async findByContentId(contentId: string): Promise<MovieWithContent | null> {
    return this.db.movie.findUnique({
      where: {
        contentId,
      },
      include: {
        content: true,
      },
    });
  }

  async create(data: Prisma.MovieCreateInput): Promise<MovieWithContent> {
    return this.db.movie.create({
      data,
      include: {
        content: true,
      },
    });
  }

  async update(id: string, data: Prisma.MovieUpdateInput): Promise<MovieWithContent> {
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

  async delete(id: string) {
    return this.db.movie.delete({
      where: {
        id,
      },
    });
  }
}
