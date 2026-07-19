import { NextResponse } from "next/server";

import { requireAdmin, SEASON_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { SeasonService } from "@/server/services";

import { updateSeasonSchema } from "@/server/validations";

const service = new SeasonService();

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const season = await service.findById(id);

    return NextResponse.json(ApiResponse.success(season, SEASON_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateSeasonSchema.parse(body);

    const season = await service.update(id, data);

    return NextResponse.json(ApiResponse.success(season, SEASON_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await service.delete(id);

    return NextResponse.json(ApiResponse.success(null, SEASON_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
