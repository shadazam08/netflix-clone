import { Prisma } from "@/generated/prisma/client";

import { RolePermissionResponseDto } from "@/server/dto";

type RolePermissionWithRelations = Prisma.RolePermissionGetPayload<{
  include: {
    role: true;
    permission: true;
  };
}>;

export class RolePermissionMapper {
  static toDto(item: RolePermissionWithRelations): RolePermissionResponseDto {
    return {
      roleId: item.roleId,
      permissionId: item.permissionId,
    };
  }

  static toDtoList(items: RolePermissionWithRelations[]): RolePermissionResponseDto[] {
    return items.map((item) => this.toDto(item));
  }
}
