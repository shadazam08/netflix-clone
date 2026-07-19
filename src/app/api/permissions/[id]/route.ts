import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, PERMISSION_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { PermissionService } from "@/server/services";

import { updatePermissionSchema } from "@/server/validations";

const permissionService = new PermissionService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const permission = await permissionService.findById(id);

    return NextResponse.json(ApiResponse.success(permission, PERMISSION_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updatePermissionSchema.parse(body);

    const permission = await permissionService.update(id, data);

    return NextResponse.json(ApiResponse.success(permission, PERMISSION_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await permissionService.delete(id);

    return NextResponse.json(ApiResponse.success(null, PERMISSION_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
