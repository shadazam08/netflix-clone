import { SEASON_MESSAGES } from "@/server/auth";
import { AppError } from "@/server/lib";
import { SeasonMapper } from "@/server/mappers";
import { SeasonRepository, TvShowRepository } from "@/server/repositories";
import type { CreateSeasonDto, UpdateSeasonDto } from "@/server/dto";

export class SeasonService {
  private readonly repository = new SeasonRepository();
  private readonly tvShowRepository = new TvShowRepository();
  async findAll() {
    const seasons = await this.repository.findAll();
    return SeasonMapper.toDtoList(seasons);
  }

  async findById(id: string) {
    const season = await this.repository.findById(id);

    if (!season) {
      throw new AppError(SEASON_MESSAGES.NOT_FOUND, 404);
    }

    return SeasonMapper.toDto(season);
  }

  async create(dto: CreateSeasonDto) {
    const tvShow = await this.tvShowRepository.findById(dto.tvShowId);

    if (!tvShow) {
      throw new AppError(SEASON_MESSAGES.TV_SHOW_NOT_FOUND, 404);
    }

    const existing = await this.repository.findByTvShowAndSeasonNumber(dto.tvShowId, dto.seasonNumber);

    if (existing) {
      throw new AppError(SEASON_MESSAGES.SEASON_ALREADY_EXISTS, 409);
    }

    const season = await this.repository.create({
      seasonNo: dto.seasonNumber,
      title: dto.title!,
      tvShow: {
        connect: {
          id: dto.tvShowId,
        },
      },
    });

    return SeasonMapper.toDto(season);
  }

  async update(id: string, dto: UpdateSeasonDto) {
    const season = await this.repository.findById(id);

    if (!season) {
      throw new AppError(SEASON_MESSAGES.NOT_FOUND, 404);
    }

    let tvShowId = season.tvShowId;

    if (dto.tvShowId) {
      const tvShow = await this.tvShowRepository.findById(dto.tvShowId);

      if (!tvShow) {
        throw new AppError(SEASON_MESSAGES.TV_SHOW_NOT_FOUND, 404);
      }

      tvShowId = dto.tvShowId;
    }

    const seasonNo = dto.seasonNumber ?? season.seasonNo;

    if (tvShowId !== season.tvShowId || seasonNo !== season.seasonNo) {
      const existing = await this.repository.findByTvShowAndSeasonNumber(tvShowId, seasonNo);

      if (existing && existing.id !== season.id) {
        throw new AppError(SEASON_MESSAGES.SEASON_ALREADY_EXISTS, 409);
      }
    }

    const updated = await this.repository.update(id, {
      seasonNo: dto.seasonNumber,
      title: dto.title,
      ...(dto.tvShowId && {
        tvShow: {
          connect: {
            id: dto.tvShowId,
          },
        },
      }),
    });

    return SeasonMapper.toDto(updated);
  }

  async delete(id: string) {
    const season = await this.repository.findById(id);

    if (!season) {
      throw new AppError(SEASON_MESSAGES.NOT_FOUND, 404);
    }

    await this.repository.delete(id);
  }
}
