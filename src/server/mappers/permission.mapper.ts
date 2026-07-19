import { Prisma } from "@/generated/prisma/client";

import { PermissionResponseDto } from "@/server/dto";

type PermissionWithRelations = Prisma.PermissionGetPayload<{
  include: {
    roles: {
      include: {
        role: true;
      };
    };
  };
}>;

export class PermissionMapper {
  static toDto(permission: PermissionWithRelations): PermissionResponseDto {
    return {
      id: permission.id,
      name: permission.name,
      resource: permission.resource,
      action: permission.action,
      description: permission.description,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
    };
  }

  static toDtoList(permissions: PermissionWithRelations[]): PermissionResponseDto[] {
    return permissions.map((permission) => this.toDto(permission));
  }
}
