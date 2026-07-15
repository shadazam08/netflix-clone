import { AppError } from "@/server/lib";
import { ContentRepository } from "@/server/repositories";
import type { CreateContentDto, UpdateContentDto } from "@/server/dto";
import { CONTENT_MESSAGES } from "@/server/auth";

export class ContentService {
  private readonly contents = new ContentRepository();

  async getAll() {
    return this.contents.findAll();
  }

  async getById(id: string) {
    const content = await this.contents.findById(id);

    if (!content) {
      throw new AppError(CONTENT_MESSAGES.NOT_FOUND, 404);
    }

    return content;
  }

  async getBySlug(slug: string) {
    const content = await this.contents.findBySlug(slug);

    if (!content) {
      throw new AppError(CONTENT_MESSAGES.NOT_FOUND, 404);
    }

    return content;
  }

  async create(data: CreateContentDto) {
    const existing = await this.contents.findBySlug(data.slug);

    if (existing) {
      throw new AppError(CONTENT_MESSAGES.SLUG_EXISTS, 409);
    }

    return this.contents.create({
      title: data.title,
      slug: data.slug,
      description: data.description,
      type: data.type,
      visibility: data.visibility,
      certification: data.certification,
      releaseDate: data.releaseDate,
      duration: data.duration,
      status: "DRAFT",
      isFeatured: false,
      isTrending: false,
    });
  }

  async update(id: string, data: UpdateContentDto) {
    await this.getById(id);

    return this.contents.update(id, data);
  }

  async delete(id: string) {
    await this.getById(id);

    return this.contents.delete(id);
  }
}
