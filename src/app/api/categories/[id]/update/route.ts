import { NextRequest } from "next/server";

import {
  CATEGORY_MESSAGES,
  requireAdmin,
} from "@/server/auth";
import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";
import { CategoryMapper } from "@/server/mappers";
import { CategoryService } from "@/server/services";
import { updateCategorySchema } from "@/server/validations";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = updateCategorySchema.parse(body);

    const { id } = await params;

    const service = new CategoryService();

    const category = await service.update(
      id,
      data
    );

    return ApiResponse.success(
      CategoryMapper.toResponse(category),
      CATEGORY_MESSAGES.UPDATED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}