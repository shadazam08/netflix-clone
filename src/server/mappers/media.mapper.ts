import type {
  MediaResponseDto,
} from "@/server/dto";
import type {
  MediaWithContent,
} from "@/server/repositories";

export class MediaMapper {
  static toResponse(
    media: MediaWithContent
  ): MediaResponseDto {
    return {
      id: media.id,
      contentId: media.contentId,

      type: media.type,

      url: media.url,
      publicId: media.publicId,

      width: media.width,
      height: media.height,
    };
  }

  static toResponseList(
    media: MediaWithContent[]
  ): MediaResponseDto[] {
    return media.map((item) =>
      this.toResponse(item)
    );
  }
}