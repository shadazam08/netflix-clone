import { Prisma } from "@/generated/prisma/client";

import { PermissionRepository } from "@/server/repositories";

import { PermissionMapper } from "@/server/mappers";

import { AppError } from "@/server/lib";

import { PERMISSION_MESSAGES } from "@/server/auth";

import { CreatePermissionInput, UpdatePermissionInput } from "@/server/validations";

export class PermissionService {
  private readonly permissionRepository = new PermissionRepository();

  async findAll() {
    const permissions = await this.permissionRepository.findAll();

    return PermissionMapper.toDtoList(permissions);
  }

  async findById(id: string) {
    const permission = await this.permissionRepository.findById(id);

    if (!permission) {
      throw new AppError(PERMISSION_MESSAGES.NOT_FOUND, 404);
    }

    return PermissionMapper.toDto(permission);
  }

  async create(data: CreatePermissionInput) {
    const existing = await this.permissionRepository.findUniquePermission(data.resource, data.action);

    if (existing) {
      throw new AppError(PERMISSION_MESSAGES.ALREADY_EXISTS, 409);
    }

    const created = await this.permissionRepository.create({
      name: data.name,
      resource: data.resource,
      action: data.action,
      description: data.description,
    } satisfies Prisma.PermissionCreateInput);

    return PermissionMapper.toDto(created);
  }

  async update(id: string, data: UpdatePermissionInput) {
    const current = await this.permissionRepository.findById(id);

    if (!current) {
      throw new AppError(PERMISSION_MESSAGES.NOT_FOUND, 404);
    }

    if (data.resource !== undefined || data.action !== undefined) {
      const resource = data.resource ?? current.resource;

      const action = data.action ?? current.action;

      const existing = await this.permissionRepository.findUniquePermission(resource, action);

      if (existing && existing.id !== id) {
        throw new AppError(PERMISSION_MESSAGES.ALREADY_EXISTS, 409);
      }
    }

    const updateData: Prisma.PermissionUpdateInput = {};

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.resource !== undefined) {
      updateData.resource = data.resource;
    }

    if (data.action !== undefined) {
      updateData.action = data.action;
    }

    if (data.description !== undefined) {
      updateData.description = data.description;
    }

    const updated = await this.permissionRepository.update(id, updateData);

    return PermissionMapper.toDto(updated);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.permissionRepository.delete(id);
  }
}
