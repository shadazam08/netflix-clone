import { NextRequest } from "next/server";

import { ApiResponse, handleApiError } from "@/server/lib";
import { getCurrentUser, PROFILE_MESSAGES } from "@/server/auth";
import { ProfileMapper } from "@/server/mappers";
import { ProfileService } from "@/server/services";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const { id } = await params;

    const service = new ProfileService();

    const profile = await service.getProfile(id);

    return ApiResponse.success(ProfileMapper.toResponse(profile), PROFILE_MESSAGES.FETCH_ONE_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const { id } = await params;

    const service = new ProfileService();

    await service.deleteProfile(id);

    return ApiResponse.success(
      null,
      PROFILE_MESSAGES.DELETED_SUCCESS
    );
  } catch (error) {
    return handleApiError(error);
  }
}
