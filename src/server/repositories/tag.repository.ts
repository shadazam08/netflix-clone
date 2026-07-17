import { Prisma, type Tag } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type TagModel = Tag;

export class TagRepository extends BaseRepository {
  async findAll(): Promise<TagModel[]> {
    return this.db.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string): Promise<TagModel | null> {
    return this.db.tag.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<TagModel | null> {
    return this.db.tag.findUnique({
      where: { slug },
    });
  }

  async create(data: Prisma.TagCreateInput): Promise<TagModel> {
    return this.db.tag.create({
      data,
    });
  }

  async update(id: string, data: Prisma.TagUpdateInput): Promise<TagModel> {
    return this.db.tag.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<TagModel> {
    return this.db.tag.delete({
      where: { id },
    });
  }
}
