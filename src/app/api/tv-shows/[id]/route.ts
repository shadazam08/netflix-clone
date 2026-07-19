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
  updateTvShowSchema,
} from "@/server/validations";

const service = new TvShowService();

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } =
      await context.params;

    const tvShow =
      await service.findById(id);

    return NextResponse.json(
      ApiResponse.success(
        tvShow,
        TV_SHOW_MESSAGES.GET_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } =
      await context.params;

    const body =
      await request.json();

    const data =
      updateTvShowSchema.parse(body);

    const tvShow =
      await service.update(
        id,
        data
      );

    return NextResponse.json(
      ApiResponse.success(
        tvShow,
        TV_SHOW_MESSAGES.UPDATE_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } =
      await context.params;

    await service.delete(id);

    return NextResponse.json(
      ApiResponse.success(
        null,
        TV_SHOW_MESSAGES.DELETE_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}