import { ApiResponse, handleApiError } from "@/server/lib";
import { ProfileMapper } from "@/server/mappers";
import { ProfileService } from "@/server/services";
import { getCurrentUser, PROFILE_MESSAGES } from "@/server/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const service = new ProfileService();

    const profiles = await service.getProfiles(user.id);

    return ApiResponse.success(ProfileMapper.toResponseList(profiles), PROFILE_MESSAGES.FETCH_SUCCESS);
  } catch (error) {
    return handleApiError(error);
  }
}
