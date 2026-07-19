import { PermissionAction } from "@/generated/prisma/client";

export interface CreatePermissionDto {
  name: string;
  resource: string;
  action: PermissionAction;
  description?: string;
}

export interface UpdatePermissionDto {
  name?: string;
  resource?: string;
  action?: PermissionAction;
  description?: string;
}

export interface PermissionResponseDto {
  id: string;
  name: string;
  resource: string;
  action: PermissionAction;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
