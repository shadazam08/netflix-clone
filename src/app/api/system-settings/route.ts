import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, SYSTEM_SETTING_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { SystemSettingService } from "@/server/services";

import { createSystemSettingSchema } from "@/server/validations";

const systemSettingService = new SystemSettingService();

export async function GET() {
  try {
    const settings = await systemSettingService.findAll();

    return NextResponse.json(ApiResponse.success(settings, SYSTEM_SETTING_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createSystemSettingSchema.parse(body);

    const setting = await systemSettingService.create(data);

    return NextResponse.json(ApiResponse.success(setting, SYSTEM_SETTING_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
