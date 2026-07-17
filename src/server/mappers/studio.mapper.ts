import type { Studio } from "@/generated/prisma/client";

import type {
  StudioResponseDto,
} from "@/server/dto";

export class StudioMapper {
  static toDto(
    studio: Studio
  ): StudioResponseDto {
    return {
      id: studio.id,
      name: studio.name,
      slug: studio.slug,
    };
  }

  static toDtoList(
    studios: Studio[]
  ): StudioResponseDto[] {
    return studios.map((studio) =>
      this.toDto(studio)
    );
  }
}