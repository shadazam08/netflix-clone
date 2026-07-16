import { NextRequest } from "next/server";

import { GENRE_MESSAGES, requireAdmin } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { GenreMapper } from "@/server/mappers";
import { GenreService } from "@/server/services";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const service = new GenreService();

    const genre = await service.getById(id);

    return ApiResponse.success(
      GenreMapper.toResponse(genre),
      GENRE_MESSAGES.FETCH_ONE_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const service = new GenreService();

    await service.delete(id);

    return ApiResponse.success(
      null,
      GENRE_MESSAGES.DELETED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}