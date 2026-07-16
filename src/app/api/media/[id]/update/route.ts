import { NextRequest } from "next/server";

import {
  MEDIA_MESSAGES,
  requireAdmin,
} from "@/server/auth";
import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";
import { MediaMapper } from "@/server/mappers";
import { MediaService } from "@/server/services";
import { updateMediaSchema } from "@/server/validations";

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

    const data = updateMediaSchema.parse(body);

    const { id } = await params;

    const service = new MediaService();

    const media = await service.update(id, data);

    return ApiResponse.success(
      MediaMapper.toResponse(media),
      MEDIA_MESSAGES.UPDATED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}