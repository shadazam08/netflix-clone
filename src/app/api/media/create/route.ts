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
import { createMediaSchema } from "@/server/validations";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    const data = createMediaSchema.parse(body);

    const service = new MediaService();

    const media = await service.create(data);

    return ApiResponse.success(
      MediaMapper.toResponse(media),
      MEDIA_MESSAGES.CREATED_SUCCESS,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}