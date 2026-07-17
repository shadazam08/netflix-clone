import type { Tag } from "@/generated/prisma/client";

import type { TagResponseDto } from "@/server/dto";

export class TagMapper {
  static toDto(
    tag: Tag
  ): TagResponseDto {
    return {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    };
  }

  static toDtoList(
    tags: Tag[]
  ): TagResponseDto[] {
    return tags.map((tag) =>
      this.toDto(tag)
    );
  }
}