import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, PERMISSION_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { PermissionService } from "@/server/services";

import { createPermissionSchema } from "@/server/validations";

const permissionService = new PermissionService();

export async function GET() {
  try {
    const permissions = await permissionService.findAll();

    return NextResponse.json(ApiResponse.success(permissions, PERMISSION_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createPermissionSchema.parse(body);

    const permission = await permissionService.create(data);

    return NextResponse.json(ApiResponse.success(permission, PERMISSION_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
