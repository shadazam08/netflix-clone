import { Prisma, type Category } from "@/generated/prisma/client";

import { BaseRepository } from "./base.repository";


export type CategoryModel = Category;

export class CategoryRepository extends BaseRepository {
  async findAll(): Promise<CategoryModel[]> {
    return this.db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(
    id: string
  ): Promise<CategoryModel | null> {
    return this.db.category.findUnique({
      where: { id },
    });
  }

  async findBySlug(
    slug: string
  ): Promise<CategoryModel | null> {
    return this.db.category.findUnique({
      where: { slug },
    });
  }

  async create(
    data: Prisma.CategoryCreateInput
  ): Promise<CategoryModel> {
    return this.db.category.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.CategoryUpdateInput
  ): Promise<CategoryModel> {
    return this.db.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<CategoryModel> {
    return this.db.category.delete({
      where: { id },
    });
  }
}