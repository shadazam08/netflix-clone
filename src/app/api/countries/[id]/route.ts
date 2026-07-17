import { ApiResponse, handleApiError } from "@/server/lib";
import {
  COUNTRY_MESSAGES,
  requireAdmin,
} from "@/server/auth";
import { CountryService } from "@/server/services";
import { updateCountrySchema } from "@/server/validations";

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

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const body = await request.json();

    const dto = updateCountrySchema.parse(body);

    const country = await service.update(id, dto);

    return ApiResponse.success(
      country,
      COUNTRY_MESSAGES.UPDATED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}