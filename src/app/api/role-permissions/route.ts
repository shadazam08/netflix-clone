import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, ROLE_PERMISSION_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { RolePermissionService } from "@/server/services";

import { createRolePermissionSchema } from "@/server/validations";

const rolePermissionService = new RolePermissionService();

export async function GET() {
  try {
    const items = await rolePermissionService.findAll();

    return NextResponse.json(ApiResponse.success(items, ROLE_PERMISSION_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createRolePermissionSchema.parse(body);

    const item = await rolePermissionService.create(data);

    return NextResponse.json(ApiResponse.success(item, ROLE_PERMISSION_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
