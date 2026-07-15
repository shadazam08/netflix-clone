import { NextRequest } from "next/server";

import { CONTENT_MESSAGES, requireAdmin } from "@/server/auth";
import { createContentSchema } from "@/server/validations";
import { ContentMapper } from "@/server/mappers";
import { ContentService } from "@/server/services";
import { ApiResponse, handleApiError } from "@/server/lib";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createContentSchema.parse(body);

    const service = new ContentService();

    const content = await service.create(data);

    return ApiResponse.success(
      ContentMapper.toResponse(content),
      CONTENT_MESSAGES.CREATED_SUCCESS,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}