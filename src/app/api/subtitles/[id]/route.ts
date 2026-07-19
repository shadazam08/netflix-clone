import { NextResponse } from "next/server";

import { requireAdmin, SUBTITLE_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { SubtitleService } from "@/server/services";

import { updateSubtitleSchema } from "@/server/validations";

const service = new SubtitleService();

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const subtitle = await service.findById(id);

    return NextResponse.json(ApiResponse.success(subtitle, SUBTITLE_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateSubtitleSchema.parse(body);

    const subtitle = await service.update(id, data);

    return NextResponse.json(ApiResponse.success(subtitle, SUBTITLE_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await service.delete(id);

    return NextResponse.json(ApiResponse.success(null, SUBTITLE_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
