import { AppError } from "@/server/lib";
import { ContentRepository } from "@/server/repositories";
import type { CreateContentDto, UpdateContentDto } from "@/server/dto";

export class ContentService {
  private readonly contents = new ContentRepository();

  async getAll() {
    return this.contents.findAll();
  }

  async getById(id: string) {
    const content = await this.contents.findById(id);

    if (!content) {
      throw new AppError("Content not found.", 404);
    }

    return content;
  }

  async getBySlug(slug: string) {
    const content = await this.contents.findBySlug(slug);

    if (!content) {
      throw new AppError("Content not found.", 404);
    }

    return content;
  }

  async create(data: CreateContentDto) {
    return this.contents.create(data);
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
