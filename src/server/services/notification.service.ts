import { Prisma } from "@/generated/prisma/client";

import { NotificationRepository, UserRepository } from "@/server/repositories";

import { NotificationMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { NOTIFICATION_MESSAGES } from "@/server/auth";

import { CreateNotificationInput, UpdateNotificationInput } from "@/server/validations";

export class NotificationService {
  private readonly notificationRepository = new NotificationRepository();

  private readonly userRepository = new UserRepository();

  async findAll() {
    const notifications = await this.notificationRepository.findAll();

    return NotificationMapper.toDtoList(notifications);
  }

  async findById(id: string) {
    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new AppError(NOTIFICATION_MESSAGES.NOT_FOUND, 404);
    }

    return NotificationMapper.toDto(notification);
  }

  async create(data: CreateNotificationInput) {
    if (data.userId) {
      const user = await this.userRepository.findById(data.userId);

      if (!user) {
        throw new AppError(NOTIFICATION_MESSAGES.USER_NOT_FOUND, 404);
      }
    }

    const created = await this.notificationRepository.create({
      title: data.title,
      message: data.message,
      type: data.type,
      isActive: data.isActive,
      ...(data.userId && {
        user: {
          connect: {
            id: data.userId,
          },
        },
      }),
    } satisfies Prisma.NotificationCreateInput);

    return NotificationMapper.toDto(created);
  }

  async update(id: string, data: UpdateNotificationInput) {
    await this.findById(id);

    const updateData: Prisma.NotificationUpdateInput = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.message !== undefined) {
      updateData.message = data.message;
    }

    if (data.type !== undefined) {
      updateData.type = data.type;
    }

    if (data.isActive !== undefined) {
      updateData.isActive = data.isActive;
    }

    if (data.userId !== undefined) {
      const user = await this.userRepository.findById(data.userId);

      if (!user) {
        throw new AppError(NOTIFICATION_MESSAGES.USER_NOT_FOUND, 404);
      }

      updateData.user = {
        connect: {
          id: data.userId,
        },
      };
    }

    const updated = await this.notificationRepository.update(id, updateData);

    return NotificationMapper.toDto(updated);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.notificationRepository.delete(id);
  }
}
