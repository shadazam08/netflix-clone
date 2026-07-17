import { ApiResponse, handleApiError } from "@/server/lib";
import { COUNTRY_MESSAGES, requireAdmin } from "@/server/auth";
import { CountryService } from "@/server/services";
import { createCountrySchema } from "@/server/validations";

const service = new CountryService();

export async function GET() {
  try {
    const countries = await service.getAll();

    return ApiResponse.success(countries, COUNTRY_MESSAGES.FETCH_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const dto = createCountrySchema.parse(body);

    const country = await service.create(dto);

    return ApiResponse.success(country, COUNTRY_MESSAGES.CREATED_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}