import { ApiResponse, handleApiError } from "@/server/lib";
import { COUNTRY_MESSAGES } from "@/server/auth";
import { CountryService } from "@/server/services";

const service = new CountryService();

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

    const country = await service.getById(id);

    return ApiResponse.success(
      country,
      COUNTRY_MESSAGES.FETCH_ONE_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}