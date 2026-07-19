// src/server/mappers/announcement.mapper.ts

import { Announcement } from "@/generated/prisma/client";

import { AnnouncementResponseDto } from "@/server/dto";

export class AnnouncementMapper {
  static toDto(announcement: Announcement): AnnouncementResponseDto {
    return {
      id: announcement.id,
      title: announcement.title,
      message: announcement.message,
      isActive: announcement.isActive,
      startsAt: announcement.startsAt,
      endsAt: announcement.endsAt,
      createdAt: announcement.createdAt,
      updatedAt: announcement.updatedAt,
    };
  }

  static toDtoList(announcements: Announcement[]): AnnouncementResponseDto[] {
    return announcements.map((announcement) => this.toDto(announcement));
  }
}
