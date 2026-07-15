import { Prisma } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type ContentWithRelations = Prisma.ContentGetPayload<{
  include: {
    categoryLinks: {
      include: {
        category: true;
      };
    };
    genreLinks: {
      include: {
        genre: true;
      };
    };
    languages: {
      include: {
        language: true;
      };
    };
    media: true;
    movie: true;
    tvShow: true;
  };
}>;

export class ContentRepository extends BaseRepository {
  async findById(id: string): Promise<ContentWithRelations | null> {
    return this.db.content.findUnique({
      where: { id },
      include: {
        categoryLinks: {
          include: {
            category: true,
          },
        },
        genreLinks: {
          include: {
            genre: true,
          },
        },
        languages: {
          include: {
            language: true,
          },
        },
        media: true,
        movie: true,
        tvShow: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<ContentWithRelations | null> {
    return this.db.content.findUnique({
      where: { slug },
      include: {
        categoryLinks: {
          include: {
            category: true,
          },
        },
        genreLinks: {
          include: {
            genre: true,
          },
        },
        languages: {
          include: {
            language: true,
          },
        },
        media: true,
        movie: true,
        tvShow: true,
      },
    });
  }

  async findAll(): Promise<ContentWithRelations[]> {
    return this.db.content.findMany({
      include: {
        categoryLinks: {
          include: {
            category: true,
          },
        },
        genreLinks: {
          include: {
            genre: true,
          },
        },
        languages: {
          include: {
            language: true,
          },
        },
        media: true,
        movie: true,
        tvShow: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
