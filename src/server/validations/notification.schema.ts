import { z } from "zod";

import { NotificationType } from "@/generated/prisma/client";

export const createNotificationSchema = z.object({
  title: z.string().trim().min(1).max(255),
  message: z.string().trim().min(1),
  type: z.nativeEnum(NotificationType),
  userId: z.string().cuid().optional(),
  isActive: z.boolean().optional(),
});

export const updateNotificationSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  message: z.string().trim().min(1).optional(),
  type: z.nativeEnum(NotificationType).optional(),
  userId: z.string().cuid().optional(),
  isActive: z.boolean().optional(),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;

export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
