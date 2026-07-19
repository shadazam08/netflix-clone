import { Prisma, type Rating } from "@/generated/prisma/client";
import { BaseRepository } from "./base.repository";

export type RatingModel = Rating;

export class RatingRepository extends BaseRepository {
  async findAll(): Promise<RatingModel[]> {
    return this.db.rating.findMany({
      include: {
        profile: true,
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(profileId: string, contentId: string): Promise<RatingModel | null> {
    return this.db.rating.findUnique({
      where: {
        profileId_contentId: {
          profileId,
          contentId,
        },
      },
      include: {
        profile: true,
        content: true,
      },
    });
  }

  async create(data: Prisma.RatingCreateInput): Promise<RatingModel> {
    return this.db.rating.create({
      data,
      include: {
        profile: true,
        content: true,
      },
    });
  }

  async update(profileId: string, contentId: string, data: Prisma.RatingUpdateInput): Promise<RatingModel> {
    return this.db.rating.update({
      where: {
        profileId_contentId: {
          profileId,
          contentId,
        },
      },
      data,
      include: {
        profile: true,
        content: true,
      },
    });
  }

  async delete(profileId: string, contentId: string): Promise<RatingModel> {
    return this.db.rating.delete({
      where: {
        profileId_contentId: {
          profileId,
          contentId,
        },
      },
    });
  }
}
