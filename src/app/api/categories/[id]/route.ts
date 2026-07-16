import { NextRequest } from "next/server";

import { CATEGORY_MESSAGES } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { CategoryMapper } from "@/server/mappers";
import { CategoryService } from "@/server/services";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const service = new CategoryService();

    const category = await service.getById(id);

    return ApiResponse.success(
      CategoryMapper.toResponse(category),
      CATEGORY_MESSAGES.FETCH_ONE_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}