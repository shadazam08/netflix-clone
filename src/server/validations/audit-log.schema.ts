import { z } from "zod";

import { AuditAction } from "@/generated/prisma/client";

export const createAuditLogSchema = z.object({
  userId: z.string().cuid(),
  action: z.nativeEnum(AuditAction),
  entity: z.string().trim().min(1).max(255),
  entityId: z.string().trim().min(1).max(255),
  ipAddress: z.string().max(255).optional(),
  userAgent: z.string().optional(),
  metadata: z.unknown().optional(),
});

export const updateAuditLogSchema = z.object({
  userId: z.string().cuid().optional(),
  action: z.nativeEnum(AuditAction).optional(),
  entity: z.string().trim().min(1).max(255).optional(),
  entityId: z.string().trim().min(1).max(255).optional(),
  ipAddress: z.string().max(255).optional(),
  userAgent: z.string().optional(),
  metadata: z.unknown().optional(),
});

export type CreateAuditLogInput = z.infer<typeof createAuditLogSchema>;

export type UpdateAuditLogInput = z.infer<typeof updateAuditLogSchema>;
