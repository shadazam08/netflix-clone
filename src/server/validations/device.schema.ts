import { z } from "zod";

import { DeviceType } from "@/generated/prisma/client";

export const createDeviceSchema = z.object({
  userId: z.string().cuid(),
  name: z.string().trim().min(1).max(255),
  type: z.nativeEnum(DeviceType),
  identifier: z.string().trim().min(1).max(255),
  ipAddress: z.string().max(255).optional(),
  userAgent: z.string().optional(),
  lastLoginAt: z.coerce.date().optional(),
});

export const updateDeviceSchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  type: z.nativeEnum(DeviceType).optional(),
  identifier: z.string().trim().min(1).max(255).optional(),
  ipAddress: z.string().max(255).optional(),
  userAgent: z.string().optional(),
  lastLoginAt: z.coerce.date().optional(),
});

export type CreateDeviceInput = z.infer<typeof createDeviceSchema>;

export type UpdateDeviceInput = z.infer<typeof updateDeviceSchema>;
