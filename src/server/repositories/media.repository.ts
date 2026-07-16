import { Prisma } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type MediaWithContent = Prisma.MediaGetPayload<{
  include: {
    content: true;
  };
}>;

export class MediaRepository extends BaseRepository {
  async findById(
    id: string
  ): Promise<MediaWithContent | null> {
    return this.db.media.findUnique({
      where: { id },
      include: {
        content: true,
      },
    });
  }

  async findByContentId(
    contentId: string
  ): Promise<MediaWithContent[]> {
    return this.db.media.findMany({
      where: {
        contentId,
      },
      include: {
        content: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async create(
    data: Prisma.MediaCreateInput
  ): Promise<MediaWithContent> {
    return this.db.media.create({
      data,
      include: {
        content: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.MediaUpdateInput
  ): Promise<MediaWithContent> {
    return this.db.media.update({
      where: { id },
      data,
      include: {
        content: true,
      },
    });
  }

  async delete(id: string) {
    return this.db.media.delete({
      where: { id },
    });
  }
}