import { ApiResponse, handleApiError } from "@/server/lib";
import { TAG_MESSAGES, requireAdmin } from "@/server/auth";
import { TagService } from "@/server/services";
import { createTagSchema } from "@/server/validations";

const service = new TagService();

export async function GET() {
  try {
    const tags = await service.getAll();

    return ApiResponse.success(tags, TAG_MESSAGES.FETCH_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const dto = createTagSchema.parse(body);

    const tag = await service.create(dto);

    return ApiResponse.success(tag, TAG_MESSAGES.CREATED_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}
