import {
  CreateTagDto,
  TagResponseDto,
  UpdateTagDto,
} from "@/server/dto";
import { TAG_MESSAGES } from "@/server/auth";
import { TagMapper } from "@/server/mappers";
import { TagRepository } from "@/server/repositories";

export class TagService {
  private readonly tags = new TagRepository();

  async getAll(): Promise<TagResponseDto[]> {
    const tags = await this.tags.findAll();

    return TagMapper.toDtoList(tags);
  }

  async getById(
    id: string
  ): Promise<TagResponseDto> {
    const tag = await this.tags.findById(id);

    if (!tag) {
      throw new Error(TAG_MESSAGES.NOT_FOUND);
    }

    return TagMapper.toDto(tag);
  }

  async create(
    dto: CreateTagDto
  ): Promise<TagResponseDto> {
    const existing =
      await this.tags.findBySlug(dto.slug);

    if (existing) {
      throw new Error(
        TAG_MESSAGES.SLUG_EXISTS
      );
    }

    const tag = await this.tags.create({
      name: dto.name,
      slug: dto.slug,
    });

    return TagMapper.toDto(tag);
  }

  async update(
    id: string,
    dto: UpdateTagDto
  ): Promise<TagResponseDto> {
    await this.getById(id);

    if (dto.slug) {
      const existing =
        await this.tags.findBySlug(dto.slug);

      if (existing && existing.id !== id) {
        throw new Error(
          TAG_MESSAGES.SLUG_EXISTS
        );
      }
    }

    const tag = await this.tags.update(
      id,
      dto
    );

    return TagMapper.toDto(tag);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);

    await this.tags.delete(id);
  }
}