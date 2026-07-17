import { ApiResponse, handleApiError } from "@/server/lib";
import { TAG_MESSAGES, requireAdmin } from "@/server/auth";
import { TagService } from "@/server/services";
import { updateTagSchema } from "@/server/validations";

const service = new TagService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request,context: RouteContext) {
  try {
    const { id } = await context.params;

    const tag = await service.getById(id);

    return ApiResponse.success(tag, TAG_MESSAGES.FETCH_ONE_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const dto = updateTagSchema.parse(body);

    const tag = await service.update(id, dto);

    return ApiResponse.success(tag, TAG_MESSAGES.UPDATED_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request,context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await service.delete(id);

    return ApiResponse.success(null, TAG_MESSAGES.DELETED_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}