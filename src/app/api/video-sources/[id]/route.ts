import { NextResponse } from "next/server";

import { requireAdmin, VIDEO_SOURCE_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { VideoSourceService } from "@/server/services";

import { updateVideoSourceSchema } from "@/server/validations";

const service = new VideoSourceService();

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const result = await service.findById(id);

    return NextResponse.json(ApiResponse.success(result, VIDEO_SOURCE_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateVideoSourceSchema.parse(body);

    const result = await service.update(id, data);

    return NextResponse.json(ApiResponse.success(result, VIDEO_SOURCE_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await service.delete(id);

    return NextResponse.json(ApiResponse.success(null, VIDEO_SOURCE_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
