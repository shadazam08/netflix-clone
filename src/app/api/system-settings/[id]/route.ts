import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, SYSTEM_SETTING_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { SystemSettingService } from "@/server/services";
import { updateSystemSettingSchema } from "@/server/validations";

const systemSettingService = new SystemSettingService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const setting = await systemSettingService.findById(id);

    return NextResponse.json(ApiResponse.success(setting, SYSTEM_SETTING_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateSystemSettingSchema.parse(body);

    const setting = await systemSettingService.update(id, data);

    return NextResponse.json(ApiResponse.success(setting, SYSTEM_SETTING_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await systemSettingService.delete(id);

    return NextResponse.json(ApiResponse.success(null, SYSTEM_SETTING_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
