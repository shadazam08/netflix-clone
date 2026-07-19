import { Prisma } from "@/generated/prisma/client";

import { AnnouncementRepository } from "@/server/repositories";

import { AnnouncementMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { ANNOUNCEMENT_MESSAGES } from "@/server/auth";

import { CreateAnnouncementInput, UpdateAnnouncementInput } from "@/server/validations";

export class AnnouncementService {
  private readonly announcementRepository = new AnnouncementRepository();

  async findAll() {
    const announcements = await this.announcementRepository.findAll();

    return AnnouncementMapper.toDtoList(announcements);
  }

  async findById(id: string) {
    const announcement = await this.announcementRepository.findById(id);

    if (!announcement) {
      throw new AppError(ANNOUNCEMENT_MESSAGES.NOT_FOUND, 404);
    }

    return AnnouncementMapper.toDto(announcement);
  }

  async create(data: CreateAnnouncementInput) {
    const created = await this.announcementRepository.create({
      title: data.title,
      message: data.message,
      isActive: data.isActive,
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    } satisfies Prisma.AnnouncementCreateInput);

    return AnnouncementMapper.toDto(created);
  }

  async update(id: string, data: UpdateAnnouncementInput) {
    await this.findById(id);

    const updateData: Prisma.AnnouncementUpdateInput = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.message !== undefined) {
      updateData.message = data.message;
    }

    if (data.isActive !== undefined) {
      updateData.isActive = data.isActive;
    }

    if (data.startsAt !== undefined) {
      updateData.startsAt = data.startsAt;
    }

    if (data.endsAt !== undefined) {
      updateData.endsAt = data.endsAt;
    }

    const updated = await this.announcementRepository.update(id, updateData);

    return AnnouncementMapper.toDto(updated);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.announcementRepository.delete(id);
  }
}
