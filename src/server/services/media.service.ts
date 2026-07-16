import { AppError } from "@/server/lib";
import { MediaRepository } from "@/server/repositories";
import type { CreateMediaDto, UpdateMediaDto } from "@/server/dto";
import { MEDIA_MESSAGES } from "@/server/auth";

export class MediaService {
  private readonly media = new MediaRepository();

  async getById(id: string) {
    const item = await this.media.findById(id);

    if (!item) {
      throw new AppError("Media not found.", 404);
    }

    return item;
  }

  async getByContentId(contentId: string) {
    return this.media.findByContentId(contentId);
  }

  async create(data: CreateMediaDto) {
    const existing = await this.media.findByContentId(data.contentId);

    const singleMediaTypes = ["POSTER", "BANNER", "LOGO", "TRAILER", "VIDEO"];

    if (singleMediaTypes.includes(data.type) && existing.some((item) => item.type === data.type)) {
      throw new AppError(MEDIA_MESSAGES.ALREADY_EXISTS, 409);
    }

    return this.media.create({
      content: {
        connect: {
          id: data.contentId,
        },
      },
      type: data.type,
      url: data.url,
      publicId: data.publicId,
      width: data.width,
      height: data.height,
    });
  }

  async update(id: string, data: UpdateMediaDto) {
    await this.getById(id);

    return this.media.update(id, {
      type: data.type,
      url: data.url,
      publicId: data.publicId,
      width: data.width,
      height: data.height,
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return this.media.delete(id);
  }
}