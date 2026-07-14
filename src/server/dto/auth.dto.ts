import type { AuthUser } from "@/server/auth";

export interface AuthResponseDto {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  profiles: {
    id: string;
    name: string;
    avatar: string | null;
    isPrimary: boolean;
    type: string;
  }[];
}

export function toAuthResponseDto(
  user: AuthUser
): AuthResponseDto {
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