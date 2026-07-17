import { ApiResponse, handleApiError } from "@/server/lib";
import { COUNTRY_MESSAGES } from "@/server/auth";
import { CountryService } from "@/server/services";

const service = new CountryService();

export async function GET() {
  try {
    const countries = await service.getAll();

    return ApiResponse.success(
      countries,
      COUNTRY_MESSAGES.FETCH_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}