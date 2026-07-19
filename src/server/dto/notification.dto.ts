import {
  NotificationType,
} from "@/generated/prisma/client";

export interface CreateNotificationDto {
  title: string;
  message: string;
  type: NotificationType;
  userId?: string;
  isActive?: boolean;
}

export interface UpdateNotificationDto {
  title?: string;
  message?: string;
  type?: NotificationType;
  userId?: string;
  isActive?: boolean;
}

export interface NotificationResponseDto {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  userId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}