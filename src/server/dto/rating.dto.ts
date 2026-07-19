import type {
  RatingValue,
} from "@/generated/prisma/client";

export interface RatingResponseDto {
  profileId: string;
  contentId: string;
  value: RatingValue;
  createdAt: Date;
}

export interface CreateRatingDto {
  profileId: string;
  contentId: string;
  value: RatingValue;
}

export type UpdateRatingDto =
  Partial<
    Pick<CreateRatingDto, "value">
  >;