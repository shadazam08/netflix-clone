import { Prisma } from "@/generated/prisma/client";

import { AuditLogResponseDto } from "@/server/dto";

type AuditLogWithRelations = Prisma.AuditLogGetPayload<{
  include: {
    user: true;
  };
}>;

export class AuditLogMapper {
  static toDto(auditLog: AuditLogWithRelations): AuditLogResponseDto {
    return {
      id: auditLog.id,
      userId: auditLog.userId,
      action: auditLog.action,
      entity: auditLog.entity,
      entityId: auditLog.entityId,
      ipAddress: auditLog.ipAddress,
      userAgent: auditLog.userAgent,
      metadata: auditLog.metadata,
      createdAt: auditLog.createdAt,
    };
  }

  static toDtoList(auditLogs: AuditLogWithRelations[]): AuditLogResponseDto[] {
    return auditLogs.map((auditLog) => this.toDto(auditLog));
  }
}
