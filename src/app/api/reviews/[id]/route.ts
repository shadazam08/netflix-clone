import { NextRequest, NextResponse } from "next/server";

import {
  requireAdmin,
  REVIEW_MESSAGES,
} from "@/server/auth";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";

import {
  ReviewService,
} from "@/server/services";

import {
  updateReviewSchema,
} from "@/server/validations";

const reviewService =
  new ReviewService();

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

    const review =
      await reviewService.findById(
        id
      );

    return NextResponse.json(
      ApiResponse.success(
        review,
        REVIEW_MESSAGES.GET_SUCCESS
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
      updateReviewSchema.parse(
        body
      );

    const review =
      await reviewService.update(
        id,
        data
      );

    return NextResponse.json(
      ApiResponse.success(
        review,
        REVIEW_MESSAGES.UPDATE_SUCCESS
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

    await reviewService.delete(
      id
    );

    return NextResponse.json(
      ApiResponse.success(
        null,
        REVIEW_MESSAGES.DELETE_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}