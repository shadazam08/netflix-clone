import { NextRequest } from "next/server";

import { ApiResponse, handleApiError } from "@/server/lib";
import { getCurrentUser, PROFILE_MESSAGES } from "@/server/auth";
import { ProfileMapper } from "@/server/mappers";
import { ProfileService } from "@/server/services";
import { updateProfileSchema } from "@/server/validations";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const body = await request.json();

    const data = updateProfileSchema.parse(body);

    const { id } = await params;

    const service = new ProfileService();

    const profile = await service.updateProfile(id, data);

    return ApiResponse.success(ProfileMapper.toResponse(profile), PROFILE_MESSAGES.UPDATED_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}
