import { NextRequest } from "next/server";

import { GENRE_MESSAGES, requireAdmin } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { GenreMapper } from "@/server/mappers";
import { GenreService } from "@/server/services";
import { createGenreSchema } from "@/server/validations";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createGenreSchema.parse(body);

    const service = new GenreService();

    const genre = await service.create(data);

    return ApiResponse.success(GenreMapper.toResponse(genre), GENRE_MESSAGES.CREATED_SUCCESS, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
