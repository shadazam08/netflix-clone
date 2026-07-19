import { Prisma } from "@/generated/prisma/client";

import {
  NotificationResponseDto,
} from "@/server/dto";

type NotificationWithRelations =
  Prisma.NotificationGetPayload<{
    include: {
      user: true;
    };
  }>;

export class NotificationMapper {
  static toDto(
    notification: NotificationWithRelations
  ): NotificationResponseDto {
    return {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      userId: notification.userId,
      isActive: notification.isActive,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  }

  static toDtoList(
    notifications: NotificationWithRelations[]
  ): NotificationResponseDto[] {
    return notifications.map(
      (notification) =>
        this.toDto(notification)
    );
  }
}