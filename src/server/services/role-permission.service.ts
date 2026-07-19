import { Prisma } from "@/generated/prisma/client";

import { PermissionRepository, RolePermissionRepository, RoleRepository } from "@/server/repositories";

import { RolePermissionMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { ROLE_PERMISSION_MESSAGES } from "@/server/auth";

import { CreateRolePermissionInput } from "@/server/validations";

export class RolePermissionService {
  private readonly rolePermissionRepository = new RolePermissionRepository();

  private readonly roleRepository = new RoleRepository();

  private readonly permissionRepository = new PermissionRepository();

  async findAll() {
    const items = await this.rolePermissionRepository.findAll();

    return RolePermissionMapper.toDtoList(items);
  }

  async findById(roleId: string, permissionId: string) {
    const item = await this.rolePermissionRepository.findById(roleId, permissionId);

    if (!item) {
      throw new AppError(ROLE_PERMISSION_MESSAGES.NOT_FOUND, 404);
    }

    return RolePermissionMapper.toDto(item);
  }

  async create(data: CreateRolePermissionInput) {
    const role = await this.roleRepository.findById(data.roleId);

    if (!role) {
      throw new AppError(ROLE_PERMISSION_MESSAGES.ROLE_NOT_FOUND, 404);
    }

    const permission = await this.permissionRepository.findById(data.permissionId);

    if (!permission) {
      throw new AppError(ROLE_PERMISSION_MESSAGES.PERMISSION_NOT_FOUND, 404);
    }

    const existing = await this.rolePermissionRepository.findById(data.roleId, data.permissionId);

    if (existing) {
      throw new AppError(ROLE_PERMISSION_MESSAGES.ALREADY_EXISTS, 409);
    }

    const created = await this.rolePermissionRepository.create({
      role: {
        connect: {
          id: data.roleId,
        },
      },
      permission: {
        connect: {
          id: data.permissionId,
        },
      },
    } satisfies Prisma.RolePermissionCreateInput);

    return RolePermissionMapper.toDto(created);
  }

  async delete(roleId: string, permissionId: string) {
    await this.findById(roleId, permissionId);

    await this.rolePermissionRepository.delete(roleId, permissionId);
  }
}
