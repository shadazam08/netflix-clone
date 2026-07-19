import { NextRequest, NextResponse } from "next/server";

import {
  requireAdmin,
  WATCH_HISTORY_MESSAGES,
} from "@/server/auth";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";

import {
  WatchHistoryService,
} from "@/server/services";

import {
  updateWatchHistorySchema,
} from "@/server/validations";

const watchHistoryService =
  new WatchHistoryService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } =
      await context.params;

    const watchHistory =
      await watchHistoryService.findById(
        id
      );

    return NextResponse.json(
      ApiResponse.success(
        watchHistory,
        WATCH_HISTORY_MESSAGES.GET_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } =
      await context.params;

    const body =
      await request.json();

    const data =
      updateWatchHistorySchema.parse(
        body
      );

    const watchHistory =
      await watchHistoryService.update(
        id,
        data
      );

    return NextResponse.json(
      ApiResponse.success(
        watchHistory,
        WATCH_HISTORY_MESSAGES.UPDATE_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } =
      await context.params;

    await watchHistoryService.delete(
      id
    );

    return NextResponse.json(
      ApiResponse.success(
        null,
        WATCH_HISTORY_MESSAGES.DELETE_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}