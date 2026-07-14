import { AppError } from "@/server/lib";

import { getCurrentUser } from "./session";

export async function requireRole(
  ...roles: string[]
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  if (!roles.includes(user.role)) {
    throw new AppError("Forbidden", 403);
  }

  return user;
}

export async function requireSuperAdmin() {
  return requireRole("SUPER_ADMIN");
}

export async function requireAdmin() {
  return requireRole(
    "SUPER_ADMIN",
    "ADMIN"
  );
}