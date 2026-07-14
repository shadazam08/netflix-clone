import type { AuthUser } from "@/server/auth";
import type { AuthResponseDto } from "@/server/dto";

export class AuthMapper {
  static toResponse(user: AuthUser): AuthResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,

      profiles: user.profiles.map((profile) => ({
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        isPrimary: profile.isPrimary,
        type: profile.type,
      })),
    };
  }
}