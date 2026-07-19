import { NextResponse } from "next/server";

import {
  requireAdmin,
  TV_SHOW_MESSAGES,
} from "@/server/auth";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";

import {
  TvShowService,
} from "@/server/services";

import {
  createTvShowSchema,
} from "@/server/validations";

const service = new TvShowService();

export async function GET() {
  try {
    const tvShows =
      await service.findAll();

    return NextResponse.json(
      ApiResponse.success(
        tvShows,
        TV_SHOW_MESSAGES.LIST_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: Request
) {
  try {
    await requireAdmin();

    const body =
      await request.json();

    const data =
      createTvShowSchema.parse(body);

    const tvShow =
      await service.create(data);

    return NextResponse.json(
      ApiResponse.success(
        tvShow,
        TV_SHOW_MESSAGES.CREATE_SUCCESS
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}