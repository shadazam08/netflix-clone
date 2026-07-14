import { AppError } from "@/server/lib";

import { AUTH_MESSAGES, USER_ROLES } from "./constants";
import { getCurrentUser } from "./session";

export async function requireRole(...roles: string[]) {
  const user = await getCurrentUser();

  if (!user) {
    throw new AppError(AUTH_MESSAGES.UNAUTHORIZED, 401);
  }

  if (!roles.includes(user.role)) {
    throw new AppError(AUTH_MESSAGES.FORBIDDEN, 403);
  }

  return user;
}

export async function requireSuperAdmin() {
  return requireRole(USER_ROLES.SUPER_ADMIN);
}

export async function requireAdmin() {
  return requireRole(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.ADMIN
  );
}