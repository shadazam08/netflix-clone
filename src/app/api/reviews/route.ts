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
  createReviewSchema,
} from "@/server/validations";

const reviewService =
  new ReviewService();

export async function GET() {
  try {
    const reviews =
      await reviewService.findAll();

    return NextResponse.json(
      ApiResponse.success(
        reviews,
        REVIEW_MESSAGES.LIST_SUCCESS
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
      createReviewSchema.parse(
        body
      );

    const review =
      await reviewService.create(
        data
      );

    return NextResponse.json(
      ApiResponse.success(
        review,
        REVIEW_MESSAGES.CREATE_SUCCESS
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}