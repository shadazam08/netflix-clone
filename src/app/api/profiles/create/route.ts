import { NextRequest } from "next/server";

import {
  ApiResponse,
  handleApiError,
} from "@/server/lib";
import {
  getCurrentUser,
  PROFILE_MESSAGES,
} from "@/server/auth";
import { ProfileMapper } from "@/server/mappers";
import { ProfileService } from "@/server/services";
import { createProfileSchema } from "@/server/validations";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const body = await request.json();

    const data = createProfileSchema.parse(body);

    const service = new ProfileService();

    const profile = await service.createProfile({
      userId: user.id,
      name: data.name,
      type: data.type,
    });

    return ApiResponse.success(
      ProfileMapper.toResponse(profile),
      PROFILE_MESSAGES.CREATED_SUCCESS,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}