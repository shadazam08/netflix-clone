import { NextRequest, NextResponse } from "next/server";

import {
  requireAdmin,
  CONTINUE_WATCHING_MESSAGES,
} from "@/server/auth";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";

import {
  ContinueWatchingService,
} from "@/server/services";

import {
  createContinueWatchingSchema,
} from "@/server/validations";

const continueWatchingService =
  new ContinueWatchingService();

export async function GET() {
  try {
    const continueWatching =
      await continueWatchingService.findAll();

    return NextResponse.json(
      ApiResponse.success(
        continueWatching,
        CONTINUE_WATCHING_MESSAGES.LIST_SUCCESS
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
      createContinueWatchingSchema.parse(
        body
      );

    const continueWatching =
      await continueWatchingService.create(
        data
      );

    return NextResponse.json(
      ApiResponse.success(
        continueWatching,
        CONTINUE_WATCHING_MESSAGES.CREATE_SUCCESS
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}