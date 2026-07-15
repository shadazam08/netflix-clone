import { ApiResponse, handleApiError } from "@/server/lib";
import { ContentMapper } from "@/server/mappers";
import { ContentService } from "@/server/services";
import { CONTENT_MESSAGES } from "@/server/auth";

export async function GET() {
  try {
    const service = new ContentService();

    const contents = await service.getAll();

    return ApiResponse.success(
      ContentMapper.toResponseList(contents),
      CONTENT_MESSAGES.FETCH_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}