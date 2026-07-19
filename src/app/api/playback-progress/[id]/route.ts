import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, PLAYBACK_PROGRESS_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { PlaybackProgressService } from "@/server/services";

import { updatePlaybackProgressSchema } from "@/server/validations";

const playbackProgressService = new PlaybackProgressService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const playbackProgress = await playbackProgressService.findById(id);

    return NextResponse.json(ApiResponse.success(playbackProgress, PLAYBACK_PROGRESS_MESSAGES.GET_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const data = updatePlaybackProgressSchema.parse(body);

    const playbackProgress = await playbackProgressService.update(id, data);

    return NextResponse.json(ApiResponse.success(playbackProgress, PLAYBACK_PROGRESS_MESSAGES.UPDATE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await playbackProgressService.delete(id);

    return NextResponse.json(ApiResponse.success(null, PLAYBACK_PROGRESS_MESSAGES.DELETE_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}
