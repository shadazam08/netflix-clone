import { NextRequest } from "next/server";

import { ApiResponse, handleApiError } from "@/server/lib";
import { MediaMapper } from "@/server/mappers";
import { MediaService } from "@/server/services";
import { MEDIA_MESSAGES } from "@/server/auth";

interface RouteContext {
  params: Promise<{
    contentId: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { contentId } = await params;

    const service = new MediaService();

    const media = await service.getByContentId(contentId);

    return ApiResponse.success(
      MediaMapper.toResponseList(media),
      MEDIA_MESSAGES.FETCH_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}