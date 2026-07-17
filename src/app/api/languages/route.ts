import { ApiResponse } from "@/server/lib/api-response";
import { handleApiError } from "@/server/lib/error-handler";
import { LANGUAGE_MESSAGES, requireAdmin } from "@/server/auth";
import { LanguageService } from "@/server/services";
import { createLanguageSchema } from "@/server/validations";

const service = new LanguageService();

export async function GET() {
  try {
    const languages = await service.getAll();

    return ApiResponse.success(
      languages,
      LANGUAGE_MESSAGES.FETCH_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const dto = createLanguageSchema.parse(body);

    const language = await service.create(dto);

    return ApiResponse.success(
      language,
      LANGUAGE_MESSAGES.CREATED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}