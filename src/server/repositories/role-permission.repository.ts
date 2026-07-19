import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/server/db/prisma";

export class RolePermissionRepository {
  async findAll() {
    return prisma.rolePermission.findMany({
      include: {
        role: true,
        permission: true,
      },
      orderBy: [
        {
          roleId: "asc",
        },
        {
          permissionId: "asc",
        },
      ],
    });
  }

  async findById(roleId: string, permissionId: string) {
    return prisma.rolePermission.findUnique({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId,
        },
      },
      include: {
        role: true,
        permission: true,
      },
    });
  }

  async create(data: Prisma.RolePermissionCreateInput) {
    return prisma.rolePermission.create({
      data,
      include: {
        role: true,
        permission: true,
      },
    });
  }

  async delete(roleId: string, permissionId: string) {
    return prisma.rolePermission.delete({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId,
        },
      },
    });
  }
}
