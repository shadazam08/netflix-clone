import { NextResponse } from "next/server";

import { requireAdmin, VIDEO_SOURCE_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { VideoSourceService } from "@/server/services";

import { createVideoSourceSchema } from "@/server/validations";

const service = new VideoSourceService();

export async function GET() {
  try {
    const data = await service.findAll();

    return NextResponse.json(ApiResponse.success(data, VIDEO_SOURCE_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createVideoSourceSchema.parse(body);

    const result = await service.create(data);

    return NextResponse.json(ApiResponse.success(result, VIDEO_SOURCE_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
