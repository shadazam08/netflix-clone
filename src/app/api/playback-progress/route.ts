import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, PLAYBACK_PROGRESS_MESSAGES } from "@/server/auth";

import { ApiResponse, handleApiError } from "@/server/lib";

import { PlaybackProgressService } from "@/server/services";

import { createPlaybackProgressSchema } from "@/server/validations";

const playbackProgressService = new PlaybackProgressService();

export async function GET() {
  try {
    const playbackProgress = await playbackProgressService.findAll();

    return NextResponse.json(ApiResponse.success(playbackProgress, PLAYBACK_PROGRESS_MESSAGES.LIST_SUCCESS));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createPlaybackProgressSchema.parse(body);

    const playbackProgress = await playbackProgressService.create(data);

    return NextResponse.json(ApiResponse.success(playbackProgress, PLAYBACK_PROGRESS_MESSAGES.CREATE_SUCCESS), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
