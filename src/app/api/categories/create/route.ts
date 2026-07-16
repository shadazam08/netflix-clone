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
import { createCategorySchema } from "@/server/validations";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createCategorySchema.parse(body);

    const service = new CategoryService();

    const category = await service.create(data);

    return ApiResponse.success(
      CategoryMapper.toResponse(category),
      CATEGORY_MESSAGES.CREATED_SUCCESS,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}