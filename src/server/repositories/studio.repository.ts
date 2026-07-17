import { Prisma, type Studio } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";

export type StudioModel = Studio;

export class StudioRepository extends BaseRepository {
  async findAll(): Promise<StudioModel[]> {
    return this.db.studio.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string): Promise<StudioModel | null> {
    return this.db.studio.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<StudioModel | null> {
    return this.db.studio.findUnique({
      where: {
        name,
      },
    });
  }

  async findBySlug(slug: string): Promise<StudioModel | null> {
    return this.db.studio.findUnique({
      where: {
        slug,
      },
    });
  }

  async create(data: Prisma.StudioCreateInput): Promise<StudioModel> {
    return this.db.studio.create({
      data,
    });
  }

  async update(id: string, data: Prisma.StudioUpdateInput): Promise<StudioModel> {
    return this.db.studio.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<StudioModel> {
    return this.db.studio.delete({
      where: {
        id,
      },
    });
  }
}
