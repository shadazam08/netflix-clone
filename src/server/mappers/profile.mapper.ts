import type { ProfileWithUser } from "@/server/repositories";
import type { ProfileResponseDto } from "@/server/dto";

export class ProfileMapper {
  static toResponse(
    profile: ProfileWithUser
  ): ProfileResponseDto {
    return {
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar,
      type: profile.type,
      language: profile.language,
      isPrimary: profile.isPrimary,
      isLocked: profile.isLocked,
    };
  }

  static toResponseList(
    profiles: ProfileWithUser[]
  ): ProfileResponseDto[] {
    return profiles.map((profile) =>
      this.toResponse(profile)
    );
  }
}