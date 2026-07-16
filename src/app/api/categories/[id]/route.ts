import { NextRequest } from "next/server";

import { CATEGORY_MESSAGES, requireAdmin} from "@/server/auth";
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

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const service = new CategoryService();

    await service.delete(id);

    return ApiResponse.success(
      null,
      CATEGORY_MESSAGES.DELETED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}