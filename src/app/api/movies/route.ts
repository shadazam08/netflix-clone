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
  createMovieSchema,
} from "@/server/validations";

const service = new MovieService();

export async function GET() {
  try {
    const data = await service.findAll();

    return NextResponse.json(
      ApiResponse.success(
        data,
        MOVIE_MESSAGES.LIST_SUCCESS
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

    const body = await request.json();

    const data =
      createMovieSchema.parse(body);

    const movie =
      await service.create(data);

    return NextResponse.json(
      ApiResponse.success(
        movie,
        MOVIE_MESSAGES.CREATE_SUCCESS
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}