import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, DEVICE_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { DeviceService } from "@/server/services";

import { updateDeviceSchema } from "@/server/validations";

const deviceService = new DeviceService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const device = await deviceService.findById(id);

    return NextResponse.json(ApiResponse.success(device, DEVICE_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateDeviceSchema.parse(body);

    const device = await deviceService.update(id, data);

    return NextResponse.json(ApiResponse.success(device, DEVICE_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await deviceService.delete(id);

    return NextResponse.json(ApiResponse.success(null, DEVICE_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
