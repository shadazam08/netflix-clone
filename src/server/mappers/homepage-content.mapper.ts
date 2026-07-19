import { Prisma } from "@/generated/prisma/client";

import { HomepageContentResponseDto } from "@/server/dto";

type HomepageContentWithRelations = Prisma.HomepageContentGetPayload<{
  include: {
    section: true;
    content: true;
  };
}>;

export class HomepageContentMapper {
  static toDto(item: HomepageContentWithRelations): HomepageContentResponseDto {
    return {
      sectionId: item.sectionId,
      contentId: item.contentId,
      displayOrder: item.displayOrder,
    };
  }

  static toDtoList(items: HomepageContentWithRelations[]): HomepageContentResponseDto[] {
    return items.map((item) => this.toDto(item));
  }
}
