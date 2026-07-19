import { Prisma } from "@/generated/prisma/client";

import { HomepageSectionResponseDto } from "@/server/dto";

type HomepageSectionWithRelations = Prisma.HomepageSectionGetPayload<{
  include: {
    rows: {
      include: {
        content: true;
      };
    };
  };
}>;

export class HomepageSectionMapper {
  static toDto(section: HomepageSectionWithRelations): HomepageSectionResponseDto {
    return {
      id: section.id,
      title: section.title,
      slug: section.slug,
      type: section.type,
      isActive: section.isActive,
      displayOrder: section.displayOrder,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
    };
  }

  static toDtoList(sections: HomepageSectionWithRelations[]): HomepageSectionResponseDto[] {
    return sections.map((section) => this.toDto(section));
  }
}
