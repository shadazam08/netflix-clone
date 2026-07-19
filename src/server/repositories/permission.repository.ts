// src/server/repositories/permission.repository.ts

import { Prisma, PermissionAction } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class PermissionRepository {
  async findAll() {
    return prisma.permission.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
      orderBy: [
        {
          resource: "asc",
        },
        {
          action: "asc",
        },
      ],
    });
  }

  async findById(id: string) {
    return prisma.permission.findUnique({
      where: {
        id,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findUniquePermission(resource: string, action: PermissionAction) {
    return prisma.permission.findUnique({
      where: {
        resource_action: {
          resource,
          action,
        },
      },
    });
  }

  async create(data: Prisma.PermissionCreateInput) {
    return prisma.permission.create({
      data,
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.PermissionUpdateInput) {
    return prisma.permission.update({
      where: {
        id,
      },
      data,
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.permission.delete({
      where: {
        id,
      },
    });
  }
}
