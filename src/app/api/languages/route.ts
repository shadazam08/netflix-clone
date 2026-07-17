import { ApiResponse } from "@/server/lib/api-response";
import { handleApiError } from "@/server/lib/error-handler";
import { LANGUAGE_MESSAGES } from "@/server/auth";
import { LanguageService } from "@/server/services";

const service = new LanguageService();

export async function GET() {
  try {
    const languages = await service.getAll();

    return ApiResponse.success(languages, LANGUAGE_MESSAGES.FETCH_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}
