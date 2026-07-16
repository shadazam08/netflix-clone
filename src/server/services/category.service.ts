import { CATEGORY_MESSAGES } from "@/server/auth";
import type { CreateCategoryDto, UpdateCategoryDto } from "@/server/dto";
import { AppError } from "@/server/lib";
import { CategoryRepository } from "@/server/repositories";

export class CategoryService {
  private readonly categories = new CategoryRepository();

  async getAll() {
    return this.categories.findAll();
  }

  async getById(id: string) {
    const category = await this.categories.findById(id);

    if (!category) {
      throw new AppError(CATEGORY_MESSAGES.NOT_FOUND, 404);
    }

    return category;
  }

  async create(data: CreateCategoryDto) {
    const existing = await this.categories.findBySlug(data.slug);

    if (existing) {
      throw new AppError(CATEGORY_MESSAGES.SLUG_EXISTS, 409);
    }

    return this.categories.create(data);
  }

  async update(id: string, data: UpdateCategoryDto) {
    const existing = await this.getById(id);

    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await this.categories.findBySlug(data.slug);

      if (slugExists) {
        throw new AppError(CATEGORY_MESSAGES.SLUG_EXISTS, 409);
      }
    }

    return this.categories.update(id, data);
  }

  async delete(id: string) {
    await this.getById(id);

    return this.categories.delete(id);
  }
}
