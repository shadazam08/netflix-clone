import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, DEVICE_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { DeviceService } from "@/server/services";

import { createDeviceSchema } from "@/server/validations";

const deviceService = new DeviceService();

export async function GET() {
  try {
    const devices = await deviceService.findAll();

    return NextResponse.json(ApiResponse.success(devices, DEVICE_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createDeviceSchema.parse(body);

    const device = await deviceService.create(data);

    return NextResponse.json(ApiResponse.success(device, DEVICE_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
