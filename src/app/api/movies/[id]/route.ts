import { NextResponse } from "next/server";

import {
  requireAdmin,
  MOVIE_MESSAGES,
} from "@/server/auth";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";

import {
  MovieService,
} from "@/server/services";

import {
  updateMovieSchema,
} from "@/server/validations";

const service = new MovieService();

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

    const movie =
      await service.findById(id);

    return NextResponse.json(
      ApiResponse.success(
        movie,
        MOVIE_MESSAGES.GET_SUCCESS
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
      updateMovieSchema.parse(body);

    const movie =
      await service.update(
        id,
        data
      );

    return NextResponse.json(
      ApiResponse.success(
        movie,
        MOVIE_MESSAGES.UPDATE_SUCCESS
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
        MOVIE_MESSAGES.DELETE_SUCCESS
      )
    );
  } catch (error) {
    return handleApiError(error);
  }
}