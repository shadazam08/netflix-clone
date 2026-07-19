import { EPISODE_MESSAGES } from "@/server/auth";

import { AppError } from "@/server/lib";

import { EpisodeMapper } from "@/server/mappers";

import { EpisodeRepository, SeasonRepository } from "@/server/repositories";

import type { CreateEpisodeDto, UpdateEpisodeDto } from "@/server/dto";

export class EpisodeService {
  private readonly repository = new EpisodeRepository();

  private readonly seasonRepository = new SeasonRepository();

  async findAll() {
    const episodes = await this.repository.findAll();

    return EpisodeMapper.toDtoList(episodes);
  }

  async findById(id: string) {
    const episode = await this.repository.findById(id);

    if (!episode) {
      throw new AppError(EPISODE_MESSAGES.NOT_FOUND, 404);
    }

    return EpisodeMapper.toDto(episode);
  }

  async create(dto: CreateEpisodeDto) {
    const season = await this.seasonRepository.findById(dto.seasonId);

    if (!season) {
      throw new AppError(EPISODE_MESSAGES.SEASON_NOT_FOUND, 404);
    }

    const existing = await this.repository.findBySeasonAndEpisodeNumber(dto.seasonId, dto.episodeNumber);

    if (existing) {
      throw new AppError(EPISODE_MESSAGES.EPISODE_ALREADY_EXISTS, 409);
    }

    const episode = await this.repository.create({
      episodeNo: dto.episodeNumber,
      title: dto.title,
      duration: dto.duration,
      season: {
        connect: {
          id: dto.seasonId,
        },
      },
    });

    return EpisodeMapper.toDto(episode);
  }

  async update(id: string, dto: UpdateEpisodeDto) {
    const episode = await this.repository.findById(id);

    if (!episode) {
      throw new AppError(EPISODE_MESSAGES.NOT_FOUND, 404);
    }

    let seasonId = episode.seasonId;

    if (dto.seasonId) {
      const season = await this.seasonRepository.findById(dto.seasonId);

      if (!season) {
        throw new AppError(EPISODE_MESSAGES.SEASON_NOT_FOUND, 404);
      }

      seasonId = dto.seasonId;
    }

    const episodeNo = dto.episodeNumber ?? episode.episodeNo;

    if (seasonId !== episode.seasonId || episodeNo !== episode.episodeNo) {
      const existing = await this.repository.findBySeasonAndEpisodeNumber(seasonId, episodeNo);

      if (existing && existing.id !== episode.id) {
        throw new AppError(EPISODE_MESSAGES.EPISODE_ALREADY_EXISTS, 409);
      }
    }

    const updated = await this.repository.update(id, {
      episodeNo: dto.episodeNumber,
      title: dto.title,
      duration: dto.duration,
      ...(dto.seasonId && {
        season: {
          connect: {
            id: dto.seasonId,
          },
        },
      }),
    });

    return EpisodeMapper.toDto(updated);
  }

  async delete(id: string) {
    const episode = await this.repository.findById(id);

    if (!episode) {
      throw new AppError(EPISODE_MESSAGES.NOT_FOUND, 404);
    }

    await this.repository.delete(id);
  }
}