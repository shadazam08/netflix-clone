import { AuditAction } from "@/generated/prisma/client";

export interface CreateAuditLogDto {
  userId: string;
  action: AuditAction;
  entity: string;
  entityId: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: unknown;
}

export interface UpdateAuditLogDto {
  userId?: string;
  action?: AuditAction;
  entity?: string;
  entityId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: unknown;
}

export interface AuditLogResponseDto {
  id: string;
  userId: string;
  action: AuditAction;
  entity: string;
  entityId: string;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: unknown;
  createdAt: Date;
}
