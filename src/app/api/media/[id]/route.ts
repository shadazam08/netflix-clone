import { NextRequest } from "next/server";

import {
  MEDIA_MESSAGES,
  requireAdmin,
} from "@/server/auth";
import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";
import { MediaService } from "@/server/services";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const service = new MediaService();

    await service.delete(id);

    return ApiResponse.success(
      null,
      MEDIA_MESSAGES.DELETED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}