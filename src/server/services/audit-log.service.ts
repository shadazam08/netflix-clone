import { Prisma } from "@/generated/prisma/client";

import { AuditLogRepository, UserRepository } from "@/server/repositories";

import { AuditLogMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { AUDIT_LOG_MESSAGES } from "@/server/auth";

import { CreateAuditLogInput, UpdateAuditLogInput } from "@/server/validations";

export class AuditLogService {
  private readonly auditLogRepository = new AuditLogRepository();

  private readonly userRepository = new UserRepository();

  async findAll() {
    const auditLogs = await this.auditLogRepository.findAll();

    return AuditLogMapper.toDtoList(auditLogs);
  }

  async findById(id: string) {
    const auditLog = await this.auditLogRepository.findById(id);

    if (!auditLog) {
      throw new AppError(AUDIT_LOG_MESSAGES.NOT_FOUND, 404);
    }

    return AuditLogMapper.toDto(auditLog);
  }

  async create(data: CreateAuditLogInput) {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new AppError(AUDIT_LOG_MESSAGES.USER_NOT_FOUND, 404);
    }

    const createData: Prisma.AuditLogCreateInput = {
      user: {
        connect: {
          id: data.userId,
        },
      },
      action: data.action,
      entity: data.entity,
      entityId: data.entityId,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    };

    if (data.metadata !== undefined) {
      createData.metadata = data.metadata as Prisma.InputJsonValue;
    }

    const created = await this.auditLogRepository.create(createData);

    return AuditLogMapper.toDto(created);
  }

  async update(id: string, data: UpdateAuditLogInput) {
    await this.findById(id);

    const updateData: Prisma.AuditLogUpdateInput = {};

    if (data.userId !== undefined) {
      const user = await this.userRepository.findById(data.userId);

      if (!user) {
        throw new AppError(AUDIT_LOG_MESSAGES.USER_NOT_FOUND, 404);
      }

      updateData.user = {
        connect: {
          id: data.userId,
        },
      };
    }

    if (data.action !== undefined) {
      updateData.action = data.action;
    }

    if (data.entity !== undefined) {
      updateData.entity = data.entity;
    }

    if (data.entityId !== undefined) {
      updateData.entityId = data.entityId;
    }

    if (data.ipAddress !== undefined) {
      updateData.ipAddress = data.ipAddress;
    }

    if (data.userAgent !== undefined) {
      updateData.userAgent = data.userAgent;
    }

    if (data.metadata !== undefined) {
      updateData.metadata = data.metadata as Prisma.InputJsonValue;
    }

    const updated = await this.auditLogRepository.update(id, updateData);

    return AuditLogMapper.toDto(updated);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.auditLogRepository.delete(id);
  }
}
