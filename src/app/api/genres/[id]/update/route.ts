import { NextRequest } from "next/server";

import {
  GENRE_MESSAGES,
  requireAdmin,
} from "@/server/auth";
import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";
import { GenreMapper } from "@/server/mappers";
import { GenreService } from "@/server/services";
import { updateGenreSchema } from "@/server/validations";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = updateGenreSchema.parse(body);

    const { id } = await params;

    const service = new GenreService();

    const genre = await service.update(
      id,
      data
    );

    return ApiResponse.success(
      GenreMapper.toResponse(genre),
      GENRE_MESSAGES.UPDATED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}