import { Prisma } from "@/generated/prisma/client";
import { ReviewResponseDto } from "@/server/dto";

type ReviewWithRelations =
  Prisma.ReviewGetPayload<{
    include: {
      profile: true;
      content: true;
    };
  }>;

export class ReviewMapper {
  static toDto(
    review: ReviewWithRelations
  ): ReviewResponseDto {
    return {
      id: review.id,
      profileId: review.profileId,
      contentId: review.contentId,
      title: review.title,
      review: review.review,
      isVisible: review.isVisible,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  static toDtoList(
    reviews: ReviewWithRelations[]
  ): ReviewResponseDto[] {
    return reviews.map((review) =>
      this.toDto(review)
    );
  }
}