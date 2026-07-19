import { RATING_MESSAGES } from "@/server/auth";
import { AppError } from "@/server/lib";
import { RatingMapper } from "@/server/mappers";
import { ContentRepository, ProfileRepository, RatingRepository } from "@/server/repositories";
import type { CreateRatingDto, UpdateRatingDto } from "@/server/dto";

export class RatingService {
  private readonly repository = new RatingRepository();

  private readonly profileRepository = new ProfileRepository();

  private readonly contentRepository = new ContentRepository();

  async findAll() {
    const ratings = await this.repository.findAll();

    return RatingMapper.toDtoList(ratings);
  }

  async findById(profileId: string, contentId: string) {
    const rating = await this.repository.findById(profileId, contentId);

    if (!rating) {
      throw new AppError(RATING_MESSAGES.NOT_FOUND, 404);
    }

    return RatingMapper.toDto(rating);
  }

  async create(dto: CreateRatingDto) {
    const profile = await this.profileRepository.findById(dto.profileId);

    if (!profile) {
      throw new AppError(RATING_MESSAGES.PROFILE_NOT_FOUND, 404);
    }

    const content = await this.contentRepository.findById(dto.contentId);

    if (!content) {
      throw new AppError(RATING_MESSAGES.CONTENT_NOT_FOUND, 404);
    }

    const rating = await this.repository.create({
      value: dto.value,
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

    return RatingMapper.toDto(rating);
  }

  async update(profileId: string, contentId: string, dto: UpdateRatingDto) {
    const rating = await this.repository.findById(profileId, contentId);

    if (!rating) {
      throw new AppError(RATING_MESSAGES.NOT_FOUND, 404);
    }

    const updated = await this.repository.update(profileId, contentId, {
      value: dto.value,
    });

    return RatingMapper.toDto(updated);
  }

  async delete(profileId: string, contentId: string) {
    const rating = await this.repository.findById(profileId, contentId);

    if (!rating) {
      throw new AppError(RATING_MESSAGES.NOT_FOUND, 404);
    }

    await this.repository.delete(profileId, contentId);
  }
}
