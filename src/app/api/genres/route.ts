import { GENRE_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { GenreMapper } from "@/server/mappers";
import { GenreService } from "@/server/services";

export async function GET() {
  try {
    const service = new GenreService();

    const genres = await service.getAll();

    return ApiResponse.success(
      GenreMapper.toResponseList(genres),
      GENRE_MESSAGES.FETCH_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}