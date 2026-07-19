import { NextResponse } from "next/server";
import { requireAdmin, EPISODE_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { EpisodeService } from "@/server/services";

import { updateEpisodeSchema } from "@/server/validations";

const service = new EpisodeService();

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const episode = await service.findById(id);

    return NextResponse.json(ApiResponse.success(episode, EPISODE_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updateEpisodeSchema.parse(body);

    const episode = await service.update(id, data);

    return NextResponse.json(ApiResponse.success(episode, EPISODE_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await service.delete(id);

    return NextResponse.json(ApiResponse.success(null, EPISODE_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
