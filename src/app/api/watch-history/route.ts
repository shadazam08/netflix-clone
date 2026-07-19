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
  createWatchHistorySchema,
} from "@/server/validations";

const watchHistoryService =
  new WatchHistoryService();

export async function GET() {
  try {
    const watchHistory =
      await watchHistoryService.findAll();

    return NextResponse.json(
      ApiResponse.success(
        watchHistory,
        WATCH_HISTORY_MESSAGES.LIST_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    await requireAdmin();

    const body =
      await request.json();

    const data =
      createWatchHistorySchema.parse(
        body
      );

    const watchHistory =
      await watchHistoryService.create(
        data
      );

    return NextResponse.json(
      ApiResponse.success(
        watchHistory,
        WATCH_HISTORY_MESSAGES.CREATE_SUCCESS
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}