import type { ContentResponseDto } from "@/server/dto";
import type { ContentWithRelations } from "@/server/repositories";

export class ContentMapper {
  static toResponse(
    content: ContentWithRelations
  ): ContentResponseDto {
    const poster =
      content.media.find(
        (media) => media.type === "POSTER"
      )?.url ?? null;

    const banner =
      content.media.find(
        (media) => media.type === "BANNER"
      )?.url ?? null;

    return {
      id: content.id,
      title: content.title,
      slug: content.slug,
      description: content.description,

      type: content.type,
      status: content.status,
      visibility: content.visibility,

      certification: content.certification,

      releaseDate: content.releaseDate,
      duration: content.duration,

      isFeatured: content.isFeatured,
      isTrending: content.isTrending,

      poster,
      banner,
    };
  }

  static toResponseList(
    contents: ContentWithRelations[]
  ): ContentResponseDto[] {
    return contents.map((content) =>
      this.toResponse(content)
    );
  }
}