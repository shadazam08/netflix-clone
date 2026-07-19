import { Prisma } from "@/generated/prisma/client";

import {
  AppError,
} from "@/server/lib";

import {
  ReviewRepository,
  ProfileRepository,
  ContentRepository,
} from "@/server/repositories";

import {
  ReviewMapper,
} from "@/server/mappers";

import {
  CreateReviewDto,
  UpdateReviewDto,
} from "@/server/dto";

import {
  REVIEW_MESSAGES,
} from "@/server/auth";

export class ReviewService {
  private readonly reviewRepository =
    new ReviewRepository();

  private readonly profileRepository =
    new ProfileRepository();

  private readonly contentRepository =
    new ContentRepository();

  async findAll() {
    const reviews =
      await this.reviewRepository.findAll();

    return ReviewMapper.toDtoList(
      reviews
    );
  }

  async findById(
    id: string
  ) {
    const review =
      await this.reviewRepository.findById(
        id
      );

    if (!review) {
      throw new AppError(
        REVIEW_MESSAGES.NOT_FOUND,
        404
      );
    }

    return ReviewMapper.toDto(
      review
    );
  }

  async create(
    dto: CreateReviewDto
  ) {
    const profile =
      await this.profileRepository.findById(
        dto.profileId
      );

    if (!profile) {
      throw new AppError(
        REVIEW_MESSAGES.PROFILE_NOT_FOUND,
        404
      );
    }

    const content =
      await this.contentRepository.findById(
        dto.contentId
      );

    if (!content) {
      throw new AppError(
        REVIEW_MESSAGES.CONTENT_NOT_FOUND,
        404
      );
    }

    const review =
      await this.reviewRepository.create({
        title: dto.title,
        review: dto.review,
        isVisible: dto.isVisible,

        profile: {
          connect: {
            id: dto.profileId,
          },
        },

        content: {
          connect: {
            id: dto.contentId,
          },
        },
      });

    return ReviewMapper.toDto(
      review
    );
  }

  async update(
    id: string,
    dto: UpdateReviewDto
  ) {
    await this.findById(id);

    const data: Prisma.ReviewUpdateInput = {
      ...(dto.title !== undefined && {
        title: dto.title,
      }),

      ...(dto.review !== undefined && {
        review: dto.review,
      }),

      ...(dto.isVisible !== undefined && {
        isVisible:
          dto.isVisible,
      }),
    };

    const review =
      await this.reviewRepository.update(
        id,
        data
      );

    return ReviewMapper.toDto(
      review
    );
  }

  async delete(
    id: string
  ) {
    await this.findById(id);

    await this.reviewRepository.delete(
      id
    );
  }
}