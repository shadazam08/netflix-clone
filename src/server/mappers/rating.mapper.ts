import type { Rating } from "@/generated/prisma/client";

import type { RatingResponseDto } from "@/server/dto";

export class RatingMapper {
  static toDto(rating: Rating): RatingResponseDto {
    return {
      profileId: rating.profileId,
      contentId: rating.contentId,
      value: rating.value,
      createdAt: rating.createdAt,
    };
  }

  static toDtoList(ratings: Rating[]): RatingResponseDto[] {
    return ratings.map((rating) => this.toDto(rating));
  }
}
