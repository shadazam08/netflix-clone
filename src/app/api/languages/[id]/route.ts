import { ApiResponse, handleApiError } from "@/server/lib";
import { LANGUAGE_MESSAGES, requireAdmin } from "@/server/auth";
import { LanguageService } from "@/server/services";
import { updateLanguageSchema } from "@/server/validations";

const service = new LanguageService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const language = await service.getById(id);

    return ApiResponse.success(language, LANGUAGE_MESSAGES.FETCH_ONE_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const dto = updateLanguageSchema.parse(body);

    const language = await service.update(id, dto);

    return ApiResponse.success(language, LANGUAGE_MESSAGES.UPDATED_SUCCESS);
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

    const { id } = await context.params;

    await service.delete(id);

    return ApiResponse.success(
      null,
      LANGUAGE_MESSAGES.DELETED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}
