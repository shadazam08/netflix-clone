import { CATEGORY_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { CategoryMapper } from "@/server/mappers";
import { CategoryService } from "@/server/services";

export async function GET() {
  try {
    const service = new CategoryService();

    const categories = await service.getAll();

    return ApiResponse.success(
      CategoryMapper.toResponseList(categories),
      CATEGORY_MESSAGES.FETCH_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}