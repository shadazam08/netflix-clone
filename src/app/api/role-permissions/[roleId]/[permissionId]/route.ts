import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, ROLE_PERMISSION_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { RolePermissionService } from "@/server/services";

const rolePermissionService = new RolePermissionService();

interface RouteContext {
  params: Promise<{
    roleId: string;
    permissionId: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { roleId, permissionId } = await context.params;

    const item = await rolePermissionService.findById(roleId, permissionId);

    return NextResponse.json(ApiResponse.success(item, ROLE_PERMISSION_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { roleId, permissionId } = await context.params;

    await rolePermissionService.delete(roleId, permissionId);

    return NextResponse.json(ApiResponse.success(null, ROLE_PERMISSION_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
