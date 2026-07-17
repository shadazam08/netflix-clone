import { ApiResponse } from "@/server/lib/api-response";
import { handleApiError } from "@/server/lib/error-handler";
import { LANGUAGE_MESSAGES } from "@/server/auth";
import { LanguageService } from "@/server/services";

const service = new LanguageService();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const language = await service.getById(id);

    return ApiResponse.success(
      language,
      LANGUAGE_MESSAGES.FETCH_ONE_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}