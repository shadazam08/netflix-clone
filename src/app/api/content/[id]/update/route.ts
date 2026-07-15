import { NextRequest } from "next/server";

import { CONTENT_MESSAGES, requireAdmin } from "@/server/auth";
import { ApiResponse, handleApiError } from "@/server/lib";
import { ContentMapper } from "@/server/mappers";
import { ContentService } from "@/server/services";
import { updateContentSchema } from "@/server/validations";

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

    const data = updateContentSchema.parse(body);

    const { id } = await params;

    const service = new ContentService();

    const content = await service.update(id, data);

    return ApiResponse.success(
      ContentMapper.toResponse(content),
      CONTENT_MESSAGES.UPDATED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}